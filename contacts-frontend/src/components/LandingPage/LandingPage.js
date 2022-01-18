import Button from '@mui/material/Button';
import CallIcon from '@mui/icons-material/Call';
import "./LandingPage.css";



function LandingPage() {

    return (
        <div className="landing-page">
            <div className="main-section">
                <h1>ContactsApp<br />
                <CallIcon style={{fontSize: "135px", color: "white", paddingTop: "48px"}}/>
                </h1>
                
                <div className="buttons">
                    <Button variant="contained" style={{backgroundColor: "#04BE50", margin: "7px"}}>Register</Button>
                    <Button variant="outlined" style={{color: "#04BE50", border: "1px solid #04BE50", margin: "7px"}}>Login</Button>
                </div>
            </div>
        </div>
    )
}

export default LandingPage;