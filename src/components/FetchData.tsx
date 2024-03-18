import { useEffect, useState } from "react";
import TodoItem from "../models/todoItem";
import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

// export default function useFetchData(url: string) {
//   const [data, setData] = useState<TodoItem[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [refetch, setFetch] = useState(false);

//   const refetchData = (value: boolean) => {
//     setFetch(value);
//   };

//   useEffect(() => {
//     setTimeout(() => {
//       fetch(url)
//         .then((res) => res.json())
//         .then((data) => {
//           setData(data);
//           setLoading(false);
//           setError(null);
//           refetchData(false);
//         })
//         .catch((error: any) => {
//           setError(error.message);
//           setLoading(false);
//         });
//     }, 1000);
//   }, [refetch]);

//   return { data, loading, error, refetchData };
// }

export default function useFetchData(url: string, page: number) {
  const { data, isLoading, isError, refetch } = useQuery<TodoItem[], Error>(
    ["todos", page],
    async () => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    }
  );
    console.log(data);
    
  return { data, loading: isLoading, error: isError, refetchData: refetch };
}

// export default function useFetchData(url:string) {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchData = async () => {
//     setLoading(true);
//       const response = await axios.get(url)

//       setData(response.data);
//   };

//   return { data, loading, error, refetchData: fetchData };
// }
