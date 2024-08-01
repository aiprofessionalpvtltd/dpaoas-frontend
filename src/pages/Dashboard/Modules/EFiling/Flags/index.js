import React, { useCallback, useEffect, useState } from "react";
import { Layout } from "../../../../../components/Layout";
import {
  EfilingSideBarBranchItem,
  EfilingSideBarItem,
} from "../../../../../utils/sideBarItems";
import { ToastContainer } from "react-toastify";
import CustomTable from "../../../../../components/CustomComponents/CustomTable";
import { useNavigate } from "react-router-dom";
import {
  DeleteFlagApi,
  DeleteHeading,
  getAllBranchFlagsApi,
  getAllFileHeading,
} from "../../../../../api/APIs/Services/efiling.service";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../utils/ToastAlert";
import { getUserData } from "../../../../../api/Auth";

function FlagsList() {
  const navigate = useNavigate();
  const userData = getUserData();
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(null);
  const pageSize = 10; // Set your desired page size
  const [flagsData, setFlagsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  const transformFilesHeadingdata = (apiData) => {
    return apiData.map((item) => ({
      SrNo: item?.id,
      flag: item?.flag,
      branch: item?.branches?.branchName,
    }));
  };

  const getAllFlagsApiFunc = useCallback(async () => {
    try {
      const response = await getAllBranchFlagsApi(
        userData?.fkBranchId,
        currentPage,
        pageSize
      );
      if (response.success) {
        //   showSuccessMessage(response?.message)
        setCount(response?.data?.count);
        const transformedData = transformFilesHeadingdata(
          response?.data
        );
        setFlagsData(transformedData);
        setFilteredData(transformedData); // Initialize filtered data
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  }, [currentPage, pageSize, userData?.fkBranchId]);

  const handleDelete = async (id) => {
    try {
      const response = await DeleteFlagApi(id);
      if (response?.success) {
        showSuccessMessage(response.message);
        getAllFlagsApiFunc();
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  };

  // const onSearchChange = (event) => {
  //   const query = event.target.value;
  //   setSearchQuery(query);

  //   if (query) {
  //     const filtered = headingData.filter((item) => {
  //       return (
  //         item.HeadNumber.toLowerCase().includes(query.toLowerCase()) ||
  //         item.mainHead.toLowerCase().includes(query.toLowerCase()) ||
  //         item.branch.toLowerCase().includes(query.toLowerCase()) ||
  //         item.status.toLowerCase().includes(query.toLowerCase())
  //       );
  //     });
  //     setFilteredData(filtered);
  //   } else {
  //     setFilteredData(headingData);
  //   }
  // };

  useEffect(() => {
    getAllFlagsApiFunc();
  }, [getAllFlagsApiFunc]);

  return (
    <Layout
      module={false}
      centerlogohide={true}
      sidebarItems={
        userData && userData?.userType === "Officer"
          ? EfilingSideBarItem
          : EfilingSideBarBranchItem
      }>
      <ToastContainer />
      <div className="row">
        <div className="col-12">
          <CustomTable
            hideBtn={false}
            addBtnText={"Create Flag"}
            data={filteredData}
            tableTitle="Flags"
            headertitlebgColor={"#666"}
            headertitletextColor={"#FFF"}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            handleAdd={() =>
              navigate("/efiling/dashboard/addedit-flags")
            }
            pageSize={pageSize}
            totalCount={count}
            singleDataCard={true}
            // seachBarShow={true}
            // searchonchange={onSearchChange}
            handleDelete={(item) => handleDelete(item.SrNo)}
            showEditIcon={false}
            handleEdit={(item) =>
              navigate("/efiling/dashboard/addedit-flags", {
                state: item,
              })
            }
          />
        </div>
      </div>
    </Layout>
  );
}

export default FlagsList;
