import { useCallback, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import IntroducedInSenate from "../../../../../../../components/LegislationBills/IntroducedInSenate";
import { LegislationSideBarItems } from "../../../../../../../utils/sideBarItems";
import { Layout } from "../../../../../../../components/Layout";
import Header from "../../../../../../../components/Header";
import { getAllGovernmentSenateBills } from "../../../../../../../api/APIs/Services/LegislationModule.service";

const AllGovernmentSenateBills = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [governmentSenateBill, setGovernmantSenateBill] = useState([]);
  const [count, setCount] = useState(null);
  const [selectedbillFrom, setSelectedFrom] = useState(null);

  const pageSize = 10;

  // Handle Page CHange
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Transform Government Bill Data
  const transformGovernmentSenateBillData = (apiData) => {
    console.log("Government Bill", apiData);
    return apiData?.map((item, index) => ({
      SNo: index + 1,
      id: item.id,
      // internalId: item?.id,
      fileNumber: item?.fileNumber,
      billTitle: item?.billTitle,
      nameOfMinisters: item?.senateBillMnaMovers?.[0]?.mna?.mnaName || "---",
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
      billDocuments: item?.billDocuments,
    }));
  };

  // Handle API Call (Get All Government Bills Senate)
  const getGovernmentSenateBillApi = useCallback(async () => {
    const searchParams = {
      billCategory: "Government Bill",
      billFrom: "From Senate",
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
      setGovernmantSenateBill(transformAllGovernmentSenateBillData);
      // showSuccessMessage(response?.message)
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
  const handleGovernmentSenateBill = () => {
    navigate("/lgms/dashboard/bills/senate-bills", {
      state: { category: "Government Bill", billFrom: "From Senate" },
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
        title1={"All Government Bills"}
      />

      <div class="container-fluid">
        <IntroducedInSenate
          addBtnText={"Government Bill (Introduced In Senate)"}
          handleAdd={handleGovernmentSenateBill}
          tableTitle={"Government Bills Data (Introduced In Senate)"}
          data={governmentSenateBill}
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

export default AllGovernmentSenateBills;
