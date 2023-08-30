import  Axios  from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import DocumentCard from '../components/DocumentCard';

const AllDocs = () => {
  const {type} =  useParams();
  const [config, setConfig] = useState({title:"Page Not found 404",color:"bg-red"})
const [docs, setDocs] = useState([])
  useEffect(()=>{
    if(type==="all"){
        setConfig({color:"bg-yellow",title:"All Documents"})
      }else if(type==="shared"){
        setConfig({color:"bg-green",title:"Shared Documents"})
      }
Axios.get(`http://localhost:8080/api/document/all`).then(res=>setDocs(res.data)).catch(err=>console.log(err));

  },[type])

 

    return (
    <div className='container'>
<h1>{config.title}</h1>

<div className='document-card-container'>
    {docs.map(document=><DocumentCard color={config.color} document={document}/>)}
    </div>
    </div>
  )
}

export default AllDocs