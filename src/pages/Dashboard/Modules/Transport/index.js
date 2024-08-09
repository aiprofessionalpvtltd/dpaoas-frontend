import React, { useEffect, useState } from "react";
import { Layout } from "../../../../components/Layout";
import { TransportSideBarItems } from "../../../../utils/sideBarItems";
import { useNavigate } from "react-router-dom";
import Header from "../../../../components/Header";
import NoticeStatsCard from "../../../../components/CustomComponents/NoticeStatsCard";
import { getAllNoticeStats, getAllResarchServices, getAllSpeachOnDemand } from "../../../../api/APIs/Services/Notice.service";
import {
    faBook, faTruckMonster,
    faVanShuttle
} from "@fortawesome/free-solid-svg-icons";

function TransportDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [todaySpeach, setTodaySpeach] = useState(0);
  const [todayservices, setTodayservices] = useState(0);


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


  const today = new Date().toISOString().split('T')[0];

  const getAllSpeachOnDemandAPi = async () => {
    try {
      const response = await getAllSpeachOnDemand(0, 200);
      if (response?.success) {
        const todaycount = response?.data?.speechOnDemand.filter(item => item.createdAt.split('T')[0] === today).length
        setTodaySpeach(todaycount)
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  }

  const getAllResarchServicesApi = async () => {
    try {
      const response = await getAllResarchServices(0, 200);
      if (response?.success) {
        const todaycount = response?.data?.researchServiceData?.filter(item => item.createdAt.split('T')[0] === today).length
        setTodayservices(todaycount)
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getAllSpeachOnDemandAPi()
    getAllResarchServicesApi()
    GetAllNoticeStatsApi();
  }, []);

  return (
    <Layout
      module={true}
      sidebarItems={TransportSideBarItems}
      centerlogohide={true}
    >
      <Header dashboardLink={"/"} title1={"Transport"} />
      <div style={{ marginLeft: 15 }}>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            marginBottom: "10px",
            color: "#f5365c",
          }}
        >
          Transport Branch
        </h2>
        <div class="row">
          <div class="col-md-12">
            <div class="mt-2 mb-4">
              <div class="row">
                <NoticeStatsCard
                  title={"Log Book"}
                  icon={faBook}
                  overall={true}
                  iconBgColor={"#FFA500"}
                  total={`${stats?.monthlyQuestions}`}
                />
                <NoticeStatsCard
                  title={"Vehicle Movement"}
                  icon={faVanShuttle}
                  overall={true}
                  iconBgColor={"#007bff"}
                  total={`${stats?.monthlyMotions}`}
                />
                <NoticeStatsCard
                  title={"Fleet Management"}
                  icon={faTruckMonster}
                  overall={true}
                  iconBgColor={"#007bff"}
                  total={`${stats?.monthlyMotions}`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default TransportDashboard;