import React, { useEffect, useState } from "react";
import "./Todo.css";
import useFetchData from "./FetchData";

import List from "./List";
import AddTodo from "./AddTodo";
import NavbarTodo from "./Nav";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ViewTodo from "./ViewTodo";
import TodoItem from "./models/todoItem";

const Todo = () => {
  const [todolist, setTodolist] = useState<TodoItem[]>([]);
  const { data, loading, error, refetchData } = useFetchData(
    "http://localhost:8000/data"
  );
  const [nextId, setID] = useState(0);

  useEffect(() => {
    setTodolist(data);
  }, [data]);

  const addTodo = (todo: string, date: string) => {
    refetchData(true);
    if (todo.trim() !== "") {
      setTodolist([...todolist, { id: nextId, todo, date, completed: false }]);
      setID(nextId + 1);
    } else {
      alert("Enter task");
    }
  };

  const deleteTodo = (t: TodoItem) => {
    const newtodo = todolist.filter((item) => item.id !== t.id);
    setTodolist(newtodo);
  };

  const onCompletion = (t: TodoItem) => {
    const updatedList = todolist.map((item) => {
      if (item.id === t.id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    setTodolist(updatedList);
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
      <BrowserRouter>
        <NavbarTodo />
        <div className="content">
          <h1>Oraganise your day</h1>
          <Routes>
            <Route path="/addTodo" element={<AddTodo addTodo={addTodo} />} />

            <Route path="/viewtodo/:id" element={<ViewTodo />} />
            <Route
              path="/"
              element={
                <List
                  todolist={todolist}
                  onCompletion={onCompletion}
                  deleteTodo={deleteTodo}
                />
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};
export default Todo;
