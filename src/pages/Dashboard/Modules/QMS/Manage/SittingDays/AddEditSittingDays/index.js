import React, { useEffect, useState } from "react";
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
import { createManageSession, getManageSessionById, updateManageSession } from "../../../../../../../api/APIs";
import { ToastContainer } from "react-toastify";

const validationSchema = Yup.object({
  fkSessionId: Yup.string().required("Session is required"),
  sittingDate: Yup.string().required("Sitting date is required"),
  startTime: Yup.string().required("Start time is required"),
  endTime: Yup.string().required("End time is required"),
  isAdjourned: Yup.boolean()
});
function QMSAddEditSittingDaysForm() {
  const location = useLocation();
  const [sessionId, setSessionId] = useState();

  const formik = useFormik({
    initialValues: {
      fkSessionId: "",
      sittingDate: "",
      startTime: "",
      endTime: "",
      isAdjourned: false
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      if (location?.state) {
        handleEditSittingDays(values);
      } else {
        handleCreateSittingDays(values);
      }
    },
  });

  const handleCreateSittingDays = async (values) => {
    const data = {
      fkSessionId: values.fkSessionId,
      sittingDate: values.sittingDate,
      startTime: values.startTime,
      endTime: values.endTime,
      sessionAdjourned: values.isAdjourned,
    }

    try {
      const response = await createManageSession(data);
      if (response?.success) {
        showSuccessMessage(response?.message);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  }

  const handleEditSittingDays = async (values) => {
    const data = {
      fkSessionId: values.fkSessionId,
      sittingDate: values.sittingDate,
      startTime: values.startTime,
      endTime: values.endTime,
      sessionAdjourned: values.isAdjourned,
    }

    try {
      const response = await updateManageSession(location?.state?.id, data);
      if (response?.success) {
        showSuccessMessage(response?.message);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  }

  const getSessionsByIdApi = async () => {
    try {
      const response = await getManageSessionById(location.state?.id);
      if (response?.success) {
        setSessionId(response?.data);
      }
    } catch (error) {
      // showErrorMessage(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (location.state?.id) {
      getSessionsByIdApi();
    }
  }, [])

  useEffect(() => {
    // Update form values when termsById changes
    console.log(sessionId?.sessionAdjourned);
    if (sessionId) {
      formik.setValues({
        fkSessionId: sessionId.fkSessionId || "",
        sittingDate: new Date(sessionId.sittingDate) || "",
        startTime: sessionId.startTime || "",
        endTime: sessionId.endTime || "",
        isAdjourned: sessionId.sessionAdjourned || false
      });
    }
  }, [sessionId, formik.setValues]);

  return (
    <Layout
      module={true}
      sidebarItems={QMSSideBarItems}
      centerlogohide={true}
    >
      <Header
        dashboardLink={"/qms/dashboard"}
        addLink1={"/qms/manage/sitting-days"}
        title1={"Sitting Days"}
        addLink2={"/qms/manage/sitting-days/addedit"}
        title2={location && location?.state ? "Edit Sitting Days" : "Add Sitting Days"}
      />
      <ToastContainer />

      <div class="container-fluid">
        <div class="card">
          <div class="card-header red-bg" style={{ background: "#14ae5c" }}>
            {location && location.state ? (
              <h1>Edit Sitting Days</h1>
            ) : (
              <h1>Add Sitting Days</h1>
            )}
          </div>
          <div class="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div class="container-fluid">
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Session ID</label>
                      <input
                        type="text"
                        placeholder={"Session ID"}
                        value={formik.values.fkSessionId}
                        className={`form-control ${
                          formik.touched.fkSessionId && formik.errors.fkSessionId ? "is-invalid" : ""
                        }`}
                        id="fkSessionId"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.fkSessionId && formik.errors.fkSessionId && (
                        <div className="invalid-feedback">{formik.errors.fkSessionId}</div>
                      )}
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-3" style={{ position: "relative" }}>
                      <label className="form-label">Sitting Date</label>
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
                        selected={formik.values.sittingDate}
                        onChange={(date) =>
                          formik.setFieldValue("sittingDate", date)
                        }
                        onBlur={formik.handleBlur}
                        minDate={new Date()}
                        className={`form-control ${
                          formik.touched.sittingDate && formik.errors.sittingDate
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {formik.touched.sittingDate && formik.errors.sittingDate && (
                        <div className="invalid-feedback">
                          {formik.errors.sittingDate}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div class="row">
                <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Start Time</label>
                      <input
                        type="text"
                        placeholder={"Session ID"}
                        value={formik.values.startTime}
                        className={`form-control ${
                          formik.touched.startTime && formik.errors.startTime ? "is-invalid" : ""
                        }`}
                        id="startTime"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.startTime && formik.errors.startTime && (
                        <div className="invalid-feedback">{formik.errors.startTime}</div>
                      )}
                    </div>
                  </div>

                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">End Time</label>
                      <input
                        type="text"
                        placeholder={"Session ID"}
                        value={formik.values.endTime}
                        className={`form-control ${
                          formik.touched.endTime && formik.errors.endTime ? "is-invalid" : ""
                        }`}
                        id="endTime"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.endTime && formik.errors.endTime && (
                        <div className="invalid-feedback">{formik.errors.endTime}</div>
                      )}
                    </div>
                  </div>
                </div>

                <div class="row">
                <div class="col-6">
                    <div class="mb-3">
                      <div class="form-check">
                        <input
                          class={`form-check-input ${
                            formik.touched.isAdjourned &&
                            formik.errors.isAdjourned
                              ? "is-invalid"
                              : ""
                          }`}
                          type="checkbox"
                          id="flexCheckDefault"
                          checked={formik.values.isAdjourned}
                          onChange={() =>
                            formik.setFieldValue(
                              "isAdjourned",
                              !formik.values.isAdjourned,
                            )
                          }
                        />
                        <label class="form-check-label" for="flexCheckDefault">
                          Is Session Adjourned
                        </label>
                        {formik.touched.isAdjourned &&
                          formik.errors.isAdjourned && (
                            <div className="invalid-feedback">
                              {formik.errors.isAdjourned}
                            </div>
                          )}
                      </div>
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

export default QMSAddEditSittingDaysForm;
