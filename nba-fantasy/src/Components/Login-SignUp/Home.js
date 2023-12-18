import React from 'react';
import { Link } from 'react-router-dom';
import { UseAuth } from '../context/AuthProvider';
import './Home.css';

const Home = ({ isAuthenticated }) => {
  const auth = UseAuth();
  return (
    <div className="container">
      <div className="header">
        <div className="text">
          {auth.user && (
            'Welcome back to NBA Fantasy Team Creator')}
             {!auth.user && ('Welcome to NBA Fantasy Team Creator')}
        </div>
        {isAuthenticated && (
          <div className="fantasy-buttons">
            <Link to="/Team">Create Fantasy Team</Link>
          </div>
        )}
      </div>
      <div className="buttons">
        {/* Use Link to navigate to the login and sign-up pages */}
        {auth.user && (
          <Link to="/team" className="login-button">Your Team</Link>
        )}
        {auth.user && (
          <Link to="/player" className="signup-button">Search Players</Link>
        )}

        {!auth.user && (
        <Link to="/login" className="login-button">
          Login
        </Link>
        )}
        {!auth.user && (
        <Link to="/register" className="signup-button">
          Sign Up
        </Link>
        )}
      </div>
    </div>
  );
};

export default Home;
