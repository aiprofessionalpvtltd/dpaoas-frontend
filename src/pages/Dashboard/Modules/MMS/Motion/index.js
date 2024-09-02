import React, { useEffect, useState } from "react";
import Header from "../../../../../components/Header";
import { MMSSideBarItems } from "../../../../../utils/sideBarItems";
import { Layout } from "../../../../../components/Layout";
import NoticeStatsCard from "../../../../../components/CustomComponents/NoticeStatsCard";
import {
  faClipboardQuestion,
  faHandshake,
} from "@fortawesome/free-solid-svg-icons";
import { showErrorMessage } from "../../../../../utils/ToastAlert";
import { dashboardMotionStats, getMotionByID } from "../../../../../api/APIs/Services/Motion.service";
import CustomTable from "../../../../../components/CustomComponents/CustomTable";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function MMSMotionDashboard() {
  const navigate = useNavigate()
  const [stats, setStats] = useState(null);
  const [count, setCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
const [filterData, setFIlterData] = useState([])


  const pageSize = 10; // Set your desired page size

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };
  const getAllMotionDashboardAPi = async () => {
    try {
      const response = await dashboardMotionStats();
      if (response?.success) {
        setStats(response?.data);
      }
    } catch (error) {
      showErrorMessage(error.response?.data?.message);
    }
  };
  const transformMotionData = (apiData) => {
    return apiData.map((res, index) => {
      const english = [res?.englishText].filter(Boolean).join(", ");
      const EnglishText = english.replace(/(<([^>]+)>)/gi, "");

      const urdu = [res?.urduText].filter(Boolean).join(", ");
      const UrduText = urdu.replace(/(<([^>]+)>)/gi, "");

      return {
        id: res?.id,
        memberName: res?.motionMovers[0]?.members?.memberName,
        SessionName: res?.sessions?.sessionName
          ? res?.sessions?.sessionName
          : "",
        motionType: res?.motionType ? res?.motionType : "",
        noticeOfficeDiaryNo: res?.noticeOfficeDairies?.noticeOfficeDiaryNo
          ? res?.noticeOfficeDairies?.noticeOfficeDiaryNo
          : "",
        noticeOfficeDiaryDate: res?.noticeOfficeDairies?.noticeOfficeDiaryDate
          ? moment(res?.noticeOfficeDairies?.noticeOfficeDiaryDate).format(
              "DD-MM-YYYY"
            )
          : "",
        noticeOfficeDiaryTime: res?.noticeOfficeDairies?.noticeOfficeDiaryTime
          ? moment(
              res?.noticeOfficeDairies?.noticeOfficeDiaryTime,
              "hh:ss A"
            ).format("hh:ss A")
          : "",
        englishText: EnglishText ? EnglishText : "",
        urduText: UrduText ? UrduText : "",
        motionStatus: res?.motionStatuses?.statusName,
        memberPosition:res?.memberPosition,
        device:res?.device,
        createdBy:res?.motionSentStatus === "toMotion" ? "From Notice Office": res?.motionSentStatus === "inMotion" ? "Motion Branch":"---"
      };
    });
  };
  useEffect(() => {
    getAllMotionDashboardAPi();
  }, []);
  
  const hendleEdit = async (id) => {
    try {
      const response = await getMotionByID(id);

      if (response?.success) {
        navigate("/mms/motion/detail", { state: response?.data });
      }
    } catch (error) {
      showErrorMessage(error.response?.data?.message);
    }
  };
  const hendlePrint = async (id) => {
    const encodedJsonString = encodeURIComponent(id);
    const url = `/mms/motion/preview-pdf?state=${encodedJsonString}`;
    window.open(url, "_blank");
  };
// FIltered Data
const filteredMotionData = filterData.filter((motion) =>
  motion?.motionStatus?.toLowerCase().includes(searchTerm?.toLowerCase())
);
  return (
    <Layout module={true} sidebarItems={MMSSideBarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/mms/dashboard"}
        addLink1={"/mms/dashboard"}
        title1={"Motion"}
      />
        <div className="container-fluid">
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
                  total={stats?.motionTypeData?.MotionUnderRule218?.count}
                  onClick={() =>{
                    const datas =  transformMotionData(stats?.motionTypeData?.MotionUnderRule218?.motions)
                    setFIlterData(datas)
                  }
                  }
                />
                <NoticeStatsCard
                  title={"Calling Attention Notice"}
                  icon={faHandshake}
                  overall={true}
                  iconBgColor={"#007bff"}
                  total={stats?.motionTypeData?.CallAttentionNotice?.count}
                  onClick={() =>{
                    const datas =  transformMotionData(stats?.motionTypeData?.CallAttentionNotice?.motions)
                    setFIlterData(datas)
                  }
                  }
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
                  total={stats?.motionTypeData?.AdjournmentMotion?.count}
                  onClick={() =>{
                    const datas =  transformMotionData(stats?.motionTypeData?.AdjournmentMotion?.motions)
                    setFIlterData(datas)
                  }
                  }
                />

                <NoticeStatsCard
                  title={"Privilege Motions"}
                  icon={faHandshake}
                  overall={true}
                  iconBgColor={"#007bff"}
                  total={stats?.motionTypeData?.PrivilegeMotion?.count}
                  onClick={() =>{
                    const datas =  transformMotionData(stats?.motionTypeData?.PrivilegeMotion?.motions)
                    setFIlterData(datas)
                  }
                  }
                />
              </div>
            </div>
          </div>
        </div>
        </div>
        <div class="row">
          <div class="col-12">
            {filterData && filterData.length > 0 && (
                <CustomTable
                  data={filteredMotionData}
                  seachBarShow={true}
                  searchonchange={(e) => setSearchTerm(e.target.value)}
                  hideBtn={true}
                  hidebtn1={true}
                  block={true}
                  tableTitle="Motion Detail"
                  headertitlebgColor={"#666"}
                  singleDataCard={true}
                  headertitletextColor={"#FFF"}
                  handlePageChange={handlePageChange}
                  currentPage={currentPage}
                  pageSize={pageSize}
                  totalCount={count}
                  showPrint={true}
                  handlePrint={(item) => hendlePrint(item?.id)}
                  hideDeleteIcon={true}
                  handleEdit={(item) => hendleEdit(item?.id)}
                />
              )}
          </div>
        </div>
    </Layout>
  );
}

export default MMSMotionDashboard;
