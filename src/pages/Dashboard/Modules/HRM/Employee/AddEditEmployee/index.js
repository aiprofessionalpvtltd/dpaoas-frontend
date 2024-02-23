import React, { useContext, useEffect, useState } from "react";
import Header from "../../../../../../components/Header";
import { Layout } from "../../../../../../components/Layout";
import { HRMsidebarItems } from "../../../../../../utils/sideBarItems";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Stepper, Step, StepLabel } from "@mui/material";
import DatePicker from "react-datepicker";
import { UpdateEmployee, createEmployee, getDepartment, getDesignations, getRoles } from "../../../../../../api/APIs/Services/organizational.service";
import { ToastContainer } from "react-toastify";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";
import { Button } from "react-bootstrap";
import { AuthContext } from "../../../../../../api/AuthContext";

const validationSchema = Yup.object({
  employeename: Yup.string().required("Employee name is required"),
  filenumber: Yup.string().required("File Number is required"),
  fatherhusbandname: Yup.string().required("Father/Husband Name is required"),
  cnicnumber: Yup.string().required("CNIC Number is required"),
  permanentaddress: Yup.string().required("Permanent Address is required"),
});
function HRMAddEditEmployee() {
  const location = useLocation();
  const { employeeData } = useContext(AuthContext)
  const [rolesList, setRolesList] = useState([])
  const [departmentData, setDepartmentData] = useState([])
  const [designationData, setDesignationData] = useState([])


  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      userName: "",
      phoneNo: "",
      gender: "",
      email: "",
      password: "",
      fileNumber: "",
      supervisor: "",
      fkRoleId: "",
      fkDepartmentId: "",
      fkDesignationId: "",
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      if (location.state) {
        UpdateEmployeeApi(values);
      } else {
        CreateEmployeeApi(values);
      }
    },
  });

  const CreateEmployeeApi = async (values) => {
    const data = {
      firstName: values.firstName,
      lastName: values?.lastName,
      userName: values.userName,
      phoneNo: values.phoneNo,
      gender: values.gender,
      email: values.email,
      password: values.password,
      fileNumber: values?.fileNumber,
      supervisor: values?.supervisor,
      fkRoleId: values?.fkRoleId,
      fkDepartmentId: values?.fkDepartmentId,
      fkDesignationId: values?.fkDesignationId,
    };
    try {
      const response = await createEmployee(data);
      if (response.success) {
        showSuccessMessage(response.message);
        formik.resetForm()
      }
    } catch (error) {
      console.log(error);
    }
  };

  const UpdateEmployeeApi = async (values) => {
    const data = {
      firstName: values.firstName,
      lastName: values?.lastName,
      userName: values.userName,
      phoneNo: values.phoneNo,
      gender: values.gender,
      email: values.email,
      password: values.password,
      fileNumber: values.fileNumber,
      supervisor: values?.supervisor,
      fkRoleId: values?.fkRoleId,
      fkDepartmentId: values?.fkDepartmentId,
      fkDesignationId: values?.fkDesignationId,
    };
    try {
      const response = await UpdateEmployee(location?.state?.id, data);
      if (response.success) {
        showSuccessMessage(response.message);
        formik.resetForm()
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  };


  const fetchRoles = async () => {
    try {
      const response = await getRoles();
      if (response.success) {
        setRolesList(response?.data?.roles)
      }

    } catch (error) {
      console.log(error);
    }
  };
  const getDepartmentData = async () => {
    try {
      const response = await getDepartment(0, 50);
      if (response?.success) {
        setDepartmentData(response?.data?.departments);
      }
    } catch (error) {
      console.log(error);
    }

  }

  const getDesignationApi = async () => {
    try {
      const response = await getDesignations(0, 50);
      if (response?.success) {
        setDesignationData(response?.data?.designations);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDesignationApi()
    getDepartmentData()
    fetchRoles();
  }, []);



  return (
    <Layout module={true} sidebarItems={HRMsidebarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/hrm/employee"}
        addLink1={"/hrm/employee"}
        title1={"Employee"}
        addLink2={"/hrm/addeditemployee"}
        title2={location && location?.state ? "Edit Employee" : "Add Employee"}
      />
      <ToastContainer />

      <div className="dash-detail-container" style={{ margin: "12px" }}>
        <div
          class="dash-card-header p-3"
          style={{ background: "rgb(20, 174, 92)" }}
        >
          <h2 class="float-start mt-2">Add Employee</h2>
          <div class="clearfix"></div>
        </div>
        <div class="card-body">
          <div class="container-fluid">
            <form onSubmit={formik.handleSubmit}>
              <div class="row">

                <div class="col">
                  <div class="mb-3">
                    <label for="" class="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="firstName"
                      placeholder={"firstName"}
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <label for="" class="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="lastName"
                      placeholder={"lastName"}
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <label for="" class="form-label">
                      User Name
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="userName"
                      placeholder={"userName"}
                      value={formik.values.userName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <label for="" class="form-label">
                      Phone No
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="phoneNo"
                      placeholder={"Phone No"}
                      value={formik.values.phoneNo}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="mb-3">
                    <label for="" class="form-label">
                      Gender
                    </label>
                    <select class="form-select"
                      id="gender"
                      value={formik.values.gender}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}>
                      <option value="" disabled hidden>Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <label for="" class="form-label">
                      Email
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="email"
                      placeholder={"Email"}
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <label for="" class="form-label">
                      Password
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="password"
                      placeholder={"Password"}
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <label for="" class="form-label">
                      File Number
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="fileNumber"
                      placeholder={"File Number"}
                      value={formik.values.fileNumber}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="mb-3">
                    <label for="" class="form-label">
                      Supervisor
                    </label>
                    <select class="form-select " id="supervisor"
                      value={formik.values.supervisor}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}>
                      <option value="" disabled hidden>Select</option>
                      {employeeData &&
                        employeeData?.map((item) => (
                          <option value={item.fkUserId}>{`${item.firstName}${item.lastName}`}</option>
                        ))}
                    </select>
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <label for="" class="form-label">
                      Roles
                    </label>
                    <select class="form-select " id="fkRoleId"
                      value={formik.values.fkRoleId}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}>
                      <option value="" disabled hidden>Select</option>
                      {rolesList &&
                        rolesList?.map((item) => (
                          <option value={item.id}>{item.name}</option>
                        ))}
                    </select>
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <label for="" class="form-label">
                      Department
                    </label>
                    <select class="form-select " id="fkDepartmentId"
                      value={formik.values.fkDepartmentId}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}>
                      <option value={""} selected disabled hidden>
                        Select
                      </option>
                      {departmentData &&
                        departmentData?.map((item) => (
                          <option value={item.id}>{item.departmentName}</option>
                        ))}
                    </select>
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <label for="" class="form-label">
                      Designation
                    </label>
                    <select class="form-select " id="fkDesignationId"
                      value={formik.values.fkDesignationId}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}>
                      <option value={""} selected disabled hidden>
                        Select
                      </option>
                      {designationData &&
                        designationData?.map((item) => (
                          <option value={item.id}>{item.designationName}</option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button className="btn btn-primary" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default HRMAddEditEmployee;

