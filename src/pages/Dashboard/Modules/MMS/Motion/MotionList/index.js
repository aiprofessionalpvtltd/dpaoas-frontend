import React, { useCallback, useContext, useEffect, useState } from "react";
import { MMSSideBarItems } from "../../../../../../utils/sideBarItems";
import { Layout } from "../../../../../../components/Layout";
import Header from "../../../../../../components/Header";
import { useNavigate } from "react-router";
import DatePicker from "react-datepicker";

import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";
import { useFormik } from "formik";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import {
  getAllMotion,
  getMotionByID,
  getallMotionStatus,
  searchMotion,
} from "../../../../../../api/APIs/Services/Motion.service";
import { AuthContext } from "../../../../../../api/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import Select from "react-select";

function MMSMotionList() {
  const navigate = useNavigate();
  const { members, sessions } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(null);
  const [motionStatus, setMotionStatus] = useState([]);
  const [motionData, setMotionData] = useState([]);
  const [isFromNoticeOpen, setIsFromNoticeOpen] = useState(false);
  const [isToNoticeOpen, setIsToNoticeOpen] = useState(false);
  const pageSize = 10; // Set your desired page size

  const formik = useFormik({
    initialValues: {
      motionDiaryNo: "",
      motionID: "",
      keyword: "",
      memberName: "",
      fromSession: "",
      toSession: "",
      motionType: "",
      fkmotionStatus: "",
      fromNoticeDate: "",
      toNoticeDate: "",
    },
    onSubmit: (values) => {
      // Handle form submission here
      searchMotionList(values, currentPage);
    },
  });

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
    if (
      formik?.values?.motionDiaryNo ||
      formik?.values?.motionID ||
      formik?.values?.keyword ||
      formik?.values?.memberName ||
      formik?.values?.fromSession ||
      formik?.values?.toSession ||
      formik?.values?.motionType ||
      formik?.values?.fromNoticeDate ||
      formik?.values?.toNoticeDate || formik?.values?.fkmotionStatus
    ) {
      searchMotionList(formik?.values, page);
    }
  };

  // Handle From Notice Date Claneder Toggel
  const handleFromNoticeCalendarToggle = () => {
    setIsFromNoticeOpen(!isFromNoticeOpen);
  };
  // Handale From Notice DateCHange
  const handleFromNoticeDateSelect = (date) => {
    formik.setFieldValue("fromNoticeDate", date);
    setIsFromNoticeOpen(false);
  };

  // Handle To Notice Date Claneder Toggel
  const handleToNoticeCalendarToggle = () => {
    setIsToNoticeOpen(!isToNoticeOpen);
  };
  // Handale To Notice DateCHange
  const handleToNoticeDateSelect = (date) => {
    formik.setFieldValue("toNoticeDate", date);
    setIsToNoticeOpen(false);
  };

  const transformMotionData = (apiData) => {
    return apiData.map((res, index) => {
      const english = [res?.englishText].filter(Boolean).join(", ");
      const EnglishText = english.replace(/(<([^>]+)>)/gi, "");

      const urdu = [res?.urduText].filter(Boolean).join(", ");
      const UrduText = urdu.replace(/(<([^>]+)>)/gi, "");

      return {
        id: res?.id,
        SessionName: res?.sessions?.sessionName
          ? res?.sessions?.sessionName
          : "",
        motionType: res?.motionType ? res?.motionType : "",
        noticeOfficeDiaryNo: res?.noticeOfficeDairies?.noticeOfficeDiaryNo
          ? res?.noticeOfficeDairies?.noticeOfficeDiaryNo
          : "",
        noticeOfficeDiaryDate: res?.noticeOfficeDairies?.noticeOfficeDiaryDate
          ? moment(res?.noticeOfficeDairies?.noticeOfficeDiaryDate).format(
              "DD-MM-YYYY"
            )
          : "",
        noticeOfficeDiaryTime: res?.noticeOfficeDairies?.noticeOfficeDiaryTime
          ? moment(
              res?.noticeOfficeDairies?.noticeOfficeDiaryTime,
              "hh:ss A"
            ).format("hh:ss A")
          : "",
        englishText: EnglishText ? EnglishText : "",
        urduText: UrduText ? UrduText : "",
        motionStatus: res?.motionStatuses?.statusName,
        createdBy:res?.motionSentStatus === "toMotion" ? "From Notice Office": res?.motionSentStatus === "inMotion" ? "Motion Branch":"---"
      };
    });
  };

  const getMotionListDataa = useCallback(async () => {
    const motionSentStatus = "inMotion"
    const motiontoStatus ="toMotion"
    try {
      const response = await getAllMotion(currentPage, pageSize, motionSentStatus, motiontoStatus);
      if (response?.success) {
        const transformedData = transformMotionData(response?.data?.rows);
        setCount(response?.data?.count);
        setMotionData(transformedData);
      }
    } catch (error) {
      console.log(error);
    }
  }, [currentPage, pageSize, setCount, setMotionData]);

  const searchMotionList = async (values, page) => {
    const data = {
      // fileNumber: ,
      // fkSessionId: values?.fromSession,
      noticeOfficeDiaryNo: values?.motionDiaryNo,
      fkMemberId: values?.memberName?.value,
      fkMinistryId: "",
      motionId: values?.motionID,
      sessionStartRange: values?.fromSession,
      sessionEndRange: values?.toSession,
      noticeStartRange:
        values?.fromNoticeDate &&
        moment(values?.fromNoticeDate).format("YYYY-MM-DD"),
      noticeEndRange:
        values?.toNoticeDate &&
        moment(values?.toNoticeDate).format("YYYY-MM-DD"),
      englishText: values?.keyword,
      motionWeek: values?.motionWeek,
      motionType: values?.motionType,
      fkMotionStatus: values?.fkmotionStatus,
      motionSentStatus:["inMotion","toMotion"]
    };

    try {
      const response = await searchMotion(page, pageSize, data); // Add await here
      if (response?.success) {
        showSuccessMessage(response?.message);
        const transformedData = transformMotionData(response?.data?.rows);
        setMotionData(transformedData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getMotionStatus = async () => {
    try {
      const response = await getallMotionStatus();
      if (response?.success) {
        setMotionStatus(response?.data);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const hendleEdit = async (id) => {
    try {
      // const { question, history } = await getMotionByID(id);
      const response = await getMotionByID(id);

      if (response?.success) {
        navigate("/mms/motion/detail", { state: response?.data });
        //   navigate("/notice/question/detail", {
        //     state: { question: question?.data, history: history?.data },
        //   });
      }
    } catch (error) {
      showErrorMessage(error.response?.data?.message);
    }
  };

  useEffect(() => {
    getMotionStatus();
  }, []);

  useEffect(() => {
    if (
      formik?.values?.motionDiaryNo ||
      formik?.values?.motionID ||
      formik?.values?.keyword ||
      formik?.values?.memberName ||
      formik?.values?.fromSession ||
      formik?.values?.toSession ||
      formik?.values?.motionType ||
      formik?.values?.fromNoticeDate ||
      formik?.values?.toNoticeDate || formik.values?.fkmotionStatus
    ) {
      return;
    }
    getMotionListDataa();
  }, [getMotionListDataa, formik?.values]);

  return (
    <Layout module={true} sidebarItems={MMSSideBarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/"}
        addLink1={"/mms/motion/list"}
        title1={"Motion List"}
      />
      <ToastContainer />
      <div>
        <div class="container-fluid dash-detail-container">
          <div class="card mt-1">
            <div
              class="card-header red-bg"
              style={{ background: "#14ae5c !important" }}
            >
              <h1>Motion List</h1>
            </div>
            <div class="card-body">
              <form onSubmit={formik.handleSubmit}>
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Motion Office Diary No</label>
                      <input
                        type="text"
                        className={"form-control"}
                        id="motionDiaryNo"
                        value={formik.values.motionDiaryNo}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Motion ID</label>
                      <input
                        class="form-control"
                        type="text"
                        value={formik.values.motionID}
                        onChange={formik.handleChange}
                        id="motionID"
                        onBlur={formik.handleBlur}
                      />
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Keyword</label>
                      <input
                        class="form-control"
                        type="text"
                        value={formik.values.keyword}
                        onChange={formik.handleChange}
                        id="keyword"
                        onBlur={formik.handleBlur}
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
                      {formik.touched.memberName &&
                        formik.errors.memberName && (
                          <div class="invalid-feedback">
                            {formik.errors.memberName}
                          </div>
                        )}
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">From Session</label>
                      <select
                        class="form-select"
                        value={formik.values.fromSession}
                        onChange={formik.handleChange}
                        id="fromSession"
                        onBlur={formik.handleBlur}
                      >
                        <option value={""} selected disabled hidden>
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
                        class="form-select"
                        value={formik.values.toSession}
                        onChange={formik.handleChange}
                        id="toSession"
                        onBlur={formik.handleBlur}
                      >
                        <option value={""} selected disabled hidden>
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
                      <label class="form-label">Motion Type</label>
                      <select
                        class="form-select"
                        value={formik.values.motionType}
                        onChange={formik.handleChange}
                        id="motionType"
                        onBlur={formik.handleBlur}
                      >
                        <option value={""} selected disabled hidden>
                          Select motion Type
                        </option>
                        <option>Motion Type</option>
                        <option>Adjournment Motion</option>
                        <option>Call Attention Notice</option>
                        <option>Privilege Motion</option>
                        <option>Motion Under Rule 218</option>
                        {/* <option>Motion Under Rule 60</option> */}
                      </select>
                    </div>
                  </div>

                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Motion Status</label>
                      <select
                        class="form-select"
                        value={formik.values.fkmotionStatus}
                        onChange={formik.handleChange}
                        id="fkmotionStatus"
                        onBlur={formik.handleBlur}
                      >
                        <option value={" "} selected>
                          Select
                        </option>
                        {motionStatus &&
                          motionStatus.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item?.statusName}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* <div class="row">
                  <div class="col-3">
                    <div class="mb-3" style={{ position: "relative" }}>
                      <label class="form-label">From Notice Date</label>
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
                        className={`form-control ${
                          formik.errors.fromNoticeDate &&
                          formik.touched.fromNoticeDate
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {formik.errors.fromNoticeDate &&
                        formik.touched.fromNoticeDate && (
                          <div className="invalid-feedback">
                            {formik.errors.fromNoticeDate}
                          </div>
                        )}
                    </div>
                  </div>
                  <div class="col-3">
                    <div class="mb-3" style={{ position: "relative" }}>
                      <label class="form-label">To Notice Date</label>
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
                        className={"form-control"}
                      />
                    </div>
                  </div>
                </div> */}

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
                          color: "#666",
                          cursor: "pointer",
                        }}
                        onClick={handleFromNoticeCalendarToggle}
                      >
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </span>

                      <DatePicker
                        selected={formik.values.fromNoticeDate}
                        onChange={handleFromNoticeDateSelect}
                        onBlur={formik.handleBlur}
                        className={`form-control ${
                          formik.touched.fromNoticeDate &&
                          formik.errors.fromNoticeDate
                            ? "is-invalid"
                            : ""
                        }`}
                        dateFormat={"dd-MM-yyyy"}
                        maxDate={new Date()}
                        open={isFromNoticeOpen}
                        onClickOutside={() => setIsFromNoticeOpen(false)}
                        onInputClick={handleFromNoticeCalendarToggle}
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
                          color: "#666",
                          cursor: "pointer",
                        }}
                        onClick={handleToNoticeCalendarToggle}
                      >
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </span>

                      <DatePicker
                        selected={formik.values.toNoticeDate}
                        onChange={handleToNoticeDateSelect}
                        onBlur={formik.handleBlur}
                        className={`form-control ${
                          formik.touched.toNoticeDate &&
                          formik.errors.toNoticeDate
                            ? "is-invalid"
                            : ""
                        }`}
                        maxDate={new Date()}
                        dateFormat={"dd-MM-yyyy"}
                        open={isToNoticeOpen}
                        onClickOutside={() => setIsToNoticeOpen(false)}
                        onInputClick={handleToNoticeCalendarToggle}
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
                      onClick={() => formik.resetForm()}
                    >
                      Reset
                    </button>
                  </div>
                </div>
                <div class="" style={{ marginTop: "20px" }}>
                  <CustomTable
                    data={motionData}
                    headerShown={true}
                    hideDeleteIcon={true}
                    // handleDelete={(item) => alert(item.id)}
                    handleEdit={(item) => hendleEdit(item?.id)}
                    headertitlebgColor={"#666"}
                    headertitletextColor={"#FFF"}
                    handlePageChange={handlePageChange}
                    currentPage={currentPage}
                    pageSize={pageSize}
                    totalCount={count}
                    // ActionHide={true}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default MMSMotionList;
