import React, { useEffect, useState } from "react";
import "./Todo.css";
import useFetchData from "./FetchData";
import { error } from "console";

interface TodoItem {
  id: number;
  todo: string;
  completed: boolean;
}

const Todo = () => {
  const [todo, setTodo] = useState<string>("");
  const [todolist, setTodolist] = useState<TodoItem[]>([]);
  const { data, loading, error } = useFetchData("http://localhost:8000/data");
  const [nextId, setID] = useState(0);

  useEffect(() => {
    // console.log(data)
    setTodolist(data);
  }, [data]);

  const addTodo = () => {
    if (todo.trim() !== "") {
      setTodolist([...todolist, { id: nextId, todo, completed: false }]);
      setTodo("");
      setID(nextId + 1);
    } else {
      alert("Enter task");
    }
  };

  function handleInput(event: any) {
    setTodo(event.target.value);
  }

  const deleteTodo = (t: TodoItem) => {
    const newtodo = todolist.filter((item) => item.id !== t.id);
    setTodolist(newtodo);
  };

  const onCompletion = (t: TodoItem) => {
    t.completed = !t.completed;
    setTodolist([...todolist]);
  };
  if (loading) {
    return (
      <div className="loading-message">
        <div>Loading...</div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="error-message">
        <div>{error}</div>
      </div>
    );
  }

  return (
    <div className="todo-container">
      {/* {loading && <div>loading...</div>} */}
      {/* {error && <div>{error}</div>} */}
      <h1>Todo app</h1>
      <input type="text" value={todo} onChange={handleInput} />
      <button onClick={addTodo}> Add Todo</button>
      <div>
        <ul>
          {todolist.map((item: TodoItem) => (
            <li key={item.id}>
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => onCompletion(item)}
              />
              {item.todo}
              <button onClick={() => deleteTodo(item)}>Delete</button>
            </li>
          ))}
        </ul>
        <div>
          <h2>Completed Todos</h2>
          <ul>
            {todolist.map(
              (item: TodoItem) =>
                item.completed && <li key={item.id}>{item.todo}</li>
            )}
          </ul>
        </div>
        <h2>Uncompleted Todos</h2>
        <ul>
          {todolist.map(
            (item: TodoItem) =>
              !item.completed && <li key={item.id}>{item.todo}</li>
          )}
        </ul>
      </div>
    </div>
  );
};
export default Todo;
