import { useCallback, useEffect, useState } from "react";
import Header from "../../../../../../components/Header";
import { Layout } from "../../../../../../components/Layout";
import { LegislationSideBarItems } from "../../../../../../utils/sideBarItems";
import {
  DeleteLegislationBill,
  getAllLegislationBills,
} from "../../../../../../api/APIs/Services/LegislationModule.service";
import { ToastContainer } from "react-toastify";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";

const AllLegislationBillList = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedOption, setSelectedOption] = useState("All");
  const [legislationBillData, setLegislationBillData] = useState([]);
  const [senateBillData, setSenateBillData] = useState([]);
  const [NABillData, setNABillData] = useState([]);
  const [count, setCount] = useState(null);
  const pageSize = 3;

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
    // setTimeout(() => {
      getBills(page, selectedOption)
    // }, 1000);
  };
  const transformAllBillData = (apiData) => {
    return apiData?.map((item) => ({
      id: item.id,
      parliamentaryYear: item?.parliamentaryYears?.parliamentaryTenure,
      session: item?.sessions?.sessionName,
      billType: item.billType,
      billCategory: item.billCategory,
      fileNumber: item?.fileNumber,
      billFrom: item?.billFrom,
      concerndCommittes: item?.introducedInHouses?.manageCommittees
        ?.committeeName
        ? item?.introducedInHouses?.manageCommittees?.committeeName
        : "---",
      billStatus: item?.billStatuses?.billStatusName,
      Status: item.billStatus,
    }));
  };
  //   Transform Senate Bill Data
  const transformSenateBillData = (apiData) => {
    console.log("SenateBill Data", apiData);
    return apiData?.map((item) => ({
      id: item.id,
      parliamentaryYear: item?.parliamentaryYears?.parliamentaryTenure,
      session: item?.sessions?.sessionName,
      billType: item.billType,
      billFrom: item?.billFrom,
      billCategory: item.billCategory,
      fileNumber: item?.fileNumber,
      noticeDate: item?.noticeDate
        ? moment(item?.noticeDate).format("DD-MM-YYYY")
        : "---",

      concerndCommittes: item?.introducedInHouses?.manageCommittees
        ?.committeeName
        ? item?.introducedInHouses?.manageCommittees?.committeeName
        : "---",
      billStatus: item?.billStatuses?.billStatusName,
      Status: item.billStatus,
    }));
  };
  // Transform National Bill Data
  const transformNABillData = (apiData) => {
    return apiData?.map((item) => ({
      id: item.id,
      parliamentaryYear: item?.parliamentaryYears?.parliamentaryTenure,
      session: item?.sessions?.sessionName,
      billType: item.billType,
      billFrom: item?.billFrom,
      billCategory: item.billCategory,
      fileNumber: item?.fileNumber,

      dateOfReceiptOfMessageFromNa: item?.DateOfReceiptOfMessageFromNA
        ? moment(item?.DateOfReceiptOfMessageFromNA).format("DD-MM-YYYY")
        : "---",
      dateOfPassageBySenate: item?.dateOfPassageBySenate
        ? moment(item?.dateOfPassageBySenate).format("DD-MM-YYYY")
        : "---",
      passedByNA: item?.PassedByNADate
        ? moment(item?.PassedByNADate).format("DD-MM-YYYY")
        : "---",
      concerndCommittes: item?.introducedInHouses?.manageCommittees
        ?.committeeName
        ? item?.introducedInHouses?.manageCommittees?.committeeName
        : "---",
      billStatus: item?.billStatuses?.billStatusName,
      Status: item.billStatus,
    }));
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setCurrentPage(0)
    const page = 0
    getBills(page,event.target?.value);

    if (event.target.value === "All") {
      getBills(page);
    } else {
      getBills(page,event.target.value);
    }
  };

  const getBills = useCallback(
    async (page,option) => {
      let searchParams = {}; // Default empty object

      if (option === "From Senate") {
        searchParams = {
          billFrom: "From Senate",
        };
      } else if (option === "From NA") {
        searchParams = {
          billFrom: "From NA",
        };
      }
      const response = await getAllLegislationBills(
        page,
        pageSize,
        searchParams
      );
      if (response?.success) {
        setCount(response?.data?.count);
        const ALL_BILLS_DATA = response?.data?.senateBills;
        const trnasformAllData = transformAllBillData(ALL_BILLS_DATA);
        setLegislationBillData(trnasformAllData);
        const senateBills = await ALL_BILLS_DATA?.filter(
          (bill) => bill?.billFrom === "From Senate"
        );
        const senateData = transformSenateBillData(senateBills);
        setSenateBillData(senateData);

        const naBills = await ALL_BILLS_DATA?.filter(
          (bill) => bill?.billFrom === "From NA"
        );
        const NAData = transformNABillData(naBills);
        setNABillData(NAData);
      }
    },
    [count, setCount, pageSize, currentPage]
  );

 

  useEffect(() => {
    
    getBills(currentPage);
  }, []);

  const handleAddSenateBills = () => {
    navigate("/lgms/dashboard/bills/senate-bills");
  };
  const handleAddNaBills = () => {
    navigate("/lgms/dashboard/bills/NA-bills");
  };
  const handleEditSenateBill = (id) => {
    navigate("/lgms/dashboard/bills/edit/senate-bills", { state: id });
  };
  const handleEditNABill = (id) => {
    navigate("/lgms/dashboard/bills/edit/NA-bills/", { state: id });
  };

  // Handle Delete Bills
  const handleDeleteLegislationBill = async (id) => {
    try {
      const resposne = await DeleteLegislationBill(id);
      if (resposne?.success) {
        showSuccessMessage(resposne?.message);
        getBills(currentPage, selectedOption);
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
        title1={"All Legislation Bills"}
      />
      <div class="container-fluid">
        <div className="col-3 ms-2 mt-4 mb-4">
          <label htmlFor="SelectBillFrom">Select Bill From:</label>
          <select
            className="form-select col-2"
            value={selectedOption}
            onChange={handleOptionChange}
            id="SelectBillFrom"
          >
            <option value="" selected disabled hidden>
              Select
            </option>
            <option value="All">All Bills Data</option>
            <option value="From Senate">Introduced In Senate</option>
            <option value="From NA">Received From NA</option>
          </select>
        </div>
        <div>
          <CustomTable
            // hidebtn1={selectedOption === "All" ? true : false}
            hidebtn1={false}
            hideBtn={selectedOption === "All" ? false : true}
            addBtnText2="Create National Assembly Bill"
            addBtnText={
              selectedOption === "All"
                ? "Create Senate Bill"
                : selectedOption === "From Senate"
                  ? "Create Senate Bill"
                  : selectedOption === "From NA"
                    ? "Create National Assembly Bill"
                    : ""
            }
            handleAdd={
              selectedOption === "All"
                ? handleAddSenateBills
                : selectedOption === "From Senate"
                  ? handleAddSenateBills
                  : selectedOption === "From NA"
                    ? handleAddNaBills
                    : null
            }
            handleAdd2={handleAddNaBills}
            tableTitle={
              selectedOption === "All"
                ? "All Bills Data"
                : selectedOption === "From Senate"
                  ? "Senate Bills Data"
                  : "National Assembly Bills"
            }
            data={
              selectedOption === "All"
                ? legislationBillData
                : selectedOption === "From Senate"
                  ? senateBillData
                  : selectedOption === "From NA"
                    ? NABillData
                    : "No Data"
            }
            ActionHide={false}
            hideDeleteIcon={false}
            hideEditIcon={false}
            singleDataCard={true}
            headertitlebgColor={"#666"}
            headertitletextColor={"#FFF"}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            pageSize={pageSize}
            totalCount={count}
            handleEdit={(item) => {
              item?.billFrom === "From Senate"
                ? handleEditSenateBill(item?.id)
                : handleEditNABill(item?.id);
            }}
            handleDelete={(item) => handleDeleteLegislationBill(item?.id)}
          />
        </div>
      </div>
    </Layout>
  );
};

export default AllLegislationBillList;
