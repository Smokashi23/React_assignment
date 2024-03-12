import React from "react";
import TodoItem from "../models/todoItem";

interface TodoItemProps {
  item: TodoItem;
  handleCheckboxChange: (item: TodoItem) => void;
  handleDeleteTodo: (item: TodoItem) => void;
  navigate: any;
}

function Todoitems({
  item,
  handleCheckboxChange,
  handleDeleteTodo,
  navigate,
}: TodoItemProps) {
  return (
    <li className="todo-item">
      <div className="todo-card">
        <input
          type="checkbox"
          checked={item.completed}
          onChange={() => handleCheckboxChange(item)}
        />
        <div className="todo-task" onClick={() => navigate(`/viewtodo/${item.id}`)}>
          {item.todo}
        </div>
        <p className="todo-date">{item.date}</p> 
        <button
          className="action-button"
          onClick={() => handleDeleteTodo(item)}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default Todoitems;
