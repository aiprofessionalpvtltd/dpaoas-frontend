import { useCallback, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CustomTable from "../../../../../components/CustomComponents/CustomTable";

import moment from "moment";
import { getAllGovernmentSenateBills, listFinanceMoneyBil } from "../../../../../api/APIs/Services/LegislationModule.service";
import { Layout } from "../../../../../components/Layout";
import Header from "../../../../../components/Header";
import { LegislationSideBarItems } from "../../../../../utils/sideBarItems";
import { showErrorMessage } from "../../../../../utils/ToastAlert";

const AllFinanceMoneyBill = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [governmentSenateBill, setGovernmantSenateBill] = useState([]);
  const [count, setCount] = useState(null);
  const [selectedbillFrom, setSelectedFrom] = useState(null);
  const [remarksAttachmentVal, setRemarksAttachmentVal] = useState();

  const pageSize = 10;

  // Handle Page CHange
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Transform Government Bill Introduced In Senate Data
  const transformGovernmentSenateBillData = (apiData) => {
    const docs = apiData?.map((item) => item?.billDocuments);
    if (docs?.length > 0) {
      setRemarksAttachmentVal(true);
    } else {
      setRemarksAttachmentVal(false);
    }
    return apiData?.map((item, index) => ({
      SNo: index + 1,
      id: item.id,
      // internalId: item?.id,
      fileNumber: item?.fileNumber,
      billTitle: item?.billTitle,
      // nameOfMinisters: item?.senateBillSenatorMovers
      //   ? item?.senateBillSenatorMovers
      //       .map((mover) => mover?.mna?.mnaName)
      //       .join(", ")
      //   : "---",
      dateOnWhichBillWasPassedByNA: item?.PassedByNADate
        ? moment(item?.PassedByNADate, "YYYY-MM-DD").format("DD-MM-YYYY")
        : "---",
      dateOfReceiptOfMessageFromNA: item?.DateOfReceiptOfMessageFromNA
        ? moment(item?.DateOfReceiptOfMessageFromNA, "YYYY-MM-DD").format(
            "DD-MM-YYYY"
          )
        : "---",
      // dateOfReceiptOfNotice: item?.noticeDate
      //   ? moment(item?.noticeDate, "YYYY-MM-DD").format("DD-MM-YYYY")
      //   : "---",

      dateOfReferencetoStandingCommittee:
        item?.dateofReferencetoStandingCommittee
          ? moment(
              item?.dateofReferencetoStandingCommittee,
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
      dateOfConsiderationOfTheBillBySenate: item?.memberPassagesFinance
        ?.dateOfConsiderationBill
        ? moment(
            item?.memberPassagesFinance?.dateOfConsiderationBill,
            "YYYY-MM-DD"
          ).format("DD-MM-YYYY")
        : "---",
      dateOfPassingTheBillByTheSenate: item?.dateOfPassageBySenate
        ? moment(item?.dateOfPassageBySenate, "YYYY-MM-DD").format("DD-MM-YYYY")
        : "---",
      dateOfTransmissionOfMessageToNA: item?.dateOfTransmissionToNA
        ? moment(item?.dateOfTransmissionToNA, "YYYY-MM-DD").format(
            "DD-MM-YYYY"
          )
        : "---",
      dateOfAssentByThePresident: item?.dateOfAssentByThePresident
        ? moment(item?.dateOfAssentByThePresident, "YYYY-MM-DD").format(
            "DD-MM-YYYY"
          )
        : "---",
      dateOfPublishInTheGazette: item?.dateOfPublishInGazette
        ? moment(item?.dateOfPublishInGazette, "YYYY-MM-DD").format(
            "DD-MM-YYYY"
          )
        : "---",
      billCategory: item?.billCategory,
      billFrom: item?.billFrom,
      remarks: item?.billRemarks,
      billDocuments: item?.billDocuments,
    }));
  };

  // Handle API Call (Get All Government Bills Senate)
  const getGovernmentSenateBillApi = useCallback(async () => {
    const searchParams = {
      billCategory: "Government Bill",
      billFrom: "From NA",
    };

    try {
      const response = await listFinanceMoneyBil(
        currentPage,
        pageSize,
        searchParams
      );
      if (response?.success) {
        setCount(response?.data?.count);
        const governmentSenateBillData = response?.data?.senateBills;
        const transformAllGovernmentSenateBillData =
          transformGovernmentSenateBillData(governmentSenateBillData);
        setGovernmantSenateBill(transformAllGovernmentSenateBillData);
        // showSuccessMessage(response?.message)
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }

  }, [selectedbillFrom, currentPage, pageSize]);

  useEffect(() => {
    getGovernmentSenateBillApi();
  }, [getGovernmentSenateBillApi]);

  // // Create Government Bill
  // const handleGovernmentSenateBill = () => {
  //   navigate("/lgms/dashboard/bills/selectbillfrom", {
  //     state: { category: "Government Bill", billFrom: "From Senate" },
  //   });
  // };
  // Create Government Bill
 
  const handleAddFinanceMoneyBill = () => {
    navigate("/lgms/dashboard/bills/legislation-bills/finance-money-bill/add", {
      state: {
        category: "Government Bill",
        billFrom: "From NA",
        forPerson: "Ministers",
      },
    });
  };

  

  // Edit Bill Recieved From NA
  const handleEditNABill = (id,item) => {
    navigate("/lgms/dashboard/bills/legislation-bills/finance-money-bill/edit", { state: { id, item, forPerson: "Ministers" } });
  };

  return (
    <Layout
      module={true}
      sidebarItems={LegislationSideBarItems}
      centerlogohide={true}
    >
      <ToastContainer />
      <Header
        dashboardLink={"/lgms/dashboard"}
        addLink1={"/lgms/dashboard/bills"}
        title1={"All Finance/Money Bills"}
      />

      <div className="row">
        <div className="col-12">
          <CustomTable
            block={true}
            singleDataCard={true}
            data={governmentSenateBill}
            tableTitle="Finance/Money Bill Data"
            addBtnText={"Create New Finance/Money Bill"}
            headerBgColor={"#4B8FF0"}
            headerTitleColor={"#fff"}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            pageSize={pageSize}
            totalCount={count}
            hideDeleteIcon={true}
            handleAdd={() => {
              handleAddFinanceMoneyBill();
            }}
            handleEdit={(item) => {
              handleEditNABill(item.id, item);
            }}
            // handleDelete={() => {}}
          />
        </div>
      </div>
    </Layout>
  );
};

export default AllFinanceMoneyBill;
