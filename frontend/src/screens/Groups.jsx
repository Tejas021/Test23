import React from 'react'
import GroupCard from '../components/GroupCard'
import "./Groups.css"
const Groups = () => {
  return (
    <div className='container '>


      <h2>Your Groups:</h2>
      <div className='group-container'>
      <GroupCard/>
      <GroupCard/>
      <GroupCard/>
      <GroupCard/>
      <GroupCard/>
      <GroupCard/>

      </div>


    </div>
  )
}

export default Groups