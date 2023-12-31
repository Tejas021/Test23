import React from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/reducers/authSlice";
const Navbar = () => {
  const user1 = useSelector((state) => state.auth.currentUser);
  const path = useSelector((state) => state.path.currentPath);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="navbar text-dark bg-grey">
      <div className="nav-icon">
        <h2 className="logo">
          <span className="text-dark">Doc</span>
          <span className="text-blue">X</span>
        </h2>
      </div>

      <ul className="nav-tab">
        <li className="nav-item">
          <Link className="nav-link" to="/">
            home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/create">
            create
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/groups">
            group
          </Link>
        </li>
        {/* 
      {
        user? <li className='nav-item' ><Link className='nav-link' onClick={()=>setUser(null)}>logout</Link></li> : 
        <li className='nav-item' ><Link className='nav-link' to="/login">login</Link></li>
      } */}
      </ul>

      <div className="nav-user">
        {user1 ? (
          <>
            <p>Logged in as {user1.given_name}</p>
            <Link className="nav-link">
              <button
                className="btn logout bg-blue text-dark"
                onClick={() => handleLogout()}
              >
                logout
              </button>
            </Link>
          </>
        ) : (
          <>
            <p>You are a guest</p>
            <Link className="nav-link " to="/login">
              <button className="btn logout bg-grey text-dark">login</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
