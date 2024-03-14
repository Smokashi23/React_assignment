import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import TodoItem from "../models/todoItem";
import "../css_styles/AddTodo.css"
interface AProps {}

function AddTodo(props: AProps) {
  const [todo, setTodo] = useState<string>("");
  const [date, setDate] = useState<string>("");
  // const [todolist, setTodolist] = useState<TodoItem[]>([]);
  const [nextId, setID] = useState(0);
  const navigate = useNavigate();

  const handleInput = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    if (field === "todo") {
      setTodo(event.target.value);
    } else if (field === "date") {
      setDate(event.target.value);
    }
  };

  const addTodo = (todo: string, date: string) => {
    if (todo.trim() !== "") {
      // setTodolist([...todolist, { id: nextId, todo, date, completed: false }]);
      // setID(nextId + 1);
    } else {
      alert("Enter task");
    }
  };

  const handleAddTodo = () => {
    if (todo && date) {
      fetch("http://localhost:8000/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          todo: todo,
          date: date,
          completed: false,
        }),
      })
        .then((res) => {
          addTodo(todo, date);
          navigate("/");
          alert("Data Added successfully");
        })
        .catch((err) => console.error("Error adding todo:", err));
    } else {
      alert("Todo and date cannot be empty");
    }
  };

  return (
    <div className="container">
      <div>
        <input
          type="text"
          placeholder="Enter Todo"
          value={todo}
          onChange={(e) => handleInput(e, "todo")}
        />
      </div>
      <div className="date-input">
        <input
          type="date"
          value={date}
          onChange={(e) => handleInput(e, "date")}
        />
      </div>
      <div className="button-container">
        <button className="action-button" onClick={handleAddTodo}>
          Add
        </button>
      </div>
    </div>
  );
}
export default AddTodo
