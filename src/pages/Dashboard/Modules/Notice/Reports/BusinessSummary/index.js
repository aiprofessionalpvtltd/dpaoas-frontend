import React, { useState } from "react";
import { NoticeSidebarItems } from "../../../../../../utils/sideBarItems";
import { Layout } from "../../../../../../components/Layout";
import Header from "../../../../../../components/Header";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import { noticeBusinessReport } from "../../../../../../api/APIs/Services/Question.service";
import { showErrorMessage, showSuccessMessage } from "../../../../../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";
import moment from "moment";
import * as XLSX from "xlsx";

function BusinessSummary() {
  const [fromDate, setFromDate] = useState(null)
  const [toData, setTodate] = useState(null)
  const [questionReport, setQuestionReport] = useState([])
  const [motionReport, setMotionReport] = useState([])
  const [resolutionReport, setresolutionReport] = useState([])
  const hendleSearch = async () => {
    try {
      const response = await noticeBusinessReport(moment(fromDate).format("DD-MM-YYYY"), moment(toData).format("DD-MM-YYYY"))
      if (response.success) {
        setQuestionReport(response?.data?.questions);
        setMotionReport(response?.data?.motions)
        setresolutionReport(response?.data?.resolutions)
        showSuccessMessage(response.message)
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  }
const damiiiData = {
 questions:[
    {
      
    }
 ],
}
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

         const QuestionRecord =questionReport && questionReport.map((item) => ({
          SR: item?.id,
          NoticeOfficeDiaryNo: item?.noticeOfficeDiary?.noticeOfficeDiaryNo,
          noticeOfficeDiaryDate: item?.noticeOfficeDiary?.noticeOfficeDiaryDate,
          noticeOfficeDiaryTime: item?.noticeOfficeDiary?.noticeOfficeDiaryTime,
          session: item?.session?.sessionName,
          MemberName: item?.member?.memberName,
          questionStatus: item?.questionStatus?.questionStatus,
          Description: [item?.englishText, item?.urduText]
            .filter(Boolean)
            .join(", ").replace(/(<([^>]+)>)/gi, ""),
        }));

        const ResolutionRecord =resolutionReport && resolutionReport.map((item) => ({
          SR: item?.id,
          NoticeOfficeDiaryNo: item?.noticeDiary?.noticeOfficeDiaryNo,
          noticeOfficeDiaryDate: item?.noticeDiary?.noticeOfficeDiaryDate,
          noticeOfficeDiaryTime: item?.noticeDiary?.noticeOfficeDiaryTime,
          session: item?.session?.sessionName,
          resolutionType: item?.resolutionType,
          resolutionStatus: item?.resolutionStatus?.resolutionStatus,
          Description: [item?.englishText, item?.urduText]
            .filter(Boolean)
            .join(", ").replace(/(<([^>]+)>)/gi, ""),
        }));

        const MotionRecord =motionReport && motionReport.map((item) => ({
          SR: item?.id,
          NoticeOfficeDiaryNo: item?.noticeOfficeDairies?.noticeOfficeDiaryNo,
          noticeOfficeDiaryDate: item?.noticeOfficeDairies?.noticeOfficeDiaryDate,
          noticeOfficeDiaryTime: item?.noticeOfficeDairies?.noticeOfficeDiaryTime,
          session: item?.sessions?.sessionName,
          motionType: item?.motionType,
          Description: [item?.englishText, item?.urduText]
            .filter(Boolean)
            .join(", ").replace(/(<([^>]+)>)/gi, ""),
        }));


          const workbook = XLSX.utils.book_new();

          // Function to add a worksheet with title and list
          const addWorksheet = (worksheetData, title) => {
              const worksheet = XLSX.utils.json_to_sheet(worksheetData);
              XLSX.utils.book_append_sheet(workbook, worksheet, title);
          };

          // Add worksheets for each category
          addWorksheet(QuestionRecord, 'Question');
          addWorksheet(ResolutionRecord, 'Resolution');
          addWorksheet(MotionRecord, 'Motion');

          // Write the workbook to a file
          XLSX.writeFile(workbook, 'DataSheet.xlsx'); 
};
  return (
    <Layout
      module={true}
      sidebarItems={NoticeSidebarItems}
      centerlogohide={true}
    >
      <ToastContainer />
      <Header
        dashboardLink={"/"}
        addLink1={"/notice/reports/business-summary"}
        title1={"Business Summary"}
      />
      <div>
        <div class="container-fluid">
          <div class="card mt-1">
            <div
              class="card-header red-bg"
              style={{ background: "#14ae5c !important" }}
            >
              <h1>BUSINESS REPORT</h1>
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
                        }}
                      >
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </span>
                      <DatePicker
                        // minDate={new Date()}
                        selected={fromDate}
                        dateFormat="dd-MM-yyyy"
                        onChange={(date) => setFromDate(date)}
                        className={"form-control"}
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
                        }}
                      >
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </span>
                      <DatePicker
                        // minDate={new Date()}
                        selected={toData}
                        dateFormat="dd-MM-yyyy"
                        onChange={(date) => setTodate(date)}
                        className={"form-control"}
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button class="btn btn-primary" type="button" onClick={() => hendleSearch()}>
                      View Summary
                    </button>
                    <button class="btn btn-primary" type="button" onClick={hendleExportExcel} disabled = {questionReport?.length > 0 ? false : true}>
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
                      {questionReport && questionReport?.map((item) => (
                        <tr>
                          <td class="text-center">{item?.id}</td>
                          <td class="text-center">{item?.noticeOfficeDiary?.noticeOfficeDiaryNo}</td>
                          <td class="text-center">{item.noticeOfficeDiary.noticeOfficeDiaryDate}</td>
                          <td class="text-center">{item.noticeOfficeDiary.noticeOfficeDiaryTime}</td>
                          <td class="text-center">{item?.session?.sessionName}</td>
                          <td class="text-center">{item?.member?.memberName}</td>
                          <td class="text-center">{item?.questionStatus?.questionStatus}</td>
                          <td class="text-center">{[item?.englishText, item?.urduText]
                            .filter(Boolean)
                            .join(", ").replace(/(<([^>]+)>)/gi, "")}</td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <h2 style={{ color: "#666", marginTop: "30px" }}>Motions</h2>
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
                      {motionReport && motionReport?.map((item) => (
                     
                      <tr>
                        <td class="text-center">{item?.id}</td>
                          <td class="text-center">{item?.noticeOfficeDairies?.noticeOfficeDiaryNo}</td>
                          <td class="text-center">{item?.noticeOfficeDairies?.noticeOfficeDiaryDate}</td>
                          <td class="text-center">{item?.noticeOfficeDairies?.noticeOfficeDiaryTime}</td>
                          <td class="text-center">{item?.sessions?.sessionName}</td>
                          <td class="text-center">{item?.motionType}</td>
                          <td class="text-center">{[item?.englishText, item?.urduText]
                            .filter(Boolean)
                            .join(", ").replace(/(<([^>]+)>)/gi, "")}</td>

                      </tr>
                       ))}
                    </tbody>
                  </table>
                </div>
                <h2 style={{ color: "#666", marginTop: "30px" }}>
                  Resolutions
                </h2>
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
                          Resolution Type
                        </th>
                        <th class="text-center" scope="col">
                          Resolution Status
                        </th>
                        <th
                          class="text-left"
                          style={{ paddingLeft: "6px" }}
                          scope="col"
                        >
                          Description
                        </th>
                        
                      </tr>
                    </thead>
                    <tbody>
                      {resolutionReport && resolutionReport.map((item) => (
                      
                      <tr>
                        <td class="text-center">{item?.id}</td>
                        <td class="text-center">{item?.noticeDiary?.noticeOfficeDiaryNo}</td>
                        <td class="text-center">{item?.noticeDiary?.noticeOfficeDiaryDate}</td>
                        <td class="text-center">{item?.noticeDiary?.noticeOfficeDiaryTime}</td>
                        <td class="text-center">{item?.session?.sessionName}</td>
                        <td class="text-center">{item?.resolutionType}</td>
                        <td class="text-center">{item?.resolutionStatus?.resolutionStatus}</td>
                        <td class="text-center">{[item?.englishText, item?.urduText]
                            .filter(Boolean)
                            .join(", ").replace(/(<([^>]+)>)/gi, "")}</td>
                      </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default BusinessSummary;
