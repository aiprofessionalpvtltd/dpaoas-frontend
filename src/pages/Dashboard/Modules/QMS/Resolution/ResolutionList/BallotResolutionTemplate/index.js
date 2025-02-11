import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Layout } from "../../../../../../../components/Layout";
import { QMSSideBarItems } from "../../../../../../../utils/sideBarItems";
import { useFormik } from "formik";
import DatePicker from "react-datepicker";
import * as Yup from "yup";
import { Editor } from "../../../../../../../components/CustomComponents/Editor";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../../utils/ToastAlert";
import {
  ballotResolutionTemplateByID,
  updateBallotResolutionTemplate,
} from "../../../../../../../api/APIs/Services/Resolution.service";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

const validationSchema = Yup.object({
  userName: Yup.string().required("Name is required"),
  userRole: Yup.string().required("Role is required"),
  templateDescription: Yup.string().optional(),
});

function QMSBallotResolutionListTemplate() {
  const location = useLocation();
  const formik = useFormik({
    initialValues: {
      userName: "",
      userRole: "",
      ballotingFileNo: "",
      ballotingDate: "",
      ballotingOrderDate: "",
      templateDescription: "",
    },

    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values) => {
    try {
      const response = await updateBallotResolutionTemplate(
        location?.state?.id,
        values
      );
      if (response?.success) {
        showSuccessMessage(response?.message);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const handleSingleRecord = async () => {
    try {
      const response = await ballotResolutionTemplateByID(location?.state?.id);
      if (response?.success) {
        formik.setValues({
          userName: response?.data?.template?.templateUserName || "",
          userRole: response?.data?.template?.templateUserRole || "",
          templateDescription:
            response?.data?.template?.templateDescription || "",
          ballotingFileNo: response?.data?.template?.ballotingFileNo || "",
          ballotingDate: response?.data?.template?.ballotingDate || "",
          ballotingOrderDate: response?.data?.template?.ballotingOrderDate || "",
        });
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const handleDateSelect = (date, field) => {
    if (date) {
      formik.setFieldValue(field, moment(date).format("YYYY-MM-DD"));
    }
  };

  useEffect(() => {
    handleSingleRecord();
  }, [location?.state?.id]);
  return (
    <Layout sidebarItems={QMSSideBarItems}>
      <ToastContainer />
      <div className="container-fluid">
        <div className="card">
          <div className="card-header red-bg" style={{ background: "#666" }}>
            <h1>Edit Ballot Template</h1>
          </div>
          <div className="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-4">
                    <div className="mb-3">
                      <label className="form-label">
                        User Name <span className="text-danger">*</span>{" "}
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          formik.touched.userName && formik.errors.userName
                            ? "is-invalid"
                            : ""
                        }`}
                        id="userName"
                        value={formik.values.userName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.userName && formik.errors.userName && (
                        <div className="invalid-feedback">
                          {formik.errors.userName}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="mb-3">
                      <label className="form-label">
                        User Role <span className="text-danger">*</span>{" "}
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          formik.touched.userRole && formik.errors.userRole
                            ? "is-invalid"
                            : ""
                        }`}
                        id="userRole"
                        value={formik.values.userRole}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.userRole && formik.errors.userRole && (
                        <div className="invalid-feedback">
                          {formik.errors.userRole}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="mb-3">
                      <label className="form-label">File No</label>
                      <input
                        type="text"
                        className={`form-control`}
                        id="ballotingFileNo"
                        value={formik.values.ballotingFileNo}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                  </div>
                </div>
                <dive className="row">
                  <div className="col-4">
                    <div className="mb-3" style={{ position: "relative" }}>
                      <label className="form-label">Balloting Date</label>
                      <span
                        style={{
                          position: "absolute",
                          right: "15px",
                          top: "36px",
                          zIndex: 1,
                          fontSize: "20px",
                          zIndex: "1",
                          color: "#666",
                          cursor: "pointer",
                        }}
                      >
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </span>

                      <DatePicker
                        selected={
                          formik.values.ballotingDate
                            ? moment(
                                formik.values.ballotingDate,
                                "YYYY-MM-DD"
                              ).toDate()
                            : null
                        }
                        onChange={(date) =>
                          handleDateSelect(date, "ballotingDate")
                        }
                        onBlur={formik.handleBlur}
                        className={`form-control`}
                        dateFormat="dd-MM-yyyy"
                      />
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="mb-3" style={{ position: "relative" }}>
                      <label className="form-label">Balloting Order Date</label>
                      <span
                        style={{
                          position: "absolute",
                          right: "15px",
                          top: "36px",
                          zIndex: 1,
                          fontSize: "20px",
                          zIndex: "1",
                          color: "#666",
                          cursor: "pointer",
                        }}
                      >
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </span>

                      <DatePicker
                        selected={
                          formik.values.ballotingOrderDate
                            ? moment(
                                formik.values.ballotingOrderDate,
                                "YYYY-MM-DD"
                              ).toDate()
                            : null
                        }
                        onChange={(date) =>
                          handleDateSelect(date, "ballotingOrderDate")
                        }
                        onBlur={formik.handleBlur}
                        className={`form-control`}
                        dateFormat="dd-MM-yyyy"
                      />
                    </div>
                  </div>
                </dive>
                <div style={{ marginTop: 10 }}>
                  <Editor
                    title={"Description"}
                    onChange={(content) =>
                      formik.setFieldValue("templateDescription", content)
                    }
                    value={formik.values.templateDescription}
                  />
                </div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button className="btn btn-primary" type="submit">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default QMSBallotResolutionListTemplate;
