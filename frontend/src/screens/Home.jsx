import React, { useEffect, useState } from 'react'
import axios from "axios"
import {Link} from "react-router-dom"
import DocumentCard from '../components/DocumentCard'
import "./Home.css"
import GroupCard from '../components/GroupCard'
const Home = () => {
  const [data, setData] = useState([])

  useEffect(()=>{
    console.log("teS")
    axios.get("http://localhost:8080/api/document/all").then(res=>setData(res.data))
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
    {data.slice(0,8)?.map(document=><DocumentCard color={"bg-yellow"} document={document}/>)}
    </div>
    <Link to={"/all/all"}>See all</Link>


    <h2 className='subtitle'>Shared with you:</h2>
    <div className='document-card-container'>
    {data.slice(0,8)?.map(document=><DocumentCard color={"bg-green"} document={document}/>)}
    </div>
    <Link to={"/all/shared"}>See all</Link>


    <h2 className='subtitle'>Your Groups :</h2>
    <div className='document-card-container'>
    {data.slice(0,8)?.map(document=><GroupCard/>)}
    </div>
    <Link to={"/all/shared"}>See all</Link>



    </div>
  )
}

export default Home