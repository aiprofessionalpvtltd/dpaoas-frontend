import React from "react";
import { Layout } from "../../../../../../components/Layout";
import Header from "../../../../../../components/Header";
import { QMSSideBarItems } from "../../../../../../utils/sideBarItems";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";

function QMSQuestionAnnualReports() {
  return (
    <Layout module={true} sidebarItems={QMSSideBarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/"}
        addLink1={"/qms/dashboard"}
        title1={"Question"}
        addLink2={"/qms/reports/question-annual-reports"}
        title2={"Question Annual Reports"}
      />
      <div class="container-fluid">
        <div class="card mt-4">
          <div
            class="card-header red-bg"
            style={{ background: "#14ae5c !important" }}
          >
            <h1>QUESTIONS ANNUAL REPORTS</h1>
          </div>
          <div class="card-body">
            <div class="container-fluid">
              <div class="row">
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Question Diary No</label>
                    <input class="form-control" type="text" />
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Question ID</label>
                    <input class="form-control" type="text" />
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Keyword</label>
                    <input class="form-control" type="text" />
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Member Name</label>
                    <input class="form-control" type="text" />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">From Session</label>
                    <select class="form-select">
                      <option>Select</option>
                      <option>121</option>
                      <option>122</option>
                      <option>123</option>
                    </select>
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">To Session</label>
                    <select class="form-select">
                      <option>Select</option>
                      <option>121</option>
                      <option>122</option>
                      <option>123</option>
                    </select>
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Category</label>
                    <select class="form-select">
                      <option>Starred</option>
                      <option>Un-Starred</option>
                      <option>Short Notice</option>
                    </select>
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Group</label>
                    <select class="form-select">
                      <option></option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Question Status</label>
                    <select class="form-select">
                      <option>Question Status</option>
                      <option>Admitted</option>
                      <option>Admitted but Lapsed</option>
                      <option>Deferred</option>
                      <option>Disallowed</option>
                      <option>Disallowed on Reconsideration</option>
                      <option>File not Available</option>
                      <option>Lapsed</option>
                      <option>NFA</option>
                      <option>Replied</option>
                      <option>Replied/Referred to Standing Committee</option>
                      <option>Under Correspondence</option>
                      <option>Under Process</option>
                      <option>Withdrawn</option>
                    </select>
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Notice Diary No</label>
                    <input class="form-control" type="text" />
                  </div>
                </div>
                <div class="col">
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
                      minDate={new Date()}
                      // selected={formik.values.fromNoticeDate}
                      // onChange={(date) => formik.setFieldValue("fromNoticeDate", date)}
                      className={"form-control"}
                    />
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
                      minDate={new Date()}
                      // selected={formik.values.fromNoticeDate}
                      // onChange={(date) => formik.setFieldValue("fromNoticeDate", date)}
                      className={"form-control"}
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-3">
                  <div class="mb-3">
                    <label class="form-label">Division</label>
                    <input class="form-control" type="text" />
                  </div>
                </div>
                <div class="col-2">
                  <div class="mb-3">
                    <div class="form-check" style={{ marginTop: "39px" }}>
                      <input
                        class="form-check-input "
                        type="checkbox"
                        id="flexCheckDefault"
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        Complete Text
                      </label>
                    </div>
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

              <div class="dash-detail-container" style={{ marginTop: "20px" }}>
                <div class="row">
                  <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button class="btn btn-primary mb-3" type="submit">
                      Print Questions
                    </button>
                  </div>
                </div>
                <table class="table red-bg-head th">
                  <thead>
                    <tr>
                      <th class="text-center" scope="col">
                        Brief Subject
                      </th>
                      <th class="text-center" scope="col">
                        Date
                      </th>
                      <th class="text-center" scope="col">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="text-center"></td>
                      <td class="text-center"></td>
                      <td class="text-center"></td>
                    </tr>
                  </tbody>
                </table>
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Question Status</label>
                      <select class="form-select">
                        <option>Question Status</option>
                        <option>Admitted</option>
                        <option>Admitted but Lapsed</option>
                        <option>Deferred</option>
                        <option>Disallowed</option>
                        <option>Disallowed on Reconsideration</option>
                        <option>File not Available</option>
                        <option>Lapsed</option>
                        <option>NFA</option>
                        <option>Replied</option>
                        <option>Replied/Referred to Standing Committee</option>
                        <option>Under Correspondence</option>
                        <option>Under Process</option>
                        <option>Withdrawn</option>
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
                        minDate={new Date()}
                        // selected={formik.values.fromNoticeDate}
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default QMSQuestionAnnualReports;
