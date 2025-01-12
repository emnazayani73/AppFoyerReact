import React from "react";
import "./register.css";
import registerr from "../../assets/registerr.jpg";
import logo from "../../assets/logo.png";
import RegisterForm from "../../Components/RegisterForm";

function Login() {
  return (
    <div className="login-container">
      <div className="login-left">
        <img src={logo} alt="Logo" className="logo" />
        <RegisterForm />
      </div>
      <div className="login-right">
        <img src={registerr} />
      </div>
    </div>
  );
}

export default Login;
