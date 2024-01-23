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
function QMSAddEditPoliticalPartyForm() {
  const location = useLocation();
  const [dateofbirth, setDateOfBirth] = useState(new Date());
  const [placeofbirth, setPlaceOfBirth] = useState(new Date());
  const [cnicissue, setCnicIssue] = useState(new Date());
  const [cnicexpire, setCnicExpire] = useState(new Date());

  const formik = useFormik({
    initialValues: {
      politicalPartyId: "",
      partyName: "",
      shortName: "",
      status: "",
      description: "",
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
        addLink1={"/qms/manage/political-party"}
        title1={"Political Party"}
        addLink2={"/qms/manage/political-party/addedit"}
        title2={location && location?.state ? "Edit Political Party" : "Add Political Party"}
      />
      <div class="container-fluid">
        <div class="card">
          <div class="card-header red-bg" style={{ background: "#14ae5c" }}>
            {location && location.state ? (
              <h1>Edit Political Party</h1>
            ) : (
              <h1>Add Political Party</h1>
            )}
          </div>
          <div class="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div class="container-fluid">
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Political Party ID</label>
                      <input
                        type="text"
                        placeholder={formik.values.politicalPartyId}
                        className={`form-control ${
                          formik.touched.politicalPartyId && formik.errors.politicalPartyId ? "is-invalid" : ""
                        }`}
                        id="politicalPartyId"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.politicalPartyId && formik.errors.politicalPartyId && (
                        <div className="invalid-feedback">{formik.errors.politicalPartyId}</div>
                      )}
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Party Name</label>
                      <input
                        type="text"
                        placeholder={formik.values.partyName}
                        className={`form-control ${
                          formik.touched.partyName && formik.errors.partyName ? "is-invalid" : ""
                        }`}
                        id="partyName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.partyName && formik.errors.partyName && (
                        <div className="invalid-feedback">{formik.errors.partyName}</div>
                      )}
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-6">
                    <div class="mb-3">
                      <label class="form-label">Short Name</label>
                      <input
                        type="text"
                        placeholder={formik.values.shortName}
                        className={`form-control ${
                          formik.touched.shortName && formik.errors.shortName ? "is-invalid" : ""
                        }`}
                        id="shortName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.shortName && formik.errors.shortName && (
                        <div className="invalid-feedback">{formik.errors.shortName}</div>
                      )}
                    </div>
                  </div>

                    <div class="col-6">
                      <div class="mb-3">
                        <label class="form-label">Status</label>
                        <select class="form-select"
                          id="status"
                          name="status"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.status}
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
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea
                        className={`form-control`}
                        id="description"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.description}
                      ></textarea>
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

export default QMSAddEditPoliticalPartyForm;
