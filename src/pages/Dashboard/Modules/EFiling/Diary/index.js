import React, { useCallback, useEffect, useState } from "react";
import { Layout } from "../../../../../components/Layout";
import { EfilingSideBarBranchItem, EfilingSideBarItem } from "../../../../../utils/sideBarItems";
import Header from "../../../../../components/Header";
import CustomTable from "../../../../../components/CustomComponents/CustomTable";
import { useNavigate } from "react-router-dom";
import { getAllFileDiary } from "../../../../../api/APIs/Services/efiling.service";
import { showErrorMessage } from "../../../../../utils/ToastAlert";
import moment from "moment";
import { getUserData } from "../../../../../api/Auth";

export const Diary = () => {
  const [selectedTab, setSelectedTab] = useState("Incoming");
  const navigate = useNavigate()
  const userData = getUserData()
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(null);
  const [outgoingCount, setOutGoingCount] = useState(null)
  const pageSize = 10; // Set your desired page size
  const [incomingData, setIncomingData] = useState([])
  const [outgoingData, setoutgoingData] = useState([])


  const handlePageChange = (page) => {
      // Update currentPage when a page link is clicked
      setCurrentPage(page);
  };

  const treformFileDiary = (apiData) => {
    return apiData.map((item, index) => ({
      SR: item?.id,
      // diaryType: item?.diaryType,
      diaryNumber:item?.diaryNumber,
      diaryDate: moment(item?.diaryDate).format("DD/MM/YYYY"),
      diaryTime: item?.diaryTime, 
      frType:item?.freshReceipts?.frType,
      frDate:moment(item?.freshReceipts?.frDate).format("DD/MM/YYYY")
    }));
  };

  const getAllFileDiaryApi = useCallback(async () => {
    try {
      const response = await getAllFileDiary(userData?.fkBranchId, currentPage, pageSize);
      if (response?.success) {
        setCount(response?.data?.incoming?.count);
        const trensferData = treformFileDiary(
          response?.data?.incoming?.fileDiaries
        )
        setIncomingData(trensferData);
        //
        setOutGoingCount(response?.data?.outgoing?.count);
        const transferOutGoing = treformFileDiary(
          response?.data?.outgoing?.fileDiaries
        )
        setoutgoingData(transferOutGoing);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  }, [currentPage, pageSize, setCount, setoutgoingData, setIncomingData, setOutGoingCount]);

  

  useEffect(() => {
    getAllFileDiaryApi();
  }, [currentPage]);

  return (
    <Layout module={true} centerlogohide={true} sidebarItems={userData && userData?.userType === "Officer" ? EfilingSideBarItem : EfilingSideBarBranchItem}>
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
                        data={incomingData}
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
                        data={outgoingData}
                        tableTitle="Outgoing Files"
                        headertitlebgColor={"#666"}
                        headertitletextColor={"#FFF"}
                        handlePageChange={handlePageChange}
                        currentPage={currentPage}
                        handleAdd={() => navigate("/efiling/dashboard/file-register-list/files-list/addedit-case")}
                        pageSize={pageSize}
                        totalCount={outgoingCount}
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
