import React, { useCallback, useEffect, useState } from "react";
import CustomTable from "../../../../../components/CustomComponents/CustomTable";
import { ToastContainer } from "react-toastify";
import Header from "../../../../../components/Header";
import { Layout } from "../../../../../components/Layout";
import {
  EfilingSideBarBranchItem,
  EfilingSideBarItem,
} from "../../../../../utils/sideBarItems";
import { useNavigate } from "react-router";
import { getAllFileRegister } from "../../../../../api/APIs/Services/efiling.service";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../utils/ToastAlert";
import { getUserData, setregisterID } from "../../../../../api/Auth";

function ListFileRegister() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(null);
  const [registerData, setRegisterData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const pageSize = 10; // Set your desired page size
  const UserData = getUserData();

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  const transformFilesRegisterdata = (apiData) => {
    return apiData.map((item) => ({
      id: item?.id,
      registerNumber: item?.registerNumber,
      branch: item?.branches?.branchName,
      Subject: item?.registerSubject,
      year: item?.year,
    }));
  };

  const getAllRegisterApi = useCallback(async () => {
    try {
      const response = await getAllFileRegister(
        UserData?.fkBranchId,
        currentPage,
        pageSize
      );
      if (response.success) {
        // showSuccessMessage(response?.message)
        const transferData = transformFilesRegisterdata(
          response?.data?.fileRegisters
        );
        setCount(response?.data?.count);
        setRegisterData(transferData);
        setFilteredData(transferData); // Initialize filtered data
      }
    } catch (error) {
      // showErrorMessage(error?.response?.data?.message);
    }
  }, [currentPage, pageSize, setCount, setRegisterData]);

  const onSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query) {
      const filtered = registerData.filter((item) => {
        return (
          item.registerNumber.toLowerCase().includes(query.toLowerCase()) ||
          item.branch.toLowerCase().includes(query.toLowerCase()) ||
          item.Subject.toLowerCase().includes(query.toLowerCase()) ||
          item.year.toString().includes(query)
        );
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(registerData);
    }
  };

  useEffect(() => {
    getAllRegisterApi();
  }, [getAllRegisterApi]);

  return (
    <Layout
      module={false}
      centerlogohide={true}
      sidebarItems={
        UserData && UserData?.userType === "Officer"
          ? EfilingSideBarItem
          : EfilingSideBarBranchItem
      }
    >
      <ToastContainer />
      <div className="row">
        <div className="col-12">
          <CustomTable
            hideBtn={false}
            addBtnText={"Create File Register"}
            data={filteredData}
            tableTitle="File Registers"
            addBtnText2="Create File"
            headertitlebgColor={"#666"}
            headertitletextColor={"#FFF"}
            handlePageChange={handlePageChange}
            ActionHide={false}
            // handleEdit={false}
            showEditIcon={false}
            currentPage={currentPage}
            handleAdd={() => navigate("/efiling/dashboard/addedit-file-register")}
            handleEdit={(item) => navigate("/efiling/dashboard/addedit-file-register", { state: item })}
            pageSize={pageSize}
            totalCount={count}
            singleDataCard={true}
            seachBarShow={true}
            searchonchange={onSearchChange}
            showView={true}
            handleView={(item) => {
              setregisterID(item?.id);
              navigate("/efiling/dashboard/file-register-list/files-list", {
                state: item,
              });
            }}
          />
        </div>
      </div>
    </Layout>
  );
}

export default ListFileRegister;
