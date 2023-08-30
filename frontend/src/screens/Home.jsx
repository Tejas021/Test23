import React, { useEffect, useState } from 'react'
import axios from "axios"
import {Link} from "react-router-dom"
import DocumentCard from '../components/DocumentCard'
import "./Home.css"
const Home = () => {
  const [data, setData] = useState([])

  useEffect(()=>{
    console.log("teS")
    axios.get("http://localhost:8080/api/document").then(res=>setData(res.data))
  },[])

  return (
    <div className='container'>{console.log(JSON.stringify(data))}

{/* SEARCH */}
<div className='search-form'>
  <input className='search-bar'/>
  <button className='btn search-button  bg-green text-dark'>Search</button>
</div>

    <button className='btn bg-blue add-button text-dark'><Link className='link add-button' to="/create">+ Add Document</Link> </button>



    <h2 className='subtitle'>All Documents:</h2>
    <div className='document-card-container'>
    {data?.map(document=><DocumentCard color={"bg-yellow"} document={document}/>)}
    </div>


    <h2 className='subtitle'>Shared with you:</h2>
    <div className='document-card-container'>
    {data?.map(document=><DocumentCard color={"bg-green"} document={document}/>)}
    </div>




    </div>
  )
}

export default Home