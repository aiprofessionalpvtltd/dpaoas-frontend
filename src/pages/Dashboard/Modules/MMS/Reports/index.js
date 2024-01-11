import React from "react";
import { Layout } from "../../../../../components/Layout";
import Header from "../../../../../components/Header";
import { MMSSideBarItems } from "../../../../../utils/sideBarItems";

function MMSMotionSummery() {
  return (
    <Layout module={true} sidebarItems={MMSSideBarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/"}
        addLink1={"/mms/reports/motion-summary"}
        title1={"Motion Summary"}
      />
      <div class="container-fluid">
        <div class="card mt-1">
          <div
            class="card-header red-bg"
            style={{ background: "#14ae5c !important" }}
          >
            <h1>MOTION SUMMARY</h1>
          </div>
          <div class="card-body">
            <div class="container-fluid">
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
                    <label class="form-label">Motion Type</label>
                    <select class="form-select">
                      <option>Adjournment Motion</option>
                      <option>Call Attention Notice</option>
                      <option>Privilege Motion</option>
                      <option>Motion Under Rule 218</option>
                      <option>Motion Under Rule 60</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button class="btn btn-primary" type="submit">
                    View Summary
                  </button>
                </div>
              </div>
              <div class="dash-detail-container" style={{ marginTop: "20px" }}>
                <table class="table red-bg-head th">
                  <thead>
                    <tr>
                      <th class="text-left" scope="col">
                        Summary Detail
                      </th>
                      <th class="text-left" scope="col">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="text-left" style={{ paddingLeft: "23px" }}>
                        Total Motions
                      </td>
                      <td class="text-left" style={{ paddingLeft: "23px" }}>
                        39
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left" style={{ paddingLeft: "23px" }}>
                        Admissibility not Allowed by the House
                      </td>
                      <td class="text-left" style={{ paddingLeft: "23px" }}>
                        2
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left" style={{ paddingLeft: "23px" }}>
                        Admitted but Lapsed
                      </td>
                      <td class="text-left" style={{ paddingLeft: "23px" }}>
                        76
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left" style={{ paddingLeft: "23px" }}>
                        Approved
                      </td>
                      <td class="text-left" style={{ paddingLeft: "23px" }}>
                        19
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left" style={{ paddingLeft: "23px" }}>
                        Disallowed
                      </td>
                      <td class="text-left" style={{ paddingLeft: "23px" }}>
                        49
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left" style={{ paddingLeft: "23px" }}>
                        Held out of Order
                      </td>
                      <td class="text-left" style={{ paddingLeft: "23px" }}>
                        127
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left" style={{ paddingLeft: "23px" }}>
                        Lapsed
                      </td>
                      <td class="text-left" style={{ paddingLeft: "23px" }}>
                        11
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left" style={{ paddingLeft: "23px" }}>
                        Referred to Standing Committee
                      </td>
                      <td class="text-left" style={{ paddingLeft: "23px" }}>
                        37
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left" style={{ paddingLeft: "23px" }}>
                        Under Process
                      </td>
                      <td class="text-left" style={{ paddingLeft: "23px" }}>
                        5
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default MMSMotionSummery;
