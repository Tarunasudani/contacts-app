import { AUTH, AUTH_FAILURE, AUTH_SUCCESS } from "../actions/actionTypes";

const initialState = {
    loading: false,
    auth: false,
    error: null,
}


const userReducer = (prevState = initialState, action) => {
    switch(action.type) {
        case AUTH:
            return {
                ...prevState,
                loading: true,
            }

        case AUTH_SUCCESS:
            return {
                ...prevState,
                loading: false,
                auth: true,
                error: null,
            }

        case AUTH_FAILURE:
            return {
                ...prevState,
                loading: false,
                auth: false,
                error: action.payload
            }


        default:
            return prevState
    }
} 

export default userReducer;