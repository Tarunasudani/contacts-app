import { useSelector } from "react-redux";

import Sidebar from "./Sidebar";
import NewContact from "./NewContact";
import ViewContact from "./ViewContact";
import "./Phonebook.css";

const Phonebook = () => {

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