import React, { useContext, useEffect, useState } from "react";
import { NoticeSidebarItems } from "../../../../../../utils/sideBarItems";
import { Layout } from "../../../../../../components/Layout";
import Header from "../../../../../../components/Header";
import { useNavigate } from "react-router";
import TimePicker from "react-time-picker";
import { createQuestion } from "../../../../../../api/APIs/Services/Question.service";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";
import * as Yup from "yup";
import { useFormik } from "formik";
import { CustomAlert } from "../../../../../../components/CustomComponents/CustomAlert";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { Editor } from "../../../../../../components/CustomComponents/Editor";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "../../../../../../api/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { getUserData } from "../../../../../../api/Auth";
import moment from "moment";

const validationSchema = Yup.object({
  // fkSessionId: Yup.number().required("Session No is required"),
  questionCategory: Yup.string().required("Category is required"),
  noticeOfficeDiaryNo: Yup.number().required(
    "Notice office diary No is required"
  ),
  fkMemberId: Yup.number().required("Member id is required"),
  noticeOfficeDiaryDate: Yup.string().required(
    "Notice Office Diary Date is required"
  ),
  //   noticeOfficeDiaryTime: Yup.string().required('Notice Office Diary Time is required'),
  // englishText: Yup.string().required('English Text is required'),
  // urduText: Yup.string().required('Urdu Text is required'),
});

