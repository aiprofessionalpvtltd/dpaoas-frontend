import React, { useContext, useEffect, useState } from "react";
import { Layout } from "../../../../../../components/Layout";
import { QMSSideBarItems } from "../../../../../../utils/sideBarItems";
import Header from "../../../../../../components/Header";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import {
  UpdateQuestionById,
  getAllDeletedQuestions,
  getAllQuestion,
} from "../../../../../../api/APIs/Services/Question.service";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "../../../../../../api/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
const validationSchema = Yup.object({
  questionDiaryNo: Yup.number(),
  questionId: Yup.string(),
  keyword: Yup.string(),
  memberName: Yup.string(),
  fromSession: Yup.string(),
  toSession: Yup.string(),
  category: Yup.string(),
  group: Yup.string(),
  questionStatus: Yup.string(),
  noticeDiaryNo: Yup.string(),
  fromNoticeDate: Yup.string(),
  toNoticeDate: Yup.string(),
  gender: Yup.string(),
  religion: Yup.string(),
  notInReligion: Yup.string(),
  completeText: Yup.string(),
  division: Yup.string(),
});

function QMSDeleteQuestion() {
  const formik = useFormik({
    initialValues: {
      questionDiaryNo: "",
      questionId: "",
      keyword: "",
      memberName: "",
      fromSession: "",
      toSession: "",
      category: "",
      group: "",
      questionStatus: "",
      noticeDiaryNo: "",
      fromNoticeDate: "",
      toNoticeDate: "",
      gender: "",
      religion: "",
      notInReligion: "",
      completeText: "",
      division: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      handleSearchDeletedQuestion(values);
    },
  });
  const navigate = useNavigate();

  const { members, sessions } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(null);
  const [resData, setResData] = useState([]);
  const pageSize = 4; // Set your desired page size

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  const handleSearchDeletedQuestion = async (values) => {
    const Data = {
      fromSessionNo: values?.fromsessionNumber || "",
      toSessionNo: values?.tosessionNumber || "",
      questionDiaryNo: values?.questionDiaryNo || "",
      questionID: values?.questionId || "",
      keyword: values?.keyword || "",
      memberName: values?.memberName || "",
      questionCategory: values?.category || "",
      groups: values?.group || "",
      questionStatus: values?.questionStatus || "",
      noticeOfficeDiaryNo: values?.noticeDiaryNo || "",
      noticeOfficeDiaryDateFrom: values?.fromNoticeDate || "",
      noticeOfficeDiaryDateTo: values?.toNoticeDate || "",
      gender: values?.gender || "",
      religion: values?.religion || "",
      notInReligion: values?.notInReligion || "",
      completeText: values?.completeText || "",
      divisions: values?.division || "",
    };

    try {
      const response = await getAllDeletedQuestions(
        currentPage,
        pageSize,
        Data
      );
      if (response?.success) {
        showSuccessMessage(response?.message);
        setCount(response?.count);
        const transformedData = transformLeavesData(response.data?.questions);
        setResData(transformedData);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const transformLeavesData = (apiData) => {
    return apiData.map((res, index) => {
      return {
        SrNo: index,
        QID: res.id,
        // QDN: res.questionDiary,
        NoticeDate: moment(
          res?.noticeOfficeDiary?.noticeOfficeDiaryDate
        ).format("YYYY/MM/DD"),
        // NoticeTime: res?.noticeOfficeDiary?.noticeOfficeDiaryTime,
        SessionNumber: res?.session?.sessionName,
        SubjectMatter: [res?.englishText, res?.urduText]
          .filter(Boolean)
          .join(", "),
        Category: res.questionCategory,
        // SubmittedBy: res.category,
        questionStatus: res.questionStatus?.questionStatus,
        questionActive: res?.questionActive,
      };
    });
  };
  const getAllQuestionsApi = async () => {
    try {
      const response = await getAllDeletedQuestions(currentPage, pageSize);
      if (response?.success) {
        // showSuccessMessage(response?.message);
        setCount(response?.count);
        const transformedData = transformLeavesData(response.data);
        setResData(transformedData);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    getAllQuestionsApi();
  }, []);

  const recoverQuestion = async (id) => {
    console.log(id);
    const formData = new FormData();
    formData.append("questionActive", "active");

    try {
      const response = await UpdateQuestionById(id, formData);
      if (response?.success) {
        showSuccessMessage(response?.message);
        handleSearchDeletedQuestion(formik.values);
        formik.resetForm();
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const handleResetForm = () => {
    formik.resetForm();
  };

  return (
    <Layout module={true} sidebarItems={QMSSideBarItems} centerlogohide={true}>
      <ToastContainer />
      <Header
        dashboardLink={"/"}
        addLink1={"/qms/question/delete"}
        title1={"Delete Question"}
      />
      <div class="container-fluid">
        <div class="card mt-4">
          <div
            class="card-header red-bg"
            style={{ background: "#14ae5c !important" }}
          >
            <h1>DELETED QUESTIONS</h1>
          </div>
          <div class="card-body">
            <div class="container-fluid">
              <form onSubmit={formik.handleSubmit}>
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Question Diary No</label>
                      <input
                        type="text"
                        placeholder={formik.values.questionDiaryNo}
                        className={`form-control ${
                          formik.touched.questionDiaryNo &&
                          formik.errors.questionDiaryNo
                            ? "is-invalid"
                            : ""
                        }`}
                        id="questionDiaryNo"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.questionDiaryNo &&
                        formik.errors.questionDiaryNo && (
                          <div className="invalid-feedback">
                            {formik.errors.questionDiaryNo}
                          </div>
                        )}
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Question ID</label>
                      <input
                        type="text"
                        placeholder={formik.values.questionId}
                        className={`form-control ${
                          formik.touched.questionId && formik.errors.questionId
                            ? "is-invalid"
                            : ""
                        }`}
                        id="questionId"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.questionId &&
                        formik.errors.questionId && (
                          <div className="invalid-feedback">
                            {formik.errors.questionId}
                          </div>
                        )}
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Keyword</label>
                      <input
                        type="text"
                        placeholder={formik.values.keyword}
                        className={`form-control ${
                          formik.touched.keyword && formik.errors.keyword
                            ? "is-invalid"
                            : ""
                        }`}
                        id="keyword"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.keyword && formik.errors.keyword && (
                        <div className="invalid-feedback">
                          {formik.errors.keyword}
                        </div>
                      )}
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Member Name</label>
                      {/* <input
                        type="text"
                        placeholder={formik.values.memberName}
                        className={`form-control ${
                          formik.touched.memberName && formik.errors.memberName
                            ? "is-invalid"
                            : ""
                        }`}
                        id="memberName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      /> */}
                      <select
                        class={`form-select ${
                          formik.touched.memberName && formik.errors.memberName
                            ? "is-invalid"
                            : ""
                        }`}
                        placeholder={formik.values.memberName}
                        onChange={formik.handleChange}
                        id="memberName"
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
                      {formik.touched.memberName &&
                        formik.errors.memberName && (
                          <div className="invalid-feedback">
                            {formik.errors.memberName}
                          </div>
                        )}
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">From Session</label>
                      <select
                        class="form-control form-select"
                        id="fromSession"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
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
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">To Session</label>
                      <select
                        class="form-control form-select"
                        id="toSession"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
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
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Category</label>
                      <select
                        class="form-control form-select"
                        id="category"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option>Category</option>
                        <option>Starred</option>
                        <option>Un-Starred</option>
                        <option>Short Notice</option>
                      </select>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Group</label>
                      <select
                        class="form-control form-select"
                        id="group"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option>Group1</option>
                        <option>Group1</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Question Status</label>
                      <select
                        class="form-control form-select"
                        id="questionStatus"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option>Question Status</option>
                        <option>Admitted</option>
                        <option>Admitted but Lapsed</option>
                        <option>Deferred</option>
                        <option>Disallowed</option>
                        <option>Disallowed on Reconsideration</option>
                        <option>File not Available</option>
                        <option>Lapsed</option>
                        <option>NFA</option>
                        <option>Replied</option>
                        <option>Replied/Referred to Standing Committee</option>
                        <option>Under Correspondence</option>
                        <option>Under Process</option>
                        <option>Withdrawn</option>
                      </select>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Notice Diary No</label>
                      <input
                        type="text"
                        placeholder={formik.values.noticeDiaryNo}
                        className={`form-control ${
                          formik.touched.noticeDiaryNo &&
                          formik.errors.noticeDiaryNo
                            ? "is-invalid"
                            : ""
                        }`}
                        id="noticeDiaryNo"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.noticeDiaryNo &&
                        formik.errors.noticeDiaryNo && (
                          <div className="invalid-feedback">
                            {formik.errors.noticeDiaryNo}
                          </div>
                        )}
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3" style={{ position: "relative" }}>
                      <label class="form-label">From Notice Date</label>
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
                        selected={formik.values.fromNoticeDate}
                        minDate={new Date()}
                        onChange={(date) =>
                          formik.setFieldValue("fromNoticeDate", date)
                        }
                        onBlur={formik.handleBlur}
                        className={`form-control ${
                          formik.touched.fromNoticeDate &&
                          formik.errors.fromNoticeDate
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {formik.touched.fromNoticeDate &&
                        formik.errors.fromNoticeDate && (
                          <div className="invalid-feedback">
                            {formik.errors.fromNoticeDate}
                          </div>
                        )}
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3" style={{ position: "relative" }}>
                      <label class="form-label">To Notice Date</label>
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
                        selected={formik.values.toNoticeDate}
                        minDate={new Date()}
                        onChange={(date) =>
                          formik.setFieldValue("toNoticeDate", date)
                        }
                        onBlur={formik.handleBlur}
                        className={`form-control ${
                          formik.touched.toNoticeDate &&
                          formik.errors.toNoticeDate
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {formik.touched.toNoticeDate &&
                        formik.errors.toNoticeDate && (
                          <div className="invalid-feedback">
                            {formik.errors.toNoticeDate}
                          </div>
                        )}
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Gender</label>
                      <select
                        class="form-control form-select"
                        id="gender"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option>Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                      </select>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Religion</label>
                      <select
                        class="form-control form-select"
                        id="religion"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option>Religion</option>
                        <option>Islam</option>
                        <option>Christianity</option>
                        <option>Hinduism</option>
                        <option>Sikh</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Not in Religion</label>
                      <select
                        class="form-control form-select"
                        id="notInReligion"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option>Not in Religion</option>
                        <option>Islam</option>
                        <option>Christianity</option>
                        <option>Hinduism</option>
                        <option>Sikh</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <div class="form-check" style={{ marginTop: "39px" }}>
                        <input
                          class="form-check-input "
                          type="checkbox"
                          id="completeText"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <label class="form-check-label" for="flexCheckDefault">
                          {" "}
                          Complete Text
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-3">
                    <div class="mb-3">
                      <label class="form-label">Division</label>
                      <input
                        type="text"
                        placeholder={formik.values.division}
                        className={`form-control ${
                          formik.touched.division && formik.errors.division
                            ? "is-invalid"
                            : ""
                        }`}
                        id="division"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.division && formik.errors.division && (
                        <div className="invalid-feedback">
                          {formik.errors.division}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button class="btn btn-primary" type="submit">
                      Search
                    </button>
                    <button class="btn btn-primary" onClick={handleResetForm}>
                      Reset
                    </button>
                  </div>
                </div>
              </form>
              <div class="dash-detail-container" style={{ marginTop: "20px" }}>
                {/* <div class="row mb-3">
                  <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button class="btn btn-primary" type="submit">
                      Print Questions
                    </button>
                    <button class="btn btn-primary" type="submit">
                      Annual Report
                    </button>
                  </div>
                  <div class="clearfix"></div>
                </div> */}
                <CustomTable
                  hidebtn1={true}
                  data={resData || []}
                  tableTitle="Deleted Questions"
                  handlePageChange={handlePageChange}
                  currentPage={currentPage}
                  showPrint={false}
                  pageSize={pageSize}
                  showEditIcon={true}
                  hideDeleteIcon={true}
                  showRecoverIcon={true}
                  handleRecover={(item) => recoverQuestion(item?.QID)}
                  totalCount={count}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default QMSDeleteQuestion;
