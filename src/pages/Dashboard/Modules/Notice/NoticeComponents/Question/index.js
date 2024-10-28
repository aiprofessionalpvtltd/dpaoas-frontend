import React, { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../../../api/AuthContext";
import { useFormik } from "formik";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import Select from "react-select";
import {
  getAllCurrentDateQuestion,
  getAllQuestionByID,
  getAllQuestionNotice,
  getAllQuestionStatus,
  searchQuestion,
  sendToQuestion,
} from "../../../../../../api/APIs/Services/Question.service";
import moment from "moment";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";
import html2pdf from "html2pdf.js";
const AllQuestionComponent = ({ isDashboardData }) => {
  const navigate = useNavigate();
  const { members, sessions } = useContext(AuthContext);
  const [pdfData, setPDFData] = useState([]);
  const [resData, setResData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [allquestionStatus, setAllQuestionStatus] = useState([]);
  const [count, setCount] = useState(null);
  const [isFromNoticeOpen, setIsFromNoticeOpen] = useState(false);
  const [isToNoticeOpen, setIsToNoticeOpen] = useState(false);
  const [searchingFlag, setSearchingFlag] = useState(false);
  const pageSize = 10; // Set your desired page size

  const formik = useFormik({
    initialValues: {
      noticeOfficeDiaryNo: "",
      questionID: "",
      keyword: "",
      memberName: "",
      fromSession: "",
      toSession: "",
      category: "",
      questionStatus: "",
      fromNoticeDate: "",
      toNoticeDate: "",
    },
    onSubmit: (values) => {
      // Handle form submission here
      SearchQuestionApi(values, currentPage);
    },
  });

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
    if (
      formik?.values?.questionDiaryNo ||
      formik?.values?.questionID ||
      formik?.values?.keyword ||
      formik?.values?.memberName ||
      formik?.values?.fromSession ||
      formik?.values?.toSession ||
      formik?.values?.category ||
      formik?.values?.questionStatus ||
      formik?.values?.fromNoticeDate ||
      formik?.values?.toNoticeDate
    ) {
      SearchQuestionApi(formik?.values, page);
    }
    // SearchQuestionApi(formik?.values, page);
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

  const transformLeavesData = (apiData) => {
    return apiData.map((res, index) => {
      const subjectMatter = [res?.englishText, res?.urduText]
        .filter(Boolean)
        .join(", ");
      const cleanedSubjectMatter = subjectMatter.replace(/(<([^>]+)>)/gi, "");

      return {
        "S.No": index + 1,
        Id: res?.id,
        MemberName: res?.member ? res?.member?.memberName : "--",
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
        SubjectMatter: cleanedSubjectMatter ? cleanedSubjectMatter : "",
        Category: res.questionCategory ? res.questionCategory : "",
        // Status: res.questionStatus?.questionStatus
        //   ? res.questionStatus?.questionStatus
        //   : "",
        division: res?.divisions ? res?.divisions?.divisionName : "--",
        ministry: res?.divisions?.ministry?.ministryName
          ? res?.divisions?.ministry?.ministryName
          : "--",
        device: res?.device,
        createdBy: "inNotice" === "inNotice" ? "Notice Office" : "---",
      };
    });
  };

  const transformPdfData = (apiData) => {
    return apiData.map((res, index) => {
      const subjectMatter = [res?.englishText, res?.urduText]
        .filter(Boolean)
        .join(", ");
      const cleanedSubjectMatter = subjectMatter.replace(/(<([^>]+)>)/gi, "");

      return {
        SrNo: index + 1,
        Id: res?.id,
        MemberName: res?.member ? res?.member?.memberName : "--",
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

  const SearchQuestionApi = useCallback(
    async (values, page) => {
      setSearchingFlag(true);
      const searchParams = {
        fromSessionNo: values?.fromSession,
        toSessionNo: values?.toSession,
        memberName: values?.memberName?.value,
        questionCategory: values?.category,
        keyword: values?.keyword,
        questionID: values?.questionID,
        questionStatus: values?.questionStatus,
        // questionDiaryNo: values?.questionDiaryNo,
        questionDiaryNo: values?.noticeOfficeDiaryNo,
        noticeOfficeDiaryDateFrom:
          values?.fromNoticeDate &&
          moment(values?.fromNoticeDate).format("YYYY-MM-DD"),
        noticeOfficeDiaryDateTo:
          values?.toNoticeDate &&
          moment(values?.toNoticeDate).format("YYYY-MM-DD"),
        questionSentStatus: ["inNotice", "toQuestion"],
      };
      try {
        const response = await searchQuestion(searchParams, page, pageSize);

        if (response?.success) {
          showSuccessMessage(response?.message);
          setCount(response?.data?.count);
          const transformedData = transformLeavesData(response.data?.questions);
          const transformedPDFData = transformPdfData(response.data?.questions);
          setResData(transformedData);
          setPDFData(transformedPDFData);
        }
        // formik.resetForm();
      } catch (error) {
        showErrorMessage(error?.response?.data?.message);
      } finally {
        setSearchingFlag(false); // Set searching flag back to false
      }
    },
    [currentPage, pageSize, setCount, setResData]
  );

  // HandleEdit
  const handleEdit = async (id) => {
    try {
      const { question, history } = await getAllQuestionByID(id);

      if (question?.success) {
        navigate("/notice/question/detail", {
          state: { question: question?.data, history: history?.data },
        });
      }
    } catch (error) {
      showErrorMessage(error.response?.data?.message);
    }
  };

  const getAllQuestionsApi = useCallback(async () => {
    try {
      let response;
      if (isDashboardData) {
        const data = { questionSentStatus: "inNotice" };
        response = await getAllCurrentDateQuestion(currentPage, pageSize, data);
      } else {
        response = await getAllQuestionNotice(currentPage, pageSize);
      }
      if (response?.success) {
        const transformedData = transformLeavesData(response?.data?.questions);
        setCount(response?.data?.count);
        setResData(transformedData);
        const pdfData = transformPdfData(response?.data?.questions);
        setPDFData(pdfData);
      }
    } catch (error) {
      console.log(error);
    }
  }, [currentPage, pageSize, setCount, setResData]);

  const GetALlStatus = async () => {
    try {
      const response = await getAllQuestionStatus();
      if (response?.success) {
        setAllQuestionStatus(response?.data);
        // showSuccessMessage(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetALlStatus();
  }, []);

  // useEffect(() => {
  //   getAllQuestionsApi();
  // }, [getAllQuestionsApi]);

  useEffect(() => {
    if (
      formik?.values?.noticeOfficeDiaryNo ||
      formik?.values?.questionID ||
      formik?.values?.keyword ||
      formik?.values?.memberName ||
      formik?.values?.fromSession ||
      formik?.values?.toSession ||
      formik?.values?.category ||
      formik?.values?.questionStatus ||
      formik?.values?.fromNoticeDate ||
      formik?.values?.toNoticeDate
    ) {
      return;
    }
    getAllQuestionsApi();
  }, [getAllQuestionsApi, formik?.values]);
  // Handle Reset Form
  const handleResetForm = () => {
    formik.resetForm();
    getAllQuestionsApi();
  };

  const sendQuestion = async (id) => {
    try {
      const data = {
        questionSentDate: new Date(),
      };
      const response = await sendToQuestion(id, data);
      if (response?.success) {
        showSuccessMessage(response.message);
        getAllQuestionsApi();
      }
    } catch (error) {
      console.log(error);
    }
  };
  // PDF Content
  // const htmlcontent = `
  //  <div
  //       id="template-container"
  //       style="background: #fff; font-family: Arial, Helvetica, sans-serif;"
  //     >
  //       <div class="template" style="width: 700px; margin: 0 auto;">
  //         <div class="template-head">
  //           <h1
  //             style="text-align: center; font-size: 20px; text-decoration: underline;"
  //           >
  //             SENATE OF PAKISTAN
  //           </h1>
  //           <p
  //             style="text-align: center; font-size: 20px; margin-top: 10px; margin-bottom: 10px;"
  //           >
  //             (Notice Branch)
  //           </p>
  //         </div>
  //         <table style="width: 100%;">
  //           <thead>
  //             <tr
  //               style="background-color: #f4f4f4; border-bottom: 2px solid #ddd;"
  //             >
  //               <th style="padding: 10px; text-align: left; font-size: 14px;">Sr No</th>
  //               <th style="padding: 10px; text-align: left; font-size: 14px;">Session Number</th>
  //               <th style="padding: 10px; text-align: left; font-size: 14px;">Notice Diary Number</th>
  //               <th style="padding: 10px; text-align: left; font-size: 14px;">Notice Date</th>
  //               <th style="padding: 10px; text-align: left; font-size: 14px;">Notice Time</th>
  //               <th style="padding: 10px; text-align: left; font-size: 14px;">Mover</th>
  //               <th style="padding: 10px; text-align: left; font-size: 14px;">Category</th>
  //               <th style="padding: 10px; text-align: left; font-size: 14px;">Division</th>
  //               <th style="padding: 10px; text-align: left; font-size: 14px;">Ministry</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             ${pdfData
  //               .map(
  //                 (item, index) => `
  //                 <tr key="${index}">
  //                   <td style="padding: 10px;">${item.SrNo}</td>
  //                   <td style="padding: 10px; text-align: left; font-size: 14px;">${
  //                     item.SessionNumber
  //                   }</td>
  //                   <td style="padding: 10px;">${
  //                     item.noticeOfficeDiaryNumber
  //                   }</td>
  //                   <td style="padding: 10px; text-align: left; font-size: 14px;">${
  //                     item.NoticeDate
  //                   }</td>
  //                   <td style="padding: 10px; text-align: left; font-size: 14px;">${
  //                     item.NoticeTime
  //                   }</td>
  //                   <td style="padding: 10px; text-align: left; font-size: 14px;">${
  //                     item.MemberName
  //                   }</td>
  //                   <td style="padding: 10px; text-align: left; font-size: 14px;">${
  //                     item.Category
  //                   }</td>
  //                   <td style="padding: 10px; text-align: left; font-size: 14px;">${
  //                     item?.Division || "---"
  //                   }</td>
  //                   <td style="padding: 10px; text-align: left; font-size: 14px;">${
  //                     item?.Ministry || "---"
  //                   }</td>
  //                 </tr>
  //               `
  //               )
  //               .join("")}
  //           </tbody>
  //         </table>
  //       </div>
  //     </div>
  // `;

  const htmlcontent = `
  <div
    id="template-container"
    style="background: #fff; font-family: Arial, Helvetica, sans-serif;"
  >
    <div class="template" style="width: 100%; margin: 0; padding: 0;">
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
      <table style="width: 100%; border-collapse: collapse; margin: 0; padding: 0;">
        <thead>
          <tr
            style="background-color: #f4f4f4; border-bottom: 2px solid #ddd;"
          >
            <th style="padding: 8px; text-align: left; font-size: 14px;">Sr No</th>
            <th style="padding: 8px; text-align: left; font-size: 14px;">Session Number</th>
            <th style="padding: 8px; text-align: left; font-size: 14px;">Notice Diary Number</th>
            <th style="padding: 8px; text-align: left; font-size: 14px;">Notice Date</th>
            <th style="padding: 8px; text-align: left; font-size: 14px;">Notice Time</th>
            <th style="padding: 8px; text-align: left; font-size: 14px;">Mover</th>
            <th style="padding: 8px; text-align: left; font-size: 14px;">Category</th>
            <th style="padding: 8px; text-align: left; font-size: 14px;">Division</th>
            <th style="padding: 8px; text-align: left; font-size: 14px;">Ministry</th>
          </tr>
        </thead>
        <tbody>
          ${pdfData
            .map(
              (item, index) => `
              <tr key="${index}">
                <td style="padding: 8px;">${item.SrNo}</td>
                <td style="padding: 8px;">${item.SessionNumber}</td>
                <td style="padding: 8px;">${item.noticeOfficeDiaryNumber}</td>
                <td style="padding: 8px;">${item.NoticeDate}</td>
                <td style="padding: 8px;">${item.NoticeTime}</td>
                <td style="padding: 8px;">${item.MemberName}</td>
                <td style="padding: 8px;">${item.Category}</td>
                <td style="padding: 8px;">${item.Division || "---"}</td>
                <td style="padding: 8px;">${item.Ministry || "---"}</td>
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
            <h1>Question List</h1>
          </div>
          <div class="card-body">
            <div class="container-fluid">
              {!isDashboardData && (
                <form onSubmit={formik.handleSubmit}>
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label">Notice Diary No</label>
                          <input
                            className="form-control"
                            type="text"
                            id="noticeOfficeDiaryNo"
                            // placeholder={formik.values.questionDiaryNo}
                            value={formik.values.noticeOfficeDiaryNo}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                        </div>
                      </div>
                      {/* <div className="col">
                  <div className="mb-3">
                    <label className="form-label">Question ID</label>
                    <input
                      className="form-control"
                      type="number"
                      min={"1"}
                      value={formik.values.questionID}
                      id="questionID"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                </div> */}
                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label">Keyword</label>
                          <input
                            className="form-control"
                            type="text"
                            value={formik.values.keyword}
                            name="keyword"
                            id="keyword"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label">Mover(s)</label>
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
                          {formik.touched.memberName &&
                            formik.errors.memberName && (
                              <div class="invalid-feedback">
                                {formik.errors.memberName}
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label">From Session</label>
                          <select
                            class="form-select"
                            // placeholder={formik.values.fromSession}
                            value={formik.values.fromSession}
                            id="fromSession"
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
                            class="form-select"
                            id="toSession"
                            // placeholder={formik.values.toSession}
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
                          <label className="form-label">Category</label>
                          <select
                            class="form-select"
                            // placeholder={formik.values.category}
                            value={formik.values.category}
                            id="category"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          >
                            <option value={" "} selected disabled hidden>
                              Select
                            </option>
                            <option value={"Starred"}>Starred</option>
                            <option value={"Un-Starred"}>Un-Starred</option>
                            <option value={"Short Notice"}>Short Notice</option>
                          </select>
                        </div>
                      </div>
                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label">Question Status</label>
                          <select
                            class="form-select"
                            // placeholder={formik.values.questionStatus}
                            value={formik.values.questionStatus}
                            id="questionStatus"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          >
                            <option value={""} selected disabled hidden>
                              Select
                            </option>
                            {allquestionStatus &&
                              allquestionStatus.map((item) => (
                                <option key={item.id} value={item.id}>
                                  {item?.questionStatus}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* <div className="row">
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
                      // minDate={new Date()}
                      onChange={(date) =>
                        formik.setFieldValue("fromNoticeDate", date)
                      }
                      className={"form-control"}
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
                      // minDate={new Date()}
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
                            dateFormat="dd-MM-yyyy"
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
                            maxDate={new Date()}
                            open={isToNoticeOpen}
                            onClickOutside={() => setIsToNoticeOpen(false)}
                            onInputClick={handleToNoticeCalendarToggle}
                            dateFormat="dd-MM-yyyy"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button
                          className="btn btn-primary col-1"
                          type="button"
                          onClick={handlePDF}
                          disabled={resData?.length > 0 ? false : true}
                        >
                          Print PDF
                        </button>
                        <button className="btn btn-primary" type="submit">
                          Search
                        </button>
                        <button
                          className="btn btn-primary"
                          type="button"
                          onClick={handleResetForm}
                        >
                          Reset
                        </button>
                      </div>
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
                  data={resData}
                  tableTitle="Questions"
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
                  handleEdit={(item) => handleEdit(item?.Id)}
                  handleSent={(item) => sendQuestion(item?.Id)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllQuestionComponent;
