import React, { useState } from "react";
import { LMSsidebarItems } from "../../../../../utils/sideBarItems";
import { Layout } from "../../../../../components/Layout";
import logoImage from "../../../../../assets/profile-img.jpg";
import { useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Header from "../../../../../components/Header";
import DatePicker from "react-datepicker";
import { CustomAlert } from "../../../../../components/CustomComponents/CustomAlert";
import { createLeave } from "../../../../../api/APIs";

const validationSchema = Yup.object({
  reason: Yup.string().required("Reason is required"),
  comments: Yup.string().required("Comment is required"),
  leaveForwarder: Yup.string().required("Leave Forwarder is required"),
  submittedTo: Yup.string().required("This field is required"),
  status: Yup.string().required("Status is required"),
  leaveType: Yup.string().required("Leave Type is required"),
  leaveSubtype: Yup.string().required("Leave Subtype is required"),
  startDate: Yup.date().required("Start date is required"),
  endDate: Yup.date().required("End date is required"),
  leaveStation: Yup.boolean(),
});
function LMSAddEdit() {
  const location = useLocation();

  const [isChecked, setChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formValues, setFormValues] = useState();

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const handleOkClick = () => {
    CreateLeaveApi(formValues);
    handleClose();
  };
  
  const formik = useFormik({
    initialValues: {
      reason: "",
      comments: "",
      leaveForwarder: "",
      submittedTo: "",
      status: "",
      leaveType: "",
      leaveSubtype: "",
      startDate: null,
      endDate: null,
      leaveStation: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      handleShow();
      setFormValues(values);
    },
  });

  const handleCheckboxChange = () => {
    setChecked(!isChecked);
  };

  const CreateLeaveApi = async (values) => {
    const data = {
      fkRequestTypeId: 1,
      fkUserId: 1,
      requestStatus: values.status,
      requestStartDate: values.startDate,
      requestEndDate: values.endDate,
      requestLeaveSubType: values.leaveSubtype,
      requestLeaveReason: values.reason,
      requestNumberOfDays: "5",
      requestLeaveSubmittedTo: values.submittedTo,
      requestLeaveApplyOnBehalf: isChecked,
      requestLeaveForwarder: values.leaveForwarder,
      requestStationLeave: values.leaveStation,
    };

    console.log(data);

    try {
      const response = await createLeave(data);
      console.log(response);
      if (response.success) {
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Layout module={true} sidebarItems={LMSsidebarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/lms/dashboard"}
        addLink1={"/lms/addedit"}
        title1={location && location.state ? "Edit Leave" : "Add Leave"}
      />
      <CustomAlert
        showModal={showModal}
        handleClose={handleClose}
        handleOkClick={handleOkClick}
      />
      <div class="card">
        <div class="card-header red-bg" style={{ background: "#14ae5c " }}>
          {location && location.state ? (
            <h1>Edit Leave</h1>
          ) : (
            <h1>Add Leave</h1>
          )}
        </div>
        <div class="card-body">
          <form onSubmit={formik.handleSubmit}>
            <div class="container-fluid">
              <div className="row">
                <div class="col mt-3">
                  <div class="mb-3">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        Leave on behalf
                      </label>
                    </div>
                  </div>
                </div>
                {isChecked && (
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Leave Forwarder</label>
                      <select
                        class={`form-select ${
                          formik.touched.leaveForwarder &&
                          formik.errors.leaveForwarder
                            ? "is-invalid"
                            : ""
                        }`}
                        placeholder="Leave Forwarder"
                        value={formik.values.leaveForwarder}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="leaveForwarder"
                      >
                        <option value="" selected disabled hidden>
                          Select
                        </option>
                        <option>HR</option>
                        <option>DG</option>
                      </select>
                      {formik.touched.leaveForwarder &&
                        formik.errors.leaveForwarder && (
                          <div className="invalid-feedback">
                            {formik.errors.leaveForwarder}
                          </div>
                        )}
                    </div>
                  </div>
                )}
              </div>

              <div class="row">
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Submitted To</label>
                    <select
                      class={`form-select ${
                        formik.touched.submittedTo && formik.errors.submittedTo
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="Leave Forwarder"
                      value={formik.values.submittedTo}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="submittedTo"
                    >
                      <option value="" selected disabled hidden>
                        Select
                      </option>
                      <option>HR</option>
                      <option>DG</option>
                    </select>
                    {formik.touched.submittedTo &&
                      formik.errors.submittedTo && (
                        <div className="invalid-feedback">
                          {formik.errors.submittedTo}
                        </div>
                      )}
                  </div>
                </div>

                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Status</label>
                    <select
                      class={`form-select ${
                        formik.touched.status && formik.errors.status
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="Leave Forwarder"
                      value={formik.values.status}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="status"
                    >
                      <option value="" selected disabled hidden>
                        Select
                      </option>
                      <option>Pending</option>
                      <option>Approved</option>
                      <option>Rejected</option>
                    </select>
                    {formik.touched.status && formik.errors.status && (
                      <div className="invalid-feedback">
                        {formik.errors.status}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Leave Type</label>
                    <select
                      class={`form-select ${
                        formik.touched.leaveType && formik.errors.leaveType
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="Leave Forwarder"
                      value={formik.values.leaveType}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="leaveType"
                    >
                      <option value="" selected disabled hidden>
                        Select
                      </option>
                      <option>Casual</option>
                      <option>Sick</option>
                    </select>
                    {formik.touched.leaveType && formik.errors.leaveType && (
                      <div className="invalid-feedback">
                        {formik.errors.leaveType}
                      </div>
                    )}
                  </div>
                </div>

                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Leave Subtype</label>
                    <select
                      class={`form-select ${
                        formik.touched.leaveSubtype &&
                        formik.errors.leaveSubtype
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="Leave Forwarder"
                      value={formik.values.leaveSubtype}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="leaveSubtype"
                    >
                      <option value="" selected disabled hidden>
                        Select
                      </option>
                      <option>Year</option>
                      <option>2023</option>
                    </select>
                    {formik.touched.leaveSubtype &&
                      formik.errors.leaveSubtype && (
                        <div className="invalid-feedback">
                          {formik.errors.leaveSubtype}
                        </div>
                      )}
                  </div>
                </div>
              </div>

              <div class="row">
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">Start Date</label>
                    <DatePicker
                      selected={formik.values.startDate}
                      onChange={(date) =>
                        formik.setFieldValue("startDate", date)
                      }
                      onBlur={formik.handleBlur}
                      className={`form-control ${
                        formik.touched.startDate && formik.errors.startDate
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    {formik.touched.startDate && formik.errors.startDate && (
                      <div className="invalid-feedback">
                        {formik.errors.startDate}
                      </div>
                    )}
                  </div>
                </div>

                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">End Date</label>
                    <DatePicker
                      selected={formik.values.endDate}
                      onChange={(date) => formik.setFieldValue("endDate", date)}
                      onBlur={formik.handleBlur}
                      className={`form-control ${
                        formik.touched.endDate && formik.errors.endDate
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    {formik.touched.endDate && formik.errors.endDate && (
                      <div className="invalid-feedback">
                        {formik.errors.endDate}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-6">
                  <div class="mb-3">
                    <label for="formFile" class="form-label">
                      Attachment{" "}
                    </label>
                    <input class="form-control" type="file" id="formFile" />
                  </div>
                </div>

                <div class="col-6">
                  <div class="mb-3">
                    <div class="form-check" style={{ marginTop: "39px" }}>
                      <input
                        class={`form-check-input ${
                          formik.touched.leaveStation &&
                          formik.errors.leaveStation
                            ? "is-invalid"
                            : ""
                        }`}
                        type="checkbox"
                        id="flexCheckDefault"
                        checked={formik.values.leaveStation}
                        onChange={() =>
                          formik.setFieldValue(
                            "leaveStation",
                            !formik.values.leaveStation
                          )
                        }
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        Leave Station
                      </label>
                      {formik.touched.leaveStation &&
                        formik.errors.leaveStation && (
                          <div className="invalid-feedback">
                            {formik.errors.leaveStation}
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Reason</label>
                    <textarea
                      cols="30"
                      rows="10"
                      placeholder={formik.values.reason}
                      className={`form-control ${
                        formik.touched.reason && formik.errors.reason
                          ? "is-invalid"
                          : ""
                      }`}
                      id="reason"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.reason}
                    ></textarea>
                    {formik.touched.reason && formik.errors.reason && (
                      <div className="invalid-feedback">
                        {formik.errors.reason}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Comment</label>
                    <textarea
                      cols="30"
                      rows="10"
                      placeholder={formik.values.comments}
                      className={`form-control ${
                        formik.touched.comments && formik.errors.comments
                          ? "is-invalid"
                          : ""
                      }`}
                      id="comments"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.comments}
                    ></textarea>
                    {formik.touched.comments && formik.errors.comments && (
                      <div className="invalid-feedback">
                        {formik.errors.comments}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button class="btn btn-primary" type="submit">
                    Submit
                  </button>
                </div>
              </div>
              {location.state && (
                <div class="row">
                  <div class="col">
                    <div
                      class="d-flex flex-row p-3"
                      style={{ border: "#ddd solid 1px", marginTop: "25px" }}
                    >
                      <img
                        style={{ marginBottom: "30px", marginRight: "15px" }}
                        src={logoImage}
                        width="40"
                        height="40"
                        class="rounded-circle mr-3"
                        alt="logo"
                      />
                      <div class="w-100">
                        <div class="d-flex justify-content-between align-items-center">
                          <div class="d-flex flex-row align-items-center">
                            <span class="mr-2">Saqib</span>
                            <small
                              style={{ marginLeft: "8px" }}
                              class="c-badge"
                            >
                              Pending
                            </small>
                          </div>
                          <small>Mon, 07-18-2022 09:02 AM</small>
                        </div>
                        <p
                          class="text-justify comment-text mb-0"
                          style={{ marginTop: "7px" }}
                        >
                          I dont have any assistance from relatives, so I have
                          to participate it.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default LMSAddEdit;
