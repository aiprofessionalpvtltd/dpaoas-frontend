import React, { useCallback, useEffect, useState } from 'react'
import CustomTable from '../../../../../../components/CustomComponents/CustomTable';
import { CustomAlert } from '../../../../../../components/CustomComponents/CustomAlert';
import Header from '../../../../../../components/Header';
import PrivateBillModal from '../../../../../../components/PrivateBillModal';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { LDUSideBarItems } from '../../../../../../utils/sideBarItems';
import { Layout } from '../../../../../../components/Layout';
import { deleteLawActsBill, getAllLawActs } from '../../../../../../api/APIs/Services/LDU.service';
import moment from 'moment';
import { showErrorMessage, showSuccessMessage } from '../../../../../../utils/ToastAlert';
const data = [

]
const AllFilesListing = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 4; // Set your desired page size
    const [count, setCount] = useState();
    const [assignModalOpan, setAssignedModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [data , setData] = useState([])
    const navigate = useNavigate();
    
    const transformPrivateData = (apiData) => {
        return apiData.map((item) => ({
          id: item?.id,
          subject: item?.subject,
          category: item?.category ? item?.category : "",
          updatedDate: item?.updatedDate ? moment(item?.updatedDate).format("DD-MM-YYYY") : "",
          chapterSections: item?.chapterSections ? item?.chapterSections : "",
          citationNumbers: item?.citationNumbers ? item?.citationNumbers : "",
          lawNumber: item?.lawNumber ? item?.lawNumber : "",
          status : item?.status ? item?.status : ""
        }));
      };

    const getAllLawActsList = useCallback(async () => {
        try {
          const response = await getAllLawActs(currentPage, pageSize);
          console.log(response)
          if (response?.success) {
            const transformedData = transformPrivateData(
              response?.data?.lawActs
            );
            setCount(response?.data.count);
            setData(transformedData);
          }
        } catch (error) {
          console.log(error);
        }
      }, [currentPage, pageSize, setCount, setData]);

      useEffect(() => {
        getAllLawActsList();
      }, [getAllLawActsList]);

    const openModal = (item) => {
        // Inside a function or event handler
        setSelectedItem(item);
        setAssignedModal(true);
      };

      const handleDelete = async (id) => {
        try {
          const response = await deleteLawActsBill(id);
          if (response?.success) {
            showSuccessMessage(response?.message);
            getAllLawActsList();
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
        sidebarItems={LDUSideBarItems}
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
          dashboardLink={"/ldu/dashboard"}
          // addLink1={"/notice/question/sent"}
          title1={"All List"}
        />
  
        <CustomAlert
          showModal={showModal}
          handleClose={handleClose}
          handleOkClick={handleOkClick}
        />
  
        <div class="row mt-5">
          <div class="col-12">
            <CustomTable
              singleDataCard={true}
              data={data}
              tableTitle="Laws & Acts List"
              hidebtn1={false}
              addBtnText={"Create LawActs"}
              handleAdd={() =>
                navigate("/ldu/lawActs/all-lisitng/edit-law-acts-Bill")
              }
              handleEdit={(item) =>
                navigate("/ldu/lawActs/all-lisitng/edit-law-acts-Bill", {
                  state: item,
                })
              }
              handleDelete={(item) => {
                setSelectedItem(item);
                setShowModal(true);
              }}
              headertitlebgColor={"#666"}
              headertitletextColor={"#FFF"}
            //   handlePageChange={handlePageChange}
              currentPage={currentPage}
              pageSize={pageSize}
              totalCount={count}
              showAssigned={false}
              hendleAssigned={(item) => openModal(item)}
              ActionHide={false}
            />
          </div>
        </div>
      </Layout>
  )
}

export default AllFilesListing
