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
  const [selectedOption, setSelectedOption] = useState("");
  const [legislationBillData, setLegislationBillData] = useState([]);
  const [senateBillData, setSenateBillData] = useState([]);
  const [NABillData, setNABillData] = useState([]);
  const [count, setCount] = useState(null);
  const pageSize = 4;

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };
  const transformAllBillData = (apiData) => {
    return apiData.map((item) => ({
      id: item.id,
      parliamentaryYear: item?.parliamentaryYears?.parliamentaryTenure,
      session: item?.sessions?.sessionName,
      billType: item.billType,
      billCategory: item.billCategory,
      fileNumber: item?.fileNumber,
      billFrom: item?.billFrom,
      dateOfPassageBySenate: item?.dateOfPassageBySenate
        ? moment(item?.dateOfPassageBySenate).format("DD-MM-YYYY")
        : "---",
      billStatus: item.billStatus,
    }));
  };
  //   Transform Senate Bill Data
  const transformSenateBillData = (apiData) => {
    return apiData.map((item) => ({
      id: item.id,
      parliamentaryYear: item?.parliamentaryYears?.parliamentaryTenure,
      session: item?.sessions?.sessionName,
      billType: item.billType,
      billCategory: item.billCategory,
      fileNumber: item?.fileNumber,
      noticeDate: item?.noticeDate
        ? moment(item?.noticeDate).format("DD-MM-YYYY")
        : "---",
      dateOfPassageBySenate: item?.dateOfPassageBySenate
        ? moment(item?.dateOfPassageBySenate).format("DD-MM-YYYY")
        : "---",
      billStatus: item.billStatus,
    }));
  };
  // Transform National Bill Data
  const transformNABillData = (apiData) => {
    return apiData.map((item) => ({
      id: item.id,
      parliamentaryYear: item?.parliamentaryYears?.parliamentaryTenure,
      session: item?.sessions?.sessionName,
      billType: item.billType,
      billCategory: item.billCategory,
      fileNumber: item?.fileNumber,

      dateOfReceiptOfMessageFromNa: item?.DateOfReceiptOfMessageFromNA
        ? moment(item?.DateOfReceiptOfMessageFromNA).format("DD-MM-YYYY")
        : "---",
      passedByNA: item?.PassedByNADate
        ? moment(item?.PassedByNADate).format("DD-MM-YYYY")
        : "---",
      billStatus: item.billStatus,
    }));
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);

    if (event.target.value === "All Bills") {
      getBills();
    } else {
      getBills(event.target.value);
    }
  };

  const getBills = useCallback(
    async (option) => {
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
        currentPage,
        pageSize,
        searchParams
      );
      if (response?.success) {
        console.log(response?.data);
        setCount(response?.data?.count);
        const ALL_BILLS_DATA = response?.data?.senateBills;
        const trnasformAllData = transformAllBillData(ALL_BILLS_DATA);
        setLegislationBillData(trnasformAllData);
        const senateBills = await ALL_BILLS_DATA.filter(
          (bill) => bill?.billFrom === "From Senate"
        );
        const senateData = transformSenateBillData(senateBills);
        setSenateBillData(senateData);

        const naBills = await ALL_BILLS_DATA.filter(
          (bill) => bill?.billFrom === "From NA"
        );
        const NAData = transformNABillData(naBills);
        setNABillData(NAData);
      }
    },
    [count, setCount, pageSize, currentPage]
  );

  useEffect(() => {
    getBills();
  }, [currentPage]);

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
        getBills();
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
            <option value="All Bills">All Bills Data</option>
            <option value="From Senate">From Senate</option>
            <option value="From NA">From National Assembly</option>
          </select>
        </div>
        <div>
          <CustomTable
            hidebtn1={selectedOption === "" ? true : false}
            addBtnText={
              selectedOption === "From Senate"
                ? "Create Senate Bill"
                : "Create National Assembly Bill"
            }
            tableTitle={
              selectedOption === ""
                ? "All Bills Data"
                : selectedOption === "From Senate"
                  ? "Senate Bills Data"
                  : "National Assembly Bills"
            }
            data={
              selectedOption === ""
                ? legislationBillData
                : selectedOption === "All Bills"
                  ? legislationBillData
                  : selectedOption === "From Senate"
                    ? senateBillData
                    : NABillData
            }
            // data={[]}
            hideBtn={true}
            singleDataCard={true}
            headertitlebgColor={"#666"}
            headertitletextColor={"#FFF"}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            pageSize={pageSize}
            totalCount={count}
            handleAdd={
              selectedOption === "From Senate"
                ? handleAddSenateBills
                : handleAddNaBills
            }
            handleEdit={
              selectedOption === "From Senate"
                ? (item) => handleEditSenateBill(item?.id)
                : (item) => handleEditNABill(item?.id)
            }
            handleDelete={(item) => handleDeleteLegislationBill(item?.id)}
          />
        </div>
      </div>
    </Layout>
  );
};

export default AllLegislationBillList;
