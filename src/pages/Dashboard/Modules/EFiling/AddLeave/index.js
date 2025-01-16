import React, { useEffect, useState } from "react";
import { Layout } from "../../../../../components/Layout";
import {
  EfilingSideBarBranchItem,
  EfilingSideBarItem,
} from "../../../../../utils/sideBarItems";
import { getUserData } from "../../../../../api/Auth";
import { getHLEmployee } from "../../../../../api/APIs/Services/organizational.service";
import { EfilingAttendanceCard } from "../../../../../components/CustomComponents/EfilingAttendanceCard";
import { leaveEfilingUser } from "../../../../../api/APIs/Services/efiling.service";
import { showErrorMessage, showSuccessMessage } from "../../../../../utils/ToastAlert";
import { HalfMalf } from "react-spinner-animated";
import { ToastContainer } from "react-toastify";

function EfilingLeaveManagement() {
  const userData = getUserData();
  console.log(userData?.designation?.designationName);
  
  const [employeeData, setEmployeeData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getEmployeeData = async () => {
    try {
      const response = await getHLEmployee(userData?.fkUserId, userData?.branch?.id, userData?.branch?.branchName);
      if (response?.success) {
        const filteredData = response?.data?.filter(
          (item) => item?.userName !== userData?.userName
        ); // Default attendance status
        setEmployeeData(filteredData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEmployeeData();
  }, []);

  // Update attendance status for a specific employee
  const handleAttendanceChange = async (e, index) => {
    setLoading(true);
    const updatedMember = employeeData.find((member, i) => i === index);

      const payload = {
        attendanceEnum: e.target.value,
        branchId: updatedMember?.fkBranchId,
        userId: updatedMember?.fkUserId,
      };
      // Update the member's attendance status locally if needed
      updatedMember.users = { ...updatedMember.users, attendance_status: e.target.value };
    
    try {
      const response = await leaveEfilingUser(payload);
      if (response?.success) {
        showSuccessMessage(response?.data?.message);
        getEmployeeData();
      }
    } catch (error) {
      showErrorMessage(error.response.data.message)
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout
      module={false}
      centerlogohide={true}
      sidebarItems={
        userData && userData?.userType === "Officer"
          ? EfilingSideBarItem
          : EfilingSideBarBranchItem
      }
    >
      <ToastContainer />
      {loading && (
        <HalfMalf
          text={"Loading data..."}
          bgColor={"#ffffff"}
          center={true}
          width={"150px"}
          height={"150px"}
        />
      )}
      <div className="container-fluid">
        {employeeData?.length > 0 && (
          <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4 mt-4">
            {employeeData.map((member, index) => (
              <div key={index} className="col">
                <EfilingAttendanceCard
                  view ={userData?.designation?.designationName === "Director General" || userData?.designation?.designationName === "Joint Secretary" || userData?.designation?.designationName === "Section Officer"  ? false :true}
                  memberName={member?.firstName}
                  memberParty={`${member?.designations?.designationName}`}
                  attendance={member?.users?.attendance_status}
                  onChange={(e) => handleAttendanceChange(e, index)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default EfilingLeaveManagement;
