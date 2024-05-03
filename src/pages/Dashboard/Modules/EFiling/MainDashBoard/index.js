import { Layout } from "../../../../../components/Layout";
import { getUserData } from "../../../../../api/Auth";
import {
  EfilingSideBarBranchItem,
  EfilingSideBarItem,
} from "../../../../../utils/sideBarItems";
import { Padding } from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faEye,
  faFileAlt,
  faFileSignature,
  faMailBulk,
  faReceipt,
} from "@fortawesome/free-solid-svg-icons";
import CalenderImage from "../../../../../assets/calander.png";
function MainDashboard() {
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
      </div>
      <div className="row">
        <div className="col-8">
          <div className="dash-detail-container" style={{ background: "none" }}>
            <div className="row">
              <div className="col-4">
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
                    {/* <i
                      style={{ fontSize: "25px" }}
                      class="fas fa-file-alt mt-2"
                    ></i> */}
                    <FontAwesomeIcon
                      icon={faFileAlt}
                      style={{
                        fontSize: 24,
                        verticalAlign: "middle",
                      }}
                      className="mt-2"
                    />
                  </div>
                  <div
                    className="count float-start"
                    style={{ borderLeft: "#ddd solid 1px" }}
                  >
                    <span style={{ display: "inline-flex" }}>
                      Immediate <span style={{ marginLeft: "5px" }}>(0)</span>
                    </span>
                    <div class="clearfix"></div>
                    <FontAwesomeIcon
                      icon={faFileAlt}
                      style={{
                        fontSize: 24,
                        verticalAlign: "middle",
                      }}
                      className="mt-2"
                    />
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
                    <FontAwesomeIcon
                      icon={faFileAlt}
                      style={{
                        fontSize: 24,
                        verticalAlign: "middle",
                      }}
                      className="mt-2"
                    />
                  </div>
                  <div
                    className="count float-start"
                    style={{ borderLeft: "#ddd solid 1px" }}
                  >
                    <span style={{ display: "inline-flex" }}>
                      Routine <span style={{ marginLeft: "5px" }}>(0)</span>
                    </span>
                    <div class="clearfix"></div>
                    <FontAwesomeIcon
                      icon={faFileAlt}
                      style={{
                        fontSize: 24,
                        verticalAlign: "middle",
                      }}
                      className="mt-2"
                    />
                  </div>

                  <div class="clearfix"></div>
                </div>
              </div>
              <div className="col-4">
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
                    {/* <i
                      style={{ fontSize: "25px" }}
                      class="fas fa-file-alt mt-2"
                    ></i> */}
                    <FontAwesomeIcon
                      icon={faFileAlt}
                      style={{
                        fontSize: 24,
                        verticalAlign: "middle",
                      }}
                      className="mt-2"
                    />
                  </div>
                  <div
                    className="count float-start"
                    style={{ borderLeft: "#ddd solid 1px" }}
                  >
                    <span style={{ display: "inline-flex" }}>
                      Immediate <span style={{ marginLeft: "5px" }}>(0)</span>
                    </span>
                    <div class="clearfix"></div>
                    <FontAwesomeIcon
                      icon={faFileAlt}
                      style={{
                        fontSize: 24,
                        verticalAlign: "middle",
                      }}
                      className="mt-2"
                    />
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
                    <FontAwesomeIcon
                      icon={faFileAlt}
                      style={{
                        fontSize: 24,
                        verticalAlign: "middle",
                      }}
                      className="mt-2"
                    />
                  </div>
                  <div
                    className="count float-start"
                    style={{ borderLeft: "#ddd solid 1px" }}
                  >
                    <span style={{ display: "inline-flex" }}>
                      Routine <span style={{ marginLeft: "5px" }}>(0)</span>
                    </span>
                    <div class="clearfix"></div>
                    <FontAwesomeIcon
                      icon={faFileAlt}
                      style={{
                        fontSize: 24,
                        verticalAlign: "middle",
                      }}
                      className="mt-2"
                    />
                  </div>

                  <div class="clearfix"></div>
                </div>
              </div>
              <div className="col-4">
                {/* <div className="dash-card" style={{ marginLeft: "-12px" }}>
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
                    <FontAwesomeIcon
                      icon={faFileAlt}
                      style={{
                        fontSize: 24,
                        verticalAlign: "middle",
                      }}
                      className="mt-2"
                    />
                  </div>
                  <div
                    className="count float-start"
                    style={{ borderLeft: "#ddd solid 1px" }}
                  >
                    <span style={{ display: "inline-flex" }}>
                      Immediate <span style={{ marginLeft: "5px" }}>(0)</span>
                    </span>
                    <div class="clearfix"></div>
                    <FontAwesomeIcon
                      icon={faFileAlt}
                      style={{
                        fontSize: 24,
                        verticalAlign: "middle",
                      }}
                      className="mt-2"
                    />
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
                    <FontAwesomeIcon
                      icon={faFileAlt}
                      style={{
                        fontSize: 24,
                        verticalAlign: "middle",
                      }}
                      className="mt-2"
                    />
                  </div>
                  <div
                    className="count float-start"
                    style={{ borderLeft: "#ddd solid 1px" }}
                  >
                    <span style={{ display: "inline-flex" }}>
                      Routine <span style={{ marginLeft: "5px" }}>(0)</span>
                    </span>
                    <div class="clearfix"></div>
                    <FontAwesomeIcon
                      icon={faFileAlt}
                      style={{
                        fontSize: 24,
                        verticalAlign: "middle",
                      }}
                      className="mt-2"
                    />
                  </div>

                  <div class="clearfix"></div>
                </div> */}
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
                    <FontAwesomeIcon
                      icon={faFileAlt}
                      style={{
                        fontSize: 24,
                        verticalAlign: "middle",
                      }}
                      className="mt-2"
                    />
                  </div>
                  <div
                    className="count"
                    style={{ borderLeft: "#ddd solid 1px", width: "100%" }}
                  >
                    <span sstyle={{ display: "inline-flex" }}>
                      In Mark <span style={{ marginLeft: "5px" }}>(0)</span>
                    </span>
                    <div class="clearfix"></div>
                    <FontAwesomeIcon
                      icon={faFileAlt}
                      style={{
                        fontSize: 24,
                        verticalAlign: "middle",
                      }}
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="dash-detail-container mt-3"
            style={{ background: "none" }}
          >
            <div className="row">
              <div className="col">
                <div className="table-responsive p-0">
                  <h2 className="text-center">Minutes of Conference</h2>
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
                                {/* <i
                                    classname="fas fa-file-signature me-2"
                                    style={{
                                      fontSize: 21,
                                      verticalAlign: "middle",
                                    }}
                                  /> */}
                                <FontAwesomeIcon
                                  icon={faFileSignature}
                                  style={{
                                    fontSize: 21,
                                    verticalAlign: "middle",
                                  }}
                                  className="me-2"
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
                                <FontAwesomeIcon
                                  icon={faFileSignature}
                                  style={{
                                    fontSize: 21,
                                    verticalAlign: "middle",
                                  }}
                                  className="me-2"
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
                                {/* <i
                                    classname="fas fa-file-signature me-2"
                                    style={{
                                      fontSize: 21,
                                      verticalAlign: "middle",
                                    }}
                                  /> */}
                                <FontAwesomeIcon
                                  icon={faFileSignature}
                                  style={{
                                    fontSize: 21,
                                    verticalAlign: "middle",
                                  }}
                                  className="me-2"
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
              <div className="col">
                {/* <div className="table-responsive p-0">
                  <h2 className="text-center">Minutes of Conference</h2>
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
                                <FontAwesomeIcon
                                  icon={faFileSignature}
                                  style={{
                                    fontSize: 21,
                                    verticalAlign: "middle",
                                  }}
                                  className="me-2"
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
                                <FontAwesomeIcon
                                  icon={faFileSignature}
                                  style={{
                                    fontSize: 21,
                                    verticalAlign: "middle",
                                  }}
                                  className="me-2"
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
                                <FontAwesomeIcon
                                  icon={faFileSignature}
                                  style={{
                                    fontSize: 21,
                                    verticalAlign: "middle",
                                  }}
                                  className="me-2"
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
                </div> */}
                <div class="table-responsive p-0">
                  <h2 className="text-center">Out</h2>

                  <table
                    className="table align-center"
                    style={{ marginBottom: 0 }}
                  >
                    <tbody>
                      <tr style={{ height: "63px" }}>
                        <td>
                          <div className="d-flex px-3 py-1 ps-4">
                            <div className="d-flex flex-column justify-content-center">
                              <h6 className="mb-0 text-sm mt-1">
                                {/* <i
                                    className="fas fa-file-alt me-2"
                                    style={{
                                      fontSize: 24,
                                      verticalAlign: "middle",
                                    }}
                                  /> */}
                                <FontAwesomeIcon
                                  icon={faFileAlt}
                                  className="me-2"
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
                      <tr style={{ height: "63px" }}>
                        <td>
                          <div className="d-flex px-3 py-1 ps-4">
                            <div className="d-flex flex-column justify-content-center">
                              <h6 className="mb-0 text-sm mt-1">
                                <FontAwesomeIcon
                                  icon={faFileAlt}
                                  className="me-2"
                                  style={{
                                    fontSize: 24,
                                    verticalAlign: "middle",
                                  }}
                                />
                                Pending Document
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
                      <tr style={{ height: "63px" }}>
                        <td>
                          <div className="d-flex px-3 py-1 ps-4">
                            <div className="d-flex flex-column justify-content-center">
                              <h6 className="mb-0 text-sm mt-1">
                                {/* <i
                                    className="fas fa-file-alt me-2"
                                    style={{
                                      fontSize: 24,
                                      verticalAlign: "middle",
                                    }}
                                  /> */}
                                <FontAwesomeIcon
                                  icon={faEnvelope}
                                  className="me-2"
                                  style={{
                                    fontSize: 24,
                                    verticalAlign: "middle",
                                  }}
                                />
                                Mail Circulation
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
          <div
            className="dash-detail-container mt-3"
            style={{ background: "none" }}
          >
            <div className="row">
              <div className="col">
                <div className="table-responsive p-0">
                  <h2 className="text-center">Task and Speak Cases</h2>
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
                                <FontAwesomeIcon
                                  icon={faFileAlt}
                                  style={{
                                    fontSize: 21,
                                    verticalAlign: "middle",
                                  }}
                                  className="me-2"
                                />
                                Speak Cases (in)
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
                                <FontAwesomeIcon
                                  icon={faFileAlt}
                                  style={{
                                    fontSize: 21,
                                    verticalAlign: "middle",
                                  }}
                                  className="me-2"
                                />
                                Speak Cases (out)
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
                                <FontAwesomeIcon
                                  icon={faFileAlt}
                                  style={{
                                    fontSize: 21,
                                    verticalAlign: "middle",
                                  }}
                                  className="me-2"
                                />
                                Tasks
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
              <div className="col">
                <div className="dash-card">
                  <div
                    className="dash-card-header"
                    style={{
                      textAlign: "center",
                      background: "#4f5966",
                    }}
                  >
                    <h2 style={{ marginBottom: 0 }}>Initial Receipts</h2>
                  </div>
                  <div className="float-start" style={{ width: "50%" }}>
                    <div
                      className="count"
                      style={{
                        borderLeft: "#ddd solid 1px",
                        width: "100%",
                        background: "#FFF",
                        height: 93,
                      }}
                    >
                      <span style={{ display: "inline-flex" }}>
                        Personal <span style={{ marginLeft: 5 }}>(0)</span>
                      </span>
                      <div className="clearfix" />
                      <FontAwesomeIcon
                        icon={faReceipt}
                        style={{ fontSize: 25, paddingTop: 10 }}
                      />
                    </div>
                    <div
                      className="count"
                      style={{
                        width: "100%",
                        borderLeft: "#ddd solid 1px",
                        background: "#FFF",
                        height: 92,
                      }}
                    >
                      <span style={{ display: "inline-flex" }}>
                        Immediate <span style={{ marginLeft: 5 }}>(0)</span>
                      </span>
                      <div className="clearfix" />
                      <FontAwesomeIcon
                        icon={faReceipt}
                        style={{ fontSize: 25, paddingTop: 10 }}
                      />
                    </div>
                  </div>
                  <div className="float-start" style={{ width: "50%" }}>
                    <div
                      className="count"
                      style={{ width: "100%", height: 185, background: "#FFF" }}
                    >
                      <span style={{ display: "inline-flex", marginTop: 40 }}>
                        Eyes Only <span style={{ marginLeft: 5 }}>(0)</span>
                      </span>
                      <div className="clearfix" />

                      <FontAwesomeIcon
                        icon={faEye}
                        style={{ fontSize: 25, paddingTop: 10 }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="dash-detail-container" style={{ background: "none" }}>
            <div
              className="dash-card"
              style={{
                marginLeft: "-12px",
                height: "210px",
                // overflowY: "auto",
                // overflowX: "hidden",
              }}
            >
              <div
                className="dash-card-header"
                style={{ textAlign: "center", background: "#007bff" }}
              >
                <h2 style={{ marginBottom: "0" }}>Notifications </h2>
              </div>

              <div className="row">
                <div className="col-12">
                  <div
                    className="dash-card"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "center",
                      height: "170px",
                    }}
                  >
                    <div
                      className="count float-start"
                      style={{
                        borderLeft: "#ddd solid 1px",
                        background: "#FFF",
                        height: 184,
                        paddingTop: 55,
                      }}
                    >
                      <span style={{ display: "inline-flex", marginBottom: 8 }}>
                        New Leave Requests{" "}
                        <span style={{ marginLeft: 5 }}>
                          <b>(0)</b>
                        </span>
                      </span>
                      <div className="clearfix" />
                      <FontAwesomeIcon
                        icon={faMailBulk}
                        style={{ fontSize: 25, paddingTop: 5 }}
                      />
                    </div>

                    <div
                      className="count float-start"
                      style={{
                        borderLeft: "#ddd solid 1px",
                        background: "#FFF",
                        height: 182,
                        paddingTop: 55,
                      }}
                    >
                      <span style={{ display: "inline-flex", marginBottom: 8 }}>
                        Move Requests{" "}
                        <span style={{ marginLeft: 5 }}>
                          <b>(0)</b>
                        </span>
                      </span>
                      <div className="clearfix" />
                      <FontAwesomeIcon
                        icon={faMailBulk}
                        style={{ fontSize: 25, paddingTop: 5 }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: "20px" }}>
            <div
              className="dash-detail-container mt-3"
              style={{ background: "none" }}
            >
              <img
                src={CalenderImage}
                alt="calender"
                style={{ width: "100%", height: "499px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default MainDashboard;
