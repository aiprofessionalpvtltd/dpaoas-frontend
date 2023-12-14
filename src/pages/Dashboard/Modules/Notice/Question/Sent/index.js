import React, { useEffect, useState } from "react";
import { NoticeSidebarItems } from "../../../../../../utils/sideBarItems";
import { Layout } from "../../../../../../components/Layout";
import Header from "../../../../../../components/Header";
import { useNavigate } from "react-router";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";
import {
  getAllQuestion,
  getAllQuestionStatus,
  getAllResolutions,
  searchQuestion,
  searchResolution,
} from "../../../../../../api/APIs";
import { Field, Form, Formik, useFormik } from "formik";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import { ToastContainer } from "react-toastify";
import DatePicker from "react-datepicker";


function SentQuestion() {
  const navigate = useNavigate();
  const [searchedData, setSearchedData] = useState([]);
  const [resData, setResData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [allquestionStatus, setAllQuestionStatus] = useState([]);

  const [count, setCount] = useState(null);
  const pageSize = 10; // Set your desired page size

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
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
        SearchQuestionApi(values);
    },
});

  const transformLeavesData = (apiData) => {
    return apiData.map((res, index) => {
      return {
        SrNo: index,
        QID: res.id,
        QDN: res.fkQuestionDiaryId,
        NoticeDate: res?.noticeOfficeDiary?.noticeOfficeDiaryDate,
        NoticeTime: res?.noticeOfficeDiary?.noticeOfficeDiaryTime,
        SessionNumber: res?.session?.sessionName,
        SubjectMatter: [res?.englishText, res?.urduText]
          .filter(Boolean)
          .join(", "),
        Category: res.questionCategory,
        // SubmittedBy: res.category,
        Status: res.questionStatus?.questionStatus,
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
      questionID: values.questionID,
      questionStatus: values.resolutionStatus,
      questionDiaryNo: values.questionDiaryNo,
      noticeOfficeDiaryDateFrom: values.fromNoticeDate,
      noticeOfficeDiaryDateTo: values.toNoticeDate,
    };

    try {
      const response = await searchQuestion(searchParams);
      if (response?.success) {
        const transformedData = transformLeavesData(response.data);
        setSearchedData(transformedData);
        showSuccessMessage(response?.message);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const getAllQuestionsApi = async () => {
    try {
      const response = await getAllQuestion(currentPage, pageSize);
      if (response?.success) {
        showSuccessMessage(response?.message);
        setCount(response?.count);
        const transformedData = transformLeavesData(response.data);
        setResData(transformedData);
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
            showSuccessMessage(response.message)
        }
    } catch (error) {
        console.log(error);
    }
};

  useEffect(() => {
    getAllQuestionsApi();
    GetALlStatus();
  }, []);
  
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
        addLink2={"/notice/question/sent"}
        title1={"Notice"}
        title2={"Sent Question"}
      />
      <div>
        <div class="container-fluid">
          <div class="card mt-1">
            <div
              class="card-header red-bg"
              style={{ background: "#14ae5c !important" }}
            >
              <h1>SENT QUESTION</h1>
            </div>
            <div class="card-body">
              <div class="container-fluid">
              <form onSubmit={formik.handleSubmit}>
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col">
                                            <div className="mb-3">
                                                <label className="form-label">Question Diary No</label>
                                                <input className="form-control" type="text" id="questionDiaryNo" placeholder={formik.values.questionDiaryNo}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur} />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="mb-3">
                                                <label className="form-label">Question ID</label>
                                                <input className="form-control" type="number" id="questionID"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div className="mb-3">
                                                <label className="form-label">Keyword</label>
                                                <input className="form-control" type="text" name="keyword" id="keyword"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur} />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="mb-3">
                                                <label className="form-label">Member Name</label>
                                                <input className="form-control" type="text" name="memberName" id="memberName"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div className="mb-3">
                                                <label className="form-label">From Session</label>
                                                <select
                                                    class="form-select"
                                                    placeholder={formik.values.fromSession}
                                                    id="fromSession"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                >
                                                    <option>Select</option>
                                                    <option value={"2"}>121</option>
                                                    <option value={"3"}>122</option>
                                                    <option value={"4"}>123</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="mb-3">
                                                <label className="form-label">To Session</label>
                                                <select
                                                    class="form-select"
                                                    placeholder={formik.values.toSession}
                                                    id="toSession"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                >
                                                    <option>Select</option>
                                                    <option value={"1"}>121</option>
                                                    <option>122</option>
                                                    <option>123</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div className="mb-3">
                                                <label className="form-label">Category</label>
                                                <select
                                                    class="form-select"
                                                    placeholder={formik.values.category}
                                                    id="category"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                >
                                                    <option value={" "} selected disabled hidden>
                                                        select
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
                                                    placeholder={formik.values.questionStatus}
                                                    id="questionStatus"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                >
                                                    <option value={""} selected disabled hidden>
                                                        select
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
                                        <div className="col">
                                            <div className="mb-3">
                                                <label className="form-label">From Notice Date</label>
                                                <DatePicker
                                                    selected={formik.values.fromNoticeDate}
                                                    onChange={(date) => formik.setFieldValue("fromNoticeDate", date)}
                                                    className={"form-control"}
                                                />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="mb-3">
                                                <label className="form-label">To Notice Date</label>
                                                <DatePicker
                                                    selected={formik.values.toNoticeDate}
                                                    onChange={(date) => formik.setFieldValue("toNoticeDate", date)}
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
                                            <button className="btn btn-primary" type="reset">
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
                    block={true}
                    hideBtn={true}
                    data={searchedData.length > 0 ? searchedData : resData}
                    tableTitle="Questions"
                    handlePageChange={handlePageChange}
                    currentPage={currentPage}
                    showPrint={true}
                    pageSize={pageSize}
                    handleAdd={(item) => navigate("/")}
                    handleEdit={(item) => navigate("/")}
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

export default SentQuestion;
