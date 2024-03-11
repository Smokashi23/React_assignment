import { useNavigate } from "react-router-dom";
import TodoItem from "./models/todoItem";
import deleteTod from "./Todo";
import { useEffect,useState } from 'react';

interface ListProps {
  todolist: TodoItem[];
  onCompletion: (t: TodoItem) => void;
  deleteTodo: (t: TodoItem) => void;
}

function List({ todolist, onCompletion, deleteTodo }: ListProps) {
  const navigate = useNavigate();

    
  const handleDeleteTodo = (item: TodoItem) => {
    fetch(`http://localhost:8000/data/${item.id}`, {
      method: "DELETE",
    })
      .then(() => {
        deleteTodo(item);
        alert("Todo deleted successfully");
      })
      .catch((err) => console.error("Error deleting todo:", err));
  };
  

  const handleCheckboxChange = (item: TodoItem) => {
    console.log(item);
    fetch(`http://localhost:8000/data/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: !item.completed }),
    })
      .then(() => {
        onCompletion({ ...item, completed: !item.completed });
      })
      .catch((err) => console.error("Error updating todo:", err));
  };


  // const useHandleCheckboxChange = (item: TodoItem, onCompletion: Function) => {
  //   useEffect(() => {
  //     console.log(item);
  //     fetch(`http://localhost:8000/data/${item.id}`, {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ completed: !item.completed }),
  //     })
  //       .then(() => {
  //         onCompletion({ ...item, completed: !item.completed });
  //       })
  //       .catch((err) => console.error("Error updating todo:", err));
  //   }, [item, onCompletion]);
  // };
  return (
    <div>
      <div className="viewList">
        <div className="com">
          <h2>Completed Todos</h2>
          <ul className="todo-list completed">
            {todolist.map((item) => {
              return (
                item.completed && (
                  <li key={item.id} className="todo-item">
                    <div className="todo-card">
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => handleCheckboxChange(item)}
                      />
                      <h2 onClick={() => navigate(`/viewtodo/${item.id}`)}>
                        {item.todo}
                        {item.date}
                      </h2>
                      <button
                        className="action-button"
                        onClick={() => handleDeleteTodo(item)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
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
                  <li key={item.id} className="todo-item">
                    <div className="todo-card">
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => handleCheckboxChange(item)}
                      />
                      <h2 onClick={() => navigate(`/viewtodo/${item.id}`)}>
                        {item.todo}
                      </h2>
                      <button
                        className="action-button"
                        onClick={() => handleDeleteTodo(item)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                )
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default List;
