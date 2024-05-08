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
import { allQuestionSummary } from "../../../../../../api/APIs/Services/Question.service";

function QMSQuestionSummary() {
  const { sessions } = useContext(AuthContext);
  const [count, setCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchedData, setSearchData] = useState([])
  const pageSize = 4;

  const formik = useFormik({
    initialValues: {
      fromsessionNumber: "",
      tosessionNumber:"",
     
    },
    onSubmit: (values) => {
      allQuestionSummaryApi(values, currentPage);
    },
    enableReinitialize: true,
  });

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
    if (
      formik?.values?.fromsessionNumber ||
      formik?.values?.tosessionNumber
    ) {
      allQuestionSummaryApi(formik?.values, page);
    }
  };

  const transformSummaryData = (apiData) => {
    return apiData.map((item) => ({
      questionStatus: item?.status,
      statusCount: item?.statusCount,
    }));
  };

  const allQuestionSummaryApi = async (values) => {
    const Data = {fromSession: values?.fromsessionNumber, toSession: values?.tosessionNumber}
    try {
      const response = await allQuestionSummary(Data)
      if (response?.success) {
        showSuccessMessage(response.message);
        const transformedData = transformSummaryData(response?.data[0]?.questionStatusCounts)
        setSearchData(transformedData)
      }
    } catch (error) {
      console.log(error);
    }
  }

  

  return (
    <Layout module={true} sidebarItems={QMSSideBarItems} centerlogohide={true}>
      <ToastContainer />
      <Header
        dashboardLink={"/"}
        addLink1={"/qms/reports/question-summary"}
        title1={"Question Summary"}
      />
      <div class="container-fluid">
        <div class="card mt-1">
          <div
            class="card-header red-bg"
            style={{ background: "#14ae5c !important" }}
          >
            <h1>Question Summary</h1>
          </div>
          <div class="card-body">
            <div class="container-fluid">
            <form onSubmit={formik.handleSubmit}>
              <div class="row">
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">From Session</label>
                    <select className={`form-select`}
                          // placeholder="Session No"
                          value={formik.values.fromsessionNumber}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          name="fromsessionNumber">
                    
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
                    <label class="form-label">To Session</label>
                    <select className={`form-select`}
                          // placeholder="Session No"
                          value={formik.values.tosessionNumber}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          name="tosessionNumber">
                    
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
              </div>
              <div class="row">
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button class="btn btn-primary" type="submit">
                    View Summary
                  </button>
                </div>
              </div>
              </form>


              <div class="" style={{ marginTop: "20px" }}>
                  <CustomTable
                    // block={true}
                    hideBtn={true}
                    hidebtn1={true}
                    data={searchedData}
                    tableTitle="Question Summary"
                    // handlePageChange={handlePageChange}
                    handlePageChange={handlePageChange}
                    currentPage={currentPage}
                    showPrint={false}
                    ActionHide={true}
                    headertitlebgColor={"#666"}
                    headertitletextColor={"#FFF"}
                    hideDeleteIcon={true}
                    pageSize={pageSize}
                    // handleDelete={(item) => handleDelete(item?.QID)}
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

export default QMSQuestionSummary;
