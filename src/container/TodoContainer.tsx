import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import TodoItem from "../components/TodoItems";
import TodoComponent from "../models/todoItem";


interface ListProps {
  data: TodoComponent[];
  refetchData: Function;
}

function TodoContainer({ data, refetchData }: ListProps) {
  const [todolist, setTodolist] = useState<TodoComponent[]>(data);
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



  return (
    <div>
      <div className="viewList">
        <div className="com">
          <h2>Completed Todos</h2>
          <ul className="todo-list completed">
            {todolist.map((item) => {
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
            {todolist.map((item) => {
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
