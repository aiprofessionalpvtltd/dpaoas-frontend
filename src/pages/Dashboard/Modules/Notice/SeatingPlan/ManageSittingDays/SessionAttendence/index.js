import React, { useCallback, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

import { Layout } from "../../../../../../../components/Layout";
import { NoticeSidebarItems } from "../../../../../../../utils/sideBarItems";
import Header from "../../../../../../../components/Header";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../../../../../../api/AuthContext";
import {
  Formik,
  Form,
  Field,
  FieldArray,
  useFormikContext,
  useFormik,
} from "formik";
import {
  getAllMemberAttendence,
  updateMemberattendace,
} from "../../../../../../../api/APIs/Services/SeatingPlan.service";
import { showSuccessMessage } from "../../../../../../../utils/ToastAlert";
import { AttendanceCard } from "../../../../../../../components/CustomComponents/AttendanceCard";

function NMSSessionAttendance() {
  const location = useLocation();
  const sessionID = location.state ? location?.state?.id : "";
  const [attendenceMemberData, setAttendanceMemberData] = useState([]);
  const [attendenceData, setAttendanceData] = useState([]);
  console.log("Member Data", attendenceMemberData);
  console.log("test", location?.state);

  const GetSessionMembersWithStatus = useCallback(async () => {
    try {
      const response = await getAllMemberAttendence(sessionID);
      if (response?.success) {
        console.log("response", response);
        setAttendanceMemberData(response?.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    GetSessionMembersWithStatus();
  }, []);
  console.log("Status attendance", location.state?.view);
  const onSubmit = async (values) => {
    return console.log("Yousf", values?.sessionMembers);
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
      console.log("response", response);
      if (response?.success) {
        showSuccessMessage(response?.message);
        GetSessionMembersWithStatus();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout
      module={true}
      sidebarItems={NoticeSidebarItems}
      centerlogohide={true}
    >
      <Header dashboardLink={"/"} title1={"Attendance"} />
      <ToastContainer />

      {/* <div class="row">
        <div className="col">
          <AttendanceCard
            memberName={"Anwar Lal"}
            memberParty={"PMLN"}
            view={"true"}
            attendance={"Leave"}
          />
        </div>
        <div className="col">
          <AttendanceCard />
        </div>
        <div className="col">
          <AttendanceCard />
        </div>
        <div className="col">
          <AttendanceCard />
        </div>
      </div> */}

      <div className="container-fluid">
        {attendenceMemberData.length > 0 && (
          <Formik
            initialValues={{ sessionMembers: attendenceMemberData }}
            onSubmit={onSubmit}
          >
            {({ values }) => (
              // <Form>
              //   {location?.state && location?.state?.view ? (
              //     <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
              //       {values.sessionMembers.map((member, index) => (
              //         <div key={index} className="col">
              //           <AttendanceCard
              //             memberName={member?.memberName}
              //             memberParty={"PMLN"}
              //             view={"true"}
              //             attendance={member?.attendanceStatus}
              //           />
              //         </div>
              //       ))}
              //     </div>
              //   ) : (
              //     <AttendanceCard
              //       memberName={member?.memberName}
              //       memberParty={"PMLN"}
              //       attendance={member?.attendanceStatus}
              //     />
              //   )}
              // </Form>
              <Form>
                {location?.state && location?.state?.view ? (
                  <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
                    {values.sessionMembers.map((member, index) => (
                      <div key={index} className="col">
                        <AttendanceCard
                          memberName={member?.memberName}
                          memberParty={"PMLN"}
                          view={location?.state?.view}
                          attendance={member?.attendanceStatus}
                          index={index}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
                      {values.sessionMembers.map((member, index) => (
                        <div key={index} className="col">
                          <AttendanceCard
                            memberName={member?.memberName}
                            memberParty={"PMLN"}
                            attendance={member?.attendanceStatus}
                          />
                        </div>
                      ))}
                    </div>
                    <div class="row mt-2">
                      <div class="col">
                        <button class="btn btn-primary float-end" type="submit">
                          Submit
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </Form>
            )}
          </Formik>
        )}
      </div>
    </Layout>
  );
}

export default NMSSessionAttendance;
