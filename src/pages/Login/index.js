import React, { useContext, useState } from "react";
import logo from "../../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../api/AuthContext";
import { useNavigate } from "react-router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});
export const Login = () => {
  const { login } = useContext(AuthContext);
  const navigation = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(prevState => !prevState);
  };

  const showSuccessMessage = (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      hideProgressBar: false,
    });
  };

  const showErrorMessage = (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      hideProgressBar: false,
    });
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  const handleLogin = (values) => {
    if (values.username.includes("@")) {
      showErrorMessage("Just type your username without '@' or domain.");
      return;
    }
    
    const data = {
      email: `${values.username}@senate.gov.pk`,
      password: values.password,
    };
    login(data)
      .then((res) => {
        if (res?.token) {
          showSuccessMessage("User loggedIn successfully");
          setTimeout(() => {
            navigation("/");
          }, 3000);
        }
      })
      .catch((err) => {
        showErrorMessage(err?.response?.data?.message);
      });
  };

  return (
    <div class="login-container">
      <ToastContainer />

      <div class="wrap-login">
        {/* <span
          style={{ fontSize: "28px", marginTop: "10px", marginBottom: "30px", fontWeight: "bold" }}
          class="login-form-title"
        >
          SSDocs
        </span> */}
        {/* <span
          style={{
            fontSize: "22px",
            marginBottom: "30px",
            marginTop: "10px",
            fontWeight: "bold",
          }}
          class="login-form-title"
        >
          SSDocs
        </span> */}
        <form onSubmit={formik.handleSubmit}>
          <div class="login-form">
            <div class="logo mb-3">
              <img src={logo} alt="" />
            </div>
            <div class="wrap-input">
              <span class="label-input">Username</span>
              {/* <input class="input-field1" type="text" name="username" placeholder="Type your username" /> */}
              <input
                type="text"
                style={{ borderBottom: "2px solid #d9d9d9" }}
                className={`input-field1 ${
                  formik.touched.username && formik.errors.username
                    ? "is-invalid"
                    : ""
                }`}
                id="username"
                placeholder={"Please enter your username"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.username && formik.errors.username && (
                <div className="invalid-feedback">{formik.errors.username}</div>
              )}
              <i>
                <FontAwesomeIcon icon={faUser} />
              </i>
            </div>
            <div class="wrap-input">
              <span class="label-input">Password</span>
              <i style={{right:0, cursor:"pointer"}} onClick={handleTogglePassword}>
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </i>
              <input
                style={{ borderBottom: "2px solid #d9d9d9" }}
                type={showPassword ? "text" : "password"}
                className={`input-field1 ${
                  formik.touched.password && formik.errors.password
                    ? "is-invalid"
                    : ""
                }`}
                id="password"
                placeholder={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="invalid-feedback">{formik.errors.password}</div>
              )}
              <i>
                <FontAwesomeIcon icon={faLock} />
              </i>
            </div>
            <div class="text-right p-t-8 p-b-31">
              <a href="/">Forgot password?</a>
            </div>
            <div class="container-login-form-btn">
              <div class="wrap-login-form-btn">
                <div class="login-form-bgbtn"></div>
                <button
                  style={{ backgroundColor: "#3c93dd" }}
                  class="login-form-btn"
                  type="submit"
                >
                  Login
                </button>
              </div>
            </div>

            <span
          style={{
            fontSize: "18px",
            marginTop: "20px",
            fontWeight: "bold",
          }}
          class="login-form-title"
        >
          (Version: 1.0.0)
        </span>
          </div>
        </form>
      </div>
    </div>
  );
};
