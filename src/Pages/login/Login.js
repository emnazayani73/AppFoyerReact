import React from "react";
import "./login.css";
import registerr from "../../assets/registerr.jpg";
import logo from "../../assets/logo.png";
import LoginForm from "../../Components/LoginForm";

function Login() {
  return (
    <div className="login-container">
      <div className="login-left">
        <img src={logo} alt="Logo" className="logo" />
        <LoginForm />
      </div>
      <div className="login-right">
        <img src={registerr} />
      </div>
    </div>
  );
}

export default Login;
