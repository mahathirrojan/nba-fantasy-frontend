import React, {useRef, useState, useEffect, useContext} from 'react';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Register.css'
import axios from '../api/axios'
import AuthContext from '../context/AuthProvider';
import { Link } from "react-router-dom"
import Register from './Register';
import { UseAuth } from '../context/AuthProvider';



const Login = () => {
    const { signin } = UseAuth();
    const userRef = useRef();
    const errRef = useRef(); 

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user,pwd])

    const handleSubmit = async(e) => {
        e.preventDefault(); 

        try{
            const response = await axios.post("http://localhost:5001/auth/", JSON.stringify({user, pwd}),
            {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
            }
        );
        console.log(JSON.stringify(response?.data));
        // console.log(JSON.stringify(response));
        const accessToken = response?.data.accessToken;
        console.log(accessToken);

        signin({ user, pwd, accessToken });
        setUser('');
        setPwd('');
        setSuccess(true);

        } catch (err) {
            console.error(err); // Log the full error
            if (!err?.response) {
                setErrMsg('No Response from Server');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
        
    }
  return (
    <>
        {success ? (
            <section>
                <h1>You are logged in!</h1>
                <br />
                <p>
                    {/* This is where the router to Team should be  */}
                    <Link to="/home">Go To Home</Link>
                </p>
            </section>
        ) : (
    <section>
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username: </label>
            <input 
            type="text" 
            id="username" 
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
            /> 
            <label htmlFor="password">Password: </label>
            <input 
            type="password" 
            id="password" 
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
            /> 
            <button>Login</button>
        </form>
        <p>
            New Here?<br />
            {/* register router goes here  */}
            <span>
            <Link to="/register">Sign Up</Link>
            </span>
        </p>
    </section>
        )}
        </>
  )
}

export default Login