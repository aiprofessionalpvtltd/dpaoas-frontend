import React, { useEffect, useState } from "react";
import CustomTable from "../../../../../components/CustomComponents/CustomTable";
import { ToastContainer } from "react-toastify";
import Header from "../../../../../components/Header";
import { Layout } from "../../../../../components/Layout";
import { NoticeSidebarItems } from "../../../../../utils/sideBarItems";
import { getAllMotion } from "../../../../../api/APIs/Services/Motion.service";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { showErrorMessage } from "../../../../../utils/ToastAlert";

export const MotionListing = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(null);
  const [motionData, setMotionData] = useState([]);
  const pageSize = 10; // Set your desired page size

  const transformMotionData = (apiData) => {
    return apiData.map((res, index) => {
      const english = [res?.englishText].filter(Boolean).join(", ");
      const EnglishText = english.replace(/(<([^>]+)>)/gi, "");

      const urdu = [res?.urduText].filter(Boolean).join(", ");
      const UrduText = urdu.replace(/(<([^>]+)>)/gi, "");

      return {
        id: res?.id,
        sessionId: res?.sessions?.id,
        fileNumber: res?.fileNumber,
        motionType: res?.motionType,
        motionWeek: "",
        noticeOfficeDiaryNo: res?.noticeOfficeDairies?.noticeOfficeDiaryNo,
        // ministryName: leave?.motionMinistries?.ministries,
        // ministryIds: leave?.motionMinistries?.fkMinistryId,
        noticeOfficeDiaryDate: moment(
          res?.noticeOfficeDairies?.noticeOfficeDiaryDate
        ).format("DD-MM-YYYY"),
        noticeOfficeDiaryTime: res?.noticeOfficeDairies?.noticeOfficeDiaryTime,
        // memberName:leave?.motionMovers?.members,
        englishText: EnglishText,
        urduText: UrduText,
        motionStatus: res?.motionStatuses?.statusName,
      };
    });
  };

  const getMotionListData = async () => {
    try {
      const response = await getAllMotion(currentPage, pageSize);
      if (response?.success) {
        // showSuccessMessage(response?.message);
        setCount(response?.data?.count);
        const transformedData = transformMotionData(response?.data?.rows);
        setMotionData(transformedData);
      }
    } catch (error) {
      console.log(error);
      showErrorMessage(error?.response?.data?.error);
    }
  };

  useEffect(() => {
    getMotionListData();
  }, [currentPage]);

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  return (
    <Layout
      module={true}
      sidebarItems={NoticeSidebarItems}
      centerlogohide={true}
    >
      <ToastContainer />
      <Header
        dashboardLink={"/notice/dashboard"}
        addLink1={"/notice/motion/sent"}
        title1={"Sent Motion"}
      />
      <div>
        <div class="container-fluid dash-detail-container">
          <div class="card mt-1">
            <div
              class="card-header red-bg"
              style={{ background: "#14ae5c !important" }}
            >
              <h1>MOTION LISTING</h1>
            </div>
            <div class="card-body">
              <div class="" style={{ marginTop: "20px" }}>
                <CustomTable
                  block={true}
                  data={motionData}
                  headerShown={true}
                  handleDelete={(item) => alert(item.id)}
                  handleEdit={(item) =>
                    navigate("/mms/motion/new", { state: item })
                  }
                  headertitlebgColor={"#666"}
                  headertitletextColor={"#FFF"}
                  handlePageChange={handlePageChange}
                  currentPage={currentPage}
                  pageSize={pageSize}
                  totalCount={count}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
