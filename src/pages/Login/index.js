import React from "react";
import "./login.css";

export const Login = () => {
  return (
    <div class="login-container">
      <div class="wrap-login">
        <form class="login-form validate-form">
          <span class="login-form-title">Login</span>
          <div
            class="wrap-input validate-input"
            data-validate="Username is reauired"
          >
            <span class="label-input">Username</span>
            <input
              class="input-field1"
              type="text"
              name="username"
              placeholder="Type your username"
            />
            <i class="fas fa-user"></i>
          </div>
          <div
            class="wrap-input validate-input"
            data-validate="Password is required"
          >
            <span class="label-input">Password</span>
            <input
              class="input-field1"
              type="password"
              name="pass"
              placeholder="Type your password"
            />
            <i class="fas fa-lock"></i>
          </div>
          <div class="text-right p-t-8 p-b-31">
            <a href="/">Forgot password?</a>
          </div>
          <div class="container-login-form-btn">
            <div class="wrap-login-form-btn">
              <div class="login-form-bgbtn"></div>
              <button class="login-form-btn">Login</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};