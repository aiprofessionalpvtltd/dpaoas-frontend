import React, { useCallback, useEffect, useState } from "react";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";
import { Layout } from "../../../../../components/Layout";
import { LegislationSideBarItems } from "../../../../../utils/sideBarItems";
import {
  DeleteLegislativeBill,
  getAllLegislativeBill,
} from "../../../../../api/APIs/Services/Notice.service";
import Header from "../../../../../components/Header";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import CustomTable from "../../../../../components/CustomComponents/CustomTable";

function LGMSPrivateBill() {
  const navigate = useNavigate();
  const [count, setCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [billData, setBillData] = useState([]);
  const pageSize = 10;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const transformLegislativeData = (apiData) => {
    return apiData.map((item, index) => ({
      SR: item?.id,
      title: item?.title ? item?.title : "",
      memberName: item?.member?.memberName,
      sessionno: item?.session?.sessionName ? item?.session?.sessionName : "",
      date: item?.date ? moment(item?.date).format("DD-MM-YYYY") : "",
      description: item?.description ? item?.description : "",
      device: item?.device ? item?.device : "",
      status: item?.isActive ? item?.isActive : "",
    }));
  };

  const getAllLegislativeBillApi = useCallback(async () => {
    try {
      const response = await getAllLegislativeBill(currentPage, pageSize);
      if (response?.success) {
        setCount(response?.data?.count);
        const trensferData = transformLegislativeData(
          response?.data?.legislativeBills
        );
        setBillData(trensferData);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  }, [currentPage, pageSize, setCount, setBillData]);

  const handleDelete = async (id) => {
    try {
      const response = await DeleteLegislativeBill(id);
      if (response?.success) {
        showSuccessMessage(response.message);
        getAllLegislativeBillApi();
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  };

  useEffect(() => {
    getAllLegislativeBillApi();
  }, [currentPage]);
  return (
    <Layout
      module={true}
      sidebarItems={LegislationSideBarItems}
      centerlogohide={true}
    >
      <ToastContainer />
      <Header
        dashboardLink={"/notice/dashboard"}
        addLink1={"/"}
        title1={"Private Member Bills"}
      />
      <div class="row mt-5">
        <div class="col-12">
          <CustomTable
            singleDataCard={true}
            block={false}
            data={billData}
            hidebtn1={true}
            // addBtnText={"Create Speech On Demand"}
            tableTitle="Private Member Bills"
            handlePageChange={handlePageChange}
            hideBtn={true}
            currentPage={currentPage}
            pageSize={pageSize}
            headertitlebgColor={"#666"}
            headertitletextColor={"#FFF"}
            totalCount={count}
            // handleAdd={() => navigate("/notice/speech-on-demand/addedit")}
            handleEdit={(item) =>
              navigate("/lgms/legislation/legislative-bill/addedit", {
                state: { id: item?.SR },
              })
            }
            handleDelete={(item) => handleDelete(item.SR)}
            ActionHide={true}
          />
        </div>
      </div>
    </Layout>
  );
}
export default LGMSPrivateBill;

// Old Data (Change the Component Name and Keep The Given Component Data in the Above component )
// import React, { useCallback, useEffect, useState } from "react";
// import { Layout } from "../../../../../components/Layout";
// import Header from "../../../../../components/Header";
// import CustomTable from "../../../../../components/CustomComponents/CustomTable";
// import { LegislationSideBarItems } from "../../../../../utils/sideBarItems";
// import {
//   showErrorMessage,
//   showSuccessMessage,
// } from "../../../../../utils/ToastAlert";
// import {
//   deletePrivateBill,
//   getAllPrivateBill,
// } from "../../../../../api/APIs/Services/Legislation.service";
// import PrivateBillModal from "../../../../../components/PrivateBillModal";
// import { ToastContainer } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import { CustomAlert } from "../../../../../components/CustomComponents/CustomAlert";
// import moment from "moment";

// function LGMSPrivateBill() {
//   const [currentPage, setCurrentPage] = useState(0);
//   const pageSize = 10; // Set your desired page size
//   const [count, setCount] = useState();
//   const [assignModalOpan, setAssignedModal] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const navigate = useNavigate();

//   const [data, setData] = useState([]);

//   const handlePageChange = (page) => {
//     // Update currentPage when a page link is clicked
//     setCurrentPage(page);
//   };

//   const transformPrivateData = (apiData) => {
//     return apiData.map((item) => ({
//       id: item?.id,
//       SerialNo: item?.SerialNo ? item?.SerialNo : "",
//       fileNo: item?.fileNo ? item?.fileNo : "",
//       date: item?.date ? moment(item?.date).format("DD-MM-YYYY") : "",
//       fromReceived: item?.fromReceived ? item?.fromReceived : "",
//       briefSubject: item?.briefSubject ? item?.briefSubject : "",
//       remarks: item?.remarks ? item?.remarks : "",
//       AssignedTo: item?.branch?.branchName
//         ? item?.branch?.branchName
//         : ""
//           ? item?.branch?.branchName
//           : "Notice",
//       status: item?.billStatuses?.billStatus ? item?.billStatuses?.billStatus : "",
//     }));
//   };
//   const getAllPrivateBillApi = useCallback(async () => {
//     try {
//       const response = await getAllPrivateBill(currentPage, pageSize);
//       if (response?.success) {
//         const transformedData = transformPrivateData(
//           response?.data?.privateMemberBills
//         );
//         setCount(response?.data.count);
//         setData(transformedData);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }, [currentPage, pageSize, setCount, setData]);

//   const openModal = (item) => {
//     // Inside a function or event handler
//     setSelectedItem(item);
//     setAssignedModal(true);
//   };

//   useEffect(() => {
//     getAllPrivateBillApi();
//   }, [getAllPrivateBillApi]);

//   const handleDelete = async (id) => {
//     try {
//       const response = await deletePrivateBill(id);
//       if (response?.success) {
//         showSuccessMessage(response?.message);
//         getAllPrivateBillApi();
//       }
//     } catch (error) {
//       showErrorMessage(error?.response?.data?.message);
//     }
//   };

//   const handleClose = () => setShowModal(false);
//   const handleOkClick = () => {
//     handleDelete(selectedItem?.id);
//     handleClose();
//   };

//   return (
//     <Layout
//       module={true}
//       sidebarItems={LegislationSideBarItems}
//       centerlogohide={true}
//     >
//       <ToastContainer />
//       {assignModalOpan && (
//         <PrivateBillModal
//           assignModalOpan={assignModalOpan}
//           hendleModal={() => setAssignedModal(!assignModalOpan)}
//           billData={selectedItem}
//         />
//       )}
//       <Header
//         dashboardLink={"/notice/dashboard"}
//         // addLink1={"/notice/question/sent"}
//         title1={"Private Member Bill"}
//       />

//       <CustomAlert
//         showModal={showModal}
//         handleClose={handleClose}
//         handleOkClick={handleOkClick}
//       />

//       <div class="row mt-5">
//         <div class="col-12">
//           <CustomTable
//             singleDataCard={true}
//             data={data}
//             tableTitle="Private Member Bill"
//             hidebtn1={true}
//             // addBtnText={"Create Private Bill"}
//             // handleAdd={() =>
//             //   navigate("/notice/legislation/private-bill/addedit")
//             // }
//             handleEdit={(item) =>
//               navigate("/lgms/legislation/private-bill/addedit", {
//                 state: item,
//               })
//             }
//             handleDelete={(item) => {
//               setSelectedItem(item);
//               setShowModal(true);
//             }}
//             headertitlebgColor={"#666"}
//             headertitletextColor={"#FFF"}
//             handlePageChange={handlePageChange}
//             currentPage={currentPage}
//             pageSize={pageSize}
//             totalCount={count}
//             showAssigned={false}
//             hendleAssigned={(item) => openModal(item)}
//             ActionHide={true}
//           />
//         </div>
//       </div>
//     </Layout>
//   );
// }

// export default LGMSPrivateBill;
