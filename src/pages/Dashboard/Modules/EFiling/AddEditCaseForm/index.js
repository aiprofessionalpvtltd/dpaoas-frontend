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

function AddEditCaseForm() {
  const location = useLocation();
  const navigate = useNavigate();
  // const [divisionById, setDivisionById] = useState();
  const [documentTypeVal, setDocumentTypeVal] = useState('');

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

  const handleDocumentType = (e) => {
    setDocumentTypeVal(e.target.value);
  }

  return (
    <Layout centerlogohide={true}>
      <div className="dashboard-content" style={{ marginTop: 80 }}>
        <Header
          dashboardLink={"/efiling/dashboard"}
          addLink1={"/efiling/dashboard"}
          title1={"E-Filing"}
          addLink2={"/efiling/dashboard/addeditcase"}
          title2={location && location?.state ? "Edit Case" : "Create Case"}
          width={"500px"}
        />
        <ToastContainer />

        <div class="container-fluid">
          <div class="card">
            <div class="card-header red-bg" style={{ background: "#14ae5c" }}>
              {location && location.state ? <h1>Edit Case</h1> : <h1>Create Case</h1>}
            </div>
            <div class="card-body">
              <form onSubmit={formik.handleSubmit}>
                <div class="container-fluid">
                  <div class="row">
                    <div class="col">
                      <div class="mb-3">
                        <label class="form-label">Case Number</label>
                        <Select
                          options={files.map((item) => ({
                            value: item.id,
                            label: item.fileName,
                          }))}
                          isMulti
                          onChange={(selectedOptions) => formik.setFieldValue("mover", selectedOptions)}
                          onBlur={formik.handleBlur}
                          value={formik.values.mover}
                          name="mover"
                        />
                        {formik.touched.mover && formik.errors.mover && (
                          <div class="invalid-feedback">{formik.errors.mover}</div>
                        )}
                      </div>
                    </div>

                    <div className="col-6">
                    <div className="mb-3" style={{ position: "relative" }}>
                      <label className="form-label">Date</label>
                      <span
                        style={{
                          position: "absolute",
                          right: "15px",
                          top: "36px",
                          zIndex: 1,
                          fontSize: "20px",
                          zIndex: "1",
                          color: "#666",
                        }}
                      >
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </span>
                      <DatePicker
                        selected={formik.values.date}
                        onChange={(date) =>
                          formik.setFieldValue("date", date)
                        }
                        onBlur={formik.handleBlur}
                        minDate={new Date()}
                        className={`form-control ${
                          formik.touched.date && formik.errors.date
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {formik.touched.date && formik.errors.date && (
                        <div className="invalid-feedback">
                          {formik.errors.date}
                        </div>
                      )}
                    </div>
                  </div>
                  </div>

                  <div class="row">
                  <div class="col-6">
                      <div class="mb-3">
                        <label class="form-label">Who Originate</label>
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
                          <option value={true}>Naeem</option>
                          <option value={false}>Saqib</option>
                        </select>
                      </div>
                    </div>

                  <div className="col">
                    <div className="mb-3" style={{ position: "relative" }}>
                      <label className="form-label">When Received</label>
                      <span
                        style={{
                          position: "absolute",
                          right: "15px",
                          top: "36px",
                          zIndex: 1,
                          fontSize: "20px",
                          zIndex: "1",
                          color: "#666",
                        }}
                      >
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </span>
                      <DatePicker
                        selected={formik.values.whenReceived}
                        onChange={(date) =>
                          formik.setFieldValue("whenReceived", date)
                        }
                        onBlur={formik.handleBlur}
                        minDate={new Date()}
                        className={`form-control ${
                          formik.touched.whenReceived && formik.errors.whenReceived
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {formik.touched.whenReceived && formik.errors.whenReceived && (
                        <div className="invalid-feedback">
                          {formik.errors.whenReceived}
                        </div>
                      )}
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
                          onChange={handleDocumentType}
                          value={documentTypeVal}
                        >
                          <option value={""} selected disabled hidden>
                            select
                          </option>
                          <option value={"Internal"}>Internal</option>
                          <option value={"External"}>External</option>
                        </select>
                      </div>
                    </div>

                    {documentTypeVal === "Internal" ? (
                      <>
                    <div class="col-3">
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

                    <div class="col-3">
                      <div class="mb-3">
                        <label class="form-label">Department</label>
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
                    </>
                    ) : documentTypeVal === "External" ? (
                      <div class="col-6">
                      <div class="mb-3">
                        <label class="form-label">Ministries</label>
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
                    ) : null}
                  </div>

                  <div className="row">
                <div className="col">
                  <div>
                    <label className="form-label">Subject</label>
                    <textarea
                      className={`form-control`}
                      id='subject'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.subject}
                    ></textarea>
                  </div>
                </div>
              </div>

                  <div class="row mt-2">
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

export default AddEditCaseForm;
