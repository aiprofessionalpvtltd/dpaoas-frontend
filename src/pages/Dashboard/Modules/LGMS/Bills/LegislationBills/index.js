import { useCallback, useEffect, useState } from "react";
import Header from "../../../../../../components/Header";
import { Layout } from "../../../../../../components/Layout";
import { LegislationSideBarItems } from "../../../../../../utils/sideBarItems";
import {
  DeleteLegislationBill,
  getAllLegislationBills,
  mainSearchApi,
} from "../../../../../../api/APIs/Services/LegislationModule.service";
import { ToastContainer } from "react-toastify";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import { useNavigate } from "react-router-dom";
import { showErrorMessage, showSuccessMessage } from "../../../../../../utils/ToastAlert";
import moment from "moment";
const AllLegislationBill = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [legislationBillData, setLegislationBillData] = useState([]);
  const [count, setCount] = useState(null);
  const pageSize = 10;
  const [selectedbillFrom, setSelectedFrom] = useState(null);
  const [billCategory, setBillCategory] = useState(null);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const transformAllBillData = (apiData) => {
    console.log("Api Data", apiData);
    return apiData?.map((item) => ({
      id: item.id,
      billTitle: item?.billTitle,
      dateOfIntroductionInSenate: item?.introducedInHouses?.introducedInHouseDate
        ? moment(item?.introducedInHouses?.introducedInHouseDate).format("DD-MM-YYYY")
        : "---",
      dateOfPresentationReport: item?.introducedInHouses?.reportPresentationDate
        ? moment(item?.introducedInHouses?.reportPresentationDate).format("DD-MM-YYYY")
        : "---",
      dateOfTransmission: item?.dateOfTransmissionToNA
        ? moment(item?.dateOfTransmissionToNA).format("DD-MM-YYYY")
        : "---",
      remarks: item?.billRemarks,
      movers: item?.senateBillMnaMovers
        ? item?.senateBillMnaMovers.map((mover) => mover?.mna?.mnaName).join(", ")
        : "---",
      // parliamentaryYear: item?.parliamentaryYears?.parliamentaryTenure,
      // session: item?.sessions?.sessionName,
      // billType: item.billType,
      // billCategory: item.billCategory,
      fileNumber: item?.fileNumber,
      billFrom: item?.billFrom,
      // concerndCommittes: item?.introducedInHouses?.manageCommittees
      //   ?.committeeName
      //   ? item?.introducedInHouses?.manageCommittees?.committeeName
      //   : "---",
      // billStatus: item?.billStatuses?.billStatusName,
      // Status: item.billStatus,
    }));
  };
  // Get All Bills
  const getBills = useCallback(
    async (page) => {
      let searchParams = {};

      const response = await getAllLegislationBills(page, pageSize, searchParams);
      if (response?.success) {
        setCount(response?.data?.count);
        const ALL_BILLS_DATA = response?.data?.senateBills;
        const trnasformAllData = transformAllBillData(ALL_BILLS_DATA);
        setLegislationBillData(trnasformAllData);
      }
    },
    [count, setCount, pageSize, currentPage]
  );

  useEffect(() => {
    if (selectedbillFrom || billCategory) {
      handleSearch(selectedbillFrom, billCategory);
    } else {
      getBills(currentPage);
    }
  }, [currentPage, selectedbillFrom, billCategory]);

  // Handle Search
  const handleSearch = useCallback(
    async (billFrom, billCategory) => {
      let data = {};

      if (billFrom && !billCategory) {
        data = {
          billFrom: billFrom,
        };
      } else if (!billFrom && billCategory) {
        data = {
          billCategory: billCategory,
        };
      } else if (billFrom && billCategory) {
        data = {
          billFrom: billFrom,
          billCategory: billCategory,
        };
      }

      try {
        const response = await mainSearchApi(currentPage, pageSize, data);
        if (response?.success) {
          const transformedData = await transformAllBillData(response?.data?.senateBills);
          setCount(response?.data?.count);
          setLegislationBillData(transformedData);
          // showSuccessMessage(response?.message);
        }
      } catch (error) {
        showErrorMessage(error?.response?.message);
      }
    },
    [currentPage, pageSize, setCount, setLegislationBillData]
  );

  //Handle BillFrom Change
  const handleBillFromChange = (event) => {
    const selectedValue = event.target.value;
    setCurrentPage(0);
    setSelectedFrom(selectedValue);
    handleSearch(selectedValue, billCategory);
  };
  //Handle BillCategory Change
  const handleBillCategoryChange = (event) => {
    const selectedValue = event.target.value;
    setCurrentPage(0);
    setBillCategory(selectedValue);
    handleSearch(selectedbillFrom, selectedValue);
  };
  //Handle Filter
  const handleClick = () => {
    setSelectedFrom("");
    setBillCategory("");
    getBills(currentPage, pageSize);
  };

  const handlePrivateMemberBill = () => {
    navigate("/lgms/dashboard/bills/selectbillfrom", {state:{category:"Private Member Bill"}});
  };
  const handleGovernmentBill = () => {
    navigate("/lgms/dashboard/bills/selectbillfrom", {state:{category:"Government Bill"}});
  };
  // //Handle Add Senate Bills
  // const handleAddSenateBills = () => {
  //   navigate("/lgms/dashboard/bills/senate-bills");
  // };
  // //Handle Add NA Bills
  // const handleAddNaBills = () => {
  //   navigate("/lgms/dashboard/bills/NA-bills");
  // };
  //Handle Edit Senate Bills
  const handleEditSenateBill = (id) => {
    navigate("/lgms/dashboard/bills/edit/senate-bills", { state: id });
  };
  //Handle Edit NA Bills
  const handleEditNABill = (id) => {
    navigate("/lgms/dashboard/bills/edit/NA-bills/", { state: id });
  };

  // Handle Delete Bills
  const handleDeleteLegislationBill = async (id) => {
    try {
      const resposne = await DeleteLegislationBill(id);
      if (resposne?.success) {
        showSuccessMessage(resposne?.message);
        getBills(currentPage, pageSize);
      }
    } catch (error) {
      showErrorMessage(error?.message);
    }
  };

  return (
    <Layout module={true} sidebarItems={LegislationSideBarItems} centerlogohide={true}>
      <ToastContainer />
      <Header
        dashboardLink={"/lgms/dashboard"}
        addLink1={"/lgms/dashboard/bills/legislation-bills"}
        title1={"All Legislation Bills"}
      />
      <div class="container-fluid">
        <div className="row">
          <div className="col-3 ms-2 mt-4 mb-4">
            <label htmlFor="SelectBillFrom" className="form-label">
              Bill Category
            </label>
            <select
              className="form-select col-2"
              value={billCategory || ""}
              onChange={handleBillCategoryChange}
              id="billCategory"
              name="billCategory"
            >
              <option value="" disabled hidden>
                Select
              </option>
              <option value="Government Bill">Government Bill</option>
              <option value="Private Member Bill">Private Member Bill</option>
            </select>
          </div>
          <div className="col-3 ms-2 mt-4 mb-4">
            <label htmlFor="SelectBillFrom" className="form-label">
              Select Bill From:
            </label>
            <select
              className="form-select col-2"
              value={selectedbillFrom || ""}
              onChange={handleBillFromChange}
              id="billFrom"
              name="billFrom"
            >
              <option value="" disabled hidden>
                Select
              </option>
              <option value="From Senate">Introduced In Senate</option>
              <option value="From NA">Received From NA</option>
            </select>
          </div>

          <div className="col-2 ms-2 mt-5 ">
            <button className="btn btn-primary" onClick={handleClick}>
              Clear Filter
            </button>
          </div>
        </div>

        {/* <div>
          <CustomTable
            hidebtn1={false}
            hideBtn={false}
            addBtnText2="Received From NA"
            addBtnText={"Introduced in Senate"}
            handleAdd={handleAddSenateBills}
            handleAdd2={handleAddNaBills}
            tableTitle={"All Bills Data"}
            data={legislationBillData}
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
              item?.billFrom === "From Senate" ? handleEditSenateBill(item?.id) : handleEditNABill(item?.id);
            }}
            // handleEdit={(item)=>{handleEditSenateBill(item?.id)}}
            handleDelete={(item) => handleDeleteLegislationBill(item?.id)}
          />
        </div> */}
        <div>
          <CustomTable
            hidebtn1={false}
            hideBtn={false}
            addBtnText2="Government Bill"
            addBtnText={"Private Member Bill"}
            handleAdd={handlePrivateMemberBill}
            handleAdd2={handleGovernmentBill}
            tableTitle={"All Bills Data"}
            data={legislationBillData}
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
              item?.billFrom === "From Senate" ? handleEditSenateBill(item?.id) :  handleEditNABill(item?.id);
            }}
            // handleEdit={(item)=>{handleEditSenateBill(item?.id)}}
            handleDelete={(item) => handleDeleteLegislationBill(item?.id)}
          />
        </div>
      </div>
    </Layout>
  );
};

export default AllLegislationBill;
