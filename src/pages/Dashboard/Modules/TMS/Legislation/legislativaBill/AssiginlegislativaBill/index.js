import React, { useState, useCallback, useEffect } from "react";
import { Layout } from "../../../../../../../components/Layout";
import {
  TMSsidebarItems,
  TMSsidebarItemsDirector,
} from "../../../../../../../utils/sideBarItems";
import CustomTable from "../../../../../../../components/CustomComponents/CustomTable";
import {
  getAllQuestion,
  getAllQuestionByID,
} from "../../../../../../../api/APIs/Services/Question.service";
import moment from "moment";
import { getUserData } from "../../../../../../../api/Auth";
import {  getAllLegislativBillRemarksByUserId, } from "../../../../../../../api/APIs/Services/translation.service";
import { useNavigate } from "react-router-dom";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";
import { getResolutionBYID, getResolutionRemarksByUserId } from "../../../../../../../api/APIs/Services/Resolution.service";

const TMSAssignedlegislativaBill = () => {
   const [governmentSenateBill, setGovernmantSenateBill] = useState([]);
     const [currentPage, setCurrentPage] = useState(0);
     const [count, setCount] = useState(null);
     const [assiginTableData, setAssiginTableData] = useState([]);
     const userData = getUserData();
     const pageSize = 10;
     const navigate = useNavigate();
     //TransferData
     const transformAssiginedFinanceBillData = (apiData) => {
       return apiData?.map((item, index) => ({
         SNo: index + 1,
         id: item.id,
         // internalId: item?.id,
         fileNumber: item?.fileNumber,
         billTitle: item?.billTitle,
         nameOfMinistersOrMovers:
           item?.senateBillMnaMovers?.[0]?.mna?.mnaName ||
           item?.senateBillSenatorMovers
             ?.map((mover) => mover?.member?.memberName)
             .join(", ") ||
           "",
         dateOfReceiptOfNotice: item?.noticeDate
           ? moment(item?.noticeDate, "YYYY-MM-DD").format("DD-MM-YYYY")
           : "---",
         dateOfIntroductionReferenceToStandingCommittee: item?.introducedInHouses
           ?.introducedInHouseDate
           ? moment(
               item?.introducedInHouses?.introducedInHouseDate,
               "YYYY-MM-DD"
             ).format("DD-MM-YYYY")
           : "---",
   
         dateOfPresentationOfTheReport: item?.introducedInHouses
           ?.reportPresentationDate
           ? moment(
               item?.introducedInHouses?.reportPresentationDate,
               "YYYY-MM-DD"
             ).format("DD-MM-YYYY")
           : "---",
         dateOfConsiderationOfTheBillBySenate: item?.memberPassages
           ?.dateOfConsiderationBill
           ? moment(
               item?.memberPassages?.dateOfConsiderationBill,
               "YYYY-MM-DD"
             ).format("DD-MM-YYYY")
           : "---",
         dateOnWhichTheBillByTheSenate: item?.dateOfPassageBySenate
           ? moment(item?.dateOfPassageBySenate, "YYYY-MM-DD").format("DD-MM-YYYY")
           : "---",
         dateOnWhichTheBillTransmittedToNA: item?.dateOfTransmissionToNA
           ? moment(item?.dateOfTransmissionToNA, "YYYY-MM-DD").format(
               "DD-MM-YYYY"
             )
           : "---",
         billCategory: item?.billCategory,
         billFrom: item?.billFrom,
         remarks: item?.billRemarks,
         billDocuments: item?.billDocumentsLegis,
       }));
     };
     
     const getAllAssignedFinanceBillSenate = useCallback(async () => {
       const userId = userData?.fkUserId;
       const category = "LegislativeBill_FromNotice";
       try {
         const response = await getAllLegislativBillRemarksByUserId(
           userId,
           category,
           currentPage,
           pageSize
         );
         if (response?.success) {
           const transformedData = transformAssiginedFinanceBillData(
             response?.data
           );

           console.log("transformedDatatransformedData", transformedData)
           setAssiginTableData(transformedData);
           setCount(response?.data?.count);
           showSuccessMessage(response?.message);
         }
       } catch (error) {
         console.log(error);
       }
     }, [currentPage, pageSize, setCount, setAssiginTableData]);
   
     useEffect(() => {
       getAllAssignedFinanceBillSenate();
     }, []);
   
     const handlePageChange = (page) => {
       setCurrentPage(page);
     };
   
     // HandleEdit
     const handleEdit = async (item) => {
       navigate(
         "/tms/legislativa-bill/legislativa-bill-translation",
         {
           state: item,
         }
       );
     };

  return (
    <Layout
      sidebarItems={
        userData?.designation?.designationName === "Assistant Director"
          ? TMSsidebarItemsDirector
          : TMSsidebarItems
      }
      module={true}
      centerlogohide={true}
    >
      <ToastContainer />
      <div>
        <div class="container-fluid">
          <div class="card mt-1">
            <div
              class="card-header red-bg"
              style={{ background: "#14ae5c !important" }}
            >
              <h1>Assigned Legislative Bill List</h1>
            </div>
            <div class="card-body">
              <div class="container-fluid">
                <div
                  class="dash-detail-container"
                  style={{ marginTop: "20px" }}
                >
                 <CustomTable
                    hideBtn={true}
                    hidebtn1={true}
                    data={assiginTableData}
                    tableTitle="Assiged Legislative Bill"
                    handlePageChange={handlePageChange}
                    currentPage={currentPage}
                    totalCount={count}
                    pageSize={pageSize}
                    headertitlebgColor={"#666"}
                    headertitletextColor={"#FFF"}
                    showPrint={false}
                    hideEditIcon={false}
                    hideDeleteIcon={true}
                    // handleAdd={(item) => navigate("/")}
                    handleEdit={(item) => handleEdit(item)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TMSAssignedlegislativaBill;
