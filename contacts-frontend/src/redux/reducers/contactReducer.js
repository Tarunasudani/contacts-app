import { ADD_NEW_CONTACT, CANCEL_NEW_CONTACT, CREATE_NEW_CONTACT_FAILURE,  CREATE_NEW_CONTACT_SUCCESS, GET_ALL_CONTACTS, GET_ALL_CONTACTS_FAILURE, GET_ALL_CONTACTS_SUCCESS, UPDATE_NEW_CONTACT, SELECT_CONTACT, EDIT_CONTACT, UPDATE_CONTACT_SUCCESS, UPDATE_CONTACT_FAILURE, CANCEL_UPDATE } from "../actions/actionTypes";

const initialState = {
    contacts: null,
    error: null,
    contactsLoading: false,
    addNewContact: false,
    selectedContact : null,
    editContact : {
        editing : false,
        contactName: "Name",
        phoneNumber: "",
        email: "",
        address: "",
        company: "", 
    },
    newContact: {
        contactName: "Name",
        phoneNumber: "",
        email: "",
        address: "",
        company: "",        
    },
    newContactError: null,
    updateContactError : null,
}

const contactReducer = (prevState = initialState, action) => {
    switch(action.type) {
        case GET_ALL_CONTACTS: return {
            ...prevState,
            contactsLoading: true,
        }

        case GET_ALL_CONTACTS_SUCCESS: return {
            ...prevState,
            contactsLoading: false,
            contacts: action.payload,
            error: null,
        }

        case GET_ALL_CONTACTS_FAILURE: return {
            ...prevState,
            contactsLoading: false,
            error: action.payload,
            contacts: null,
        }

        case ADD_NEW_CONTACT: return {
            ...prevState,
            addNewContact: true,
            selectedContact: null
        }

        case CANCEL_NEW_CONTACT: return {
            ...prevState,
            addNewContact: false,
            newContact: {
                contactName: "Name",
                phoneNumber: "",
                email: "",
                address: "",
                company: "",        
            }
        }

        case UPDATE_NEW_CONTACT: 
            let newContact = prevState.newContact
            newContact[action.payload.field] = action.payload.value;
            return {
                ...prevState,
                newContact: newContact
            }

        case CREATE_NEW_CONTACT_SUCCESS:
            let contact = action.payload
            contact.contactDetails = JSON.stringify(contact.contactDetails)
            let contactsList = prevState.contacts
                contactsList.push(contact)
            return {
                ...prevState,
                contacts: contactsList,
                addNewContact: false,
                newContact: {
                    contactName: "Name",
                    phoneNumber: "",
                    email: "",
                    address: "",
                    company: "",        
                },
                newContactError: null,
            }
        
        case CREATE_NEW_CONTACT_FAILURE:
            return {
                ...prevState,
                newContact: {
                    contactName: "Name",
                    phoneNumber: "",
                    email: "",
                    address: "",
                    company: "",        
                },
                newContactError: action.payload
            }
        
        case SELECT_CONTACT:
            let currentContact = action.payload
            return {
                ...prevState,
                selectedContact : currentContact,
                addNewContact : false
            }
        
        case EDIT_CONTACT:
            let editedContact = prevState.editContact;
            editedContact[action.payload.field] = action.payload.value;
            return {
                ...prevState,
                editContact : editedContact
            }
        
        case UPDATE_CONTACT_SUCCESS:
            editedContact = prevState.editContact;
            editedContact.editing = false;
            return {
                ...prevState,
                editContact : editedContact,
                selectedContact : action.payload
            }
        
        case UPDATE_CONTACT_FAILURE:
            return {
                ...prevState,
                updateContactError : action.payload
            }

        case CANCEL_UPDATE : 
            let failedUpdateContact = prevState.editContact;
            failedUpdateContact.editing = false;
            return {
                ...prevState,
                editContact : failedUpdateContact
            }

        default:
            return prevState;
    }
}

export default contactReducer;