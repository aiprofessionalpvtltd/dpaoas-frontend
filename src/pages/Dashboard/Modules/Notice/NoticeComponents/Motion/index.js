import React, { useContext, useState, useEffect, useCallback } from "react";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import DatePicker from "react-datepicker";
import { useFormik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import Select from "react-select";
import {
  getAllCurrentDateMotions,
  getAllMotionNotice,
  getallMotionStatus,
  getMotionByID,
  searchMotionNotice,
  sendToMotion,
} from "../../../../../../api/APIs/Services/Motion.service";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../../../api/AuthContext";
import html2pdf from "html2pdf.js";
const SentMotions = ({ isDashboardData }) => {
  const navigate = useNavigate();
  const { members, sessions } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(null);
  const [motionStatus, setMotionStatus] = useState([]);
  const [motionData, setMotionData] = useState([]);
  const [motionPdfData, setMotionPDFData] = useState([]);
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
      motionStatus: "",
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
      formik?.values?.toNoticeDate ||
      formik?.values?.motionStatus
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
        SrNo: index + 1,
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
        englishText: EnglishText ? EnglishText : "",
        urduText: UrduText ? UrduText : "",
        // motionStatus: res?.motionStatuses?.statusName,
        device: res?.device,

        // createdBy:res?.motionSentStatus === "inNotice" ? "Notice Office": "---"
      };
    });
  };

  //   Transforming Motion Data For PDF
  const transformPdfData = (apiData) => {
    return apiData.map((res, index) => {
      const subjectMatter = [res?.englishText, res?.urduText]
        .filter(Boolean)
        .join(", ");
      const cleanedSubjectMatter = subjectMatter.replace(/(<([^>]+)>)/gi, "");

      return {
        SrNo: index + 1,
        Id: res?.id,
        memberName:
          res?.motionMovers
            ?.map((mover) => mover.members?.memberName)
            .join(", ") || "---",
        noticeOfficeDiaryNumber: res?.noticeOfficeDiary?.noticeOfficeDiaryNo
          ? res?.noticeOfficeDiary?.noticeOfficeDiaryNo
          : "",
        NoticeDate: res?.noticeOfficeDiary?.noticeOfficeDiaryDate
          ? moment(res?.noticeOfficeDiary?.noticeOfficeDiaryDate).format(
              "DD-MM-YYYY"
            )
          : "",
        NoticeTime: res?.noticeOfficeDiary?.noticeOfficeDiaryTime
          ? moment(
              res?.noticeOfficeDiary?.noticeOfficeDiaryTime,
              "hh:mm A"
            ).format("hh:mm A")
          : "",
        SessionNumber: res?.session?.sessionName
          ? res?.session?.sessionName
          : "",
        // SubjectMatter: cleanedSubjectMatter ? cleanedSubjectMatter : "",
        Category: res.questionCategory ? res.questionCategory : "",
        Division: res?.divisions ? res?.divisions?.divisionName : "",
        Ministry: res?.divisions?.ministry?.ministryName
          ? res?.divisions?.ministry?.ministryName
          : "",
        createdBy:
          res?.questionSentStatus === "inNotice" ? "Notice Office" : "---",
      };
    });
  };
  const getMotionListDataa = useCallback(async () => {
    const motionSentStatus = "inNotice";
    const data = { motionSentStatus: motionSentStatus };
    let response;
    try {
      if (isDashboardData) {
        response = await getAllCurrentDateMotions(currentPage, pageSize, data);
      } else {
        response = await getAllMotionNotice(
          currentPage,
          pageSize,
          motionSentStatus
        );
      }

      if (response?.success) {
        const transformedData = transformMotionData(response?.data?.rows);
        console.log(response?.data?.rows);
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
      fkMotionStatus: values?.motionStatus,
      motionSentStatus: ["inNotice", "toMotion"],
    };

    try {
      const response = await searchMotionNotice(page, pageSize, data); // Add await here
      if (response?.success) {
        // showSuccessMessage(response?.message);
        const transformedData = transformMotionData(response?.data?.rows);
        setMotionData(transformedData);
        setMotionPDFData(transformedData);
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
        navigate("/notice/motion/edit", { state: response?.data });
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
      formik?.values?.toNoticeDate ||
      formik?.values?.motionStatus
    ) {
      return;
    }
    getMotionListDataa();
  }, [getMotionListDataa, formik?.values]);

  const sendMotion = async (id) => {
    try {
      const data = {
        motionSentDate: new Date(),
      };
      const response = await sendToMotion(id, data);
      if (response?.success) {
        showSuccessMessage(response.message);
        getMotionListDataa();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // PDF Content
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
              (Notice Branch)
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
                <th style="padding: 10px; text-align: left; font-size: 14px;">Mover</th>
                <th style="padding: 10px; text-align: left; font-size: 14px;">Category</th>
                <th style="padding: 10px; text-align: left; font-size: 14px;">Division</th>
                <th style="padding: 10px; text-align: left; font-size: 14px;">Ministry</th>
              </tr>
            </thead>
            <tbody>
              ${motionPdfData
                .map(
                  (item, index) => `
                  <tr key="${index}">
                    <td style="padding: 10px;">${item.SrNo}</td>
                    <td style="padding: 10px; text-align: left; font-size: 14px;">${
                      item.SessionNumber
                    }</td>
                    <td style="padding: 10px;">${
                      item.noticeOfficeDiaryNumber
                    }</td>
                    <td style="padding: 10px; text-align: left; font-size: 14px;">${
                      item.NoticeDate
                    }</td>
                    <td style="padding: 10px; text-align: left; font-size: 14px;">${
                      item.NoticeTime
                    }</td>
                    <td style="padding: 10px; text-align: left; font-size: 14px;">${
                      item.MemberName
                    }</td>
                    <td style="padding: 10px; text-align: left; font-size: 14px;">${
                      item.Category
                    }</td>
                    <td style="padding: 10px; text-align: left; font-size: 14px;">${
                      item?.Division || "---"
                    }</td>
                    <td style="padding: 10px; text-align: left; font-size: 14px;">${
                      item?.Ministry || "---"
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
      filename: "Questions-In-Notice.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    // Generate the PDF from the htmlcontent
    html2pdf().from(tempDiv).set(options).save();
  };
  return (
    <div>
      <div class="container-fluid">
        <div class="card mt-1">
          <div
            class="card-header red-bg"
            style={{ background: "#14ae5c !important" }}
          >
            <h1>Motions List</h1>
          </div>
          <div class="card-body">
            <div class="container-fluid">
              {!isDashboardData && (
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
                    {/* <div class="col">
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
                    </div> */}
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
                          <option>Motion Under Rule 60</option>
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
                    </div> */}
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
                    <div className="col-4">
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
                      <button
                        className="btn btn-primary col-1"
                        type="button"
                        onClick={handlePDF}
                      >
                        Print PDF
                      </button>
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
                </form>
              )}

              <div class="" style={{ marginTop: "20px" }}>
                <CustomTable
                  // block={true}
                  hideBtn={true}
                  hidebtn1={true}
                  // data={searchedData}
                  data={motionData}
                  tableTitle="Motions"
                  handlePageChange={handlePageChange}
                  currentPage={currentPage}
                  totalCount={count}
                  pageSize={pageSize}
                  headertitlebgColor={"#666"}
                  headertitletextColor={"#FFF"}
                  showPrint={false}
                  ActionHide={false}
                  hideEditIcon={false}
                  hideDeleteIcon={true}
                  showSent={true}
                  handleAdd={(item) => navigate("/")}
                  handleEdit={(item) => hendleEdit(item?.id)}
                  handleSent={(item) => sendMotion(item?.id)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentMotions;

{
  /* <div class="" style={{ marginTop: "20px" }}>
  <CustomTable
    data={motionData}
    headerShown={true}
    hideDeleteIcon={true}
    tableTitle={"Motions List"}
    // handleDelete={(item) => alert(item.id)}

    headertitlebgColor={"#666"}
    headertitletextColor={"#FFF"}
    handlePageChange={handlePageChange}
    currentPage={currentPage}
    pageSize={pageSize}
    totalCount={count}
    showSent={true}
    handleSent={(item) => sendMotion(item?.id)}
  />
</div>; */
}
