import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/authSlice'
import tocReducer from './reducers/tocSlice'
import pathReducer from "./reducers/pathSlice"
export const store = configureStore({
  reducer: {
    toc:tocReducer,
    auth: authReducer,
    path:pathReducer
  },
})

