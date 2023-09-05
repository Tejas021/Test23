import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/authSlice";
import axios from "axios";
import { useNavigate } from "react-router";
import "./Login.scss";
// import img from "../../../public/google.png";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = useGoogleLogin({
    scope: "https://www.googleapis.com/auth/drive",

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
      <div className="login-container bg-green">
        <button className="btn bg-blue " onClick={() => login()}>
          <img src="/google.png" alt="logo"></img>Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
