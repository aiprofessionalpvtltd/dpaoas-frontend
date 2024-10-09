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
import { getUserData } from "../../../../../../api/Auth";
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
  const userData = getUserData();
  console.log("userData", userData);

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
    fkMemberId: "",
    fkSessionId: "",
    leaveType: "",
    applicationSubmittedDate: "",
    leave_oneday: "",
    requestStartDate: "",
    requestEndDate: "",
    subject: "",
    requestLeaveAttachment: null,
    description: "",
    comments: "",
    requestStatus: "",

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
    // requestLeaveAttachment: null,
  };

  const formik = useFormik({
    initialValues: initialValues,
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      handleShow();
      setFormValues(values);
    },
  });

  const handleCheckboxChange = () => {
    setChecked(!isChecked);
  };

  const handleLeaveTypeChange = (e) => {
    setLeaveType(e.target.value);

    formik.handleChange(e);
    if (e.target.value === "single") {
      formik.setFieldValue("requestStartDate", "");
      formik.setFieldValue("requestEndDate", "");
    } else if (e.target.value === "multiple") {
      formik.setFieldValue("singleDate", "");
    } else if (e.target.value === "session") {
      formik.setFieldValue("requestStartDate", "");
      formik.setFieldValue("requestEndDate", "");
      formik.setFieldValue("singleDate", "");
    }
  };

  const getLeaveByIdApi = async () => {
    try {
      const response = await getLeaveById(location?.state?.id);
      console.log("response", response);
      if (response?.success) {
        // showSuccessMessage(response?.message);
        setLeaveByIdData(response?.data[0]);
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
    if (location?.state?.id) {
      getLeaveByIdApi();
    }
  }, []);

  useEffect(() => {
    setLeaveType(formik.values.leaveType);
  }, [formik.values.leaveType]);

  useEffect(() => {
    if (sessions && sessions.length > 0) {
      const currentSessionId = sessions[0]?.id; // Assuming the first session is the current one
      formik.setFieldValue("fkSessionId", currentSessionId);
    }
  }, [sessions]);

  useEffect(() => {
    if (leaveByIdData) {
      // Determine leaveType based on the data
      let leaveTypeValue = "";

      // Prioritize single-day leave
      if (leaveByIdData?.leave_oneday) {
        leaveTypeValue = "single"; // Single-day leave
      }
      // Check for multiple-day leave only if both start and end dates are provided
      else if (
        leaveByIdData?.requestStartDate &&
        leaveByIdData?.requestEndDate
      ) {
        leaveTypeValue = "multiple"; // Multiple-day leave
      }
      // If no relevant leave data is found, default to session leave
      else {
        leaveTypeValue = "session"; // Session leave
      }
      console.log("leaveData", leaveByIdData?.member?.id);
      if (location?.state?.id) {
        formik.setValues({
          fkMemberId: leaveByIdData?.member?.id
            ? {
                value: leaveByIdData?.member?.id,
                label: leaveByIdData?.member?.name,
              }
            : { value: 968, label: "Manzoor Ahmed" },
          fkSessionId:
            (leaveByIdData?.session && leaveByIdData?.session?.id) || 8,
          applicationSubmittedDate: leaveByIdData?.applicationDate
            ? moment(leaveByIdData?.applicationDate).toDate()
            : "",
          leave_oneday: leaveByIdData?.leave_oneday
            ? moment(leaveByIdData?.leave_oneday).toDate()
            : "",
          requestStartDate: leaveByIdData?.requestStartDate
            ? moment(leaveByIdData?.requestStartDate).toDate()
            : "",
          requestEndDate: leaveByIdData?.requestEndDate
            ? moment(leaveByIdData?.requestEndDate).toDate()
            : "",
          subject: leaveByIdData?.subject || "",
          description: leaveByIdData?.requestLeaveReason || "",
          leaveType: leaveTypeValue, // Automatically set leaveType based on logic
          requestStatus: leaveByIdData?.requestStatus,
        });
      }
    }
  }, [leaveByIdData]);

  const CreateLeaveApi = async (values) => {
    console.log(
      "sessionID 1",
      values?.fkSessionId || (sessions && sessions[0]?.id)
    );

    const formatDate = (date) => {
      if (date) {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = `0${d.getMonth() + 1}`.slice(-2); // Adding leading 0 for months
        const day = `0${d.getDate()}`.slice(-2); // Adding leading 0 for days
        return `${year}-${month}-${day}`; // Format as YYYY-MM-DD
      }
      return "";
    };

    const formattedApplicaSubmittedDate = formatDate(
      values?.applicationSubmittedDate
    );
    const formattedLeaveOneDay = formatDate(values?.leave_oneday);
    const formattedStartDate = formatDate(values?.requestStartDate);
    const formattedEndDate = formatDate(values?.requestEndDate);

    const formData = new FormData();

    if (userData && userData?.id) {
      formData.append("fkUserId", userData?.id);
    }

    // Only append if the value exists
    if (values.fkMemberId?.value) {
      formData.append("fkMemberId", values?.fkMemberId?.value);
    }
    console.log("sessionID 1", values?.fkSessionId);

    formData.append(
      "fkSessionId",
      values?.fkSessionId || (sessions && sessions[0]?.id)
    );
    console.log("sessionID 2", values?.fkSessionId);

    if (formattedApplicaSubmittedDate) {
      formData.append("applicationDate", formattedApplicaSubmittedDate);
    }

    if (values?.subject) {
      formData.append("subject", values?.subject);
    }

    if (leaveType === "single" && formattedLeaveOneDay) {
      formData.append("leave_oneday", formattedLeaveOneDay);
    }

    if (formattedStartDate) {
      formData.append("requestStartDate", formattedStartDate);
    }

    if (formattedEndDate) {
      formData.append("requestEndDate", formattedEndDate);
    }

    if (values?.description) {
      formData.append("requestLeaveReason", values?.description);
    }

    if (values?.comments) {
      formData.append("comments", values?.comments);
    }

    if (values?.requestLeaveAttachment) {
      formData.append("file", values?.requestLeaveAttachment);
    }

    formData.append("device", "Web");

    // For debugging: Log the formData as an object
    let formDataObject = {};
    for (let [key, value] of formData.entries()) {
      formDataObject[key] = value;
    }
    console.log("");
    console.log("Created Leave Request", formDataObject);

    try {
      const response = await createLeave(formData);
      if (response?.success) {
        showSuccessMessage(response?.message);
        setTimeout(() => {
          navigate("/notice/leaveRequests");
        }, 3000);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const UpdateLeaveApi = async (values) => {
    const formatDate = (date) => {
      if (date) {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = `0${d.getMonth() + 1}`.slice(-2); // Adding leading 0 for months
        const day = `0${d.getDate()}`.slice(-2); // Adding leading 0 for days
        return `${year}-${month}-${day}`; // Format as YYYY-MM-DD
      }
      return "";
    };

    const formattedApplicaSubmittedDate = formatDate(
      values?.applicationSubmittedDate
    );
    const formattedLeaveOneDay = formatDate(values?.leave_oneday);
    const formattedStartDate = formatDate(values?.requestStartDate);
    const formattedEndDate = formatDate(values?.requestEndDate);

    const formData = new FormData();

    if (userData && userData?.id) {
      formData.append("fkUserId", userData?.id);
    }

    // Only append if the value exists
    if (values.fkMemberId?.value) {
      formData.append("fkMemberId", values?.fkMemberId?.value);
    }
    console.log("sessionID 1", values?.fkSessionId);

    formData.append("fkSessionId", values?.fkSessionId);
    console.log("sessionID 2", values?.fkSessionId);

    if (formattedApplicaSubmittedDate) {
      formData.append("applicationDate", formattedApplicaSubmittedDate);
    }

    if (values?.subject) {
      formData.append("subject", values?.subject);
    }

    if (leaveType === "single" && formattedLeaveOneDay) {
      formData.append("leave_oneday", formattedLeaveOneDay);
    }

    if (formattedStartDate) {
      formData.append("requestStartDate", formattedStartDate);
    }

    if (formattedEndDate) {
      formData.append("requestEndDate", formattedEndDate);
    }

    if (values?.description) {
      formData.append("requestLeaveReason", values?.description);
    }

    if (values?.comments) {
      formData.append("comments", values?.comments);
    }

    if (values?.requestLeaveAttachment) {
      formData.append("file", values?.requestLeaveAttachment);
    }

    formData.append("requestStatus", values?.requestStatus);

    try {
      const response = await UpdateLeaveById(location?.state?.id, formData);
      if (response?.success) {
        showSuccessMessage(response?.message);
        setTimeout(() => {
          navigate("/notice/leaveRequests");
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
                          formik.setFieldValue("fkMemberId", selectedOption);

                          // formik.setFieldValue("fkTermId", "");
                          // formik.setFieldValue("parliamentaryYear", "");
                          // formik.setFieldValue("selectedSenator", "");
                          // formik.setFieldValue("selectedMNA", null);
                          // formik.setFieldValue("selectedMinistry", null);
                        }}
                        onBlur={formik.handleBlur}
                        value={formik.values.fkMemberId}
                        id="fkMemberId"
                        name="fkMemberId"
                        isClearable={true}
                      />
                      {formik.touched.fkMemberId &&
                        formik.errors.fkMemberId && (
                          <div className="invalid-feedback">
                            {formik.errors.fkMemberId}
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
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Session No</label>
                      <select
                        className={`form-select ${
                          formik.touched.fkSessionId &&
                          formik.errors.fkSessionId
                            ? "is-invalid"
                            : ""
                        }`}
                        // placeholder="Session No"
                        value={formik.values.fkSessionId}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="fkSessionId"
                      >
                        {/* <option value="" selected disabled hidden>
                          Select
                        </option> */}
                        {sessions &&
                          sessions.length > 0 &&
                          sessions.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.sessionName}
                            </option>
                          ))}
                      </select>
                      {formik.touched.fkSessionId &&
                        formik.errors.fkSessionId && (
                          <div className="invalid-feedback">
                            {formik.errors.fkSessionId}
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
                        selected={formik.values.applicationSubmittedDate}
                        onChange={(date) =>
                          formik.setFieldValue("applicationSubmittedDate", date)
                        }
                        onBlur={formik.handleBlur}
                        minDate={new Date()}
                        className={`form-control ${
                          formik.touched.applicationSubmittedDate &&
                          formik.errors.applicationSubmittedDate
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {formik.touched.applicationSubmittedDate &&
                        formik.errors.applicationSubmittedDate && (
                          <div className="invalid-feedback">
                            {formik.errors.applicationSubmittedDate}
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
                            Single Date <span className="text-danger">*</span>
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
                            selected={formik.values.leave_oneday}
                            onChange={(date) =>
                              formik.setFieldValue("leave_oneday", date)
                            }
                            onBlur={formik.handleBlur}
                            minDate={new Date()}
                            className={`form-control ${
                              formik.touched.leave_oneday &&
                              formik.errors.leave_oneday
                                ? "is-invalid"
                                : ""
                            }`}
                          />
                          {formik.touched.leave_oneday &&
                            formik.errors.leave_oneday && (
                              <div className="invalid-feedback">
                                {formik.errors.leave_oneday}
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
                              selected={formik.values.requestStartDate}
                              onChange={(date) =>
                                formik.setFieldValue("requestStartDate", date)
                              }
                              onBlur={formik.handleBlur}
                              minDate={new Date()}
                              className={`form-control ${
                                formik.touched.requestStartDate &&
                                formik.errors.requestStartDate
                                  ? "is-invalid"
                                  : ""
                              }`}
                            />
                            {formik.touched.requestStartDate &&
                              formik.errors.requestStartDate && (
                                <div className="invalid-feedback">
                                  {formik.errors.requestStartDate}
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
                              selected={formik.values.requestEndDate}
                              onChange={(date) =>
                                formik.setFieldValue("requestEndDate", date)
                              }
                              onBlur={formik.handleBlur}
                              minDate={new Date()}
                              className={`form-control ${
                                formik.touched.requestEndDate &&
                                formik.errors.requestEndDate
                                  ? "is-invalid"
                                  : ""
                              }`}
                            />
                            {formik.touched.requestEndDate &&
                              formik.errors.requestEndDate && (
                                <div className="invalid-feedback">
                                  {formik.errors.requestEndDate}
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
                          Attachement
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          className="form-control"
                          type="file"
                          id="formFile"
                          name="requestLeaveAttachment"
                          onChange={(event) => {
                            formik.setFieldValue(
                              "requestLeaveAttachment",
                              event.currentTarget.files[0]
                            );
                          }}
                        />
                      </div>
                    </div>
                    {location?.state?.id && (
                      <div className="col-3">
                        <div className="mb-3">
                          <label htmlFor="formFile" className="form-label">
                            Status <span className="text-danger">*</span>
                          </label>
                          <select
                            className={`form-select ${
                              formik.touched.status &&
                              formik.errors.requestStatus
                                ? "is-invalid"
                                : ""
                            }`}
                            value={formik.values.requestStatus}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name="requestStatus"
                            id="requestStatus"
                          >
                            <option value="" selected disabled hidden>
                              Select
                            </option>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="disapproved">DisApproved</option>
                            <option value="marked">Marked</option>
                          </select>
                        </div>
                      </div>
                    )}
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
                        placeholder={formik.values.description}
                        className={`form-control ${
                          formik.touched.description &&
                          formik.errors.description
                            ? "is-invalid"
                            : ""
                        }`}
                        id="description"
                        name="description"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.description}
                      ></textarea>
                      {formik.touched.description &&
                        formik.errors.description && (
                          <div className="invalid-feedback">
                            {formik.errors.description}
                          </div>
                        )}
                    </div>
                  </div>
                </div>
                {/* <div class="row">
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
                </div> */}
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
