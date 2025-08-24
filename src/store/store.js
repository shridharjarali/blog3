import { configureStore } from "@reduxjs/toolkit";
import Reducer from "../store/appwriteSlice";
export const store = configureStore({
    reducer:Reducer
})