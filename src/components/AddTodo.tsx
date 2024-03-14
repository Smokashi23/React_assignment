import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import TodoItem from "../models/todoItem";
import "../css_styles/AddTodo.css";
import axios from "axios";
import { useMutation } from "react-query";

interface AProps {}

function AddTodo(props: AProps) {
  const [todo, setTodo] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const navigate = useNavigate();

  const addTodo = (todo: string, date: string) => {
    if (todo.trim() !== "") {
    } else {
      alert("Enter task");
    }
  };

  const { mutate: mutateAddTodo } = useMutation(
    (payload: { todo: string; date: string; completed: boolean }) =>
      axios.post("http://localhost:8000/data", payload),
    {
      onSuccess: () => {
        addTodo(todo, date);
        navigate("/");
        alert("Data Added successfully");
      },
      onError: () => {
        alert("error");
      },
    }
  );

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

  const handleAddTodo = () => {
    if (todo && date) {
      mutateAddTodo({
        todo,
        date,
        completed: false,
      });
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
export default AddTodo;

