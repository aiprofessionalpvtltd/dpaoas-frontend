import React, { useState } from "react";
import Header from "../../../../../components/Header";
import { MMSSideBarItems } from "../../../../../utils/sideBarItems";
import { Layout } from "../../../../../components/Layout";
import NoticeStatsCard from "../../../../../components/CustomComponents/NoticeStatsCard";
import { faClipboardQuestion, faHandshake } from "@fortawesome/free-solid-svg-icons";

function MMSMotionDashboard() {
  return (
    <Layout module={true} sidebarItems={MMSSideBarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/mms/dashboard"}
        addLink1={"/mms/dashboard"}
        title1={"Motion"}
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
                  title={"Motion Under Rule 218"}
                  icon={faClipboardQuestion}
                  overall={true}
                  iconBgColor={"#FFA500"}
                  total={9}
                  onClick={() => alert("sss")}
                />
                <NoticeStatsCard
                  title={"Calling Attention Notice"}
                  icon={faHandshake}
                  overall={true}
                  iconBgColor={"#007bff"}
                  total={10}
                  onClick={() => alert("/qms/notice/notice-resolution")}
                />
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="mt-2 mb-4">
              <div class="row">
                <NoticeStatsCard
                  title={"Adjournment Motions"}
                  icon={faClipboardQuestion}
                  overall={true}
                  iconBgColor={"#FFA500"}
                  total={9}
                  onClick={() => alert("sss")}
                />
                <NoticeStatsCard
                  title={"Privilege Motions"}
                  icon={faHandshake}
                  overall={true}
                  iconBgColor={"#007bff"}
                  total={10}
                  onClick={() => alert("/qms/notice/notice-resolution")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default MMSMotionDashboard;
