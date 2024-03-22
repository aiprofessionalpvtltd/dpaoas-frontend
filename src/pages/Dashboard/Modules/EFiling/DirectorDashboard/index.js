import React, { useEffect, useState } from "react";
import { Layout } from "../../../../../components/Layout";
import Header from "../../../../../components/Header";
import { EfilingSideBarBranchItem, EfilingSideBarItem } from "../../../../../utils/sideBarItems";
import NoticeStatsCard from "../../../../../components/CustomComponents/NoticeStatsCard";
import {
  faClipboardQuestion,
  faFileImport,
  faScaleBalanced,
} from "@fortawesome/free-solid-svg-icons";
import {
  getApprovelStats,
  getsentAndRecievedFilesStats,
} from "../../../../../api/APIs/Services/efiling.service";
import { getUserData } from "../../../../../api/Auth";
import { Link } from "react-router-dom";
import { EFilingNotifications } from "../../../../../components/NotificationsHeaders/EFilingNotifications";

function DirectorDashboard() {
  const userData = getUserData();
  const [fileStatsData, setFileStatsData] = useState(null);
  const [approvelStatsData, setApprovelStatsData] = useState(null);

  const getAllStats = async () => {
    try {
      const response = await getsentAndRecievedFilesStats(userData?.fkUserId);
      if (response?.success) {
        setFileStatsData(response?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllApprovelStatsApi = async () => {
    try {
      const response = await getApprovelStats(userData?.fkUserId);
      if (response?.success) {
        setApprovelStatsData(response?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllApprovelStatsApi();
    getAllStats();
    // getUserData()
  }, []);

  // useEffect(() => {
  //   window.location.reload(true)
  // },[])
  return (
    <Layout
      module={true}
      centerlogohide={true}
      sidebarItems={userData && userData?.userType === "Officer" ? EfilingSideBarItem : EfilingSideBarBranchItem}
      dashboardLink={"/efiling/dashboard"}
        addLink1={"/efiling/director-deshboard"}
        title1={"E-Filing"}
        width={"500px"}
        marginTop={"0px"}
        breadcrumbs={true}
    >
      <EFilingNotifications notificationType="Notifications" />
      

      <h2 style={{ marginLeft: 15, marginBottom: 30, color: "#820001" }}>
        {" "}
        {userData && `${userData?.department?.departmentName} Branch`}
      </h2>
      <div style={{ marginLeft: 15 }}>
        <h2
          style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "10px" }}
        >
          Today's Stats
        </h2>
        <div class="row">
          <div class="col-md-12">
            <div class="mt-2 mb-4">
              <div class="row">
                <NoticeStatsCard
                  title={"Files"}
                  icon={faClipboardQuestion}
                  iconBgColor={"#FFA500"}
                  total={fileStatsData && fileStatsData?.totalFiles}
                  sent={fileStatsData && fileStatsData?.sentFiles}
                  received={fileStatsData && fileStatsData?.receivedFiles}
                />
                {/* <NoticeStatsCard ReceivedText={"Disapproved"} SentText={"Approved"} title={"Approval"} icon={faFileImport} iconBgColor={"#007bff"} total={approvelStatsData && approvelStatsData?.totalFiles} sent={approvelStatsData && approvelStatsData?.approvedFiles} received={approvelStatsData && approvelStatsData?.disapprovedFiles} /> */}
              </div>
              <div class="row">
                <div class="col-md-12 mt-5">
                  <div class="mt-2 mb-4">
                    <div class="row">
                      <NoticeStatsCard
                        title={"Approved"}
                        icon={faClipboardQuestion}
                        overall={true}
                        iconBgColor={"#FFA500"}
                        total={approvelStatsData && approvelStatsData.approvedFiles}
                        ColValue={"col-3"}
                      />
                      <NoticeStatsCard
                        title={"Under Discussion"}
                        icon={faFileImport}
                        overall={true}
                        iconBgColor={"#007bff"}
                        total={approvelStatsData && approvelStatsData.discussedFiles}
                        ColValue={"col-3"}
                      />
                      <NoticeStatsCard
                        title={"NFA"}
                        icon={faFileImport}
                        overall={true}
                        iconBgColor={"#007bff"}
                        total={approvelStatsData && approvelStatsData.nfaFiles}
                        ColValue={"col-3"}
                      />
                      <NoticeStatsCard
                        title={"Pending"}
                        icon={faFileImport}
                        overall={true}
                        iconBgColor={"#007bff"}
                        total={approvelStatsData && approvelStatsData.pendingFiles}
                        ColValue={"col-3"}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default DirectorDashboard;
