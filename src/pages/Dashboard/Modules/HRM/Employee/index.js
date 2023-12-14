import React, { useEffect, useState } from "react";
import { Layout } from "../../../../../components/Layout";
import Header from "../../../../../components/Header";
import { useNavigate } from "react-router-dom";
import { HRMsidebarItems } from "../../../../../utils/sideBarItems";
import CustomTable from "../../../../../components/CustomComponents/CustomTable";
import { ToastContainer } from "react-toastify";
import { DeleteEmployee, getAllEmployee } from "../../../../../api/APIs";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../utils/ToastAlert";

const data = [
  {
    name: "Admin",
    status: "Active",
  },
  {
    name: "Editor",
    status: "InActive",
  },
  {
    name: "Manager",
    status: "Active",
  },
  {
    name: "Employee",
    status: "Active",
  },
];
function HRMEmployeeDashboard() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [employeeData, setEmployeeData] = useState([]);

  const [count, setCount] = useState(null);
  const pageSize = 4; // Set your desired page size

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  const transformEmployeeData = (apiData) => {
    return apiData.map((leave) => ({
      id: leave.id,
      firstName: leave.firstName,
      lastName: leave.lastName,
      phoneNo: leave.phoneNo,
      gender: leave.gender,
      fileNumber: leave.fileNumber,
      // supervisor: leave.supervisor,
      departmentName: leave.department.departmentName,
      designation: leave.designation.designationName,
    }));
  };
  const getEmployeeData = async () => {
    try {
      const response = await getAllEmployee(currentPage, pageSize);
      if (response?.success) {
        setCount(response?.count);
        const transformedData = transformEmployeeData(response?.data);
        setEmployeeData(transformedData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await DeleteEmployee(id);
      if (response?.success) {
        showSuccessMessage(response.message);
        getEmployeeData();
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  };
  useEffect(() => {
    getEmployeeData();
  }, []);
  return (
    <Layout module={true} sidebarItems={HRMsidebarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/hrm/employee"}
        addLink1={"/hrm/employee"}
        title1={"Employee"}
      />
      <ToastContainer />
      <div class="row">
        <div class="col-12">
          <CustomTable
            data={employeeData}
            tableTitle="Employee List"
            addBtnText="Add Employee"
            handleAdd={() => navigate("/hrm/addeditemployee")}
            handleEdit={(item) =>
              navigate("/hrm/addeditemployee", { state: item })
            }
            headertitlebgColor={"#666"}
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

export default HRMEmployeeDashboard;
