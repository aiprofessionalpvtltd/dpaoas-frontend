import React, { useState } from "react";
import { Layout } from "../../../../components/Layout";
import Header from "../../../../components/Header";
import CustomTable from "../../../../components/CustomComponents/CustomTable";
import { useNavigate } from "react-router-dom";
import { EfilingSideBarItem } from "../../../../utils/sideBarItems";
import NoticeStatsCard from "../../../../components/CustomComponents/NoticeStatsCard";
import { faClipboardQuestion, faFileImport, faScaleBalanced } from "@fortawesome/free-solid-svg-icons";

function EFilingDashboard() {

  return (
    <Layout module={true} centerlogohide={true} sidebarItems={EfilingSideBarItem}>
      <div className="dashboard-content" style={{ marginTop: 80 }}>
        <Header dashboardLink={"/"} addLink1={"/efiling/dashboard"} title1={"E-Filing"} width={"500px"} />

        <div style={{ marginLeft: 15 }}>
        {/* <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '10px' }}>Stats</h2> */}
        {/* <div class="row">
          <div class="col-md-12">
            <div class="mt-2 mb-5">
              <div class="row">
                <NoticeStatsCard title={"Question"} icon={faClipboardQuestion} iconBgColor={"#FFA500"} total={`${stats?.questions?.dailySendQuestions + stats?.questions?.dailyRecievedQuestions}`} sent={stats?.questions?.dailySendQuestions} received={stats?.questions?.dailyRecievedQuestions} />
                <NoticeStatsCard title={"Motion"} icon={faFileImport} iconBgColor={"#007bff"} total={`${stats?.motions?.dailySendMotions + stats?.motions?.dailyRecievedMotions}`} sent={stats?.motions?.dailySendMotions} received={stats?.motions?.dailyRecievedMotions} />
                <NoticeStatsCard title={"Legislation"} icon={faScaleBalanced} iconBgColor={"#2dce89"} total={`${stats?.legislation?.sentToBranchesQ + stats?.legislation?.initiatedByBranchesQ}`} sent={stats?.legislation?.sentToBranchesQ} received={stats?.legislation?.initiatedByBranchesQ} />
              </div>
            </div>
          </div>
        </div> */}

        <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '10px' }}>Overall Stats</h2>
        <div class="row">
          <div class="col-md-12">
            <div class="mt-2 mb-4">
              <div class="row">
              <NoticeStatsCard title={"File"} icon={faClipboardQuestion} overall={true} iconBgColor={"#FFA500"} total={`15`} />
              <NoticeStatsCard title={"Fresh Recipt"} icon={faFileImport} overall={true} iconBgColor={"#007bff"} total={`30`} />
              <NoticeStatsCard title={"Team"} icon={faScaleBalanced} overall={true} iconBgColor={"#2dce89"} total={`60`} />
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </Layout>
  );
}

export default EFilingDashboard;
