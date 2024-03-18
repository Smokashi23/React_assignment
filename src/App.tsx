import React from "react";
import "./App.css";
import Todo from "./components/Todo";
import "bootstrap/dist/css/bootstrap.css";
import FetchData from "./components/FetchData";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import List from "./container/TodoContainer";
import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient= new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Todo />
    </QueryClientProvider>
  );
}

export default App;
