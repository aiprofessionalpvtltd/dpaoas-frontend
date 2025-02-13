import React, { useEffect, useState } from "react";
import { Layout } from "../../../../components/Layout";
import {
  TMSsidebarItems,
  TMSsidebarItemsDirector,
} from "../../../../utils/sideBarItems";
import StatsCard from "../../../../components/CustomComponents/StatsCard";
import { useNavigate } from "react-router-dom";
import { allquestionsByStatus } from "../../../../api/APIs/Services/Question.service";
import { resolutionStatusCount } from "../../../../api/APIs/Services/Resolution.service";
import NoticeStatsCard from "../../../../components/CustomComponents/NoticeStatsCard";
import {
  faClipboardQuestion,
  faFileImport,
  faHandshake,
} from "@fortawesome/free-solid-svg-icons";
import { getUserData } from "../../../../api/Auth";
import { translationdashboardStats } from "../../../../api/APIs/Services/translation.service";

function TMSDashboard() {
  const navigate = useNavigate();
  const userData = getUserData();
  const [statsCount, setStatsCount] = useState();
  const tmsDashboardStatsData = async () => {
    try {
      const response = await translationdashboardStats(userData?.fkUserId);
      if (response?.success) {
        setStatsCount(response?.data);
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    tmsDashboardStatsData();
  }, []);

  return (
    <Layout
      module={true}
      sidebarItems={
        userData?.designation?.designationName === "Assistant Director"
          ? TMSsidebarItemsDirector
          : TMSsidebarItems
      }
      centerlogohide={true}
    >
      <div class="row">
        <div style={{ marginLeft: 15 }}>
          <h2
            style={{
              fontSize: "22px",
              fontWeight: "bold",
              marginBottom: "10px",
              color: "#fb6340",
            }}
          >
            Overall Stats
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
                    total={statsCount?.Question}
                    onClick={() => navigate("/tms/assigned-question")}
                  />
                  <NoticeStatsCard
                    title={"Motions"}
                    icon={faFileImport}
                    overall={true}
                    iconBgColor={"#007bff"}
                    total={statsCount?.Motion}
                    onClick={() => navigate("/tms/assigned-motion")}
                  />
                  <NoticeStatsCard
                    title={"Resolutions"}
                    icon={faHandshake}
                    overall={true}
                    iconBgColor={"#2dce89"}
                    total={statsCount?.Resolution}
                    onClick={() => navigate("/tms/assigned-resolution")}
                  />
                </div>

                <div class="row mt-4">
                  <NoticeStatsCard
                    title={"Government Bill From NA"}
                    icon={faClipboardQuestion}
                    overall={true}
                    iconBgColor={"#FFA500"}
                    total={statsCount?.GovernmentBill_FromNA}
                    onClick={() => navigate("/tms/legislation/government-bill-translation/recived-from-na")}
                  />
                  <NoticeStatsCard
                    title={"Government Bill From Senate"}
                    icon={faFileImport}
                    overall={true}
                    iconBgColor={"#007bff"}
                    total={statsCount?.GovernmentBill_FromSenate}
                    onClick={() => navigate("/tms/legislation/government-bill-translation/introduce-in-senate")}
                  />
                  <NoticeStatsCard
                    title={"Private Bill From NA"}
                    icon={faHandshake}
                    overall={true}
                    iconBgColor={"#2dce89"}
                    total={statsCount?.PrivateBill_FromNA}
                    onClick={() => navigate("/tms/legislation/private-bill-translation/recived-from-na")}
                  />
                </div>

                <div class="row mt-4">
                  <NoticeStatsCard
                    title={"Private Bill From Senate"}
                    icon={faClipboardQuestion}
                    overall={true}
                    iconBgColor={"#FFA500"}
                    total={statsCount?.PrivateBill_FromSenate}
                    onClick={() => navigate("/tms/legislation/private-bill-translation/introduce-in-senate")}
                  />
                  <NoticeStatsCard
                    title={"Finance Government Bill FromNA"}
                    icon={faFileImport}
                    overall={true}
                    iconBgColor={"#007bff"}
                    total={statsCount?.FinanceGovernmentBill_FromNA}
                    onClick={() => {
                      if(userData?.designation?.designationName === "Assistant Director"){
                        navigate("/tms/finance-bill")
                      }else{
                        navigate("/tms/finance-bill/assigined-list")
                      }}}
                  />
                  <NoticeStatsCard
                    title={"Legislative Bill"}
                    icon={faHandshake}
                    overall={true}
                    iconBgColor={"#2dce89"}
                    total={statsCount?.LegislativeBill_FromNotice}
                    onClick={() => {
                      if(userData?.designation?.designationName === "Assistant Director"){
                        navigate("/tms/legislativa-bill")
                      }else{
                        navigate("/tms/legislativa-bill/assigined-list")
                      }} }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default TMSDashboard;
