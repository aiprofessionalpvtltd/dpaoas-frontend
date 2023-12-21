import React, { useContext, useEffect, useState } from "react";
import { Layout } from "../../../../../components/Layout";
import { useNavigate } from "react-router-dom";
import CustomTable from "../../../../../components/CustomComponents/CustomTable";
import {
  MMSSideBarItems,
  QMSSideBarItems,
} from "../../../../../utils/sideBarItems";
import Header from "../../../../../components/Header";
import { useFormik } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import { ToastContainer } from "react-toastify";
import {
  getAllQuestionByID,
  getAllQuestionStatus,
  searchQuestion,
} from "../../../../../api/APIs";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../utils/ToastAlert";
import { AuthContext } from "../../../../../api/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

function QMSSearchQuestion() {
  const navigate = useNavigate();
  const { members, sessions } = useContext(AuthContext);

  const [currentPage, setCurrentPage] = useState(0);
  const [searchedData, setSearchedData] = useState([]);
  const [allquestionStatus, setAllQuestionStatus] = useState([]);

  const [count, setCount] = useState(null);

  const pageSize = 4; // Set your desired page size

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
    },
    onSubmit: (values) => {
      // Handle form submission here
      SearchQuestionApi(values);
    },
  });
  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  const transformLeavesData = (apiData) => {
    return apiData.map((res, index) => {
      return {
        SrNo: index,
        QID: res?.id,
        QDN: res?.fkQuestionDiaryId,
        NoticeDate: res?.noticeOfficeDiary?.noticeOfficeDiaryDate,
        NoticeTime: res?.noticeOfficeDiary?.noticeOfficeDiaryTime,
        SessionNumber: res?.session?.sessionName,
        SubjectMatter: [res?.englishText, res?.urduText]
          .filter(Boolean)
          .join(", "),
        Category: res?.questionCategory,
        // SubmittedBy: res.category,
        Status: res?.questionStatus?.questionStatus,
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
    };

    try {
      const response = await searchQuestion(searchParams);
      if (response?.success) {
        showSuccessMessage(response?.message);
        const transformedData = transformLeavesData(response?.data);
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
          state: question?.data,
          history: history?.data,
        });
      }
    } catch (error) {
      showErrorMessage(error.response?.data?.message);
    }
  };

  useEffect(() => {
    GetALlStatus();
  }, []);
  return (
    <Layout module={true} sidebarItems={QMSSideBarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/"}
        addLink1={"/qms/dashboard"}
        title1={"Question"}
        addLink2={"/qms/question/search"}
        title2={"Search Queston"}
      />
      <ToastContainer />
      <div class="container-fluid">
        <div class="card mt-4">
          <div
            class="card-header red-bg"
            style={{ background: "#14ae5c !important" }}
          >
            <h1>SEARCH QUESTIONS</h1>
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
                        placeholder={formik.values.questionDiaryNo}
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
                        placeholder={formik.values.questionID}
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
                        placeholder={formik.values.keyword}
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
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">From Session</label>
                      <select
                        class="form-select"
                        placeholder={formik.values.fromSession}
                        id="fromSession"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option selected disabled hidden>
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
                        placeholder={formik.values.toSession}
                        id="toSession"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option selected disabled hidden>
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
                        placeholder={formik.values.category}
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
                      <label class="form-label">Group</label>
                      <select
                        class="form-select"
                        placeholder={formik.values.groups}
                        id="groups"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option value={""} selected disabled hidden>
                          Selected
                        </option>
                        <option value={"1"}>saqib</option>
                        <option value={"2"}>saqib</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Question Status</label>
                      <select
                        class="form-select"
                        placeholder={formik.values.questionStatus}
                        id="questionStatus"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option value={""} selected disabled hidden>
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
                        placeholder={formik.values.noticeOfficeDiaryNo}
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
                          zIndex: "1",
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
                    <div class="mb-3">
                      <label class="form-label">To Notice Date</label>
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
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Gender</label>
                      <select class="form-select">
                        <option selected="selected" value="0">
                          Gender
                        </option>
                        <option value="1">Male</option>
                        <option value="2">Female</option>
                      </select>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Religion</label>
                      <select
                        name="ctl00$ContentPlaceHolder3$ReligionDDL"
                        id="ReligionDDL"
                        class="form-select"
                      >
                        <option selected="selected" value="0">
                          Religion
                        </option>
                        <option value="1">Islam</option>
                        <option value="2">Christianity</option>
                        <option value="3">Hinduism</option>
                        <option value="5">Sikh</option>
                        <option value="4">Other</option>
                      </select>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Not in Religion</label>
                      <select class="form-select">
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
                      <label class="form-label">File Status</label>
                      <select
                        class="form-select"
                        placeholder={formik.values.fileStatus}
                        id="fileStatus"
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
                </div>
                <div class="row">
                  <div class="col-3">
                    <div class="mb-3">
                      <label class="form-label">Division</label>
                      <input
                        class="form-control"
                        type="text"
                        placeholder={formik.values.divisions}
                        id="divisions"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                  </div>
                  <div class="col-2">
                    <div class="mb-3">
                      <div class="form-check" style={{ marginTop: "39px" }}>
                        <input
                          class="form-check-input "
                          type="checkbox"
                          id="flexCheckDefault"
                        />
                        <label class="form-check-label" for="flexCheckDefault">
                          Complete Text
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="col-2">
                    <div class="mb-3">
                      <div class="form-check" style={{ marginTop: "39px" }}>
                        <input
                          class="form-check-input "
                          type="checkbox"
                          id="flexCheckDefault"
                        />
                        <label class="form-check-label" for="flexCheckDefault">
                          Exact Match
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button class="btn btn-primary" type="submit">
                      Search
                    </button>
                    <button class="btn btn-primary" type="">
                      Reset
                    </button>
                  </div>
                </div>
              </form>
              <div class="dash-detail-container" style={{ marginTop: "20px" }}>
                <div class="row">
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
                </div>
                <CustomTable
                  headerShown={true}
                  data={searchedData}
                  handleEdit={(item) => handleEdit(item.QID)}
                  handlePageChange={handlePageChange}
                  currentPage={currentPage}
                  pageSize={pageSize}
                  headertitlebgColor={"#666"}
                  headertitletextColor={"#FFF"}
                />
              </div>
              <div class="row mt-4">
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Question Status</label>
                    <select class="form-select">
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
                    <label class="form-label">Status Date</label>
                    <DatePicker
                      // selected={formik.values.fromNoticeDate}
                      // onChange={(date) => formik.setFieldValue("fromNoticeDate", date)}
                      className={"form-control"}
                    />
                  </div>
                </div>
                <div class="col">
                  <button
                    style={{ marginTop: "30px" }}
                    class="btn btn-primary"
                    type="submit"
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
