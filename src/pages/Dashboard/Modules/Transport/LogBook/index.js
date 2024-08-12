import React, { useCallback, useEffect, useState } from "react";
import { Layout } from "../../../../../components/Layout";
import {
  EfilingSideBarBranchItem,
  EfilingSideBarItem,
  TransportSideBarItems,
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

function LogBookList() {
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

  useEffect(() => {
    getAllFlagsApiFunc();
  }, [getAllFlagsApiFunc]);

  return (
    <Layout
      module={false}
      centerlogohide={true}
      sidebarItems={TransportSideBarItems}>
      <ToastContainer />
      <div className="row">
        <div className="col-12">
          <CustomTable
            hideBtn={false}
            addBtnText={"Create Log"}
            data={filteredData}
            tableTitle="Log Book"
            headertitlebgColor={"#666"}
            headertitletextColor={"#FFF"}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            handleAdd={() =>
              navigate("/transport/logbook/addedit")
            }
            pageSize={pageSize}
            totalCount={count}
            singleDataCard={true}
            // seachBarShow={true}
            // searchonchange={onSearchChange}
            handleDelete={(item) => handleDelete(item.SrNo)}
            showEditIcon={false}
            handleEdit={(item) =>
              navigate("/transport/logbook/addedit", {
                state: item,
              })
            }
          />
        </div>
      </div>
    </Layout>
  );
}

export default LogBookList;
