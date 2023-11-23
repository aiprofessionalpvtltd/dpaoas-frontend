import React, { useContext } from "react";
import logo from "../../assets/logo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../api/AuthContext";
import { useNavigate } from "react-router";

export const Login = () => {
    const { login } = useContext(AuthContext);
    const navigation = useNavigate();

    const handleLogin = () => {
        login();
        navigation('/');
    }
    return (
        <div class="login-container" >
            <div class="wrap-login">
            <span style={{fontSize: "25px", marginTop: "10px", fontWeight:"bold"}} class="login-form-title">Senate SMART Docs</span>
            <span style={{fontSize: "22px", marginBottom: "30px",marginTop: "10px",fontWeight:"bold"}} class="login-form-title">(SSDocs)</span>
                <div class="login-form">
                    <div class="logo">
                        <img src={logo} alt="" />
                    </div>
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
                            <button style={{backgroundColor:"#3c93dd"}} class="login-form-btn" onClick={handleLogin}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};