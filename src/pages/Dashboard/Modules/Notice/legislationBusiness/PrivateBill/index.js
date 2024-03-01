import React, { useCallback, useEffect, useState } from "react";
import { Layout } from "../../../../../../components/Layout";
import Header from "../../../../../../components/Header";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import { NoticeSidebarItems } from "../../../../../../utils/sideBarItems";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";
import { getAllPrivateBill } from "../../../../../../api/APIs/Services/Legislation.service";
import PrivateBillModal from "../../../../../../components/PrivateBillModal";
import { ToastContainer } from "react-toastify";

function PrivateBill() {
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 4; // Set your desired page size
  const [count, setCount] = useState();
  const [assignModalOpan, setAssignedModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

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
      status: item?.status,
      AssignedTo: item?.branch?.branchName
        ? item?.branch?.branchName
        : "Notice",
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
    setSelectedItem({
      id: item.id,
    });
    setAssignedModal(true);
  };

  useEffect(() => {
    getAllPrivateBillApi();
  }, [getAllPrivateBillApi]);
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
      <Header dashboardLink={"/"} />

      <div class="row">
        <div class="col-12">
          <CustomTable
            singleDataCard={true}
            data={data}
            tableTitle="Private Bill"
            hideBtn={true}
            hidebtn1={true}
            headertitlebgColor={"#666"}
            headertitletextColor={"#FFF"}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            pageSize={pageSize}
            totalCount={count}
            showAssigned={true}
            hideDeleteIcon={true}
            hideEditIcon={true}
            hendleAssigned={(item) => openModal(item)}
          />
        </div>
      </div>
    </Layout>
  );
}

export default PrivateBill;
