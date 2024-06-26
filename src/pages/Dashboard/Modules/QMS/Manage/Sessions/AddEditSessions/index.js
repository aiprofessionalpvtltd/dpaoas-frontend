import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import Header from "../../../../../../../components/Header";
import { Layout } from "../../../../../../../components/Layout";
import { LegislationSideBarItems, QMSSideBarItems } from "../../../../../../../utils/sideBarItems";
import TimePicker from "react-time-picker";
import {
  createSession,
  getSessionByID,
  updateSessions,
} from "../../../../../../../api/APIs/Services/ManageQMS.service";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "../../../../../../../api/AuthContext";
import Select from "react-select";
const validationSchema = Yup.object({
  sessionNo: Yup.string().required("Sesison no is required"),
  CalledBy: Yup.string().required("Session called by is required"),
  startDate: Yup.date().required("Start Date is required"),
  endDate: Yup.date().required("End Date is required"),
  legislationDiaryNo: Yup.string().required(
    "Legislation Diary Number is required"
  ),
  legislationDiaryDate: Yup.date().required(
    "Legislation Diary Date is required"
  ),
  businessStatus: Yup.object().required("Business Status is required"),
  businessSession: Yup.string().required("Business Session is required"),
  parliamentaryYear: Yup.string().required("Parliamentary Year is required"),
  // jointSessionPurpose: Yup.string().required("Parliamentary Year is required"),
});
function QMSAddEditSessionsForm() {
  const location = useLocation();
  const [sessionByIdData, setSessionByIdData] = useState();
  const { sessions, parliamentaryYear } = useContext(AuthContext);
  const formik = useFormik({
    initialValues: {
      sessionNo: "",
      CalledBy: "",
      isJoint: false,
      startDate: "",
      endDate: "",
      legislationDiaryNo: "",
      legislationDiaryDate: "",
      businessStatus: "",
      businessSessions: [],
      parliamentaryYear: "",
      isAdjourned: false,
      summonDate: "",
      summonTime: "",
      jointSessionPurpose: "",
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      console.log(values);
      if (location.state) {
        UpdateSessionsApi(values);
      } else {
        CreateSessionsApi(values);
      }
    },
  });

  const CreateSessionsApi = async (values) => {
    const data = {
      sessionName: Number(values?.sessionNo),
      calledBy: values.CalledBy,
      isJointSession: values.isJoint ? Boolean(values.isJoint) : false,
      startDate: values.startDate,
      endDate: values.endDate,
      legislationDiaryNo: values.legislationDiaryNo,
      legislationDiaryDate: values.legislationDiaryDate,
      businessStatus: values.businessStatus,

      fkParliamentaryYearId: Number(values.parliamentaryYear?.value),
      isQuoraumAdjourned: Boolean(values.isAdjourned),
      summonNoticeDate: values.summonDate,
      summonNoticeTime: values.summonTime,
      jointSessionPurpose: values.jointSessionPurpose,
      businessSessions: values?.businessSessions
        ? values.businessSessions.map((session) => session.value)
        : [],
    };
    console.log("object", data);
    try {
      const response = await createSession(data);
      if (response.success) {
        showSuccessMessage(response.message);
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  };

  const UpdateSessionsApi = async (values) => {
    const data = {
      sessionName: Number(values?.sessionNo),
      calledBy: values?.CalledBy,
      isJointSession: values?.isJoint ? Boolean(values?.isJoint) : false,
      startDate: values?.startDate,
      endDate: values?.endDate,
      legislationDiaryNo: values?.legislationDiaryNo,
      legislationDiaryDate: values?.legislationDiaryDate,
      businessStatus: values?.businessStatus,
      businessSessions: values?.businessSessions
        ? values.businessSessions.map((session) => session.value)
        : [],
      fkParliamentaryYearId: Number(values?.parliamentaryYear?.value),
      isQuoraumAdjourned: Boolean(values?.isAdjourned),
      summonNoticeDate: values?.summonDate,
      summonNoticeTime: values?.summonTime,
      jointSessionPurpose: values?.jointSessionPurpose,
    };
    try {
      const response = await updateSessions(location.state.id, data);
      if (response.success) {
        showSuccessMessage(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getSessionByIdApi = async () => {
    try {
      const response = await getSessionByID(location.state?.id);
      if (response?.success) {
        setSessionByIdData(response?.data);
      }
    } catch (error) {
      // showErrorMessage(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (location.state?.id) {
      getSessionByIdApi();
    }
  }, []);

  useEffect(() => {
    // Update form values when termsById changes
    if (sessionByIdData) {
      formik.setValues({
        sessionNo: Number(sessionByIdData.sessionName) || "",
        CalledBy: sessionByIdData.calledBy || "",
        isJoint: sessionByIdData.isJointSession || "",
        startDate: new Date(sessionByIdData.startDate) || "",
        endDate: new Date(sessionByIdData.endDate) || "",
        legislationDiaryNo: sessionByIdData.legislationDiaryNo || "",
        legislationDiaryDate:
          new Date(sessionByIdData.legislationDiaryDate) || "",
        businessStatus: sessionByIdData.businessStatus || "",
        // businessSession: sessionByIdData.businessSessions[0]?.sessionName || "",
        // businessSession: sessionByIdData.businessSessions[0]?.sessionName || "",

        businessSessions: sessionByIdData?.businessSessions
          ? sessionByIdData?.businessSessions.map((session) => ({
              value: session?.id,
              label: session?.sessionName,
            }))
          : [],
        parliamentaryYear: sessionByIdData.parliamentaryYear
          ? {
              value: sessionByIdData.parliamentaryYear?.id,
              label: sessionByIdData.parliamentaryYear?.parliamentaryTenure,
            }
          : "",
        isAdjourned: sessionByIdData.isQuoraumAdjourned || "",
        summonDate: new Date(sessionByIdData.summonNoticeDate) || "",
        summonTime: sessionByIdData.summonNoticeTime || "",
        jointSessionPurpose: sessionByIdData.jointSessionPurpose || "",
      });
    }
  }, [sessionByIdData, formik.setValues]);
  console.log("test", sessionByIdData);
  return (
    <Layout
      module={true}
      sidebarItems={QMSSideBarItems}
      centerlogohide={true}
    >
       <Header
        dashboardLink={"/qms/dashboard"}
        addLink1={"/qms/manage/sessions"}
        title1={"Sessions"}
        addLink2={"/qms/manage/sessions/addedit"}
        title2={location && location?.state ? "Edit Sessions" : "Add Sessions"}
      />
      <ToastContainer />

      <div class="container-fluid">
        <div class="card">
          <div class="card-header red-bg" style={{ background: "#14ae5c" }}>
            {location && location.state ? (
              <h1>Edit Sessions</h1>
            ) : (
              <h1>Add Sessions</h1>
            )}
          </div>
          <div class="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div class="container-fluid">
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Session No</label>
                      <input
                        type="number"
                        placeholder={"Session No"}
                        value={formik.values.sessionNo}
                        className={`form-control ${
                          formik.touched.sessionNo && formik.errors.sessionNo
                            ? "is-invalid"
                            : ""
                        }`}
                        id="sessionNo"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.sessionNo && formik.errors.sessionNo && (
                        <div className="invalid-feedback">
                          {formik.errors.sessionNo}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-6">
                    <div class="mb-3">
                      <label class="form-label">Called By</label>
                      <select
                        class="form-select"
                        id="CalledBy"
                        name="CalledBy"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.CalledBy}
                      >
                        <option value={""} selected disabled hidden>
                          Select
                        </option>
                        <option value="Chairman">Chairman</option>
                        <option value="President">President</option>
                      </select>
                    </div>
                  </div>

                  <div class="col-6">
                    <div class="mb-3">
                      <div class="form-check" style={{ marginTop: "39px" }}>
                        <input
                          class={`form-check-input ${
                            formik.touched.isJoint && formik.errors.isJoint
                              ? "is-invalid"
                              : ""
                          }`}
                          type="checkbox"
                          id="flexCheckDefault"
                          checked={formik.values.isJoint}
                          onChange={() =>
                            formik.setFieldValue(
                              "isJoint",
                              !formik.values.isJoint
                            )
                          }
                        />
                        <label class="form-check-label" for="flexCheckDefault">
                          Is Joint Session
                        </label>
                        {formik.touched.isJoint && formik.errors.isJoint && (
                          <div className="invalid-feedback">
                            {formik.errors.isJoint}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div className="col">
                    <div className="mb-3" style={{ position: "relative" }}>
                      <label className="form-label">Start Date</label>
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
                        // minDate={new Date()}
                        className={`form-control ${
                          formik.touched.startDate && formik.errors.startDate
                            ? "is-invalid"
                            : ""
                        }`}
                        dateFormat="dd-MM-yyyy"
                      />
                      {formik.touched.startDate && formik.errors.startDate && (
                        <div className="invalid-feedback">
                          {formik.errors.startDate}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col">
                    <div className="mb-3" style={{ position: "relative" }}>
                      <label className="form-label">End Date</label>
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
                        selected={formik.values.endDate}
                        onChange={(date) =>
                          formik.setFieldValue("endDate", date)
                        }
                        onBlur={formik.handleBlur}
                        // minDate={new Date()}
                        className={`form-control ${
                          formik.touched.endDate && formik.errors.endDate
                            ? "is-invalid"
                            : ""
                        }`}
                        dateFormat="dd-MM-yyyy"
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
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Legislation Diary No</label>
                      <input
                        type="text"
                        placeholder={"Legislation Diary No"}
                        value={formik.values.legislationDiaryNo}
                        className={`form-control ${
                          formik.touched.legislationDiaryNo &&
                          formik.errors.legislationDiaryNo
                            ? "is-invalid"
                            : ""
                        }`}
                        id="legislationDiaryNo"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.legislationDiaryNo &&
                        formik.errors.legislationDiaryNo && (
                          <div className="invalid-feedback">
                            {formik.errors.legislationDiaryNo}
                          </div>
                        )}
                    </div>
                  </div>

                  <div className="col">
                    <div className="mb-3" style={{ position: "relative" }}>
                      <label className="form-label">
                        Legislation Diary Date
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
                        selected={formik.values.legislationDiaryDate}
                        onChange={(date) =>
                          formik.setFieldValue("legislationDiaryDate", date)
                        }
                        onBlur={formik.handleBlur}
                        minDate={new Date()}
                        className={`form-control ${
                          formik.touched.legislationDiaryDate &&
                          formik.errors.legislationDiaryDate
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {formik.touched.legislationDiaryDate &&
                        formik.errors.legislationDiaryDate && (
                          <div className="invalid-feedback">
                            {formik.errors.legislationDiaryDate}
                          </div>
                        )}
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-6">
                    <div class="mb-3">
                      <label class="form-label">Business Status</label>
                      <select
                        class="form-select"
                        id="businessStatus"
                        name="businessStatus"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.businessStatus}
                      >
                        <option value={""} selected disabled hidden>
                          Select
                        </option>
                        <option>Select</option>
                        <option value="Carry Forward">Carry Forward</option>
                        <option value="Lapsed">Lapsed</option>
                      </select>
                    </div>
                  </div>

                  {/* <div class="col-6">
                    <div class="mb-3">
                      <label class="form-label">Business Session</label>
                      <select
                        class="form-select"
                        id="businessSession"
                        name="businessSession"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.businessSession}
                      >
                        <option value={""} selected disabled hidden>
                          select
                        </option>
                        <option>Federal</option>
                        <option value={"1"}>Punjab</option>
                        <option value={"2"}>Sindh</option>
                      </select>
                    </div>
                  </div> */}
                  <div className="col">
                    <label className="form-label">Business Session</label>
                    <Select
                      options={
                        sessions &&
                        sessions?.map((item) => ({
                          value: item.id,
                          label: item?.sessionName,
                        }))
                      }
                      name="businessSessions"
                      id="businessSessions"
                      onChange={(selectedOptions) =>
                        formik.setFieldValue(
                          "businessSessions",
                          selectedOptions
                        )
                      }
                      value={formik.values.businessSessions}
                      isMulti={true}
                    />
                  </div>
                </div>

                <div class="row">
                  <div class="col-6">
                    <div class="mb-3">
                      <label class="form-label">Parliamentary Year</label>
                      {/* <select
                        class="form-select"
                        id="parliamentaryYear"
                        name="parliamentaryYear"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.parliamentaryYear}
                      >
                        <option value={""} selected disabled hidden>
                          select
                        </option>
                        <option value={"1"}>Federal</option>
                        <option value={"2"}>Punjab</option>
                        <option value={"3"}>Sindh</option>
                      </select> */}
                      <Select
                        options={
                          parliamentaryYear &&
                          parliamentaryYear?.map((item) => ({
                            value: item?.id,
                            label: item?.parliamentaryTenure,
                          }))
                        }
                        onChange={(selectedOptions) =>
                          formik.setFieldValue(
                            "parliamentaryYear",
                            selectedOptions
                          )
                        }
                        // onBlur={formikAssigned.handleBlur}
                        value={formik.values.parliamentaryYear}
                        name="parliamentaryYear"
                      />

                      {formik.touched.parliamentaryYear &&
                        formik.errors.parliamentaryYear && (
                          <div className="invalid-feedback">
                            {formik.errors.parliamentaryYear}
                          </div>
                        )}
                    </div>
                  </div>

                  <div class="col-6">
                    <div class="mb-3">
                      <div class="form-check" style={{ marginTop: "39px" }}>
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
                          Is Quoraum Adjourned
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
                  <div className="col">
                    <div className="mb-3" style={{ position: "relative" }}>
                      <label className="form-label">Summon Notice Date</label>
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
                        selected={formik.values.summonDate}
                        onChange={(date) =>
                          formik.setFieldValue("summonDate", date)
                        }
                        onBlur={formik.handleBlur}
                        // minDate={new Date()}
                        className={`form-control ${
                          formik.touched.summonDate && formik.errors.summonDate
                            ? "is-invalid"
                            : ""
                        }`}
                        dateFormat="dd-MM-yyyy"
                      />
                      {formik.touched.summonDate &&
                        formik.errors.summonDate && (
                          <div className="invalid-feedback">
                            {formik.errors.summonDate}
                          </div>
                        )}
                    </div>
                  </div>

                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Summon Notice Time</label>
                      <TimePicker
                        value={formik.values.summonTime}
                        clockIcon={null} // Disable clock view
                        openClockOnFocus={false}
                        format="hh:mm a"
                        onChange={(time) =>
                          formik.setFieldValue("summonTime", time)
                        }
                        className={`form-control ${
                          formik.errors.summonTime && formik.touched.summonTime
                            ? "is-invalid"
                            : ""
                        }`}
                        
                      />
                      {formik.errors.summonTime &&
                        formik.touched.summonTime && (
                          <div className="invalid-feedback">
                            {formik.errors.summonTime}
                          </div>
                        )}
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">
                        Joint Session Purpose
                      </label>
                      <textarea
                        className={`form-control`}
                        id="jointSessionPurpose"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.jointSessionPurpose}
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

export default QMSAddEditSessionsForm;
