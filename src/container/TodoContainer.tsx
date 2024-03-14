import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import TodoItem from "../components/TodoItems";
import TodoComponent from "../models/todoItem";
import SearchContainer from "./SearchContainer";
import SortContainer from "./SortContainer";
import Sort from "../components/Sort";

interface ListProps {
  data: TodoComponent[];
  refetchData: Function;
}

function TodoContainer({ data, refetchData }: ListProps) {
  const [todolist, setTodolist] = useState<TodoComponent[]>(data);
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState<string>("title");
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const navigate = useNavigate();

  useEffect(() => {
    setTodolist(data);
  }, [data]);

  useEffect(() => {
    refetchData(true);
  }, []);

  const deleteTodo = (item: TodoComponent) => {
    fetch(`http://localhost:8000/data/${item.id}`, {
      method: "DELETE",
    })
      .then(() => {
        setTodolist((prevList) =>
          prevList.filter((todo) => todo.id !== item.id)
        );
        alert("Todo deleted successfully");
      })
      .catch((err) => console.error("Error deleting todo:", err));
  };

  const onCompletion = (item: TodoComponent) => {
    fetch(`http://localhost:8000/data/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: !item.completed }),
    })
      .then(() => {
        setTodolist((prevList) =>
          prevList.map((todo) => {
            if (todo.id === item.id) {
              return { ...todo, completed: !todo.completed };
            }
            return todo;
          })
        );
      })
      .catch((err) => console.error("Error updating todo:", err));
  };

  const handleCheckboxChange = (item: TodoComponent) => {
    fetch(`http://localhost:8000/data/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: !item.completed }),
    })
      .then(() => {
        onCompletion(item);
      })
      .catch((err) => console.error("Error updating todo:", err));
  };

  // const [filterTodos, setFilterTodos] = useState<TodoComponent[]>(todolist);

  // function filterTodo() {
  //   // console.log("filtered todo");

  //   // const searchQuery = searchText.length
  //   if (searchText) {
  //     const newArr = todolist.filter((item) =>
  //       item.todo.toLowerCase().includes(searchText.toLowerCase())
  //     );
  //     setFilterTodos(newArr);
  //   } else {
  //     console.log("In empty search");
  //     setFilterTodos(todolist);
  //   }
  //   console.log(todolist);
  //   // const filteredTodos = todolist.filter((item) =>
  //   //   searchText === ""
  //   //     ? item
  //   //     : item.todo.toLowerCase().includes(searchText.toLowerCase())
  //   // );
  //   // console.log(filteredTodos);
  //   // setTodolist(filteredTodos);
  // }

  // console.log("Search", searchText);

  // useEffect(() )

  const filterTodos = useMemo(
    () =>
      todolist.filter((item) =>
        item.todo.toLowerCase().includes(searchText.toLowerCase())
      ),
    [searchText, todolist]
  );
  console.log("Filter", todolist);


  const handleSort = (criteria: string) => {
    if (criteria === sortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(criteria);
      setSortOrder("asc");
    }
  };


  filterTodos.sort((a: TodoComponent, b: TodoComponent) => {
    if (sortBy === "name") {
      return sortOrder === "asc" ? a.todo.localeCompare(b.todo) : b.todo.localeCompare(a.todo);
    } else if (sortBy === "date") {
      return sortOrder === "asc" ? new Date(a.date).getTime() - new Date(b.date).getTime() : new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return 0;
  });
  

  return (
    <div>
      <SearchContainer setSearch={setSearchText} filterTodo={() => {}} />
      <SortContainer handleSort={handleSort} sortBy={""} sortOrder={""} />
      <div className="viewList">
        <div className="com">
          <h2>Completed Todos</h2>
         
          <ul className="todo-list completed">
            {filterTodos.map((item) => {
              return (
                item.completed && (
                  <TodoItem
                    key={item.id}
                    item={item}
                    handleCheckboxChange={handleCheckboxChange}
                    handleDeleteTodo={deleteTodo}
                    navigate={navigate}
                  />
                )
              );
            })}
          </ul>
        </div>

        <div className="incom">
          <h2>Incompleted Todos</h2>
          <ul className="todo-list incompleted">
            {filterTodos.map((item) => {
              return (
                !item.completed && (
                  <TodoItem
                    key={item.id}
                    item={item}
                    handleCheckboxChange={handleCheckboxChange}
                    handleDeleteTodo={deleteTodo}
                    navigate={navigate}
                  />
                )
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default TodoContainer;
