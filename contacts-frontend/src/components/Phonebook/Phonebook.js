import Sidebar from "./Sidebar";
import "./Phonebook.css";
import NewContact from "./NewContact";

function Phonebook() {
    return (
        <div className="phonebook">
            <Sidebar />
            <NewContact />
        </div>

    );
}

export default Phonebook;