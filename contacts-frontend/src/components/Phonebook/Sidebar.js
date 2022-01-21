import AddIcon from '@mui/icons-material/Add';
import { IconButton, LinearProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getContacts, addNewContact } from '../../redux/actions/contactActions';
import "./Sidebar.css";
import SidebarContact from './SidebarContact';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';


function Sidebar() {

    const dispatch = useDispatch();
    const contactSelector = useSelector((state) => state.contact);
    const [sortBy, setSortBy] = useState("contactName");
    const [searchPrefix, setSearchPrefix] = useState("");
    const navigate = useNavigate();
    
    useEffect(() => {
        dispatch(getContacts(navigate));
    }, [dispatch, navigate])


    const compareFn = (contactA, contactB) => {
        if(sortBy === "score") {
            return contactA[sortBy] < contactB[sortBy] ? 1 : (contactA[sortBy] > contactB[sortBy] ? -1 : 0);
        } else {
            return contactA[sortBy].toLowerCase() < contactB[sortBy].toLowerCase() ? -1 : 1;
        }
    }
    
    const logout = () => {
        sessionStorage.removeItem("sessionToken");
        window.location.href = "/"
    }

    return (
        <div className="sidebar">
            <div className="toolbar">
                <input className="search" placeholder="Search" value={searchPrefix} onChange={(e) => setSearchPrefix(e.target.value)} />
                
                <div className="icon" style={searchPrefix.length > 0 ? {display: "none"} : {} }>
                    <IconButton onClick={() => {sortBy==="score" ? setSortBy("contactName") : setSortBy("score")}}>
                        <StarBorderIcon style={sortBy==="score" ? {color: "red"} : {color: "#494C4F"}} />
                    </IconButton>
                </div>
                <div className="icon" style={searchPrefix.length > 0 ? {display: "none"} : {} }>
                    <IconButton onClick={() => {dispatch(addNewContact())}}>
                        <AddIcon style={{color: "#494C4F"}}/>
                    </IconButton>
                </div>
                <div className="icon" style={searchPrefix.length > 0 ? {display: "none"} : {} }>
                    <IconButton onClick={() => logout()}>
                        <PowerSettingsNewIcon style={{color: "red"}}/>
                    </IconButton>
                </div>
                
            </div>
            <hr />

            <div style={{overflowY: "auto"}}>
                {
                    contactSelector.contactLoading ? 
                        <LinearProgress /> : 
                        contactSelector.contacts && contactSelector.contacts
                            .filter((contact) => contact.contactName.substring(0,searchPrefix.length).toLowerCase() === searchPrefix.toLowerCase())
                            .sort(compareFn).map((contact, id) => (
                                <SidebarContact key={id} contact={contact} colorId={id%10} /> 
                            ))
                }
            </div>
        </div>
    );
}

export default Sidebar;