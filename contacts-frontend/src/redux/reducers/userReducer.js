import { AUTH, AUTH_FAILURE, AUTH_SUCCESS } from "../actions/actionTypes";

const initialState = {
    loading: false,
    auth: false,
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
            }

        case AUTH_FAILURE:
            return {
                ...prevState,
                loading: false,
                auth: false,
            }


        default:
            return prevState
    }
} 

export default userReducer;