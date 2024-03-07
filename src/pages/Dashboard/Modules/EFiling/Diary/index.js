import React, { useState } from "react";
import { Layout } from "../../../../../components/Layout";
import { EfilingSideBarItem } from "../../../../../utils/sideBarItems";
import Header from "../../../../../components/Header";
import CustomTable from "../../../../../components/CustomComponents/CustomTable";
import { useNavigate } from "react-router-dom";

export const Diary = () => {
  const [selectedTab, setSelectedTab] = useState("Incoming");
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(1);
  const pageSize = 5; // Set your desired page size
  const [fileData, setFileData] = useState([])

  const handlePageChange = (page) => {
      // Update currentPage when a page link is clicked
      setCurrentPage(page);
  };

  return (
    <Layout module={true} sidebarItems={EfilingSideBarItem}>
      <Header
        dashboardLink={"/efiling/dashboard"}
        addLink1={"/efiling/dashboard/diary"}
        title1={"Diary"}
        width={"500px"}
      />

      <div class="card">
        <div class="card-body">
          <div style={{ padding: "25px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ul className="nav nav-tabs mb-3 mt-3" id="ex1" role="tablist">
                <li
                  className="nav-item"
                  role="presentation"
                  onClick={() => setSelectedTab("Incoming")}
                >
                  <button
                    type="button"
                    className={
                      selectedTab === "Incoming"
                        ? "nav-link active"
                        : "nav-link"
                    }
                    style={{ width: "170px" }}
                    data-bs-toggle="tab"
                    role="tab"
                    aria-controls="ex1-tabs-1"
                    aria-selected={
                      selectedTab === "Incoming" ? "true" : "false"
                    }
                  >
                    Incoming
                  </button>
                </li>
                <li
                  className="nav-item"
                  role="presentation"
                  onClick={() => setSelectedTab("Outgoing")}
                >
                  <button
                    type="button"
                    className={
                      selectedTab === "Outgoing"
                        ? "nav-link active"
                        : "nav-link"
                    }
                    style={{ width: "170px" }}
                    data-bs-toggle="tab"
                    role="tab"
                    aria-controls="ex1-tabs-2"
                    aria-selected={
                      selectedTab === "Outgoing" ? "true" : "false"
                    }
                  >
                    Outgoing
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="tab-content" id="ex1-content">
              {selectedTab === "Incoming" ? (
                // Render content for the 'Noting' tab
                <section class="mb-5">
                <CustomTable
                        hidebtn1={true}
                        ActionHide={true}
                        hideBtn={true}
                        data={[]}
                        tableTitle="Incoming FRs"
                        headertitlebgColor={"#666"}
                        headertitletextColor={"#FFF"}
                        handlePageChange={handlePageChange}
                        currentPage={currentPage}
                        handleAdd={() => navigate("/efiling/dashboard/file-register-list/files-list/addedit-case")}
                        pageSize={pageSize}
                        totalCount={count}
                        singleDataCard={true}
                        showView={true}
                        handleView={(item) => navigate("/efiling/dashboard/file-register-list/files-list", {state:item})}
                    />
                </section>
              ) : (
                <section class="mb-5">
                <CustomTable
                        hidebtn1={true}
                        ActionHide={true}
                        hideBtn={true}
                        data={[]}
                        tableTitle="Outgoing Files"
                        headertitlebgColor={"#666"}
                        headertitletextColor={"#FFF"}
                        handlePageChange={handlePageChange}
                        currentPage={currentPage}
                        handleAdd={() => navigate("/efiling/dashboard/file-register-list/files-list/addedit-case")}
                        pageSize={pageSize}
                        totalCount={count}
                        singleDataCard={true}
                        showView={true}
                        handleView={(item) => navigate("/efiling/dashboard/file-register-list/files-list", {state:item})}
                    />
                </section>
              )}
            </div>
          </div>
      </div>
    </Layout>
  );
};
