import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slice/userSlice';
import loadingReducer from './slice/loadingSlice';
import authReducer from './slice/authSlice';

export const store = configureStore({
    reducer:{
        user: userReducer,
        loading: loadingReducer,
        auth: authReducer
    }
})