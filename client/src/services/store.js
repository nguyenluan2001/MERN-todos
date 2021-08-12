import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./slice/authSlice"
import TodoReducer from "./slice/todoSlice"
const store=configureStore({
    reducer:{
        "auth":AuthReducer,
        "todo":TodoReducer
    }
})
export {store}