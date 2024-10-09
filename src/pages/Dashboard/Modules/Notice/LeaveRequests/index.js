import React, { useCallback, useEffect, useState } from "react";
import { Layout } from "../../../../../components/Layout";
import Header from "../../../../../components/Header";
import CustomTable from "../../../../../components/CustomComponents/CustomTable";
import { NoticeSidebarItems } from "../../../../../utils/sideBarItems";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../utils/ToastAlert";
import { deletePrivateBill } from "../../../../../api/APIs/Services/Legislation.service";

import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { CustomAlert } from "../../../../../components/CustomComponents/CustomAlert";
import moment from "moment";
import { getAllLeaveRequests } from "../../../../../api/APIs/Services/LeaveManagementSystem.service";

function LeaveRequests() {
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10; // Set your desired page size
  const [count, setCount] = useState();
  const [assignModalOpan, setAssignedModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  console.log("data", data);

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  // const transformPrivateData = (apiData) => {
  //   return apiData?.map((item) => ({
  //     id: item?.id,
  //     startDate: item?.requestStartDate
  //       ? item.requestStartDate
  //       : item?.leave_oneday
  //         ? item.leave_oneday
  //         : "---",
  //     endDate: item?.requestEndDate
  //       ? item.requestEndDate
  //       : item?.leave_oneday
  //         ? item.leave_oneday
  //         : "---",
  //     reason: item?.requestLeaveReason,
  //     member: item?.memberName ? item?.memberName : "---",
  //     status: item?.requestStatus,
  //   }));
  // };

  const transformPrivateData = (apiData) => {
    return apiData?.map((item) => {
      // Determine leave type
      let leaveType = "";
      if (item?.leave_oneday) {
        leaveType = "Single Day"; // Single-day leave
      } else if (item?.requestStartDate && item?.requestEndDate) {
        leaveType = "Multiple Days"; // Multiple-day leave
      } else {
        leaveType = "Full Session"; // Full session leave
      }

      return {
        id: item?.id,
        leaveType: leaveType,
        session: item?.sessionName ? item?.sessionName : "---",
        singleDayDate: item?.leave_oneday
          ? moment(item.leave_oneday).format("DD-MM-YYYY")
          : "---", // Corrected access to leave_oneday
        startDate: item?.requestStartDate
          ? moment(item.requestStartDate).format("DD-MM-YYYY")
          : "---",
        endDate: item?.requestEndDate
          ? moment(item.requestEndDate).format("DD-MM-YYYY")
          : "---",
        reason: item?.requestLeaveReason || "---",
        member: item?.memberName || "Manzoor Ahmed",
        status: item?.requestStatus || "---",
        device: item?.device || "---",
      };
    });
  };

  const getAllLeaveRequestsApi = useCallback(async () => {
    try {
      const response = await getAllLeaveRequests(currentPage, pageSize);
      if (response?.success) {
        const transformedData = transformPrivateData(response?.data);
        setCount(response?.totalCount);
        setData(transformedData);
      }
    } catch (error) {
      console.log(error);
    }
  }, [currentPage, pageSize, setCount, setData]);

  useEffect(() => {
    getAllLeaveRequestsApi();
  }, [getAllLeaveRequestsApi]);

  const handleDelete = async (id) => {
    try {
      const response = await deletePrivateBill(id);
      if (response?.success) {
        showSuccessMessage(response?.message);
        getAllLeaveRequestsApi();
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const handleClose = () => setShowModal(false);
  const handleOkClick = () => {
    handleDelete(selectedItem?.id);
    handleClose();
  };

  return (
    <Layout
      module={true}
      sidebarItems={NoticeSidebarItems}
      centerlogohide={true}
    >
      <ToastContainer />

      <Header
        dashboardLink={"/notice/dashboard"}
        // addLink1={"/notice/question/sent"}
        title1={"Leave Requests"}
      />

      <CustomAlert
        showModal={showModal}
        handleClose={handleClose}
        handleOkClick={handleOkClick}
      />

      <div class="row">
        <div class="col-12">
          <CustomTable
            singleDataCard={true}
            data={data}
            tableTitle="Leave Requests"
            addBtnText={"Create Leave Request"}
            handleAdd={() => navigate("/notice/leaveRequests/addedit")}
            handleEdit={(item) =>
              navigate("/notice/leaveRequests/addedit", {
                state: item,
              })
            }
            handleDelete={(item) => {
              setSelectedItem(item);
              setShowModal(true);
            }}
            hideDeleteIcon={true}
            headertitlebgColor={"#666"}
            headertitletextColor={"#FFF"}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            pageSize={pageSize}
            totalCount={count}
          />
        </div>
      </div>
    </Layout>
  );
}

export default LeaveRequests;
