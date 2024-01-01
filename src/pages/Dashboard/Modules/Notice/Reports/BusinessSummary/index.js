import React from "react";
import { NoticeSidebarItems } from "../../../../../../utils/sideBarItems";
import { Layout } from "../../../../../../components/Layout";
import Header from "../../../../../../components/Header";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";

function BusinessSummary() {
  const navigate = useNavigate();

  return (
    <Layout
      module={true}
      sidebarItems={NoticeSidebarItems}
      centerlogohide={true}
    >
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
                        minDate={new Date()}
                        // selected={formik.values.fromNoticeDate}
                        // onChange={(date) => formik.setFieldValue("fromNoticeDate", date)}
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
                        minDate={new Date()}
                        // selected={formik.values.fromNoticeDate}
                        // onChange={(date) => formik.setFieldValue("fromNoticeDate", date)}
                        className={"form-control"}
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button class="btn btn-primary" type="submit">
                      View Summary
                    </button>
                    <button class="btn btn-primary" type="submit">
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
                          class="text-left"
                          style={{ paddingLeft: "6px" }}
                          scope="col"
                        >
                          Description
                        </th>
                        <th class="text-center" scope="col">
                          Receipt confirmed
                        </th>
                        <th class="text-center" scope="col">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="text-center"></td>
                        <td class="text-center"></td>
                        <td class="text-center"></td>
                        <td class="text-center"></td>
                        <td class="text-center"></td>
                        <td class="text-center"></td>
                        <td class="text-center"></td>
                        <td class="text-left"></td>
                        <td class="text-center"></td>
                        <td class="text-center">
                          <a href="#">
                            <i class="fas fa-print"></i>
                          </a>
                        </td>
                      </tr>
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
                          Mover
                        </th>
                        <th class="text-center" scope="col">
                          Category
                        </th>
                        <th
                          class="text-left"
                          style={{ paddingLeft: "6px" }}
                          scope="col"
                        >
                          Description
                        </th>
                        <th class="text-center" scope="col">
                          Receipt confirmed
                        </th>
                        <th class="text-center" scope="col">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="text-center"></td>
                        <td class="text-center"></td>
                        <td class="text-center"></td>
                        <td class="text-center"></td>
                        <td class="text-center"></td>
                        <td class="text-center"></td>
                        <td class="text-center"></td>
                        <td class="text-left"></td>
                        <td class="text-center"></td>
                        <td class="text-center">
                          <a href="#">
                            <i class="fas fa-print"></i>
                          </a>
                        </td>
                      </tr>
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
                          Mover
                        </th>
                        <th class="text-center" scope="col">
                          Category
                        </th>
                        <th
                          class="text-left"
                          style={{ paddingLeft: "6px" }}
                          scope="col"
                        >
                          Description
                        </th>
                        <th class="text-center" scope="col">
                          Receipt confirmed
                        </th>
                        <th class="text-center" scope="col">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="text-center"></td>
                        <td class="text-center"></td>
                        <td class="text-center"></td>
                        <td class="text-center"></td>
                        <td class="text-center"></td>
                        <td class="text-center"></td>
                        <td class="text-center"></td>
                        <td class="text-left"></td>
                        <td class="text-center"></td>
                        <td class="text-center">
                          <a href="#">
                            <i class="fas fa-print"></i>
                          </a>
                        </td>
                      </tr>
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
