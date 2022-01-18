import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';
import "./Sidebar.css";
import SidebarContact from './SidebarContact';


const contacts = [
    {
        "contactId": "2022-01-17T15:23:21.000+00:00",
        "userId": 1,
        "contactName": "Ram Murti",
        "phoneNumber": "95821",
        "contactDetails": JSON.parse("\"{'email': 'tom@gmail.com','address': 'address 1','company': 'Flock'}\""),
        "score": 0,
        "createdAt": "2022-01-17T15:23:21.000+00:00",
        "modifiedAt": "2022-01-17T15:23:21.000+00:00"
    },
    {
        "contactId": "2022-01-17T15:23:21.000+00:00",
        "userId": 1,
        "contactName": "Tom harvey",
        "phoneNumber": "95821",
        "contactDetails": JSON.parse("\"{'email': 'tom@gmail.com','address': 'address 1','company': 'Flock'}\""),
        "score": 0,
        "createdAt": "2022-01-17T15:23:21.000+00:00",
        "modifiedAt": "2022-01-17T15:23:21.000+00:00"
    },
    {
        "contactId": "2022-01-17T15:23:21.000+00:00",
        "userId": 1,
        "contactName": "Shyam Sundar",
        "phoneNumber": "95821",
        "contactDetails": JSON.parse("\"{'email': 'tom@gmail.com','address': 'address 1','company': 'Flock'}\""),
        "score": 0,
        "createdAt": "2022-01-17T15:23:21.000+00:00",
        "modifiedAt": "2022-01-17T15:23:21.000+00:00"
    },
    {
        "contactId": "2022-01-17T15:23:21.000+00:00",
        "userId": 1,
        "contactName": "Vishesh Aggarwal",
        "phoneNumber": "95821",
        "contactDetails": JSON.parse("\"{'email': 'tom@gmail.com','address': 'address 1','company': 'Flock'}\""),
        "score": 0,
        "createdAt": "2022-01-17T15:23:21.000+00:00",
        "modifiedAt": "2022-01-17T15:23:21.000+00:00"
    },
    {
        "contactId": "2022-01-17T15:23:21.000+00:00",
        "userId": 1,
        "contactName": "Tom",
        "phoneNumber": "95821",
        "contactDetails": JSON.parse("\"{'email': 'tom@gmail.com','address': 'address 1','company': 'Flock'}\""),
        "score": 0,
        "createdAt": "2022-01-17T15:23:21.000+00:00",
        "modifiedAt": "2022-01-17T15:23:21.000+00:00"
    }
    ,{
        "contactId": "2022-01-17T15:23:21.000+00:00",
        "userId": 1,
        "contactName": "Tom",
        "phoneNumber": "95821",
        "contactDetails": JSON.parse("\"{'email': 'tom@gmail.com','address': 'address 1','company': 'Flock'}\""),
        "score": 0,
        "createdAt": "2022-01-17T15:23:21.000+00:00",
        "modifiedAt": "2022-01-17T15:23:21.000+00:00"
    },
    {
        "contactId": "2022-01-17T15:23:21.000+00:00",
        "userId": 1,
        "contactName": "Tom",
        "phoneNumber": "95821",
        "contactDetails": JSON.parse("\"{'email': 'tom@gmail.com','address': 'address 1','company': 'Flock'}\""),
        "score": 0,
        "createdAt": "2022-01-17T15:23:21.000+00:00",
        "modifiedAt": "2022-01-17T15:23:21.000+00:00"
    }
];

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="toolbar">
                <input className="search" placeholder="Search" />
                <select placeholder="Sort By">
                    <option value="contactName">Name</option>
                    <option value="score">Score</option>
                </select>
                <div className="add-icon">
                    <IconButton>
                        <AddIcon style={{color: "#494C4F"}}/>
                    </IconButton>
                </div>
            </div>
            <hr />
            <div style={{overflowY: "auto"}}>
                {
                    contacts.map((contact, id) => (
                        
                        <SidebarContact key={id} contact={contact} colorId={Math.floor(Math.random() * 10)} />
                    ))
                }
            </div>
        </div>
    );
}

export default Sidebar;