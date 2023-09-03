import React, { useEffect } from "react";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/reducers/authSlice";
import axios from "axios";
import { redirect, useNavigate } from "react-router";
import { gapi } from "gapi-script";
import { loadAuth2, loadAuth2WithProps, loadClientAuth2 } from "gapi-script";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const API_KEY = "AIzaSyCUJoGpKaRai0H8-uRw_4XjcW5aOOT_jjw";
  const CLIENT_ID =
    "305965961604-kkhnifef3h54dham18q04lpvg1tqeglg.apps.googleusercontent.com";
  const SCOPES = "https://www.googleapis.com/auth/documents";

  useEffect(() => {
    // function start() {
    //   gapi.client.init({
    //     apiKey: API_KEY,
    //     clientId: CLIENT_ID,
    //     scope: SCOPES,
    //   });
    // }
    const fun2 = async () => {
      let gapiClient = await loadAuth2(gapi, CLIENT_ID, SCOPES);
      console.log(await gapiClient);
    };
    fun2();
  }, []);

  const login = useGoogleLogin({
    scope: "https://www.googleapis.com/auth/documents",

    onSuccess: async (tokenResponse) => {
      axios
        .get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        })
        .then((res) =>
          dispatch(
            setUser({ ...res.data, access_token: tokenResponse.access_token })
          )
        )
        .then(navigate("/"));
    },
  });
  return (
    <div className="container">
      <button onClick={() => login()}>Login</button>
    </div>
  );
};

export default Login;
