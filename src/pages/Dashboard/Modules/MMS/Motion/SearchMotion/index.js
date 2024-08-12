import React, { useContext, useEffect, useState } from "react";
import { MMSSideBarItems } from "../../../../../../utils/sideBarItems";
import { Layout } from "../../../../../../components/Layout";
import Header from "../../../../../../components/Header";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import DatePicker from "react-datepicker";
import * as Yup from "yup";
import moment from "moment";
import Select from "react-select";
import {
  getAllMotion,
  getMotionByID,
  getallMotionStatus,
  searchMotion,
} from "../../../../../../api/APIs/Services/Motion.service";
import { showErrorMessage, showSuccessMessage } from "../../../../../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "../../../../../../api/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

// const validationSchema = Yup.object({
//   motionDiaryNo: Yup.string(),
//   memberName: Yup.string(),
//   motionID: Yup.string(),
//   keyword: Yup.string(),
//   fromSession: Yup.string(),
//   toSession: Yup.string(),
//   motionType: Yup.string(),
//   motionWeek: Yup.string(),
//   ministry: Yup.string(),
//   motionStatus: Yup.string(),
//   fromNoticeDate: Yup.date(),
//   toNoticeDate: Yup.date(),
//   fileNo: Yup.string(),
// });

function MMSSearchMotion() {
  const navigate = useNavigate();
  const { ministryData, members, sessions } = useContext(AuthContext);
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
      motionWeek: "",
      ministry: "",
      motionStatus: "0",
      fromNoticeDate: "",
      toNoticeDate: "",
      memberPosition:""
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
      formik?.values?.motionWeek ||
      formik?.values?.motionStatus ||
      formik?.values?.ministry ||
      formik?.values?.fromNoticeDate ||
      formik?.values?.toNoticeDate
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
    return apiData.map((item, index) => {
      const English = [item?.englishText].filter(Boolean).join(", ");
      const EnglishText = English.replace(/(<([^>]+)>)/gi, "");

      const Urdu = [item?.urduText].filter(Boolean).join(", ");
      const UrduText = Urdu.replace(/(<([^>]+)>)/gi, "");
      return {
        id: item?.id,
        SessionName: item?.sessions?.sessionName
          ? item?.sessions?.sessionName
          : "",
        motionType: item?.motionType ? item?.motionType : "",
        noticeOfficeDiaryNo: item?.noticeOfficeDairies?.noticeOfficeDiaryNo
          ? item?.noticeOfficeDairies?.noticeOfficeDiaryNo
          : "",

        noticeOfficeDiaryDate: item?.noticeOfficeDairies?.noticeOfficeDiaryDate
          ? moment(item?.noticeOfficeDairies?.noticeOfficeDiaryDate).format(
              "DD-MM-YYYY"
            )
          : "",
        noticeOfficeDiaryTime: moment(
          item?.noticeOfficeDairies?.noticeOfficeDiaryTime,
          "hh:ss A"
        ).format("hh:ss A"),
        englishText: EnglishText ? EnglishText : "",
        urduText: UrduText ? UrduText : "",
        memberPosition:item?.memberPosition,
        createdBy:item?.motionSentStatus === "toMotion" ? "From Notice Office": item?.motionSentStatus === "inMotion" ? "Motion Branch":"---"
      };
    });
  };
  // const getMotionListData = async () => {
  //   try {
  //     const response = await getAllMotion(currentPage, pageSize);

  //     if (response?.success) {
  //       // showSuccessMessage(response?.message);
  //       setCount(response?.data?.count);
  //       const transformedData = transformMotionData(response?.data?.rows);
  //       setMotionData(transformedData);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     showErrorMessage(error?.response?.data?.error);
  //   }
  // };

  const searchMotionList = async (values, page) => {
    const data = {
      // fileNumber: ,
      fkSessionId: values?.fromSession,
      noticeOfficeDiaryNo: values?.motionDiaryNo,
      fkMemberId: values?.memberName?.value,
      fkMinistryId: values?.ministry,
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
      memberPosition:values?.memberPosition,
      motionSentStatus:"inMotion",
    };
    setCount(null);

    try {
      const response = await searchMotion(page, pageSize, data); // Add await here
      if (response?.success) {
        // showSuccessMessage(response?.message);
        const transformedData = transformMotionData(response?.data?.rows);
        setMotionData(transformedData);
        showSuccessMessage(response?.message);
        setCount(response?.data?.count);
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

  useEffect(() => {
    getMotionStatus();
  }, []);

  const handleResetForm = () => {
    formik.resetForm();
    setMotionData([]);
  };
  const handleEdit = async (id) => {
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
  const hendlePrint = async (id) => {
    const encodedJsonString = encodeURIComponent(id);
    const url = `/mms/motion/preview-pdf?state=${encodedJsonString}`;
    window.open(url, "_blank");
  };

  return (
    <Layout module={true} sidebarItems={MMSSideBarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/mms/dashboard"}
        addLink1={"/mms/motion/search"}
        title1={"Search Motion"}
      />
      <ToastContainer />
      <div>
        <div class="container-fluid dash-detail-container">
          <div class="card mt-1">
            <div
              class="card-header red-bg"
              style={{ background: "#14ae5c !important" }}
            >
              <h1>Search</h1>
            </div>
            <div class="card-body">
              <form onSubmit={formik.handleSubmit}>
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Notice Office Diary No</label>
                      <input
                        type="number"
                        className={"form-control"}
                        id="motionDiaryNo"
                        // placeholder={formik.values.motionDiaryNo}
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
                        type="number"
                        // placeholder={formik.values.motionID}
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
                        // placeholder={formik.values.keyword}
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
                        // placeholder={formik.values.fromSession}
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
                        // placeholder={formik.values.toSession}
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
                        // placeholder={formik.values.motionType}
                        value={formik.values.motionType}
                        onChange={formik.handleChange}
                        id="motionType"
                        onBlur={formik.handleBlur}
                      >
                        <option value={""} selected disabled hidden>
                          Select
                        </option>

                        <option value={"Adjournment Motion"}>
                          Adjournment Motion
                        </option>
                        <option value={"Call Attention Notice"}>
                          Call Attention Notice
                        </option>

                        <option value={"Motion Under Rule 218"}>
                          Motion Under Rule 218
                        </option>
                        {/* <option value={"Motion Under Rule 60"}>
                          Motion Under Rule 60
                        </option> */}
                      </select>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Motion Week</label>
                      <select
                        class="form-select"
                        // placeholder={formik.values.motionWeek}
                        value={formik.values.motionWeek}
                        onChange={formik.handleChange}
                        id="motionWeek"
                        onBlur={formik.handleBlur}
                      >
                        <option value={""} selected disabled hidden>
                          Select
                        </option>
                        {/* <option>Motion Week</option>
                        <option>Not Applicable</option> */}
                        <option value={"Not Applicable"}>Not Applicable</option>
                        <option value={"1st Week"}>1st Week</option>
                        <option value={"2nd Week"}>2nd Week</option>
                        <option value={"3rd Week"}>3rd Week</option>
                        <option value={"4th Week"}>4th Week</option>
                        <option value={"5th Week"}>5th Week</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Ministry</label>
                      <select
                        className="form-select"
                        id="ministry"
                        name="ministry"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.ministry}
                        class="form-control"
                      >
                        <option value={""} selected disabled hidden>
                          Select
                        </option>
                        {ministryData &&
                          ministryData.map((item) => (
                            <option value={item.id}>{item.ministryName}</option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Motion Status</label>
                      <select
                        class="form-select"
                        // placeholder={formik.values.motionStatus}
                        value={formik.values.motionStatus}
                        onChange={formik.handleChange}
                        id="motionStatus"
                        onBlur={formik.handleBlur}
                      >
                        <option value={""} >
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
                  {/* <div class="col">
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
                        // minDate={new Date()}
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
                  <div class="col">
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
                        minDate={new Date()}
                        onChange={(date) =>
                          formik.setFieldValue("toNoticeDate", date)
                        }
                        className={"form-control"}
                      />
                    </div>
                  </div> */}

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
                        open={isFromNoticeOpen}
                        onClickOutside={() => setIsFromNoticeOpen(false)}
                        onInputClick={handleFromNoticeCalendarToggle}
                        maxDate={new Date()}
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
                        open={isToNoticeOpen}
                        onClickOutside={() => setIsToNoticeOpen(false)}
                        onInputClick={handleToNoticeCalendarToggle}
                        maxDate={new Date()}
                        dateFormat={"dd-MM-yyyy"}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                <div class="col-3">
                      <div class="mb-3">
                        <label class="form-label">Member Position</label>
                        <select
                          class={`form-select`}
                          placeholder="Member Position"
                          value={formik.values.memberPosition}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          name="memberPosition"
                        >
                          <option value="" selected disabled hidden>
                            Select
                          </option>
                          <option value={"Treasury"}>Treasury</option>
                          <option value={"Opposition"}>Opposition</option>
                          <option value={"Independent"}>Independent</option>
                          <option value={"Anyside"}>Anyside</option>
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
                      onClick={handleResetForm}
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
                    handleEdit={(item) => handleEdit(item?.id)}
                    headertitlebgColor={"#666"}
                    headertitletextColor={"#FFF"}
                    handlePageChange={handlePageChange}
                    currentPage={currentPage}
                    pageSize={pageSize}
                    totalCount={count}
                    showPrint={true}
                    handlePrint={(item) => hendlePrint(item?.id)}
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

export default MMSSearchMotion;
