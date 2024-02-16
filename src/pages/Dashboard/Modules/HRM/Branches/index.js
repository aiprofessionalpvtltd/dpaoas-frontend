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


function HRMBranches() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [departmentData, setDepartmentData] = useState([]);
  const [count, setCount] = useState(null);
  const pageSize = 4; // Set your desired page size

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  const transformDepartmentData = (apiData) => {
    return apiData.map((leave) => ({
      id: leave?.id,
      departmentName: leave?.departmentName,
      description: leave?.description,
      departmentStatus: leave?.departmentStatus,
    }));
  };
  // const getDepartmentData = useCallback(async () => {
  //   try {
  //     const response = await getDepartment(currentPage, pageSize);
  //     if (response?.success) {
  //       const transformedData = transformDepartmentData(response?.data);
  //       setCount(response?.count);
  //       setDepartmentData(transformedData);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [currentPage, pageSize, setCount, setDepartmentData]);

  // const handleDelete = async (id) => {
  //   try {
  //     const response = await DeleteDepartment(id);
  //     if (response?.success) {
  //       showSuccessMessage(response.message);
  //       getDepartmentData();
  //     }
  //   } catch (error) {
  //     showErrorMessage(error.response.data.message);
  //   }
  // };
  // useEffect(() => {
  //   getDepartmentData();
  // }, [getDepartmentData]);
  return (
    <Layout module={true} sidebarItems={HRMsidebarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/hrm/branches"}
        addLink1={"/hrm/branches"}
        title1={"Branches"}
      />
      <ToastContainer />
      <div class="container-fluid dash-detail-container card">
      <div class="row">
        <div class="col-12">
          <CustomTable
            data={departmentData}
            tableTitle="Branches List"
            addBtnText="Add Branches"
            handleAdd={() => navigate("/hrm/addeditbranches")}
            handleEdit={(item) =>
              navigate("/hrm/addeditbranches", { state: item })
            }
            headertitlebgColor={"#666"}
            headertitletextColor={"#FFF"}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            pageSize={pageSize}
            // handlePrint={}
            // handleUser={}
            totalCount={count}
            // handleDelete={(item) => handleDelete(item.id)}
          />
        </div>
      </div>
      </div>
    </Layout>
  );
}

export default HRMBranches;
