 import { useEffect, useState } from "react"
import TodoItem from "./models/todoItem";


// export default function useFetchData(){
// //   const handledata=()=>{
// //   fetch("http://localhost:8000/data")
// //   .then(res=>{
// //     console.log(res)
// //     return res.json()
// //   })
// //   .then(data => {
// //     console.log(data)
// //   })
// //   .catch(err=>{
// //     console.log(err)
// //   })
// // }

// useEffect(()=>{
//   fetch("http://localhost:8000/data")
//   .then(res=>{
//     console.log(res)
//     return res.json()
//   })
//   .then(data => {
//     console.log(data)
//   })
//   .catch(err=>{
//     console.log(err)
//   })
// },[]
// )

// console.log("Here")
//   return(
//     <div>
//       <h1>Hello</h1>
//       {/* <button onClick={handledata}>ADD</button> */}
//     </div>
//   )

// }

export default function useFetchData(url:string){
  const [data, setData] = useState <TodoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=> {

  setTimeout(()=>{
    fetch(url)
    .then((res)=> res.json())
    .then((data)=>{setData(data);setLoading(false);setError(null)})
    .catch((error:any)=>{setError(error.message)
      setLoading(false)});
  },1000)
  },[]);

  return {data,loading,error}
}


