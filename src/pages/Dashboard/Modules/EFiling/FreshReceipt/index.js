import React, { useCallback, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { Layout } from "../../../../../components/Layout";
import Header from "../../../../../components/Header";
import CustomTable from "../../../../../components/CustomComponents/CustomTable";
import {
  EfilingSideBarBranchItem,
  EfilingSideBarItem,
} from "../../../../../utils/sideBarItems";
import {
  DeleteFreshReceipt,
  getAllFreshReceipt,
} from "../../../../../api/APIs/Services/efiling.service";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../utils/ToastAlert";
import moment from "moment";
import FreshReceiptModal from "../../../../../components/FreshReceiptModal";
import {
  getUserData,
  setFRAttachmentsData,
  setFRId,
} from "../../../../../api/Auth";

function FileReceipt() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [assignModalOpan, setAssignedModal] = useState(false);
  const [count, setCount] = useState(null);
  const pageSize = 10; // Set your desired page size
  const [fileData, setFileData] = useState([]);
  const UserData = getUserData();

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  const transformFreshReceiptdata = (apiData) => {
    return apiData.map((item) => ({
      isEditable: item?.isEditable,
      id: item?.id,
      frType: item?.frType,
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
      const response = await getAllFreshReceipt(
        UserData?.fkUserId,
        currentPage,
        pageSize
      );
      if (response.success) {
        //   showSuccessMessage(response?.message)
        setCount(response?.data?.count);
        const transformedData = transformFreshReceiptdata(
          response?.data?.freshReceipts
        );
        setFileData(transformedData);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  }, [currentPage, pageSize, setCount, setFileData]);

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
      <div className="row">
        <div className="col mx-3 mt-4 mb-4">
          <button
            className="btn btn-primary"
            type="button"
            onClick={handlePreiousHistory}
          >
            View Previous History
          </button>
        </div>
      </div>
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
            hidebtn1={false}
            hideBtn={true}
            addBtnText={"Create Fresh Receipt"}
            data={fileData}
            tableTitle="Fresh Receipts"
            headerBgColor={"#4B8FF0"}
            headerTitleColor={"#fff"}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            handleAdd={() =>
              navigate("/efiling/dashboard/fresh-receipt/addedit")
            }
            pageSize={pageSize}
            totalCount={count}
            singleDataCard={true}
            hideDeleteIcon={true}
            handleDelete={(item) => handleDelete(item.id)}
            showEditIcon={true}
            handleEdit={(item) =>
              navigate("/efiling/dashboard/fresh-receipt/addedit", {
                state: { id: item.id, view: true },
              })
            }
            showAssigned={false}
            hendleAssigned={(item) =>
              navigate("/efiling/dashboard/fresh-receipt/frdetail", {
                state: { id: item.id, view: false },
              })
            }
            showCreateBtn={false}
            hendleCreateBtn={(item) => {
              setFRId(item.id);
              setFRAttachmentsData(item.internalAttachment);
              if (item?.internalAttachment) {
                navigate(
                  "/efiling/dashboard/file-register-list/files-list/addedit-case",
                  {
                    state: {
                      freshReceiptsAttachments: item.internalAttachment,
                      frId: item.id,
                      frSubject: item.frSubject,
                    },
                  }
                );
              } else {
                alert("Please select an attachment");
              }
            }}
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

export default FileReceipt;
