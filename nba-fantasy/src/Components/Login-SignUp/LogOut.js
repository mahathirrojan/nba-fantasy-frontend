

import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';  
import AuthContext from '../context/AuthProvider';

const Logout = () => {
  const { signout } = useContext(AuthContext);
  const navigate = useNavigate();  

  const handleLogout = () => {


    signout();

    navigate('/login'); 
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
