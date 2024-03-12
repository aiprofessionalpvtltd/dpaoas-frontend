import React, { useEffect, useState } from "react";
import { Layout } from "../../../../components/Layout";
import { NoticeSidebarItems } from "../../../../utils/sideBarItems";
import { useNavigate } from "react-router-dom";
import Header from "../../../../components/Header";
import CustomTable from "../../../../components/CustomComponents/CustomTable";
import NoticeStatsCard from "../../../../components/CustomComponents/NoticeStatsCard";
import { getAllNoticeStats } from "../../../../api/APIs/Services/Notice.service";
import { faClipboardQuestion, faFileImport, faObjectGroup, faScaleBalanced } from "@fortawesome/free-solid-svg-icons";

const data = [
  {
    id: 1,
    name: "IT",
    description: "IT Things",
    roleStatus: "active",
    createdAt: "2023-11-17T07:44:24.020Z",
    updatedAt: "2023-11-17T07:44:24.020Z",
  },
  {
    id: 2,
    name: "HRM",
    description: "Human Resource Management",
    roleStatus: "active",
    createdAt: "2023-11-24T09:58:14.137Z",
    updatedAt: "2023-11-24T09:58:14.137Z",
  },
];

function NoticeDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 4; // Set your desired page size

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  // Get All Toner MOdels
  const GetAllNoticeStatsApi = async () => {
    try {
      const response = await getAllNoticeStats(0, 100);
      if (response.success) {
        setStats(response?.data);
      }
    } catch (error) {
      console.log(error);
      // showErrorMessage(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    GetAllNoticeStatsApi();
  }, []);

  return (
    <Layout module={true} sidebarItems={NoticeSidebarItems} centerlogohide={true}>
      <Header dashboardLink={"/"} title1={"Notice"} />
      <div style={{ marginLeft: 15 }}>
        <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '10px', color: "#fb6340" }}>Daily Stats</h2>
        <div class="row">
          <div class="col-md-12">
            <div class="mt-2 mb-4">
              <div class="row">
                <NoticeStatsCard title={"Question"} icon={faClipboardQuestion} iconBgColor={"#FFA500"} total={`${stats?.questions?.dailySendQuestions + stats?.questions?.dailyRecievedQuestions}`} sent={stats?.questions?.dailySendQuestions} received={stats?.questions?.dailyRecievedQuestions} />
                <NoticeStatsCard title={"Motion"} icon={faFileImport} iconBgColor={"#007bff"} total={`${stats?.motions?.dailySendMotions + stats?.motions?.dailyRecievedMotions}`} sent={stats?.motions?.dailySendMotions} received={stats?.motions?.dailyRecievedMotions} />
                <NoticeStatsCard title={"Legislation"} icon={faScaleBalanced} iconBgColor={"#2dce89"} total={`${stats?.legislation?.sentToBranchesQ + stats?.legislation?.initiatedByBranchesQ}`} sent={stats?.legislation?.sentToBranchesQ} received={stats?.legislation?.initiatedByBranchesQ} />
              </div>
            </div>
          </div>
        </div>

        <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '10px', color: "#f5365c" }}>Monthly Stats</h2>
        <div class="row">
          <div class="col-md-12">
            <div class="mt-2 mb-4">
              <div class="row">
              <NoticeStatsCard title={"Question"} icon={faClipboardQuestion} overall={true} iconBgColor={"#FFA500"} total={`${stats?.monthlyQuestions}`} />
              <NoticeStatsCard title={"Motion"} icon={faFileImport} overall={true} iconBgColor={"#007bff"} total={`${stats?.monthlyMotions}`} />
              <NoticeStatsCard title={"Legislation"} icon={faScaleBalanced} overall={true} iconBgColor={"#2dce89"} total={`${stats?.totalLegislations}`} />
              </div>
            </div>
          </div>
        </div>

        <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '10px', color: "#0177b4" }}>Upcoming Session Stats</h2>
        <div class="row">
          <div class="col-md-12">
            <div class="mt-2 mb-4">
              <div class="row">
              <NoticeStatsCard upcoming={true} title={"Question"} icon={faClipboardQuestion} iconBgColor={"#FFA500"} total={`${stats?.sessionWiseQuestions}`} />
              <NoticeStatsCard upcoming={true} title={"Motion"} icon={faFileImport} iconBgColor={"#007bff"} total={`${stats?.sessionWiseMotions}`} />
              <NoticeStatsCard upcoming={true} title={"Legislation"} icon={faScaleBalanced} iconBgColor={"#2dce89"} total={`${stats?.totalLegislations}`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default NoticeDashboard;