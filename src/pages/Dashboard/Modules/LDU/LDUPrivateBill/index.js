import React, { useState , useCallback , useEffect } from 'react'
import { CustomAlert } from '../../../../../components/CustomComponents/CustomAlert';
import CustomTable from '../../../../../components/CustomComponents/CustomTable';
import Header from '../../../../../components/Header';
import PrivateBillModal from '../../../../../components/PrivateBillModal';
import { ToastContainer } from 'react-toastify';
import { LDUSideBarItems , LegislationSideBarItems} from '../../../../../utils/sideBarItems';
import { showErrorMessage, showSuccessMessage } from '../../../../../utils/ToastAlert';
import { deletePrivateBill, getAllPrivateBill, getAllPrivateBillNotice } from '../../../../../api/APIs/Services/Legislation.service';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../../../../../components/Layout';

const LDUPrivateBill = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 10; // Set your desired page size
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
        memberName:item?.member?.memberName,
        SerialNo: item?.SerialNo ? item?.SerialNo : "",
        fileNo: item?.fileNo ? item?.fileNo : "",
        date: item?.date ? moment(item?.date).format("DD-MM-YYYY") : "",
        fromReceived: item?.fromReceived ? item?.fromReceived : "",
        briefSubject: item?.briefSubject ? item?.briefSubject : "",
        remarks: item?.remarks ? item?.remarks : "",
        device:item?.device,
        AssignedTo: item?.branch?.branchName
          ? item?.branch?.branchName
          : ""
            ? item?.branch?.branchName
            : "Notice",
            device:item?.device,
        status: item?.billStatuses?.billStatusName ? item?.billStatuses?.billStatusName : "",
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
          title1={"Drafting of Private Member Bills"}
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
              tableTitle="Drafting of Private Member Bill"
              hidebtn1={true}
              addBtnText={"Create Private Bill"}
              handleAdd={() =>
                navigate("/ldu/privateMemberBill/ldu-private-Bill/edit-private-bill")
              }
              handleEdit={(item) =>
                navigate("/ldu/privateMemberBill/ldu-private-Bill/edit-private-bill", {
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
              ActionHide={false}
            />
          </div>
        </div>
      </Layout>
    );
  }

export default LDUPrivateBill
