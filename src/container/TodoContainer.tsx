import { useMutation, QueryCache } from "react-query";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useReducer } from "react";
import TodoItem from "../components/TodoItems";
import TodoComponent from "../models/todoItem";
import SearchContainer from "./SearchContainer";
import SortContainer from "./SortContainer";
import axios from "axios";


interface ListProps {
  data: TodoComponent[];
  refetchData: Function;  
  goToPage: (page: number) => void;
  currentPage: number;
}
interface State {
  todolist: TodoComponent[];
  searchText: string;
  sortBy: string;
  sortOrder: string;
  totalPages: number;
}

const initialState: State = {
  todolist: [],
  searchText: "",
  sortBy: "name",
  sortOrder: "asc",
  totalPages: 3,
};


function reducer(state: State, action: any): State {
  switch (action.type) {
    case "SET_TODOLIST":
      return { ...state, todolist: action.payload };
    case "SET_SEARCH_TEXT":
      return { ...state, searchText: action.payload };
    case "SET_SORT_BY":
      return { ...state, sortBy: action.payload, sortOrder: "asc" };
    case "SET_SORT_ORDER":
      return { ...state, sortOrder: action.payload };
    case "SET_TOTAL_PAGES":
      return { ...state, totalPages: action.payload };
    default:
      return state;
  }
}
function TodoContainer({
  data,
  refetchData,
  goToPage,
  currentPage,
}: ListProps) {

  const [state, dispatch] = useReducer(reducer, initialState);
  const { todolist, searchText, sortBy, sortOrder, totalPages } = state;
  const navigate = useNavigate();


  useEffect(() => {
    dispatch({ type: "SET_TODOLIST", payload: data });
  }, [data]);

  useEffect(() => {
    refetchData(true);
  }, []);

  const deleteTodoMutation = useMutation(
    (item: TodoComponent) =>
      axios.delete(`http://localhost:8000/data/${item.id}`),
    {
      onSuccess: (data, item: TodoComponent) => {
        dispatch({
          type: "SET_TODOLIST",
          payload: todolist.filter((todo) => todo.id !== item.id),
        });
        alert("Todo deleted successfully");
      },
      onError: (error, item: TodoComponent) => {
        console.error("Error deleting todo:", error);
      },
    }
  );

  const patchTodoMutation = useMutation(
    (item: TodoComponent) =>
      axios
        .patch(`http://localhost:8000/data/${item.id}`, {
          completed: !item.completed,
        })
        .then((response) => response.data),
    {
      onSuccess: (updatedTodo: TodoComponent) => {
        dispatch({
          type: "SET_TODOLIST",
          payload: todolist.map((todo) =>
            todo.id === updatedTodo.id ? updatedTodo : todo
          ),
        });
      },
      onError: (error) => {
        console.error("Error updating todo:", error);
      },
    }
  );

  const handleDeleteTodo = (item: TodoComponent) => {
    deleteTodoMutation.mutate(item);
  };

  const handleCheckboxChange = (item: TodoComponent) => {
    patchTodoMutation.mutate(item);
  };

  const handleSort = (criteria: string) => {
    if (criteria === sortBy) {
      dispatch({ type: "SET_SORT_ORDER", payload: sortOrder === "asc" ? "desc" : "asc" });
    } else {
      dispatch({ type: "SET_SORT_BY", payload: criteria });
      dispatch({ type: "SET_SORT_ORDER", payload: "asc" });
    }
  };

  const filterTodos = useMemo(
    () =>
      todolist.filter((item: TodoComponent) =>
        item.todo.toLowerCase().includes(searchText.toLowerCase())
      ),
    [searchText, todolist]
  );

  filterTodos.sort((a: TodoComponent, b: TodoComponent) => {
    if (sortBy === "name") {
      return sortOrder === "asc"
        ? a.todo.localeCompare(b.todo)
        : b.todo.localeCompare(a.todo);
    } else if (sortBy === "date") {
      return sortOrder === "asc"
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return 0;
  });

  return (
    <div>
      <SearchContainer 
         setSearch={(text) => dispatch({ type: "SET_SEARCH_TEXT", payload: text })}
         filterTodo={() => { }}
      />
      <SortContainer
        handleSort={handleSort}
        sortBy={sortBy}
        sortOrder={sortOrder}
      />
      <div className="viewList">
        <div className="com">
          <h2>Completed Todos</h2>
          <ul className="todo-list completed">
            {filterTodos
              .filter((item) => item.completed)
              .map((item) => (
                <TodoItem
                  key={item.id}
                  item={item}
                  handleCheckboxChange={handleCheckboxChange}
                  handleDeleteTodo={handleDeleteTodo}
                  navigate={undefined}
                />
              ))}
          </ul>
        </div>
        <div className="incom">
          <h2>Incompleted Todos</h2>
          <ul className="todo-list incompleted">
            {filterTodos
              .filter((item) => !item.completed)
              .map((item) => (
                <TodoItem
                  key={item.id}
                  item={item}
                  handleCheckboxChange={handleCheckboxChange}
                  handleDeleteTodo={handleDeleteTodo}
                  navigate={undefined}
                />
              ))}
          </ul>
        </div>
      </div>
      <div className="pagination">
        <button
          className="btn btn-primary mr-2"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="btn btn-primary"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default TodoContainer;
