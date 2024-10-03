import React, { useCallback, useContext, useEffect, useState } from "react";
import { QMSSideBarItems, TMSsidebarItems } from "../../../../../utils/sideBarItems";
import { Layout } from "../../../../../components/Layout";
import Header from "../../../../../components/Header";
import { useNavigate } from "react-router";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../utils/ToastAlert";
import {
  getAllQuestion,
  getAllQuestionByID,
  getAllQuestionStatus,
  searchQuestion,
} from "../../../../../api/APIs/Services/Question.service";
import { useFormik } from "formik";
import CustomTable from "../../../../../components/CustomComponents/CustomTable";
import { ToastContainer } from "react-toastify";
import DatePicker from "react-datepicker";
import { AuthContext } from "../../../../../api/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import Select from "react-select";

function TMSQuestion() {
  const navigate = useNavigate();
  const { members, sessions } = useContext(AuthContext);
  const [resData, setResData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [allquestionStatus, setAllQuestionStatus] = useState([]);
  const [count, setCount] = useState(null);
  const [isFromNoticeOpen, setIsFromNoticeOpen] = useState(false);
  const [isToNoticeOpen, setIsToNoticeOpen] = useState(false);
  const [searchingFlag, setSearchingFlag] = useState(false);
  const pageSize = 10; // Set your desired page size

  console.log(searchingFlag);
  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
    if (
      formik?.values?.questionDiaryNo ||
      formik?.values?.questionID ||
      formik?.values?.keyword ||
      formik?.values?.memberName ||
      formik?.values?.fromSession ||
      formik?.values?.toSession ||
      formik?.values?.category ||
      formik?.values?.questionStatus ||
      formik?.values?.fromNoticeDate ||
      formik?.values?.toNoticeDate
    ) {
      SearchQuestionApi(formik?.values, page);
    }
    // SearchQuestionApi(formik?.values, page);
  };

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
      SearchQuestionApi(values, currentPage);
    },
  });

  // Handle From Notice Date Claneder Toggel
  const handleFromNoticeCalendarToggle = () => {
    setIsFromNoticeOpen(!isFromNoticeOpen);
  };
  // Handale From Notice DateCHange
  const handleFromNoticeDateSelect = (date) => {
    formik.setFieldValue("fromNoticeDate", date);
    setIsFromNoticeOpen(false);
  };

  // Handle To Notice Date Claneder Toggel
  const handleToNoticeCalendarToggle = () => {
    setIsToNoticeOpen(!isToNoticeOpen);
  };
  // Handale To Notice DateCHange
  const handleToNoticeDateSelect = (date) => {
    formik.setFieldValue("toNoticeDate", date);

    setIsToNoticeOpen(false);
  };

  const transformLeavesData = (apiData) => {
    return apiData.map((res, index) => {
      const subjectMatter = [res?.englishText, res?.urduText]
        .filter(Boolean)
        .join(", ");
      const cleanedSubjectMatter = subjectMatter.replace(/(<([^>]+)>)/gi, "");

      return {
        // SrNo: index + 1,
        Id: res?.id,
        MemberName: res?.member ? res?.member?.memberName :"--",
        noticeOfficeDiaryNumber: res?.noticeOfficeDiary?.noticeOfficeDiaryNo
          ? res?.noticeOfficeDiary?.noticeOfficeDiaryNo
          : "",
        NoticeDate: res?.noticeOfficeDiary?.noticeOfficeDiaryDate
          ? moment(res?.noticeOfficeDiary?.noticeOfficeDiaryDate).format(
              "DD-MM-YYYY"
            )
          : "",
        NoticeTime: res?.noticeOfficeDiary?.noticeOfficeDiaryTime
          ? moment(
              res?.noticeOfficeDiary?.noticeOfficeDiaryTime,
              "hh:mm A"
            ).format("hh:mm A")
          : "",
        SessionNumber: res?.session?.sessionName
          ? res?.session?.sessionName
          : "",
        SubjectMatter: cleanedSubjectMatter ? cleanedSubjectMatter : "",
        Category: res.questionCategory ? res.questionCategory : "",
        Status: res.questionStatus?.questionStatus
          ? res.questionStatus?.questionStatus
          : "",
          device:res?.device,
          createdBy:res?.questionSentStatus === "toQuestion" ? "Notice Office": "---"
      };
    });
  };
  const SearchQuestionApi = useCallback(
    async (values, page) => {
      setSearchingFlag(true);
      const searchParams = {
        fromSessionNo: values?.fromSession,
        toSessionNo: values?.toSession,
        memberName: values?.memberName?.value,
        questionCategory: values?.category,
        keyword: values?.keyword,
        questionID: values?.questionID,
        questionStatus: values?.questionStatus,
        questionDiaryNo: values?.questionDiaryNo,
        noticeOfficeDiaryDateFrom:
          values?.fromNoticeDate &&
          moment(values?.fromNoticeDate).format("YYYY-MM-DD"),
        noticeOfficeDiaryDateTo:
          values?.toNoticeDate &&
          moment(values?.toNoticeDate).format("YYYY-MM-DD"),
          questionSentStatus:"toQuestion"
      };
      try {
        const response = await searchQuestion(searchParams, page, pageSize);

        if (response?.success) {
          showSuccessMessage(response?.message);
          setCount(response?.data?.count);
          const transformedData = transformLeavesData(response.data?.questions);
          setResData(transformedData);
        }
        // formik.resetForm();
      } catch (error) {
        showErrorMessage(error?.response?.data?.message);
      } finally {
        setSearchingFlag(false); // Set searching flag back to false
      }
    },
    [pageSize, setCount, setResData]
  );

  // HandleEdit
  const handleEdit = async (id) => {
    try {
      const { question, history } = await getAllQuestionByID(id);

      if (question?.success) {
        navigate("/tms/question/questionTranslation", {
          state: { question: question?.data, history: history?.data },
        });
      }
    } catch (error) {
      showErrorMessage(error.response?.data?.message);
    }
  };

  const getAllQuestionsApi = useCallback(async () => {
    const questionSentStatus = "toQuestion"
    try {
      const response = await getAllQuestion(currentPage, pageSize, questionSentStatus);
      if (response?.success) {
        const transformedData = transformLeavesData(response?.data?.questions);
        setCount(response?.data?.count);
        setResData(transformedData);
      }
    } catch (error) {
      console.log(error);
    }
  }, [currentPage, pageSize, setCount, setResData]);

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

  useEffect(() => {
    GetALlStatus();
  }, []);

  // useEffect(() => {
  //   getAllQuestionsApi();
  // }, [getAllQuestionsApi]);

  useEffect(() => {
    if (
      formik?.values?.questionDiaryNo ||
      formik?.values?.questionID ||
      formik?.values?.keyword ||
      formik?.values?.memberName ||
      formik?.values?.fromSession ||
      formik?.values?.toSession ||
      formik?.values?.category ||
      formik?.values?.questionStatus ||
      formik?.values?.fromNoticeDate ||
      formik?.values?.toNoticeDate
    ) {
      return;
    }
    getAllQuestionsApi();
  }, [getAllQuestionsApi, formik?.values]);
  // Handle Reset Form
  const handleResetForm = () => {
    formik.resetForm();
    getAllQuestionsApi();
  };

  return (
    <Layout module={true} sidebarItems={TMSsidebarItems} centerlogohide={true}>
      <ToastContainer />
      <Header
        dashboardLink={"/"}
        addLink1={"/qms/notice/notice-question"}
        title1={"Questions"}
      />
     <div>
        <div class="container-fluid">
          <div class="card mt-1">
            <div
              class="card-header red-bg"
              style={{ background: "#14ae5c !important" }}
            >
              <h1>Questions List</h1>
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
                            // placeholder={formik.values.questionDiaryNo}
                            value={formik.values.questionDiaryNo}
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
                            min={"1"}
                            value={formik.values.questionID}
                            id="questionID"
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
                            value={formik.values.keyword}
                            name="keyword"
                            id="keyword"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label">Member Name</label>
                          <Select
                            options={members.map((item) => ({
                              value: item.id,
                              label: item.memberName,
                            }))}
                            onChange={(selectedOptions) =>
                              formik.setFieldValue(
                                "memberName",
                                selectedOptions
                              )
                            }
                            onBlur={formik.handleBlur}
                            value={formik.values.memberName}
                            name="memberName"
                          />
                          {formik.touched.memberName &&
                            formik.errors.memberName && (
                              <div class="invalid-feedback">
                                {formik.errors.memberName}
                              </div>
                            )}
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
                            id="toSession"
                            // placeholder={formik.values.toSession}
                            value={formik.values.toSession}
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
                            // placeholder={formik.values.questionStatus}
                            value={formik.values.questionStatus}
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

                    {/* <div className="row">
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
                    </div> */}

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
                              color: "#666",
                              cursor: "pointer",
                            }}
                            onClick={handleFromNoticeCalendarToggle}
                          >
                            <FontAwesomeIcon icon={faCalendarAlt} />
                          </span>

                          <DatePicker
                            selected={formik.values.fromNoticeDate}
                            onChange={handleFromNoticeDateSelect}
                            onBlur={formik.handleBlur}
                            className={`form-control ${
                              formik.touched.fromNoticeDate &&
                              formik.errors.fromNoticeDate
                                ? "is-invalid"
                                : ""
                            }`}
                            dateFormat="dd-MM-yyyy"
                            maxDate={new Date()}
                            open={isFromNoticeOpen}
                            onClickOutside={() => setIsFromNoticeOpen(false)}
                            onInputClick={handleFromNoticeCalendarToggle}
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
                              color: "#666",
                              cursor: "pointer",
                            }}
                            onClick={handleToNoticeCalendarToggle}
                          >
                            <FontAwesomeIcon icon={faCalendarAlt} />
                          </span>

                          <DatePicker
                            selected={formik.values.toNoticeDate}
                            onChange={handleToNoticeDateSelect}
                            onBlur={formik.handleBlur}
                            className={`form-control ${
                              formik.touched.toNoticeDate &&
                              formik.errors.toNoticeDate
                                ? "is-invalid"
                                : ""
                            }`}
                            maxDate={new Date()}
                            open={isToNoticeOpen}
                            onClickOutside={() => setIsToNoticeOpen(false)}
                            onInputClick={handleToNoticeCalendarToggle}
                            dateFormat="dd-MM-yyyy"
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
                          type="button"
                          onClick={handleResetForm}
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                  </div>
                </form>

                <div
                  class="dash-detail-container"
                  style={{ marginTop: "20px" }}
                >
                  <CustomTable
                    // block={true}
                    hideBtn={true}
                    hidebtn1={true}
                    // data={searchedData}
                    data={resData}
                    tableTitle="Questions"
                    handlePageChange={handlePageChange}
                    currentPage={currentPage}
                    totalCount={count}
                    pageSize={pageSize}
                    headertitlebgColor={"#666"}
                    headertitletextColor={"#FFF"}
                    showPrint={false}
                    // ActionHide={true}
                    hideEditIcon={false}
                    hideDeleteIcon={true}
                    handleAdd={(item) => navigate("/")}
                    handleEdit={(item) => handleEdit(item?.Id)}
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

export default TMSQuestion;