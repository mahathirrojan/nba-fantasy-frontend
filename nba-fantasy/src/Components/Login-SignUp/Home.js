import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = ({ isAuthenticated }) => {
  return (
    <div className="container">
      <div className="header">
        <div className="text">
          {isAuthenticated
            ? 'Welcome back to NBA Fantasy Team Creator'
            : 'Welcome to NBA Fantasy Team Creator'}
        </div>
        {isAuthenticated && (
          <div className="fantasy-buttons">
            <Link to="/Team">Create Fantasy Team</Link>
          </div>
        )}
      </div>
      <div className="buttons">
        {/* Use Link to navigate to the login and sign-up pages */}
        <Link to="/login" className="login-button">
          Login
        </Link>
        <Link to="/signup" className="signup-button">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Home;
