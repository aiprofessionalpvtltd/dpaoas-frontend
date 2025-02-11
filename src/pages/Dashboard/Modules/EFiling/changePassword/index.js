import React, { useContext, useState } from "react";
import logo from "../../../../../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faEyeSlash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../../../../api/AuthContext";
import { useNavigate } from "react-router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUserData } from "../../../../../api/Auth";
import { updatePassword } from "../../../../../api/APIs/Services/efiling.service";

const validationSchema = Yup.object({
  password: Yup.string().required("Password is required"),
  newpassword: Yup.string().required("New Password is required"),
});
export const ChangePasswordScreen = () => {
  const { login } = useContext(AuthContext);
  const navigation = useNavigate();
  const userData = getUserData();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevState) => !prevState);
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
      password: "",
      newpassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleUpdatePassword(values);
    },
  });

  const handleUpdatePassword = async (values) => {
    setLoading(true);
    const data = {
      userId: userData?.fkUserId,
      currentPassword: values.password,
      newPassword: values.newpassword,
    };
    try {
      const response = await updatePassword(data);
      if (response?.success) {
        showSuccessMessage("User Password Update successfully");

        // Wait 3 seconds before navigating and resetting the loading state
        setTimeout(() => {
          navigation("/efiling/dashboard");
          setLoading(false); // End loading only after timeout completes
        }, 3000);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
      setLoading(false); // End loading on error
    }
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
              <span class="label-input">Old Password</span>

              <input
                style={{ borderBottom: "2px solid #d9d9d9" }}
                type={"text"}
                className={`input-field1 ${
                  formik.touched.password && formik.errors.password
                    ? "is-invalid"
                    : ""
                }`}
                id="password"
                placeholder={"Please enter your password"}
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
            <div class="wrap-input">
              <span class="label-input">New Password</span>

              <input
                style={{ borderBottom: "2px solid #d9d9d9" }}
                type={"text"}
                className={`input-field1 ${
                  formik.touched.newpassword && formik.errors.newpassword
                    ? "is-invalid"
                    : ""
                }`}
                id="newpassword"
                placeholder={"Please enter your New Password"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.newpassword && formik.errors.newpassword && (
                <div className="invalid-feedback">
                  {formik.errors.newpassword}
                </div>
              )}
              <i>
                <FontAwesomeIcon icon={faLock} />
              </i>
            </div>

            <div class="container-login-form-btn">
              <div class="wrap-login-form-btn">
                <div class="login-form-bgbtn"></div>
                <button
                  style={{ backgroundColor: "#3c93dd" }}
                  class="login-form-btn"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "updating password..." : "Update Password"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
