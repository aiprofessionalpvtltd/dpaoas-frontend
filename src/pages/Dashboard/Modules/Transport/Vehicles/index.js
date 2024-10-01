import React, { useEffect, useState } from "react";
// import { Layout } from "../../../components/Layout";
// import { TransportSideBarItems } from "../../../../utils/sideBarItems";
import { useNavigate } from "react-router-dom";
// import Header from "../../../../components/Header";
// import NoticeStatsCard from "../../../../components/CustomComponents/NoticeStatsCard";
// import {
//   getAllNoticeStats,
//   getAllResarchServices,
//   getAllSpeachOnDemand,
// } from "../../../../api/APIs/Services/Notice.service";
import { Layout } from "../../../../../components/Layout";
import Header from "../../../../../components/Header";
import NoticeStatsCard from "../../../../../components/CustomComponents/NoticeStatsCard";
import { TransportSideBarItems } from "../../../../../utils/sideBarItems";
import {
  faBook,
  faGasPump,
  faTruckMonster,
  faVanShuttle,
} from "@fortawesome/free-solid-svg-icons";

import {
  getAllNoticeStats,
  getAllResarchServices,
  getAllSpeachOnDemand,
} from "../../../../../api/APIs/Services/Notice.service";

function VehiclesInformation() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [todaySpeach, setTodaySpeach] = useState(0);
  const [todayservices, setTodayservices] = useState(0);

  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10; // Set your desired page size

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const GetAllNoticeStatsApi = async () => {
    try {
      const response = await getAllNoticeStats(0, 100);
      if (response.success) {
        setStats(response?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  const getAllSpeachOnDemandAPi = async () => {
    try {
      const response = await getAllSpeachOnDemand(0, 200);
      if (response?.success) {
        const todaycount = response?.data?.speechOnDemand.filter(
          (item) => item.createdAt.split("T")[0] === today
        ).length;
        setTodaySpeach(todaycount);
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  const getAllResarchServicesApi = async () => {
    try {
      const response = await getAllResarchServices(0, 200);
      if (response?.success) {
        const todaycount = response?.data?.researchServiceData?.filter(
          (item) => item.createdAt.split("T")[0] === today
        ).length;
        setTodayservices(todaycount);
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getAllSpeachOnDemandAPi();
    getAllResarchServicesApi();
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
          Vehicles Information
        </h2>
        <div className="row">
          <div className="col-md-12 col">
            <div className="mt-2 mb-4">
              <div className="row">
                <NoticeStatsCard
                  title={"Profile"}
                  icon={faBook}
                  overall={true}
                  iconBgColor={"#FFA500"}
                  ColValue={"col"}
                  total={`${stats?.monthlyQuestions}`}
                  onClick={() => navigate("/transport/vehicles/profiles")}
                  style={{ padding: "20px" }} // Added padding
                />
                <NoticeStatsCard
                  title={"Log Book"}
                  icon={faGasPump}
                  overall={true}
                  ColValue={"col"}
                  iconBgColor={"green"}
                  total={`${stats?.monthlyMotions}`}
                  onClick={() => navigate("/transport/vehicles/log-book")}
                  style={{ padding: "20px" }} // Added padding
                />
                <NoticeStatsCard
                  title={"Mov. Register"}
                  icon={faVanShuttle}
                  overall={true}
                  ColValue={"col"}
                  iconBgColor={"#007bff"}
                  total={`${stats?.monthlyMotions}`}
                  onClick={() =>
                    navigate("/transport/vehicles/movement-register")
                  }
                  style={{ padding: "20px" }}
                />
                <NoticeStatsCard
                  title={"Operat. Status"}
                  icon={faTruckMonster}
                  overall={true}
                  ColValue={"col"}
                  iconBgColor={"rgb(45, 206, 137)"}
                  total={`${stats?.monthlyMotions}`}
                  onClick={() =>
                    navigate("/transport/vehicles/operational-status")
                  }
                  style={{ padding: "20px" }} // Added padding
                />
                <NoticeStatsCard
                  title={"Purchases"}
                  icon={faTruckMonster}
                  overall={true}
                  ColValue={"col"}
                  iconBgColor={"rgb(45, 206, 137)"}
                  total={`${stats?.monthlyMotions}`}
                  onClick={() => navigate("/transport/vehicles/purchases")}
                  style={{ padding: "20px" }} // Added padding
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default VehiclesInformation;
