import React, {useRef, useState, useEffect} from 'react';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Register.css'
import axios from '../api/axios'



// User Regex: Allows alphanumeric characters (lowercase/uppercase) and underscores, with a length between 3 and 20 characters.
const userRegex = /^[a-zA-z][a-zA-Z0-9_]{3,23}$/;

// Password Regex: Requires a minimum of 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character.
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,24}$/;

const register_url = '/register';
const Register = () => {
    const userRef = useRef(); 
    const errRef = useRef()
    
    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false); 
    const [userFocus, setUserFocus] = useState(false); // whether we have focus on that input field 

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false); 
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        const result = userRegex.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user])

    useEffect(() => {
        const result = passwordRegex.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd; 
        setValidMatch(match);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const v1 = userRegex.test(user);
        const v2 = passwordRegex.test(pwd);
        if (!v1 || !v2){
            setErrMsg("Invalid Entry");
            return;
            // prevents accidental enabling of the button
        }
        try{
            const response = await axios.post(register_url, JSON.stringify({user, pwd}), {headers: { 'Content-Type' : 'application/json'}, withCredentials: true}
            );
            console.log(response.data);
            console.log(response.accessToken);
            console.log(JSON.stringify)
            setSuccess(true);
            // maybe we can clear input fields here
        } catch (err){
            if(!err?.response){
                setErrMsg('No response from server')
            } else if(err.response?.status === 409){
                setErrMsg('Username already exists');
            } else{
                setErrMsg('Failed Registration');
            }
            errRef.current.focus();
        }
    }


  return (
    <>
    {success ? (
        <section>
            <h1>Success</h1><p>
                <a href="#">Sign In</a>
            </p>
        </section>
    ) : (
    <section>
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username: 
                <span className={validName ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validName || !user ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                </span>
            </label>
            <input 
            type="text" 
            id="username" 
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            required
            aria-invalid={validName ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
            />
            <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
            <FontAwesomeIcon icon={faInfoCircle} />
            4 to 24 characters.<br />
            Must begin with a letter.<br />
            Letters, numbers, underscores, hyphens allowed.
            </p>

            <label htmlFor="password">
                Password:
                <span className={validPwd ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validPwd || !pwd ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
                </span>
            </label>
            <input
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                required
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
                />
                <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    8 to 24 characters.<br/>
                    At least one uppercase and lowercase letter, a number and  a special character<br/>
                    Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="%">%</span>
                </p>
            
                <label htmlFor="confirm_pwd">
                    Confirm Password:
                    <span className={validMatch && matchPwd ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validMatch|| !matchPwd ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} /> 
                    </span>
                </label>
                <input
                    type="password"
                    id="confirm_pwd"
                    onChange={(e) => setMatchPwd(e.target.value)}
                    required
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="confirmpwdnote"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                />
                <p id="confirmpwdnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Must match teh first password input field.
                </p>

                <button disabled={!validName || !validPwd || !validMatch ?true : false }>Sign Up</button>

        </form>
        <p>
            Already a member?<br /> 
            <span className="line">
                <a href="#">Sign In</a>
            </span>
        </p>
    </section>
        )}
    </>
  )
}

export default Register 
