import React from 'react'
import { Link } from 'react-router-dom';
import Logout from '../Login-SignUp/LogOut';
import { UseAuth } from '../context/AuthProvider';
import './NavBar.css';
const NavBar = () => {
    const auth = UseAuth();
  
    return (
      <nav>
        <ul>
        {!auth.user && (
            <li>
            <Link to="/login">Login</Link>
          </li>
          )}
        {!auth.user && (
            <li>
            <Link to="/register">Register</Link>
          </li>
          )}
          
          
          
          {auth.user && (
            <li>
            <Link to="/home">Home</Link>
          </li>
          )}
          {auth.user && (
            <li>
            <Link to="/team">Team</Link>
        </li>
          )}
          {auth.user && (
            <li>
            <Link to="/player">Player</Link>
          </li>
          )}
          
          {auth.user && (
            <li className="logout-button">
              <Logout />
            </li>
          )}
                
                
                
        </ul>
      </nav>
    );
  };

  export default NavBar