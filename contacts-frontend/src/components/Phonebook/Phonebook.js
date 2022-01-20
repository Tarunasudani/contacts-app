import Sidebar from "./Sidebar";
import "./Phonebook.css";
import NewContact from "./NewContact";
import { useSelector } from "react-redux";

function Phonebook() {

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