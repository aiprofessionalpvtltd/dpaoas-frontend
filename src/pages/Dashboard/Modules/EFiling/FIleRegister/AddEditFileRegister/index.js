import React, { useContext, useEffect, useState } from 'react'
import { Layout } from '../../../../../../components/Layout'
import { EfilingSideBarItem } from '../../../../../../utils/sideBarItems'
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthContext } from '../../../../../../api/AuthContext';
import Header from '../../../../../../components/Header';
import { createFIleRegister, getAllYear } from '../../../../../../api/APIs/Services/efiling.service';
import { ToastContainer } from 'react-toastify';
import { showErrorMessage, showSuccessMessage } from '../../../../../../utils/ToastAlert';
import { useNavigate } from 'react-router-dom';
import { getUserData } from '../../../../../../api/Auth';

const validationSchema = Yup.object({
  registerNumber: Yup.string().required("Register Number is required"),
  // fkBranchId: Yup.string().required("Branch is required"),
  year: Yup.string().required("Year is required"),
  registerSubject: Yup.string().required("Subject is required"),

});
function AddEditFileRegister() {
  const { allBranchesData } = useContext(AuthContext)
  const userData = getUserData()
  console.log("userData", userData);
  const navigate = useNavigate()
  const [yearData, setYearData] = useState([])
  const formik = useFormik({
    initialValues: {
      registerNumber: "",
      // fkBranchId: "",
      year: "",
      registerSubject:"",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      hendleCreateRegister(values);
    },
  });

  const hendleCreateRegister = async (values) => {
    const Data = {
      fkBranchId: userData?.fkDepartmentId,
      registerNumber: values?.registerNumber,
      year: values?.year,
      registerSubject:values?.registerSubject
    }
    try {
      const response = await createFIleRegister(Data)
      if (response.success) {
        showSuccessMessage(response?.message)
        formik.resetForm()
        setTimeout(() => {
          navigate("/efiling/dashboard/file-register-list");
        }, 1000)
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  }

  const getAllYearApi = async () => {
    try {
      const response = await getAllYear()
      if (response.success) {
        // showSuccessMessage(response?.message)
        setYearData(response?.data)
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  }

  useEffect(() => {
    getAllYearApi()
  }, [])


  return (
    <Layout sidebarItems={EfilingSideBarItem} module={true}>
      <Header dashboardLink={"/efiling/dashboard"} addLink1={"/efiling/dashboard/file-register-list"} title1={"File Registers"} addLink2={"/"} title2={"Create File Register"} width={"500px"} />
      <ToastContainer />
      <div class="container-fluid">
        <div class="card">
          <div class="card-header red-bg" style={{ background: "#14ae5c" }}>
            <h1>Create File Register</h1>
          </div>
          <div class="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div class="container-fluid">
                <div class="row">
                  <div class="col-6">
                    <div class="mb-3">
                      <label class="form-label">Register Number</label>
                      <input
                        type="text"
                        placeholder={"Register Number"}
                        value={formik.values.registerNumber}
                        className={`form-control ${formik.touched.registerNumber &&
                            formik.errors.registerNumber
                            ? "is-invalid"
                            : ""
                          }`}
                        id="registerNumber"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.registerNumber &&
                        formik.errors.registerNumber && (
                          <div className="invalid-feedback">
                            {formik.errors.registerNumber}
                          </div>
                        )}
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="mb-3">
                      <label class="form-label">Year</label>
                      <select
                        className={`form-select ${formik.touched.year &&
                            formik.errors.year
                            ? "is-invalid"
                            : ""
                          }`}
                        id="year"
                        name="year"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.year}
                      >
                        <option value={""} selected disabled hidden>
                          Select
                        </option>
                        {yearData && yearData?.map((item) => (
                          <option value={item?.year}>
                            {item?.year}
                          </option>
                        ))}
                      </select>
                      {formik.touched.year &&
                        formik.errors.year && (
                          <div className="invalid-feedback">
                            {formik.errors.year}
                          </div>
                        )}
                    </div>
                  </div>

                </div>

                <div class="row">
                  
                  <div class="col-6">
                    <div class="mb-3">
                      <label class="form-label">Subject</label>
                      <input
                        type="text"
                        placeholder={"Subject"}
                        value={formik.values.registerSubject}
                        className={`form-control ${formik.touched.registerSubject &&
                            formik.errors.registerSubject
                            ? "is-invalid"
                            : ""
                          }`}
                        id="registerSubject"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.registerSubject &&
                        formik.errors.registerSubject && (
                          <div className="invalid-feedback">
                            {formik.errors.registerSubject}
                          </div>
                        )}
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <button class="btn btn-primary float-end" type="submit">
                      Create Register
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AddEditFileRegister