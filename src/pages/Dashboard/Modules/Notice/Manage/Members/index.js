import React, { useState } from "react";
import { NoticeSidebarItems } from "../../../../../../utils/sideBarItems";
import { Layout } from "../../../../../../components/Layout";
import Header from "../../../../../../components/Header";
import { useNavigate } from "react-router";
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

function Members() {
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(0);
    // const [count, setCount] = useState(null);
    
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
        addLink1={"/notice/dashboard"}
        addLink2={"/notice/manage/members"}
        title1={"Notice"}
        title2={"Members"}
      />
      <div class="card">
        <div class="card-header red-bg" style={{ background: "#14ae5c" }}>
          <h1>Members Detail</h1>
        </div>
        <div class="card-body">
          <div class="container-fluid">
            <div class="row">
              <div class="col">
                <div class="mb-3">
                  <label class="form-label">Member Name</label>
                  <select class="form-select">
                    <option>Mohsin</option>
                    <option>Hamid</option>
                    <option>Saqib</option>
                  </select>
                </div>
              </div>
              <div class="col">
                <div class="mb-3">
                  <label class="form-label">Member Status</label>
                  <select class="form-select">
                    <option>Approved</option>
                    <option>Rejected</option>
                    <option>Pending</option>
                  </select>
                </div>
              </div>

              <div class="col">
                <div class="mb-3">
                  <label class="form-label">Tenure</label>
                  <select class="form-select">
                    <option>2018-2019</option>
                    <option>2019-2020</option>
                    <option>2020-2023</option>
                  </select>
                </div>
              </div>
              <div class="col">
                <div class="mb-3">
                  <label class="form-label">Party</label>
                  <select class="form-select">
                    <option>PMLN</option>
                    <option>PTI</option>
                    <option>JUI</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button class="btn btn-primary" type="button">
                  Search
                </button>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <CustomTable
                  data={data}
                  tableTitle={"Members Detail"}
                  addBtnText="Add Member"
                  headerBgColor={"rgb(20, 174, 92)"}
                  hideBtn={false}
                  handleEdit={() =>
                    navigate("/notice/manage/members/addedit", { state: true })
                  }
                  handleAdd={() => navigate("/notice/manage/members/addedit")}
                  handlePageChange={handlePageChange}
                  currentPage={currentPage}
                  pageSize={pageSize}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Members;
