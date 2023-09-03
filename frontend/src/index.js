import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {GoogleOAuthProvider} from "@react-oauth/google"
import { store } from "./redux/store";
import { Provider } from "react-redux";
;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId='305965961604-kkhnifef3h54dham18q04lpvg1tqeglg.apps.googleusercontent.com'>
  <Provider store={store}>
 <App />
  </Provider>
   
  </GoogleOAuthProvider>

  
);




// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