function NewQuestion() {
  const navigate = useNavigate();
  const { members, sessions, allBranchesData } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [formValues, setFormValues] = useState([]);
  const [filesData, setFilesData] = useState();
  const sessionId = sessions && sessions.map((item) => item?.id);
  const UserData = getUserData();
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const handleOkClick = () => {
    CreateQuestionApi(formValues);
    handleClose();
  };

  const formik = useFormik({
    initialValues: {
      fkSessionId: "",
      questionCategory: "",
      noticeOfficeDiaryNo: null,
      fkMemberId: null,
      noticeOfficeDiaryDate: "",
      noticeOfficeDiaryTime: "",
      englishText: "",
      urduText: "",
      questionImage: [],
      initiatedByBranch: "",
      sentToBranch: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleShow();
      setFormValues(values);
    },
    enableReinitialize: true,
  });

  const CreateQuestionApi = async (values) => {
    const formData = new FormData();
    formData.append("fkSessionId", values?.fkSessionId);
    formData.append("noticeOfficeDiaryNo", Number(values.noticeOfficeDiaryNo));
    formData.append("noticeOfficeDiaryDate", values.noticeOfficeDiaryDate);
    formData.append("noticeOfficeDiaryTime", values?.noticeOfficeDiaryTime);
    formData.append("questionCategory", values.questionCategory);
    formData.append("fkQuestionStatus", 12);
    formData.append("fkMemberId", values.fkMemberId);
    formData.append("initiatedByBranch", values.initiatedByBranch);
    formData.append("sentToBranch", values.sentToBranch);
    formData.append("createdByUser", UserData && UserData?.id);
    formData.append("englishText", values.englishText);
    formData.append("urduText", values.urduText);
    // formData.append("questionImage", values.questionImage);
    // Array.from(values.questionImage).forEach((file, index) => {
    //   formData.append(`questionImage[${index}]`, file);
    // });
    Array.from(values.questionImage).map((file, index) => {
      formData.append(`questionImage`, file);
    });

    try {
      const response = await createQuestion(formData);
      if (response?.success) {
        showSuccessMessage(response?.message);
        formik.resetForm();
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const handleProcedureContentChange = (content) => {
    console.log(content);
  };

  return (
    <Layout
      module={true}
      sidebarItems={NoticeSidebarItems}
      centerlogohide={true}
    >
      <ToastContainer />
      <Header
        dashboardLink={"/"}
        addLink1={"/notice/question/new"}
        title1={"New Question"}
      />

      <CustomAlert
        showModal={showModal}
        handleClose={handleClose}
        handleOkClick={handleOkClick}
      />

      <div>
        <div class="container-fluid">
          <div class="card mt-1">
            <div
              class="card-header red-bg"
              style={{ background: "#14ae5c !important" }}
            >
              <h1>NEW QUESTION</h1>
            </div>
            <div class="card-body">
              <form onSubmit={formik.handleSubmit}>
                <div class="container-fluid">
                  <div class="row">
                    <div class="col">
                      <div class="mb-3">
                        <label class="form-label">Session No</label>
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
                        </select>
                        {formik.touched.fkSessionId &&
                          formik.errors.fkSessionId && (
                            <div className="invalid-feedback">
                              {formik.errors.fkSessionId}
                            </div>
                          )}
                      </div>
                    </div>

                    <div class="col">
                      <div class="mb-3">
                        <label class="form-label">Category</label>
                        <select
                          class={`form-select ${
                            formik.touched.questionCategory &&
                            formik.errors.questionCategory
                              ? "is-invalid"
                              : ""
                          }`}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.questionCategory || ""}
                          name="questionCategory"
                        >
                          <option value="" selected disabled hidden>
                            Select
                          </option>
                          <option value="Starred">Starred</option>
                          <option value="Un-Starred">Un-Starred</option>
                          <option value="Short Notice">Short Notice</option>
                        </select>
                        {formik.touched.questionCategory &&
                          formik.errors.questionCategory && (
                            <div class="invalid-feedback">
                              {formik.errors.questionCategory}
                            </div>
                          )}
                      </div>
                    </div>
                    <div class="col">
                      <div class="mb-3">
                        <label class="form-label">Notice Office Diary No</label>
                        <input
                          className={`form-control ${
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
                    <div class="col">
                      <div class="mb-3">
                        <label class="form-label">Member Name</label>

                        <select
                          className={`form-select ${
                            formik.touched.fkMemberId &&
                            formik.errors.fkMemberId
                              ? "is-invalid"
                              : ""
                          }`}
                          // placeholder={formik.values.fkMemberId}
                          value={formik.values.fkMemberId}
                          onChange={formik.handleChange}
                          id="fkMemberId"
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
                        </select>
                        {formik.touched.fkMemberId &&
                          formik.errors.fkMemberId && (
                            <div class="invalid-feedback">
                              {formik.errors.fkMemberId}
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div className="col-3">
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
                          // minDate={new Date()}
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

                    <div className="col-3">
                      <div className="mb-3">
                        <label className="form-label">
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
                          className={`form-control`}
                        />
                      </div>
                    </div>
                    <div class="col-3">
                      <div class="mb-3">
                        <label class="form-label">From Branch</label>
                        <select
                          class={`form-select ${
                            formik.touched.initiatedByBranch &&
                            formik.errors.initiatedByBranch
                              ? "is-invalid"
                              : ""
                          }`}
                          // placeholder="Session No"
                          value={formik.values.initiatedByBranch}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          name="initiatedByBranch"
                        >
                          <option value="" selected disabled hidden>
                            Select
                          </option>
                          {allBranchesData &&
                            allBranchesData.length > 0 &&
                            allBranchesData.map((item) => (
                              <option key={item.id} value={item.id}>
                                {item.branchName}
                              </option>
                            ))}
                        </select>
                        {formik.touched.initiatedByBranch &&
                          formik.errors.initiatedByBranch && (
                            <div className="invalid-feedback">
                              {formik.errors.initiatedByBranch}
                            </div>
                          )}
                      </div>
                    </div>

                    <div class="col-3">
                      <div class="mb-3">
                        <label class="form-label">To Branch</label>
                        <select
                          class={`form-select ${
                            formik.touched.sentToBranch &&
                            formik.errors.sentToBranch
                              ? "is-invalid"
                              : ""
                          }`}
                          // placeholder="Session No"
                          value={formik.values.sentToBranch}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          name="sentToBranch"
                        >
                          <option value="" selected disabled hidden>
                            Select
                          </option>
                          {allBranchesData &&
                            allBranchesData.length > 0 &&
                            allBranchesData.map((item) => (
                              <option key={item.id} value={item.id}>
                                {item.branchName}
                              </option>
                            ))}
                        </select>
                        {formik.touched.sentToBranch &&
                          formik.errors.sentToBranch && (
                            <div className="invalid-feedback">
                              {formik.errors.sentToBranch}
                            </div>
                          )}
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div className="col-3">
                      <div className="mb-3">
                        <label htmlFor="formFile" className="form-label">
                          Question Image
                        </label>
                        <input
                          className="form-control"
                          type="file"
                          accept=".pdf, .jpg, .jpeg, .png"
                          id="formFile"
                          name="questionImage"
                          multiple
                          onChange={(event) => {
                            formik.setFieldValue(
                              "questionImage",
                              event.currentTarget.files
                            );
                          }}
                        />
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

                  <div class="row">
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                      <button class="btn btn-primary" type="submit">
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default NewQuestion;
