import React, { useEffect, useState } from "react";
import { LMSsidebarItems } from "../../../../../utils/sideBarItems";
import { Layout } from "../../../../../components/Layout";
import logoImage from "../../../../../assets/profile-img.jpg";
import { useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Header from "../../../../../components/Header";
import DatePicker from "react-datepicker";
import { CustomAlert } from "../../../../../components/CustomComponents/CustomAlert";
import { UpdateLeaveById, createLeave, getAllLeaveTypes, getLeaveById } from "../../../../../api/APIs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import Moment from "react-moment";

const validationSchema = Yup.object({
  reason: Yup.string().required("Reason is required"),
  // comments: Yup.string().required("Comment is required"),
  // leaveForwarder: Yup.string().required("Leave Forwarder is required"),
  submittedTo: Yup.number().required("This field is required"),
  status: Yup.string().required("Status is required"),
  leaveType: Yup.number().required("Leave Type is required"),
  leaveSubtype: Yup.string().required("Leave Subtype is required"),
  startDate: Yup.date().required("Start date is required"),
  endDate: Yup.date().required("End date is required"),
  leaveStation: Yup.boolean(),
});
function LMSAddEdit() {
  const location = useLocation();

  const [showModal, setShowModal] = useState(false);
  const [formValues, setFormValues] = useState();
  const [leaveByIdData, setLeaveByIdData] = useState([]);
  const [leaveTypesData, setLeaveTypesData] = useState([]);
  const [isChecked, setChecked] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const handleOkClick = () => {
    if (location?.state?.id) {
      UpdateLeaveApi(formValues);
    } else {
      CreateLeaveApi(formValues);
    }
    handleClose();
  };

  const showSuccessMessage = (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      hideProgressBar: false,
    });
  };

  const showErrorMessage = (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      hideProgressBar: false,
    });
  };

  const initialValues = {
    reason: leaveByIdData.length > 0 ? leaveByIdData[0]?.requestLeaveReason : "",
    comments: "",
    leaveForwarder: leaveByIdData.length > 0 ? leaveByIdData[0]?.requestLeaveForwarder : "",
    submittedTo: leaveByIdData.length > 0 ? leaveByIdData[0]?.requestLeaveSubmittedTo : null,
    status: leaveByIdData.length > 0 ? leaveByIdData[0]?.requestStatus : "",
    leaveType: leaveByIdData.length > 0 ? leaveByIdData[0]?.fkRequestTypeId : null,
    leaveSubtype: leaveByIdData.length > 0 ? leaveByIdData[0]?.requestLeaveSubType : "",
    startDate: leaveByIdData.length > 0 ? new Date(leaveByIdData[0]?.requestStartDate) : null,
    endDate: leaveByIdData.length > 0 ? new Date(leaveByIdData[0]?.requestEndDate) : null,
    leaveStation: leaveByIdData.length > 0 ? leaveByIdData[0]?.requestStationLeave : false,
    attachment: null,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      handleShow();
      console.log("Submit", values);
      setFormValues(values);
    },
    enableReinitialize: true,
  });

  const handleCheckboxChange = () => {
    setChecked(!isChecked);
  };

  const getLeaveByIdApi = async () => {
    try {
      const response = await getLeaveById(location.state?.id);
      if (response?.success) {
        // showSuccessMessage(response?.message);
        setLeaveByIdData(response.data);
        if (response?.data[0]?.requestLeaveForwarder) {
          setChecked(true);
        }
      }
    } catch (error) {
      // showErrorMessage(error?.response?.data?.message);
    }
  };

  const getAllLeaveTypesApi = async () => {
    try {
      const response = await getAllLeaveTypes();
      if (response?.success) {
        setLeaveTypesData(response?.data);
      }
    } catch (error) {
      // showErrorMessage(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getAllLeaveTypesApi();
    if (location.state?.id) {
      getLeaveByIdApi();
    }
  }, []);

  const CreateLeaveApi = async (values) => {
    const startDateObj = new Date(values.startDate);
    const endDateObj = new Date(values.endDate);

    // Calculate the time difference in milliseconds
    const timeDiff = endDateObj - startDateObj;

    // Calculate the number of days
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    const formattedDateStart = moment(startDateObj).format("YYYY-MM-DD");
    const formattedDateEnd = moment(endDateObj).format("YYYY-MM-DD");

    const formData = new FormData();
    formData.append("fkRequestTypeId", values.leaveType);
    formData.append("fkUserId", 1);
    formData.append("requestStatus", values.status);
    formData.append("requestStartDate", formattedDateStart);
    formData.append("requestEndDate", formattedDateEnd);
    formData.append("requestLeaveSubType", values.leaveSubtype);
    formData.append("requestLeaveReason", values.reason);
    formData.append("requestNumberOfDays", String(daysDiff));
    formData.append("requestLeaveSubmittedTo", values.submittedTo);
    formData.append("requestLeaveApplyOnBehalf", isChecked);
    formData.append("requestLeaveForwarder", values.leaveForwarder);
    formData.append("requestStationLeave", values.leaveStation);
    formData.append("file", values.attachment);

    try {
      const response = await createLeave(formData);
      if (response?.success) {
        showSuccessMessage(response?.message);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const UpdateLeaveApi = async (values) => {
    const startDateObj = new Date(values.startDate);
    const endDateObj = new Date(values.endDate);

    // Calculate the time difference in milliseconds
    const timeDiff = endDateObj - startDateObj;

    // Calculate the number of days
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    const data = {
      fkRequestTypeId: values.leaveType,
      fkUserId: 1,
      requestStatus: values.status,
      requestStartDate: values.startDate,
      requestEndDate: values.endDate,
      requestLeaveSubType: values.leaveSubtype,
      requestLeaveReason: values.reason,
      requestNumberOfDays: String(daysDiff),
      requestLeaveSubmittedTo: values.submittedTo,
      requestLeaveApplyOnBehalf: isChecked,
      requestLeaveForwarder: values.leaveForwarder,
      requestStationLeave: values.leaveStation,
      leaveComment: values.comments,
      commentedBy: 1,
    };

    try {
      const response = await UpdateLeaveById(location?.state?.id, data);
      if (response?.success) {
        showSuccessMessage(response?.message);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  return (
    <Layout module={true} sidebarItems={LMSsidebarItems} centerlogohide={true}>
      <ToastContainer />

      <Header
        dashboardLink={"/lms/dashboard"}
        addLink1={"/lms/addedit"}
        title1={location && location.state ? "Edit Leave" : "Add Leave"}
      />
      <CustomAlert showModal={showModal} handleClose={handleClose} handleOkClick={handleOkClick} />
      <div className="container-fluid">
        <div class="card">
          <div class="card-header red-bg" style={{ background: "#14ae5c " }}>
            {location && location.state ? <h1>Edit Leave</h1> : <h1>Add Leave</h1>}
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
                            formik.touched.leaveForwarder && formik.errors.leaveForwarder ? "is-invalid" : ""
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
                        {formik.touched.leaveForwarder && formik.errors.leaveForwarder && (
                          <div className="invalid-feedback">{formik.errors.leaveForwarder}</div>
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
                          formik.touched.submittedTo && formik.errors.submittedTo ? "is-invalid" : ""
                        }`}
                        placeholder="Leave Forwarder"
                        value={formik.values.submittedTo}
                        onChange={(e) => {
                          // Set submittedTo as a number directly
                          formik.handleChange(e);
                          formik.setFieldValue("submittedTo", Number(e.target.value));
                        }}
                        onBlur={formik.handleBlur}
                        name="submittedTo"
                      >
                        <option value="" selected disabled hidden>
                          Select
                        </option>
                        <option value={1}>HR</option>
                        <option value={2}>DG</option>
                      </select>
                      {formik.touched.submittedTo && formik.errors.submittedTo && (
                        <div className="invalid-feedback">{formik.errors.submittedTo}</div>
                      )}
                    </div>
                  </div>

                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Status</label>
                      <select
                        class={`form-select ${formik.touched.status && formik.errors.status ? "is-invalid" : ""}`}
                        placeholder="Leave Forwarder"
                        value={formik.values.status}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="status"
                      >
                        <option value="" selected disabled hidden>
                          Select
                        </option>
                        <option value={"pending"}>Pending</option>
                        <option value={"approved"}>Approved</option>
                        <option value={"rejected"}>Rejected</option>
                      </select>
                      {formik.touched.status && formik.errors.status && (
                        <div className="invalid-feedback">{formik.errors.status}</div>
                      )}
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Leave Type</label>
                      <select
                        class={`form-select ${formik.touched.leaveType && formik.errors.leaveType ? "is-invalid" : ""}`}
                        placeholder="Leave Forwarder"
                        value={formik.values.leaveType}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="leaveType"
                      >
                        <option value="" selected disabled hidden>
                          Select
                        </option>
                        {leaveTypesData &&
                          leaveTypesData.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.leaveType}
                            </option>
                          ))}
                      </select>
                      {formik.touched.leaveType && formik.errors.leaveType && (
                        <div className="invalid-feedback">{formik.errors.leaveType}</div>
                      )}
                    </div>
                  </div>

                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Leave Subtype</label>
                      <select
                        class={`form-select ${
                          formik.touched.leaveSubtype && formik.errors.leaveSubtype ? "is-invalid" : ""
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
                        <option value={"preApproved"}>Pre Approved</option>
                        <option value={"postApproved"}>Post Approved</option>
                        <option value={"telephonicInformed"}>Telephonic Informed</option>
                      </select>
                      {formik.touched.leaveSubtype && formik.errors.leaveSubtype && (
                        <div className="invalid-feedback">{formik.errors.leaveSubtype}</div>
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
                        onChange={(date) => formik.setFieldValue("startDate", date)}
                        onBlur={formik.handleBlur}
                        className={`form-control ${
                          formik.touched.startDate && formik.errors.startDate ? "is-invalid" : ""
                        }`}
                      />
                      {formik.touched.startDate && formik.errors.startDate && (
                        <div className="invalid-feedback">{formik.errors.startDate}</div>
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
                          formik.touched.endDate && formik.errors.endDate ? "is-invalid" : ""
                        }`}
                      />
                      {formik.touched.endDate && formik.errors.endDate && (
                        <div className="invalid-feedback">{formik.errors.endDate}</div>
                      )}
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div className="col-6">
                    <div className="mb-3">
                      <label htmlFor="formFile" className="form-label">
                        Attachment
                      </label>
                      <input
                        className="form-control"
                        type="file"
                        id="formFile"
                        name="attachment"
                        onChange={(event) => {
                          formik.setFieldValue("attachment", event.currentTarget.files[0]);
                        }}
                      />
                    </div>
                  </div>

                  <div class="col-6">
                    <div class="mb-3">
                      <div class="form-check" style={{ marginTop: "39px" }}>
                        <input
                          class={`form-check-input ${
                            formik.touched.leaveStation && formik.errors.leaveStation ? "is-invalid" : ""
                          }`}
                          type="checkbox"
                          id="flexCheckDefault"
                          checked={formik.values.leaveStation}
                          onChange={() => formik.setFieldValue("leaveStation", !formik.values.leaveStation)}
                        />
                        <label class="form-check-label" for="flexCheckDefault">
                          Leave Station
                        </label>
                        {formik.touched.leaveStation && formik.errors.leaveStation && (
                          <div className="invalid-feedback">{formik.errors.leaveStation}</div>
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
                        className={`form-control ${formik.touched.reason && formik.errors.reason ? "is-invalid" : ""}`}
                        id="reason"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.reason}
                      ></textarea>
                      {formik.touched.reason && formik.errors.reason && (
                        <div className="invalid-feedback">{formik.errors.reason}</div>
                      )}
                    </div>
                  </div>
                </div>
                <div class="row">
                  {location.state?.id && (
                    <div class="col">
                      <div class="mb-3">
                        <label class="form-label">Comment</label>
                        <textarea
                          cols="30"
                          rows="10"
                          placeholder={formik.values.comments}
                          className={`form-control ${
                            formik.touched.comments && formik.errors.comments ? "is-invalid" : ""
                          }`}
                          id="comments"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.comments}
                        ></textarea>
                        {formik.touched.comments && formik.errors.comments && (
                          <div className="invalid-feedback">{formik.errors.comments}</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <div class="row">
                  <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button class="btn btn-primary" type="submit">
                      Submit
                    </button>
                  </div>
                </div>
                {location.state?.id &&
                  leaveByIdData[0]?.comments?.length > 0 &&
                  leaveByIdData[0]?.comments.map((item, index) => (
                    <div key={index} className="row">
                      <div className="col">
                        <div className="d-flex flex-row p-3" style={{ border: "#ddd solid 1px", marginTop: "25px" }}>
                          <img
                            style={{ marginBottom: "30px", marginRight: "15px" }}
                            src={logoImage}
                            width="40"
                            height="40"
                            className="rounded-circle mr-3"
                            alt="logo"
                          />
                          <div className="w-100">
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="d-flex flex-row align-items-center">
                                <span className="mr-2">{item.commentedByName}</span>
                                <small style={{ marginLeft: "8px" }} className="c-badge">
                                  Pending
                                </small>
                              </div>
                              <small>Mon, 07-18-2022 09:02 AM</small>
                            </div>
                            <p className="text-justify comment-text mb-0" style={{ marginTop: "7px" }}>
                              {item.leaveComment}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default LMSAddEdit;
