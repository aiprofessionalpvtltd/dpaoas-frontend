import React, { useCallback, useContext, useEffect, useState } from "react";
import { QMSSideBarItems } from "../../../../../../utils/sideBarItems";
import { Layout } from "../../../../../../components/Layout";
import Header from "../../../../../../components/Header";
import { useNavigate } from "react-router";
import {
  DeleteResolution,
  getAllResolutions,
  getResolutionBYID,
  searchResolution,
} from "../../../../../../api/APIs/Services/Resolution.service";
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

function QMSNoticeResolution() {
  const navigate = useNavigate();
  const { members, sessions, resolutionStatus } = useContext(AuthContext);
  const [resData, setResData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(null);
  const pageSize = 10; // Set your desired page size

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
    if (
      formik?.values?.noticeDiaryNo ||
      formik?.values?.resolutionId ||
      formik?.values?.keyword ||
      formik?.values?.memberName ||
      formik?.values?.fromSession ||
      formik?.values?.toSession ||
      formik?.values?.resolutionType ||
      formik?.values?.resolutionStatus ||
      formik?.values?.fromNoticeDate ||
      formik?.values?.toNoticeDate
    ) {
      SearchResolutionApi(formik?.values, page);
    }
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
      const subjectMatter = [leave?.englishText, leave?.urduText]
        .filter(Boolean)
        .join(", ");
      const cleanedSubjectMatter = subjectMatter.replace(/(<([^>]+)>)/gi, "");
      return {
        SrNo: leave.id,
        memberName: leave?.resolutionMoversAssociation[0]?.memberAssociation?.memberName,
        SessionNumber: leave?.session?.sessionName
          ? leave?.session?.sessionName
          : "",
        ResolutionType: leave?.resolutionType ? leave?.resolutionType : "",
        SubjectMatter: cleanedSubjectMatter ? cleanedSubjectMatter : "",
        NoticeNo: leave?.noticeDiary?.noticeOfficeDiaryNo
          ? leave?.noticeDiary?.noticeOfficeDiaryNo
          : "",
        ResolutionStatus: leave?.resolutionStatus?.resolutionStatus
          ? leave?.resolutionStatus?.resolutionStatus
          : "",
        Status: leave?.resolutionActive ? leave?.resolutionActive : "",
        device : leave?.device,
        createdBy:leave?.resolutionSentStatus === "toResolution" ? "Notice Office": "---"
      };
    });
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      // Handle your form submission here
      SearchResolutionApi(values, currentPage);
    },
  });

  const SearchResolutionApi = async (values, page) => {
    const searchParams = {
      fkSessionNoFrom: values.fromSession,
      fkSessionNoTo: values.toSession,
      resolutionType: values.resolutionType,
      keyword: values.keyword,
      resolutionId: values.resolutionID,
      resolutionDiaryNo: values.resolutionDiaryNo,
      fkResolutionStatus: values.resolutionStatus?.value,
      noticeOfficeDiaryNo: values?.noticeDiaryNo,
      noticeOfficeDiaryDateFrom: values.fromNoticeDate,
      noticeOfficeDiaryDateTo: values.toNoticeDate,
      resolutionMovers: values?.memberName?.value,
      resolutionSentStatus:"toResolution"

    };

    try {
      const response = await searchResolution(searchParams, page, pageSize);
      if (response?.success) {
        setCount(response.data?.count);
        const transformedData = transformLeavesData(response.data?.resolutions);
        setResData(transformedData);
        showSuccessMessage(response?.message);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const getAllResolutionsApi = useCallback(async () => {
    const resolutionSentStatus = "toResolution"
    try {
      const response = await getAllResolutions(currentPage, pageSize, resolutionSentStatus);
      if (response?.success) {
        const transformedData = transformLeavesData(response?.data?.resolution);
        setCount(response?.data?.count);
        setResData(transformedData);
      }
    } catch (error) {
      console.log(error);
    }
  }, [currentPage, pageSize, setCount, setResData]);

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

  const deleteResolutionApi = async (id) => {
    try {
      const response = await DeleteResolution(id);
      if (response?.success) {
        showSuccessMessage(response?.message);
        getAllResolutionsApi();
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    if (
      formik?.values?.noticeDiaryNo ||
      formik?.values?.resolutionId ||
      formik?.values?.keyword ||
      formik?.values?.memberName ||
      formik?.values?.fromSession ||
      formik?.values?.toSession ||
      formik?.values?.resolutionType ||
      formik?.values?.resolutionStatus ||
      formik?.values?.fromNoticeDate ||
      formik?.values?.toNoticeDate
    ) {
      return;
    }
    getAllResolutionsApi();
  }, [getAllResolutionsApi, formik?.values]);
  // useEffect(() => {
  //   getAllResolutionsApi();
  // }, [currentPage]);
  const handleResetForm = () => {
    formik.resetForm();
    getAllResolutionsApi();
  };

  return (
    <Layout module={true} sidebarItems={QMSSideBarItems} centerlogohide={true}>
      <ToastContainer />
      <Header
        dashboardLink={"/"}
        addLink1={"/qms/notice/notice-resolution"}
        title1={"Notice Resolution"}
      />
      <div>
        <div class="container-fluid">
          <div class="card mt-1">
            <div
              class="card-header red-bg"
              style={{ background: "#14ae5c !important" }}
            >
              <h1>Resolution List</h1>
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
                        {/* <select
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
                        </select> */}
                        <Select
                          options={
                            resolutionStatus &&
                            resolutionStatus?.map((item) => ({
                              value: item?.id,
                              label: item?.resolutionStatus,
                            }))
                          }
                          onChange={(selectedOptions) => {
                            formik.setFieldValue(
                              "resolutionStatus",
                              selectedOptions
                            );
                          }}
                          onBlur={formik.handleBlur}
                          value={formik.values.resolutionStatus}
                          name="resolutionStatus"
                          isClearable={true}
                          // className="form-select"
                          style={{ border: "none" }}
                        />
                      </div>
                    </div>
                  </div>

                  <div class="row">
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
                            color: "#666",
                          }}
                        >
                          <FontAwesomeIcon icon={faCalendarAlt} />
                        </span>
                        <DatePicker
                          selected={formik.values.fromNoticeDate}
                          maxDate={new Date()}
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
                          dateFormat={"dd-MM-yyyy"}
                        />
                      </div>
                    </div>
                    <div className="col-4">
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
                          maxDate={new Date()}
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
                          dateFormat={"dd-MM-yyyy"}
                        />
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
                        onClick={handleResetForm}
                      >
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
                      block={true}
                      hidebtn1={true}
                      tableTitle="Resolutions"
                      handlePageChange={handlePageChange}
                      currentPage={currentPage}
                      showPrint={false}
                      pageSize={pageSize}
                      headertitlebgColor={"#666"}
                      headertitletextColor={"#FFF"}
                      // ActionHide={true}
                      hideDeleteIcon={true}
                      handleDelete={(item) => deleteResolutionApi(item.SrNo)}
                      handleEdit={(item) => handleEdit(item.SrNo)}
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

export default QMSNoticeResolution;
