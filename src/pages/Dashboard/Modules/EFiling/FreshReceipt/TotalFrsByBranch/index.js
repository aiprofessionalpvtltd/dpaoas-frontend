import React, { useCallback, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router";

import moment from "moment";

import { getUserData } from "../../../../../../api/Auth";
import {
  DeleteFreshReceipt,
  getTotalFreshReceiptOfTheBranch,
} from "../../../../../../api/APIs/Services/efiling.service";
import { Layout } from "../../../../../../components/Layout";
import FreshReceiptModal from "../../../../../../components/FreshReceiptModal";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import {
  EfilingSideBarBranchItem,
  EfilingSideBarItem,
} from "../../../../../../utils/sideBarItems";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";

function TotalFrsOfTheBranch() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [assignModalOpan, setAssignedModal] = useState(false);
  const [count, setCount] = useState(null);
  const pageSize = 10; // Set your desired page size
  const [fileData, setBranchFrData] = useState([]);
  const UserData = getUserData();

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  const transformFreshReceiptdata = (apiData) => {
    return apiData.map((item) => ({
      isEditable: false,
      id: item?.id,
      frType: item?.frType,
      Branch: item?.userBranches?.branchName,
      initiatedBy: item?.createdByUser?.employee?.firstName,
      Sender:
        item?.freshReceipt?.length > 0
          ? item?.freshReceipt[0]?.submittedUser?.employee?.firstName
          : "---",
      Receiver:
        item?.freshReceipt?.length > 0
          ? item?.freshReceipt[0]?.assignedUser?.employee?.firstName
          : "---",
      // Status: item?.fileRemarksData?.length > 0 ? item?.fileRemarksData[item?.fileRemarksData?.length - 1]?.CommentStatus : "Draft",
      Status: item?.caseStatus,
      frSubject: item?.frSubject,
      referenceNumber: item?.referenceNumber,
      frDate: moment(item?.frDate).format("DD/MM/YYYY"),
      internalAttachment: item?.freshReceiptsAttachments,
      Priority:
        item?.freshReceipt.length > 0 ? item?.freshReceipt[0]?.priority : "---",
    }));
  };

  const getAllFreshReceiptAPi = useCallback(async () => {
    try {
      const response = await getTotalFreshReceiptOfTheBranch(
        UserData?.fkBranchId,
        currentPage,
        pageSize
      );
      if (response.success) {
        //   showSuccessMessage(response?.message)
        setCount(response?.data?.count);
        const transformedData = transformFreshReceiptdata(
          response?.data?.freshReceipts
        );
        setBranchFrData(transformedData);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  }, [currentPage, pageSize, setCount, setBranchFrData]);

  const handleDelete = async (id) => {
    try {
      const response = await DeleteFreshReceipt(id);
      if (response?.success) {
        showSuccessMessage(response.message);
        getAllFreshReceiptAPi();
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  };

  useEffect(() => {
    getAllFreshReceiptAPi();
  }, [currentPage]);

  const openModal = (item) => {
    // Inside a function or event handler
    setSelectedItem(item);
    setAssignedModal(true);
  };
  // Handle History
  const handlePreiousHistory = () => {
    navigate("/efiling/dashboard/fresh-receipt/history");
  };

  console.log("UserData?.branchName", UserData?.branchName);
  return (
    <Layout
      module={false}
      sidebarItems={
        UserData && UserData?.userType === "Officer"
          ? EfilingSideBarItem
          : EfilingSideBarBranchItem
      }
    >
      <ToastContainer />

      {assignModalOpan && (
        <FreshReceiptModal
          assignModalOpan={assignModalOpan}
          hendleModal={() => setAssignedModal(!assignModalOpan)}
          data={selectedItem}
        />
      )}

      <div class="row">
        <div class="col-12">
          <CustomTable
            hidebtn1={true}
            hideBtn={true}
            data={fileData}
            tableTitle={`Total Fresh Receipts of  ${
              UserData?.branch?.branchName || "Total Fresh Receipts"
            }`}
            headerBgColor={"#4B8FF0"}
            headerTitleColor={"#fff"}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            // handleAdd={() =>
            //   navigate("/efiling/dashboard/fresh-receipt/addedit")
            // }
            pageSize={pageSize}
            totalCount={count}
            singleDataCard={true}
            hideDeleteIcon={true}
            // handleDelete={(item) => handleDelete(item.id)}
            showEditIcon={true}
            // handleEdit={(item) =>
            //   navigate("/efiling/dashboard/fresh-receipt/addedit", {
            //     state: { id: item.id, view: true },
            //   })
            // }
            showAssigned={false}
            hendleAssigned={(item) =>
              navigate("/efiling/dashboard/fresh-receipt/frdetail", {
                state: { id: item.id, view: false },
              })
            }
            showCreateBtn={false}
            // hendleCreateBtn={(item) => {
            //   setFRId(item.id);
            //   setFRAttachmentsData(item.internalAttachment);
            //   if (item?.internalAttachment) {
            //     navigate(
            //       "/efiling/dashboard/file-register-list/files-list/addedit-case",
            //       {
            //         state: {
            //           freshReceiptsAttachments: item.internalAttachment,
            //           frId: item.id,
            //           frSubject: item.frSubject,
            //         },
            //       }
            //     );
            //   } else {
            //     alert("Please select an attachment");
            //   }
            // }}
            showView={false}
            handleView={(item) =>
              navigate("/efiling/dashboard/fresh-receipt/frdetail", {
                state: { id: item.id, view: true },
              })
            }
          />
        </div>
      </div>
    </Layout>
  );
}

export default TotalFrsOfTheBranch;
