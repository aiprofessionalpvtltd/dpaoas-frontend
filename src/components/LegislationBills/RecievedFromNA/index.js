import React, { useEffect, useState } from "react";
import CustomTable from "../../CustomComponents/CustomTable";
import BillAttachedDocsModal from "../../BillAttachedDocsModal";

const RecievedFromNA = ({
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
  hideTableTopButton,
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
    <>
      {showModal && showModal && (
        <BillAttachedDocsModal
          showModal={showModal}
          AttachDocsData={attachDocs}
          closeModal={closeModal}
        />
      )}

      <div>
        <CustomTable
          block={true}
          hidebtn1={hideTableTopButton ? true : false}
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
    </>
  );
};

export default RecievedFromNA;
