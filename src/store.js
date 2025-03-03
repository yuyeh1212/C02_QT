import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice.js"; // 正確的檔案名稱

export const store = configureStore({
  reducer: {
    auth: authReducer, // 與 slice 名稱保持一致
  },
});
