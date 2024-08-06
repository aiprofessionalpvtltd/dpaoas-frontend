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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const transformPrivateMemberBillSenate = (apiData) => {
    return apiData?.map((item) => ({
      id: item.id,
      fileNumber: item?.fileNumber,
      billTitle: item?.billTitle,
      dateOfPresentationReport: item?.introducedInHouses?.reportPresentationDate
        ? moment(
            item?.introducedInHouses?.reportPresentationDate,
            "YYYY-MM-DD"
          ).format("DD-MM-YYYY")
        : "---",
      billCategory: item?.billCategory,
      billFrom: item?.billFrom,
      remarks: item?.billRemarks,
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
    navigate("/lgms/dashboard/bills/selectbillfrom", {
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
