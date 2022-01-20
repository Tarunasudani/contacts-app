import Sidebar from "./Sidebar";
import "./Phonebook.css";
import NewContact from "./NewContact";
import { useSelector } from "react-redux";
import ViewContact from "./ViewContact";

function Phonebook() {

    const contactSelector = useSelector((state) => state.contact);

    return (
        <div className="phonebook">
            <Sidebar />
            {
                contactSelector.addNewContact && <NewContact />
            }
            {
                contactSelector.selectedContact && <ViewContact/>
            }
        </div>

    );
}

export default Phonebook;