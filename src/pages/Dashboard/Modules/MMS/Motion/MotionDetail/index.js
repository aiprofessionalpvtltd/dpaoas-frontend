import React, { useContext, useEffect, useState } from "react";
import { Layout } from "../../../../../../components/Layout";
import Header from "../../../../../../components/Header";
import { MMSSideBarItems } from "../../../../../../utils/sideBarItems";
import { useFormik } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import Select from "react-select";

import {
  getAllMinistry,
  getAllSessions,
  getallMembers,
  getallMotionStatus,
  sendMotionForTranslation,
  updateNewMotion,
} from "../../../../../../api/APIs";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";
import { useLocation } from "react-router";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "../../../../../../api/AuthContext";
import { Editor } from "../../../../../../components/CustomComponents/Editor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

const validationSchema = Yup.object({
  //   sessionNumber: Yup.number(),
  //   motionID: Yup.number(),
  fileNo: Yup.number().required("File No is required"),
  motionType: Yup.string(),
  motionWeek: Yup.string(),
  noticeOfficeDiaryNo: Yup.number().required(
    "Notice Office Diary No is required",
  ),
  noticeOfficeDiaryDate: Yup.date().required(
    "Notice Office Diary Date is required",
  ),
  noticeOfficeDiaryTime: Yup.string().required(
    "Notice Office Diary Time is required",
  ),
  motionStatus: Yup.string(),
  mover: Yup.array(),
  ministry: Yup.array(),
  dateofMovinginHouse: Yup.date().required(
    "Date Of Moving in House is required",
  ),
  dateofRefferingToSC: Yup.date().required(
    "Date Of Reffering To SC is required",
  ),
  dateofDiscussion: Yup.date().required("Date Of Discussion is required"),
  urduText: Yup.string(),
  englishText: Yup.string(),
  motionText: Yup.string(),
  // Add more fields and validations as needed
});
function MMSMotionDetail() {
  const location = useLocation();
  const { ministryData, members, sessions } = useContext(AuthContext);

  const [motionStatusData, setMotionStatusData] = useState([]);
  const formik = useFormik({
    initialValues: {
      sessionNumber: sessions[0]?.id,
      motionID:
        location?.state?.motionMovers.length > 0 ??
        location?.state?.motionMovers[0]?.fkMotionId,
      fileNo: location?.state?.fileNumber,
      motionType: location?.state?.motionType,
      motionWeek: location?.state?.motionWeek,
      noticeOfficeDiaryNo: "",
      noticeOfficeDiaryDate: "",
      noticeOfficeDiaryTime: "",
      motionStatus: "",
      dateofMovinginHouse: new Date(location?.state?.dateOfMovingHouse),
      dateofDiscussion: new Date(location?.state?.dateOfDiscussion),
      dateofRefferingToSC: new Date(location?.state?.dateOfReferringToSc),
      mover: [],
      ministry: [],
      urduText: "",
      englishText: "",
      motionText: "",
      // Add more fields as needed
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleEditMotion(values);
    },
  });

  const handleEditMotion = async (values) => {
    const formData = new FormData();
    formData.append("fkSessionId", values?.sessionNumber);
    formData.append("fileNumber", values?.fileNo);
    formData.append("motionType", values?.motionType);
    formData.append("motionWeek", values?.motionWeek);
    formData.append("noticeOfficeDiaryNo", values?.noticeOfficeDiaryNo);
    // formData.append("moverIds[]", values?.mover);
    values.mover.forEach((mover, index) => {
      formData.append(`moverIds[${index}]`, mover.value);
    });
    // formData.append("ministryIds[]", values?.ministry);
    values.ministry.forEach((mover, index) => {
      formData.append(`ministryIds[${index}]`, mover.value);
    });
    formData.append("noticeOfficeDiaryDate", values?.noticeOfficeDiaryDate);
    formData.append("noticeOfficeDiaryTime", values?.noticeOfficeDiaryTime);
    formData.append("businessType", "Motion");
    formData.append("englishText", values.englishText);
    formData.append("urduText", values?.urduText);
    formData.append("fkMotionStatus", values?.motionStatus);
    try {
      const response = await updateNewMotion(location?.state?.id, formData);
      if (response?.success) {
        showSuccessMessage(response?.message);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const getMotionStatus = async () => {
    try {
      const response = await getallMotionStatus();
      if (response?.success) {
        setMotionStatusData(response?.data);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };
  const transfrerMinistryData = (apiData) => {
    return apiData.map((leave, index) => ({
      SR: `${index + 1}`,
      fkMotionId: `${leave?.fkMotionId}`,
      motionStatuses: leave?.motionStatuses?.statusName,
    }));
  };
  const StatusHistoryData = transfrerMinistryData(
    location?.state?.motionStatusHistories,
  );
  console.log("sadkajhhhhhhh", StatusHistoryData);
  const hendlesendMotionForTranslation = async () => {
    try {
      const response = await sendMotionForTranslation(location?.state?.id);
      if (response?.success) {
        showSuccessMessage(response?.message);
      }
    } catch (error) {
      console.log();
    }
  };
  useEffect(() => {
    getMotionStatus();
  }, []);
  return (
    <Layout module={true} sidebarItems={MMSSideBarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/"}
        addLink1={"/mms/motion/detail"}
        title1={"Motion Detail"}
      />
      <ToastContainer />
      <div class="container-fluid">
        <form onSubmit={formik.handleSubmit}>
          <div class="row mt-4">
            <div class="">
              <button class="btn btn-warning me-2" type="button">
                View File
              </button>
              <button
                class="btn btn-primary me-2"
                type="button"
                onClick={() => hendlesendMotionForTranslation()}
              >
                Send for Translation
              </button>
              <button class="btn btn-primary me-2" type="button">
                Print
              </button>
              <button class="btn btn-primary me-2" type="submit">
                Save
              </button>
              <button class="btn btn-danger float-end" type="button">
                Delete
              </button>
            </div>
          </div>
          <div class="card mt-3">
            <div
              class="card-header red-bg"
              style={{ background: "#14ae5c !important" }}
            >
              <h1>MOTION DETAIL</h1>
            </div>
            <div class="card-body">
              <div class="container-fluid">
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Session No</label>
                      <select
                        name="sessionNumber"
                        id="sessionNumber"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.sessionNumber}
                        className={"form-select"}
                      >
                        <option value={sessions[0]?.id} selected disabled>
                          {sessions[0]?.sessionName}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Motion ID</label>
                      <input
                        type="text"
                        className={`form-control`}
                        id="motionID"
                        readOnly={true}
                        placeholder={formik.values.motionID}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">File No</label>
                      <input
                        type="text"
                        className={`form-control ${
                          formik.touched.fileNo && formik.errors.fileNo
                            ? "is-invalid"
                            : ""
                        }`}
                        id="fileNo"
                        placeholder={formik.values.fileNo}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.fileNo && formik.errors.fileNo && (
                        <div className="invalid-feedback">
                          {formik.errors.fileNo}
                        </div>
                      )}
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Motion Type</label>
                      <select
                        class="form-select"
                        placeholder={formik.values.motionType}
                        onChange={formik.handleChange}
                        id="motionType"
                        onBlur={formik.handleBlur}
                      >
                        <option>Select</option>
                        <option>Motion Under Rule 218</option>
                        <option></option>
                        <option></option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Motion Week</label>
                      <select
                        class="form-select"
                        placeholder={formik.values.motionWeek}
                        onChange={formik.handleChange}
                        id="motionWeek"
                        onBlur={formik.handleBlur}
                      >
                        <option>Motion Week</option>
                        <option>Not Applicable</option>
                        <option>1st Week</option>
                        <option>2nd Week</option>
                        <option>3rd Week</option>
                        <option>4th Week</option>
                        <option>5th Week</option>
                      </select>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Notice Office Diary No</label>
                      <input
                        type="text"
                        className={`form-control ${
                          formik.touched.noticeOfficeDiaryNo &&
                          formik.errors.noticeOfficeDiaryNo
                            ? "is-invalid"
                            : ""
                        }`}
                        id="noticeOfficeDiaryNo"
                        placeholder={formik.values.noticeOfficeDiaryNo}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.noticeOfficeDiaryNo &&
                        formik.errors.noticeOfficeDiaryNo && (
                          <div className="invalid-feedback">
                            {formik.errors.noticeOfficeDiaryNo}
                          </div>
                        )}
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3" style={{ position: "relative" }}>
                      <label class="form-label">Notice Office Diary Date</label>
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
                        selected={formik.values.noticeOfficeDiaryDate}
                        onChange={(date) =>
                          formik.setFieldValue("noticeOfficeDiaryDate", date)
                        }
                        minDate={new Date()}
                        className={`form-control ${
                          formik.errors.noticeOfficeDiaryDate &&
                          formik.touched.noticeOfficeDiaryDate
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {formik.errors.noticeOfficeDiaryDate &&
                        formik.touched.noticeOfficeDiaryDate && (
                          <div className="invalid-feedback">
                            {formik.errors.noticeOfficeDiaryDate}
                          </div>
                        )}
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Notice Office Diary Time</label>
                      <TimePicker
                        value={formik.values.noticeOfficeDiaryTime}
                        clockIcon={null} // Disable clock view
                        openClockOnFocus={false}
                        format="hh:mm a"
                        onChange={(time) =>
                          formik.setFieldValue("noticeOfficeDiaryTime", time)
                        }
                        className={`form-control ${
                          formik.errors.noticeOfficeDiaryTime &&
                          formik.touched.noticeOfficeDiaryTime
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {formik.errors.noticeOfficeDiaryTime &&
                        formik.touched.noticeOfficeDiaryTime && (
                          <div className="invalid-feedback">
                            {formik.errors.noticeOfficeDiaryTime}
                          </div>
                        )}
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Motion Status</label>
                      <select
                        class="form-select"
                        placeholder={formik.values.motionStatus}
                        onChange={formik.handleChange}
                        id="motionStatus"
                        onBlur={formik.handleBlur}
                      >
                        <option selected disabled hidden>
                          Select
                        </option>
                        {motionStatusData &&
                          motionStatusData.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item?.statusName}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3" style={{ position: "relative" }}>
                      <label class="form-label">Date of Moving in House</label>
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
                        selected={formik.values.dateofMovinginHouse}
                        minDate={new Date()}
                        onChange={(date) =>
                          formik.setFieldValue("dateofMovinginHouse", date)
                        }
                        className={`form-control ${
                          formik.errors.dateofMovinginHouse &&
                          formik.touched.dateofMovinginHouse
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {formik.errors.dateofMovinginHouse &&
                        formik.touched.dateofMovinginHouse && (
                          <div className="invalid-feedback">
                            {formik.errors.dateofMovinginHouse}
                          </div>
                        )}
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3" style={{ position: "relative" }}>
                      <label class="form-label">Date of Discussion</label>
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
                        selected={formik.values.dateofDiscussion}
                        minDate={new Date()}
                        onChange={(date) =>
                          formik.setFieldValue("dateofDiscussion", date)
                        }
                        className={`form-control ${
                          formik.errors.dateofDiscussion &&
                          formik.touched.dateofDiscussion
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {formik.errors.dateofDiscussion &&
                        formik.touched.dateofDiscussion && (
                          <div className="invalid-feedback">
                            {formik.errors.dateofDiscussion}
                          </div>
                        )}
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3" style={{ position: "relative" }}>
                      <label class="form-label">Date of Reffering To SC</label>
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
                        selected={formik.values.dateofRefferingToSC}
                        minDate={new Date()}
                        onChange={(date) =>
                          formik.setFieldValue("dateofRefferingToSC", date)
                        }
                        className={`form-control ${
                          formik.errors.dateofRefferingToSC &&
                          formik.touched.dateofRefferingToSC
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {formik.errors.dateofRefferingToSC &&
                        formik.touched.dateofRefferingToSC && (
                          <div className="invalid-feedback">
                            {formik.errors.dateofRefferingToSC}
                          </div>
                        )}
                    </div>
                  </div>
                </div>
                <div class="row"></div>
                <div class="row">
                  <div class="col-6">
                    <div class="mb-3">
                      <label class="form-label">Members Senator</label>
                      <Select
                        options={members.map((item) => ({
                          value: item.id,
                          label: item.memberName,
                        }))}
                        isMulti
                        onChange={(selectedOptions) =>
                          formik.setFieldValue("mover", selectedOptions)
                        }
                        onBlur={formik.handleBlur}
                        value={formik.values.mover}
                        name="mover"
                      />
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="mb-3">
                      <label class="form-label">Ministries</label>
                      <Select
                        options={ministryData.map((item) => ({
                          value: item.id,
                          label: item.ministryName,
                        }))}
                        isMulti
                        onChange={(selectedOptions) =>
                          formik.setFieldValue("ministry", selectedOptions)
                        }
                        onBlur={formik.handleBlur}
                        value={formik.values.ministry}
                        name="ministry"
                      />
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: 10 }}>
                  <Editor
                    title={"Motion Text"}
                    // onChange={(content) =>
                    //     formik.setFieldValue("englishText", content)}
                    //     value={formik.values.englishText}
                  />
                </div>
                <div style={{ marginTop: 70, marginBottom: 40 }}>
                  <Editor
                    title={"Urdu Text"}
                    onChange={(content) =>
                      formik.setFieldValue("urduText", content)
                    }
                    value={formik.values.urduText}
                  />
                </div>
                <div style={{ marginTop: 70, marginBottom: 40 }}>
                  <Editor
                    title={"English Text"}
                    onChange={(content) =>
                      formik.setFieldValue("englishText", content)
                    }
                    value={formik.values.englishText}
                  />
                </div>

                <h2
                  style={{ color: "#666", marginTop: "30px", fontSize: "21px" }}
                >
                  Status History
                </h2>
                <div
                  class="dash-detail-container"
                  style={{ marginTop: "20px" }}
                >
                  <table class="table red-bg-head th">
                    <thead>
                      <tr>
                        <th class="text-center" scope="col">
                          Sr#
                        </th>
                        <th class="text-center" scope="col">
                          MotionID
                        </th>
                        <th class="text-center" scope="col">
                          Motion Statuses
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {StatusHistoryData.length > 0 &&
                        StatusHistoryData.map((item, index) => (
                          <tr>
                            <td class="text-center">{item.SR}</td>
                            <td class="text-center">{item.fkMotionId}</td>
                            <td class="text-center">{item.motionStatuses}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default MMSMotionDetail;
