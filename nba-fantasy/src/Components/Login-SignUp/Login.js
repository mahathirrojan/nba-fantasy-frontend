import React, {useRef, useState, useEffect, useContext} from 'react';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Register.css'
import axios from '../api/axios'
import AuthContext from '../context/AuthProvider';
import { Link } from "react-router-dom"
import Register from './Register';
import { UseAuth } from '../context/AuthProvider';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setPwd, setErrMsg, setSuccess  } from '../../actions'; 



const Login = () => {
    const dispatch = useDispatch();
    const { signin } = UseAuth();

    // Use useSelector to get the Redux state
    const user = useSelector(state => state.user);
    const pwd = useSelector(state => state.pwd);
    const errMsg = useSelector(state => state.errMsg);
    const success = useSelector(state => state.success);


    const userRef = useRef();
    const errRef = useRef();

    useEffect(() => {
        return () => {
            // Clear user and pwd state when component unmounts
            dispatch(setUser(''));
            dispatch(setPwd(''));
        };
    }, [dispatch]);
    
    useEffect(() => {
        console.log("userRef.current:", userRef.current);
        if (userRef.current) {
            userRef.current.focus();
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5001/auth/", JSON.stringify({ user, pwd }), {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });

            const accessToken = response?.data.accessToken;
            signin({ user, pwd, accessToken }); // You might need to update this part depending on your AuthContext
            dispatch(setUser(''));
            dispatch(setPwd(''));
            dispatch(setSuccess(true)); // Assuming you have a setSuccess action

        } catch (err) {
            console.error(err); // Log the full error
            if (!err?.response) {
                dispatch(setErrMsg('No Response from Server')); // Assuming you have a setErrorMessage action
            } else if (err.response?.status === 400) {
                dispatch(setErrMsg('Missing Username or Password'));
            } else if (err.response?.status === 401) {
                dispatch(setErrMsg('Unauthorized'));
            } else {
                dispatch(setErrMsg('Login Failed'));
            }
            errRef.current.focus();
        }
    };

    return (
        <>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <Link to="/home">Go To Home</Link>
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
                            onChange={(e) => dispatch(setUser(e.target.value))}
                            value={user}
                            required
                        />
                        <label htmlFor="password">Password: </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => dispatch(setPwd(e.target.value))}
                            value={pwd}
                            required
                        />
                        <button>Login</button>
                    </form>
                    <p>
                        New Here?<br />
                        <span>
                            <Link to="/register">Sign Up</Link>
                        </span>
                    </p>
                </section>
            )}
        </>
    );
};

export default Login;