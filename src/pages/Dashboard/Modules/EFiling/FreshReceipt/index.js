import React, { useCallback, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router';
import { useLocation } from "react-router-dom";
import { Layout } from '../../../../../components/Layout';
import Header from '../../../../../components/Header';
import CustomTable from '../../../../../components/CustomComponents/CustomTable';
import { EfilingSideBarItem } from '../../../../../utils/sideBarItems';
import { DeleteFreshReceipt, getAllFreshReceipt } from '../../../../../api/APIs/Services/efiling.service';
import { showErrorMessage, showSuccessMessage } from '../../../../../utils/ToastAlert';
import moment from 'moment';
import FreshReceiptModal from '../../../../../components/FreshReceiptModal';


function FileCases() {
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [assignModalOpan, setAssignedModal] = useState(false);
    const [count, setCount] = useState(null);
    const pageSize = 10; // Set your desired page size
    const [fileData, setFileData] = useState([])

    const handlePageChange = (page) => {
        // Update currentPage when a page link is clicked
        setCurrentPage(page);
    };

    const transformFreshReceiptdata = (apiData) => {
        return apiData.map((item) => ({
          id: item?.id,
          frType: item?.frType,
          frSubject: item?.frSubject,
          referenceNumber: item?.referenceNumber,
          frDate:moment(item?.frDate).format("DD/MM/YYYY"),
          diaryDate:moment(item?.freshReceiptDiaries?.diaryDate).format("DD/MM/YYYY"),
          status:item?.status
        }));
      };
      const getAllFreshReceiptAPi = useCallback(async () => {
        try {
            const response = await getAllFreshReceipt(currentPage, pageSize)
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
        getAllFreshReceiptAPi()
      },[currentPage])

      const openModal = (item) => {
        // Inside a function or event handler
        setSelectedItem(item);
        setAssignedModal(true);
      };


    return (
        <Layout module={true} sidebarItems={EfilingSideBarItem}>
            <div class='row'>
            <Header dashboardLink={"/efiling/dashboard"} addLink1={"/efiling/dashboard/fresh-receipt"} title1={"Fresh Receipts"} />
            <div className="col" style={{ marginTop: "30px", float: 'right' }}>
                  <button className="btn btn-primary" onClick={() => navigate('/efiling/dashboard/fresh-receipt/history')} >
                    View Previous History
                  </button>
            </div>
            </div>
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
                        handleEdit={(item) => navigate("/efiling/dashboard/fresh-receipt/addedit", {state:{id:item.id}})}
                        showAssigned={true}
                        hendleAssigned={(item) => openModal(item)}
                    />
                </div>
            </div>
        </Layout>
    )
}

export default FileCases;