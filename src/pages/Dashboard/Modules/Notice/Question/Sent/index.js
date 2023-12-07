import React, { useEffect, useState } from "react";
import { NoticeSidebarItems } from "../../../../../../utils/sideBarItems";
import { Layout } from "../../../../../../components/Layout";
import Header from "../../../../../../components/Header";
import { useNavigate } from "react-router";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";
import { getAllQuestion, getAllResolutions, searchQuestion, searchResolution } from "../../../../../../api/APIs";
import { Field, Form, Formik } from "formik";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import { ToastContainer } from "react-toastify";

function SentQuestion() {
  const navigate = useNavigate();
  const [searchedData, setSearchedData] = useState([]);
  const [resData, setResData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(null);
  const pageSize = 10; // Set your desired page size

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  const initialValues = {
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
  };

  const transformLeavesData = (apiData) => {
    return apiData.map((res, index) => {
      return {
        SrNo: index,
        QID: res.id,
        QDN: res.questionDiary,
        NoticeDate: res?.noticeOfficeDiary?.noticeOfficeDiaryDate,
        NoticeTime: res?.noticeOfficeDiary?.noticeOfficeDiaryTime,
        SessionNumber: res?.session?.sessionName,
        SubjectMatter: [res?.englishText, res?.urduText].filter(Boolean).join(', '),
        Category: res.questionCategory,
        // SubmittedBy: res.category,
        Status: res.questionStatus?.questionStatus
      };
    });
  };

  const handleSubmit = (values) => {
    // Handle form submission
    SearchQuestionApi(values);
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

  useEffect(() => {
    getAllQuestionsApi();
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
      <div  >
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
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                  <Form>
                    <div className="container-fluid">
                      <div className="row">
                        <div className="col">
                          <div className="mb-3">
                            <label className="form-label">
                              Question Diary No
                            </label>
                            <Field
                              className="form-control"
                              type="text"
                              name="questionDiaryNo"
                            />
                          </div>
                        </div>
                        <div className="col">
                          <div className="mb-3">
                            <label className="form-label">Question ID</label>
                            <Field
                              className="form-control"
                              type="number"
                              name="questionID"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <div className="mb-3">
                            <label className="form-label">Keyword</label>
                            <Field
                              className="form-control"
                              type="text"
                              name="keyword"
                            />
                          </div>
                        </div>
                        <div className="col">
                          <div className="mb-3">
                            <label className="form-label">Member Name</label>
                            <Field
                              className="form-control"
                              type="text"
                              name="memberName"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <div className="mb-3">
                            <label className="form-label">From Session</label>
                            <Field
                              as="select"
                              className="form-select"
                              name="fromSession"
                            >
                              <option>Select</option>
                              <option>121</option>
                              <option>122</option>
                              <option>123</option>
                            </Field>
                          </div>
                        </div>
                        <div className="col">
                          <div className="mb-3">
                            <label className="form-label">To Session</label>
                            <Field
                              as="select"
                              className="form-select"
                              name="toSession"
                            >
                              <option>Select</option>
                              <option>121</option>
                              <option>122</option>
                              <option>123</option>
                            </Field>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <div className="mb-3">
                            <label className="form-label">
                              Category
                            </label>
                            <Field
                              as="select"
                              className="form-select"
                              name="category"
                            >
                                <option value="Starred">
                                    Starred
                                </option>
                                <option value="UnStarred">
                                    UnStarred
                                </option>
                                <option value="Short Notice">
                                    Short Notice
                                </option>
                            </Field>
                          </div>
                        </div>
                        <div className="col">
                          <div className="mb-3">
                            <label className="form-label">
                              Question Status
                            </label>
                            <Field
                              as="select"
                              className="form-select"
                              name="questionStatus"
                            >
                              <option selected="selected" value="" hidden>
                                Select
                              </option>
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
                            </Field>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <div className="mb-3">
                            <label className="form-label">
                              From Notice Date
                            </label>
                            <Field
                              className="form-control"
                              type="text"
                              name="fromNoticeDate"
                            />
                          </div>
                        </div>
                        <div className="col">
                          <div className="mb-3">
                            <label className="form-label">To Notice Date</label>
                            <Field
                              className="form-control"
                              type="text"
                              name="toNoticeDate"
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
                  </Form>
                </Formik>

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
                        handleAdd={(item) => navigate('/')}
                        handleEdit={(item) => navigate('/')}
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