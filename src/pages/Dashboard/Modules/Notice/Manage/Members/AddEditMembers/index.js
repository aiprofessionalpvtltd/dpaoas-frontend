import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import { NoticeSidebarItems } from "../../../../../../../utils/sideBarItems";
import { Layout } from "../../../../../../../components/Layout";
import Header from "../../../../../../../components/Header";

const validationSchema = Yup.object({
  employeename: Yup.string().required("Employee name is required"),
  filenumber: Yup.string().required("File Number is required"),
  fatherhusbandname: Yup.string().required("Father/Husband Name is required"),
  cnicnumber: Yup.string().required("CNIC Number is required"),
  permanentaddress: Yup.string().required("Permanent Address is required"),
});
function MembersAddEditForm() {
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
      sidebarItems={NoticeSidebarItems}
      centerlogohide={true}
    >
      <Header
        dashboardLink={"/notice/dashboard"}
        addLink1={"/notice/manage/members"}
        title1={"Notice Members"}
        addLink2={"/notice/manage/members/addedit"}
        title2={location && location?.state ? "Edit Members" : "Add Members"}
      />
      <div class="container-fluid">
        <div class="card">
          <div class="card-header red-bg" style={{ background: "#14ae5c" }}>
            {location && location.state ? (
              <h1>Edit Members</h1>
            ) : (
              <h1>Add Members</h1>
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
                    <div class="mb-3">
                      <label class="form-label">Date of Birth</label>
                      <DatePicker
                        selected={dateofbirth}
                        onChange={(date) => setDateOfBirth(date)}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Place of Birth</label>
                      <DatePicker
                        selected={placeofbirth}
                        onChange={(date) => setPlaceOfBirth(date)}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">CNIC Number</label>
                      <input
                        type="text"
                        placeholder={formik.values.cnicnumber}
                        className={`form-control ${
                          formik.touched.cnicnumber && formik.errors.cnicnumber
                            ? "is-invalid"
                            : ""
                        }`}
                        id="cnicnumber"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.cnicnumber &&
                        formik.errors.cnicnumber && (
                          <div className="invalid-feedback">
                            {formik.errors.cnicnumber}
                          </div>
                        )}
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">CNIC Issue Date</label>
                      <DatePicker
                        selected={cnicissue}
                        onChange={(date) => setCnicIssue(date)}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">CNIC Exp Date</label>
                      <DatePicker
                        selected={cnicexpire}
                        onChange={(date) => setCnicExpire(date)}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Place of Issue</label>
                      <select class="form-select">
                        <option>Branch</option>
                        <option>Legislation</option>
                        <option>IT</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">NTN Number</label>
                      <input class="form-control" type="text" />
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Religion</label>
                      <input class="form-control" type="text" />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Marital Status</label>
                      <select class="form-select">
                        <option>Married</option>
                        <option>Single</option>
                      </select>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Province</label>
                      <select class="form-select">
                        <option>KPK</option>
                        <option>Punjab</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Permanent Address</label>
                      <textarea
                        placeholder={formik.values.permanentaddress}
                        className={`form-control ${
                          formik.touched.permanentaddress &&
                          formik.errors.permanentaddress
                            ? "is-invalid"
                            : ""
                        }`}
                        id="permanentaddress"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.permanentaddress}
                      ></textarea>
                      {formik.touched.permanentaddress &&
                        formik.errors.permanentaddress && (
                          <div className="invalid-feedback">
                            {formik.errors.permanentaddress}
                          </div>
                        )}
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">City</label>
                      <select class="form-select">
                        <option>Select</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Local Address</label>
                      <textarea class="form-control"></textarea>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">City</label>
                      <select class="form-select">
                        <option>Select</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Phone Type</label>
                      <select class="form-select">
                        <option>Landline</option>
                        <option>GSM</option>
                      </select>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Phone Number</label>
                      <input class="form-control" type="text" />
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <button
                        class="btn btn-primary me-md-2"
                        style={{ marginTop: "31px" }}
                        type="button"
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Email</label>
                      <input class="form-control" type="text" />
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Is Official</label>
                      <select class="form-select">
                        <option>Yes</option>
                        <option>No</option>
                      </select>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <button
                        class="btn btn-primary me-md-2"
                        style={{ marginTop: "31px" }}
                        type="button"
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
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

export default MembersAddEditForm;
