import { ADD_NEW_CONTACT, CANCEL_NEW_CONTACT, CREATE_NEW_CONTACT_SUCCESS, GET_ALL_CONTACTS, GET_ALL_CONTACTS_FAILURE, GET_ALL_CONTACTS_SUCCESS, SELECT_CONTACT, UPDATE_NEW_CONTACT, EDIT_CONTACT, UPDATE_CONTACT_SUCCESS, UPDATE_CONTACT_FAILURE, CANCEL_UPDATE  } from "./actionTypes"
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

export const getContacts = () => {
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



export const createNewContactSuccess = (contactId, contact) => {
    return {
        type: CREATE_NEW_CONTACT_SUCCESS,
        payload: {
            contactId: contactId,
            ...contact
        }
    }
}

export const createNewContactFailure = (error) => {
    return {
        type: CREATE_NEW_CONTACT_SUCCESS,
        error: error,
    }
}

export const createContact = (payload) => {
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
                dispatch(createNewContactSuccess(response.data, payload));
            })
            .catch(error => {
                dispatch(createNewContactFailure(error.message));
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

export const updateContact = (payload) => {
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
                dispatch(updateContactSuccess(response.data));
            })
            .catch(error => {
                dispatch(updateContactFailure(error.message));
            })
    }
}

export const cancelUpdate = () => {
    return {
        type : CANCEL_UPDATE
    }
}