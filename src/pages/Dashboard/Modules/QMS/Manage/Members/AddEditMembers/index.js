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
function QMSMembersAddEditForm() {
  const location = useLocation();
  const [dateofbirth, setDateOfBirth] = useState(new Date());
  const [placeofbirth, setPlaceOfBirth] = useState(new Date());
  const [cnicissue, setCnicIssue] = useState(new Date());
  const [cnicexpire, setCnicExpire] = useState(new Date());

  const formik = useFormik({
    initialValues: {
      memberName: "",
      memberTenure: "",
      memberStatus: "",
      politicalParty: "",
      electionType: "",
      gender: "",
      isMinister: "",
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
        addLink1={"/qms/manage/members"}
        title1={"Members"}
        addLink2={"/qms/manage/members/addedit"}
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
                      <label class="form-label">Member Name</label>
                      <input
                        type="text"
                        placeholder={formik.values.memberName}
                        className={`form-control ${
                          formik.touched.memberName && formik.errors.memberName
                            ? "is-invalid"
                            : ""
                        }`}
                        id="memberName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.memberName &&
                        formik.errors.memberName && (
                          <div className="invalid-feedback">
                            {formik.errors.memberName}
                          </div>
                        )}
                    </div>
                  </div>
                  <div class="col-6">
                      <div class="mb-3">
                        <label class="form-label">Member Tenure</label>
                        <select class="form-select"
                          id="memberTenure"
                          name="memberTenure"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.memberTenure}
                        >
                          <option value={""} selected disabled hidden>
                            select
                          </option>
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                        </select>
                      </div>
                    </div>
                </div>
                
                <div class="row">
                  <div class="col-6">
                      <div class="mb-3">
                        <label class="form-label">Member Status</label>
                        <select class="form-select"
                          id="memberStatus"
                          name="memberStatus"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.memberStatus}
                        >
                          <option value={""} selected disabled hidden>
                            select
                          </option>
                            <option value="2023">active</option>
                            <option value="2024">inactive</option>
                        </select>
                      </div>
                    </div>

                    <div class="col-6">
                      <div class="mb-3">
                        <label class="form-label">Political Party</label>
                        <select class="form-select"
                          id="politicalParty"
                          name="politicalParty"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.politicalParty}
                        >
                          <option value={""} selected disabled hidden>
                            select
                          </option>
                            <option value="2023">PTI</option>
                            <option value="2024">PMLN</option>
                        </select>
                      </div>
                    </div>
                </div>

                <div class="row">

                <div class="col-6">
                      <div class="mb-3">
                        <label class="form-label">Election Type</label>
                        <select class="form-select"
                          id="electionType"
                          name="electionType"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.electionType}
                        >
                          <option value={""} selected disabled hidden>
                            select
                          </option>
                            <option value="2023">Internal</option>
                            <option value="2024">PMLN</option>
                        </select>
                      </div>
                    </div>

                    <div class="col-6">
                      <div class="mb-3">
                        <label class="form-label">Gender</label>
                        <select class="form-select"
                          id="gender"
                          name="gender"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.gender}
                        >
                          <option value={""} selected disabled hidden>
                            select
                          </option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                      </div>
                    </div>
                </div>

                <div class="row">
                  <div class="col-6">
                      <div class="form-check">
                        <input
                          class={`form-check-input ${
                            formik.touched.isMinister &&
                            formik.errors.isMinister
                              ? "is-invalid"
                              : ""
                          }`}
                          type="checkbox"
                          id="flexCheckDefault"
                          checked={formik.values.isMinister}
                          onChange={() =>
                            formik.setFieldValue(
                              "isMinister",
                              !formik.values.isMinister,
                            )
                          }
                        />
                        <label class="form-check-label" for="flexCheckDefault">
                          Is Minister
                        </label>
                        {formik.touched.isMinister &&
                          formik.errors.isMinister && (
                            <div className="invalid-feedback">
                              {formik.errors.isMinister}
                            </div>
                          )}
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

export default QMSMembersAddEditForm;
