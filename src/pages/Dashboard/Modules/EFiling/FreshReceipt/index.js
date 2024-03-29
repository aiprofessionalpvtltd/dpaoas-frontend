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
import { getUserData } from "../../../../../api/Auth";

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
          id: item?.id,
          frType: item?.frType,
          Sender: item?.freshReceipt?.length > 0 ? item?.freshReceipt[0]?.submittedUser?.employee?.firstName : "---",
          Receiver: item?.freshReceipt?.length > 0 ? item?.freshReceipt[0]?.assignedUser?.employee?.firstName : "---",
          // Status: item?.fileRemarksData?.length > 0 ? item?.fileRemarksData[item?.fileRemarksData?.length - 1]?.CommentStatus : "Draft",
          frSubject:item?.frSubject,
          referenceNumber: item?.referenceNumber,
          frDate: moment(item?.frDate).format("DD/MM/YYYY"),
          DiaryDate: item?.freshReceiptDiaries ? moment(item?.freshReceiptDiaries?.diaryDate).format("DD/MM/YYYY") : "---",
          internalAttachment: item?.freshReceiptsAttachments
        }));
      };
      const getAllFreshReceiptAPi = useCallback(async () => {
        try {
            const response = await getAllFreshReceipt(UserData?.fkUserId, currentPage, pageSize)
            if (response.success) {
            //   showSuccessMessage(response?.message)
              setCount(response?.data?.count)
              const transformedData = transformFreshReceiptdata(response?.data?.freshReceipts)
              setFileData(transformedData)
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
                        // hidebtn1={true}
                        hideBtn={false}
                        addBtnText={"Create Fresh Receipt"}
                        data={fileData}
                        tableTitle="Fresh Receipts"
                        headertitlebgColor={"#666"}
                        headertitletextColor={"#FFF"}
                        handlePageChange={handlePageChange}
                        currentPage={currentPage}
                        handleAdd={() => navigate("/efiling/dashboard/fresh-receipt/addedit")}
                        pageSize={pageSize}
                        totalCount={count}
                        singleDataCard={true}
                        handleDelete={(item) => handleDelete(item.id)}
                        handleEdit={(item) => navigate("/efiling/dashboard/fresh-receipt/addedit", {state:{id:item.id, view: true}})}
                        showAssigned={true}
                        hendleAssigned={(item) => navigate("/efiling/dashboard/fresh-receipt/frdetail", {state:{id:item.id, view: false}})}
                        showCreateBtn={true}
                        hendleCreateBtn={(item) => {
                          if(item?.internalAttachment) {
                            navigate("/efiling/dashboard/file-register-list/files-list/addedit-case", {state:{freshReceiptsAttachments:item.internalAttachment, frId: item.id}})
                          } else {
                            alert("Please select an attachment")
                          }
                        }}
                    />
                    
                </div>
            </div>
        </Layout>
    )
}

export default FileReceipt;
