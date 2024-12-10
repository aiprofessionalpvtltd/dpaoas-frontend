import React, { useEffect, useState } from "react";
import { Layout } from "../../../../components/Layout";
import { NoticeSidebarItems } from "../../../../utils/sideBarItems";
import { useNavigate } from "react-router-dom";
import Header from "../../../../components/Header";
import CustomTable from "../../../../components/CustomComponents/CustomTable";
import NoticeStatsCard from "../../../../components/CustomComponents/NoticeStatsCard";
import {
  getAllNoticeStats,
  getAllResarchServices,
  getAllSpeachOnDemand,
} from "../../../../api/APIs/Services/Notice.service";
import {
  faClipboardQuestion,
  faFileImport,
  faObjectGroup,
  faScaleBalanced,
} from "@fortawesome/free-solid-svg-icons";
import AllQuestionComponent from "./NoticeComponents/Question";
import SentMotions from "./NoticeComponents/Motion";
import SentResolutionList from "./NoticeComponents/Resolution";
import LegislativeBillList from "./legislationBusiness/LegislativeBill";

function NoticeDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState("Question");

  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10; // Set your desired page size

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

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    GetAllNoticeStatsApi();
  }, []);

  // Function to render selected component based on state
  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case "Question":
        return <AllQuestionComponent isDashboardData={true} />;
      case "Motion":
        return <SentMotions isDashboardData={true} />;
      case "Resolution":
        return <SentResolutionList isDashboardData={true} />;
      case "Private Member Bill":
        return <LegislativeBillList isDashboardData={true} />;
      default:
        return null;
    }
  };

  return (
    <Layout
      module={true}
      sidebarItems={NoticeSidebarItems}
      centerlogohide={true}
    >
      <Header dashboardLink={"/"} title1={"Notice"} />
      <div style={{ marginLeft: 15 }}>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            marginBottom: "10px",
            color: "#fb6340",
          }}
        >
          Current Businesses
        </h2>
        <div class="row">
          <div class="col-md-12">
            <div class="mt-2 mb-4">
              <div class="row">
                <NoticeStatsCard
                  title={"Question"}
                  icon={faClipboardQuestion}
                  overall={true}
                  iconBgColor={"#FFA500"}
                  total={`${stats?.questions?.dailyRecievedQuestions ?? 0}`}
                  ColValue={`col-3`}
                  onClick={() => setSelectedComponent("Question")}
                />
                <NoticeStatsCard
                  title={"Motion"}
                  icon={faFileImport}
                  overall={true}
                  iconBgColor={"#007bff"}
                  total={`${
                    stats?.motions?.dailyRecievedMotions
                      ? stats?.motions?.dailyRecievedMotions
                      : 0
                  }`}
                  ColValue={`col-3`}
                  onClick={() => setSelectedComponent("Motion")}
                />

                <NoticeStatsCard
                  title={"Resolution"}
                  icon={faScaleBalanced}
                  overall={true}
                  iconBgColor={"#2dce89"}
                  total={`${
                    stats?.resolutions?.dailyReceivedResolutions
                      ? stats?.resolutions?.dailyReceivedResolutions
                      : 0
                  }`}
                  ColValue={`col-3`}
                  onClick={() => setSelectedComponent("Resolution")}
                />
                <NoticeStatsCard
                  title={"Private Member Bills"}
                  icon={faScaleBalanced}
                  overall={true}
                  iconBgColor={"#2dce89"}
                  total={`${
                    stats?.legislativeBills?.dailyReceivedLegislativeBills
                      ? stats?.legislativeBills?.dailyReceivedLegislativeBills
                      : 0
                  }`}
                  ColValue={`col-3`}
                  onClick={() => setSelectedComponent("Private Member Bill")}
                />
                {/* <NoticeStatsCard
                  title={"Question"}
                  icon={faClipboardQuestion}
                  iconBgColor={"#FFA500"}
                  // total={`${stats?.monthlyQuestions}`}
                  ColValue={`col-3`}
                  total={
                    `${stats?.questions?.dailySendQuestions}` +
                    `${stats?.questions?.dailyRecievedQuestions}`
                  }
                  // sent={stats?.questions?.dailySendQuestions}
                  // received={stats?.questions?.dailyRecievedQuestions}
                  // onClick={() => navigate("/notice/question/sent")}
                  onClick={() => setSelectedComponent("Question")}
                /> */}
                {/* <NoticeStatsCard
                  title={"Motion"}
                  icon={faFileImport}
                  iconBgColor={"#007bff"}
                  ColValue={`col-3`}
                  // total={`${
                  //   stats?.motions?.dailySendMotions +
                  //   stats?.motions?.dailyRecievedMotions
                  // }`}
                  // sent={stats?.motions?.dailySendMotions}
                  // received={stats?.motions?.dailyRecievedMotions}
                  // onClick={() => navigate("/notice/motion/sent")}
                  onClick={() => setSelectedComponent("Motion")}
                /> */}
                {/* <NoticeStatsCard
                  title={"Resolution"}
                  icon={faScaleBalanced}
                  iconBgColor={"#2dce89"}
                  ColValue={`col-3`}
                  // total={`${
                  //   stats?.motions?.dailySendMotions +
                  //   stats?.motions?.dailyRecievedMotions
                  // }`}
                  // sent={stats?.motions?.dailySendMotions}
                  // received={stats?.motions?.dailyRecievedMotions}
                  onClick={() => setSelectedComponent("Resolution")}
                /> */}
                {/* <NoticeStatsCard
                  title={"Private Member Bill"}
                  icon={faScaleBalanced}
                  iconBgColor={"#2dce89"}
                  ColValue={`col-3`}
                  // total={`${
                  //   stats?.motions?.dailySendMotions +
                  //   stats?.motions?.dailyRecievedMotions
                  // }`}
                  // sent={stats?.motions?.dailySendMotions}
                  // received={stats?.motions?.dailyRecievedMotions}
                  onClick={() => setSelectedComponent("Private Member Bill")}
                /> */}

                {/* <NoticeStatsCard title={"Legislation"} icon={faScaleBalanced} iconBgColor={"#2dce89"} total={`${stats?.legislation?.sentToBranchesQ + stats?.legislation?.initiatedByBranchesQ}`} sent={stats?.legislation?.sentToBranchesQ} received={stats?.legislation?.initiatedByBranchesQ} /> */}
              </div>
            </div>
          </div>
        </div>

        <h2
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            marginBottom: "10px",
            color: "#f5365c",
          }}
        >
          Overall Businesses
        </h2>
        <div class="row">
          <div class="col-md-12">
            <div class="mt-2 mb-4">
              <div class="row">
                <NoticeStatsCard
                  title={"Question"}
                  icon={faClipboardQuestion}
                  overall={true}
                  iconBgColor={"#FFA500"}
                  total={`${stats?.questions?.totalReceivedQuestions ?? 0}`}
                  ColValue={`col-3`}
                  onClick={() => navigate("/notice/question/sent")}
                />
                <NoticeStatsCard
                  title={"Motion"}
                  icon={faFileImport}
                  overall={true}
                  iconBgColor={"#007bff"}
                  total={`${stats?.motions?.totalReceivedMotions ?? 0}`}
                  ColValue={`col-3`}
                  onClick={() => navigate("/notice/motion/sent")}
                />
                <NoticeStatsCard
                  title={"Resolution"}
                  icon={faScaleBalanced}
                  overall={true}
                  iconBgColor={"#2dce89"}
                  total={`${stats?.resolutions?.totalReceivedResolutions ?? 0}`}
                  ColValue={`col-3`}
                  onClick={() => navigate("/notice/resolution/sent")}
                />
                <NoticeStatsCard
                  title={"Private Member Bills"}
                  icon={faScaleBalanced}
                  overall={true}
                  iconBgColor={"#2dce89"}
                  total={`${
                    stats?.legislativeBills?.totalReceivedLegislativeBills ?? 0
                  }`}
                  ColValue={`col-3`}
                  onClick={() => navigate("/notice/legislation/private-bill")}
                />
              </div>
            </div>
          </div>
        </div>
        {/* <div>
          <AllQuestionComponent />
        </div>
        <div>
          <SentMotions />
        </div>
        <div>
          <SentResolutionList />
        </div> */}
        {renderSelectedComponent()}
      </div>
    </Layout>
  );
}

export default NoticeDashboard;
