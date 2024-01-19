import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import Header from "../../../../../../../components/Header";
import { Layout } from "../../../../../../../components/Layout";
import { QMSSideBarItems } from "../../../../../../../utils/sideBarItems";

const validationSchema = Yup.object({
  employeename: Yup.string().required("Employee name is required"),
  filenumber: Yup.string().required("File Number is required"),
  fatherhusbandname: Yup.string().required("Father/Husband Name is required"),
  cnicnumber: Yup.string().required("CNIC Number is required"),
  permanentaddress: Yup.string().required("Permanent Address is required"),
});
function QMSAddEditSessionsForm() {
  const location = useLocation();
  const [dateofbirth, setDateOfBirth] = useState(new Date());
  const [placeofbirth, setPlaceOfBirth] = useState(new Date());
  const [cnicissue, setCnicIssue] = useState(new Date());
  const [cnicexpire, setCnicExpire] = useState(new Date());

  const formik = useFormik({
    initialValues: {
      employeename: "",
      filenumber: "",
      fatherhusbandname: "",
      cnicnumber: "",
      permanentaddress: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      console.log(values);
    },
  });
  return (
    <Layout
      module={true}
      sidebarItems={QMSSideBarItems}
      centerlogohide={true}
    >
      <Header
        dashboardLink={"/qms/dashboard"}
        addLink1={"/qms/manage/sessions"}
        title1={"Sessions"}
        addLink2={"/qms/manage/sessions/addedit"}
        title2={location && location?.state ? "Edit Sessions" : "Add Sessions"}
      />
      <div class="container-fluid">
        <div class="card">
          <div class="card-header red-bg" style={{ background: "#14ae5c" }}>
            {location && location.state ? (
              <h1>Edit Sessions</h1>
            ) : (
              <h1>Add Sessions</h1>
            )}
          </div>
          <div class="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div class="container-fluid">
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">File Number</label>
                      <input
                        type="text"
                        placeholder={formik.values.filenumber}
                        className={`form-control ${
                          formik.touched.filenumber && formik.errors.filenumber
                            ? "is-invalid"
                            : ""
                        }`}
                        id="filenumber"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.filenumber &&
                        formik.errors.filenumber && (
                          <div className="invalid-feedback">
                            {formik.errors.filenumber}
                          </div>
                        )}
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Employee Name</label>
                      <input
                        type="text"
                        placeholder={formik.values.employeename}
                        className={`form-control ${
                          formik.touched.employeename &&
                          formik.errors.employeename
                            ? "is-invalid"
                            : ""
                        }`}
                        id="employeename"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.employeename &&
                        formik.errors.employeename && (
                          <div className="invalid-feedback">
                            {formik.errors.employeename}
                          </div>
                        )}
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Gender</label>
                      <select class="form-select">
                        <option>Male</option>
                        <option>Female</option>
                      </select>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Title</label>
                      <input class="form-control" type="text" />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Father/Husband Name</label>
                      <input
                        type="text"
                        placeholder={formik.values.fatherhusbandname}
                        className={`form-control ${
                          formik.touched.fatherhusbandname &&
                          formik.errors.fatherhusbandname
                            ? "is-invalid"
                            : ""
                        }`}
                        id="fatherhusbandname"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.fatherhusbandname &&
                        formik.errors.fatherhusbandname && (
                          <div className="invalid-feedback">
                            {formik.errors.fatherhusbandname}
                          </div>
                        )}
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Domicile</label>
                      <select class="form-select">
                        <option>Federal</option>
                        <option>Punjab</option>
                        <option>Sindh</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="mb-3" style={{ position: "relative" }}>
                      <label class="form-label">Date of Birth</label>
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
                        selected={dateofbirth}
                        minDate={new Date()}
                        onChange={(date) => setDateOfBirth(date)}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3" style={{ position: "relative" }}>
                      <label class="form-label">Place of Birth</label>
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
                        selected={placeofbirth}
                        minDate={new Date()}
                        onChange={(date) => setPlaceOfBirth(date)}
                        className="form-control"
                      />
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
    </Layout>
  );
}

export default QMSAddEditSessionsForm;
