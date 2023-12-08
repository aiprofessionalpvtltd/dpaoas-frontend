import React from "react";
import { Layout } from "../../../../../../components/Layout";
import Header from "../../../../../../components/Header";
import { QMSSideBarItems } from "../../../../../../utils/sideBarItems";

function QMSResolutionAnnualReports() {
  return (
    <Layout module={true} sidebarItems={QMSSideBarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/"}
        addLink1={"/qms/dashboard"}
        title1={"Question"}
        addLink2={"/qms/reports/resolution-annual-reports"}
        title2={"Resolution Annual Reports"}
      />
      <div class="container-fluid">
        <div class="card mt-4">
          <div
            class="card-header red-bg"
            style={{ background: "#14ae5c !important" }}
          >
            <h1>Resolution Annual Reports</h1>
          </div>
          <div class="card-body">
            <div class="container-fluid">
              <div class="row">
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Resolution Diary No</label>
                    <input class="form-control" type="text" />
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Resolution ID</label>
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
                    <label class="form-label">Resolution Type</label>
                    <select class="form-select">
                      <option>Resolution Type</option>
                    </select>
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Colour Res. No</label>
                    <input class="form-control" type="text" />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Resolution Status</label>
                    <select class="form-select">
                      <option>Resolution Status</option>
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
                  <div class="mb-3">
                    <label class="form-label">From Notice Date</label>
                    <input class="form-control" type="text" />
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">To Notice Date</label>
                    <input class="form-control" type="text" />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-2">
                  <div class="mb-3">
                    <div class="form-check">
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
                      Print Resolutions
                    </button>
                  </div>
                </div>
                <table class="table red-bg-head th">
                  <thead>
                    <tr>
                      <th class="text-center" scope="col">
                        Resolutions Type
                      </th>
                      <th class="text-center" scope="col">
                        Subject Matter
                      </th>
                      <th class="text-center" scope="col">
                        Date
                      </th>
                      <th class="text-center" scope="col">
                        Resolutions Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="text-center"></td>
                      <td class="text-center"></td>
                      <td class="text-center"></td>
                      <td class="text-center"></td>
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

export default QMSResolutionAnnualReports;
