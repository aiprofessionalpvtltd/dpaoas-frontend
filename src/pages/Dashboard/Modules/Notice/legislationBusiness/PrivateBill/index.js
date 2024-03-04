import React, { useCallback, useEffect, useState } from "react";
import { Layout } from "../../../../../../components/Layout";
import Header from "../../../../../../components/Header";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import { NoticeSidebarItems } from "../../../../../../utils/sideBarItems";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";
import { deletePrivateBill, getAllPrivateBill } from "../../../../../../api/APIs/Services/Legislation.service";
import PrivateBillModal from "../../../../../../components/PrivateBillModal";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

function PrivateBill() {
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 4; // Set your desired page size
  const [count, setCount] = useState();
  const [assignModalOpan, setAssignedModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate()

  const [data, setData] = useState([]);

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  const transformPrivateData = (apiData) => {
    return apiData.map((item) => ({
      id: item?.id,
      SerialNo: item?.SerialNo,
      fileNo: item?.fileNo,
      date: item?.date,
      fromReceived: item?.fromReceived,
      briefSubject: item?.briefSubject,
      remarks: item?.remarks,
      AssignedTo: item?.branch?.branchName
        ? item?.branch?.branchName
        : "Notice",
      status: item?.status,
    }));
  };
  const getAllPrivateBillApi = useCallback(async () => {
    try {
      const response = await getAllPrivateBill(currentPage, pageSize);
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
        getAllPrivateBillApi()
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  }
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
        title1={"Private Bill"}
      />

      <div class="row">
        <div class="col-12">
          <CustomTable
            singleDataCard={true}
            data={data}
            tableTitle="Private Bill"
            addBtnText={"Create Private Bill"}
            handleAdd={() => navigate("/notice/legislation/private-bill/addedit")}
            handleEdit={(item) => navigate("/notice/legislation/private-bill/addedit", { state: item })}
            handleDelete={(item) => handleDelete(item.id)}
            headertitlebgColor={"#666"}
            headertitletextColor={"#FFF"}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            pageSize={pageSize}
            totalCount={count}
            showAssigned={true}
            hendleAssigned={(item) => openModal(item)}
          />
        </div>
      </div>
    </Layout>
  );
}

export default PrivateBill;
