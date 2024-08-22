import React, { useContext, useState } from "react";

import Header from "../../../../../components/Header";
import { QMSSideBarItems } from "../../../../../utils/sideBarItems";
import CustomTable from "../../../../../components/CustomComponents/CustomTable";
import { AuthContext } from "../../../../../api/AuthContext";
import { useFormik } from "formik";
import { allResolutionSummaryDetail } from "../../../../../api/APIs/Services/Resolution.service";
import moment from "moment";
import { ToastContainer } from "react-toastify";
import { Layout } from "../../../../../components/Layout";

function QuestionAnualReport() {
  const { sessions } = useContext(AuthContext);
  const [count, setCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchedData, setSearchData] = useState([]);
  const pageSize = 10;

  const formik = useFormik({
    initialValues: {
      fromsessionNumber: "",
      tosessionNumber: "",
    },
    onSubmit: (values) => {
      AllResolutionSummaryDetailApi(values, currentPage);
    },
    enableReinitialize: true,
  });

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
    if (formik?.values?.fromsessionNumber || formik?.values?.tosessionNumber) {
      AllResolutionSummaryDetailApi(formik?.values, page);
    }

    AllResolutionSummaryDetailApi(formik?.values, page);
  };

  const transResolutionSummaryData = (apiData) => {
    return apiData.map((item) => {
      const subjectMatter = [item?.englishText, item?.urduText]
        .filter(Boolean)
        .join(", ");
      const cleanedSubjectMatter = subjectMatter.replace(/(<([^>]+)>)/gi, "");
      return {
        SR: item?.id,
        Movers: item?.resolutionMoversAssociation
          .map((mover) => mover.memberAssociation.memberName)
          .join(", "),
        ResolutionContents: cleanedSubjectMatter ? cleanedSubjectMatter : "-",
        NoticeDate: item?.noticeDiary?.noticeOfficeDiaryDate
          ? moment(item?.noticeDiary?.noticeOfficeDiaryDate).format(
              "DD-MM-YYYY"
            )
          : "-",
        ResolutionStatus: item?.resolutionStatus?.resolutionStatus,
      };
    });
  };

  const AllResolutionSummaryDetailApi = async (values, page) => {
    const Data = {
      fromSessionId: values?.fromsessionNumber,
      toSessionId: values?.tosessionNumber,
    };
    try {
      const response = await allResolutionSummaryDetail(Data, page, pageSize);
      if (response?.success) {
        // showSuccessMessage(response.message);
        setCount(response?.data?.count);
        const transformedData = transResolutionSummaryData(
          response?.data?.resolutions
        );
        setSearchData(transformedData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout module={true} sidebarItems={QMSSideBarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/"}
        addLink1={"/qms/questionList/question-anual-report"}
        title1={"Annual Report Summary"}
      />
      <ToastContainer />
      <div class="container-fluid">
        <div class="card mt-4">
          <div
            class="card-header red-bg"
            style={{ background: "#14ae5c !important" }}
          >
            <h1>ANNUAL REPORT SUMMARY</h1>
          </div>
          <div class="card-body">
            <div class="container-fluid">
              <form onSubmit={formik.handleSubmit}>
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">From Session</label>
                      <select
                        className={`form-select`}
                        // placeholder="Session No"
                        value={formik.values.fromsessionNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="fromsessionNumber"
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
                      <label class="form-label">To Session</label>
                      <select
                        className={`form-select`}
                        // placeholder="Session No"
                        value={formik.values.tosessionNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="tosessionNumber"
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
                  <div class="col-4">
                    <div class="mb-3">
                      <label class="form-label">Parliamentary Year</label>
                      <input
                        type="text"
                        placeholder={""}
                        value={formik.values.parlimentryYear}
                        className={`form-control ${formik.touched.parlimentryYear &&
                          formik.errors.parlimentryYear
                          ? "is-invalid"
                          : ""
                          }`}
                        id="parlimentryYear"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.parlimentryYear &&
                        formik.errors.parlimentryYear && (
                          <div className="invalid-feedback">
                            {formik.errors.parlimentryYear}
                          </div>
                        )}
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button
                      class="btn btn-primary"
                      type="button"
                      onClick={() => {
                        formik.resetForm();
                        setSearchData([]);
                      }}
                    >
                      Reset
                    </button>
                    <button
                      class="btn btn-primary"
                      type="submit"
                      disabled={
                        formik?.values?.fromsessionNumber ||
                        formik.values.tosessionNumber
                          ? false
                          : true
                      }
                    >
                      Preview PDF
                    </button>
                  </div>
                </div>
              </form>

          
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default QuestionAnualReport;
