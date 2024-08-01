import React, { useContext, useEffect, useState } from "react";
import { Layout } from "../../../../../../components/Layout";
import Header from "../../../../../../components/Header";
import { QMSSideBarItems } from "../../../../../../utils/sideBarItems";
import { useFormik } from "formik";
import * as Yup from "yup";
import TimePicker from "react-time-picker";
import DatePicker from "react-datepicker";
import { Editor } from "../../../../../../components/CustomComponents/Editor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router";
import { AuthContext } from "../../../../../../api/AuthContext";
import Select from "react-select";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";
import {
  UpdateQuestionById,
  getAllQuestionStatus,
  sendQuestionTranslation,
} from "../../../../../../api/APIs/Services/Question.service";
import { ToastContainer } from "react-toastify";
import moment from "moment";
import { getAllDivisions } from "../../../../../../api/APIs/Services/ManageQMS.service";
import { imagesUrl } from "../../../../../../api/APIs";

const validationSchema = Yup.object({
  sessionNumber: Yup.string().required("Session No is required"),
  noticeOfficeDiaryNumber: Yup.string().required(
    "Notice Office Diary Number is required",
  ),
  noticeOfficeDiaryDate: Yup.string().required(
    "Notice Office Diary Date is required",
  ),
  noticeOfficeDiaryTime: Yup.string().required(
    "Notice Office Diary Time is required",
  ),
  questionDiaryNumber: Yup.string().required(
    "Question Diary Number is required",
  ),
  category: Yup.string().required("Question Category is required"),
  englishText: Yup.string(),
  urduText: Yup.string(),
  mover: Yup.string().required("Member Senator is required"),
});

