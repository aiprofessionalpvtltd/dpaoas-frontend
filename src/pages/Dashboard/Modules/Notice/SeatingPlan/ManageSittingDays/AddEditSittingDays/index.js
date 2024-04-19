import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faMinusSquare,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { useFormik } from "formik";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import Header from "../../../../../../../components/Header";
import { Layout } from "../../../../../../../components/Layout";
import {
  NoticeSidebarItems,
  QMSSideBarItems,
} from "../../../../../../../utils/sideBarItems";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../../utils/ToastAlert";
import {
  createManageSession,
  getManageSessionById,
  getThreePreseidingMembers,
  updateManageSession,
} from "../../../../../../../api/APIs/Services/SeatingPlan.service";
import { ToastContainer } from "react-toastify";
import TimePicker from "react-time-picker";
import { AuthContext } from "../../../../../../../api/AuthContext";
import moment from "moment";

const validationSchema = Yup.object({
  fkSessionId: Yup.string().required("Session is required"),
  sittingDate: Yup.string().required("Sitting date is required"),
  startTime: Yup.string().required("Start time is required"),
  endTime: Yup.string().required("End time is required"),
  isAdjourned: Yup.boolean(),
});

function NMSAddEditSittingDaysForm() {
  const location = useLocation();
  const { members, sessions } = useContext(AuthContext);
  const [sessionId, setSessionId] = useState();
  const [formCount, setFormCount] = useState(0);
  const [breakformCount, setBreakFormCount] = useState(0);
  const [presidingMembers, setPresidingMember] = useState([]);

  const addForm = () => {
    setFormCount(formCount + 1);
    // setFormCount(formCount + 1);
  };

  const removeForm = (index) => {
    if (formCount > 0) {
      const newSessionMembers = [...formik.values.sessionMembers];
      newSessionMembers.splice(index, 1);
      formik.setFieldValue("sessionMembers", newSessionMembers);
      // setFormCount(formCount - 1);
      setFormCount(formCount - 1);
      //   formik.setFieldValue(`sessionMembers[${formCount - 1}].fkMemberId`, "");
      //   formik.setFieldValue(`sessionMembers[${formCount - 1}].startTime`, "");
      //   formik.setFieldValue(`sessionMembers[${formCount - 1}].endTime`, "");
    }
  };
  const updateSessionMembers = (index, fieldName, value) => {
    const newSessionMembers = [...formik.values.sessionMembers];
    if (!newSessionMembers[index]) {
      newSessionMembers[index] = {};
    }
    newSessionMembers[index][fieldName] = value;
    formik.setFieldValue("sessionMembers", newSessionMembers);
    // formik.setFieldValue(`sessionMembers[${index}].${fieldName}`, value);
  };

  const renderForms = () => {
    let sessionMembersForms = [];

    for (let i = 0; i < formCount; i++) {
      sessionMembersForms.push(
        <div
          key={i}
          style={{ background: "rgb(242, 242, 242)", padding: "20px" }}
        >
          <div className="row">
            <div className="col">
              {formCount > 0 && (
                <div className="ms-2" style={{ position: "relative" }}>
                  <FontAwesomeIcon
                    icon={faMinusSquare}
                    style={{
                      position: "absolute",
                      top: "-8px",
                      // left: "-50px",
                      right: "0px",
                      fontSize: "30px",
                      color: "#14ae5c",
                      color: "#ff0000",
                      cursor: "pointer",
                    }}
                    onClick={() => removeForm(i)}
                  />
                </div>
              )}
              <div className="mb-3 col-6">
                <label className="form-label">Member Name</label>
                <select
                  className={`form-select ${
                    formik.touched[`sessionMembers[${i}].fkMemberId`] &&
                    formik.errors[`sessionMembers[${i}].fkMemberId`]
                      ? "is-invalid"
                      : ""
                  }`}
                  value={formik.values.sessionMembers[i]?.fkMemberId || ""}
                  onChange={(e) =>
                    updateSessionMembers(i, "fkMemberId", e.target.value)
                  }
                >
                  <option value="" disabled hidden>
                    Select
                  </option>
                  {/* <option value="1">Test 1</option>
                  <option value="2">Test 2</option> */}
                  {presidingMembers &&
                    presidingMembers.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item?.memberName}
                      </option>
                    ))}
                </select>
                {formik.touched[`sessionMembers[${i}].fkMemberId`] &&
                  formik.errors[`sessionMembers[${i}].fkMemberId`] && (
                    <div className="invalid-feedback">
                      {formik.errors[`sessionMembers[${i}].fkMemberId`]}
                    </div>
                  )}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <div className="mb-3">
                <label className="form-label">Start Time</label>
                <TimePicker
                  value={formik.values.sessionMembers[i]?.startTime || ""}
                  clockIcon={null} // Disable clock view
                  openClockOnFocus={false}
                  // format="hh:mm a"
                  onChange={(time) =>
                    updateSessionMembers(
                      i,
                      "startTime",
                      time
                      // moment(time, "hh:mm a").format("hh:mm a")
                    )
                  }
                  // onChange={(time) =>

                  //   formik.setFieldValue(
                  //     "startTime",
                  //     moment(time, "hh:mm a").format("hh:mm a")
                  //   )
                  // }
                  className={`form-control`}
                />
              </div>
            </div>
            <div className="col-6">
              <div className="mb-3">
                <label className="form-label">End Time</label>
                <TimePicker
                  value={formik.values.sessionMembers[i]?.endTime || ""}
                  clockIcon={null} // Disable clock view
                  openClockOnFocus={false}
                  // format="hh:mm a"
                  onChange={(time) =>
                    updateSessionMembers(
                      i,

                      "endTime",
                      time
                      // moment(time, "hh:mm a").format("hh:mm a")
                    )
                  }
                  className={`form-control`}
                  // onChange={(time) =>
                  //   formik.setFieldValue(
                  //     "endTime",
                  //     moment(time, "hh:mm a").format("hh:mm a")
                  //   )
                  // }
                />
              </div>
            </div>
          </div>
        </div>
      );
    }

    return sessionMembersForms;
  };

  const addbreakFrom = () => {
    setBreakFormCount(breakformCount + 1);
    // setFormCount(formCount + 1);
  };
  const removeBreakForms = (index) => {
    if (breakformCount > 0) {
      const newSessionBreaks = [...formik.values.sessionBreaks];
      newSessionBreaks.splice(index, 1);
      formik.setFieldValue("sessionBreaks", newSessionBreaks);
      // setFormCount(formCount - 1);
      setBreakFormCount(breakformCount - 1);
      //   formik.setFieldValue(`sessionMembers[${formCount - 1}].fkMemberId`, "");
      //   formik.setFieldValue(`sessionMembers[${formCount - 1}].startTime`, "");
      //   formik.setFieldValue(`sessionMembers[${formCount - 1}].endTime`, "");
    }
  };
  const updateBreaksSession = (index, fieldName, value) => {
    const newBreaksSession = [...formik.values.sessionBreaks];
    if (!newBreaksSession[index]) {
      newBreaksSession[index] = {};
    }
    newBreaksSession[index][fieldName] = value;
    formik.setFieldValue("sessionBreaks", newBreaksSession);
    // formik.setFieldValue(`sessionMembers[${index}].${fieldName}`, value);
  };
  const renderBreakForms = () => {
    let breakForms = [];

    for (let i = 0; i < breakformCount; i++) {
      breakForms.push(
        <div
          key={i}
          style={{ background: "rgb(242, 242, 242)", padding: "20px" }}
        >
          <div className="row">
            <div className="col">
              {breakformCount > 0 && (
                <div className="ms-2" style={{ position: "relative" }}>
                  <FontAwesomeIcon
                    icon={faMinusSquare}
                    style={{
                      position: "absolute",
                      top: "-8px",
                      // left: "-50px",
                      right: "0px",
                      fontSize: "30px",
                      color: "#14ae5c",
                      color: "#ff0000",
                      cursor: "pointer",
                    }}
                    onClick={() => removeBreakForms(i)}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <div className="mb-3">
                <label className="form-label">Break Start Time</label>
                <TimePicker
                  value={formik.values.sessionBreaks[i]?.breakStartTime || ""}
                  clockIcon={null} // Disable clock view
                  openClockOnFocus={false}
                  // format="hh:mm a"
                  onChange={(time) =>
                    updateBreaksSession(
                      i,
                      "breakStartTime",
                      time
                      // moment(time, "hh:mm a").format("hh:mm a")
                    )
                  }
                  // onChange={(time) =>

                  //   formik.setFieldValue(
                  //     "startTime",
                  //     moment(time, "hh:mm a").format("hh:mm a")
                  //   )
                  // }
                  className={`form-control`}
                />
              </div>
            </div>
            <div className="col-6">
              <div className="mb-3">
                <label className="form-label">Break End Time</label>
                <TimePicker
                  value={formik.values.sessionBreaks[i]?.breakEndTime || ""}
                  clockIcon={null} // Disable clock view
                  openClockOnFocus={false}
                  // format="hh:mm a"
                  onChange={(time) =>
                    updateBreaksSession(
                      i,

                      "breakEndTime",
                      time
                      // moment(time, "hh:mm a").format("hh:mm a")
                    )
                  }
                  className={`form-control`}
                  // onChange={(time) =>
                  //   formik.setFieldValue(
                  //     "endTime",
                  //     moment(time, "hh:mm a").format("hh:mm a")
                  //   )
                  // }
                />
              </div>
            </div>
          </div>
        </div>
      );
    }

    return breakForms;
  };

  const formik = useFormik({
    initialValues: {
      fkSessionId: "",
      sittingDate: "",
      sittingStartTime: "",
      sittingEndTime: "",
      privateMemberDay: false,
      committeeWhole: false,
      isAdjourned: false,
      isProrogued: false,

      committeeStartTime: "",
      committeeEndTime: "",
      sessionMembers: [
        {
          fkMemberId: "",
          startTime: "",
          endTime: "",
        },
      ],
      sessionBreaks: [
        {
          breakStartTime: "",
          breakEndTime: "",
        },
      ],
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      if (location?.state) {
        handleEditSittingDays(values);
      } else {
        console.log("values", values);
        handleCreateSittingDays(values);
      }
    },
  });

  // Getting Presiding Member Records
  const getPresidingMembers = async () => {
    try {
      const response = await getThreePreseidingMembers();
      if (response?.success) {
        setPresidingMember(response?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPresidingMembers();
  }, []);

  const handleCreateSittingDays = async (values) => {
    const data = {
      fkSessionId: parseInt(values.fkSessionId),
      sittingDate: values?.sittingDate,
      sittingStartTime: moment(values?.sittingStartTime, "hh:mm A").format(
        "hh:mm A"
      ),
      sittingEndTime: moment(values?.sittingEndTime, "hh:mm A").format(
        "hh:mm A"
      ),
      committeeStartTime: moment(values?.committeeStartTime, "hh:mm A").format(
        "hh:mm A"
      ),
      committeeEndTime: moment(values?.committeeEndTime, "hh:mm A").format(
        "hh:mm A"
      ),
      sessionMembers: values?.sessionMembers,
      // sessionMembers: values.sessionMembers.map((member) => ({
      //   fkMemberId: member.fkMemberId,
      //   startTime: member.startTime,
      //   endTime: member.endTime,
      // })),

      sessionMembers:
        formCount === 0
          ? []
          : values.sessionMembers.map((member) => ({
              fkMemberId: member.fkMemberId,
              startTime: moment(member?.startTime, "hh:mm A").format("hh:mm A"),
              endTime: moment(member?.endTime, "hh:mm A").format("hh:mm A"),
            })),
      sessionBreaks:
        breakformCount === 0
          ? []
          : values.sessionBreaks.map((item) => ({
              breakStartTime: moment(item.breakStartTime, "hh:mm A").format(
                "hh:mm A"
              ),
              breakEndTime: moment(item.breakEndTime, "hh:mm A").format(
                "hh:mm A"
              ),
            })),

      committeeWhole: values.committeeWhole,
      sessionAdjourned: values.isAdjourned,
      privateMemberDay: values?.privateMemberDay,
      sessionProrogued: values?.isProrogued,
    };

    console.log("Data Going Format", data);
    try {
      const response = await createManageSession(data);
      if (response?.success) {
        showSuccessMessage(response?.message);
      }
    } catch (error) {
      console.log(error);
      console.log(error?.response?.data?.message);
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const handleEditSittingDays = async (values) => {
    const data = {
      // fkSessionId: values.fkSessionId,
      // sittingDate: values.sittingDate,
      // sittingStartTime: values.sittingStartTime,
      // sittingEndTime: values.sittingEndTime,
      // sessionAdjourned: values.isAdjourned,
      fkSessionId: parseInt(values?.fkSessionId),
      sittingDate: values?.sittingDate,
      sittingStartTime: moment(values?.sittingStartTime, "hh:mm A").format(
        "hh:mm A"
      ),
      sittingEndTime: moment(values?.sittingEndTime, "hh:mm A").format(
        "hh:mm A"
      ),
      breakStartTime: moment(values?.breakStartTime, "hh:mm A").format(
        "hh:mm A"
      ),
      breakEndTime: moment(values?.breakEndTime, "hh:mm A").format("hh:mm A"),
      committeeStartTime: moment(values?.committeeStartTime, "hh:mm A").format(
        "hh:mm A"
      ),
      committeeEndTime: moment(values.committeeEndTime, "hh:mm A").format(
        "hh:mm A"
      ),
      sessionMembers: values.sessionMembers,
      // sessionMembers: values.sessionMembers.map((member) => ({
      //   fkMemberId: member.fkMemberId,
      //   startTime: member.startTime,
      //   endTime: member.endTime,
      // })),
      sessionMembers:
        formCount === 0
          ? []
          : values.sessionMembers.map((member) => ({
              fkMemberId: member.fkMemberId,
              startTime: moment(member.startTime, "hh:mm A").format("hh:mm A"),
              endTime: moment(member.endTime, "hh:mm A").format("hh:mm A"),
            })),
      sessionBreaks:
        breakformCount === 0
          ? []
          : values.sessionBreaks.map((item) => ({
              breakStartTime: moment(item.breakStartTime, "hh:mm A").format(
                "hh:mm A"
              ),
              breakEndTime: moment(item.breakEndTime, "hh:mm A").format(
                "hh:mm A"
              ),
            })),

      committeeWhole: values.committeeWhole,
      sessionAdjourned: values.isAdjourned,
    };

    try {
      const response = await updateManageSession(location?.state?.id, data);
      if (response?.success) {
        showSuccessMessage(response?.message);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

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
  }, []);

  useEffect(() => {
    // Update form values when termsById changes
    console.log(sessionId);
    if (sessionId) {
      formik.setValues({
        fkSessionId: sessionId.fkSessionId || "",
        sittingDate: new Date(sessionId.sittingDate) || "",

        sittingStartTime: sessionId.sittingStartTime || "",
        sittingEndTime: sessionId.sittingEndTime || "",
        committeeStartTime: sessionId.committeeStartTime || "",
        committeeEndTime: sessionId.committeeEndTime || "",
        isAdjourned: sessionId.sessionAdjourned || false,
        committeeWhole: sessionId.committeeWhole || false,
        sessionMembers:
          sessionId.sessionMembers.map((member) => ({
            fkMemberId: member.fkMemberId,
            startTime: member.startTime,
            endTime: member.endTime,
          })) || [],
        sessionBreaks:
          sessionId.sessionBreaks.map((item) => ({
            breakStartTime: item.breakStartTime,
            breakEndTime: item.breakEndTime,
          })) || [],
      });
      setFormCount(sessionId.sessionMembers?.length || 0);
      setBreakFormCount(sessionId.sessionBreaks?.length || 0);
    }
  }, [sessionId, formik.setValues]);

  return (
    <Layout
      module={true}
      sidebarItems={NoticeSidebarItems}
      centerlogohide={true}
    >
      <Header
        dashboardLink={"/notice/dashboard"}
        addLink1={"/notice/manage/manage-session-days"}
        title1={"Sitting Days"}
        addLink2={"/notice/manage/manage-session-days/addedit"}
        title2={
          location && location?.state ? "Edit Sitting Days" : "Add Sitting Days"
        }
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
                      <label class="form-label">Session Number</label>
                      {/* <input
                        type="text"
                        placeholder={"Session ID"}
                        value={formik.values.fkSessionId}
                        className={`form-control ${
                          formik.touched.fkSessionId &&
                          formik.errors.fkSessionId
                            ? "is-invalid"
                            : ""
                        }`}
                        id="fkSessionId"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      /> */}
                      {/* <select
                        class={`form-select ${
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
                        <option value="" selected disabled hidden>
                          Select
                        </option>
                        {sessions && sessions?.length > 0 && (
                          <option value={sessions.map((item) => item?.id)}>
                            {sessions.map((item) => item?.sessionName)}
                          </option>
                        )}
                      </select>
                      {formik.touched.fkSessionId &&
                        formik.errors.fkSessionId && (
                          <div className="invalid-feedback">
                            {formik.errors.fkSessionId}
                          </div>
                        )} */}
                      <select
                        class={`form-select ${
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
                        <option value="" selected disabled hidden>
                          Select
                        </option>
                        {sessions &&
                          sessions.length > 0 &&
                          sessions.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.sessionName}
                            </option>
                          ))}
                        ;
                      </select>
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
                          formik.touched.sittingDate &&
                          formik.errors.sittingDate
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {formik.touched.sittingDate &&
                        formik.errors.sittingDate && (
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
                      <label class="form-label">Sitting Start Time</label>
                      {/* <input
                        type="text"
                        placeholder={"Session ID"}
                        value={formik.values.startTime}
                        className={`form-control ${
                          formik.touched.startTime && formik.errors.startTime
                            ? "is-invalid"
                            : ""
                        }`}
                        id="startTime"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      /> */}
                      <TimePicker
                        value={formik.values.sittingStartTime}
                        clockIcon={null} // Disable clock view
                        openClockOnFocus={false}
                        // format="hh:mm a"
                        // onChange={(time) =>
                        //   formik.setFieldValue("sittingStartTime", time)
                        // }
                        onChange={(time) =>
                          formik.setFieldValue(
                            "sittingStartTime",
                            time
                            // moment(time, "hh:mm a").format("hh:mm a")
                          )
                        }
                        className={`form-control`}
                      />
                      {formik.touched.sittingStartTime &&
                        formik.errors.sittingStartTime && (
                          <div className="invalid-feedback">
                            {formik.errors.sittingStartTime}
                          </div>
                        )}
                    </div>
                  </div>

                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Sitting End Time</label>
                      {/* <input
                        type="text"
                        placeholder={"Session ID"}
                        value={formik.values.endTime}
                        className={`form-control ${
                          formik.touched.endTime && formik.errors.endTime
                            ? "is-invalid"
                            : ""
                        }`}
                        id="endTime"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      /> */}
                      <TimePicker
                        value={formik.values.sittingEndTime}
                        clockIcon={null} // Disable clock view
                        openClockOnFocus={false}
                        // format="hh:mm a"
                        // onChange={(time) =>
                        //   formik.setFieldValue("sittingEndTime", time)
                        // }
                        onChange={(time) =>
                          formik.setFieldValue(
                            "sittingEndTime",
                            time
                            // moment(time, "hh:mm a").format("hh:mm a")
                          )
                        }
                        className={`form-control`}
                      />
                      {formik.touched.sittingEndTime &&
                        formik.errors.sittingEndTime && (
                          <div className="invalid-feedback">
                            {formik.errors.sittingEndTime}
                          </div>
                        )}
                    </div>
                  </div>
                </div>

                {/* <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Break Start Time</label>

                      <TimePicker
                        value={formik.values.breakStartTime}
                        clockIcon={null} // Disable clock view
                        openClockOnFocus={false}
                        format="hh:mm a"
                        // onChange={(time) =>
                        //   formik.setFieldValue("breakStartTime", time)
                        // }
                        onChange={(time) =>
                          formik.setFieldValue(
                            "breakStartTime",
                            time
                            // moment(time, "hh:mm a").format("hh:mm a")
                          )
                        }
                        className={`form-control`}
                      />
                      {formik.touched.breakStartTime &&
                        formik.errors.breakStartTime && (
                          <div className="invalid-feedback">
                            {formik.errors.breakStartTime}
                          </div>
                        )}
                    </div>
                  </div>

                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Break End Time</label>
                      <TimePicker
                        value={formik.values.breakEndTime}
                        clockIcon={null} // Disable clock view
                        openClockOnFocus={false}
                        format="hh:mm a"
                        // onChange={(time) =>
                        //   formik.setFieldValue("breakEndTime", time)
                        // }
                        onChange={(time) =>
                          formik.setFieldValue(
                            "breakEndTime",
                            time
                            // moment(time, "hh:mm a").format("hh:mm a")
                          )
                        }
                        className={`form-control`}
                      />
                      {formik.touched.breakEndTime &&
                        formik.errors.breakEndTime && (
                          <div className="invalid-feedback">
                            {formik.errors.breakEndTime}
                          </div>
                        )}
                    </div>
                  </div>
                </div> */}
                <div className="row">
                  <div className="col-6 ">
                    <div className="mb-3 mt-4">
                      <label className="form-label">
                        Add Session Break Times
                      </label>
                    </div>
                  </div>
                  <div className="ms-2" style={{ position: "relative" }}>
                    <FontAwesomeIcon
                      icon={faPlusSquare}
                      style={{
                        position: "absolute",
                        top: "-55px",
                        // left: "90px",
                        right: "60px",
                        fontSize: "41px",
                        color: "#14ae5c",
                        cursor: "pointer",
                      }}
                      onClick={addbreakFrom}
                    />
                  </div>
                </div>
                {renderBreakForms()}
                <div class="row">
                  <div class="col-3">
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
                              !formik.values.isAdjourned
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
                  <div class="col-3">
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
                          checked={formik.values.isProrogued}
                          onChange={() =>
                            formik.setFieldValue(
                              "isProrogued",
                              !formik.values.isProrogued
                            )
                          }
                        />
                        <label class="form-check-label" for="flexCheckDefault">
                          Is Session Prorogued
                        </label>
                        {formik.touched.isProrogued &&
                          formik.errors.isProrogued && (
                            <div className="invalid-feedback">
                              {formik.errors.isProrogued}
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                  <div class="col-3">
                    <div class="mb-3">
                      <div class="form-check">
                        <input
                          class={`form-check-input ${
                            formik.touched.privateMemberDay &&
                            formik.errors.privateMemberDay
                              ? "is-invalid"
                              : ""
                          }`}
                          type="checkbox"
                          id="flexCheckDefault"
                          checked={formik.values.privateMemberDay}
                          onChange={() =>
                            formik.setFieldValue(
                              "privateMemberDay",
                              !formik.values.privateMemberDay
                            )
                          }
                        />
                        <label class="form-check-label" for="flexCheckDefault">
                          Is Private Member Day
                        </label>
                        {formik.touched.privateMemberDay &&
                          formik.errors.privateMemberDay && (
                            <div className="invalid-feedback">
                              {formik.errors.privateMemberDay}
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                  <div class="col-3">
                    <div class="mb-3">
                      <div class="form-check">
                        <input
                          class={`form-check-input ${
                            formik.touched.committeeWhole &&
                            formik.errors.committeeWhole
                              ? "is-invalid"
                              : ""
                          }`}
                          type="checkbox"
                          id="committeeWhole"
                          checked={formik.values.committeeWhole}
                          onChange={() =>
                            formik.setFieldValue(
                              "committeeWhole",
                              !formik.values.committeeWhole
                            )
                          }
                        />
                        <label class="form-check-label" for="flexCheckDefault">
                          Committee As Whole
                        </label>
                        {formik.touched.committeeWhole &&
                          formik.errors.committeeWhole && (
                            <div className="invalid-feedback">
                              {formik.errors.committeeWhole}
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
                {formik.values.committeeWhole && (
                  <div class="row">
                    <div class="col">
                      <div class="mb-3">
                        <label class="form-label">Committee Start Time</label>

                        <TimePicker
                          value={formik.values.committeeStartTime}
                          clockIcon={null} // Disable clock view
                          openClockOnFocus={false}
                          format="hh:mm a"
                          // onChange={(time) =>
                          //   formik.setFieldValue("CommitteeStartTime", time)
                          // }
                          onChange={(time) =>
                            formik.setFieldValue(
                              "committeeStartTime",
                              time
                              // moment(time, "hh:mm a").format("hh:mm a")
                            )
                          }
                          className={`form-control`}
                        />
                        {formik.touched.committeeStartTime &&
                          formik.errors.committeeStartTime && (
                            <div className="invalid-feedback">
                              {formik.errors.committeeStartTime}
                            </div>
                          )}
                      </div>
                    </div>

                    <div class="col">
                      <div class="mb-3">
                        <label class="form-label">Committee End Time</label>
                        <TimePicker
                          value={formik.values.committeeEndTime}
                          clockIcon={null} // Disable clock view
                          openClockOnFocus={false}
                          format="hh:mm a"
                          // onChange={(time) =>
                          //   formik.setFieldValue("CommitteeEndTime", time)
                          // }
                          onChange={(time) =>
                            formik.setFieldValue(
                              "committeeEndTime",
                              time
                              // moment(time, "hh:mm a").format("hh:mm a")
                            )
                          }
                          className={`form-control`}
                        />
                        {formik.touched.committeeEndTime &&
                          formik.errors.committeeEndTime && (
                            <div className="invalid-feedback">
                              {formik.errors.committeeEndTime}
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                )}
                <div className="row">
                  <div className="col-6 ">
                    <div className="mb-3 mt-4">
                      <label className="form-label">
                        Add Session Presiding Members
                      </label>
                    </div>
                  </div>
                  <div className="ms-2" style={{ position: "relative" }}>
                    <FontAwesomeIcon
                      icon={faPlusSquare}
                      style={{
                        position: "absolute",
                        top: "-55px",
                        // left: "90px",
                        right: "60px",
                        fontSize: "41px",
                        color: "#14ae5c",
                        cursor: "pointer",
                      }}
                      onClick={addForm}
                    />
                  </div>
                </div>

                {/* <div style={{ background: "rgb(242, 242, 242)", padding: "20px" }}> */}
                {renderForms()}
                {/* </div> */}
                <div className="row">
                  <div className="col">
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

export default NMSAddEditSittingDaysForm;
