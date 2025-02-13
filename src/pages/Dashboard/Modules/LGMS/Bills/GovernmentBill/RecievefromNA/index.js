import { useCallback, useEffect, useState } from "react";
import Header from "../../../../../../../components/Header";
import { LegislationSideBarItems } from "../../../../../../../utils/sideBarItems";
import {
  getAllGovernmentNABills,
  SendLegislationBillsToTransaltion,
} from "../../../../../../../api/APIs/Services/LegislationModule.service";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import RecievedFromNA from "../../../../../../../components/LegislationBills/RecievedFromNA";
import { Layout } from "../../../../../../../components/Layout";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../../utils/ToastAlert";

const AllGovernmentRecievedNABills = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [governmentNABill, setGovernmantNABill] = useState([]);
  const [count, setCount] = useState(null);
  const [selectedbillFrom, setSelectedFrom] = useState(null);
  const [remarksAttachmentVal, setRemarksAttachmentVal] = useState();
  const [fileNumberToBeSend, setFileNumberToBeSend] = useState(null);
  const pageSize = 10;

  // Handle Page CHange
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Transform Government Bill Recieved From NA Data
  // const transformGovernmentSenateBillData = (apiData) => {
  //   const docs = apiData?.map((item) => item?.billDocuments);
  //   if (docs?.length > 0) {
  //     setRemarksAttachmentVal(true);
  //   } else {
  //     setRemarksAttachmentVal(false);
  //   }
  //   return apiData?.map((item, index) => ({

  //     SNo: index + 1,
  //     id: item.id,
  //     fileNumber: item?.fileNumber,
  //     // internalId: item?.id,
  //     // fileNumber: item?.fileNumber,
  //     billTitle: item?.billTitle,
  //     // nameOfMinisters: item?.senateBillSenatorMovers
  //     //   ? item?.senateBillSenatorMovers
  //     //       .map((mover) => mover?.mna?.mnaName)
  //     //       .join(", ")
  //     //   : "---",
  //     dateOnWhichBillWasPassedByNA: item?.PassedByNADate
  //       ? moment(item?.PassedByNADate, "YYYY-MM-DD").format("DD-MM-YYYY")
  //       : "---",
  //     dateOfReceiptOfMessageFromNA: item?.DateOfReceiptOfMessageFromNA
  //       ? moment(item?.DateOfReceiptOfMessageFromNA, "YYYY-MM-DD").format(
  //           "DD-MM-YYYY"
  //         )
  //       : "---",
  //     // dateOfReceiptOfNotice: item?.noticeDate
  //     //   ? moment(item?.noticeDate, "YYYY-MM-DD").format("DD-MM-YYYY")
  //     //   : "---",

  //     dateOfReferencetoStandingCommittee:
  //       item?.dateofReferencetoStandingCommittee
  //         ? moment(
  //             item?.dateofReferencetoStandingCommittee,
  //             "YYYY-MM-DD"
  //           ).format("DD-MM-YYYY")
  //         : "---",
  //     dateOfPresentationOfTheReport: item?.introducedInHouses
  //       ?.reportPresentationDate
  //       ? moment(
  //           item?.introducedInHouses?.reportPresentationDate,
  //           "YYYY-MM-DD"
  //         ).format("DD-MM-YYYY")
  //       : "---",
  //     dateOfConsiderationOfTheBillBySenate: item?.memberPassages
  //       ?.dateOfConsiderationBill
  //       ? moment(
  //           item?.memberPassages?.dateOfConsiderationBill,
  //           "YYYY-MM-DD"
  //         ).format("DD-MM-YYYY")
  //       : "---",
  //     dateOfPassingTheBillByTheSenate: item?.dateOfPassageBySenate
  //       ? moment(item?.dateOfPassageBySenate, "YYYY-MM-DD").format("DD-MM-YYYY")
  //       : "---",
  //     dateOfTransmissionOfMessageToNA: item?.dateOfTransmissionToNA
  //       ? moment(item?.dateOfTransmissionToNA, "YYYY-MM-DD").format(
  //           "DD-MM-YYYY"
  //         )
  //       : "---",
  //     dateOfAssentByThePresident: item?.dateOfAssentByThePresident
  //       ? moment(item?.dateOfAssentByThePresident, "YYYY-MM-DD").format(
  //           "DD-MM-YYYY"
  //         )
  //       : "---",
  //     dateOfPublishInTheGazette: item?.dateOfPublishInGazette
  //       ? moment(item?.dateOfPublishInGazette, "YYYY-MM-DD").format(
  //           "DD-MM-YYYY"
  //         )
  //       : "---",
  //     billCategory: item?.billCategory,
  //     billFrom: item?.billFrom,
  //     remarks: item?.billRemarks,
  //     billDocuments: item?.billDocuments,
  //   }));
  // };

  const transformGovernmentSenateBillData = (apiData) => {
    const docs = apiData?.map((item) => item?.billDocuments);
    if (docs?.length > 0) {
      setRemarksAttachmentVal(true);
    } else {
      setRemarksAttachmentVal(false);
    }

    return apiData?.map((item, index) => {
      // Extract year from fileNumber using regex
      const fileNumb = item?.fileNumber || "";
      const match = fileNumb.match(/\d{2}\/\(\d{2}\)\/(\d{4})-Legis/);
      const extractedYear = match ? match[1] : null;

      // Set the extracted year in state (if required)
      if (extractedYear) {
        setFileNumberToBeSend(extractedYear); // Ensure `setYearState` is defined in your component
      }

      return {
        SNo: index + 1,
        id: item.id,
        fileNumber: item?.fileNumber,
        billTitle: item?.billTitle,
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
        dateOfConsiderationOfTheBillBySenate: item?.memberPassages
          ?.dateOfConsiderationBill
          ? moment(
              item?.memberPassages?.dateOfConsiderationBill,
              "YYYY-MM-DD"
            ).format("DD-MM-YYYY")
          : "---",
        dateOfPassingTheBillByTheSenate: item?.dateOfPassageBySenate
          ? moment(item?.dateOfPassageBySenate, "YYYY-MM-DD").format(
              "DD-MM-YYYY"
            )
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
      };
    });
  };

  const getGovernmentNABillApi = useCallback(async () => {
    try {
      const searchParams = {
        billCategory: "Government Bill",
        billFrom: "From NA",
        introducedBillSentStatus: "inLegislation",
      };

      const response = await getAllGovernmentNABills(
        currentPage,
        pageSize,
        searchParams
      );

      if (response?.success) {
        setCount(response?.data?.count);
        const governmentNABillData = response?.data?.senateBills;
        const transformAllGovernmentNABillData =
          transformGovernmentSenateBillData(governmentNABillData);
        setGovernmantNABill(transformAllGovernmentNABillData);
        // showSuccessMessage(response?.message)
      } else {
        console.error("API Error:", response?.message);
        // Optionally show an error message to the user
        // showErrorMessage(response?.message || "Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching government NA bills:", error);
      // Optionally show an error message to the user
      showErrorMessage(
        error?.response?.data?.message ||
          "Something went wrong. Please try again later."
      );
    }
  }, [selectedbillFrom, currentPage, pageSize]);

  useEffect(() => {
    getGovernmentNABillApi();
  }, [getGovernmentNABillApi]);

  // Create Government Bill
  // const handleGovernmentBill = () => {
  //   navigate("/lgms/dashboard/bills/NA-bills", {
  //     state: { category: "Government Bill", billFrom: "From NA" },
  //   });
  // };
  const handleGovernmentNABill = () => {
    navigate("/lgms/dashboard/bills/NA-bills", {
      state: {
        category: "Government Bill",
        billFrom: "From NA",
        forPerson: "Ministers",
      },
    });
  };

  // Edit Bill Introduced in Senate
  const handleEditSenateBill = (id, item) => {
    navigate("/lgms/dashboard/bills/edit/senate-bills", {
      state: { id, item },
    });
  };

  // Edit Bill Recieved From NA
  const handleEditNABill = (id, item) => {
    navigate("/lgms/dashboard/bills/edit/NA-bills/", {
      state: { id, item, forPerson: "Ministers", Year: fileNumberToBeSend },
    });
  };

  const sendBilltoTranslation = async (id) => {
    try {
      const response = await SendLegislationBillsToTransaltion(id);
      if (response?.success) {
        showSuccessMessage(response.message);
        getGovernmentNABillApi();
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
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
        addLink1={"/lgms/dashboard/bills/legislation-bills"}
        title1={"All Government Bills"}
      />
      <div class="container-fluid">
        <RecievedFromNA
          addBtnText={"Create New Government Bill (Received From NA)"}
          handleAdd={handleGovernmentNABill}
          tableTitle={"Create New Government Bills Data (Received From NA)"}
          data={governmentNABill}
          remarksAttachmentVal={remarksAttachmentVal}
          handleEdit={(item) => {
            item?.billFrom === "From Senate"
              ? handleEditSenateBill(item?.id, item)
              : handleEditNABill(item?.id, item);
          }}
          handlePageChange={handlePageChange}
          currentPage={currentPage}
          pageSize={pageSize}
          totalCount={count}
          showSent={true}
          handleSent={(item) => sendBilltoTranslation(item?.id)}
        />
      </div>
    </Layout>
  );
};

export default AllGovernmentRecievedNABills;
