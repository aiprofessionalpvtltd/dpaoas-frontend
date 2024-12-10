import React, { useContext, useEffect, useState } from "react";
import { NoticeSidebarItems } from "../../../../../../utils/sideBarItems";
import { Layout } from "../../../../../../components/Layout";
import Header from "../../../../../../components/Header";
import { useNavigate } from "react-router";
import {
  getAllMotion,
  getMotionByID,
  getallMotionStatus,
  searchMotion,
} from "../../../../../../api/APIs/Services/Motion.service";
import DatePicker from "react-datepicker";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";
import { useFormik } from "formik";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import { AuthContext } from "../../../../../../api/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import Select from "react-select";
import html2pdf from "html2pdf.js";
function SearchMotion() {
  const navigate = useNavigate();
  const { ministryData, members, sessions } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(null);
  const [motionStatus, setMotionStatus] = useState([]);
  const [motionData, setMotionData] = useState([]);
  const [motionPDFData, setMotionPDFData] = useState([]);
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
    console.log("API DATA MOTION", apiData);
    return apiData.map((res, index) => {
      const english = [res?.englishText].filter(Boolean).join(", ");
      const EnglishText = english.replace(/(<([^>]+)>)/gi, "");

      const urdu = [res?.urduText].filter(Boolean).join(", ");
      const UrduText = urdu.replace(/(<([^>]+)>)/gi, "");

      return {
        "S.No": index + 1,
        id: res?.id,
        // memberName: res?.motionMovers[0]?.members?.memberName,
        memberName:
          res?.motionMovers
            ?.map((mover) => mover.members?.memberName)
            .join(", ") || "---",
        SessionNumber: res?.sessions?.sessionName
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
        englishText: EnglishText ? EnglishText : "No English Text",
        urduText: UrduText ? UrduText : "No Urdu Text",
        // motionStatus: res?.motionStatuses?.statusName,
        device: res?.device,

        createdBy:
          res?.motionSentStatus === "inNotice" ? "Notice Office" : "---",
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
      // fkSessionId: values?.fromSession,
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
      motionSentStatus: ["inNotice"],
    };
    setCount(null);

    try {
      const response = await searchMotion(page, pageSize, data); // Add await here
      if (response?.success) {
        // showSuccessMessage(response?.message);
        const transformedData = transformMotionData(response?.data?.rows);
        const transformedPDFData = transformPdfData(response?.data?.rows);
        setMotionData(transformedData);
        setMotionPDFData(transformedPDFData);
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
        navigate("/notice/motion/edit", { state: response?.data });
        //   navigate("/notice/question/detail", {
        //     state: { question: question?.data, history: history?.data },
        //   });
      }
    } catch (error) {
      showErrorMessage(error.response?.data?.message);
    }
  };
  //   Transforming Motion Data For PDF
  const transformPdfData = (apiData) => {
    return apiData.map((res, index) => {
      const subjectMatter = [res?.englishText, res?.urduText]
        .filter(Boolean)
        .join(", ");
      const cleanedSubjectMatter = subjectMatter.replace(/(<([^>]+)>)/gi, "");

      return {
        "S.No": index + 1,
        id: res?.id,
        // memberName: res?.motionMovers[0]?.members?.memberName,
        memberName:
          res?.motionMovers
            ?.map((mover) => mover.members?.memberName)
            .join(", ") || "---",
        SessionNumber: res?.sessions?.sessionName
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
        description: res?.englishText,
        // urduText: UrduText ? UrduText : "",
        // motionStatus: res?.motionStatuses?.statusName,
        // device: res?.device,

        // createdBy:res?.motionSentStatus === "inNotice" ? "Notice Office": "---"
      };
    });
  };
  const htmlcontent = `
  <div
       id="template-container"
       style="background: #fff; font-family: Arial, Helvetica, sans-serif;"
     >
       <div class="template" style="width: 700px; margin: 0 auto;">
         <div class="template-head">
           <h1
             style="text-align: center; font-size: 20px; text-decoration: underline;"
           >
             SENATE OF PAKISTAN
           </h1>
           <p
             style="text-align: center; font-size: 20px; margin-top: 10px; margin-bottom: 10px;"
           >
             (Notice Branch) / Motions
           </p>
         </div>
         <table style="width: 100%;">
           <thead>
             <tr
               style="background-color: #f4f4f4; border-bottom: 2px solid #ddd;"
             >
               <th style="padding: 10px; text-align: left; font-size: 14px;">Sr No</th>
               <th style="padding: 10px; text-align: left; font-size: 14px;">Session Number</th>
               <th style="padding: 10px; text-align: left; font-size: 14px;">Notice Diary Number</th>
               <th style="padding: 10px; text-align: left; font-size: 14px;">Notice Date</th>
               <th style="padding: 10px; text-align: left; font-size: 14px;">Notice Time</th>
               <th style="padding: 10px; text-align: left; font-size: 14px;">Motion Type</th>
               <th style="padding: 10px; text-align: left; font-size: 14px;">Mover</th>
               <th style="padding: 10px; text-align: left; font-size: 14px;">Description</th>
               
             </tr>
           </thead>
           <tbody>
             ${motionPDFData
               .map(
                 (item, index) => `
                 <tr key="${index}">
                    <td style="padding: 10px;">${item["S.No"]}</td>
                   <td style="padding: 10px; text-align: left; font-size: 12px;">${
                     item?.SessionNumber
                   }</td>
                   <td style="padding: 10px;">${item?.noticeOfficeDiaryNo}</td>
                   <td style="padding: 10px; text-align: left; font-size: 11px;">${
                     item?.noticeOfficeDiaryDate
                   }</td>
                   <td style="padding: 10px; text-align: left; font-size: 11px;">${
                     item?.noticeOfficeDiaryTime
                   }</td>
                   <td style="padding: 10px; text-align: left; font-size: 12px;">${
                     item?.motionType
                   }</td>
                  <td style="padding: 10px; text-align: left; font-size: 12px;">
         ${
           item?.memberName
             .split(",") // Split names by comma
             .map((name) => name.trim()) // Trim spaces for each name
             .join("<br>") // Join each name with a line break
         }
       </td>
                   <td style="padding: 10px; text-align: left; font-size: 12px;">${
                     item?.description
                   }</td>
                  
                   
                 </tr>
               `
               )
               .join("")}
           </tbody>
         </table>
       </div>
     </div>
 `;

  const handlePDF = () => {
    // Create a temporary container to hold the HTML content for pdf
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlcontent;

    // Define PDF options
    const options = {
      margin: 0.5,
      filename: "Motions.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    // Generate the PDF from the htmlcontent
    html2pdf().from(tempDiv).set(options).save();
  };
  // const handlePDF = async () => {
  //   const encodedJsonString = encodeURIComponent(JSON.stringify(motionData));
  //   const url = `/notice/motion/pdf-preview?state=${encodedJsonString}`;
  //   window.open(url, "_blank");
  // };

  return (
    <Layout
      module={true}
      sidebarItems={NoticeSidebarItems}
      centerlogohide={true}
    >
      <ToastContainer />
      <Header
        dashboardLink={"/notice/dashboard"}
        addLink1={"/notice/motion/search"}
        title1={"Search Motion"}
      />

      <div>
        <div class="container-fluid">
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
                  {/* <div class="col">
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
                  </div> */}
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
                      <label class="form-label">Mover(s)</label>
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
                        <option value={"Motion Under Rule 60"}>
                          Motion Under Rule 60
                        </option>
                      </select>
                    </div>
                  </div>
                  {/* <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Motion Week</label>
                      <select
                        class="form-select"
                        value={formik.values.motionWeek}
                        onChange={formik.handleChange}
                        id="motionWeek"
                        onBlur={formik.handleBlur}
                      >
                        <option value={""} selected disabled hidden>
                          Select
                        </option>                      
                        <option value={"1st Week"}>1st Week</option>
                        <option value={"2nd Week"}>2nd Week</option>
                        <option value={"3rd Week"}>3rd Week</option>
                        <option value={"4th Week"}>4th Week</option>
                        <option value={"5th Week"}>5th Week</option>
                      </select>
                    </div>
                  </div> */}
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
                  {/* <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Motion Status</label>
                      <select
                        class="form-select"
                        value={formik.values.motionStatus}
                        onChange={formik.handleChange}
                        id="motionStatus"
                        onBlur={formik.handleBlur}
                      >
                        <option value={""} selected disabled hidden>
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
                  </div> */}
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

                <div class="row">
                  <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button
                      className="btn btn-primary col-1"
                      type="button"
                      onClick={handlePDF}
                      disabled={motionData?.length > 0 ? false : true}
                    >
                      Download Report
                    </button>
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
                <div className="" style={{ marginTop: "20px" }}>
                  <CustomTable
                    hideBtn={true}
                    hidebtn1={true}
                    block={false}
                    tableTitle="Search Motions"
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
                    ActionHide={true}
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

export default SearchMotion;
