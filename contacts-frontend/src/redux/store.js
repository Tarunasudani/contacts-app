import { configureStore} from "@reduxjs/toolkit";
import contactReducer from "./reducers/contactReducer";
import userReducer from "./reducers/userReducer";
import thunk from "redux-thunk";

export default configureStore({
    reducer: {
        contact: contactReducer,
        user: userReducer,
    },
    middleware: [thunk]
})