import { useMutation, QueryCache } from "react-query";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
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

function TodoContainer({
  data,
  refetchData,
  goToPage,
  currentPage,
}: ListProps) {
  const [todolist, setTodolist] = useState<TodoComponent[]>(data);
  const [searchText, setSearchText] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const navigate = useNavigate();
  // const [page, setPage] = useState<number>(1);
  // const [limit, setLimit] = useState<number>(2);

  const [totalPages, setTotalPages] = useState<number>(3);

  useEffect(() => {
    setTodolist(data);
  }, [data]);

  useEffect(() => {
    refetchData(true);
  }, []);

  const deleteTodoMutation = useMutation(
    (item: TodoComponent) =>
      axios.delete(`http://localhost:8000/data/${item.id}`),
    {
      onSuccess: (data, item: TodoComponent) => {
        setTodolist((prevList) =>
          prevList.filter((todo) => todo.id !== item.id)
        );
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
        setTodolist((prevList) =>
          prevList.map((todo) =>
            todo.id === updatedTodo.id ? updatedTodo : todo
          )
        );
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
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(criteria);
      setSortOrder("asc");
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
      <SearchContainer setSearch={setSearchText} filterTodo={() => {}} />
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
