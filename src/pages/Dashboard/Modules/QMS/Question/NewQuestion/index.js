import React, { useContext, useState } from "react";
import { Layout } from "../../../../../../components/Layout";
import Header from "../../../../../../components/Header";
import { QMSSideBarItems } from "../../../../../../utils/sideBarItems";
import { useFormik } from "formik";
import * as Yup from "yup";
import TimePicker from "react-time-picker";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";
import {
  createQuestion,
  getGroupbyDevisionId,
} from "../../../../../../api/APIs/Services/Question.service";
import { CustomAlert } from "../../../../../../components/CustomComponents/CustomAlert";
import { ToastContainer } from "react-toastify";
import DatePicker from "react-datepicker";
import { Editor } from "../../../../../../components/CustomComponents/Editor";
import { useNavigate } from "react-router";
import { AuthContext } from "../../../../../../api/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { getUserData } from "../../../../../../api/Auth";

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
});

function QMSNewQuestion() {
  const { members, sessions, allBranchesData, divisions } =
    useContext(AuthContext);
  const userData = getUserData();
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      fkSessionId: null,
      questionCategory: "",
      noticeOfficeDiaryNo: null,
      fkMemberId: null,
      noticeOfficeDiaryDate: "",
      initiatedByBranch: "",
      sentToBranch: "",
      noticeOfficeDiaryTime: "",
      englishText: "",
      urduText: "",
      fkDivisionId: "",
      questionDiaryNo: "",
      fkGroupId: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // handleShow();
      // setFormValues(values);
      CreateQuestionApi(values);
    },
    enableReinitialize: true,
  });

  const CreateQuestionApi = async (values) => {
    const formData = new FormData();
    formData.append("fkSessionId", values.fkSessionId);
    formData.append("noticeOfficeDiaryNo", Number(values.noticeOfficeDiaryNo));
    formData.append("noticeOfficeDiaryDate", values.noticeOfficeDiaryDate);
    formData.append("noticeOfficeDiaryTime", values.noticeOfficeDiaryTime);
    formData.append("questionCategory", values.questionCategory);
    formData.append("fkQuestionStatus", 3);
    formData.append("fkMemberId", values.fkMemberId);

    formData.append("englishText", values.englishText);
    formData.append("urduText", values.urduText);
    formData.append("submittedBy", userData?.fkUserId);
    formData.append("questionSentStatus", "inQuestion");
    formData.append("fkDivisionId", values?.fkDivisionId);
    formData.append("questionDiaryNo", values?.questionDiaryNo);
    formData.append("fkGroupId", values?.fkGroupId);

    try {
      const response = await createQuestion(formData);
      if (response?.success) {
        showSuccessMessage(response?.message);
        setTimeout(() => {
          navigate('/qms/search/question')
        }, 1000);
       
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const getGroupbyDevisionIdAPi = async (e) => {
    try {
      const response = await getGroupbyDevisionId(e.target.value);

      if (response?.success) {
        const groupId = response?.data?.fkGroupId || "";
        formik.setFieldValue("fkGroupId", groupId);
      } else {
        formik.setFieldValue("fkGroupId", "");
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
      formik.setFieldValue("fkGroupId", "");
    }
  };
  return (
    <Layout module={true} sidebarItems={QMSSideBarItems} centerlogohide={true}>
      <ToastContainer />
      <Header
        dashboardLink={"/"}
        addLink1={"/qms/question/new"}
        title1={"New Question"}
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
                          placeholder="Session No"
                          value={formik.values.fkSessionId}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          name="fkSessionId"
                        >
                          <option value="" selected disabled hidden>
                            Select
                          </option>
                          {sessions &&
                            sessions.map((item) => (
                              <option key={item.id} value={item.id}>
                                {item?.sessionName}
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
                  </div>
                  <div class="row">
                    <div class="col">
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

                    <div class="col">
                      <div class="mb-3">
                        <label class="form-label">Member Name</label>
                        {/* <input
                          className={`form-control ${
                            formik.touched.fkMemberId &&
                            formik.errors.fkMemberId
                              ? "is-invalid"
                              : ""
                          }`}
                          type="text"
                          id="fkMemberId"
                          value={formik.values.fkMemberId}
                          name="fkMemberId"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                        /> */}
                        <select
                          class={`form-select ${
                            formik.touched.fkMemberId &&
                            formik.errors.fkMemberId
                              ? "is-invalid"
                              : ""
                          }`}
                          placeholder={formik.values.fkMemberId}
                          onChange={formik.handleChange}
                          id="fkMemberId"
                          onBlur={formik.handleBlur}
                        >
                          <option selected disabled hidden>
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

                    <div className="col">
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
                  </div>
                  
                  <div className="row">
                    <div class="col-6">
                      <div class="mb-3">
                        <label class="form-label">Division</label>
                        <select
                          class={`form-select`}
                          placeholder="Division"
                          value={formik.values.fkDivisionId}
                          onChange={(event) => {
                            formik.handleChange(event);
                            getGroupbyDevisionIdAPi(event);
                          }}
                          onBlur={formik.handleBlur}
                          name="fkDivisionId"
                        >
                          <option value="" selected disabled hidden>
                            Select
                          </option>
                          {divisions &&
                            divisions.map((item) => (
                              <option key={item.id} value={item.id}>
                                {item?.divisionName}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="mb-3">
                        <label class="form-label">Group</label>
                        <select
                          class="form-select"
                          value={formik.values.fkGroupId}
                          id="fkGroupId"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        >
                          <option value={""} selected disabled hidden>
                            Select
                          </option>
                          <option value="1">1st Group</option>
                          <option value="2">2nd Group</option>
                          <option value="3">3rd Group</option>
                          <option value="4">4th Group</option>
                          <option value="5">5th Group</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div class="col-6">
                      <div class="mb-3">
                        <label class="form-label">Question Diary No</label>
                        <input
                          class={`form-control`}
                          type="number"
                          id="questionDiaryNo"
                          value={formik.values.questionDiaryNo}
                          name="questionDiaryNo"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
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

export default QMSNewQuestion;
