import { createSlice } from '@reduxjs/toolkit'

const initialState = {

  currentPath:"",
  currentUser :""// for monitoring the registration process.
}

const pathSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setPath:(state,action)=>{
        console.log("called")
        state.currentPath = action.payload;
    },
    clearpath:(state,action)=>{
        state.currentPath = null;
    }
  },
  extraReducers: {},
})
export const {setPath,clearpath} = pathSlice.actions;
export default pathSlice.reducer