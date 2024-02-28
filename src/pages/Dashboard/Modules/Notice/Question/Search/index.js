import React, { useCallback, useContext, useEffect, useState } from "react";
import { NoticeSidebarItems } from "../../../../../../utils/sideBarItems";
import { Layout } from "../../../../../../components/Layout";
import Header from "../../../../../../components/Header";
import { useNavigate } from "react-router";
import DatePicker from "react-datepicker";

import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";
import {
  getAllQuestionByID,
  getAllQuestionStatus,
  searchQuestion,
} from "../../../../../../api/APIs/Services/Question.service";
import { Field, Form, Formik, useFormik } from "formik";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "../../../../../../api/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

function SearchQuestion() {
  const navigate = useNavigate();
  const { members, sessions } = useContext(AuthContext);
  const [searchedData, setSearchedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(null);
  const [allquestionStatus, setAllQuestionStatus] = useState([]);

  const pageSize = 4; // Set your desired page size

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };
  console.log("COunt", count);
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
    },
    onSubmit: (values) => {
      // Handle form submission here
      SearchQuestionApi(values);
    },
  });

  const transformLeavesData = (apiData) => {
    return apiData.map((res, index) => {
      const subjectMatter = [res?.englishText, res?.urduText]
        .filter(Boolean)
        .join(", ");
      const cleanedSubjectMatter = subjectMatter.replace(/(<([^>]+)>)/gi, "");

      return {
        // SrNo: index,
        QID: res.id,
        // QDN: res.questionDiary.questionDiaryNo,
        NoticeDate: res?.noticeOfficeDiary?.noticeOfficeDiaryDate,
        NoticeTime: moment(
          res?.noticeOfficeDiary?.noticeOfficeDiaryTime,
          "hh:ss:a"
        ).format("hh:ss:a"),
        SessionNumber: res?.session?.sessionName,
        SubjectMatter: cleanedSubjectMatter,
        // SubjectMatter: [res?.englishText, res?.urduText]
        //   .filter(Boolean)
        //   .join(", "),
        Category: res.questionCategory,
        // SubmittedBy: res.category,
        Status: res.questionStatus?.questionStatus,
      };
    });
  };

  const SearchQuestionApi = useCallback(
    async (values) => {
      const searchParams = {
        fromSessionNo: values?.fromSession,
        toSessionNo: values?.toSession,
        memberName: values?.memberName,
        questionCategory: values?.category,
        keyword: values?.keyword,
        questionID: values?.questionID,
        questionStatus: values?.questionStatus,
        questionDiaryNo: values?.questionDiaryNo,
        noticeOfficeDiaryDateFrom: values?.fromNoticeDate,
        noticeOfficeDiaryDateTo: values?.toNoticeDate,
      };
      try {
        const response = await searchQuestion(
          searchParams,
          currentPage,
          pageSize
        );

        if (response?.success) {
          showSuccessMessage(response?.message);
          setCount(response?.data?.count);
          const transformedData = transformLeavesData(response.data?.questions);
          setSearchedData(transformedData);
        }
        // formik.resetForm();
      } catch (error) {
        showErrorMessage(error?.response?.data?.message);
      }
    },
    [currentPage, pageSize, setCount, setSearchedData]
  );
  useEffect(() => {
    if (
      formik.values.questionDiaryNo ||
      formik.values.questionID ||
      formik.values.keyword ||
      formik.values.memberName ||
      formik.values.fromSession ||
      formik.values.toSession ||
      formik.values.category ||
      formik.values.questionStatus ||
      formik.values.fromNoticeDate ||
      formik.values.toNoticeDate
    ) {
      SearchQuestionApi();
    }
  }, [currentPage]);
  // const SearchQuestionApi = async (values) => {
  //   const searchParams = {
  //     fromSessionNo: values.fromSession,
  //     toSessionNo: values.toSession,
  //     memberName: values.memberName,
  //     questionCategory: values.category,
  //     keyword: values.keyword,
  //     questionID: values.questionID,
  //     questionStatus: values.questionStatus,
  //     questionDiaryNo: values.questionDiaryNo,
  //     noticeOfficeDiaryDateFrom: values.fromNoticeDate,
  //     noticeOfficeDiaryDateTo: values.toNoticeDate,
  //   };

  //   try {
  //     const response = await searchQuestion(
  //       searchParams,
  //       currentPage,
  //       pageSize
  //     );
  //     console.log(response);
  //     if (response?.success) {
  //       showSuccessMessage(response?.message);
  //       setCount(response?.data?.count);
  //       const transformedData = transformLeavesData(response.data?.questions);
  //       setSearchedData(transformedData);
  //     }
  //     // formik.resetForm();
  //   } catch (error) {
  //     showErrorMessage(error?.response?.data?.message);
  //   }
  // };

  const GetALlStatus = async () => {
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

  // HandleEdit
  const handleEdit = async (id) => {
    try {
      const { question, history } = await getAllQuestionByID(id);

      if (question?.success) {
        navigate("/notice/question/detail", {
          state: { question: question?.data, history: history?.data },
        });
      }
    } catch (error) {
      showErrorMessage(error.response?.data?.message);
    }
  };

  useEffect(() => {
    GetALlStatus();
  }, []);

  // Handle Reset Form

  const handleResetForm = () => {
    formik.setValues({
      // Reset the form to initial values
      questionDiaryNo: "",
      questionID: "",
      keyword: "",
      memberName: "",
      fromSession: "",
      toSession: "",
      category: "",
      questionStatus: "",
      fromNoticeDate: null, // Reset date fields to null or a default date
      toNoticeDate: null,
    });
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
        addLink1={"/notice/question/search"}
        title1={"Search Question"}
      />
      <div>
        <div class="container-fluid">
          <div class="card mt-1">
            <div
              class="card-header red-bg"
              style={{ background: "#14ae5c !important" }}
            >
              <h1>SEARCH QUESTION</h1>
            </div>
            <div class="card-body">
              <div class="container-fluid">
                <form onSubmit={formik.handleSubmit}>
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label">
                            Question Diary No
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            id="questionDiaryNo"
                            value={formik.values.questionDiaryNo}
                            // placeholder={formik.values.questionDiaryNo}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label">Question ID</label>
                          <input
                            className="form-control"
                            type="number"
                            id="questionID"
                            min="0"
                            value={formik.values.questionID}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label">Keyword</label>
                          <input
                            className="form-control"
                            type="text"
                            name="keyword"
                            id="keyword"
                            value={formik.values.keyword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label">Member Name</label>
                          <select
                            class="form-select"
                            // placeholder={formik.values.memberName}
                            value={formik.values.memberName}
                            onChange={formik.handleChange}
                            id="memberName"
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
                    <div className="row">
                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label">From Session</label>
                          <select
                            class="form-select"
                            // placeholder={formik.values.fromSession}
                            value={formik.values.fromSession}
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
                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label">To Session</label>
                          <select
                            class="form-select"
                            // placeholder={formik.values.toSession}
                            value={formik.values.toSession}
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
                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label">Category</label>
                          <select
                            class="form-select"
                            // placeholder={formik.values.category}
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
                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label">Question Status</label>
                          <select
                            class="form-select"
                            value={formik.values.questionStatus}
                            // placeholder={formik.values.questionStatus}
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
                    </div>

                    <div className="row">
                      <div className="col-3">
                        <div className="mb-3" style={{ position: "relative" }}>
                          <label className="form-label">From Notice Date</label>
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
                            // minDate={new Date()}
                            onChange={(date) =>
                              formik.setFieldValue("fromNoticeDate", date)
                            }
                            className={"form-control"}
                          />
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="mb-3" style={{ position: "relative" }}>
                          <label className="form-label">To Notice Date</label>
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
                            // minDate={new Date()}
                            onChange={(date) =>
                              formik.setFieldValue("toNoticeDate", date)
                            }
                            className={"form-control"}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button className="btn btn-primary" type="submit">
                          Search
                        </button>
                        <button
                          className="btn btn-primary"
                          // type="reset"
                          type="button"
                          onClick={handleResetForm}
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                  </div>
                </form>

                <div class="" style={{ marginTop: "20px" }}>
                  <CustomTable
                    // block={true}
                    hideBtn={true}
                    hidebtn1={true}
                    data={searchedData}
                    tableTitle="Questions"
                    handlePageChange={handlePageChange}
                    currentPage={currentPage}
                    showPrint={false}
                    ActionHide={false}
                    headertitlebgColor={"#666"}
                    headertitletextColor={"#FFF"}
                    hideDeleteIcon={true}
                    pageSize={pageSize}
                    handleEdit={(item) => handleEdit(item?.QID)}
                    totalCount={count}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default SearchQuestion;
