import "./Auth.css"
import Button from '@mui/material/Button';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {createUser} from "../../redux/actions/userActions";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';

function Register() {

    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userSelector = useSelector((state) => state.user);

    return (
        <div className="landing-page">
            <div className="main-section">
                <h1>Register</h1>
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
                        dispatch(createUser(email,password,navigate))
                    }} 
                    style={{backgroundColor: "#04BE50", margin: "7px"}}
                >
                    Register
                </Button>
            </div>
        </div>
    )

}
export default Register;