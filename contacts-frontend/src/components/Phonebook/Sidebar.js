import AddIcon from '@mui/icons-material/Add';
import { IconButton, LinearProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getContacts, addNewContact } from '../../redux/actions/contactActions';
import "./Sidebar.css";
import SidebarContact from './SidebarContact';


function Sidebar() {

    const dispatch = useDispatch();
    const contactSelector = useSelector((state) => state.contact);
    const [sortBy, setSortBy] = useState("contactName");
    const [searchPrefix, setSearchPrefix] = useState("");
    const navigate = useNavigate();
    
    useEffect(() => {
        dispatch(getContacts(navigate));
    }, [dispatch, navigate])


    function compareFn(contactA, contactB) {
        if (contactA[sortBy] < contactB[sortBy]) {
            return -1*(sortBy==="score" ? -1 : 1);
        }
        if (contactA[sortBy] > contactB[sortBy]) {
            return 1*(sortBy==="score" ? -1 : 1);
        }
        return 0;
    }
    

    return (
        <div className="sidebar">
            <div className="toolbar">
                <input className="search" placeholder="Search" value={searchPrefix} onChange={(e) => setSearchPrefix(e.target.value)} />
                <select placeholder="Sort By" onChange={(e) => setSortBy(e.target.value)}>
                    <option value="contactName">Name</option>
                    <option value="score">Score</option>
                </select>
                <div className="add-icon">
                    <IconButton onClick={() => {dispatch(addNewContact())}}>
                        <AddIcon style={{color: "#494C4F"}}/>
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