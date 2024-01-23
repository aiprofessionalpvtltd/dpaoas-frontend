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
function QMSAddEditDivisionsForm() {
  const location = useLocation();

  const formik = useFormik({
    initialValues: {
      ministry: '',
      division: '',
      active: ''
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
        addLink1={"/qms/manage/divisions"}
        title1={"Divisions"}
        addLink2={"/qms/manage/divisions/addedit"}
        title2={location && location?.state ? "Edit Divisions" : "Add Divisions"}
      />
      <div class="container-fluid">
        <div class="card">
          <div class="card-header red-bg" style={{ background: "#14ae5c" }}>
            {location && location.state ? (
              <h1>Edit Divisions</h1>
            ) : (
              <h1>Add Divisions</h1>
            )}
          </div>
          <div class="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div class="container-fluid">
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Division</label>
                      <input
                        type="text"
                        placeholder={formik.values.division}
                        className={`form-control ${
                          formik.touched.division && formik.errors.division ? "is-invalid" : ""
                        }`}
                        id="division"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.division && formik.errors.division && (
                        <div className="invalid-feedback">{formik.errors.division}</div>
                      )}
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Ministry</label>
                      <select class="form-select"
                        id="ministry"
                        name="ministry"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.ministry}
                      >
                        <option value={""} selected disabled hidden>
                          select
                        </option>
                          <option value="1">Ministry1</option>
                          <option value="2">Ministry2</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-6">
                    <div class="mb-3">
                      <label class="form-label">Active</label>
                      <select class="form-select"
                        id="active"
                        name="active"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.active}
                      >
                        <option value={""} selected disabled hidden>
                          select
                        </option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
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
    </Layout>
  );
}

export default QMSAddEditDivisionsForm;
