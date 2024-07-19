import React, { useEffect, useState } from "react";
import { Layout } from "../../../../components/Layout";
import { TelecastingSideBarItems } from "../../../../utils/sideBarItems";
import { useNavigate } from "react-router-dom";
import Header from "../../../../components/Header";
import NoticeStatsCard from "../../../../components/CustomComponents/NoticeStatsCard";
import { getSpeachOnDemandStats } from "../../../../api/APIs/Services/Notice.service";
import {
  faClipboardQuestion,
  faRectangleList,
  faSquareCheck
} from "@fortawesome/free-solid-svg-icons";

function TelecastingDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

  const getAllSpeachOnDemandAPi = async () => {
    try {
      const response = await getSpeachOnDemandStats();
      if (response?.success) {
       setStats(response?.data)
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  }

  useEffect(() => {
    getAllSpeachOnDemandAPi()
  }, []);

  return (
    <Layout
      module={true}
      sidebarItems={TelecastingSideBarItems}
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
          Speech on demand
        </h2>
        <div class="row">
          <div class="col">
            <div class="mt-2 mb-4">
              <div class="row">
                <NoticeStatsCard
                  title={"Waiting For Approval"}
                  icon={faClipboardQuestion}
                  overall={true}
                  iconBgColor={"#FFA500"}
                  total={stats?.waitingForApproval}
                  onClick={() => navigate("/telecasting/speech-on-demand", {state: {status: "Waiting For Approval"}})}
                />
                <NoticeStatsCard
                  title={"Request in Process"}
                  icon={faRectangleList}
                  overall={true}
                  iconBgColor={"#007bff"}
                  total={stats?.requestInProcess}
                  onClick={() => navigate("/telecasting/speech-on-demand", {state: {status: "Request In Process"}})}
                />
                <NoticeStatsCard
                  title={"Delivered"}
                  icon={faSquareCheck}
                  overall={true}
                  iconBgColor={"rgb(20, 174, 92)"}
                  total={stats?.delivered}
                  onClick={() => navigate("/telecasting/speech-on-demand", {state: {status: "Delivered"}})}
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </Layout>
  );
}

export default TelecastingDashboard;