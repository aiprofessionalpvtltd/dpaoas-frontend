import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import IntroducedInSenate from "../../../../../../../components/LegislationBills/IntroducedInSenate";
import { Layout } from "../../../../../../../components/Layout";
import { LegislationSideBarItems } from "../../../../../../../utils/sideBarItems";
import { ToastContainer } from "react-toastify";
import {
  DeleteLegislationBill,
  getAllPrivateMemberSenateBills,
} from "../../../../../../../api/APIs/Services/LegislationModule.service";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../../utils/ToastAlert";
import Header from "../../../../../../../components/Header";

const AllPrivateMemberSenateBills = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [privateMemberSenateBill, setPrivateMemberSenateBill] = useState([]);
  const [count, setCount] = useState(null);
  const pageSize = 10;
  const [selectedbillFrom, setSelectedFrom] = useState(null);
  const [remarksAttachmentVal, setRemarksAttachmentVal] = useState();
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const transformPrivateMemberBillSenate = (apiData) => {
    const docs = apiData?.map((item) => item?.billDocuments);
    if (docs?.length > 0) {
      setRemarksAttachmentVal(true);
    } else {
      setRemarksAttachmentVal(false);
    }
    return apiData?.map((item, index) => ({
      SNo: index + 1,
      id: item.id,
      fileNumber: item?.fileNumber,
      TitleOfTheBill: item?.billTitle,
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

  // Get Private Member Bills
  const getPrivateMemberBills = useCallback(async () => {
    const searchParams = {
      billCategory: "Private Member Bill",
      billFrom: "From Senate",
    };

    const response = await getAllPrivateMemberSenateBills(
      currentPage,
      pageSize,
      searchParams
    );
    if (response?.success) {
      setCount(response?.data?.count);
      const privateMemberSenateBillData = response?.data?.senateBills;
      const trnasformAllData = transformPrivateMemberBillSenate(
        privateMemberSenateBillData
      );
      setPrivateMemberSenateBill(trnasformAllData);
    }
  }, [selectedbillFrom, currentPage, pageSize]);

  useEffect(() => {
    getPrivateMemberBills();
  }, [getPrivateMemberBills]);

  // Handle BillFrom Change
  const handleBillFromChange = (event) => {
    const selectedValue = event.target.value;
    setCurrentPage(0);
    setSelectedFrom(selectedValue);
  };

  // Handle Filter
  const handleClick = () => {
    setSelectedFrom("");
    getPrivateMemberBills();
  };

  const handlePrivateMemberSenateBill = () => {
    navigate("/lgms/dashboard/bills/senate-bills", {
      state: { category: "Private Member Bill", billFrom: "From NA" },
    });
  };

  // Handle Edit Senate Bills
  const handleEditSenateBill = (id, item) => {
    navigate("/lgms/dashboard/bills/edit/senate-bills", {
      state: { id, item },
    });
  };

  // Handle Edit NA Bills
  const handleEditNABill = (id, item) => {
    navigate("/lgms/dashboard/bills/edit/NA-bills/", { state: { id, item } });
  };

  // Handle Delete Bills
  const handleDeleteLegislationBill = async (id) => {
    try {
      const resposne = await DeleteLegislationBill(id);
      if (resposne?.success) {
        showSuccessMessage(resposne?.message);
        getPrivateMemberBills(currentPage, pageSize);
      }
    } catch (error) {
      showErrorMessage(error?.message);
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
        title1={"All Private Member Bills"}
      />
      <div class="container-fluid">
        <IntroducedInSenate
          addBtnText={"Private Member Bill (Introduced In Senate)"}
          handleAdd={handlePrivateMemberSenateBill}
          tableTitle={"Private Member Bill Data (Introduced In Senate)"}
          data={privateMemberSenateBill}
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
        />
      </div>
    </Layout>
  );
};

export default AllPrivateMemberSenateBills;
