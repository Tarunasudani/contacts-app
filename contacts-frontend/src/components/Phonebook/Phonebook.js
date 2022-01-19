import Sidebar from "./Sidebar";
import "./Phonebook.css";
import NewContact from "./NewContact";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function Phonebook() {

    useEffect(() => {
        sessionStorage.setItem("sessionToken","eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIzIiwiaWF0IjoxNjQyNTc1NDg4LCJzdWIiOiJ0ZW1wMkBnbWFpbC5jb20iLCJpc3MiOiJDb250YWN0c0FwaSIsImV4cCI6MTY0MjU4NDQ4OH0.sJkD_H9EoDT-2mvkU6HfRKwt1e6FC9nCJOjm-8WKxRY")
    });

    const contactSelector = useSelector((state) => state.contact);

    return (
        <div className="phonebook">
            <Sidebar />
            {
                contactSelector.addNewContact && <NewContact />
            }
        </div>

    );
}

export default Phonebook;