import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import EditIcon from "@mui/icons-material/Edit";
import Button from '@mui/material/Button';

import {updateContact, editContact, cancelUpdate, setContactError} from '../../redux/actions/contactActions';
import { validateEmail, validatePhoneNumber } from '../../utils';
import { SESSION_EXPIRED } from '../../constants';
import "./ViewContact.css";

const ViewContact = () => {

  const contactSelector = useSelector((state) => state.contact);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitContact = () => {

    if(contactSelector.editContact.contactName.length === 0) {
      dispatch(setContactError("Contact name not provided!!!"));
    } else if(!validatePhoneNumber(contactSelector.editContact.phoneNumber)) {
      dispatch(setContactError("Invalid phone number"));
    } else if(contactSelector.editContact.email.length > 0 && !validateEmail(contactSelector.editContact.email)) {
      dispatch(setContactError("Invalid email"));
    } else {
        dispatch(updateContact({
          "contactId" : contactSelector.selectedContact.contactId,
          "contactName": contactSelector.editContact.contactName,
          "phoneNumber": contactSelector.editContact.phoneNumber,
          "contactDetails": {
              "email": contactSelector.editContact.email,
              "address": contactSelector.editContact.address,
              "company": contactSelector.editContact.company,
          }
        }, navigate));
        dispatch(setContactError(null));
    }
}

  const editHandler = () => {
    dispatch(editContact("editing", true));
    dispatch(editContact("contactName", contactSelector.selectedContact.contactName));
    dispatch(editContact("phoneNumber", contactSelector.selectedContact.phoneNumber));
    dispatch(editContact("address", JSON.parse(contactSelector.selectedContact.contactDetails).address));
    dispatch(editContact("email", JSON.parse(contactSelector.selectedContact.contactDetails).email));
    dispatch(editContact("company", JSON.parse(contactSelector.selectedContact.contactDetails).company));
  }

  return (
    <div className="view-contact">
      <div className="headers">
        {
          (contactSelector.editContact.editing)
          &&
          <strong><input className="name" onChange={(e) => dispatch(editContact("contactName",e.target.value))} value={contactSelector.editContact.contactName} /></strong>
        }

        {
          (!(contactSelector.editContact.editing))
          &&
          <strong><input className="name" value={contactSelector.selectedContact.contactName} readOnly/></strong>
        }

        {
          (!(contactSelector.editContact.editing))
          &&
          <EditIcon onClick={() => editHandler() } className="edit" />
        }
        
      </div>
      <p style={{textAlign: "center", color: "red"}}>{contactSelector.contactError}</p>
      {
          contactSelector.contactError === SESSION_EXPIRED && 
              <Link to="/login">
                  <p style={{textAlign: "center", color: "#0074CC"}}>Login again</p>
              </Link>
      }

      <div className="details">
        <div className="field">
          <p>Phone Number:</p>
          {
            (contactSelector.editContact.editing)
            &&
            <input onChange={(e) => dispatch(editContact("phoneNumber",e.target.value))} value={contactSelector.editContact.phoneNumber} />
          }

          {
            (!(contactSelector.editContact.editing))
            &&
            <input value={contactSelector.selectedContact.phoneNumber} readOnly/>
          }
        </div>

        <div className="field">
          <p>Email:</p>
          {
            (contactSelector.editContact.editing)
            &&
            <input onChange={(e) => dispatch(editContact("email",e.target.value))} value={contactSelector.editContact.email} />
          }

          {
            (!(contactSelector.editContact.editing))
            &&
            <input value={JSON.parse(contactSelector.selectedContact.contactDetails).email} readOnly/>
            }
          
        </div>

        <div className="field">
          <p>Address:</p>
          {
            (contactSelector.editContact.editing)
            &&
            <input onChange={(e) => dispatch(editContact("address",e.target.value))} value={contactSelector.editContact.address} />
          }

          {
            (!(contactSelector.editContact.editing))
            &&
            <input value={JSON.parse(contactSelector.selectedContact.contactDetails).address} readOnly/>
          }
        </div>

        <div className="field">
          <p>Company:</p>
          {
            (contactSelector.editContact.editing)
            &&
            <input onChange={(e) => dispatch(editContact("company",e.target.value))} value={contactSelector.editContact.company} />
          }

          {
            (!(contactSelector.editContact.editing))
            &&
            <input value={JSON.parse(contactSelector.selectedContact.contactDetails).company} readOnly/>
          }
          
        </div>
      </div>

      <div className="buttons">
        {
          (contactSelector.editContact.editing)
          &&
          <Button variant="contained" onClick={()=> submitContact()} style={{backgroundColor: "#04BE50", marginRight: "21px"}}>Update</Button>
        }

        {
          (contactSelector.editContact.editing)
          &&
          <Button variant="outlined" onClick={() => {dispatch(cancelUpdate())}} style={{color: "#04BE50", border: "1px solid #04BE50"}}>Cancel</Button>
        }   
                
      </div>

    </div>
  );
}

export default ViewContact;
