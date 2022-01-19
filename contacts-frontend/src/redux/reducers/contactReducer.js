import { ADD_NEW_CONTACT, CANCEL_NEW_CONTACT, CREATE_NEW_CONTACT_FAILURE,  CREATE_NEW_CONTACT_SUCCESS, GET_ALL_CONTACTS, GET_ALL_CONTACTS_FAILURE, GET_ALL_CONTACTS_SUCCESS, UPDATE_NEW_CONTACT } from "../actions/actionTypes";

const initialState = {
    contacts: null,
    error: null,
    contactsLoading: false,
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
            addNewContact: true
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

        default:
            return prevState;
    }
}

export default contactReducer;