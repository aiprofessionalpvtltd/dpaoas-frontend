import React, { useEffect, useState } from "react";
import { Layout } from "../../../../components/Layout";
import { HRMsidebarItems } from "../../../../utils/sideBarItems";
import { useNavigate } from "react-router-dom";
import Header from "../../../../components/Header";
import CustomTable from "../../../../components/CustomComponents/CustomTable";
import { showSuccessMessage } from "../../../../utils/ToastAlert";
import moment from "moment";
import { DeleteRole, getRoles } from "../../../../api/APIs/Services/organizational.service";

function HRMDashboard() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [rolesList, setRolesList] = useState([]);
  // const [count, setCount] = useState(null);
  const pageSize = 4; // Set your desired page size

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  const transformLeavesData = (apiData) => {
    return apiData.map((res) => {
      return {
        id: res.id,
        name: res.name,
        description: res.description,
        roleStatus: res.roleStatus,
        createdAt: moment(res.createdAt).format("YYYY/MM/DD"),
        updatedAt: moment(res.updatedAt).format("YYYY/MM/DD"),
      };
    });
  };
  const fetchRoles = async () => {
    try {
      const response = await getRoles();
      const filterData = transformLeavesData(response.data)
      setRolesList(filterData);
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
  };

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
