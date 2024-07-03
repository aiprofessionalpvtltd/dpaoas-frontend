import React, { useContext, useEffect, useState } from "react";
import { Layout } from "../../../../../components/Layout";
import Header from "../../../../../components/Header";
import CustomTable from "../../../../../components/CustomComponents/CustomTable";
import { useNavigate } from "react-router-dom";
import { QMSSideBarItems } from "../../../../../utils/sideBarItems";
import DatePicker from "react-datepicker";
import Select from "react-select";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";
import { useFormik } from "formik";
import {
  DeleteResolution,
  getResolutionBYID,
  searchResolution,
} from "../../../../../api/APIs/Services/Resolution.service";
import { AuthContext } from "../../../../../api/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { getAllQuestionStatus } from "../../../../../api/APIs/Services/Question.service";

function QMSSerchResolution() {
  const navigate = useNavigate();
  const { members, sessions, resolutionStatus } = useContext(AuthContext);
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
      const subjectMatter = [res?.englishText, res?.urduText]
        .filter(Boolean)
        .join(", ");
      const cleanedSubjectMatter = subjectMatter.replace(/(<([^>]+)>)/gi, "");
      const movers =
        res?.resolutionMoversAssociation.map(
          (item) => item?.memberAssociation?.memberName
        ) || [];

      return {
        RID: res.id,
        // ResDN: res.resolutionDiaries,
        SessionNumber: res.session?.sessionName ? res.session?.sessionName : "",
        ResolutionType: res.resolutionType ? res.resolutionType : "",
        SubjectMatter: cleanedSubjectMatter ? cleanedSubjectMatter : "",
        NoticeNo: res.noticeDiary?.noticeOfficeDiaryNo
          ? res.noticeDiary?.noticeOfficeDiaryNo
          : "",
        ResolutionStatus: res.resolutionStatus?.resolutionStatus
          ? res.resolutionStatus?.resolutionStatus
          : "",
        Movers: movers ? movers : "",
        createdByUser: res?.createdBy ? `${res?.createdBy.employee?.firstName} ${res?.createdBy.employee?.lastName}` :"--",
        Status:res?.resolutionActive,
      };
    });
  };

  const SearchResolutionApi = async (values) => {
    const searchParams = {
      fkSessionNoFrom: values.fromSession,
      fkSessionNoTo: values.toSession,
      resolutionType: values.resolutionType,
      keyword: values.keyword,
      resolutionId: values.resolutionID,
      resolutionDiaryNo: values.resolutionDiaryNo,
      fkResolutionStatus: values.resolutionStatus?.value,
      noticeOfficeDiaryNo: "",
      noticeOfficeDiaryDateFrom: values.fromNoticeDate,
      noticeOfficeDiaryDateTo: values.toNoticeDate,
      resolutionMovers: values?.memberName?.value,
      resolutionSentStatus:"inResolution"
    };

    try {
      const response = await searchResolution(
        searchParams,
        currentPage,
        pageSize
      );

      if (response?.success) {
        showSuccessMessage(response?.message);
        const transformedData = transformLeavesData(
          response?.data?.resolutions
        );
        setSearchedData(transformedData);
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
      showErrorMessage(error?.response?.data?.message);
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

  const deleteResolutionApi = async (id) => {
    try {
      const response = await DeleteResolution(id);
      if (response?.success) {
        showSuccessMessage(response?.message);
        SearchResolutionApi(formik.values);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };


  useEffect(() => {
    GetALlStatus();
  }, []);
  const handleResetForm = () => {
    formik.resetForm();
    setSearchedData([]);
  };

  return (
    <Layout module={true} sidebarItems={QMSSideBarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/"}
        addLink1={"/qms/resolution/search"}
        title1={"Search Resolution"}
      />
      <ToastContainer />
      <div class="container-fluid">
        <div class="card mt-4">
          <div
            class="card-header red-bg"
            style={{ background: "#14ae5c !important" }}
          >
            <h1>Search</h1>
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
                            value={formik.values.resolutionDiaryNo}
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
                            value={formik.values.resolutionID}
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
                            value={formik.values.keyword}
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
                            onChange={(selectedOptions) =>
                              formik.setFieldValue(
                                "memberName",
                                selectedOptions
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
                            value={formik.values.fromSession}
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
                            value={formik.values.toSession}
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
                            value={formik.values.resolutionType}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          >
                            <option value={""} selected disabled hidden>
                              Select
                            </option>
                            <option value={"Government Resolution"}>
                              Government Resolution
                            </option>
                            <option value={"Private Member Resolution"}>
                              Private Member Resolution
                            </option>
                            <option
                              value={"Govt. Resolution Supported by others"}
                            >
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
                          {/* <select
                            className="form-select"
                            id="resolutionStatus"
                            value={formik.values.resolutionStatus}
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
                            maxDate={new Date()}
                            onChange={(date) =>
                              formik.setFieldValue("fromNoticeDate", date)
                            }
                            className={`form-control`}
                            dateFormat={"dd-MM-yyyy"}
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
                            maxDate={new Date()}
                            onChange={(date) =>
                              formik.setFieldValue("toNoticeDate", date)
                            }
                            className={`form-control`}
                            dateFormat={"dd-MM-yyyy"}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button className="btn btn-primary" type="submit">
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
                  </div>
                </form>

              {/* <div class="row mt-3">
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button class="btn btn-primary mb-3" type="submit">
                    Print Resolution
                  </button>
                  <button class="btn btn-primary mb-3" type="submit">
                    Motion Annual Report
                  </button>
                </div>
              </div> */}
              <div className="mt-3">
              <CustomTable
                    block={false}
                    hideBtn={true}
                    data={searchedData}
                    hidebtn1={true}
                    // ActionHide={true}
                    tableTitle="Resolutions"
                    handlePageChange={handlePageChange}
                    currentPage={currentPage}
                    headertitlebgColor={"#666"}
                    headertitletextColor={"#FFF"}
                    showPrint={false}
                    pageSize={pageSize}
                    handleEdit={(item) => handleEdit(item.RID)}
                    handleDelete={(item) => deleteResolutionApi(item.RID)}
                  />
              </div>
             
              {/* <div class="row mt-3">
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Resolution Status</label>
                    <select class="form-select">
                      <option selected="selected" value="0" disabled hidden>
                        selected
                      </option>
                      {resolutionStatus &&
                        resolutionStatus.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item?.resolutionStatus}
                          </option>
                        ))}
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
                        zIndex: "1",
                        color: "#666",
                      }}
                    >
                      <FontAwesomeIcon icon={faCalendarAlt} />
                    </span>
                    <DatePicker
                      // selected={formik.values.fromNoticeDate}
                      minDate={new Date()}
                      // onChange={(date) => formik.setFieldValue("fromNoticeDate", date)}
                      className={"form-control"}
                    />
                  </div>
                </div>
                <div class="col">
                  <button
                    style={{ marginTop: "30px" }}
                    class="btn btn-primary"
                    type="submit"
                  >
                    Change Status
                  </button>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default QMSSerchResolution;
