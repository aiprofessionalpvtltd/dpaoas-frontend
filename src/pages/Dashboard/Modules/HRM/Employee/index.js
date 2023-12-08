import React, { useState } from "react";
import { Layout } from "../../../../../components/Layout";
import Header from "../../../../../components/Header";
import { useNavigate } from "react-router-dom";
import { HRMsidebarItems } from "../../../../../utils/sideBarItems";
import CustomTable from "../../../../../components/CustomComponents/CustomTable";

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
    // const [count, setCount] = useState(null);
    const pageSize = 4; // Set your desired page size

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  return (
    <Layout module={true} sidebarItems={HRMsidebarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/hrm/employee"}
        addLink1={"/hrm/employee"}
        title1={"Employee"}
      />
      <div class="row">
        <div class="col-12">
          <CustomTable
            data={data}
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
            // handleDelete={(item) => handleDelete(item.id)}
          />
        </div>
      </div>
    </Layout>
  );
}

export default HRMEmployeeDashboard;
