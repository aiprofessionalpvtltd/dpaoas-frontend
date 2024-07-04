import React, { useState } from "react";
import { QMSSideBarItems } from "../../../../utils/sideBarItems";
import { Layout } from "../../../../components/Layout";
import Header from "../../../../components/Header";
import { useNavigate } from "react-router-dom";
import NoticeStatsCard from "../../../../components/CustomComponents/NoticeStatsCard";
import { faClipboardQuestion, faRectangleList } from "@fortawesome/free-solid-svg-icons";

function QMSQuestionDashboard() {
  const navigate = useNavigate()
  return (
    <Layout module={true} sidebarItems={QMSSideBarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/"}
      />
       <div style={{ marginLeft: 15 }}>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            marginBottom: "10px",
            color: "#fb6340",
          }}
        >
          Form Notice Office Branch
        </h2>
        <div class="row">
          <div class="col">
            <div class="mt-2 mb-4">
              <div class="row">
                <NoticeStatsCard
                  title={"Questions"}
                  icon={faClipboardQuestion}
                  overall={true}
                  iconBgColor={"#FFA500"}
                  total={"10"}
                  onClick={() => navigate("/qms/notice/notice-question")}
                />
                <NoticeStatsCard
                  title={"Resolutions"}
                  icon={faRectangleList}
                  overall={true}
                  iconBgColor={"#007bff"}
                  total={"50"}
                  onClick={() => navigate("/qms/notice/notice-resolution")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginLeft: 15 }}>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            marginBottom: "10px",
            color: "#fb6340",
          }}
        >
          Question Branch
        </h2>
        <div class="row">
          <div class="col">
            <div class="mt-2 mb-4">
              <div class="row">
                <NoticeStatsCard
                  title={"Questions"}
                  icon={faClipboardQuestion}
                  overall={true}
                  iconBgColor={"#FFA500"}
                  total={"6"}
                  onClick={() => navigate("/qms/search/question")}
                />
                <NoticeStatsCard
                  title={"Resolutions"}
                  icon={faRectangleList}
                  overall={true}
                  iconBgColor={"#007bff"}
                  total={"3"}
                  onClick={() => navigate("/qms/search/resolution")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default QMSQuestionDashboard;
