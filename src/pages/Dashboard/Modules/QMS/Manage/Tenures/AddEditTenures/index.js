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
import { createTenure, updateTenure } from "../../../../../../../api/APIs/Services/ManageQMS.service";
import { showErrorMessage, showSuccessMessage } from "../../../../../../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";

const validationSchema = Yup.object({
  tenure: Yup.string().required("Tenure name is required"),
  fromDate: Yup.string().required("Start date name is required"),
  toDate: Yup.string().required("End date is required"),
});
function QMSAddEditTenuresForm() {
  const location = useLocation();

  const formik = useFormik({
    initialValues: {
      tenure: location.state ? location.state?.tenureName : "",
      fromDate: location.state ? new Date(location.state?.fromDate) : "",
      toDate: location.state ? new Date(location.state?.toDate) : "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      if (location?.state) {
        handleEditTenures(values);
      } else {
        handleCreateTenures(values);
      }
    },
  });

  const handleCreateTenures = async (values) => {
    const data = {
      tenureName: values?.tenure,
      fromDate: values?.fromDate,
      toDate: values?.toDate
    }

    try {
      const response = await createTenure(data);
      if (response?.success) {
        showSuccessMessage(response?.message);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  }

  const handleEditTenures = async (values) => {
    const data = {
      tenureName: values?.tenure,
      fromDate: values?.fromDate,
      toDate: values?.toDate
    }

    try {
      const response = await updateTenure(location?.state?.id, data);
      if (response?.success) {
        showSuccessMessage(response?.message);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  }

  return (
    <Layout module={true} sidebarItems={QMSSideBarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/qms/dashboard"}
        addLink1={"/qms/manage/tenures"}
        title1={"Tenures"}
        addLink2={"/qms/manage/tenures/addedit"}
        title2={location && location?.state ? "Edit Tenures" : "Add Tenures"}
      />
    <ToastContainer />

      <div class="container-fluid">
        <div class="card">
          <div class="card-header red-bg" style={{ background: "#14ae5c" }}>
            {location && location.state ? <h1>Edit Tenures</h1> : <h1>Add Tenures</h1>}
          </div>
          <div class="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div class="container-fluid">
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Tenure</label>
                      <input
                        type="text"
                        placeholder={"Tenure Name"}
                        value={formik.values.tenure}
                        className={`form-control ${
                          formik.touched.tenure && formik.errors.tenure ? "is-invalid" : ""
                        }`}
                        id="tenure"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.tenure && formik.errors.tenure && (
                        <div className="invalid-feedback">{formik.errors.tenure}</div>
                      )}
                    </div>
                  </div>

                  <div className="col">
                    <div className="mb-3" style={{ position: "relative" }}>
                      <label className="form-label">From Date</label>
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
                        selected={formik.values.fromDate}
                        onChange={(date) =>
                          formik.setFieldValue("fromDate", date)
                        }
                        onBlur={formik.handleBlur}
                        minDate={new Date()}
                        className={`form-control ${
                          formik.touched.fromDate && formik.errors.fromDate
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {formik.touched.fromDate && formik.errors.fromDate && (
                        <div className="invalid-feedback">
                          {formik.errors.fromDate}
                        </div>
                      )}
                    </div>
                  </div>

                </div>

                 <div class="row">
                  <div className="col-6">
                    <div className="mb-3" style={{ position: "relative" }}>
                      <label className="form-label">To Date</label>
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
                        selected={formik.values.toDate}
                        onChange={(date) =>
                          formik.setFieldValue("toDate", date)
                        }
                        onBlur={formik.handleBlur}
                        minDate={new Date()}
                        className={`form-control ${
                          formik.touched.toDate && formik.errors.toDate
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {formik.touched.toDate && formik.errors.toDate && (
                        <div className="invalid-feedback">
                          {formik.errors.toDate}
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

export default QMSAddEditTenuresForm;
