import Button from '@mui/material/Button';

import "./NewContact.css"

function NewContact() {
    return (
        <div className="new-contact">
            <h1 contentEditable className="name" name="contactName" >Name</h1>
            <div className="details">
                <div className="field">
                    <p>Phone Number:</p>
                    <input placeholder="+91"/>
                </div>

                <div className="field">
                    <p>Email:</p>
                    <input type="email" placeholder="xyz@domain.com"/>
                </div>

                <div className="field">
                    <p>Address:</p>
                    <input placeholder="Address" />
                </div>

                <div className="field">
                    <p>Company:</p>
                    <input placeholder="Company" />
                </div>

            </div>
            <div className="buttons">
                
                <Button variant="contained" style={{backgroundColor: "#04BE50", marginRight: "21px"}}>Add</Button>
                <Button variant="outlined" style={{color: "#04BE50", border: "1px solid #04BE50"}}>Cancel</Button>
            </div>
        </div>
    );
}

export default NewContact;