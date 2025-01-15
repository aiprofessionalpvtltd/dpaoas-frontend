import React, { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Layout } from "../../../../../../components/Layout";
import { QMSSideBarItems } from "../../../../../../utils/sideBarItems";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import { AuthContext } from "../../../../../../api/AuthContext";
import { useFormik } from "formik";
import Header from "../../../../../../components/Header";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";
import {
  compareQuestion,
  getAllQuestionByID,
} from "../../../../../../api/APIs/Services/Question.service";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function QMSCompareQuestion() {
  const { sessions } = useContext(AuthContext);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [searchedData, setSearchedData] = useState([]);
  const [count, setCount] = useState(null);
  const options = Array.from({ length: 100 }, (_, i) => i + 1);
  const pageSize = 10;
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const formik = useFormik({
    initialValues: {
      fromSession: "",
      toSession: "",
      comparisonPercentage: "",
      description: "",
    },
    onSubmit: (values) => {
      SearchCompareQuestionApi(values);
    },
  });
  const transformCompareQuestionData = (apiData) => {
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
        questionStatus: res?.questionStatus?.questionStatus,
      };
    });
  };
  const SearchCompareQuestionApi = async (values) => {
    const searchParams = {
      fromSessionNo: values.fromSession,
      toSessionNo: values.toSession,
      comparisonPercentage: values.comparisonPercentage,
      description: values.description,
      questionSentStatus: "inQuestion",
    };
    console.log("api Required For This", searchParams);
    return;
    try {
      const response = await compareQuestion(
        searchParams,
        currentPage,
        pageSize
      );
      if (response?.success) {
        showSuccessMessage(response?.message);
        const transformedData = transformCompareQuestionData(
          response?.data?.questions
        );
        setCount(response?.data?.count);
        setSearchedData(transformedData);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
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

  useEffect(() => {
    if (formik.values.description) {
      SearchCompareQuestionApi(formik.values);
    }
  }, [currentPage]);

  return (
    <Layout module={true} sidebarItems={QMSSideBarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/"}
        addLink1={"/qms/search/question"}
        title1={"Search Queston"}
        addLink2={"/qms/search/question/compare"}
        title2={"Compare Question"}
      />
      <ToastContainer />
      <div class="container-fluid">
        <div class="card mt-4">
          <div
            class="card-header red-bg"
            style={{ background: "#14ae5c !important" }}
          >
            <h1>Compare Question</h1>
          </div>
          <div class="card-body">
            <div class="container-fluid">
              <form onSubmit={formik.handleSubmit}>
                <div className="row">
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">Text To Compare</label>
                      <textarea
                        className={`form-control`}
                        id="description"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.description}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">From Session</label>
                      <select
                        className="form-select"
                        value={formik.values.fromSession}
                        id="fromSession"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option value={""} disabled hidden>
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
                        className="form-select"
                        value={formik.values.toSession}
                        id="toSession"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option value={""} disabled hidden>
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
                      <label className="form-label">
                        Comparison Percentage
                      </label>
                      <select
                        className="form-select"
                        value={formik.values.comparisonPercentage}
                        id="comparisonPercentage"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option value={""} disabled hidden>
                          Select
                        </option>
                        {options.map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
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
                      onClick={() => {
                        formik.resetForm({});
                        setSearchedData([]);
                      }}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </form>
              <div class="dash-detail-container" style={{ marginTop: "20px" }}>
                <CustomTable
                  block={false}
                  headerShown={true}
                  data={searchedData}
                  handleEdit={(item) => handleEdit(item.QID)}
                  handlePageChange={handlePageChange}
                  currentPage={currentPage}
                  pageSize={pageSize}
                  headertitlebgColor={"#666"}
                  headertitletextColor={"#FFF"}
                  showPrint={true}
                  hideDeleteIcon={true}
                  totalCount={count}
                  handlePrint={(item) => hendlePrint(item.QID)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default QMSCompareQuestion;
