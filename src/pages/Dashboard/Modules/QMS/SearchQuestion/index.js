import React, { useContext, useEffect, useState } from "react";
import { Layout } from "../../../../../components/Layout";
import { useLocation, useNavigate } from "react-router-dom";
import CustomTable from "../../../../../components/CustomComponents/CustomTable";
import { QMSSideBarItems } from "../../../../../utils/sideBarItems";
import Header from "../../../../../components/Header";
import { useFormik } from "formik";
import DatePicker from "react-datepicker";
import { ToastContainer } from "react-toastify";
import {
  DeleteQuestion,
  getAllQuestionByID,
  getAllQuestionStatus,
  searchQuestion,
  updateQuestionStatus,
} from "../../../../../api/APIs/Services/Question.service";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../utils/ToastAlert";
import { AuthContext } from "../../../../../api/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { getUserData } from "../../../../../api/Auth";
import { DeleteModal } from "../../../../../components/DeleteModal";
import { Button, Modal } from "react-bootstrap";

function QMSSearchQuestion() {
  const navigate = useNavigate();
  const location = useLocation();
  const { members, sessions, currentSession } = useContext(AuthContext);
  const UserData = getUserData();
  const [currentPage, setCurrentPage] = useState(0);
  const [searchedData, setSearchedData] = useState([]);
  const [allquestionStatus, setAllQuestionStatus] = useState([]);
  const [isChecked, setIsChecked] = useState([]);
  const [questionStatus, setQuestionStatus] = useState("");
  const [statusDate, setStatusDate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [count, setCount] = useState(null);
  const [deleteModalRemarksValue, setDeleteModalRemarksValue] = useState(null);

  const pageSize = 10; // Set your desired page size
  console.log("currentSession", currentSession);

  const formik = useFormik({
    initialValues: {
      questionDiaryNo: "",
      questionID: "",
      keyword: "",
      memberName: "",
      fromSession: "",
      toSession: "",
      category: "",
      questionStatus: "",
      fromNoticeDate: "",
      toNoticeDate: "",
      divisions: "",
      noticeOfficeDiaryNo: "",
      fileStatus: "",
      groups: "",
      religion: "",
      gender: "",
      memberPosition: "",
    },
    onSubmit: (values) => {
      // Handle form submission here
      // console.log(values.memberPosition);
      SearchQuestionApi(values);
    },
  });
  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const transformLeavesData = (apiData) => {
    return apiData.map((res, index) => {
      const subjectMatter = [res?.englishText, res?.urduText]
        .filter(Boolean)
        .join(", ");
      const cleanedSubjectMatter = subjectMatter.replace(/(<([^>]+)>)/gi, "");
      return {
        SrNo: index,
        QID: res?.id,
        internalId: res?.id,
        noticeOfficeDiaryNo: res?.noticeOfficeDiary?.noticeOfficeDiaryNo,
        NoticeDate: moment(
          res?.noticeOfficeDiary?.noticeOfficeDiaryDate
        ).format("DD/MM/YYYY"),
        NoticeTime: moment(
          res?.noticeOfficeDiary?.noticeOfficeDiaryTime,
          "hh:ss:a"
        ).format("hh:ss:a"),
        SessionNumber: res?.session?.sessionName,
        SubjectMatter: cleanedSubjectMatter,
        Category: res?.questionCategory,
        // SubmittedBy: res.category,
        questionStatus: res?.questionStatus?.questionStatus,
        // memberPosition:res?.memberPosition,
        // CreatedBy:res?.questionSentStatus === "inQuestion" && "Question",
        // SubmittedBy: res?.questionSubmittedBy ? `${res?.questionSubmittedBy?.employee?.firstName} ${res?.questionSubmittedBy?.employee?.lastName}`:"--",
        // deletedByUser: res?.questionDeletedBy ? `${res?.questionDeletedBy.employee?.firstName} ${res?.questionDeletedBy.employee?.lastName}` :"--",
        // remarks:res?.description,
        // Status:res?.questionActive
      };
    });
  };

  const SearchQuestionApi = async (values) => {
    const searchParams = {
      fromSessionNo: values.fromSession,
      toSessionNo: values.toSession,
      memberName: values.memberName,
      questionCategory: values.category,
      keyword: values.keyword,
      questionID: values?.questionID,
      questionStatus: values.questionStatus,
      questionDiaryNo: values.questionDiaryNo,
      noticeOfficeDiaryDateFrom: values.fromNoticeDate,
      noticeOfficeDiaryDateTo: values.toNoticeDate,
      fileStatus: values.fileStatus,
      groups: values.groups,
      divisions: values.divisions,
      memberPosition: values?.memberPosition,
      questionSentStatus: "inQuestion",
      gender: values?.gender,
      religion: values?.religion,
      noticeOfficeDiaryNo: values?.noticeOfficeDiaryNo,
    };

    try {
      const response = await searchQuestion(
        searchParams,
        currentPage,
        pageSize
      );
      if (response?.success) {
        showSuccessMessage(response?.message);
        const transformedData = transformLeavesData(response?.data?.questions);
        setCount(response?.data?.count)
        setSearchedData(transformedData);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const GetALlStatus = async () => {
    try {
      const response = await getAllQuestionStatus();
      if (response?.success) {
        setAllQuestionStatus(response?.data);
        // showSuccessMessage(response.message)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (id) => {
    try {
      const { question, history } = await getAllQuestionByID(id);

      if (question?.success) {
        navigate("/qms/question/detail", {
          state: { question: question?.data, history: history?.data },
        });
      }
    } catch (error) {
      showErrorMessage(error.response?.data?.message);
    }
  };

  const hendlePrint = async (id) => {
    const encodedJsonString = encodeURIComponent(id);
    const url = `/qms/search/question/preview-pdf?state=${encodedJsonString}`;
    window.open(url, "_blank");
  };

  const handleChangeStatus = async (id) => {
    try {
      const data = {
        isChecked,
        questionStatus: questionStatus,
        statusDate: statusDate,
        deferredBy: UserData?.fkUserId,
      };

      const response = await updateQuestionStatus(data);
      showSuccessMessage(response.message);
      SearchQuestionApi(formik.values);
      setQuestionStatus(null);
      setStatusDate(null);
      setIsChecked([]);
    } catch (error) {
      showErrorMessage(error.response?.data?.message);
    }
  };
  const hendleDelete = async () => {
    const Data = {
      deletedBy: UserData?.fkUserId,
      description: deleteModalRemarksValue,
    };
    try {
      const response = await DeleteQuestion(deleteId, Data);
      if (response?.success) {
        showSuccessMessage(response?.message);
        SearchQuestionApi(formik.values);
        toggleModal();
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    GetALlStatus();
  }, []);

  useEffect(() => {
    if (location?.state) {
      const dashboardData = transformLeavesData(location?.state);
      setSearchedData(dashboardData);
    } else {
      const values = { fromSession: currentSession?.id };
      SearchQuestionApi(values);
    }
  }, [location?.state, currentSession, currentPage]);

  // Handle Reset Form

  const handleResetForm = () => {
    formik.resetForm({});
  };

  return (
    <Layout module={true} sidebarItems={QMSSideBarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/"}
        addLink1={"/qms/search/question"}
        title1={"Search Queston"}
      />
      <ToastContainer />
      <DeleteModal
        title="Delete Question"
        isOpen={isModalOpen}
        toggleModal={toggleModal}
      >
        <div class="row">
          <div class="col">
            <div class="mb-3">
              <label class="form-label">Remarks</label>
              <textarea
                class="form-control"
                id="comment"
                name="comment"
                onChange={(e) => setDeleteModalRemarksValue(e.target.value)}
                value={deleteModalRemarksValue}
              ></textarea>
            </div>
          </div>
        </div>

        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              hendleDelete();
            }}
          >
            Submit
          </Button>
          <Button variant="secondary" onClick={toggleModal}>
            Close
          </Button>
        </Modal.Footer>
      </DeleteModal>
      <div class="container-fluid">
        <div class="card mt-4">
          <div
            class="card-header red-bg"
            style={{ background: "#14ae5c !important" }}
          >
            <h1>Search</h1>
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
                        className={"form-control"}
                        id="questionDiaryNo"
                        value={formik.values.questionDiaryNo}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Question ID</label>
                      <input
                        class="form-control"
                        type="text"
                        value={formik.values.questionID}
                        className={"form-control"}
                        id="questionID"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Keyword</label>
                      <input
                        class="form-control"
                        type="text"
                        value={formik.values.keyword}
                        className={"form-control"}
                        id="keyword"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Member Name</label>
                      <select
                        class="form-select"
                        value={formik.values.memberName}
                        onChange={formik.handleChange}
                        id="memberName"
                        onBlur={formik.handleBlur}
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
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">From Session</label>
                      <select
                        class="form-select"
                        value={formik.values.fromSession}
                        id="fromSession"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option value={""} selected disabled hidden>
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
                        class="form-select"
                        value={formik.values.toSession}
                        id="toSession"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option value={""} selected disabled hidden>
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
                        class="form-select"
                        value={formik.values.category}
                        id="category"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option value={" "} selected disabled hidden>
                          Select
                        </option>
                        <option value={"Starred"}>Starred</option>
                        <option value={"Un-Starred"}>Un-Starred</option>
                        <option value={"Short Notice"}>Short Notice</option>
                      </select>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Member Position</label>
                      <select
                        class={`form-select ${
                          formik.touched.memberPosition &&
                          formik.errors.memberPosition
                            ? "is-invalid"
                            : ""
                        }`}
                        placeholder="Member Position"
                        value={formik.values.memberPosition}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="memberPosition"
                      >
                        <option value="" selected disabled hidden>
                          Select
                        </option>
                        <option value={"Treasury"}>Treasury</option>
                        <option value={"Opposition"}>Opposition</option>
                        <option value={"Independent"}>Independent</option>
                        <option value={"Anyside"}>Anyside</option>
                      </select>
                      {formik.touched.memberPosition &&
                        formik.errors.memberPosition && (
                          <div className="invalid-feedback">
                            {formik.errors.memberPosition}
                          </div>
                        )}
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Question Status</label>
                      <select
                        class="form-select"
                        value={formik.values.questionStatus}
                        id="questionStatus"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option value="" selected disabled hidden>
                          Select
                        </option>
                        {allquestionStatus &&
                          allquestionStatus.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item?.questionStatus}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Notice Diary No</label>
                      <input
                        class="form-control"
                        type="text"
                        value={formik.values.noticeOfficeDiaryNo}
                        id="noticeOfficeDiaryNo"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
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
                          color: "#666",
                        }}
                      >
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </span>
                      <DatePicker
                        selected={formik.values.fromNoticeDate}
                        onChange={(date) =>
                          formik.setFieldValue("fromNoticeDate", date)
                        }
                        className={"form-control"}
                      />
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
                          color: "#666",
                        }}
                      >
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </span>
                      <DatePicker
                        selected={formik.values.toNoticeDate}
                        onChange={(date) =>
                          formik.setFieldValue("toNoticeDate", date)
                        }
                        className={"form-control"}
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-3">
                    <div class="mb-3">
                      <label class="form-label">Gender</label>
                      <select
                        class="form-select"
                        value={formik.values.gender}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        id="gender"
                        name="gender"
                      >
                        <option value={""} selected disabled hidden>
                          Gender
                        </option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-3">
                    <div class="mb-3">
                      <label class="form-label">Religion</label>
                      <select
                        value={formik.values.religion}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        id="religion"
                        name="religion"
                        class="form-select"
                      >
                        <option selected value="" disabled hidden>
                          Religion
                        </option>
                        <option value="Islam">Islam</option>
                        <option value="Christianity">Christianity</option>
                        <option value="Hinduism">Hinduism</option>
                        <option value="Sikh">Sikh</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button class="btn btn-primary" type="submit">
                      Search
                    </button>
                    <button
                      class="btn btn-primary"
                      type="button"
                      onClick={handleResetForm}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </form>
              <div class="dash-detail-container" style={{ marginTop: "20px" }}>
                {/* <div class="row">
                  <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button class="btn btn-primary mb-3" type="submit">
                      Print Questions
                    </button>
                    <button class="btn btn-primary mb-3" type="submit">
                      Annual Report
                    </button>
                    <button class="btn btn-warning mb-3" type="submit">
                      Defferd Questions
                    </button>
                  </div>
                </div> */}
                <CustomTable
                  block={false}
                  headerShown={true}
                  data={searchedData}
                  handleEdit={(item) => handleEdit(item.QID)}
                  handleDelete={(item) => {
                    toggleModal();
                    setDeleteId(item.QID);
                  }}
                  handlePageChange={handlePageChange}
                  currentPage={currentPage}
                  pageSize={pageSize}
                  headertitlebgColor={"#666"}
                  headertitletextColor={"#FFF"}
                  isChecked={isChecked}
                  setIsChecked={setIsChecked}
                  isCheckbox={true}
                  showPrint={true}
                  totalCount={count}
                  handlePrint={(item) => hendlePrint(item.QID)}
                />
              </div>
              <div class="row mt-4">
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Question Status</label>
                    <select
                      class="form-select"
                      onChange={(e) => setQuestionStatus(e.target.value)}
                    >
                      <option value={""} selected>
                        Select
                      </option>
                      {allquestionStatus &&
                        allquestionStatus.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item?.questionStatus}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3" style={{ position: "relative" }}>
                    <label class="form-label">Status Date</label>
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
                      minDate={new Date()}
                      selected={statusDate}
                      onChange={(date) => setStatusDate(date)}
                      className={"form-control"}
                    />
                  </div>
                </div>
                <div class="col">
                  <button
                    style={{ marginTop: "30px" }}
                    class="btn btn-primary"
                    onClick={handleChangeStatus}
                  >
                    Change Status
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default QMSSearchQuestion;
