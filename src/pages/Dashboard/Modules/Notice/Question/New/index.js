import React, { useEffect, useState } from "react";
import { NoticeSidebarItems } from "../../../../../../utils/sideBarItems";
import { Layout } from "../../../../../../components/Layout";
import Header from "../../../../../../components/Header";
import { useNavigate } from "react-router";
import { createQuestion, createResolution, getAllSessions } from "../../../../../../api/APIs";
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

const validationSchema = Yup.object({
    // fkSessionId: Yup.number().required("Session No is required"),
    questionCategory: Yup.string().required("Category is required"),
  noticeOfficeDiaryNo: Yup.number().required("Notice office diary No is required"),
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
  const [showModal, setShowModal] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [formValues, setFormValues] = useState([]);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const handleOkClick = () => {
    CreateQuestionApi(formValues);
    handleClose();
  };

  const formik = useFormik({
    initialValues: {
      fkSessionId: null,
      questionCategory: "",
      noticeOfficeDiaryNo: null,
      fkMemberId: null,
      noticeOfficeDiaryDate: "",
      noticeOfficeDiaryTime: "",
      englishText: "",
      urduText: "",
      questionImage: null,
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
    formData.append("fkSessionId", 1);
    formData.append("noticeOfficeDiaryNo", Number(values.noticeOfficeDiaryNo));
    formData.append("noticeOfficeDiaryDate", values.noticeOfficeDiaryDate);
    formData.append("noticeOfficeDiaryTime", "11:40am");
    formData.append("questionCategory", values.questionCategory);
    formData.append("fkQuestionStatus", 3);
    formData.append("fkMemberId", values.fkMemberId);

    formData.append("englishText", "English text");
    formData.append("urduText", "Urdu text");
    formData.append("questionImage", values.questionImage);

    try {
      const response = await createQuestion(formData);
      if (response?.success) {
        showSuccessMessage(response?.message);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const getAllSessionsApi = async () => {
    try {
      const response = await getAllSessions();
      if (response?.success) {
        setSessions(response?.data);
      }
    } catch (error) {
      // showErrorMessage(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getAllSessionsApi();
  }, []);

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
        addLink1={"/notice/dashboard"}
        addLink2={"/notice/question/new"}
        title1={"Notice"}
        title2={"New Question"}
      />

      <CustomAlert
        showModal={showModal}
        handleClose={handleClose}
        handleOkClick={handleOkClick}
      />

      <div  >
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
                          <option value="Starred">
                            Starred
                          </option>
                          <option value="Un-Starred">
                            Un-Starred
                          </option>
                          <option value="Short Notice">
                            Short Notice
                          </option>
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
                        <label class="form-label">Member ID</label>
                        <input
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
                        />
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
                      <div className="mb-3">
                        <label className="form-label">
                          Notice Office Diary Date{" "}
                        </label>
                        <DatePicker
                          selected={formik.values.noticeOfficeDiaryDate}
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
                        <input
                          className="form-control"
                          type="text"
                          id="noticeOfficeDiaryTime"
                          value={formik.values.noticeOfficeDiaryTime}
                          name="noticeOfficeDiaryTime"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div className="col-6">
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
                          onChange={(event) => {
                            formik.setFieldValue(
                              "questionImage",
                              event.currentTarget.files[0]
                            );
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: 10 }}>
                    <Editor
                      title={"English Text"}
                      onChange={handleProcedureContentChange}
                    />
                  </div>

                  <div style={{ marginTop: 70, marginBottom: 40 }}>
                    <Editor
                      title={"Urdu Text"}
                      onChange={handleProcedureContentChange}
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
