import React, { useState } from "react";
import { Layout } from "../../../../components/Layout";
import Header from "../../../../components/Header";
import CustomTable from "../../../../components/CustomComponents/CustomTable";
import { useNavigate } from "react-router-dom";

function EFilingDashboard() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(null);
  const pageSize = 7; // Set your desired page size

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  const data = [
    {
      id: 1,
      fileNumber: "8(14)/2022/IT",
      subject: "Testing doc",
      branch: "IT",
    },
    {
      id: 2,
      fileNumber: "8(14)/2022/Legis",
      subject: "Testing doc legislation",
      branch: "Legislation",
    },
  ];

  return (
    <Layout centerlogohide={true}>
      <div className="dashboard-content" style={{ marginTop: 80 }}>
        <Header dashboardLink={"/"} addLink1={"/efiling/dashboard"} title1={"E-Filing"} width={"500px"} />

        <div class="container-fluid dash-detail-container card" style={{ margin: "0 10px" }}>
          <div class="row">
            <div class="col-12">
              <CustomTable
                data={data}
                tableTitle="Files List"
                addBtnText="Create new file"
                handleAdd={() => navigate("/efiling/dashboard/addedit")}
                handleEdit={(item) => navigate("/efiling/dashboard/fileDetail", { state: item })}
                handleView={(item) => navigate("/efiling/dashboard/fileDetail", { state: { view: true } })}
                showView={true}
                headertitlebgColor={"#666"}
                headertitletextColor={"#FFF"}
                handlePageChange={handlePageChange}
                currentPage={currentPage}
                pageSize={pageSize}
                totalCount={count}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default EFilingDashboard;
