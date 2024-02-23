import React, { useCallback, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

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

function NMSSessionAttendance() {
  const location = useLocation();
  const sessionID = location.state ? location?.state : "";
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
      const response = updateMemberattendace(sessionID, formattedData);
      if (response?.success) {
        showSuccessMessage(response?.message);
        GetSessionMembersWithStatus();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const handleStatusChange = (memberId, newStatus) => {
  //   const updatedData = attendenceMemberData.map((item) =>
  //     item.memberId === memberId
  //       ? { ...item, attendanceStatus: newStatus }
  //       : item
  //   );
  //   setAttendanceMemberData(updatedData);
  // };

  return (
    <Layout
      module={true}
      sidebarItems={NoticeSidebarItems}
      centerlogohide={true}
    >
      <Header dashboardLink={"/"} title1={"Attendance"} />
      <ToastContainer />
      <div className="container-fluid">
        <div class="dash-detail-container" style={{ marginTop: "20px" }}>
          {attendenceMemberData.length > 0 && (
            <Formik
              initialValues={{ sessionMembers: attendenceMemberData }}
              onSubmit={onSubmit}
            >
              {({ values }) => (
                <Form>
                  <table class="table red-bg-head th">
                    <thead>
                      <tr>
                        <th class="text-center" scope="col">
                          S #
                        </th>
                        <th class="text-center" scope="col">
                          Member Name
                        </th>
                        <th class="text-center" scope="col">
                          Attendance
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {values.sessionMembers.map((member, index) => (
                        <tr key={index}>
                          <td className="text-center">{index + 1}</td>
                          <td className="text-center">{member?.memberName}</td>
                          <td className="text-center">
                            <Field
                              as="select"
                              className="form-select"
                              name={`sessionMembers.${index}.attendanceStatus`}
                            >
                              <option value="Present">Present</option>
                              <option value="Absent">Absent</option>
                              <option value="Leave">Leave</option>
                              <option value="Oath Not Taken">
                                Oath Not Taken
                              </option>
                              <option value="Suspended">Suspended</option>
                            </Field>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button type="submit">Submit</button>
                </Form>
              )}
            </Formik>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default NMSSessionAttendance;

//   const formik = useFormik({
//     initialValues: {
//       memberId: "",
//       memberName: "",
//       status: "",
//     },
//     // validationSchema: validationSchema,
//     onSubmit: (values) => {
//       console.log("object", values);
//       // Handle form submission here
//       //   console.log(values.sessionMembers);
//     },
//   });

//   useEffect(() => {
//     if (attendenceMemberData.length > 0) {
//       formik.setValues({
//         sessionMembers: attendenceMemberData.map((mem) => ({
//           memberId: mem?.memberId,
//           memberName: mem?.memberName,
//           status: mem?.attendanceStatus,
//         })),
//       });
//       console.log("Form values set:", formik.values);
//     }
//   }, [attendenceMemberData]);

//   const handleStatusChange = (memberId, newStatus) => {
//     const updatedData = attendenceMemberData.map((item) =>
//       item.memberId === memberId
//         ? { ...item, attendanceStatus: newStatus }
//         : item
//     );
//     attendenceMemberData(updatedData);
//   };
