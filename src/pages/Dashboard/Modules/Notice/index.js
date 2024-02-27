import React, { useState } from "react";
import { Layout } from "../../../../components/Layout";
import { NoticeSidebarItems } from "../../../../utils/sideBarItems";
import { useNavigate } from "react-router-dom";
import Header from "../../../../components/Header";
import CustomTable from "../../../../components/CustomComponents/CustomTable";
import LeaveCard from "../../../../components/CustomComponents/LeaveCard";

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

function NoticeDashboard() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 4; // Set your desired page size

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  return (
    <Layout
      module={true}
      sidebarItems={NoticeSidebarItems}
      centerlogohide={true}
    >
      <Header
        dashboardLink={"/"}
        title1={"Notice"}
      />
        <h2>Daily Stats</h2>
        <div class="row">
          <div class="col-md-12">
            <div class="mt-2 mb-5">
              <div class="row">
                <LeaveCard
                  available={"06"}
                  used={"05"}
                  title={"Question"}
                  percentage={"60"}
                  value={"10"}
                />
                <LeaveCard
                  available={"05"}
                  used={"04"}
                  title={"Motion"}
                  percentage={"80"}
                  value={"09"}
                />
                <LeaveCard
                  available={"05"}
                  used={"04"}
                  title={"Legislation"}
                  percentage={"100"}
                  value={"07"}
                />
              </div>
            </div>
          </div>
        </div>

        <h2>Overall Stats</h2>
        <div class="row">
          <div class="col-md-12">
            <div class="mt-2 mb-4">
              <div class="row">
                <LeaveCard
                  available={"06"}
                  used={"05"}
                  title={"Question"}
                  percentage={"60"}
                  value={"10"}
                />
                <LeaveCard
                  available={"05"}
                  used={"04"}
                  title={"Motion"}
                  percentage={"80"}
                  value={"09"}
                />
                <LeaveCard
                  available={"05"}
                  used={"04"}
                  title={"Legislation"}
                  percentage={"100"}
                  value={"07"}
                />
              </div>
            </div>
          </div>
        </div>
    </Layout>
  );
}

export default NoticeDashboard;
