import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ViewTodo() {
  const params = useParams();
  
  const { data: todo, isLoading, isError } = useQuery(
    ["todo", params.id],
    async () => {
      const res = await axios.get(`http://localhost:8000/data/${params.id}`);
      return res.data.todo;
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching todo</div>;

  return (
    <div>
      <label>Todo : </label>
      <p>{todo}</p>
    </div>
  );
}
