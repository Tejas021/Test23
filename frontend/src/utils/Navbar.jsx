import React, { useState } from 'react'
import {Link} from "react-router-dom"
import "./Navbar.css"
const Navbar = () => {
  const [user, setUser] = useState({name:"tejas.ko"})
  return (
    <nav className='navbar bg-black'>
      <div className='nav-icon'>
          <h2 className='logo'>DocX</h2>
      </div>
      <ul className='nav-tab'>
      <li className='nav-item'><Link  className='nav-link' to="/">home</Link></li>
      <li className='nav-item'><Link  className='nav-link' to="/create">create</Link></li>
      <li className='nav-item'><Link  className='nav-link' to="/group">group</Link></li>
{/* 
      {
        user? <li className='nav-item' ><Link className='nav-link' onClick={()=>setUser(null)}>logout</Link></li> : 
        <li className='nav-item' ><Link className='nav-link' to="/login">login</Link></li>
      } */}
     
      </ul>

      <div className='nav-user'>
        {
        user?
        <><p>Logged in as {user.name}</p><Link className='nav-link' onClick={()=>setUser(null)}><button className='btn logout bg-red text-dark'>logout</button></Link></>
        :
        <> <p>You are a guest</p>   <Link className='nav-link ' to="/login"><button className='btn logout bg-red text-dark'>login</button></Link></>
        }
      
      </div>
    </nav>
  )
}

export default Navbar