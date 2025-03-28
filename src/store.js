import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/userSlice';
import loadingReducer from './slice/loadingSlice';
import authReducer from './slice/authSlice';
import alertReducer from './slice/alertSlice';

export const store = configureStore({
  reducer: {
    userData: userReducer,
    loading: loadingReducer,
    auth: authReducer,
    alert: alertReducer,
  },
});
