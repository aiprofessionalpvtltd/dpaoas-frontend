import React, { useContext, useEffect, useState } from "react";
import { Layout } from "../../../../../components/Layout";
import Header from "../../../../../components/Header";
import { MMSSideBarItems } from "../../../../../utils/sideBarItems";
import { useFormik } from "formik";
import { AuthContext } from "../../../../../api/AuthContext";
import { showSuccessMessage } from "../../../../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";
import CustomTable from "../../../../../components/CustomComponents/CustomTable";
import { allMotionSummary } from "../../../../../api/APIs/Services/Motion.service";

function MMSMotionSummery() {
  const { sessions } = useContext(AuthContext);
  const [count, setCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchedData, setSearchData] = useState([])
  const pageSize = 10;

  

  const formik = useFormik({
    initialValues: {
      fromsessionNumber: "",
      tosessionNumber:"",
      motionType: "",
     
    },
    onSubmit: (values) => {
      allMotionSummaryApi(values, currentPage);
    },
    enableReinitialize: true,
  });

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
    if (
      formik?.values?.fromsessionNumber ||
      formik?.values?.tosessionNumber ||
      formik?.values?.motionType 
    ) {
      allMotionSummaryApi(formik?.values, page);
    }

    allMotionSummaryApi(formik?.values, page);
  };

  const transformSummaryData = (apiData) => {
    // Sort the array based on the condition (statusName === "totalCount" should come first)
    apiData.sort((a, b) => {
      if (a.statusName === "Total Motions") return -1; // "totalCount" comes before other status names
      if (b.statusName === "Total Motions") return 1; // Other status names come after "totalCount"
      return 0; // No change in order if statusName is not "totalCount"
    });
  
    return apiData.map((item) => ({
      statusName: item?.statusName,
      statusCount: item?.statusCount,
    }));
  };

  const allMotionSummaryApi = async (values, page) => {
    const Data = {motionType : values?.motionType, fromSessionId: values?.fromsessionNumber, toSessionId: values?.tosessionNumber}
    try {
      const response = await allMotionSummary(Data, page, pageSize)
      if (response?.success) {
        showSuccessMessage(response.message);
        setCount(response?.data?.totalPages)
        const transformedData = transformSummaryData(response?.data?.motionStatusCounts)
        setSearchData(transformedData)
      }
    } catch (error) {
      console.log(error);
    }
  }

  

  return (
    <Layout module={true} sidebarItems={MMSSideBarItems} centerlogohide={true}>
        <ToastContainer />
      <Header
        dashboardLink={"/mms/dashboard"}
        addLink1={"/mms/reports/motion-summary"}
        title1={"Motion Summary"}
      />
      <div class="container-fluid">
        <div class="card mt-1">
          <div
            class="card-header red-bg"
            style={{ background: "#14ae5c !important" }}
          >
            <h1>MOTION SUMMARY</h1>
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
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Motion Type</label>
                    <select class="form-select"
                     value={formik.values.motionType}
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     name="motionType">
                       <option value={""} selected disabled hidden>
                            Select
                          </option>
                      <option value={"Adjournment Motion"}>Adjournment Motion</option>
                      <option value={"Call Attention Notice"}>Call Attention Notice</option>
                      <option value={"Privilege Motion"}>Privilege Motion</option>
                      <option value={"Motion Under Rule 218"}>Motion Under Rule 218</option>
                      <option value={"Motion Under Rule 60"}>Motion Under Rule 60</option>
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
                    tableTitle="Motion Summary"
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

export default MMSMotionSummery;
