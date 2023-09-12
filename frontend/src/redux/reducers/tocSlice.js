import { createSlice } from '@reduxjs/toolkit'

const initialState = {

  currentToc:[],
  currentUser :""// for monitoring the registration process.
}

const tocSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToc:(state,action)=>{
        console.log("called")
        state.currentToc = action.payload;
    },
    clearToc:(state,action)=>{
        state.currentUser = null;
    }
  },
  extraReducers: {},
})
export const {setToc,clearToc} = tocSlice.actions;
export default tocSlice.reducer