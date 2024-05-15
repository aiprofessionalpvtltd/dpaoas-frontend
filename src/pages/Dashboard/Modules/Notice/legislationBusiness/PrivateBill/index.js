import React, { useCallback, useEffect, useState } from "react";
import { Layout } from "../../../../../../components/Layout";
import Header from "../../../../../../components/Header";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import { NoticeSidebarItems } from "../../../../../../utils/sideBarItems";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";
import {
  deletePrivateBill,
  getAllPrivateBill,
  getAllPrivateBillNotice,
  sendPrivateBill,
} from "../../../../../../api/APIs/Services/Legislation.service";
import PrivateBillModal from "../../../../../../components/PrivateBillModal";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { CustomAlert } from "../../../../../../components/CustomComponents/CustomAlert";
import moment from "moment";

function PrivateBill() {
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 4; // Set your desired page size
  const [count, setCount] = useState();
  const [assignModalOpan, setAssignedModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  const transformPrivateData = (apiData) => {
    return apiData.map((item) => ({
      id: item?.id,
      SerialNo: item?.SerialNo ? item?.SerialNo : "",
      fileNo: item?.fileNo ? item?.fileNo : "",
      date: item?.date ? moment(item?.date).format("DD-MM-YYYY") : "",
      fromReceived: item?.fromReceived ? item?.fromReceived : "",
      briefSubject: item?.briefSubject ? item?.briefSubject : "",
      remarks: item?.remarks ? item?.remarks : "",
      AssignedTo: item?.branch?.branchName
        ? item?.branch?.branchName
        : ""
          ? item?.branch?.branchName
          : "Notice",
      status: item?.status ? item?.status : "",
    }));
  };
  const getAllPrivateBillApi = useCallback(async () => {
    try {
      const response = await getAllPrivateBillNotice(currentPage, pageSize);
      if (response?.success) {
        const transformedData = transformPrivateData(
          response?.data?.privateMemberBills
        );
        setCount(response?.data.count);
        setData(transformedData);
      }
    } catch (error) {
      console.log(error);
    }
  }, [currentPage, pageSize, setCount, setData]);

  const openModal = (item) => {
    // Inside a function or event handler
    setSelectedItem(item);
    setAssignedModal(true);
  };

  useEffect(() => {
    getAllPrivateBillApi();
  }, [getAllPrivateBillApi]);

  const handleDelete = async (id) => {
    try {
      const response = await deletePrivateBill(id);
      if (response?.success) {
        showSuccessMessage(response?.message);
        getAllPrivateBillApi();
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

  const sendBill = async (id) => {
    try {
      const data = {
        billSentDate: new Date()
      }
      const response = await sendPrivateBill(id, data);
      if (response?.success) {
        showSuccessMessage(response.message);
        getAllPrivateBillApi();
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
      <ToastContainer />
      {assignModalOpan && (
        <PrivateBillModal
          assignModalOpan={assignModalOpan}
          hendleModal={() => setAssignedModal(!assignModalOpan)}
          billData={selectedItem}
        />
      )}
      <Header
        dashboardLink={"/notice/dashboard"}
        // addLink1={"/notice/question/sent"}
        title1={"Private Member Bill"}
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
            tableTitle="Private Member Bill"
            addBtnText={"Create Private Bill"}
            handleAdd={() =>
              navigate("/notice/legislation/private-bill/addedit")
            }
            handleEdit={(item) =>
              navigate("/notice/legislation/private-bill/addedit", {
                state: item,
              })
            }
            handleDelete={(item) => {
              setSelectedItem(item);
              setShowModal(true);
            }}
            headertitlebgColor={"#666"}
            headertitletextColor={"#FFF"}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            pageSize={pageSize}
            totalCount={count}
            showAssigned={false}
            hendleAssigned={(item) => openModal(item)}
            showSent={true}
            handleSent={(item) => sendBill(item?.id)}
          />
        </div>
      </div>
    </Layout>
  );
}

export default PrivateBill;
