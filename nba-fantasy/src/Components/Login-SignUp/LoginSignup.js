import React, { useState } from 'react';
import './LoginSignup.css';
import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';

export const LoginSignup = () => {
  const [action, setAction] = useState('Sign Up');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    // Perform the sign-up operation
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      // Handle the response
      const data = await response.json();
      console.log(data); // You may want to do something with the response data
    } catch (error) {
      console.error('Error during sign-up:', error);
    }
  };

  const handleLogin = async () => {
    // Perform the login operation
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      // Handle the response
      const data = await response.json();
      console.log(data); // You may want to do something with the response data
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {action === 'Login' ? (
          <div></div>
        ) : (
          <div className="input">
            <img src={user_icon} alt="" />
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}

        <div className="input">
          <img src={email_icon} alt="" />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      {action === 'Sign Up' ? (
        <div></div>
      ) : (
        <div className="forgot-password">
          Lost Password? <span>Click Here</span>
        </div>
      )}

      <div className="submit-container">
        <div
          className={action === 'Login' ? 'submit gray' : 'submit'}
          onClick={action === 'Login' ? handleLogin : handleSignUp}
        >
          {action === 'Login' ? 'Login' : 'Sign Up'}
        </div>
        <div
          className={action === 'Sign Up' ? 'submit gray' : 'submit'}
          onClick={() => setAction(action === 'Login' ? 'Sign Up' : 'Login')}
        >
          {action === 'Sign Up' ? 'Sign Up' : 'Login'}
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
