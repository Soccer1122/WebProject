import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name : 'auth',
  initialState : {
    isLoggin : false,
    user : null,
  },
  reducers : {
    login: (state, action) =>{
      state.isLoggin = true;
      state.user = action.payload;
      
    },
    logout: (state) =>{
      state.isLoggin=false;
      state.user=null;
    },
  },
});
export const {login,logout} = authSlice.actions;
export default authSlice.reducer;