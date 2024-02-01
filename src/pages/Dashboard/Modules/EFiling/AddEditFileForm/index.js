import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import { ToastContainer } from "react-toastify";
import Header from "../../../../../components/Header";
import { Layout } from "../../../../../components/Layout";
import Select from "react-select";

const validationSchema = Yup.object({});

function AddEditFileForm() {
  const location = useLocation();
  const navigate = useNavigate();
  // const [divisionById, setDivisionById] = useState();

  const formik = useFormik({
    initialValues: {
      ministry: "",
      division: "",
      active: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      navigate("/efiling/dashboard");
    },
  });

  const files = [
    {
      id: 1,
      fileName: "8(14)/2022/IT",
    },
    {
      id: 2,
      fileName: "8(14)/2023/QMS",
    },
    {
      id: 3,
      fileName: "8(14)/2024/IT",
    },
  ];

  return (
    <Layout centerlogohide={true}>
      <div className="dashboard-content" style={{ marginTop: 80 }}>
        <Header
          dashboardLink={"/efiling/dashboard"}
          addLink1={"/efiling/dashboard"}
          title1={"E-Filing"}
          addLink2={"/efiling/dashboard/addedit"}
          title2={location && location?.state ? "Edit File" : "Create File"}
          width={"500px"}
        />
        <ToastContainer />

        <div class="container-fluid">
          <div class="card">
            <div class="card-header red-bg" style={{ background: "#14ae5c" }}>
              {location && location.state ? <h1>Edit File</h1> : <h1>Create File</h1>}
            </div>
            <div class="card-body">
              <form onSubmit={formik.handleSubmit}>
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-6">
                      <div class="mb-3">
                        <label class="form-label">File Number</label>
                        <input
                          type="text"
                          placeholder={"File Number"}
                          value={formik.values.fileNumber}
                          className={`form-control ${
                            formik.touched.fileNumber && formik.errors.fileNumber ? "is-invalid" : ""
                          }`}
                          id="fileNumber"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.fileNumber && formik.errors.fileNumber && (
                          <div className="invalid-feedback">{formik.errors.fileNumber}</div>
                        )}
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="mb-3">
                        <label class="form-label">Subject</label>
                        <input
                          type="text"
                          placeholder={"Subject"}
                          value={formik.values.subject}
                          className={`form-control ${
                            formik.touched.subject && formik.errors.subject ? "is-invalid" : ""
                          }`}
                          id="subject"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.subject && formik.errors.subject && (
                          <div className="invalid-feedback">{formik.errors.subject}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-6">
                      <div class="mb-3">
                        <label class="form-label">Branch</label>
                        <select
                          class="form-select"
                          id="active"
                          name="active"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.active}
                        >
                          <option value={""} selected disabled hidden>
                            select
                          </option>
                          <option value={true}>Legislation</option>
                          <option value={false}>IT</option>
                        </select>
                      </div>
                    </div>

                    <div class="col-6">
                      <div class="mb-3">
                        <label class="form-label">Year</label>
                        <select
                          class="form-select"
                          id="active"
                          name="active"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.active}
                        >
                          <option value={""} selected disabled hidden>
                            select
                          </option>
                          <option value={true}>2021</option>
                          <option value={false}>2023</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-6">
                      <div class="mb-3">
                        <label class="form-label">Priority</label>
                        <select
                          class="form-select"
                          id="active"
                          name="active"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.active}
                        >
                          <option value={""} selected disabled hidden>
                            select
                          </option>
                          <option value={true}>Normal</option>
                          <option value={false}>Immediate</option>
                        </select>
                      </div>
                    </div>

                    <div class="col-6">
                      <div class="mb-3">
                        <label class="form-label">File Category</label>
                        <select
                          class="form-select"
                          id="active"
                          name="active"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.active}
                        >
                          <option value={""} selected disabled hidden>
                            select
                          </option>
                          <option value={true}>A</option>
                          <option value={false}>B</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-6">
                      <div class="mb-3">
                        <label class="form-label">Document Type</label>
                        <select
                          class="form-select"
                          id="active"
                          name="active"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.active}
                        >
                          <option value={""} selected disabled hidden>
                            select
                          </option>
                          <option value={true}>Internal</option>
                          <option value={false}>External</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col">
                      <button class="btn btn-primary float-end" type="submit">
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AddEditFileForm;
