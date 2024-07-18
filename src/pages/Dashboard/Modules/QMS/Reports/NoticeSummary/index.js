import React, { useState } from "react";
import { NoticeSidebarItems, QMSSideBarItems } from "../../../../../../utils/sideBarItems";
import { Layout } from "../../../../../../components/Layout";
import Header from "../../../../../../components/Header";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import { noticeBusinessReport } from "../../../../../../api/APIs/Services/Question.service";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";
import moment from "moment";
import * as XLSX from "xlsx";

function NoticeSummary() {
  const [fromDate, setFromDate] = useState(null);
  const [toData, setTodate] = useState(null);
  const [questionReport, setQuestionReport] = useState([]);
  const [motionReport, setMotionReport] = useState([]);
  const [resolutionReport, setresolutionReport] = useState([]);
  const [isFromOpen, setIsFromOpen] = useState(false);
  const [isToOpen, setIsToOpen] = useState(false);
  // Handle From Notice Date Claneder Toggel
  const handleFromCalendarToggle = () => {
    setIsFromOpen(!isFromOpen);
  };
  // Handale From Notice DateCHange
  const handleFromDateSelect = (date) => {
    setFromDate(date);
    // formik.setFieldValue("fromNoticeDate", date);
    setIsFromOpen(false);
  };

  // Handle To Notice Date Claneder Toggel
  const handleToCalendarToggle = () => {
    setIsToOpen(!isToOpen);
  };
  // Handale To Notice DateCHange
  const handleToDateSelect = (date) => {
    setTodate(date);
    // formik.setFieldValue("toNoticeDate", date);
    setIsToOpen(false);
  };

  const hendleSearch = async () => {
    try {
      const response = await noticeBusinessReport(
        moment(fromDate).format("YYYY-MM-DD"),
        moment(toData).format("YYYY-MM-DD")
      );
      if (response.success) {
        setQuestionReport(response?.data?.questions);
        setMotionReport(response?.data?.motions);
        setresolutionReport(response?.data?.resolutions);
        showSuccessMessage(response.message);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };
  const damiiiData = {
    questions: [{}],
  };
  const hendleExportExcel = async () => {
    // const response = await getallcomplaintRecordByUserId(
    //     userData.fkUserId,
    //     0,
    //     100
    // );
    // if (response?.success) {
    // const data = response?.data?.complaints;

    // Create a new workbook
    // CleanData

    const QuestionRecord =
      questionReport &&
      questionReport.map((item) => ({
        SR: item?.id,
        NoticeOfficeDiaryNo: item?.noticeOfficeDiary?.noticeOfficeDiaryNo,
        noticeOfficeDiaryDate: item?.noticeOfficeDiary?.noticeOfficeDiaryDate,
        noticeOfficeDiaryTime: item?.noticeOfficeDiary?.noticeOfficeDiaryTime,
        session: item?.session?.sessionName,
        MemberName: item?.member?.memberName,
        questionStatus: item?.questionStatus?.questionStatus,
        Description: [item?.englishText, item?.urduText]
          .filter(Boolean)
          .join(", ")
          .replace(/(<([^>]+)>)/gi, ""),
      }));

    const ResolutionRecord =
      resolutionReport &&
      resolutionReport.map((item) => ({
        SR: item?.id,
        NoticeOfficeDiaryNo: item?.noticeDiary?.noticeOfficeDiaryNo,
        noticeOfficeDiaryDate: item?.noticeDiary?.noticeOfficeDiaryDate,
        noticeOfficeDiaryTime: item?.noticeDiary?.noticeOfficeDiaryTime,
        session: item?.session?.sessionName,
        resolutionType: item?.resolutionType,
        resolutionStatus: item?.resolutionStatus?.resolutionStatus,
        Description: [item?.englishText, item?.urduText]
          .filter(Boolean)
          .join(", ")
          .replace(/(<([^>]+)>)/gi, ""),
      }));

    const MotionRecord =
      motionReport &&
      motionReport.map((item) => ({
        SR: item?.id,
        NoticeOfficeDiaryNo: item?.noticeOfficeDairies?.noticeOfficeDiaryNo,
        noticeOfficeDiaryDate: item?.noticeOfficeDairies?.noticeOfficeDiaryDate,
        noticeOfficeDiaryTime: item?.noticeOfficeDairies?.noticeOfficeDiaryTime,
        session: item?.sessions?.sessionName,
        motionType: item?.motionType,
        Description: [item?.englishText, item?.urduText]
          .filter(Boolean)
          .join(", ")
          .replace(/(<([^>]+)>)/gi, ""),
      }));

    const workbook = XLSX.utils.book_new();

    // Function to add a worksheet with title and list
    const addWorksheet = (worksheetData, title) => {
      const worksheet = XLSX.utils.json_to_sheet(worksheetData);
      XLSX.utils.book_append_sheet(workbook, worksheet, title);
    };

    // Add worksheets for each category
    addWorksheet(QuestionRecord, "Question");
    // addWorksheet(ResolutionRecord, 'Resolution');
    addWorksheet(MotionRecord, "Motion");

    // Write the workbook to a file
    XLSX.writeFile(workbook, "DataSheet.xlsx");
  };
  return (
    <Layout
      module={true}
      sidebarItems={QMSSideBarItems}
      centerlogohide={true}
    >
      <ToastContainer />
      <Header
        dashboardLink={"/"}
        addLink1={"/qms/reports/notice-summary"}
        title1={"Notice Summary Reports"}
      />
      <div>
        <div class="container-fluid">
          <div class="card mt-1">
            <div
              class="card-header red-bg"
              style={{ background: "#14ae5c !important" }}
            >
              <h1>Notice Report</h1>
            </div>
            <div class="card-body">
              <div class="container-fluid">
                <div class="row">
                  <div class="col">
                    <div class="mb-3" style={{ position: "relative" }}>
                      <label class="form-label">From Date</label>
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
                        onClick={handleFromCalendarToggle}
                      >
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </span>
                      <DatePicker
                        // minDate={new Date()}
                        selected={fromDate}
                        dateFormat="dd-MM-yyyy"
                        onChange={handleFromDateSelect}
                        // onChange={(date) => setFromDate(date)}
                        className={"form-control"}
                        open={isFromOpen}
                        onClickOutside={() => setIsFromOpen(false)}
                        onInputClick={handleFromCalendarToggle}
                        maxDate={new Date()}
                      />
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3" style={{ position: "relative" }}>
                      <label class="form-label">To Date</label>
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
                        onClick={handleToCalendarToggle}
                      >
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </span>
                      <DatePicker
                        // minDate={new Date()}
                        selected={toData}
                        dateFormat="dd-MM-yyyy"
                        onChange={handleToDateSelect}
                        // onChange={(date) => setTodate(date)}
                        className={"form-control"}
                        open={isToOpen}
                        onClickOutside={() => setIsToOpen(false)}
                        onInputClick={handleToCalendarToggle}
                        maxDate={new Date()}
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button
                      class="btn btn-primary"
                      type="button"
                      onClick={() => hendleSearch()}
                    >
                      View Summary
                    </button>
                    <button
                      class="btn btn-primary"
                      type="button"
                      onClick={hendleExportExcel}
                      disabled={questionReport?.length > 0 ? false : true}
                    >
                      Print Report
                    </button>
                  </div>
                </div>
                <h2 style={{ color: "#666" }}>Question</h2>
                <div
                  class="dash-detail-container"
                  style={{ marginTop: "20px" }}
                >
                  <table class="table red-bg-head th">
                    <thead>
                      <tr>
                        <th class="text-center" scope="col">
                          Sr#
                        </th>
                        <th class="text-center" scope="col">
                          Notice Diary Number
                        </th>
                        <th class="text-center" scope="col">
                          Notice Diary Date
                        </th>
                        <th class="text-center" scope="col">
                          Notice Diary Time
                        </th>
                        <th class="text-center" scope="col">
                          Session Number
                        </th>
                        <th class="text-center" scope="col">
                          Mover
                        </th>
                        <th class="text-center" scope="col">
                          Category
                        </th>
                        <th
                          class="text-center"
                          style={{ paddingLeft: "6px" }}
                          scope="col"
                        >
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {questionReport &&
                        questionReport?.map((item) => (
                          <tr>
                            <td class="text-center">{item?.id}</td>
                            <td class="text-center">
                              {item?.noticeOfficeDiary?.noticeOfficeDiaryNo
                                ? item?.noticeOfficeDiary?.noticeOfficeDiaryNo
                                : ""}
                            </td>
                            <td class="text-center">
                              {item.noticeOfficeDiary.noticeOfficeDiaryDate
                                ? moment(
                                    item.noticeOfficeDiary.noticeOfficeDiaryDate
                                  ).format("DD-MM-YYYY")
                                : ""}
                            </td>
                            <td class="text-center">
                              {item.noticeOfficeDiary.noticeOfficeDiaryTime
                                ? moment(
                                    item.noticeOfficeDiary
                                      .noticeOfficeDiaryTime,
                                    "hh:mm A"
                                  ).format("hh:mm A")
                                : ""}
                            </td>
                            <td class="text-center">
                              {item?.session?.sessionName
                                ? item?.session?.sessionName
                                : ""}
                            </td>
                            <td class="text-center">
                              {item?.member?.memberName
                                ? item?.member?.memberName
                                : ""}
                            </td>
                            <td class="text-center">
                              {item?.questionStatus?.questionStatus
                                ? item?.questionStatus?.questionStatus
                                : ""}
                            </td>
                            <td class="text-center">
                              {[item?.englishText, item?.urduText]
                                .filter(Boolean)
                                .join(", ")
                                .replace(/(<([^>]+)>)/gi, "")}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                {/* <h2 style={{ color: "#666", marginTop: "30px" }}>Motions</h2>
                <div
                  class="dash-detail-container"
                  style={{ marginTop: "20px" }}
                >
                  <table class="table red-bg-head th">
                    <thead>
                      <tr>
                        <th class="text-center" scope="col">
                          Sr#
                        </th>
                        <th class="text-center" scope="col">
                          Notice Diary Number
                        </th>
                        <th class="text-center" scope="col">
                          Notice Diary Date
                        </th>
                        <th class="text-center" scope="col">
                          Notice Diary Time
                        </th>
                        <th class="text-center" scope="col">
                          Session Number
                        </th>

                        <th class="text-center" scope="col">
                          Motion Type
                        </th>
                        <th
                          class="text-center"
                          style={{ paddingLeft: "6px" }}
                          scope="col"
                        >
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {motionReport &&
                        motionReport?.map((item) => (
                          <tr>
                            <td class="text-center">{item?.id}</td>
                            <td class="text-center">
                              {item?.noticeOfficeDairies?.noticeOfficeDiaryNo
                                ? item?.noticeOfficeDairies?.noticeOfficeDiaryNo
                                : ""}
                            </td>
                            <td class="text-center">
                              
                              {item?.noticeOfficeDairies?.noticeOfficeDiaryDate
                                ? moment(
                                    item?.noticeOfficeDairies
                                      ?.noticeOfficeDiaryDate
                                  ).format("DD-MM-YYYY")
                                : ""}
                            </td>
                            <td class="text-center">
                              {item?.noticeOfficeDairies?.noticeOfficeDiaryTime
                                ? moment(
                                    item?.noticeOfficeDairies
                                      ?.noticeOfficeDiaryTime,
                                    "hh:mm A"
                                  ).format("hh:mm A")
                                : ""}
                            </td>
                            <td class="text-center">
                              {item?.sessions?.sessionName
                                ? item?.sessions?.sessionName
                                : ""}
                            </td>
                            <td class="text-center">
                              {item?.motionType ? item?.motionType : ""}
                            </td>
                            <td class="text-center">
                              {[item?.englishText, item?.urduText]
                                .filter(Boolean)
                                .join(", ")
                                .replace(/(<([^>]+)>)/gi, "")}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default NoticeSummary;