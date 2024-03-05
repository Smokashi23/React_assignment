import { useEffect } from "react"

export default function FetchData(){
//   const handledata=()=>{
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
// }

useEffect(()=>{
  fetch("http://localhost:8000/data")
  .then(res=>{
    console.log(res)
    return res.json()
  })
  .then(data => {
    console.log(data)
  })
  .catch(err=>{
    console.log(err)
  })
},[]
)

console.log("Here")
  return(
    <div>
      <h1>Hello</h1>
      {/* <button onClick={handledata}>ADD</button> */}
  
    </div>
  )

}