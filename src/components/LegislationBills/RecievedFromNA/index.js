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
  iscolumnCheckbox,
  isColumncheck,
  setIsColumnCheckBox,
  showSent,
  handleSent,
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

  console.log("isColumncheckBox", iscolumnCheckbox);

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
          headerBgColor={"#4B8FF0"}
          headerTitleColor={"#fff"}
          handlePageChange={handlePageChange}
          currentPage={currentPage}
          pageSize={pageSize}
          totalCount={totalCount}
          handleEdit={handleEdit}
          isRemarksAttachhments={remarksAttachmentVal}
          handleViewAttachment={(item) => {
            handleViewAttach(item);
          }}
          iscolumnCheckbox={iscolumnCheckbox}
          isColumncheck={isColumncheck}
          setIsColumnCheckBox={setIsColumnCheckBox}
          showSent={showSent}
          handleSent={handleSent}
        />
      </div>
    </>
  );
};

export default RecievedFromNA;
