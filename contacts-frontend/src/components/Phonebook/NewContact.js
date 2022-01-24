import Button from '@mui/material/Button';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { SESSION_EXPIRED } from '../../constants';
import {updateNewContact, cancelNewContact, createContact} from '../../redux/actions/contactActions';
import { validateEmail, validatePhoneNumber } from '../../utils';


import "./NewContact.css"

function NewContact() {

    const dispatch = useDispatch();
    const contactSelector = useSelector((state) => state.contact);
    const navigate = useNavigate();
    const [newContactError, setNewContactError] = useState(null);

    function submitContact() {

        if(contactSelector.newContact.contactName.length === 0) {
            setNewContactError("Contact name not provided!!!")
        } else if(!validatePhoneNumber(contactSelector.newContact.phoneNumber)) {
            setNewContactError("Invalid phone number")
        } else if(contactSelector.newContact.email.length > 0 && !validateEmail(contactSelector.newContact.email)) {
            setNewContactError("Invalid email")
        } else {
            dispatch(createContact({
                "contactName": contactSelector.newContact.contactName,
                "phoneNumber": contactSelector.newContact.phoneNumber,
                "contactDetails": {
                    "email": contactSelector.newContact.email,
                    "address": contactSelector.newContact.address,
                    "company": contactSelector.newContact.company,
                }
            }, navigate, setNewContactError));
            setNewContactError(null);
        }
    }

    return (
        <div className="new-contact">
            <strong><input className="name" name="contactName" onChange={(e) => dispatch(updateNewContact("contactName",e.target.value))} value={contactSelector.newContact.contactName}/></strong>
            <p style={{textAlign: "center", color: "red"}}>{newContactError}</p>
            {
                newContactError === SESSION_EXPIRED && 
                    <Link to="/login">
                        <p style={{textAlign: "center", color: "#0074CC"}}>Login again</p>
                    </Link>
            }
            <div className="details">
                <div className="field">
                    <p>Phone Number:</p>
                    <input placeholder="+91" onChange={(e) => dispatch(updateNewContact("phoneNumber",e.target.value))} value={contactSelector.newContact.phoneNumber}/>
                </div>

                <div className="field">
                    <p>Email:</p>
                    <input type="email" placeholder="xyz@domain.com" onChange={(e) => dispatch(updateNewContact("email",e.target.value))} value={contactSelector.newContact.email}/>
                </div>

                <div className="field">
                    <p>Address:</p>
                    <input placeholder="Address" onChange={(e) => dispatch(updateNewContact("address",e.target.value))} value={contactSelector.newContact.address}/>
                </div>

                <div className="field">
                    <p>Company:</p>
                    <input placeholder="Company" onChange={(e) => dispatch(updateNewContact("company",e.target.value))} value={contactSelector.newContact.company}/>
                </div>

            </div>
            <div className="buttons">
                <Button variant="contained" onClick={()=> submitContact()} style={{backgroundColor: "#04BE50", marginRight: "21px"}}>Add</Button>
                <Button variant="outlined" onClick={() => {dispatch(cancelNewContact())}} style={{color: "#04BE50", border: "1px solid #04BE50"}}>Cancel</Button>
            </div>
        </div>
    );
}

export default NewContact;