import { configureStore } from "@reduxjs/toolkit";

import authReducer from './slices/authSlice'
import photoReducer from "./slices/photoSlice";
import userReducer from './slices/userSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        photo: photoReducer

    }
})