import React, { useEffect, useState } from "react";
import { Layout } from "../../../../../components/Layout";
import { HRMsidebarItems } from "../../../../../utils/sideBarItems";
import Header from "../../../../../components/Header";
import { useNavigate } from "react-router-dom";
import CustomTable from "../../../../../components/CustomComponents/CustomTable";
import { DeleteDepartment, getDepartment } from "../../../../../api/APIs";
import { showErrorMessage, showSuccessMessage } from "../../../../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";

const data = [
  {
    id: 1,
    name: "Admin Department",
    description: "Handles Admin Related Work!",
    departmentStatus: "active",
    createdAt: "2023-11-21T09:22:13.682Z",
    updatedAt: "2023-11-24T05:48:16.342Z",
  },
  {
    id: 2,
    name: "IT Department",
    description: "Handles IT Related Work!",
    departmentStatus: "active",
    createdAt: "2023-11-24T09:49:43.505Z",
    updatedAt: "2023-11-24T09:49:43.505Z",
  },
];

function HRMDepartment() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [departmentData, setDepartmentData] = useState([])
  // const [count, setCount] = useState(null);
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
  const getDepartmentData = async () => {
    try {
      const response = await getDepartment(currentPage, pageSize);
      if (response?.success) {
        const transformedData = transformDepartmentData(response?.data);
        console.log("lsdflsdjljfkl", transformedData);
        setDepartmentData(transformedData)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await DeleteDepartment(id)
      if (response?.success) {
        showSuccessMessage(response.message)
        getDepartmentData()
      }
    } catch (error) {
      showErrorMessage(error.response.data.message)
    }
  }
  useEffect(() => {
    getDepartmentData();
  }, []);
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
            handleDelete={(item) => handleDelete(item.id)}
          />
        </div>
      </div>
    </Layout>
  );
}

export default HRMDepartment;
