import React, { useCallback, useEffect, useState } from "react";
import { Layout } from "../../../../../components/Layout";
import { HRMsidebarItems } from "../../../../../utils/sideBarItems";
import Header from "../../../../../components/Header";
import { useNavigate } from "react-router-dom";
import CustomTable from "../../../../../components/CustomComponents/CustomTable";
import { DeleteDepartment, getDepartment } from "../../../../../api/APIs";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";
import {
  deleteBranches,
  getBranches,
} from "../../../../../api/APIs/Services/Branches.services";

function HRMBranches() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [branchesData, setBranchesData] = useState([]);
  const [count, setCount] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const pageSize = 10; // Set your desired page size

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  const transformBranchesData = (apiData) => {
    return apiData.map((item) => ({
      id: item?.id,
      branchName: item?.branchName,
      description: item?.description,
      branchStatus: item?.branchStatus,
    }));
  };
  const getBranchesapi = useCallback(async () => {
    try {
      const response = await getBranches(currentPage, pageSize);
      if (response?.success) {
        const transformedData = transformBranchesData(response?.data?.rows);
        setCount(response?.data?.count);
        setBranchesData(transformedData);
      }
    } catch (error) {
      console.log(error);
    }
  }, [currentPage, pageSize, setCount, setBranchesData]);

  const handleDelete = async (id) => {
    try {
      const response = await deleteBranches(id);
      if (response?.success) {
        showSuccessMessage(response.message);
        getBranchesapi();
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  };
  useEffect(() => {
    getBranchesapi();
  }, [getBranchesapi]);

  // Filtered Data
  const filteredBranches = branchesData.filter((branch) =>
    branch.branchName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <Layout module={true} sidebarItems={HRMsidebarItems} centerlogohide={true}>
      <ToastContainer />
      <Header
        dashboardLink={"/hrm/branches"}
        addLink1={"/hrm/branches"}
        title1={"Branches"}
      />
      
      <div class="row">
        <div class="col-12">
          <CustomTable
            data={filteredBranches}
            seachBarShow={true}
            searchonchange={(e) => setSearchTerm(e.target.value)}
            tableTitle="Branches List"
            addBtnText="Add New Branch"
            handleAdd={() => navigate("/hrm/addeditbranches")}
            handleEdit={(item) =>
              navigate("/hrm/addeditbranches", { state: item })
            }
            headertitlebgColor={"#666"}
            singleDataCard={true}
            headertitletextColor={"#FFF"}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            pageSize={pageSize}
            // handlePrint={}
            // handleUser={}
            totalCount={count}
            handleDelete={(item) => handleDelete(item.id)}
          />
        </div>
      </div>
    </Layout>
  );
}

export default HRMBranches;
