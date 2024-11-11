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
import { showSuccessMessage } from "../../../../../utils/ToastAlert";
import { HalfMalf } from "react-spinner-animated";

function EfilingLeaveManagement() {
  const userData = getUserData();
  console.log(userData?.designation?.designationName);
  
  const [employeeData, setEmployeeData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getEmployeeData = async () => {
    try {
      const response = await getHLEmployee(userData?.fkUserId);
      if (response?.success) {
        const filteredData = response?.data?.filter(
          (item) => item?.userName !== userData?.userName
        ); // Default attendance status
        setEmployeeData(filteredData);
        console.log("Api Data", filteredData);
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
    const updatedEmployees = employeeData.find((member, i) =>
      i === index ? { ...member, attendanceStatus: e.target.value } : member
    );
    const payload = {
      attendanceEnum: e.target.value,
      branchId: updatedEmployees.fkBranchId,
      userId: updatedEmployees.fkUserId,
    };
    console.log(payload);
    try {
      const response = await leaveEfilingUser(payload);
      if (response?.success) {
        showSuccessMessage(response?.data?.message);
        getEmployeeData();
      }
    } catch (error) {
      console.log(error);
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
        {employeeData.length > 0 && (
          <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4 mt-4">
            {employeeData.map((member, index) => (
              <div key={index} className="col">
                <EfilingAttendanceCard
                  view ={ userData?.designation?.designationName === "Director General" || userData?.designation?.designationName === "Joint Secretary" || userData?.designation?.designationName === "Section Officer"  ? false :true}
                  memberName={member?.firstName}
                  memberParty={`${member?.designations?.designationName}`}
                  attendance={member.attendanceStatus}
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
