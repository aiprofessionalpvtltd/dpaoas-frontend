import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NoticeSidebarItems } from "../../../../../../utils/sideBarItems";
import { Layout } from "../../../../../../components/Layout";
import Header from "../../../../../../components/Header";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";

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
function ManageSessionDays() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  // const [count, setCount] = useState(null);
  const pageSize = 10; // Set your desired page size

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  return (
    <Layout module={true} sidebarItems={NoticeSidebarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/"}
        addLink1={"/notice/manage/manage-session-days"}
        title1={"Manage Session Days"}
      />
      <div className="container-fluid dash-detail-container">
        <div class="card">
          <div class="col-12">
            <CustomTable
              data={data}
              tableTitle="Sessions List"
              addBtnText="Add Session"
              handleAdd={() => navigate("/notice/manage/sessions/addedit")}
              handleEdit={(item) => navigate("/notice/manage/sessions/addedit", { state: item })}
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
      </div>
    </Layout>
  );
}

export default ManageSessionDays;
