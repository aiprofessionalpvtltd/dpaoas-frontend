import React, { useContext, useEffect, useState } from "react";
import { NoticeSidebarItems } from "../../../../../../utils/sideBarItems";
import { Layout } from "../../../../../../components/Layout";
import Header from "../../../../../../components/Header";
import { useNavigate } from "react-router";
import Select from "react-select";

import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";
import {
  getAllQuestionStatus,
} from "../../../../../../api/APIs/Services/Question.service";
import { getResolutionBYID, searchResolution } from "../../../../../../api/APIs/Services/Resolution.service";
import { useFormik } from "formik";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import { ToastContainer } from "react-toastify";
import DatePicker from "react-datepicker";
import { AuthContext } from "../../../../../../api/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

function SearchResolution() {
  const navigate = useNavigate();
  const { members, sessions } = useContext(AuthContext);
  const [searchedData, setSearchedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [allResolutionStatus, setAllResolutionStatus] = useState([]);
  const pageSize = 10; // Set your desired page size

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  const formik = useFormik({
    initialValues: {
      resolutionDiaryNo: "",
      resolutionID: "",
      keyword: "",
      memberName: "",
      fromSession: "",
      toSession: "",
      resolutionType: "",
      resolutionStatus: "",
      fromNoticeDate: "",
      toNoticeDate: "",
      colourResNo: "",
      noticeOfficeDiaryNo: "",
    },

    onSubmit: (values) => {
      // Handle form submission here
      SearchResolutionApi(values);
    },
  });

  const transformLeavesData = (apiData) => {
    return apiData.map((res) => {
      const movers =
        res?.resolutionMoversAssociation.map(
          (item) => item?.memberAssociation?.memberName,
        ) || [];

      return {
        RID: res.id,
        // ResDN: res.resolutionDiaries,
        SessionNumber: res.session?.sessionName,
        ResolutionType: res.resolutionType,
        SubjectMatter: "",
        NoticeNo: res.noticeDiary?.noticeOfficeDiaryNo,
        ResolutionStatus: res.resolutionStatus?.resolutionStatus,
        Movers: movers,
      };
    });
  };

  const SearchResolutionApi = async (values) => {
    const searchParams = {
      fkSessionNoFrom: values.fromSession,
      fkSessionNoTo: values.toSession,
      resolutionType: values.resolutionType,
      colourResNo: "",
      keyword: values.keyword,
      resolutionId: values.resolutionID,
      resolutionDiaryNo: values.resolutionDiaryNo,
      fkResolutionStatus: values.resolutionStatus,
      noticeOfficeDiaryNo: "",
      noticeOfficeDiaryDateFrom: values.fromNoticeDate,
      noticeOfficeDiaryDateTo: values.toNoticeDate,
      resolutionMovers: "",
    };

    try {
      const response = await searchResolution(searchParams);
      if (response?.success) {
        const transformedData = transformLeavesData(response.data);
        setSearchedData(transformedData);
        showSuccessMessage(response?.message);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const GetALlStatus = async () => {
    try {
      const response = await getAllQuestionStatus();
      if (response?.success) {
        setAllResolutionStatus(response?.data);
        // showSuccessMessage(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = async (id) => {
    try {
      const response = await getResolutionBYID(id);
      if (response?.success) {
        navigate("/qms/notice/notice-resolution-detail", {
          state: response?.data,
        });
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  };

  useEffect(() => {
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
        addLink1={"/notice/resolution/search"}
        title1={"Search Resolution"}
      />
      <div>
        <div class="container-fluid">
          <div class="card mt-1">
            <div
              class="card-header red-bg"
              style={{ background: "#14ae5c !important" }}
            >
              <h1>SEARCH RESOLUTION</h1>
            </div>
            <div class="card-body">
              <div class="container-fluid">
                <form onSubmit={formik.handleSubmit}>
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label">
                            Resolution Diary No
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            id="resolutionDiaryNo"
                            placeholder={formik.values.resolutionDiaryNo}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label">Resolution ID</label>
                          <input
                            className="form-control"
                            type="text"
                            id="resolutionID"
                            placeholder={formik.values.resolutionID}
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
                            id="keyword"
                            placeholder={formik.values.keyword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label">Member Name</label>
                          {/* <input
                            className="form-control"
                            type="text"
                            id="memberName"
                            placeholder={formik.values.memberName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          /> */}
                          <Select
                            options={members.map((item) => ({
                              value: item.id,
                              label: item.memberName,
                            }))}
                            isMulti
                            onChange={(selectedOptions) =>
                              formik.setFieldValue(
                                "memberName",
                                selectedOptions,
                              )
                            }
                            onBlur={formik.handleBlur}
                            value={formik.values.memberName}
                            name="memberName"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      
                    
                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label">From Session</label>
                          <select
                            class="form-select"
                            id="fromSession"
                            placeholder={formik.values.fromSession}
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
                            className="form-select"
                            id="toSession"
                            placeholder={formik.values.toSession}
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
                          <label className="form-label">Resolution Type</label>
                          <select
                            className="form-select"
                            id="resolutionType"
                            placeholder={formik.values.resolutionType}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          >
                            <option value={""} selected disabled hidden>
                              Resolution Type
                            </option>
                            <option>Resolution Type</option>
                            <option>Government Resolution</option>
                            <option>Private Member Resolution</option>
                            <option>
                              Govt. Resolution Supported by others
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label">
                            Resolution Status
                          </label>
                          <select
                            className="form-select"
                            id="resolutionStatus"
                            placeholder={formik.values.resolutionStatus}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          >
                            <option value="" selected disabled hidden>
                              Select
                            </option>
                            {allResolutionStatus &&
                              allResolutionStatus.map((item) => (
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
                            minDate={new Date()}
                            onChange={(date) =>
                              formik.setFieldValue("fromNoticeDate", date)
                            }
                            className={`form-control`}
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
                            minDate={new Date()}
                            onChange={(date) =>
                              formik.setFieldValue("toNoticeDate", date)
                            }
                            className={`form-control`}
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
                    block={false}
                    hideBtn={true}
                    data={searchedData}
                    hidebtn1={true}
                    tableTitle="Resolutions"
                    handlePageChange={handlePageChange}
                    currentPage={currentPage}
                    showPrint={false}
                    pageSize={pageSize}
                    hideDeleteIcon={true}
                    handleEdit={(item) => handleEdit(item.RID)}
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

export default SearchResolution;
