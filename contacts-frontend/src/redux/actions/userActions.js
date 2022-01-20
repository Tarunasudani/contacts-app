import axios from "axios";
import { AUTH, AUTH_FAILURE, AUTH_SUCCESS } from "./actionTypes";

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

export const authFailure = (error) => {
    return {
        type: AUTH_FAILURE,
        payload: error
    }
}

export const createUser = (email, password, navigate) => {
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
                navigate("/app");
            })
            .catch(error => {
                dispatch(authFailure(error.message));
            })
    }
}

export const verifyUser = (email, password, navigate) => {
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
            },
        })
            .then(response => {
                sessionStorage.setItem("sessionToken", response.data.sessionToken);
                dispatch(authSuccess());
                navigate("/app");
            })
            .catch(error => {
                dispatch(authFailure(error.message));
            })
    }
}