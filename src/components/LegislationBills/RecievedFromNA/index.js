import React from "react";
import CustomTable from "../../CustomComponents/CustomTable";

const RecievedFromNA = ({
  addBtnText,
  handleAdd,
  tableTitle,
  data,
  handleEdit,
  handlePageChange,
  currentPage,
  pageSize,
  totalCount,
}) => {
  return (
    <div>
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
      />
    </div>
  );
};

export default RecievedFromNA;
