import React, { useCallback, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Formik, Form, Field, FieldArray, useFormikContext, useFormik } from "formik";
import { Layout } from "../../../../../../../components/Layout";
import { NoticeSidebarItems } from "../../../../../../../utils/sideBarItems";
import Header from "../../../../../../../components/Header";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../../../../../../api/AuthContext";
import { getAllMemberAttendence, updateMemberattendace } from "../../../../../../../api/APIs/Services/SeatingPlan.service";
import { showErrorMessage, showSuccessMessage } from "../../../../../../../utils/ToastAlert";
import { AttendanceCard } from "../../../../../../../components/CustomComponents/AttendanceCard";
import { FormControl } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { getSessionDayAttendanceReport } from "../../../../../../../api/APIs/Services/Notice.service";
import axios from "axios";

function NMSSessionAttendance() {
  const location = useLocation();
  const sessionID = location.state ? location?.state?.id : "";
  const [attendenceMemberData, setAttendanceMemberData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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
    const filename = fileUrl.split('/').pop();
  
    // Perform the download
    axios({
      url: fileUrl,
      method: 'GET',
      responseType: 'blob', // Important for handling binary data like files
    }).then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename); // Set the filename for download
      document.body.appendChild(link);
      link.click();
    });
  };

  const handleReport =  async () => {
    try {
      const res = await getSessionDayAttendanceReport(location?.state?.id);
      console.log("Report", res?.data?.fileLink);
      handleDownload("http://172.16.170.8:5252" + res?.data?.fileLink);
    } catch (error) {
      showErrorMessage(error.response?.data?.message)
    }
  }

  return (
    <Layout
      module={true}
      sidebarItems={NoticeSidebarItems}
      centerlogohide={true}
    >
      <div class="row" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div class="col-3">
          <Header dashboardLink={"/"} title1={"Attendance"} />
        </div>
        <div class="col-3">
        <Formik initialValues={{ search: "" }}>
            <Form>
              <div className="input-group mb-3" style={{ height: '45px', width: "400px", marginLeft: -30 }}>
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

      <div className="row mb-4">
                    <div className="col" style={{ marginLeft: -15 }}>
                      <button className="btn btn-primary float-end" onClick={handleReport}>
                        Print Report
                      </button>
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
                      .filter(member => member.memberName.toLowerCase().includes(searchQuery))
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
                  <div className="row mt-2">
                    <div className="col">
                      <button className="btn btn-primary float-end" type="submit">
                        Submit
                      </button>
                    </div>
                  </div>
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
