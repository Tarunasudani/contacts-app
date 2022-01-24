import axios from "axios";
import { AUTH, AUTH_FAILURE, AUTH_SUCCESS } from "./actionTypes";
import { setDefault } from "./contactActions";

export const auth = () => {
    return {
        type: AUTH,
    }
}

export const authSuccess = () => {
    return {
        type: AUTH_SUCCESS
    }
}

export const authFailure = () => {
    return {
        type: AUTH_FAILURE,
    }
}

export const createUser = (email, password, navigate,setRegistrationError) => {
    return (dispatch) => {
        dispatch(auth())
        axios({
            method: 'post',
            url: '/user/new',
            baseURL: 'http://localhost:8080',
            headers: {
                'Authorization': sessionStorage.getItem("sessionToken"),
                'Content-Type': "application/json"
            },
            data: {
                "email": email,
                "password": password,
            },
        })
            .then(response => {
                sessionStorage.setItem("sessionToken", response.data.sessionToken);
                dispatch(authSuccess());
                dispatch(setDefault());
                navigate("/app");
            })
            .catch(error => {
                dispatch(authFailure());
                setRegistrationError("User already exists. Login instead!!");
            })
    }
}

export const verifyUser = (email, password, navigate, setAuthError) => {
    return (dispatch) => {
        dispatch(auth())
        axios({
            method: 'post',
            url: '/user/login',
            baseURL: 'http://localhost:8080',
            headers: {
                'Authorization': sessionStorage.getItem("sessionToken"),
                'Content-Type': "application/json"
            },
            data: {
                "email": email,
                "password": password,
            }
        })
            .then(response => {
                let token = response.data.sessionToken;
                sessionStorage.setItem("sessionToken", token);
                dispatch(authSuccess());
                dispatch(setDefault());
                navigate("/app");
                
            })
            .catch(error => {
                if(error.response && error.response.status === 400) {
                    setAuthError("Invalid Credentials. Login again!!");
                    dispatch(authFailure());
                } else {
                    dispatch(authFailure(error.message));
                }
                
            })
    }
}