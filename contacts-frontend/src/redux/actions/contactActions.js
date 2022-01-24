import { ADD_NEW_CONTACT, CANCEL_NEW_CONTACT, CREATE_NEW_CONTACT_SUCCESS, GET_ALL_CONTACTS, GET_ALL_CONTACTS_FAILURE, GET_ALL_CONTACTS_SUCCESS, SELECT_CONTACT, UPDATE_NEW_CONTACT, EDIT_CONTACT, UPDATE_CONTACT_SUCCESS, UPDATE_CONTACT_FAILURE, CANCEL_UPDATE , DELETE_CONTACT_FAILURE, UPDATE_CONTACT_SCORE_SUCCESS, DELETE_CONTACT_SUCCESS, CREATE_NEW_CONTACT_FAILURE, SET_CONTACT_ERROR, SET_DEFAULT } from "./actionTypes"
import axios from "axios";


export const getAllContacts = () => {
    return {
        type: GET_ALL_CONTACTS,
    }
}

export const getAllContactsSuccess = contacts => {
    return {
        type: GET_ALL_CONTACTS_SUCCESS,
        payload: contacts,
    }
}

export const getAllContactsFailure = error => {
    return {
        type: GET_ALL_CONTACTS_FAILURE,
        payload: error,
    }
}

export const getContacts = (navigate) => {
    return (dispatch) => {
        dispatch(getAllContacts());
        axios({
            method: 'get',
            url: '/contact/all',
            baseURL: 'http://localhost:8080',
            headers: {
                'Authorization': sessionStorage.getItem("sessionToken"),
                'Content-Type': "application/json"
            }
        })
            .then(response => {
                dispatch(getAllContactsSuccess(response.data));
            })
            .catch(error => {
                dispatch(getAllContactsFailure(error.message));
                navigate("/login");
                sessionStorage.removeItem("sessionToken");
            })
    }
}

export const addNewContact = () => {
    return {
        type: ADD_NEW_CONTACT
    }
}

export const cancelNewContact = () => {
    return {
        type: CANCEL_NEW_CONTACT
    }
}

export const updateNewContact = (field, value) => {
    return {
        type: UPDATE_NEW_CONTACT,
        payload: {
            field: field,
            value: value,
        }
    }
}

export const selectContact = (contact) => {
    return {
        type : SELECT_CONTACT,
        payload: contact
    }
}



export const createNewContactSuccess = (contact) => {
    return {
        type: CREATE_NEW_CONTACT_SUCCESS,
        payload: {
            ...contact,
        }
    }
}

export const createNewContactFailure = (error) => {
    return {
        type: CREATE_NEW_CONTACT_FAILURE,
        error: error,
    }
}

export const createContact = (payload, navigate, setNewContactError) => {
    return (dispatch) => {
        axios({
            method: 'post',
            url: '/contact/new',
            baseURL: 'http://localhost:8080',
            headers: {
                'Authorization': sessionStorage.getItem("sessionToken"),
                'Content-Type': "application/json"
            },
            data: payload,
        })
            .then(response => {
                dispatch(createNewContactSuccess(response.data));
                let contact = response.data
                contact.contactDetails = JSON.stringify(contact.contactDetails);
                dispatch(selectContact(contact));
            })
            .catch(error => {
                if(error.response && error.response.status === 401) {
                    setNewContactError(error.response.data.message);
                    sessionStorage.removeItem("sessionToken");
                } else {
                    dispatch(createNewContactFailure(error.response.data.message));
                    navigate("/error");
                }
            })
    }
}

export const editContact = (field, value) => {
    return {
        type : EDIT_CONTACT,
        payload: {
            field: field,
            value: value,
        }
    }
}

export const updateContactSuccess = (contact) => {
    contact.contactDetails = JSON.stringify(contact.contactDetails);
    return {
        type : UPDATE_CONTACT_SUCCESS,
        payload : contact
    }
}

export const updateContactFailure = (err) => {
    return {
        type : UPDATE_CONTACT_FAILURE,
        payload : err
    }
}

export const updateContact = (payload, navigate) => {
    return (dispatch) => {
        axios({
            method: 'post',
            url: '/contact/update',
            baseURL: 'http://localhost:8080',
            headers: {
                'Authorization': sessionStorage.getItem("sessionToken"),
                'Content-Type': "application/json"
            },
            data: payload,
        })
            .then(response => {
                console.log(response.data);
                dispatch(updateContactSuccess(response.data));
                dispatch(getContacts());
            })
            .catch(error => {
                if(error.response && error.response.status === 401) {
                    dispatch(updateContactFailure(error.response.data.message));
                    sessionStorage.removeItem("sessionToken");
                } else {
                    dispatch(updateContactFailure(error.response.data.message));
                    navigate("/error");
                }
            })
    }
}

export const cancelUpdate = () => {
    return {
        type : CANCEL_UPDATE
    }
}

export const deleteContactFailure = (err) => {
    return {
        type : DELETE_CONTACT_FAILURE,
        payload : err
    }
}
export const deleteContactSuccess = () => {
    return {
        type : DELETE_CONTACT_SUCCESS
    }
}

export const deleteContact = (contact, navigate) => {
    return (dispatch) => {
        axios({
            method: 'delete',
            url: '/contact/delete',
            baseURL: 'http://localhost:8080',
            headers: {
                'Authorization': sessionStorage.getItem("sessionToken"),
                'Content-Type': "application/json"
            },
            data: contact,
        })
            .then(() => {
                dispatch(getContacts());
                dispatch(deleteContactSuccess());
            })
            .catch(error => {
                if(error.response && error.response.status === 401) {
                    dispatch(deleteContactFailure(error.response.data.message));
                    sessionStorage.removeItem("sessionToken");
                } else {
                    dispatch(deleteContactFailure(error.response.data.message));
                    navigate("/error");
                }
            })
    }
}

export const updateContactScoreSuccess = () => {
    return {
        type : UPDATE_CONTACT_SCORE_SUCCESS
    }
}

export const updateContactScoreFailure = (err) => {
    return {
        type : UPDATE_CONTACT_SCORE_SUCCESS,
        payload : err
    }
}

export const updateContactScore = (contact) => {
    return (dispatch) => {
        axios({
            method: 'put',
            url: '/contact/updateScore',
            baseURL: 'http://localhost:8080',
            headers: {
                'Authorization': sessionStorage.getItem("sessionToken"),
                'Content-Type': "application/json"
            },
            data: contact,
        })
            .then( () => {
                dispatch(updateContactScoreSuccess());
            })
            .catch(error => {
                dispatch(updateContactScoreFailure(error.message));
            })
    }
}

export const setContactError = (error) => {
    return {
        type: SET_CONTACT_ERROR,
        payload: error
    }
}

export const setDefault = () => {
    return {
        type: SET_DEFAULT
    }
}