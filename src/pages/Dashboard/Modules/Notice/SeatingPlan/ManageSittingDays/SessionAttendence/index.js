import React, { useCallback, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import {
  Formik,
  Form,
  Field,
  FieldArray,
  useFormikContext,
  useFormik,
} from "formik";
import { Layout } from "../../../../../../../components/Layout";
import { NoticeSidebarItems } from "../../../../../../../utils/sideBarItems";
import Header from "../../../../../../../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../../../../api/AuthContext";
import {
  getAllMemberAttendence,
  updateMemberattendace,
} from "../../../../../../../api/APIs/Services/SeatingPlan.service";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../../utils/ToastAlert";
import { AttendanceCard } from "../../../../../../../components/CustomComponents/AttendanceCard";
import { FormControl } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { getSessionDayAttendanceReport } from "../../../../../../../api/APIs/Services/Notice.service";
import axios from "axios";
import { imagesUrl } from "../../../../../../../api/APIs";

function NMSSessionAttendance() {
  const location = useLocation();
  const navigate = useNavigate();
  const sessionID = location.state ? location?.state?.id : "";
  const [attendenceMemberData, setAttendanceMemberData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  console.log("location from Mark", location?.state);
  const GetSessionMembersWithStatus = useCallback(async () => {
    try {
      const response = await getAllMemberAttendence(sessionID);
      if (response?.success) {
        setAttendanceMemberData(response?.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    GetSessionMembersWithStatus();
  }, []);

  const onSubmit = async (values) => {
    const changedValues = values.sessionMembers.filter(
      (member, index) =>
        member.attendanceStatus !== attendenceMemberData[index].attendanceStatus
    );

    const formattedData = changedValues.map((member) => ({
      fkMemberId: member.memberId,
      attendanceStatus: member.attendanceStatus,
    }));
    try {
      const response = await updateMemberattendace(sessionID, formattedData);
      if (response?.success) {
        showSuccessMessage(response?.message);
        GetSessionMembersWithStatus();
        setTimeout(() => {
          navigate(`/notice/manage/manage-session/member-attendence`, {
            state: {
              view: true,
              id: location.state ? location?.state?.id : "",
              data: location?.state?.data,
            },
          });
        }, 2500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase()); // Update search query state
  };

  const handleDownload = (fileUrl) => {
    // Check if fileUrl exists
    if (!fileUrl) return;

    // Extract the filename from the fileUrl
    const filename = fileUrl.split("/").pop();

    // Perform the download
    axios({
      url: fileUrl,
      method: "GET",
      responseType: "blob", // Important for handling binary data like files
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename); // Set the filename for download
      document.body.appendChild(link);
      link.click();
    });
  };

  const handleReport = async () => {
    try {
      const res = await getSessionDayAttendanceReport(location?.state?.id);
      console.log("Report", res?.data?.fileLink);
      handleDownload(`${imagesUrl}${res?.data?.fileLink}`);
    } catch (error) {
      showErrorMessage(error.response?.data?.message);
    }
  };

  return (
    <Layout
      module={true}
      sidebarItems={NoticeSidebarItems}
      centerlogohide={true}
    >
      <div
        class="row"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div class="col-3">
          <Header
            dashboardLink={"/notice/dashboard"}
            title1={"Session Days"}
            title2={
              location?.state?.view ? "View Attendance" : "Mark Attendance"
            }
            addLink2={"/"}
            addLink1={"/notice/manage/manage-session-days"}
          />
        </div>
        <div class="col-3">
          <Formik initialValues={{ search: "" }}>
            <Form>
              <div
                className="input-group"
                style={{ height: "45px", width: "400px", marginLeft: -30 }}
              >
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faSearch} /> {/* Search icon */}
                </span>
                <FormControl
                  type="text"
                  placeholder="Search by Member Name"
                  className="form-control"
                  onChange={handleSearchChange}
                  value={searchQuery}
                />
              </div>
            </Form>
          </Formik>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row mb-4 align-items-center">
          <div className="col-7 ">
            <div
              className="bg-white p-3 border rounded"
              // style={{ width: width ? width : "500px" }}
            >
              <div className="row">
                <div className="col">
                  <div className="row">
                    <div className="col-6">Session:</div>
                    <div className="col-6">
                      <span className="text-primary">
                        {" "}
                        {location?.state?.data && location?.state?.data?.session
                          ? location?.state?.data?.session
                          : "No Session"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="row">
                    <div className="col-4">Date:</div>
                    <div className="col-4">
                      <span className="text-primary">
                        {" "}
                        {location?.state?.data &&
                        location?.state?.data?.sittingDate
                          ? location?.state?.data?.sittingDate
                          : "No Date"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="row">
                    <div className="col-9">Sitting Start Time</div>
                    <div className="col-3">
                      <span className="text-primary">
                        {location?.state?.data &&
                        location?.state?.data?.sittingStartTime
                          ? location?.state?.data?.sittingStartTime
                          : ""}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="row">
                    <div className="col-9">Sitting End Time</div>
                    <div className="col-3">
                      <span className="text-primary">
                        {location?.state?.data &&
                        location?.state?.data?.sittingEndTime
                          ? location?.state?.data?.sittingEndTime
                          : ""}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="row">
                    <div className="col-9">Is Adjourned:</div>
                    <div className="col-3">
                      <span className="text-primary">
                        {location?.state?.data &&
                        location?.state?.data?.sessionAdjourned
                          ? location?.state?.data?.sessionAdjourned
                          : "Not Selected"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-5" style={{ marginLeft: 0 }}>
            <div className="row">
              <div className="col-5"></div>
              {/* <div className="col">
                {location?.state?.view && location?.state?.view === true ? (
                  ""
                ) : (
                  <div>
                    <button className="btn btn-primary float-end" type="submit">
                      Mark Attendance
                    </button>
                  </div>
                )}
              </div> */}

              <div className="col">
                <div>
                  <button
                    className="btn btn-primary float-end"
                    onClick={handleReport}
                  >
                    Print Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
      <div className="container-fluid">
        {attendenceMemberData.length > 0 && (
          <Formik
            initialValues={{ sessionMembers: attendenceMemberData }}
            onSubmit={onSubmit}
          >
            {({ values }) => (
              <Form>
                <>
                  <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
                    {values.sessionMembers
                      .filter((member) =>
                        member.memberName.toLowerCase().includes(searchQuery)
                      )
                      .map((member, index) => (
                        <div key={index} className="col">
                          <AttendanceCard
                            memberName={member?.memberName}
                            memberParty={member?.shortName}
                            view={location?.state?.view}
                            attendance={member?.attendanceStatus}
                            index={index}
                          />
                        </div>
                      ))}
                  </div>
                  {/* {location?.state?.view && location?.state?.view === true ? (
                    ""
                  ) : (
                    <div className="row mt-2">
                      <div className="col">
                        <button
                          className="btn btn-primary float-end"
                          type="submit"
                        >
                          Mark Attendance
                        </button>
                      </div>
                    </div>
                  )} */}
                  {location?.state?.view && location?.state?.view === true ? (
                    ""
                  ) : (
                    <div
                      className="row mt-2"
                      style={{
                        position: "absolute",
                        // bottom: 610,
                        // left: 500,
                        right: 180,
                        top: 212.9,
                      }}
                    >
                      <div className="col">
                        <button
                          className="btn btn-primary float-end"
                          type="submit"
                        >
                          Mark Attendance
                        </button>
                      </div>
                    </div>
                  )}
                </>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </Layout>
  );
}

export default NMSSessionAttendance;
