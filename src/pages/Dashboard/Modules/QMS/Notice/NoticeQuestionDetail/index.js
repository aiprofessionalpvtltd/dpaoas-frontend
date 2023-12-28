import React, { useContext } from "react";
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
import { showErrorMessage, showSuccessMessage } from "../../../../../../utils/ToastAlert";
import { UpdateQuestionById, sendQuestionTranslation } from "../../../../../../api/APIs";
import { ToastContainer } from "react-toastify";

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
  mover: Yup.string().required("Member Senator is required")
});

function QMSNoticeQuestionDetail() {
  const { members } = useContext(AuthContext)
  const location = useLocation()
  console.log(location?.state?.fkQuestionId);
  const formik = useFormik({
    initialValues: {
      sessionNumber: location?.state?.fkFromSessionId,
      noticeOfficeDiaryNumber: location?.state?.questionDiary?.questionDiaryNo,
      noticeOfficeDiaryDate: new Date(location?.state?.noticeOfficeDiary?.noticeOfficeDiaryDate),
      noticeOfficeDiaryTime: location?.state?.noticeOfficeDiary?.noticeOfficeDiaryTime,
      questionDiaryNumber: location?.state?.questionDiary?.questionDiaryNo,
      category: "",
      englishText: "",
      urduText: location?.state?.urduText,
      division: location?.state?.divisions?.divisionName,
      assignedquestionid: location?.state?.questionDiary?.questionID,
      mover: ""
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      updateQuestion(values);
    },
  });

  const updateQuestion = async (values) => {
    const formData = new FormData();
    formData.append("fkSessionId", values?.sessionNumber);
    formData.append("noticeOfficeDiaryNo", values?.noticeOfficeDiaryNumber);
    formData.append("noticeOfficeDiaryDate", values?.noticeOfficeDiaryDate);
    formData.append("noticeOfficeDiaryTime", values?.noticeOfficeDiaryTime);
    formData.append("questionCategory", values?.category);
    formData.append("questionDiaryNo", values?.questionDiaryNumber);
    formData.append("fkMemberId", values?.mover);
    // formData.append("fkGroupId", values?.group);
    formData.append("fkDivisionId", location?.state?.fkDivisionId);
    // formData.append("fileStatus", values?.fileStatus);
    // formData.append("replyDate", values?.replyDate);

    // formData.append("ammendedText", values.ammendedText);
    formData.append("urduText", values.urduText);
    formData.append("englishText", values.englishText);
    // formData.append("originalText", values.originalText);
    try {
      const response = await UpdateQuestionById(
        location?.state?.fkQuestionId,
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
        location?.state?.fkQuestionId,
      );
      if (response?.success) {
        showSuccessMessage(response.message);
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  };

  return (
    <Layout module={true} sidebarItems={QMSSideBarItems} centerlogohide={true}>
      <ToastContainer />
      <Header
        dashboardLink={"/"}
        addLink1={"/qms/dashboard"}
        title1={"Question"}
        addLink2={"/qms/notice/notice-question-detail"}
        title2={"Notice Question Detail"}
      />
      <div class="container-fluid">
        <div class="row mt-4">
          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <button class="btn btn-primary" type="button" onClick={hendleQuestionTranslation}>
              Send for Translation
            </button>
          </div>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div class="row">
            <div class="col-3">
              <div class="mb-3">
                <input class="form-control" type="text" readOnly placeholder={location?.state?.fkQuestionId} />
              </div>
            </div>
            <div class="col-6">
              <button class="btn btn-primary me-2" type="submit">
                Update
              </button>
              <button class="btn btn-warning me-2" type="">
                View File
              </button>
              <button class="btn btn-primary me-2" type="">
                Revive
              </button>
              <button class="btn btn-primary me-2" type="">
                Duplicate
              </button>
              <button class="btn btn-danger" type="">
                Delete
              </button>
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
                        <input
                          readOnly={true}
                          type="text"
                          placeholder={formik.values.sessionNumber}
                          className={`form-control`}
                          id="sessionNumber"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
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
                          className={`form-control ${formik.touched.noticeOfficeDiaryNumber &&
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
                          onBlur={formik.handleBlur}
                          className={`form-control ${formik.touched.noticeOfficeDiaryDate &&
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
                          className={`form-control ${formik.touched.noticeOfficeDiaryTime &&
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
                  </div>
                  <div class="row">
                    <div class="col">
                      <div class="mb-3">
                        <label class="form-label">Question Diary No</label>
                        <input
                          type="text"
                          placeholder={formik.values.questionDiaryNumber}
                          className={`form-control ${formik.touched.questionDiaryNumber &&
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
                    <div class="col">
                      <div class="mb-3">
                        <label class="form-label">Assigned Question ID</label>
                        <input class="form-control" type="text" placeholder={formik.values.assignedquestionid} id="assignedquestionid"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur} />
                      </div>
                    </div>
                    <div class="col">
                      <div class="mb-3">
                        <label class="form-label">Category</label>
                        <select
                          className={`form-select ${formik.touched.category && formik.errors.category
                            ? "is-invalid"
                            : ""
                            }`}
                          id="category"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        >
                          <option value={""} selected disabled hidden>
                            Select
                          </option>
                          <option value={"Starred"}>Starred</option>
                          <option value={"Un-Starred"}>Un-Starred</option>
                          <option value={"Short Notice"}>Short Notice</option>
                          {formik.touched.category && formik.errors.category && (
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
                          className={`form-select ${formik.touched.mover && formik.errors.mover
                            ? "is-invalid"
                            : ""
                            }`}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          id="mover"
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
                        <input class="form-control" type="text" placeholder={formik.values.division} id="division"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur} />
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
