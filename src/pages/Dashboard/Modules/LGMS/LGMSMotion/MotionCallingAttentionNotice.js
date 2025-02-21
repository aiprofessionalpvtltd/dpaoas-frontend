import React, { useEffect, useState } from "react";
import { Layout } from "../../../../../components/Layout";
import { LegislationSideBarItems } from "../../../../../utils/sideBarItems";
import moment from "moment";
import { getAllMotion } from "../../../../../api/APIs/Services/Motion.service";
import CustomTable from "../../../../../components/CustomComponents/CustomTable";

function LGMSMotionCallingAttentionNotice() {
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(null);
  const [motionData, setMotionData] = useState([]);
  const pageSize = 10; // Set your desired page size

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
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
        memberPosition: res?.memberPosition,
        device: res?.device,
        createdBy:
          res?.motionSentStatus === "toMotion"
            ? "From Notice Office"
            : res?.motionSentStatus === "inMotion"
              ? "Motion Branch"
              : "---",
      };
    });
  };

  const getMotionListData = async () => {
    const motionSentStatus = "toLegislation";
    const motiontoStatus = "toLegislation";
    try {
      const response = await getAllMotion(
        currentPage,
        pageSize,
        motionSentStatus,
        motiontoStatus
      );
      if (response?.success) {
        const filterData = response?.data?.rows.filter(
          (item) => item?.motionType === "Call Attention Notice"
        );
        const transformedData = transformMotionData(filterData);
        setCount(response?.data?.count);
        setMotionData(transformedData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMotionListData();
  }, [currentPage]);
  return (
    <Layout
      module={true}
      sidebarItems={LegislationSideBarItems}
      centerlogohide={true}
    >
      <CustomTable
        data={motionData}
        seachBarShow={false}
        hideBtn={true}
        hidebtn1={true}
        block={true}
        tableTitle="Calling Attention Notice"
        headertitlebgColor={"#666"}
        singleDataCard={true}
        headertitletextColor={"#FFF"}
        handlePageChange={handlePageChange}
        currentPage={currentPage}
        pageSize={pageSize}
        totalCount={count ?count : 0}
        showPrint={false}
        hideDeleteIcon={false}
        ActionHide={true}
      />
    </Layout>
  );
}

export default LGMSMotionCallingAttentionNotice;
