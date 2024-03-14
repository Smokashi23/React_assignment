import React, { useEffect, useState } from "react";
import "../css_styles/Todo.css";
import useFetchData from "./FetchData";

import TodoContainer from "../container/TodoContainer";
import NavbarTodo from "./Nav";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ViewTodo from "./ViewTodo";
import AddTodo from "./AddTodo";


const Todo = () => {
  const { data, loading, error, refetchData } = useFetchData(
    "http://localhost:8000/data"
  );
  const [searchQuery, setSearchQuery] = useState("")

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

  console.log("Todo re-rendered");

  return (
    <div className="todo-container">
      <BrowserRouter>
        <NavbarTodo />
        <div className="content">
          <h1>Oraganise your day</h1>
          <Routes>
            <Route path="/addTodo" element={<AddTodo />} />
            <Route path="/viewtodo/:id" element={<ViewTodo />} />
          
            <Route
              path="/"
              element={
                <TodoContainer data={data} refetchData={refetchData} />
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};
export default Todo;

