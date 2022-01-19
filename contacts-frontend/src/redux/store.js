import { configureStore} from "@reduxjs/toolkit";
import contactReducer from "./reducers/contactReducer";
import thunk from "redux-thunk";

export default configureStore({
    reducer: {
        contact: contactReducer,
    },
    middleware: [thunk]
})