import React from "react";
import "./login.css";
import logo from "../../assets/logo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";

export const Login = () => {
  return (
    <div class="login-container" >
    <div class="wrap-login">
        <div class="login-form">
            <div class="logo">
                <img src={logo} alt="" />
            </div>
            <span class="login-form-title">Login</span>
            <div class="wrap-input">
                <span class="label-input">Username</span>
                <input class="input-field1" type="text" name="username" placeholder="Type your username" />
                <i >
                <FontAwesomeIcon icon={faUser} />
                </i>
            </div>
            <div class="wrap-input">
                <span class="label-input">Password</span>
                <input class="input-field1" type="password" name="pass" placeholder="Type your password" />
                <i><FontAwesomeIcon icon={faLock} /></i>
            </div>
            <div class="text-right p-t-8 p-b-31">
                <a href="/">
                Forgot password?
                </a>
            </div>
            <div class="container-login-form-btn">
                <div class="wrap-login-form-btn">
                <div class="login-form-bgbtn"></div>
                    <a href="dashboard.html"><button class="login-form-btn">Login</button></a>
                </div>
            </div>
        </div>
    </div>
</div>
  );
};