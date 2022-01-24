import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';

import { selectContact, deleteContact, updateContactScore, getContacts } from '../../redux/actions/contactActions';
import { colors } from '../../constants';
import "./SidebarContact.css";


const SidebarContact = ({contact, colorId}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const contactSelector = useSelector( (state) => state.contact );
    const [isSelected, setIsSelected] = useState(false);
    const [hover, setHover] = useState(false);

    useEffect(() => {
        if ( contactSelector.selectedContact !== null) {
            if (contactSelector.selectedContact.contactId === contact.contactId) {
                setIsSelected(true);
            } else {
                setIsSelected(false);
            }
        }
    }, [contactSelector.selectedContact, contact.contactId])

    const getInitials = (name) => {
        var initials = "";
        name.split(" ").forEach(part => {
            initials += part[0].toUpperCase();
        });
        return initials;
    }
    
    const handleClick = () => {
        dispatch(selectContact(contact)); 
        dispatch(updateContactScore(contact)); 
        dispatch(getContacts());
        setIsSelected(true);
    }


    return (
        <div id={contact.contactId} style={{backgroundColor: (hover||isSelected)  &&  "#4A4C4F"}}>
            <div onClick={() => {handleClick()}  } onMouseOver={() => {setHover(true)}} onMouseLeave={() => {setHover(false)}} className="sidebar-contact">
                <Avatar sx={{bgcolor: colors[colorId]}}>{getInitials(contact.contactName)}</Avatar>
                <p style={{width: "100%"}}>{contact.contactName}</p>
                {
                    hover && <IconButton onClick = {(e) => { e.stopPropagation(); dispatch(deleteContact(contact, navigate)); }} >
                        <DeleteIcon  style={{color: "#898A8C"}}/>
                    </IconButton>
                }
            </div>
        <hr />
        </div>
    );
}

export default SidebarContact;