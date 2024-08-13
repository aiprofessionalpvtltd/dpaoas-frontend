// import { useCallback, useEffect, useState } from "react";
// import Header from "../../../components/Header";
// import { Layout } from "../../../components/Layout";
// import { LegislationSideBarItems } from "../../../utils/sideBarItems";
// import { ToastContainer } from "react-toastify";
// import CustomTable from "../../CustomComponents/CustomTable";
// import { useNavigate } from "react-router-dom";

// import moment from "moment";

// const IntroducedInSenate = () => {
//   const navigate = useNavigate();
//   const [currentPage, setCurrentPage] = useState(0);
//   const [governmentBill, setGovernmantBill] = useState([]);
//   const [governmentSenateBill, setGovernmantSenateBill] = useState([]);
//   const [governmentNABill, setGovernmantNABill] = useState([]);
//   const [count, setCount] = useState(null);
//   const [selectedbillFrom, setSelectedFrom] = useState(null);

//   const pageSize = 10;

//   // Handle Page CHange
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   return (
//     <Layout
//       module={true}
//       sidebarItems={LegislationSideBarItems}
//       centerlogohide={true}
//     >
//       <ToastContainer />
//       <Header
//         dashboardLink={"/lgms/dashboard"}
//         // addLink1={"/lgms/dashboard/bills/legislation-bills"}
//         title1={"All Government Bills"}
//       />
//       <div class="container-fluid">
//         <div>
//           <CustomTable
//             hidebtn1={false}
//             hideBtn={true}
//             addBtnText={"Government Bill (Introduced In Senate)"}
//             handleAdd={handleGovernmentBill}
//             tableTitle={"Government Bills Data (Introduced In Senate)"}
//             data={governmentSenateBill}
//             ActionHide={false}
//             hideDeleteIcon={true}
//             hideEditIcon={false}
//             singleDataCard={true}
//             headertitlebgColor={"#666"}
//             headertitletextColor={"#FFF"}
//             handlePageChange={handlePageChange}
//             currentPage={currentPage}
//             pageSize={pageSize}
//             totalCount={count}
//             handleEdit={(item) => {
//               item?.billFrom === "From Senate"
//                 ? handleEditSenateBill(item?.id, item)
//                 : handleEditNABill(item?.id, item);
//             }}
//             // handleDelete={(item) => handleDeleteLegislationBill(item?.id)}
//           />
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default IntroducedInSenate;

import React, { useEffect, useState } from "react";
import CustomTable from "../../CustomComponents/CustomTable";
import BillAttachedDocsModal from "../../BillAttachedDocsModal";

const IntroducedInSenate = ({
  addBtnText,
  handleAdd,
  tableTitle,
  data,
  remarksAttachmentVal,
  handleEdit,
  handlePageChange,
  currentPage,
  pageSize,
  totalCount,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [attachDocs, setAttachDocs] = useState([]);
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const handleViewAttach = (item) => {
    setAttachDocs(item?.billDocuments);
    openModal();
  };
  return (
    <div>
      {showModal && showModal && (
        <BillAttachedDocsModal
          showModal={showModal}
          AttachDocsData={attachDocs}
          closeModal={closeModal}
        />
      )}
      <CustomTable
        hidebtn1={false}
        hideBtn={true}
        addBtnText={addBtnText}
        handleAdd={handleAdd}
        tableTitle={tableTitle}
        data={data}
        ActionHide={false}
        hideDeleteIcon={true}
        hideEditIcon={false}
        singleDataCard={true}
        headertitlebgColor={"#666"}
        headertitletextColor={"#FFF"}
        handlePageChange={handlePageChange}
        currentPage={currentPage}
        pageSize={pageSize}
        totalCount={totalCount}
        handleEdit={handleEdit}
        isRemarksAttachhments={remarksAttachmentVal}
        handleViewAttachment={(item) => {
          handleViewAttach(item);
        }}
      />
    </div>
  );
};

export default IntroducedInSenate;
