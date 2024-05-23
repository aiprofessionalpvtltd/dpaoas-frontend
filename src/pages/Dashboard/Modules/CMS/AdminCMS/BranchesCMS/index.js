import React, { useCallback, useEffect, useState } from "react";
import { Layout } from "../../../../../../components/Layout";
import { CMSsidebarItems, HRMsidebarItems } from "../../../../../../utils/sideBarItems";
import Header from "../../../../../../components/Header";
import { useNavigate } from "react-router-dom";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";
import { deleteBranches, getBranches } from "../../../../../../api/APIs/Services/Branches.services";


function CMSBranches() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [branchesData, setBranchesData] = useState([]);
  const [count, setCount] = useState(null);
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
  return (
    <Layout module={true} sidebarItems={CMSsidebarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/cms/admin/dashboard"}
        addLink1={"/cms/admin/branch/list"}
        title1={"Branches"}
      />
      <ToastContainer />
        <div class="row">
          <div class="col-12">
            <CustomTable
              data={branchesData}
              tableTitle="Branches List"
              addBtnText="Add Branches"
              handleAdd={() => navigate("/cms/admin/branch/addedit")}
              handleEdit={(item) =>
                navigate("/cms/admin/branch/addedit", { state: item })
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

export default CMSBranches;
