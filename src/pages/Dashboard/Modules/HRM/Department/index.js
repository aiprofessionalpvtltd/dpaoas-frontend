import React, { useCallback, useEffect, useState } from "react";
import { Layout } from "../../../../../components/Layout";
import { HRMsidebarItems } from "../../../../../utils/sideBarItems";
import Header from "../../../../../components/Header";
import { useNavigate } from "react-router-dom";
import CustomTable from "../../../../../components/CustomComponents/CustomTable";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";
import { DeleteDepartment, getDepartment } from "../../../../../api/APIs/Services/organizational.service";


function HRMDepartment() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [departmentData, setDepartmentData] = useState([]);
  const [count, setCount] = useState(null);
  const pageSize = 10; // Set your desired page size

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  const transformDepartmentData = (apiData) => {
    return apiData.map((item) => ({
      id: item?.id,
      departmentName: item?.departmentName,
      description: item?.description,
      departmentStatus: item?.departmentStatus,
    }));
  };
  const getDepartmentData = useCallback(async () => {
    try {
      const response = await getDepartment(currentPage, pageSize);
      if (response?.success) {
        const transformedData = transformDepartmentData(response?.data?.departments);
        setCount(response?.data.count);
        setDepartmentData(transformedData);
      }
    } catch (error) {
      console.log(error);
    }
  }, [currentPage, pageSize, setCount, setDepartmentData]);

  const handleDelete = async (id) => {
    try {
      const response = await DeleteDepartment(id);
      if (response?.success) {
        showSuccessMessage(response.message);
        getDepartmentData();
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  };
  useEffect(() => {
    getDepartmentData();
  }, [getDepartmentData]);
  return (
    <Layout module={true} sidebarItems={HRMsidebarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/hrm/department"}
        addLink1={"/hrm/department"}
        title1={"Department"}
      />
      <ToastContainer />
      <div class="row">
        <div class="col-12">
          <CustomTable
            data={departmentData}
            tableTitle="Department List"
            addBtnText="Add Department"
            handleAdd={() => navigate("/hrm/addeditdepartment")}
            handleEdit={(item) =>
              navigate("/hrm/addeditdepartment", { state: item })
            }
            headertitlebgColor={"#666"}
            headertitletextColor={"#FFF"}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            pageSize={pageSize}
            // handlePrint={}
            // handleUser={}
            singleDataCard={true}
            totalCount={count}
            handleDelete={(item) => handleDelete(item.id)}
          />
      </div>
      </div>
    </Layout>
  );
}

export default HRMDepartment;
