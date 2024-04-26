import React, { useContext, useEffect, useState } from "react";
import { Layout } from "../../../../../../components/Layout";
import Header from "../../../../../../components/Header";
import { QMSSideBarItems } from "../../../../../../utils/sideBarItems";
import { useFormik } from "formik";
import { AuthContext } from "../../../../../../api/AuthContext";
import { showSuccessMessage } from "../../../../../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import { allMotionSummary } from "../../../../../../api/APIs/Services/Motion.service";
import {
  allQuestionSummary,
  getQuestionGroupDiaries,
} from "../../../../../../api/APIs/Services/Question.service";

function QuestionGroupDiary() {
  const { sessions } = useContext(AuthContext);
  const [count, setCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchedData, setSearchData] = useState([]);
  const [initialData, setInitialData] = useState(null);
  const pageSize = 4;

  const formik = useFormik({
    initialValues: {
      sessionNo: "",
      category: "",
      groupNo: "",
    },
    onSubmit: (values) => {
      getGroupDiariesApi(values);
    },
    enableReinitialize: true,
  });

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
    if (
      formik?.values?.sessionNo ||
      formik?.values?.category ||
      formik?.values?.groupNo
    ) {
      getGroupDiariesApi(formik?.values);
    }
  };

  const transformSummaryData = (apiData) => {
    return apiData.map((item, index) => ({
      SrNo: index + 1,
      QID: item?.id,
      QDN: item?.questionDiary,
      mover: item?.member?.memberName,
      subject: [item?.englishText, item?.urduText]
        .filter(Boolean)
        .join(", ")
        .replace(/(<([^>]+)>)/gi, ""),
      divisions: item?.divisions,
      NoticeDiaryDate: item?.noticeOfficeDiary?.noticeOfficeDiaryDate,
      currentStatus: item?.questionStatus?.questionStatus,
    }));
  };

  const getGroupDiariesApi = async (values) => {
    const Data = {
      session: values?.sessionNo,
      questionCategory: values?.category,
      group: values?.groupNo,
    };
    try {
      const response = await getQuestionGroupDiaries(Data);
      if (response?.success) {
        showSuccessMessage(response.message);
        setInitialData(response.data);
        const transformedData = transformSummaryData(response?.data?.questions);
        setSearchData(transformedData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout module={true} sidebarItems={QMSSideBarItems} centerlogohide={true}>
      <ToastContainer />
      <Header
        dashboardLink={"/"}
        addLink1={"/qms/reports/question-group-diary"}
        title1={"Question Group Diary"}
      />
      <div class="container-fluid">
        <div class="card mt-1">
          <div
            class="card-header red-bg"
            style={{ background: "#14ae5c !important" }}
          >
            <h1>Question Group Diary</h1>
          </div>
          <div class="card-body">
            <div class="container-fluid">
              <form onSubmit={formik.handleSubmit}>
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Session No</label>
                      <select
                        className={`form-select`}
                        // placeholder="Session No"
                        value={formik.values.sessionNo}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="sessionNo"
                      >
                        <option value={""} selected disabled hidden>
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
                      <label class="form-label">Group No</label>
                      <input
                        class="form-control"
                        id="groupNo"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="text"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button class="btn btn-primary" type="submit">
                      Generate
                    </button>
                    <button class="btn btn-primary" onClick={() => {}}>
                      Print
                    </button>
                  </div>
                </div>
              </form>

              <div class="" style={{ marginTop: "20px" }}>
                <div style={{ marginLeft: 10 }}>
                  <h5>Total Questions: {initialData?.totalQuestions}</h5>
                  <h5>Session No: {initialData?.sessionName}</h5>
                  <h5>Group: {initialData?.groupNameStarred}</h5>
                </div>

                <CustomTable
                  // block={true}
                  hideBtn={true}
                  hidebtn1={true}
                  data={searchedData}
                  tableTitle="Question Group Diary"
                  // handlePageChange={handlePageChange}
                  // currentPage={currentPage}
                  showPrint={false}
                  ActionHide={true}
                  headertitlebgColor={"#666"}
                  headertitletextColor={"#FFF"}
                  hideDeleteIcon={true}
                  hidePagination={true}
                  // pageSize={pageSize}
                  // handleDelete={(item) => handleDelete(item?.QID)}
                  // totalCount={count}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default QuestionGroupDiary;
