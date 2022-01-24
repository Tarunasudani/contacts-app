import "./Auth.css"
import Button from '@mui/material/Button';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {createUser} from "../../redux/actions/userActions";
import { Link, useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import { validateEmail } from "../../utils";

function Register() {

    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [registrationError, setRegistrationError] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userSelector = useSelector((state) => state.user);

    useEffect(() => {
        if(sessionStorage.getItem("sessionToken") ) {
            navigate("/app");
        }
    }, [navigate])

    const registerUser = () => {
        if(!validateEmail(email)) {
            setRegistrationError("Invalid E-mail");
        } else if(password.length === 0) {
            setRegistrationError("Password is empty!!!");
        } else {
            dispatch(createUser(email,password,navigate,setRegistrationError));
            setRegistrationError(null);
        }
    }

    return (
        <div className="landing-page">
            <div className="main-section">
                <h1>Register</h1>

                <p style={ registrationError !== null ? {color: "red"} : {display: "none"} }>{registrationError}</p>
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
                        registerUser();
                    }} 
                    style={{backgroundColor: "#04BE50", margin: "7px"}}
                >
                    Register
                </Button>
                <Link to="/login">
                    <p style={{color: "#0074CC"}}>Login</p>
                </Link>
            </div>
        </div>
    )

}
export default Register;