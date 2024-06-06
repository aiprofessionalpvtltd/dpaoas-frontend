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
  getallMotionStatus,
  sendMotionForTranslation,
  updateNewMotion,
} from "../../../../../../api/APIs/Services/Motion.service";
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
import moment from "moment";
import { imagesUrl } from "../../../../../../api/APIs";

const validationSchema = Yup.object({
  //   sessionNumber: Yup.number(),
  //   motionID: Yup.number(),
  fileNo: Yup.number().required("File No is required"),
  motionType: Yup.string(),
  motionWeek: Yup.string(),
  noticeOfficeDiaryNo: Yup.number().required(
    "Notice Office Diary No is required"
  ),
  noticeOfficeDiaryDate: Yup.date().required(
    "Notice Office Diary Date is required"
  ),
  noticeOfficeDiaryTime: Yup.string().required(
    "Notice Office Diary Time is required"
  ),
  motionStatus: Yup.string(),
  mover: Yup.array(),
  ministry: Yup.array(),
  dateofMovinginHouse: Yup.date().required(
    "Date Of Moving in House is required"
  ),
  dateofRefferingToSC: Yup.date().required(
    "Date Of Reffering To SC is required"
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
      sessionNumber: location.state
        ? {
            value: location?.state?.sessions?.id,
            label: location?.state?.sessions?.sessionName,
          }
        : "",
      // sessionNumber: location.state
      //   ? location?.state?.sessions?.sessionName
      //   : "",
      motionType: location.state ? location.state.motionType : "",
      noticeOfficeDiaryNo: location.state
        ? location.state?.noticeOfficeDairies?.noticeOfficeDiaryNo
        : "",
      mover:
        location?.state?.motionMovers?.length > 0
          ? location?.state?.motionMovers.map((item) => ({
              value: item.members?.id,
              label: item.members?.memberName,
            }))
          : [],
      noticeOfficeDiaryDate: location?.state?.noticeOfficeDairies
        ?.noticeOfficeDiaryDate
        ? moment(
            location?.state?.noticeOfficeDairies?.noticeOfficeDiaryDate,
            "YYYY-MM-DD"
          ).toDate()
        : "",
      // noticeOfficeDiaryTime: location?.state?.noticeOfficeDiaryTime
      //   ? new Date(location?.state?.noticeOfficeDiaryTime)
      //   : "",
      noticeOfficeDiaryTime: location?.state?.noticeOfficeDairies
        ?.noticeOfficeDiaryTime
        ? location?.state?.noticeOfficeDairies?.noticeOfficeDiaryTime
        : "",
      englishText: location.state ? location.state?.englishText : "",
      urduText: location.state ? location?.state?.urduText : "",
      attachment: null,
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      // handleShow();
      // setFormValues(values);
      UpdateMotionApi(values);
    },
    // enableReinitialize: true,
  });

  const UpdateMotionApi = async (values) => {
    const formData = new FormData();
    formData.append("fkSessionId", values?.sessionNumber?.value);
    formData.append("motionType", values?.motionType);
    formData.append("noticeOfficeDiaryNo", values?.noticeOfficeDiaryNo);
    // formData.append("moverIds[]", values?.mover);
    values?.mover?.forEach((mover, index) => {
      formData.append(`moverIds[${index}]`, mover.value);
    });
    formData.append(
      "noticeOfficeDiaryDate",
      values?.noticeOfficeDiaryDate &&
        moment(values?.noticeOfficeDiaryDate).format("YYYY-MM-DD")
    );
    // formData.append("noticeOfficeDiaryTime", values?.noticeOfficeDiaryTime);
    formData.append(
      "noticeOfficeDiaryTime",
      values?.noticeOfficeDiaryTime &&
        moment(values?.noticeOfficeDiaryTime, "hh:mm A").format("hh:mm A")
    );
    formData.append("businessType", "Motion");
    formData.append("englishText", values.englishText);
    formData.append("urduText", values.urduText);
    formData.append("motionSentStatus", "fromNotice");
    formData.append("fkMotionStatus", 1);
    if (values?.file) {
      Array.from(values?.file).map((file, index) => {
        formData.append(`file`, file);
      });
    }
    // formData.append("file", values?.attachment);

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
    location?.state?.motionStatusHistories
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
              {/* <button class="btn btn-warning me-2" type="button">
                View File
              </button> */}
              <button
                class="btn btn-primary me-2"
                type="button"
                onClick={() => hendlesendMotionForTranslation()}
              >
                Send for Translation
              </button>
              {/* <button class="btn btn-primary me-2" type="button">
                Print
              </button> */}
              <button class="btn btn-primary me-2" type="submit">
                Save
              </button>
              {/* <button class="btn btn-danger float-end" type="button">
                Delete
              </button> */}
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

                        {/* <select
                          className={`form-select ${
                            formik.touched.fkSessionId &&
                            formik.errors.fkSessionId
                              ? "is-invalid"
                              : ""
                          }`}
                          placeholder="Session No"
                          value={formik.values.sessionNumber}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          name="sessionNumber"
                        >
                          <option value={""} selected disabled hidden>
                            Select
                          </option>

                          {sessions &&
                            sessions.length > 0 &&
                            sessions.map((item) => (
                              <option key={item.id} value={item.id}>
                                {item.sessionName}
                              </option>
                            ))}
                        </select> */}
                        {/* <input
                          readOnly={true}
                          placeholder={formik.values.sessionNumber}
                          type="text"
                          class="form-control"
                          id="sessionNumber"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        /> */}
                        <Select
                          options={
                            sessions &&
                            sessions?.map((item) => ({
                              value: item?.id,
                              label: item?.sessionName,
                            }))
                          }
                          onChange={(selectedOptions) => {
                            formik.setFieldValue(
                              "sessionNumber",
                              selectedOptions
                            );
                          }}
                          onBlur={formik.handleBlur}
                          value={formik.values.sessionNumber}
                          name="sessionNumber"
                          isClearable={true}
                          // className="form-select"
                          style={{ border: "none" }}
                        />
                      </div>
                    </div>
                    {/* <div class="col">
                      <div class="mb-3">
                        <label class="form-label">Group</label>
                        <select
                          class={`form-select ${
                            formik.touched.motionType &&
                            formik.errors.motionType
                              ? "is-invalid"
                              : ""
                          }`}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.motionWeek || ""}
                          name="motionWeek"
                        >
                          <option value={""} selected disabled hidden>
                            Select
                          </option>
                          <option value="1">1st Week</option>
                          <option value="2">2nd Week</option>
                          <option value="3">3rd Week</option>
                          <option value="4">4th Week</option>
                        </select>
                      </div>
                    </div> */}
                    <div className="col">
                      <div className="mb-3">
                        <label className="form-label">Motion Type</label>
                        <select
                          className={`form-select ${
                            formik.touched.motionType &&
                            formik.errors.motionType
                              ? "is-invalid"
                              : ""
                          }`}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.motionType || ""}
                          name="motionType"
                        >
                          <option value="" selected disabled hidden>
                            Select
                          </option>
                          <option value={"Adjournment Motion"}>
                            Adjournment Motion
                          </option>
                          <option value={"Call Attention Notice"}>
                            Call Attention Notice
                          </option>

                          <option value={"Motion Under Rule 218"}>
                            Motion Under Rule 218
                          </option>
                          <option value={"Motion Under Rule 60"}>
                            Motion Under Rule 60
                          </option>
                        </select>
                        {formik.touched.motionType &&
                          formik.errors.motionType && (
                            <div class="invalid-feedback">
                              {formik.errors.motionType}
                            </div>
                          )}
                      </div>
                    </div>
                    <div className="col">
                      <div className="mb-3" style={{ position: "relative" }}>
                        <label className="form-label">
                          Notice Office Diary Date{" "}
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
                          selected={formik.values.noticeOfficeDiaryDate}
                          maxDate={new Date()}
                          onChange={(date) =>
                            formik.setFieldValue("noticeOfficeDiaryDate", date)
                          }
                          onBlur={formik.handleBlur}
                          className={`form-control ${
                            formik.touched.noticeOfficeDiaryDate &&
                            formik.errors.noticeOfficeDiaryDate
                              ? "is-invalid"
                              : ""
                          }`}
                          dateFormat={"dd-MM-yyyy"}
                        />
                        {formik.touched.noticeOfficeDiaryDate &&
                          formik.errors.noticeOfficeDiaryDate && (
                            <div className="invalid-feedback">
                              {formik.errors.noticeOfficeDiaryDate}
                            </div>
                          )}
                      </div>
                    </div>
                    <div className="col">
                      <div className="mb-3">
                        <label className="form-label">
                          Notice Office Diary Time
                        </label>
                        {/* <input
                          className="form-control"
                          type="text"
                          id="noticeOfficeDiaryTime"
                          value={formik.values.noticeOfficeDiaryTime}
                          name="noticeOfficeDiaryTime"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                        /> */}
                        <TimePicker
                          value={formik.values.noticeOfficeDiaryTime}
                          clockIcon={null} // Disable clock view
                          openClockOnFocus={false}
                          format="hh:mm a"
                          onChange={(time) =>
                            formik.setFieldValue("noticeOfficeDiaryTime", time)
                          }
                          className={`form-control`}
                        />
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-3">
                      <div class="mb-3">
                        <label class="form-label">Notice Office Diary No</label>
                        <input
                          class={`form-control ${
                            formik.touched.noticeOfficeDiaryNo &&
                            formik.errors.noticeOfficeDiaryNo
                              ? "is-invalid"
                              : ""
                          }`}
                          type="number"
                          id="noticeOfficeDiaryNo"
                          value={formik.values.noticeOfficeDiaryNo}
                          name="noticeOfficeDiaryNo"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                        />
                        {formik.touched.noticeOfficeDiaryNo &&
                          formik.errors.noticeOfficeDiaryNo && (
                            <div class="invalid-feedback">
                              {formik.errors.noticeOfficeDiaryNo}
                            </div>
                          )}
                      </div>
                    </div>

                    <div class="col-3">
                      <div class="mb-3">
                        {/* <label class="form-label">Movers</label>
                        <select
                          class={`form-select ${
                            formik.touched.mover && formik.errors.mover
                              ? "is-invalid"
                              : ""
                          }`}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.mover || ""}
                          name="mover"
                        >
                          <option value={""} selected disabled hidden>
                            Select
                          </option>
                          {members &&
                            members.map((item) => (
                              <option key={item.id} value={item.id}>
                                {item?.memberName}
                              </option>
                            ))}
                        </select> */}
                        <label class="form-label">Member Senate</label>
                        <Select
                          options={
                            members &&
                            members.map((item) => ({
                              value: item.id,
                              label: item.memberName,
                            }))
                          }
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
                    <div class="col-3"></div>
                  </div>

                  {/* <input
                          className="form-control"
                          type="file"
                          accept=".pdf, .jpg, .jpeg, .png"
                          id="formFile"
                          name="attachment"
                          onChange={(event) => {
                            formik.setFieldValue(
                              "attachment",
                              event.currentTarget.files[0]
                            );
                          }}
                        /> */}
                  <div className="row">
                    <div className="col-3">
                      {location?.state?.file?.length > 0 ? (
                        location?.state?.file?.map((item) => (
                          <div class="MultiFile-label mt-3">
                            <a
                              href={`${imagesUrl}${item?.path}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <i class="fas fa-download"></i>
                            </a>
                            {/* <a class="MultiFile-remove" href="#T7">
                              x
                            </a> */}
                            <span
                              class="MultiFile-label"
                              title={item?.path
                                ?.split("\\")
                                .pop()
                                .split("/")
                                .pop()}
                            >
                              <span class="MultiFile-title">
                                <a
                                  href={`${imagesUrl}${item?.path}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {item?.path
                                    ?.split("\\")
                                    .pop()
                                    .split("/")
                                    .pop()}
                                </a>
                              </span>
                            </span>
                          </div>
                        ))
                      ) : (
                        <div class="col-12">
                          <div class="mb-3">
                            {/* {location?.state?.file?.length > 0 &&
                            location?.state?.file ? (
                              <label for="formFile" class="form-label">
                                Selected Images
                              </label>
                            ) : (
                              <label for="formFile" class="form-label">
                                Attach Image Files
                              </label>
                            )} */}
                            {Array.isArray(location?.state?.file) &&
                            location?.state?.file.length > 0 ? (
                              <label htmlFor="formFile" className="form-label">
                                Selected Images
                              </label>
                            ) : (
                              <label htmlFor="formFile" className="form-label">
                                Attach Image Files
                              </label>
                            )}

                            <input
                              className="form-control"
                              type="file"
                              accept=".pdf, .jpg, .jpeg, .png"
                              id="formFile"
                              name="attachment"
                              multiple
                              onChange={(event) => {
                                formik.setFieldValue(
                                  "file",
                                  event.currentTarget.files
                                );
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={{ marginTop: 10 }}>
                    <Editor
                      title={"English Text"}
                      onChange={(content) =>
                        formik.setFieldValue("englishText", content)
                      }
                      value={formik.values.englishText}
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

                  {/* <div class="row">
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                      <button class="btn btn-primary" type="submit">
                        Submit
                      </button>
                    </div>
                  </div> */}
               

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
