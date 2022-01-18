import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';

import "./SidebarContact.css";
import { IconButton } from '@mui/material';
import { colors } from '../../constants';



function SidebarContact({contact, colorId}) {

    function getInitials(name) {
        var initials = "";
        name.split(" ").forEach(part => {
            initials += part[0].toUpperCase();
        });
        return initials;
    }
    const [hover, setHover] = useState(false);
    

    return (
        <div style={{backgroundColor: hover &&  "#4A4C4F"}}>
            <div onMouseOver={() => {setHover(true)}} onMouseLeave={() => {setHover(false)}} className="sidebar-contact">
                <Avatar sx={{bgcolor: colors[colorId]}}>{getInitials(contact.contactName)}</Avatar>
                <p style={{width: "100%"}}>{contact.contactName}</p>
                {
                    hover && <IconButton>
                        <DeleteIcon style={{color: "#898A8C"}}/>
                    </IconButton>
                }
            </div>
        <hr />
        </div>
    );
}

export default SidebarContact;