import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import CallIcon from '@mui/icons-material/Call';
import ContactsIcon from '@mui/icons-material/Contacts';

import "./LandingPage.css";


const LandingPage = () => {

    const navigate = useNavigate();

    useEffect(() => {
        if(sessionStorage.getItem("sessionToken") ) {
            navigate("/app");
        }
    }, [navigate])

    return (
        <div className="landing-page">
            <div className="main-section">
                <h1>ContactsApp<br />
                    <CallIcon style={{fontSize: "135px", color: "white", paddingTop: "48px"}}/>
                    <ContactsIcon style={{fontSize: "135px", color: "#04BE50", paddingTop: "48px"}} />
                </h1>
                
                <div className="buttons">
                    <Link to="/register" style={{textDecoration: "none"}}>
                        <Button variant="contained" style={{backgroundColor: "#04BE50", margin: "7px"}}>Register</Button>
                    </Link>
                    <Link to="/login" style={{textDecoration: "none"}}>
                        <Button variant="outlined" style={{color: "#04BE50", border: "1px solid #04BE50", margin: "7px"}}>Login</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default LandingPage;