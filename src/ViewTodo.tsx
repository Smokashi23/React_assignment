import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ViewTodo() {
  const [todo, setTodo] = useState<string>("");
  const params = useParams();

  useEffect(() => {
    console.log(todo);
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:8000/data/${params.id}`).then(
          (resp) => resp.json()
        );
        setTodo(res.todo);
      } catch (error) {
        console.error("Error fetching todo:", error);
      }
    };
    fetchData();
  }, [params.id]);

  return (
    <div>
      <label>Todo : </label>
      <p>{todo}</p>
    </div>
  );
}
