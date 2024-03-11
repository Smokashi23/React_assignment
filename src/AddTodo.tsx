import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

interface AProps {
  addTodo: (todo: string, date: string) => void;
}

function AddTodo(props: AProps) {
  const [todo, setTodo] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const navigate = useNavigate();

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
    if (field === "todo") {
      setTodo(event.target.value);
    } else if (field === "date") {
      setDate(event.target.value);
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
          props.addTodo(todo, date);
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
      <input
        type="text"
        placeholder="Enter Todo"
        value={todo}
        onChange={(e) => handleInput(e, "todo")}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => handleInput(e, "date")}
      />
      <button className="action-button" onClick={handleAddTodo}>
        Add
      </button>
    </div>
  );
}
export default AddTodo;
