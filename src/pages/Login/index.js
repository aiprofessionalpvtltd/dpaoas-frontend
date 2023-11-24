import React, { useContext } from "react";
import logo from "../../assets/logo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../api/AuthContext";
import { useNavigate } from "react-router";
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    username: Yup.string().required('User Name is required'),
    password: Yup.string().required('Password is required'),

});
export const Login = () => {
    const { login } = useContext(AuthContext);
    const navigation = useNavigate();
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {

            console.log(values);
            handleLogin()
        },
    });

    const handleLogin = () => {
        login();
        navigation('/');
    }
    return (
        <div class="login-container" >
            <div class="wrap-login">
                <span style={{ fontSize: "25px", marginTop: "10px", fontWeight: "bold" }} class="login-form-title">Senate SMART Docs</span>
                <span style={{ fontSize: "22px", marginBottom: "30px", marginTop: "10px", fontWeight: "bold" }} class="login-form-title">(SSDocs)</span>
                <form onSubmit={formik.handleSubmit}>
                    <div class="login-form">
                        <div class="logo">
                            <img src={logo} alt="" />
                        </div>
                        <div class="wrap-input">
                            <span class="label-input">Username</span>
                            {/* <input class="input-field1" type="text" name="username" placeholder="Type your username" /> */}
                            <input
                                type='text'
                                style={{ borderBottom: '2px solid #d9d9d9' }}
                                className={`input-field1 ${formik.touched.username && formik.errors.username ? 'is-invalid' : ''}`}
                                id='username'
                                placeholder={formik.values.username}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.username && formik.errors.username && (
                                <div className='invalid-feedback'>{formik.errors.username}</div>
                            )}
                            <i >
                                <FontAwesomeIcon icon={faUser} />
                            </i>
                        </div>
                        <div class="wrap-input">
                            <span class="label-input">Password</span>
                            <input
                                style={{ borderBottom: '2px solid #d9d9d9' }}
                                type="password"
                                className={`input-field1 ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                                id='password'
                                placeholder={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.password && formik.errors.password && (
                                <div className='invalid-feedback'>{formik.errors.password}</div>
                            )}
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
                                <button style={{ backgroundColor: "#3c93dd" }} class="login-form-btn" type='submit'>Login</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};