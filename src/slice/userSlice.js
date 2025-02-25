import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "userDate",
  initialState: {
    id: '',
    name: '',
    email: '',
    phone: '',
    birthday: '',
    LineID:'' ,
    user: 'user',
  },
  reducers:{
    setUserData(state,action){
        return {...state,...action.payload}
    },
    clearUserData() {
        return {
            id: '',
            name: '',
            email: '',
            phone: '',
            birthday: '',
            LineID: '',
            user: 'user',
        };
    },
  }
});

export const {setUserData,clearUserData} = userSlice.actions; 

export default userSlice.reducer;