function QMSNoticeQuestionDetail() {
  const { members, sessions } = useContext(AuthContext);
  const [alldivisons, setAllDivisions] = useState([]);
  const [allQuestionStatus, setAllQuestionStatus] = useState([]);
  const location = useLocation();
  console.log("sessions", sessions);
  const formik = useFormik({
    initialValues: {
      sessionNumber: location.state
        ? {
            value: location?.state?.question?.session?.id,
            label: location?.state?.question?.session?.sessionName,
          }
        : "",
      noticeOfficeDiaryNumber:
        location?.state?.question?.noticeOfficeDiary?.noticeOfficeDiaryNo,
      noticeOfficeDiaryDate: location?.state?.question?.noticeOfficeDiary
        ?.noticeOfficeDiaryDate
        ? moment(
            location?.state?.question?.noticeOfficeDiary?.noticeOfficeDiaryDate
          ).toDate()
        : "",
      noticeOfficeDiaryTime: location?.state?.question?.noticeOfficeDiary
        ?.noticeOfficeDiaryTime
        ? moment(
            location?.state?.question?.noticeOfficeDiary?.noticeOfficeDiaryTime,
            "hh:mm a"
          ).toDate()
        : "",
      questionDiaryNumber:
        location?.state?.question?.questionDiary?.questionDiaryNo,
      category: location?.state?.question
        ? location?.state?.question?.questionCategory
        : "",
      englishText: location?.state?.question
        ? location?.state?.question?.englishText
        : "",
      urduText: location?.state?.question?.urduText,
      division: location?.state?.question
        ? location?.state?.question?.fkDivisionId
        : "",
      assignedquestionid: location?.state?.question?.questionDiary?.questionID,
      mover: location?.state?.question?.fkMemberId
        ? location?.state?.question?.fkMemberId
        : "",
      questionStatus: location?.state?.question?.questionStatus
        ? {
            value: location?.state?.question?.questionStatus?.id,
            label: location?.state?.question?.questionStatus?.questionStatus,
          }
        : "",
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      updateQuestion(values);
    },
  });

  const updateQuestion = async (values) => {
    const formData = new FormData();
    formData.append("fkSessionId", values?.sessionNumber?.value);
    formData.append("noticeOfficeDiaryNo", values?.noticeOfficeDiaryNumber);
    formData.append("noticeOfficeDiaryDate", values?.noticeOfficeDiaryDate);
    formData.append("noticeOfficeDiaryTime", values?.noticeOfficeDiaryTime);
    formData.append("questionCategory", values?.category);
    formData.append("questionDiaryNo", values?.questionDiaryNumber);
    formData.append("fkMemberId", values?.mover);
    // formData.append("fkGroupId", values?.group);
    formData.append("fkDivisionId",  values?.division);
    // formData.append("fileStatus", values?.fileStatus);
    // formData.append("replyDate", values?.replyDate);

    // formData.append("ammendedText", values.ammendedText);
    formData.append("urduText", values.urduText);
    formData.append("englishText", values.englishText);
    formData.append("fkQuestionStatus", values?.questionStatus?.value);
    // formData.append("originalText", values.originalText);
    try {
      const response = await UpdateQuestionById(
        location?.state?.question?.id,
        formData,
      );
      if (response?.success) {
        showSuccessMessage(response?.message);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const hendleQuestionTranslation = async () => {
    try {
      const response = await sendQuestionTranslation(
        location?.state?.question?.id,
      );
      if (response?.success) {
        showSuccessMessage(response.message);
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  };

  const GetALLDivsions = async () => {
    try {
      const response = await getAllDivisions(0, 100);
      if (response?.success) {
        setAllDivisions(response?.data?.divisions);
        // setCount(response?.data?.count);
        // setTotalPages(rersponse?.data?.totalPages)
        // showSuccessMessage(response.message)
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Getting Question Statuses
  const GetAllQuestionStatus = async () => {
    try {
      const response = await getAllQuestionStatus();
      if (response?.success) {
        setAllQuestionStatus(response?.data);
        // showSuccessMessage(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetAllQuestionStatus()
    GetALLDivsions();
  }, []);

  return (
    <Layout module={true} sidebarItems={QMSSideBarItems} centerlogohide={true}>
      <ToastContainer />
      <Header
        dashboardLink={"/"}
        addLink1={"/qms/notice/notice-question-detail"}
        title1={"Notice Question Detail"}
      />
      <div class="container-fluid">
        <div class="row mt-4">
          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <button
              class="btn btn-primary"
              type="button"
              onClick={hendleQuestionTranslation}
            >
              Send for Translation
            </button>
          </div>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div class="row">
            <div class="col-3">
              <div class="mb-3">
                <input
                  class="form-control"
                  type="text"
                  readOnly
                  placeholder={location?.state?.question?.id}
                />
              </div>
            </div>
            <div class="col-6">
              <button class="btn btn-primary me-2" type="submit">
                Update
              </button>
              <button class="btn btn-warning me-2" type="button"  onClick={() => {
    const imagePath = location?.state?.question?.questionImage[0]?.path;
    if (imagePath) {
      const url = `${imagesUrl}${imagePath}`;
      window.open(url, "_blank");
    } else {
      console.error("Image path is not defined.");
    }
  }}>
                View File
              </button>
              {/* <button class="btn btn-primary me-2" type="button">
                Revive
              </button>
              <button class="btn btn-primary me-2" type="button">
                Duplicate
              </button> */}
              {/* <button class="btn btn-danger" type="button">
                Delete
              </button> */}
            </div>
          </div>
          <div class="card mt-4">
            <div
              class="card-header red-bg"
              style={{ background: "#14ae5c !important" }}
            >
              <h1>NOTICE QUESTION DETAIL</h1>
            </div>
            <div class="card-body">
              <div class="container-fluid">
                <div class="dash-detail-container mb-4">
                  <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Session No</label>

                      <Select
                        options={
                          sessions &&
                          sessions?.map((item) => ({
                            value: item?.id,
                            label: item?.sessionName,
                          }))
                        }
                        onChange={(selectedOptions) => {
                          formik.setFieldValue("sessionNumber", selectedOptions);
                        }}
                        onBlur={formik.handleBlur}
                        value={formik.values.sessionNumber}
                        name="sessionNumber"
                        isClearable={true}
                        className={``}
                        style={{ border: "none" }}
                      />
                      
                    </div>
                  </div>
                    <div class="col">
                      <div class="mb-3">
                        <label class="form-label">
                          Notice Office Diary No{" "}
                        </label>
                        <input
                          type="text"
                          placeholder={formik.values.noticeOfficeDiaryNumber}
                          className={`form-control ${
                            formik.touched.noticeOfficeDiaryNumber &&
                            formik.errors.noticeOfficeDiaryNumber
                              ? "is-invalid"
                              : ""
                          }`}
                          id="noticeOfficeDiaryNumber"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.noticeOfficeDiaryNumber &&
                          formik.errors.noticeOfficeDiaryNumber && (
                            <div className="invalid-feedback">
                              {formik.errors.noticeOfficeDiaryNumber}
                            </div>
                          )}
                      </div>
                    </div>
                    <div class="col">
                      <div class="mb-3" style={{ position: "relative" }}>
                        <label class="form-label">
                          Notice Office Diary Date
                        </label>
                        <span
                          style={{
                            position: "absolute",
                            right: "15px",
                            top: "36px",
                            zIndex: 1,
                            fontSize: "20px",
                            color: "#666",
                          }}
                        >
                          <FontAwesomeIcon icon={faCalendarAlt} />
                        </span>
                        <DatePicker
                          selected={formik.values.noticeOfficeDiaryDate}
                          minDate={new Date()}
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
                        />
                        {formik.touched.noticeOfficeDiaryDate &&
                          formik.errors.noticeOfficeDiaryDate && (
                            <div className="invalid-feedback">
                              {formik.errors.noticeOfficeDiaryDate}
                            </div>
                          )}
                      </div>
                    </div>
                    <div class="col">
                      <div class="mb-3">
                        <label class="form-label">
                          Notice Office Diary Time
                        </label>
                        <TimePicker
                          value={formik.values.noticeOfficeDiaryTime}
                          clockIcon={null} // Disable clock view
                          openClockOnFocus={false}
                          format="hh:mm a"
                          onChange={(time) =>
                            formik.setFieldValue("noticeOfficeDiaryTime", time)
                          }
                          className={`form-control ${
                            formik.touched.noticeOfficeDiaryTime &&
                            formik.errors.noticeOfficeDiaryTime
                              ? "is-invalid"
                              : ""
                          }`}
                        />
                        {formik.touched.noticeOfficeDiaryTime &&
                          formik.errors.noticeOfficeDiaryTime && (
                            <div className="invalid-feedback">
                              {formik.errors.noticeOfficeDiaryTime}
                            </div>
                          )}
                      </div>
                    </div>
                    <div className="col">
                      <div className="mb-3">
                      <label class="form-label">Question Status</label>
                      <Select
                        options={
                          allQuestionStatus &&
                          allQuestionStatus?.map((item) => ({
                            value: item?.id,
                            label: item?.questionStatus,
                          }))
                        }
                        onChange={(selectedOptions) => {
                          formik.setFieldValue(
                            "questionStatus",
                            selectedOptions
                          );
                        }}
                        onBlur={formik.handleBlur}
                        value={formik.values.questionStatus}
                        name="questionStatus"
                        isClearable={true}
                        // className={``}
                      />
                      </div>

                    </div>
                  </div>
                  <div class="row">
                    <div class="col">
                      <div class="mb-3">
                        <label class="form-label">Question Diary No</label>
                        <input
                          type="text"
                          placeholder={formik.values.questionDiaryNumber}
                          className={`form-control ${
                            formik.touched.questionDiaryNumber &&
                            formik.errors.questionDiaryNumber
                              ? "is-invalid"
                              : ""
                          }`}
                          id="questionDiaryNumber"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.questionDiaryNumber &&
                          formik.errors.questionDiaryNumber && (
                            <div className="invalid-feedback">
                              {formik.errors.questionDiaryNumber}
                            </div>
                          )}
                      </div>
                    </div>
                    {/* <div class="col">
                      <div class="mb-3">
                        <label class="form-label">Assigned Question ID</label>
                        <input
                          class="form-control"
                          type="text"
                          placeholder={formik.values.assignedquestionid}
                          id="assignedquestionid"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </div>
                    </div> */}
                    <div class="col">
                      <div class="mb-3">
                        <label class="form-label">Category</label>
                        <select
                          className={`form-select ${
                            formik.touched.category && formik.errors.category
                              ? "is-invalid"
                              : ""
                          }`}
                          id="category"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik?.values?.category}
                        >
                          <option value={""} selected disabled hidden>
                            Select
                          </option>
                          <option value={"Starred"}>Starred</option>
                          <option value={"Un-Starred"}>Un-Starred</option>
                          <option value={"Short Notice"}>Short Notice</option>
                          {formik.touched.category &&
                            formik.errors.category && (
                              <div className="invalid-feedback">
                                {formik.errors.category}
                              </div>
                            )}
                        </select>
                      </div>
                    </div>
                    <div class="col">
                      <div class="mb-3">
                        <label class="form-label">Member Senator</label>
                        <select
                          className={`form-select ${
                            formik.touched.mover && formik.errors.mover
                              ? "is-invalid"
                              : ""
                          }`}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          id="mover"
                          value={formik.values?.mover}
                        >
                          <option value={""} selected disabled hidden>
                            select
                          </option>
                          {members &&
                            members.map((item) => (
                              <option key={item.id} value={item.id}>
                                {item?.memberName}
                              </option>
                            ))}
                          {formik.touched.mover && formik.errors.mover && (
                            <div className="invalid-feedback">
                              {formik.errors.mover}
                            </div>
                          )}
                        </select>
                      </div>
                    </div>
                    <div class="col-3">
                      <div class="mb-3">
                        <label class="form-label">Division</label>
                        {/* <input
                          class="form-control"
                          type="text"
                          placeholder={formik.values.division}
                          id="division"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        /> */}
                        <select
                        class="form-select"
                        value={formik.values.division}
                        id="division"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option selected disabled hidden>
                          Select
                        </option>
                        {alldivisons &&
                          alldivisons.map((item, index) => (
                            <option value={item.id} key={index}>
                              {item?.divisionName}
                            </option>
                          ))}
                      </select>
                      </div>
                    </div>
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
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default QMSNoticeQuestionDetail;
