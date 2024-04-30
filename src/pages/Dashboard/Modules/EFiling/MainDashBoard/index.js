import { Layout } from "../../../../../components/Layout";
import { getUserData } from "../../../../../api/Auth";
import {
  EfilingSideBarBranchItem,
  EfilingSideBarItem,
} from "../../../../../utils/sideBarItems";
function MainDashBoard() {
  const userData = getUserData();
  return (
    <Layout
      module={false}
      centerlogohide={true}
      sidebarItems={
        userData && userData?.userType === "Officer"
          ? EfilingSideBarItem
          : EfilingSideBarBranchItem
      }
      dashboardLink={"/efiling/dashboard"}
      addLink1={"/efiling/director-deshboard"}
      title1={"E-Filing"}
      width={"500px"}
      marginTop={"0px"}
      breadcrumbs={true}
    >
      <div className="row">
        <h2 style={{ marginBottom: 30, color: "#820001" }}>
          {" "}
          {userData && `${userData?.department?.departmentName} Branch`}
        </h2>
        <h2
          style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "10px" }}
        >
          Today's Stats
        </h2>
        <div className="row">
          <div
            class="dashboard-content"
            style={{ marginTop: "27px !important" }}
          >
            <div className="row">
              <div className="col-3">
                <div className="dash-card" style={{ marginLeft: "-12px" }}>
                  <div
                    className="dash-card-header"
                    style={{ textAlign: "center", background: "#4f5966" }}
                  >
                    <h2 style={{ marginBottom: "0" }}>FR </h2>
                  </div>
                  <div
                    className="count float-start"
                    style={{ borderLeft: "#ddd solid 1px" }}
                  >
                    <span style={{ display: "inline-flex" }}>
                      Urgent <span style={{ marginLeft: "5px" }}>(0)</span>
                    </span>
                    <div class="clearfix"></div>
                    <i
                      style={{ fontSize: "25px" }}
                      class="fas fa-file-alt mt-2"
                    ></i>
                  </div>
                  <div
                    className="count float-start"
                    style={{ borderLeft: "#ddd solid 1px" }}
                  >
                    <span style={{ display: "inline-flex" }}>
                      Immediate <span style={{ marginLeft: "5px" }}>(0)</span>
                    </span>
                    <div class="clearfix"></div>
                    <i
                      style={{ fontSize: "25px" }}
                      class="fas fa-file-alt mt-2"
                    ></i>
                  </div>
                  <div class="clearfix"></div>
                  <div
                    className="count float-start"
                    style={{ borderLeft: "#ddd solid 1px" }}
                  >
                    <span style={{ display: "inline-flex" }}>
                      Piriority <span style={{ marginLeft: "5px" }}>(0)</span>
                    </span>
                    <div class="clearfix"></div>
                    <i
                      style={{ fontSize: "25px" }}
                      class="fas fa-file-alt mt-2"
                    ></i>
                  </div>
                  <div
                    className="count float-start"
                    style={{ borderLeft: "#ddd solid 1px" }}
                  >
                    <span style={{ display: "inline-flex" }}>
                      Routine <span style={{ marginLeft: "5px" }}>(0)</span>
                    </span>
                    <div class="clearfix"></div>
                    <i
                      style={{ fontSize: "25px" }}
                      class="fas fa-file-alt mt-2"
                    ></i>
                  </div>

                  <div class="clearfix"></div>
                </div>
              </div>
              <div className="col-3">
                <div className="dash-card" style={{ marginLeft: "-12px" }}>
                  <div
                    className="dash-card-header"
                    style={{ textAlign: "center", background: "#4f5966" }}
                  >
                    <h2 style={{ marginBottom: "0" }}>File</h2>
                  </div>
                  <div
                    className="count float-start"
                    style={{ borderLeft: "#ddd solid 1px" }}
                  >
                    <span style={{ display: "inline-flex" }}>
                      Urgent <span style={{ marginLeft: "5px" }}>(0)</span>
                    </span>
                    <div class="clearfix"></div>
                    <i
                      style={{ fontSize: "25px" }}
                      class="fas fa-file-alt mt-2"
                    ></i>
                  </div>
                  <div
                    className="count float-start"
                    style={{ borderLeft: "#ddd solid 1px" }}
                  >
                    <span style={{ display: "inline-flex" }}>
                      Immediate <span style={{ marginLeft: "5px" }}>(0)</span>
                    </span>
                    <div class="clearfix"></div>
                    <i
                      style={{ fontSize: "25px" }}
                      class="fas fa-file-alt mt-2"
                    ></i>
                  </div>
                  <div class="clearfix"></div>
                  <div
                    className="count float-start"
                    style={{ borderLeft: "#ddd solid 1px" }}
                  >
                    <span style={{ display: "inline-flex" }}>
                      Piriority <span style={{ marginLeft: "5px" }}>(0)</span>
                    </span>
                    <div class="clearfix"></div>
                    <i
                      style={{ fontSize: "25px" }}
                      class="fas fa-file-alt mt-2"
                    ></i>
                  </div>
                  <div
                    className="count float-start"
                    style={{ borderLeft: "#ddd solid 1px" }}
                  >
                    <span style={{ display: "inline-flex" }}>
                      Routine <span style={{ marginLeft: "5px" }}>(0)</span>
                    </span>
                    <div class="clearfix"></div>
                    <i
                      style={{ fontSize: "25px" }}
                      class="fas fa-file-alt mt-2"
                    ></i>
                  </div>

                  <div class="clearfix"></div>
                </div>
              </div>
              <div className="col-3">
                <div className="dash-card">
                  <div
                    className="dash-card-header"
                    style={{ textAlign: "center", background: "#4f5966" }}
                  >
                    <h2 style={{ marginBottom: "0" }}>Marked</h2>
                  </div>
                  <div
                    className="count"
                    style={{ borderLeft: "#ddd solid 1px", width: "100%" }}
                  >
                    <span style={{ display: "inline-flex" }}>
                      Out Mark <span style={{ marginLeft: "5px" }}>(0)</span>
                    </span>
                    <div class="clearfix"></div>
                    <i
                      style={{ fontSize: "25px" }}
                      class="fas fa-file-alt mt-2"
                    ></i>
                  </div>
                  <div
                    className="count"
                    style={{ borderLeft: "#ddd solid 1px", width: "100%" }}
                  >
                    <span sstyle={{ display: "inline-flex" }}>
                      In Mark <span style={{ marginLeft: "5px" }}>(0)</span>
                    </span>
                    <div class="clearfix"></div>
                    <i
                      style={{ fontSize: "25px" }}
                      class="fas fa-file-alt mt-2"
                    ></i>
                  </div>
                </div>
              </div>
              <div className="col-3">
                <div class="dash-card">
                  <div
                    class="dash-card-header"
                    style={{ textAlign: "center", background: "#4f5966" }}
                  >
                    <h2 style={{ marginBottom: "0px" }}>Balance</h2>
                  </div>
                  <div
                    class="count"
                    style={{
                      borderLeft: "#ddd solid 1px",
                      width: "100%",
                      height: "109px",
                    }}
                  >
                    <span style={{ display: "inline-flex", marginTop: "40px" }}>
                      Balance <span style={{ marginLeft: "5px" }}>(0)</span>
                    </span>
                    <div class="clearfix"></div>
                    <i
                      style={{ fontSize: "25px" }}
                      class="fas fa-file-alt mt-2"
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="container-fluid">
            <div className="dash-detail-container mt-3">
              <div className="row">
                <div className="col">
                  <div className="table-responsive p-0">
                    <h2
                      style={{
                        background: "#607d99 !important",
                        textAlign: "center !important",
                      }}
                    >
                      Minutes of Conference
                    </h2>
                    <table
                      className="table align-items-center"
                      style={{ marginBottom: 0 }}
                    >
                      <thead>
                        <tr>
                          <th className="text-secondary text-xm font-weight-bolder opacity-7">
                            Name
                          </th>
                          <th className="text-secondary text-xm font-weight-bolder opacity-7 ps-2 text-center">
                            Marked
                          </th>
                          <th className="text-center text-secondary text-xm font-weight-bolder opacity-7">
                            Initiated
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <div className="d-flex px-3 py-1">
                              <div className="d-flex flex-column justify-content-center">
                                <h6 className="mb-0 text-sm">
                                  <i
                                    classname="fas fa-file-signature me-2"
                                    style={{
                                      fontSize: 21,
                                      verticalAlign: "middle",
                                    }}
                                  />
                                  NFC
                                </h6>
                              </div>
                            </div>
                          </td>
                          <td className="align-middle text-center">
                            <span className="text-secondary text-sm font-weight-bold">
                              (6)
                            </span>
                          </td>
                          <td className="align-middle text-center">
                            <span className="text-secondary text-sm font-weight-bold">
                              7
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="d-flex px-3">
                              <div className="d-flex flex-column justify-content-center">
                                <h6 className="mb-0 text-sm">
                                  <i
                                    classname="fas fa-file-signature me-2"
                                    style={{
                                      fontSize: 21,
                                      verticalAlign: "middle",
                                    }}
                                  />
                                  Minute Sheet
                                </h6>
                              </div>
                            </div>
                          </td>
                          <td className="align-middle text-center">
                            <span className="text-secondary text-sm font-weight-bold">
                              (3)
                            </span>
                          </td>
                          <td className="align-middle text-center">
                            <span className="text-secondary text-sm font-weight-bold">
                              2
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="d-flex px-3 py-1">
                              <div className="d-flex flex-column justify-content-center">
                                <h6 className="mb-0 text-sm">
                                  <i
                                    classname="fas fa-file-signature me-2"
                                    style={{
                                      fontSize: 21,
                                      verticalAlign: "middle",
                                    }}
                                  />
                                  Minutes of Conference
                                </h6>
                              </div>
                            </div>
                          </td>
                          <td className="align-middle text-center">
                            <span className="text-secondary text-sm font-weight-bold">
                              0
                            </span>
                          </td>
                          <td className="align-middle text-center">
                            <span className="text-secondary text-sm font-weight-bold">
                              3
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="col">
                  <div class="table-responsive p-0">
                    <h2
                      style={{
                        background: "#607d99 !important",
                        textAlign: "center",
                      }}
                    >
                      Out
                    </h2>

                    <table
                      className="table align-items-center"
                      style={{ marginBottom: 0 }}
                    >
                      <tbody>
                        <tr style={{ height: "59px" }}>
                          <td>
                            <div className="d-flex px-3 py-1 ps-4">
                              <div className="d-flex flex-column justify-content-center">
                                <h6 className="mb-0 text-sm mt-1">
                                  <i
                                    classname="fas fa-file-alt me-2"
                                    style={{
                                      fontSize: 24,
                                      verticalAlign: "middle",
                                    }}
                                  />
                                  Approved Document
                                </h6>
                              </div>
                            </div>
                          </td>
                          <td className="align-middle text-left">
                            <span className="text-secondary text-sm font-weight-bold">
                              (6)
                            </span>
                          </td>
                        </tr>
                        <tr style={{ height: "59px" }}>
                          <td>
                            <div className="d-flex px-3 py-1 ps-4">
                              <div className="d-flex flex-column justify-content-center">
                                <h6 className="mb-0 text-sm mt-1">
                                  <i
                                    className="fas fa-file-alt me-2"
                                    style={{
                                      fontSize: 24,
                                      verticalAlign: "middle",
                                    }}
                                  />
                                  Approved Document
                                </h6>
                              </div>
                            </div>
                          </td>
                          <td className="align-middle text-left">
                            <span className="text-secondary text-sm font-weight-bold">
                              (6)
                            </span>
                          </td>
                        </tr>
                        <tr style={{ height: "60px" }}>
                          <td>
                            <div className="d-flex px-3 py-1 ps-4">
                              <div className="d-flex flex-column justify-content-center">
                                <h6 className="mb-0 text-sm mt-1">
                                  <i
                                    className="fas fa-file-alt me-2"
                                    style={{
                                      fontSize: 24,
                                      verticalAlign: "middle",
                                    }}
                                  />
                                  Approved Document
                                </h6>
                              </div>
                            </div>
                          </td>
                          <td className="align-middle text-left">
                            <span className="text-secondary text-sm font-weight-bold">
                              (6)
                            </span>
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
      </div>
    </Layout>
  );
}

export default MainDashBoard;
