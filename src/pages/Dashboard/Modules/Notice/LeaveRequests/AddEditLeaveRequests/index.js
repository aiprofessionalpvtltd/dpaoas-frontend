import React, { useContext, useEffect, useState } from "react";
import { LMSsidebarItems } from "../../../../../../utils/sideBarItems";
import { Layout } from "../../../../../../components/Layout";
import logoImage from "../../../../../../assets/profile-img.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Header from "../../../../../../components/Header";
import DatePicker from "react-datepicker";
import { CustomAlert } from "../../../../../../components/CustomComponents/CustomAlert";
import {
  UpdateLeaveById,
  createLeave,
  getAllLeaveTypes,
  getLeaveById,
} from "../../../../../../api/APIs/Services/LeaveManagementSystem.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
// import Moment from "react-moment";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NoticeSidebarItems } from "../../../../../../utils/sideBarItems";
import { AuthContext } from "../../../../../../api/AuthContext";
import Select from "react-select";
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
function AddEditLeaveRequests() {
  const location = useLocation();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [formValues, setFormValues] = useState();
  const [leaveByIdData, setLeaveByIdData] = useState([]);
  const [leaveTypesData, setLeaveTypesData] = useState([]);
  const [leaveType, setLeaveType] = useState("");
  const [isChecked, setChecked] = useState(false);
  const { members, sessions } = useContext(AuthContext);

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
    member: "",
    sessionNumber: "",
    leaveType: "",
    applicationSubmittedDate: "",
    leaveStartDate: "",
    leaveEndDate: "",
    subject: "",
    attachment: null,

    // reason:
    //   leaveByIdData.length > 0 ? leaveByIdData[0]?.requestLeaveReason : "",
    // comments: "",
    // leaveForwarder:
    //   leaveByIdData.length > 0 ? leaveByIdData[0]?.requestLeaveForwarder : "",
    // submittedTo:
    //   leaveByIdData.length > 0
    //     ? leaveByIdData[0]?.requestLeaveSubmittedTo
    //     : null,
    // status: leaveByIdData.length > 0 ? leaveByIdData[0]?.requestStatus : "",
    // leaveType:
    //   leaveByIdData.length > 0 ? leaveByIdData[0]?.fkRequestTypeId : null,
    // leaveSubtype:
    //   leaveByIdData.length > 0 ? leaveByIdData[0]?.requestLeaveSubType : "",
    // startDate:
    //   leaveByIdData.length > 0
    //     ? new Date(leaveByIdData[0]?.requestStartDate)
    //     : null,
    // endDate:
    //   leaveByIdData.length > 0
    //     ? new Date(leaveByIdData[0]?.requestEndDate)
    //     : null,
    // leaveStation:
    //   leaveByIdData.length > 0 ? leaveByIdData[0]?.requestStationLeave : false,
    // attachment: null,
  };

  const formik = useFormik({
    initialValues: initialValues,
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      handleShow();
      setFormValues(values);
    },
    enableReinitialize: true,
  });

  const handleCheckboxChange = () => {
    setChecked(!isChecked);
  };

  const handleLeaveTypeChange = (e) => {
    setLeaveType(e.target.value);
    formik.handleChange(e); // to make sure formik tracks the changes
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

  useEffect(() => {
    if (sessions && sessions?.length > 0) {
      const currentSessionId = sessions[0]?.id; // Assuming the first session is the current one
      formik.setFieldValue("sessionNumber", currentSessionId);
    }
  }, [sessions]);

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

    // try {
    //   const response = await createLeave(formData);
    //   if (response?.success) {
    //     showSuccessMessage(response?.message);
    //     setTimeout(() => {
    //       navigate("/notice/leaveRequests");
    //     }, 3000);
    //   }
    // } catch (error) {
    //   showErrorMessage(error?.response?.data?.message);
    // }
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
        setTimeout(() => {
          navigate("/lms/dashboard");
        }, 3000);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  return (
    <Layout
      module={true}
      sidebarItems={NoticeSidebarItems}
      centerlogohide={true}
    >
      <ToastContainer />

      <Header
        dashboardLink={"/notice/dashboard"}
        addLink1={"/notice/addedit"}
        title1={location && location.state ? "Edit Leave" : "Add Leave"}
      />
      <CustomAlert
        showModal={showModal}
        handleClose={handleClose}
        handleOkClick={handleOkClick}
      />
      <div className="container-fluid">
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
                  <div class="col-4">
                    <div class="mb-3">
                      <label className="form-label">Select Member</label>
                      <Select
                        options={
                          Array.isArray(members) && members?.length > 0
                            ? members.map((item) => ({
                                value: item?.id,
                                label: `${item?.memberName} `,
                              }))
                            : []
                        }
                        onChange={(selectedOption) => {
                          formik.setFieldValue("member", selectedOption);

                          // formik.setFieldValue("fkTermId", "");
                          // formik.setFieldValue("parliamentaryYear", "");
                          // formik.setFieldValue("selectedSenator", "");
                          // formik.setFieldValue("selectedMNA", null);
                          // formik.setFieldValue("selectedMinistry", null);
                        }}
                        onBlur={formik.handleBlur}
                        value={formik.values.member}
                        id="member"
                        name="member"
                        isClearable={true}
                      />
                      {formik.touched.member && formik.errors.member && (
                        <div className="invalid-feedback">
                          {formik.errors.member}
                        </div>
                      )}

                      {/* <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                          checked={isChecked}
                          onChange={handleCheckboxChange}
                        />
                        <label class="form-check-label" for="flexCheckDefault">
                          Leave on behalf <span className="text-danger">*</span>
                        </label>
                      </div> */}
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="mb-3">
                      <label class="form-label">Session No</label>

                      <select
                        className={`form-select ${
                          formik.touched.sessionNumber &&
                          formik.errors.sessionNumber
                            ? "is-invalid"
                            : ""
                        }`}
                        placeholder="Session No"
                        value={formik.values.sessionNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="sessionNumber"
                        id="sessionNumber"
                      >
                        <option value={""} selected disabled hidden>
                          Select
                        </option>

                        {sessions &&
                          sessions.length > 0 &&
                          sessions.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item?.sessionName}
                            </option>
                          ))}
                      </select>
                      {formik.touched.sessionNumber &&
                        formik.errors.sessionNumber && (
                          <div class="invalid-feedback">
                            {formik.errors.sessionNumber}
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="mb-3" style={{ position: "relative" }}>
                      <label className="form-label">
                        Application Date <span className="text-danger">*</span>
                      </label>
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
                        selected={formik.values.startDate}
                        onChange={(date) =>
                          formik.setFieldValue("startDate", date)
                        }
                        onBlur={formik.handleBlur}
                        minDate={new Date()}
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

                  <div className="row">
                    <div className="col-4">
                      <div className="mb-3">
                        <label className="form-label">
                          Leave Type <span className="text-danger">*</span>
                        </label>
                        <select
                          className={`form-select ${
                            formik.touched.leaveType && formik.errors.leaveType
                              ? "is-invalid"
                              : ""
                          }`}
                          placeholder="Leave Forwarder"
                          value={formik.values.leaveType}
                          onChange={handleLeaveTypeChange}
                          onBlur={formik.handleBlur}
                          name="leaveType"
                        >
                          <option value="" selected disabled hidden>
                            Select
                          </option>
                          <option value="single">Single Day</option>
                          <option value="multiple">Multiple Days</option>
                          <option value="session">Whole Session</option>
                        </select>
                        {formik.touched.leaveType &&
                          formik.errors.leaveType && (
                            <div className="invalid-feedback">
                              {formik.errors.leaveType}
                            </div>
                          )}
                      </div>
                    </div>

                    {leaveType === "single" && (
                      <div className="col-4">
                        <div className="mb-3" style={{ position: "relative" }}>
                          <label className="form-label">
                            Start Date <span className="text-danger">*</span>
                          </label>
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
                            selected={formik.values.startDate}
                            onChange={(date) =>
                              formik.setFieldValue("startDate", date)
                            }
                            onBlur={formik.handleBlur}
                            minDate={new Date()}
                            className={`form-control ${
                              formik.touched.startDate &&
                              formik.errors.startDate
                                ? "is-invalid"
                                : ""
                            }`}
                          />
                          {formik.touched.startDate &&
                            formik.errors.startDate && (
                              <div className="invalid-feedback">
                                {formik.errors.startDate}
                              </div>
                            )}
                        </div>
                      </div>
                    )}

                    {leaveType === "multiple" && (
                      <>
                        <div className="col-4">
                          <div
                            className="mb-3"
                            style={{ position: "relative" }}
                          >
                            <label className="form-label">
                              Start Date <span className="text-danger">*</span>
                            </label>
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
                              selected={formik.values.startDate}
                              onChange={(date) =>
                                formik.setFieldValue("startDate", date)
                              }
                              onBlur={formik.handleBlur}
                              minDate={new Date()}
                              className={`form-control ${
                                formik.touched.startDate &&
                                formik.errors.startDate
                                  ? "is-invalid"
                                  : ""
                              }`}
                            />
                            {formik.touched.startDate &&
                              formik.errors.startDate && (
                                <div className="invalid-feedback">
                                  {formik.errors.startDate}
                                </div>
                              )}
                          </div>
                        </div>
                        <div className="col-4">
                          <div
                            className="mb-3"
                            style={{ position: "relative" }}
                          >
                            <label className="form-label">
                              End Date <span className="text-danger">*</span>
                            </label>
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
                              selected={formik.values.startDate}
                              onChange={(date) =>
                                formik.setFieldValue("startDate", date)
                              }
                              onBlur={formik.handleBlur}
                              minDate={new Date()}
                              className={`form-control ${
                                formik.touched.startDate &&
                                formik.errors.startDate
                                  ? "is-invalid"
                                  : ""
                              }`}
                            />
                            {formik.touched.startDate &&
                              formik.errors.startDate && (
                                <div className="invalid-feedback">
                                  {formik.errors.startDate}
                                </div>
                              )}
                          </div>
                        </div>
                      </>
                    )}

                    <div className="col-4">
                      <div class="mb-3">
                        <label class="form-label">
                          Subject <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder={"Subject"}
                          value={formik.values.subject}
                          className={`form-control ${
                            formik.touched.subject && formik.errors.subject
                              ? "is-invalid"
                              : ""
                          }`}
                          id="subject"
                          name="subject"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.subject && formik.errors.subject && (
                          <div className="invalid-feedback">
                            {formik.errors.subject}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="mb-3">
                        <label htmlFor="formFile" className="form-label">
                          Attachment <span className="text-danger">*</span>
                        </label>
                        <input
                          className="form-control"
                          type="file"
                          id="formFile"
                          name="attachment"
                          onChange={(event) => {
                            formik.setFieldValue(
                              "attachment",
                              event.currentTarget.files[0]
                            );
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">
                        Description <span className="text-danger">*</span>
                      </label>
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
                  {location.state?.id && (
                    <div class="col">
                      <div class="mb-3">
                        <label class="form-label">
                          Comment <span className="text-danger">*</span>
                        </label>
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
                        <div
                          className="d-flex flex-row p-3"
                          style={{
                            border: "#ddd solid 1px",
                            marginTop: "25px",
                          }}
                        >
                          <img
                            style={{
                              marginBottom: "30px",
                              marginRight: "15px",
                            }}
                            src={logoImage}
                            width="40"
                            height="40"
                            className="rounded-circle mr-3"
                            alt="logo"
                          />
                          <div className="w-100">
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="d-flex flex-row align-items-center">
                                <span className="mr-2">
                                  {item.commentedByName}
                                </span>
                                <small
                                  style={{ marginLeft: "8px" }}
                                  className="c-badge"
                                >
                                  Pending
                                </small>
                              </div>
                              <small>Mon, 07-18-2022 09:02 AM</small>
                            </div>
                            <p
                              className="text-justify comment-text mb-0"
                              style={{ marginTop: "7px" }}
                            >
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

export default AddEditLeaveRequests;
