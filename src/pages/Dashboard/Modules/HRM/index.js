import React, { useEffect, useState } from "react";
import { Layout } from "../../../../components/Layout";
import { HRMsidebarItems } from "../../../../utils/sideBarItems";
import { useNavigate } from "react-router-dom";
import Header from "../../../../components/Header";
import CustomTable from "../../../../components/CustomComponents/CustomTable";
import { getRolesData } from "../../../../api/Auth";
import { DeleteRole, getRoles } from "../../../../api/APIs";
import { showSuccessMessage } from "../../../../utils/ToastAlert";

const data = [
  {
    id: 1,
    name: "IT",
    description: "IT Things",
    roleStatus: "active",
    createdAt: "2023-11-17T07:44:24.020Z",
    updatedAt: "2023-11-17T07:44:24.020Z",
  },
  {
    id: 2,
    name: "HRM",
    description: "Human Resource Management",
    roleStatus: "active",
    createdAt: "2023-11-24T09:58:14.137Z",
    updatedAt: "2023-11-24T09:58:14.137Z",
  },
];

function HRMDashboard() {
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(0);
    const [rolesList, setRolesList] = useState([]);
    // const [count, setCount] = useState(null);
    const pageSize = 4; // Set your desired page size

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  const fetchRoles = async () => {
    try {
      const response = await getRoles();
      setRolesList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await DeleteRole(id);
      if (response.success) {
        showSuccessMessage(response?.message);
        fetchRoles();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Layout module={true} sidebarItems={HRMsidebarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/hrm/dashboard"}
        addLink1={"/hrm/dashboard"}
        title1={"Roles"}
      />
      <div class="row">
        <div class="col-12">
          <CustomTable
            data={rolesList && rolesList.length > 0 ? rolesList : []}
            tableTitle="Roles List"
            addBtnText="Add Roles"
            handleAdd={() => navigate("/hrm/addrole")}
            handleEdit={(item) => navigate("/hrm/editrole", { state: item })}
            headertitlebgColor={"#666"}
            headertitletextColor={"#FFF"}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            pageSize={pageSize}
            hidePagination={true}
            handleDelete={(item) => handleDelete(item.id)}
          />
        </div>
      </div>
    </Layout>
  );
}

export default HRMDashboard;
