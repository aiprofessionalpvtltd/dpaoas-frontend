import React, { useContext, useEffect, useState } from "react";
import { Layout } from "../../../../../components/Layout";
import CustomTable from "../../../../../components/CustomComponents/CustomTable";
import { MMSSideBarItems } from "../../../../../utils/sideBarItems";
import Header from "../../../../../components/Header";
import { useFormik } from "formik";
import { ToastContainer } from "react-toastify";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../utils/ToastAlert";
import {
  getAllQuestionStatus,
  searchResolution,
} from "../../../../../api/APIs";
import DatePicker from "react-datepicker";
import { AuthContext } from "../../../../../api/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

function MMSSearchResolution() {
  const { members, sessions } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(null);
  const [searchedData, setSearchedData] = useState([]);
  const [allResolutionStatus, setAllResolutionStatus] = useState([]);

  const pageSize = 4; // Set your desired page size

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

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };
  const transformLeavesData = (apiData) => {
    return apiData.map((res) => {
      const movers =
        res?.resolutionMoversAssociation.map(
          (item) => item?.memberAssociation?.memberName,
        ) || [];

      return {
        RID: res?.id,
        ResDN: res.noticeDiary.noticeOfficeDiaryNo,
        SessionNumber: res.session?.sessionName,
        ResolutionType: res?.resolutionType,
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
      colourResNo: values.colourResNo,
      keyword: values.keyword,
      resolutionId: values.resolutionID,
      resolutionDiaryNo: values.resolutionDiaryNo,
      fkResolutionStatus: values.resolutionStatus,
      noticeOfficeDiaryNo: values.noticeOfficeDiaryNo,
      noticeOfficeDiaryDateFrom: values.fromNoticeDate,
      noticeOfficeDiaryDateTo: values.toNoticeDate,
      resolutionMovers: "",
    };

    try {
      const response = await searchResolution(searchParams);
      if (response?.success) {
        const transformedData = transformLeavesData(response.data);
        setCount(response?.data?.count);
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
  useEffect(() => {
    GetALlStatus();
  }, []);
  return (
    <Layout module={true} sidebarItems={MMSSideBarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/"}
        addLink1={"/mms/resolution/search"}
        title1={"Search Resolution"}
      />
      <ToastContainer />

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
                  </div>
                  <div className="row">
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
                        <select
                          class="form-select"
                          placeholder={formik.values.memberName}
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
                  </div>
                  <div className="row">
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
                          <option>Govt. Resolution Supported by others</option>
                        </select>
                      </div>
                    </div>
                    <div className="col">
                      <div className="mb-3">
                        <label className="form-label">Resolution Status</label>
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
                    <div className="col">
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
                    <div className="col">
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
                    <div className="col">
                      <div className="mb-3">
                        <label className="form-label">Notice Diary No</label>
                        <input
                          className="form-control"
                          type="text"
                          id="noticeOfficeDiaryNo"
                          placeholder={formik.values.noticeOfficeDiaryNo}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div className="mb-3">
                        <label className="form-label">Colour Res.No</label>
                        <input
                          className="form-control"
                          type="text"
                          id="colourResNo"
                          placeholder={formik.values.colourResNo}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
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
              <div style={{ marginTop: "20px" }}>
                <CustomTable
                  data={searchedData}
                  tableTitle=""
                  addBtnText="Print Resolution"
                  handleAdd={() => alert("Print")}
                  // seachBarShow={true}
                  handlePageChange={handlePageChange}
                  currentPage={currentPage}
                  pageSize={pageSize}
                  headertitlebgColor={"#666"}
                  headertitletextColor={"#FFF"}
                  hideEditIcon={true}
                  ActionHide={true}
                  totalCount={count}
                // handlePrint={}
                // handleUser={}
                // handleDelete={(item) => handleDelete(item.id)}
                />
                <div class="row mt-3">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Resolution Status</label>
                      <select class="form-select">
                        <option>Resolution Status</option>
                        <option>Allowed</option>
                        <option>Disallowed</option>
                        <option>Withdraw</option>
                        <option>Admitted</option>
                        <option>Under Process</option>
                        <option>Admitted and Selected in Balloting</option>
                        <option>Dropped by the House</option>
                        <option>Admitted but Lapsed</option>
                        <option>Included in the order of day</option>
                        <option>Passed by the House</option>
                        <option>Passed As Amended</option>
                        <option>Withdrawn by the Member</option>
                        <option>Rejected by the House</option>
                        <option>Passed Unanimously</option>
                        <option>Under Correspondence</option>
                        <option>Moved and Pending for Discussion</option>
                        <option>Lapsed</option>
                        <option>Deferred</option>
                        <option>Refered to Standing Committee</option>
                        <option>Move To Session</option>
                        <option>Move in the House</option>
                        <option>Pending for further discussion</option>
                        <option>NFA</option>
                        <option>Admitted as Call Attention Notice</option>
                      </select>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3" style={{ position: "relative" }}>
                      <label class="form-label">Status Date</label>
                      <span
                        style={{
                          position: "absolute",
                          right: "15px",
                          top: "36px",
                          zIndex: 1,
                          fontSize: "20px",
                          color: "#666",
                        }}
                      >
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </span>
                      <DatePicker
                        // selected={formik.values.toNoticeDate}
                        // onChange={(date) => formik.setFieldValue("toNoticeDate", date)}
                        className={"form-control"}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default MMSSearchResolution;
