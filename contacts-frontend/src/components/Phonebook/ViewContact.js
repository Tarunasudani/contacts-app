import "./ViewContact.css";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";

function ViewContact() {

  const contact = useSelector((state) => state.contact.selectedContact);

  return (
    <div className="view-contact">
      <div className="headers">
        <h1 className="name" name="contactName">
          {contact.contactName}
        </h1>

        <EditIcon className="edit" />
      </div>

      <div className="details">
        <div className="field">
          <p>Phone Number:</p>
          <p className="content">{contact.phoneNumber}</p>
        </div>

        <div className="field">
          <p>Email:</p>
          <p className="content">{contact.contactDetails.phoneNumber}</p>
        </div>

        <div className="field">
          <p>Address:</p>
          <p className="content">{contact.contactDetails.address}</p>
        </div>

        <div className="field">
          <p>Company:</p>
          <p className="content">{contact.contactDetails.company}</p>
        </div>
      </div>
    </div>
  );
}

export default ViewContact;
