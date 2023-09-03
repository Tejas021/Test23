import React, { useEffect, useState } from 'react'
import GroupCard from '../../components/GroupCard/GroupCard'
import "./Groups.scss"
import AddGroupForm from '../../components/AddGroupForm/AddGroupForm'
import axios from 'axios'
const Groups = () => {
  const [groupToggle, setGroupToggle] = useState(false)
  const [groups, setGroups] = useState([])
  

  useEffect(()=>{
    axios.get("http://localhost:8080/api/group/all").then(res=>setGroups(res.data)).catch(err=>console.log(err))
  },[])


  return (
    <div className='container group-page'>

<button onClick={()=>setGroupToggle(!groupToggle)} className='btn bg-red '>Add group</button>
{groupToggle&&<AddGroupForm/>}
      <h2>Your Groups:</h2>
      <div className='group-container'>
{
  groups.map(group=><GroupCard group={group}/>)
}
      </div>


    </div>
  )
}

export default Groups