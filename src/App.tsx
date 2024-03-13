import React from "react";
import "./App.css";
import Todo from "./components/Todo";
import "bootstrap/dist/css/bootstrap.css";
import FetchData from "./components/FetchData";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import List from "./container/TodoContainer";

function App() {
  return (
  <Todo />
  );
}

export default App;
