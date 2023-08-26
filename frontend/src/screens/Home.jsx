import React, { useEffect, useState } from 'react'
import axios from "axios"
const Home = () => {
  const [data, setData] = useState({})

  useEffect(()=>{
    console.log("teS")
    axios.get("http://localhost:8080/api/hello").then(res=>setData(res.data.message))
  },[])

  return (
    <div>{JSON.stringify(data)}</div>
  )
}

export default Home