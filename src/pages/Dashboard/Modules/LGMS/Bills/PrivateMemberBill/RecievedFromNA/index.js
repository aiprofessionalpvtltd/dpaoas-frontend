import { useCallback, useEffect, useState } from "react";
// import Header from "../../../../../../../components/Header";
import Header from "../../../../../../../components/Header";
import { LegislationSideBarItems } from "../../../../../../../utils/sideBarItems";
import {
  getAllGovernmentNABills,
  getAllGovernmentSenateBills,
  getAllPrivateMemberNABills,
} from "../../../../../../../api/APIs/Services/LegislationModule.service";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import RecievedFromNA from "../../../../../../../components/LegislationBills/RecievedFromNA";
import { Layout } from "../../../../../../../components/Layout";

const AllPrivateMemberBillFromNA = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [privateMemberNABill, setPrivateMemberNABill] = useState([]);
  const [count, setCount] = useState(null);
  const [selectedbillFrom, setSelectedFrom] = useState(null);

  const pageSize = 10;

  // Handle Page CHange
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Transform Government Bill Data
  const transformPrivateNABillData = (apiData) => {
    return apiData?.map((item) => ({
      id: item.id,
      // internalId: item?.id,
      fileNumber: item?.fileNumber,
      billTitle: item?.billTitle,
      // nameOfMinisters: item?.senateBillSenatorMovers
      //   ? item?.senateBillSenatorMovers
      //       .map((mover) => mover?.mna?.mnaName)
      //       .join(", ")
      //   : "---",
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
      dateOfPassingTheBillByTheSenate: item?.dateOfPassageBySenate
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
    }));
  };

  // Handle API Call (Get All Government Bills Recieved From NA)
  const getGovernmentNABillApi = useCallback(async () => {
    const searchParams = {
      billCategory: "Private Member Bill",
      billFrom: "From NA",
    };

    const response = await getAllPrivateMemberNABills(
      currentPage,
      pageSize,
      searchParams
    );
    if (response?.success) {
      setCount(response?.data?.count);
      const privateMemberNABillData = response?.data?.senateBills;
      const transformAllPrivateNABillData = transformPrivateNABillData(
        privateMemberNABillData
      );
      setPrivateMemberNABill(transformAllPrivateNABillData);
      // showSuccessMessage(response?.message)
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
  const handlePrivateNABill = () => {
    navigate("/lgms/dashboard/bills/NA-bills", {
      state: { category: "Private Member Bill", billFrom: "From NA" },
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
    navigate("/lgms/dashboard/bills/edit/NA-bills/", { state: { id, item } });
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
        title1={"All Private Member Bills"}
      />
      <div class="container-fluid">
        <RecievedFromNA
          addBtnText={"Private Member Bill (Recieved From NA)"}
          handleAdd={handlePrivateNABill}
          tableTitle={"Private Member Bill Data (Recieved From NA)"}
          data={privateMemberNABill}
          handleEdit={(item) => {
            item?.billFrom === "From Senate"
              ? handleEditSenateBill(item?.id, item)
              : handleEditNABill(item?.id, item);
          }}
          handlePageChange={handlePageChange}
          currentPage={currentPage}
          pageSize={pageSize}
          totalCount={count}
        />
      </div>
    </Layout>
  );
};

export default AllPrivateMemberBillFromNA;
