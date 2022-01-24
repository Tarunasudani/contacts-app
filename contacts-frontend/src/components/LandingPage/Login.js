import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

import {verifyUser} from "../../redux/actions/userActions";
import { validateEmail } from "../../utils";
import "./Auth.css"


const Login = () => {

    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [authError, setAuthError] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userSelector = useSelector((state) => state.user);

    useEffect(() => {
        if(sessionStorage.getItem("sessionToken") ) {
            navigate("/app");
        }
    }, [navigate])

    const loginUser = () => {
        if(!validateEmail(email)) {
            setAuthError("Invalid E-mail");
        } else if(password.length === 0) {
            setAuthError("Password is empty!!!");
        } else {
            dispatch(verifyUser(email,password,navigate, setAuthError));
            setAuthError(null);
        }
    }

    return (
        <div className="landing-page">
            <div className="main-section">
                <h1>Login</h1>
                <p style={ authError !== null ? {color: "red"} : {display: "none"} }>{authError}</p>
                <div style={{width: "80%"}}>
                    <div className="auth-field">
                        <p>Email:</p>
                        <input type="email" placeholder="xyz@domain.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="auth-field">
                        <p>Password:</p>
                        <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    
                </div>
                {
                    userSelector.loading && <CircularProgress />
                }
                <Button 
                    variant="contained" 
                    onClick={() => {
                        loginUser();
                    }} 
                    style={{backgroundColor: "#04BE50", margin: "7px"}}
                >
                    Login
                </Button>
            </div>
        </div>
    )

}


export default Login;