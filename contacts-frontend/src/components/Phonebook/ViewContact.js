import "./ViewContact.css";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from "react-redux";
import {updateContact, editContact, cancelUpdate, updateContactScore} from '../../redux/actions/contactActions';

function ViewContact() {

  const contactSelector = useSelector((state) => state.contact);
  const dispatch = useDispatch();

  function submitContact() {
    if(contactSelector.editContact.contactName.length > 0 && contactSelector.editContact.phoneNumber.length > 0) {
        dispatch(updateContact({
            "contactId" : contactSelector.selectedContact.contactId,
            "contactName": contactSelector.editContact.contactName,
            "phoneNumber": contactSelector.editContact.phoneNumber,
            "contactDetails": {
                "email": contactSelector.editContact.email,
                "address": contactSelector.editContact.address,
                "company": contactSelector.editContact.company,
            }
        }))
    } else {
        alert("Name and Phone number are required fields")
    }
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
          <EditIcon onClick={() => dispatch(editContact("editing", true)) } className="edit" />
        }
        
      </div>

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
