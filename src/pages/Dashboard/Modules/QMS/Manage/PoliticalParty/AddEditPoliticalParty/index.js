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
import { showErrorMessage, showSuccessMessage } from "../../../../../../../utils/ToastAlert";
import { createPoliticalParties, updatePoliticalParties } from "../../../../../../../api/APIs";
import { ToastContainer } from "react-toastify";

const validationSchema = Yup.object({
  partyName: Yup.string().required("Party name is required"),
  shortName: Yup.string().required("Short name is required"),
  description: Yup.string().required("Description is required"),
});
function QMSAddEditPoliticalPartyForm() {
  const location = useLocation();

  const formik = useFormik({
    initialValues: {
      partyName: location?.state ? location.state?.partyName : "",
      shortName: location?.state ? location.state?.shortName : "",
      description: location?.state ? location.state?.description : "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      if (location?.state) {
        handleEditPoliticalParty(values);
      } else {
        handleCreatePoliticalParty(values);
      }
    },
  });

  const handleCreatePoliticalParty = async (values) => {
    const data = {
      partyName: values.partyName,
      shortName: values.shortName,
      description: values.description,
    }

    try {
      const response = await createPoliticalParties(data);
      if (response?.success) {
        showSuccessMessage(response?.message);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  }

  const handleEditPoliticalParty = async (values) => {
    const data = {
      partyName: values.partyName,
      shortName: values.shortName,
      description: values.description,
    }

    try {
      const response = await updatePoliticalParties(location?.state?.id, data);
      if (response?.success) {
        showSuccessMessage(response?.message);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  }

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
      <ToastContainer />

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
                      <label class="form-label">Party Name</label>
                      <input
                        type="text"
                        placeholder={"Party Name"}
                        value={formik.values.partyName}
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
