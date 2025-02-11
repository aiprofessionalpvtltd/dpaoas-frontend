import React, { useState, useCallback, useEffect } from "react";
import { Layout } from "../../../../../../../components/Layout";
import {
  TMSsidebarItems,
  TMSsidebarItemsDirector,
} from "../../../../../../../utils/sideBarItems";
import CustomTable from "../../../../../../../components/CustomComponents/CustomTable";
import moment from "moment";
import { getUserData } from "../../../../../../../api/Auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  getResolutionBYID,
  getResolutionRemarksByUserId,
} from "../../../../../../../api/APIs/Services/Resolution.service";
import { showErrorMessage, showSuccessMessage } from "../../../../../../../utils/ToastAlert";
import { getAllGovernmentBillRemarksByUserId, getAllGovintroduceInSenateWithOutUserId } from "../../../../../../../api/APIs/Services/translation.service";
import { getAllGovernmentSenateBills } from "../../../../../../../api/APIs/Services/LegislationModule.service";

const TMSPMBRecivedFromNA = () => {
    const [governmentSenateBill, setGovernmantSenateBill] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [count, setCount] = useState(null);
    const [assiginTableData, setAssiginTableData] = useState([]);
    const userData = getUserData();
    const pageSize = 10;
    const navigate = useNavigate();
    const transformGovernmentSenateBillData = (apiData) => {
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
        billDocuments: item?.billDocuments,
      }));
    };
  
    //TransferData
    const transformAssiginedGovernmentSenateBillData = (apiData) => {
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
        billDocuments: item?.billDocuments,
      }));
    };
  
    const getGovernmentSenateBillApi = useCallback(async (allRemarks) => {
      try {
        const searchParams = {
          billCategory: "Private Member Bill",
          billFrom: "From NA",
          introducedBillSentStatus: "toTranslation",
        };
  
        const response = await getAllGovernmentSenateBills(
          currentPage,
          pageSize,
          searchParams
        );
  
        if (response?.success) {
          setCount(response?.data?.count);
          const governmentSenateBillData = response?.data?.senateBills;
          const transformAllGovernmentSenateBillData =
            transformGovernmentSenateBillData(governmentSenateBillData);
            let filteredArray;
              if (allRemarks?.length > 0) {
                filteredArray = transformAllGovernmentSenateBillData?.filter(
                  (item) => !allRemarks?.some((obj) => obj?.id === item?.id)
                );
                setGovernmantSenateBill(filteredArray);
              } else {
                setGovernmantSenateBill(transformAllGovernmentSenateBillData);
              }
          // showSuccessMessage(response?.message)
        } else {
          console.error("API Error:", response?.message);
          // Optionally, show an error message to the user
          // showErrorMessage(response?.message || "Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching government senate bills:", error);
        // Optionally, show an error message to the user
        showErrorMessage(
          error?.response?.data?.message ||
            "Something went wrong. Please try again later."
        );
      }
    }, [currentPage, pageSize]);
  
  
    const getRemoveAssignedGovintroduceInSenate = useCallback(async () => {
          const category = "PrivateBill_FromNA";
          try {
            const response = await getAllGovintroduceInSenateWithOutUserId(category, 0, 10000);
            if (response?.success) {
              const transformedData = transformGovernmentSenateBillData(response?.data);
              getGovernmentSenateBillApi(transformedData);
            }
          } catch (error) {
            console.log(error);
          }
        }, []);
  
    const getAllAssignedGovintroduceInSenate = useCallback(async () => {
      const userId = userData?.fkUserId;
      const category = "PrivateBill_FromNA";
      try {
        const response = await getAllGovernmentBillRemarksByUserId(
          userId,
          category,
          currentPage,
          pageSize
        );
        if (response?.success) {
          const transformedData = transformAssiginedGovernmentSenateBillData(
            response?.data
          );
          setCount(response?.data?.count);
          setAssiginTableData(transformedData);
          showSuccessMessage(response?.message);
        }
      } catch (error) {
        console.log(error);
      }
    }, [currentPage, pageSize, setCount, setAssiginTableData]);
  
    useEffect(() => {
      getRemoveAssignedGovintroduceInSenate()
      getAllAssignedGovintroduceInSenate();
    }, []);
  
    useEffect(() => {
      getGovernmentSenateBillApi();
    }, [currentPage]);
  
    const handlePageChange = (page) => {
      setCurrentPage(page);
    };
  
    // HandleEdit
    const handleEdit = async (item) => {
      navigate(
        "/tms/legislation/private-bill-translation/recived-from-na/edit",
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
            <div class="row">
              <div class="d-grid gap-2 d-md-flex justify-content-md-start">
                <button class="btn btn-primary mb-3" type="buttun" onClick={() => navigate(
                      "/tms/legislation/private-bill-translation/introduce-in-senate"
                    )}>
                  Introduce In Senate
                </button>
                <button
                  class="btn btn-primary mb-3"
                  type="button"
                  onClick={() =>
                    navigate(
                      "/tms/legislation/private-bill-translation/recived-from-na"
                    )
                  }
                >
                   Recieved From NA
                </button>
              </div>
            </div>
            <div class="card mt-1">
              <div
                class="card-header red-bg"
                style={{ background: "#14ae5c !important" }}
              >
                <h1>Recived From NA</h1>
              </div>
  
              <div class="card-body">
                <div class="container-fluid">

                    { userData?.designation?.designationName !== "Assistant Director" ? (
                        <div
                        class="dash-detail-container"
                        style={{ marginTop: "20px" }}
                      >
                        <CustomTable
                          hideBtn={true}
                          hidebtn1={true}
                          data={assiginTableData}
                          tableTitle="Assiged From NA Privat Bill"
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
                    ) : (
                        <>
                        <div
                    class="dash-detail-container"
                    style={{ marginTop: "20px" }}
                  >
                    <CustomTable
                      hideBtn={true}
                      hidebtn1={true}
                      data={governmentSenateBill}
                      tableTitle="Recived From NA Private Bill"
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
                  <div
                    class="dash-detail-container"
                    style={{ marginTop: "20px" }}
                  >
                    <CustomTable
                      hideBtn={true}
                      hidebtn1={true}
                      data={assiginTableData}
                      tableTitle="Assiged From NA Private Bill"
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
                  </>
                    )
                       }
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  };

export default TMSPMBRecivedFromNA;
