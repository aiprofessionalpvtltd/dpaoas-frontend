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
function QMSAddEditMinistriesForm() {
  const location = useLocation();

  const formik = useFormik({
    initialValues: {
      ministryId: "",
      ministryName: "",
      ministryStatus: "",
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
        addLink1={"/qms/manage/ministries"}
        title1={"Ministries"}
        addLink2={"/qms/manage/ministries/addedit"}
        title2={location && location?.state ? "Edit Ministries" : "Add Ministries"}
      />
      <div class="container-fluid">
        <div class="card">
          <div class="card-header red-bg" style={{ background: "#14ae5c" }}>
            {location && location.state ? (
              <h1>Edit Ministries</h1>
            ) : (
              <h1>Add Ministries</h1>
            )}
          </div>
          <div class="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div class="container-fluid">
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Ministry ID</label>
                      <input
                        type="text"
                        placeholder={formik.values.ministryId}
                        className={`form-control ${
                          formik.touched.ministryId && formik.errors.ministryId ? "is-invalid" : ""
                        }`}
                        id="ministryId"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.ministryId && formik.errors.ministryId && (
                        <div className="invalid-feedback">{formik.errors.ministryId}</div>
                      )}
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Ministry Name</label>
                      <input
                        type="text"
                        placeholder={formik.values.ministryName}
                        className={`form-control ${
                          formik.touched.ministryName && formik.errors.ministryName ? "is-invalid" : ""
                        }`}
                        id="ministryName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.ministryName && formik.errors.ministryName && (
                        <div className="invalid-feedback">{formik.errors.ministryName}</div>
                      )}
                    </div>
                  </div>
                </div>

                <div class="row">
                    <div class="col-6">
                      <div class="mb-3">
                        <label class="form-label">Status</label>
                        <select class="form-select"
                          id="ministryStatus"
                          name="ministryStatus"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.ministryStatus}
                        >
                          <option value={""} selected disabled hidden>
                            select
                          </option>
                            <option>Pending</option>
                            <option>Approved</option>
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

export default QMSAddEditMinistriesForm;
