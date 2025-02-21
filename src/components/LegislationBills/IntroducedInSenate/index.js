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
  hideTableTopButton,
  iscolumnCheckbox,
  isColumncheck,
  setIsColumnCheckBox,
  showSent,
  handleSent,
  isCheckbox,
  isChecked,
  setIsChecked,
  block,
  hideEditIcon,
  ActionHide,
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
        block={block}
        hidebtn1={hideTableTopButton ? true : false}
        hideBtn={false}
        addBtnText={addBtnText}
        handleAdd={handleAdd}
        tableTitle={tableTitle}
        data={data}
        ActionHide={ActionHide}
        hideDeleteIcon={true}
        hideEditIcon={hideEditIcon}
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
        isCheckbox={isCheckbox}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
      />
    </div>
  );
};

export default IntroducedInSenate;
