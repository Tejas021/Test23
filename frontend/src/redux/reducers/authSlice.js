// features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {

  error: null,
  success: false,
  currentUser :""// for monitoring the registration process.
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser:(state,action)=>{
        state.currentUser = action.payload;
    },
    logout:(state,action)=>{
        state.currentUser = null;
    }
  },
  extraReducers: {},
})
export const {setUser,logout} = authSlice.actions;
export default authSlice.reducer