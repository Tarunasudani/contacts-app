import { ADD_NEW_CONTACT, CANCEL_NEW_CONTACT, CREATE_NEW_CONTACT_FAILURE,  CREATE_NEW_CONTACT_SUCCESS, GET_ALL_CONTACTS, GET_ALL_CONTACTS_FAILURE, GET_ALL_CONTACTS_SUCCESS, UPDATE_NEW_CONTACT, SELECT_CONTACT, EDIT_CONTACT, UPDATE_CONTACT_SUCCESS, UPDATE_CONTACT_FAILURE, CANCEL_UPDATE, DELETE_CONTACT_FAILURE, DELETE_CONTACT_SUCCESS, UPDATE_CONTACT_SCORE_SUCCESS, UPDATE_CONTACT_SCORE_FAILURE  } from "../actions/actionTypes";

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
    deleteContactError : null,
    updateContactScoreError : null,
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
            contact.contactDetails = JSON.stringify(contact.contactDetails);
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
            return {
                ...prevState,
                editContact : {
                    editing : false,
                    contactName: "Name",
                    phoneNumber: "",
                    email: "",
                    address: "",
                    company: "", 
                },
                selectedContact : action.payload
            }
        
        case UPDATE_CONTACT_FAILURE:
            let editedContactFailure = prevState.editContact;
            editedContactFailure.editing = false;
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
        
        case DELETE_CONTACT_SUCCESS : 
            return {
                ...prevState,
                selectedContact : null
            }

        case DELETE_CONTACT_FAILURE : 
            return {
                ...prevState,
                deleteContactError : action.payload
            }

        case UPDATE_CONTACT_SCORE_SUCCESS :
            return prevState
        
        case UPDATE_CONTACT_SCORE_FAILURE : 
            return {
                ...prevState,
                updateContactScoreError : action.payload
            }

        default:
            return prevState;
    }
}

export default contactReducer;