import { GET_ALL_CONTACTS } from "../actions/actionTypes";

const initialState = {
    contacts: null
}

const contactReducer = (prevState = initialState, action) => {
    switch(action.type) {
        case GET_ALL_CONTACTS: return {
            ...prevState,
        }

        default:
            return prevState;
    }
}

export default contactReducer;