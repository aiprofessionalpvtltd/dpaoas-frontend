import React, { useContext, useEffect, useState } from "react";
import { NoticeSidebarItems } from "../../../../../../utils/sideBarItems";
import { Layout } from "../../../../../../components/Layout";
import Header from "../../../../../../components/Header";
import { useNavigate } from "react-router";
import {
  getAllResolutions,
  searchResolution,
} from "../../../../../../api/APIs";
import Select from "react-select";

import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import { useFormik } from "formik";
import DatePicker from "react-datepicker";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "../../../../../../api/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

function SentResolution() {
  const navigate = useNavigate();
  const { members, sessions } = useContext(AuthContext);
  const [resData, setResData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(null);
  const pageSize = 4; // Set your desired page size

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  const initialValues = {
    noticeDiaryNo: "",
    resolutionId: "",
    keyword: "",
    memberName: "",
    fromSession: "",
    toSession: "",
    resolutionType: "",
    resolutionStatus: "",
    fromNoticeDate: "",
    toNoticeDate: "",
  };

  const transformLeavesData = (apiData) => {
    return apiData.map((leave) => {
      return {
        SrNo: leave.id,
        SessionNumber: leave?.session?.sessionName,
        ResolutionType: leave?.resolutionType,
        SubjectMatter: "",
        NoticeNo: leave?.noticeDiary?.noticeOfficeDiaryNo,
        ResolutionStatus: leave?.resolutionStatus?.resolutionStatus,
      };
    });
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      // Handle your form submission here
      SearchResolutionApi(values);
    },
  });

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
        setCount(response.data?.count);
        const transformedData = transformLeavesData(response.data);
        setResData(transformedData);
        showSuccessMessage(response?.message);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const getAllResolutionsApi = async () => {
    try {
      const response = await getAllResolutions(currentPage, pageSize);
      if (response?.success) {
        showSuccessMessage(response?.message);
        setCount(response.data?.count);
        const transformedData = transformLeavesData(response.data?.resolution);
        setResData(transformedData);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getAllResolutionsApi();
  }, [currentPage]);

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
        addLink2={"/notice/resolution/sent"}
        title1={"Notice"}
        title2={"Sent Resolution"}
      />
      <div>
        <div class="container-fluid">
          <div class="card mt-1">
            <div
              class="card-header red-bg"
              style={{ background: "#14ae5c !important" }}
            >
              <h1>SENT RESOLUTION</h1>
            </div>
            <div class="card-body">
              <form onSubmit={formik.handleSubmit}>
                <div class="container-fluid">
                  <div class="row">
                    <div class="col">
                      <div class="mb-3">
                        <label class="form-label">Notice Diary No</label>
                        <input
                          className={`form-control ${
                            formik.touched.noticeDiaryNo &&
                            formik.errors.noticeDiaryNo
                              ? "is-invalid"
                              : ""
                          }`}
                          type="text"
                          name="noticeDiaryNo"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.noticeDiaryNo}
                        />
                      </div>
                    </div>
                    <div class="col">
                      <div class="mb-3">
                        <label class="form-label">Resolution ID</label>
                        <input
                          className={`form-control ${
                            formik.touched.resolutionId &&
                            formik.errors.resolutionId
                              ? "is-invalid"
                              : ""
                          }`}
                          type="text"
                          name="resolutionId"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.resolutionId}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col">
                      <div class="mb-3">
                        <label class="form-label">Keyword</label>
                        <input
                          className={`form-control ${
                            formik.touched.keyword && formik.errors.keyword
                              ? "is-invalid"
                              : ""
                          }`}
                          type="text"
                          name="keyword"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.keyword}
                        />
                      </div>
                    </div>
                    <div class="col">
                      <div class="mb-3">
                        <label class="form-label">Member Name</label>

                        <Select
                          options={members.map((item) => ({
                            value: item.id,
                            label: item.memberName,
                          }))}
                          isMulti
                          onChange={(selectedOptions) =>
                            formik.setFieldValue("memberName", selectedOptions)
                          }
                          onBlur={formik.handleBlur}
                          value={formik.values.memberName}
                          name="memberName"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col">
                      <div class="mb-3">
                        <label class="form-label">From Session</label>
                        <select
                          class={`form-select ${
                            formik.touched.fromSession &&
                            formik.errors.fromSession
                              ? "is-invalid"
                              : ""
                          }`}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.fromSession || ""}
                          name="fromSession"
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
                    <div class="col">
                      <div class="mb-3">
                        <label class="form-label">To Session</label>
                        <select
                          class={`form-select ${
                            formik.touched.toSession && formik.errors.toSession
                              ? "is-invalid"
                              : ""
                          }`}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.toSession || ""}
                          name="toSession"
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
                  <div class="row">
                    <div class="col">
                      <div class="mb-3">
                        <label class="form-label">Resolution Type</label>
                        <select
                          class={`form-select ${
                            formik.touched.resolutionType &&
                            formik.errors.resolutionType
                              ? "is-invalid"
                              : ""
                          }`}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.resolutionType || ""}
                          name="resolutionType"
                        >
                          <option value="" selected disabled hidden>
                            Select
                          </option>
                          <option value="Government Resolution">
                            Government Resolution
                          </option>
                          <option value="Private Member Resolution">
                            Private Member Resolution
                          </option>
                          <option value="Govt. Resolution Supported by others">
                            Govt. Resolution Supported by others
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="col">
                      <div class="mb-3">
                        <label class="form-label">Resolution Status</label>
                        <select
                          class={`form-select ${
                            formik.touched.resolutionStatus &&
                            formik.errors.resolutionStatus
                              ? "is-invalid"
                              : ""
                          }`}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.resolutionStatus || ""}
                          name="resolutionStatus"
                        >
                          <option selected="selected" value="" hidden>
                            Resolution Status
                          </option>
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
                  </div>
                  <div class="row">
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
                            zIndex: "1",
                            color: "#666",
                          }}
                        >
                          <FontAwesomeIcon icon={faCalendarAlt} />
                        </span>
                        <DatePicker
                          selected={formik.values.fromNoticeDate}
                          onChange={(date) =>
                            formik.setFieldValue("fromNoticeDate", date)
                          }
                          onBlur={formik.handleBlur}
                          className={`form-control ${
                            formik.touched.fromNoticeDate &&
                            formik.errors.fromNoticeDate
                              ? "is-invalid"
                              : ""
                          }`}
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
                            zIndex: "1",
                            color: "#666",
                          }}
                        >
                          <FontAwesomeIcon icon={faCalendarAlt} />
                        </span>
                        <DatePicker
                          selected={formik.values.toNoticeDate}
                          onChange={(date) =>
                            formik.setFieldValue("toNoticeDate", date)
                          }
                          onBlur={formik.handleBlur}
                          className={`form-control ${
                            formik.touched.toNoticeDate &&
                            formik.errors.toNoticeDate
                              ? "is-invalid"
                              : ""
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                      <button class="btn btn-primary" type="submit">
                        Search
                      </button>
                      <button class="btn btn-primary" type="submit">
                        Reset
                      </button>
                    </div>
                  </div>

                  <div
                    class="dash-detail-container"
                    style={{ marginTop: "20px" }}
                  >
                    <CustomTable
                      hideBtn={true}
                      data={resData}
                      tableTitle="Resolutions"
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default SentResolution;
