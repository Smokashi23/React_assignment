import React, { useEffect, useState } from "react";
import "../css_styles/Todo.css";
import useFetchData from "./FetchData";

import TodoContainer from "../container/TodoContainer";
import NavbarTodo from "./Nav";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ViewTodo from "./ViewTodo";
import AddTodo from "./AddTodo";

const Todo = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const goToPage = (page: number) => {
    setCurrentPage(page);
    console.log(setCurrentPage);
  };
  const { data, loading, error, refetchData } = useFetchData(
    `http://localhost:8000/data?_page=${currentPage}&_limit=2`,
    currentPage
  );

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
                <div>
                  {data ? (
                    <TodoContainer
                      data={data}
                      refetchData={refetchData}
                      goToPage={goToPage}
                      currentPage={currentPage}
                    />
                  ) : (
                    <div>No data available</div>
                  )}
                </div>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};
export default Todo;
