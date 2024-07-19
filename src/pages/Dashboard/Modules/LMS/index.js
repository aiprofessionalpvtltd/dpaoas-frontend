import React, { useEffect, useState } from "react";
import { Layout } from "../../../../components/Layout";
import LeaveCard from "../../../../components/CustomComponents/LeaveCard";
import CustomTable from "../../../../components/CustomComponents/CustomTable";
import profileimage from "../../../../assets/profile-img.jpg";
import { LMSsidebarItems } from "../../../../utils/sideBarItems";
import { useNavigate } from "react-router-dom";
import { getAllLeaves, getWhosOnLeave } from "../../../../api/APIs/Services/LeaveManagementSystem.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../utils/ToastAlert";
import moment from "moment";
import Moment from "react-moment";

const data = [
  {
    id: 1,
    name: "Saqib Khan",
    leaveType: "Sick",
    startDate: "11/02/2023",
    endDate: "11/02/2023",
    totalDays: "30",
    reason: "Feeling Not Good",
    leaveStatus: "Approved",
    submittedTo: "Mohsin",
  },
  {
    id: 2,
    name: "Mohsin Khan",
    leaveType: "Sick",
    startDate: "11/02/2023",
    endDate: "11/02/2023",
    totalDays: "30",
    reason: "Feeling Not Good",
    leaveStatus: "Approved",
    submittedTo: "Mohsin",
  },
  {
    id: 3,
    name: "Saqib Khan",
    leaveType: "Sick",
    startDate: "11/02/2023",
    endDate: "11/02/2023",
    totalDays: "30",
    reason: "Feeling Not Good",
    leaveStatus: "Approved",
    submittedTo: "Mohsin",
  },
  {
    id: 4,
    name: "Mohsin Khan",
    leaveType: "Sick",
    startDate: "11/02/2023",
    endDate: "11/02/2023",
    totalDays: "30",
    reason: "Feeling Not Good",
    leaveStatus: "Approved",
    submittedTo: "Mohsin",
  },
];

const onleaveData = [
  {
    id: "1",
    profile: profileimage,
    name: "Saqib",
    date: "April 20 - April 28,",
    leaveType: "11:33 am",
  },
  {
    id: "1",
    profile: profileimage,
    name: "Saqib",
    date: "April 20 - April 28,",
    leaveType: "11:33 am",
  },
  {
    id: "1",
    profile: profileimage,
    name: "Saqib",
    date: "April 20 - April 28,",
    leaveType: "11:33 am",
  },
];
function LMSDashboard() {
  const navigate = useNavigate();
  const [leaveData, setLeaveData] = useState([]);
  const [whoOnLeave, setWhoOnLeave] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(null);
  const pageSize = 10; // Set your desired page size

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  const transformLeavesData = (apiData) => {
    return apiData.map((leave) => ({
      id: leave.id,
      name: `${leave.leavefirstName} ${leave.leavelastName}`,
      leaveType: leave.requestLeaveSubType,
      startDate: moment(leave.requestStartDate).format("YYYY/MM/DD"),
      endDate: moment(leave.requestEndDate).format("YYYY/MM/DD"),
      totalDays: leave.requestNumberOfDays,
      reason: leave.requestLeaveReason,
      leaveStatus: leave.requestStatus,
      submittedTo: leave.leavesubmittedTofirstName,
    }));
  };

  const getAllLeavesApi = async () => {
    try {
      const response = await getAllLeaves(currentPage, pageSize);
      if (response?.success) {
        setCount(response?.data?.counts);
        const transformedData = transformLeavesData(response.data?.result);
        setLeaveData(transformedData);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const getWhosOnLeaveApi = async () => {
    try {
      const currentDate = new Date();
      const formattedDate = moment(currentDate).format("YYYY-MM-DD");

      const response = await getWhosOnLeave(formattedDate, formattedDate, 1);
      if (response?.success) {
        setWhoOnLeave(response?.data);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getAllLeavesApi();
    getWhosOnLeaveApi();
  }, [currentPage]);

  return (
    <Layout module={true} sidebarItems={LMSsidebarItems} centerlogohide={true}>
      <ToastContainer />

      <h1>Welcome back Abbas</h1>
      <div class="row">
        <div class="col-md-12">
          <div class="mt-5 mb-4">
            <div class="row">
              <LeaveCard
                available={"06"}
                used={"05"}
                title={"Approved Leaves"}
                percentage={"60"}
                value={"10"}
              />
              <LeaveCard
                available={"05"}
                used={"04"}
                title={"Submitted Leaves"}
                percentage={"80"}
                value={"09"}
              />
              <LeaveCard
                available={"05"}
                used={"04"}
                title={"Remaining Leaves"}
                percentage={"100"}
                value={"07"}
              />
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-9">
          <CustomTable
            block={false}
            data={leaveData}
            tableTitle="Leave Request"
            addBtnText="Add Leave"
            handleAdd={() => navigate("/lms/addedit")}
            handleEdit={(item) => navigate("/lms/addedit", { state: item })}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            pageSize={pageSize}
            totalCount={count}
            // handleDelete={(item) => handleDelete(item.id)}
          />
        </div>
        <div class="col-3">
          <div class="dash-detail-container">
            <div class="dash-card">
              <div class="dash-card-header green-bg">
                <h2>Who is on Leave</h2>
              </div>
              <div class="count" style={{ width: "100%" }}>
                <h3
                  style={{
                    fontSize: "17px",
                    marginTop: "7px",
                    marginBottom: "30px",
                  }}
                  class="float-start"
                >
                  On leave :{" "}
                  <span style={{ color: "red" }}>{whoOnLeave?.length}</span>
                </h3>
                <div class="clearfix"></div>
                {whoOnLeave &&
                  whoOnLeave.map((item, index) => (
                    <div class="d-flex flex-row" key={index}>
                      <img
                        style={{ marginBottom: "30px", marginRight: "15px" }}
                        src={item.profile}
                        width="40"
                        height="40"
                        class="rounded-circle mr-3"
                        alt="logo"
                      />
                      <div class="w-100">
                        <div class="d-flex flex-row justify-content-between align-items-center">
                          <div class="d-flex flex-row align-items-center">
                            <span class="mr-2">
                              {item.userfirstName} {item.userlastName}
                            </span>
                          </div>
                          <p
                            class="text-justify comment-text mb-0"
                            style={{ textAlign: "left" }}
                          >
                            <span>{item.requestLeaveReason}</span>
                          </p>
                        </div>
                        <p
                          class="text-justify comment-text mb-0"
                          style={{ textAlign: "left" }}
                        >
                          <span>
                            {
                              <Moment format="MMMM DD">
                                {item.requestStartDate}
                              </Moment>
                            }{" "}
                            -{" "}
                            {
                              <Moment format="MMMM DD">
                                {item.requestEndDate}
                              </Moment>
                            }
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default LMSDashboard;
