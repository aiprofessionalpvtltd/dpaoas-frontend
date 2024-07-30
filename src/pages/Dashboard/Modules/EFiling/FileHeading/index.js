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
  DeleteHeading,
  getAllFileHeading,
} from "../../../../../api/APIs/Services/efiling.service";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../utils/ToastAlert";
import { getUserData } from "../../../../../api/Auth";

function FileHeadingList() {
  const navigate = useNavigate();
  const userData = getUserData();
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(null);
  const pageSize = 10; // Set your desired page size
  const [headingData, setHedingData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  const transformFilesHeadingdata = (apiData) => {
    console.log(apiData);
    return apiData.map((item) => ({
      internalId: item?.id,
      HeadNumber: item?.mainHeadingNumber,
      mainHead: item?.mainHeading,
      branch: item?.branches?.branchName,
      status: item?.status,
    }));
  };

  const getAllFileHeadingApi = useCallback(async () => {
    try {
      const response = await getAllFileHeading(
        userData?.fkBranchId,
        currentPage,
        pageSize
      );
      if (response.success) {
        //   showSuccessMessage(response?.message)
        setCount(response?.data?.count);
        const transformedData = transformFilesHeadingdata(
          response?.data?.mainHeadings
        );
        setHedingData(transformedData);
        setFilteredData(transformedData); // Initialize filtered data
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  }, [currentPage, pageSize, userData?.fkBranchId]);

  const handleDelete = async (id) => {
    try {
      const response = await DeleteHeading(id);
      if (response?.success) {
        showSuccessMessage(response.message);
        getAllFileHeadingApi();
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  };

  const onSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query) {
      const filtered = headingData.filter((item) => {
        return (
          item.HeadNumber.toLowerCase().includes(query.toLowerCase()) ||
          item.mainHead.toLowerCase().includes(query.toLowerCase()) ||
          item.branch.toLowerCase().includes(query.toLowerCase()) ||
          item.status.toLowerCase().includes(query.toLowerCase())
        );
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(headingData);
    }
  };

  useEffect(() => {
    getAllFileHeadingApi();
  }, [getAllFileHeadingApi]);

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
            addBtnText={"Create File Head"}
            data={filteredData}
            tableTitle="File Headings"
            headertitlebgColor={"#666"}
            headertitletextColor={"#FFF"}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            handleAdd={() =>
              navigate("/efiling/dashboard/addedit-file-heading")
            }
            pageSize={pageSize}
            totalCount={count}
            singleDataCard={true}
            seachBarShow={true}
            searchonchange={onSearchChange}
            handleDelete={(item) => handleDelete(item.internalId)}
            showEditIcon={false}
            handleEdit={(item) =>
              navigate("/efiling/dashboard/addedit-file-heading", {
                state: item,
              })
            }
          />
        </div>
      </div>
    </Layout>
  );
}

export default FileHeadingList;
