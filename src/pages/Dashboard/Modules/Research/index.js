import React, { useEffect, useState } from "react";
import { Layout } from "../../../../components/Layout";
import { ResearchSideBarItems, TelecastingSideBarItems } from "../../../../utils/sideBarItems";
import { useNavigate } from "react-router-dom";
import Header from "../../../../components/Header";
import NoticeStatsCard from "../../../../components/CustomComponents/NoticeStatsCard";
import { getResearchServicesStats, getSpeachOnDemandStats } from "../../../../api/APIs/Services/Notice.service";
import {
  faClipboardQuestion, faRectangleList, faSquareCheck
} from "@fortawesome/free-solid-svg-icons";

function ResearchDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

  const getAllResearchServicesStatsAPi = async () => {
    try {
      const response = await getResearchServicesStats();
      if (response?.success) {
       setStats(response?.data)
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  }

  useEffect(() => {
    getAllResearchServicesStatsAPi()
  }, []);

  return (
    <Layout
      module={true}
      sidebarItems={ResearchSideBarItems}
      centerlogohide={true}
    >
      <Header dashboardLink={"/"} title1={"Telecasting"} />
      <div style={{ marginLeft: 15 }}>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            marginBottom: "10px",
            color: "#fb6340",
          }}
        >
          Research Services
        </h2>
        <div class="row">
          <div class="col">
            <div class="mt-2 mb-4">
              <div class="row">
                <NoticeStatsCard
                  title={"Received"}
                  icon={faClipboardQuestion}
                  overall={true}
                  iconBgColor={"#FFA500"}
                  total={stats?.received}
                  onClick={() => navigate("/research/research-services", {state: {status: "Received"}})}
                />
                <NoticeStatsCard
                  title={"Request in Process"}
                  icon={faRectangleList}
                  overall={true}
                  iconBgColor={"#007bff"}
                  total={stats?.requestInProcess}
                  onClick={() => navigate("/research/research-services", {state: {status: "Request In Process"}})}
                />
                <NoticeStatsCard
                  title={"Delivered"}
                  icon={faSquareCheck}
                  overall={true}
                  iconBgColor={"rgb(20, 174, 92)"}
                  total={stats?.delivered}
                  onClick={() => navigate("/research/research-services", {state: {status: "Delivered"}})}
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </Layout>
  );
}

export default ResearchDashboard;