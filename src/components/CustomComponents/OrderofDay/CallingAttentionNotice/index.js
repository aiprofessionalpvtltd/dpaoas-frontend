import React, { useEffect, useState } from "react";
import moment from "moment";
import { getAllMotion } from "../../../../api/APIs/Services/Motion.service";
import { Layout } from "../../../Layout";
import CustomTable from "../../CustomTable";
import { LegislationSideBarItems } from "../../../../utils/sideBarItems";

function LGMSCallingAttentionNoticeOrderOfDay({
  callingAttentionNotice,
  setCallingAttentionNotice,
  Edit,
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(null);
  const [motionData, setMotionData] = useState([]);
  const [isChecked, setIsChecked] = useState([]);
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
        internalId: res?.id,
        nameOfMinistersOrMovers: res?.motionMovers[0]?.members?.memberName,
        SessionName: res?.sessions?.sessionName
          ? res?.sessions?.sessionName
          : "",
        motionType: res?.motionType ? res?.motionType : "",
        englishText: EnglishText ? EnglishText : "",
        urduText: UrduText ? UrduText : "",
        motionStatus: res?.motionStatuses?.statusName,
        memberPosition: res?.memberPosition,
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
        handleCheckedData(callingAttentionNotice, transformedData);
        setCount(filterData?.length);
        setMotionData(transformedData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMotionListData();
  }, []);

  useEffect(() => {
    if (isChecked?.length > 0) {
      localStorage.setItem("callingAttentionNotice", JSON.stringify(isChecked)); // ✅ Store as JSON string

      const checkedData = motionData?.filter((item) =>
        isChecked.includes(item?.id)
      );

      const updatedData = checkedData.map((item) => ({
        ...item,
        billTitle: `to move that the House may discuss ${item?.englishText}`,
      }));

      setCallingAttentionNotice(updatedData);
    } else {
      setCallingAttentionNotice([]);
    }
  }, [isChecked, motionData]);

  const handleCheckedData = async (callingAttentionNotice, motionData) => {
    if (Edit === true) {
      if (callingAttentionNotice && callingAttentionNotice.length > 0) {
        const updatedData = motionData.map((item) => {
          const found = callingAttentionNotice.find(
            (element) => element.id === item.id
          );

          if (found) {
            setIsChecked((prevChecked) => [...prevChecked, item.id]);
          }
          return item;
        });

        setMotionData(updatedData);
      } else {
        setMotionData(motionData);
      }
    } else {
      const data = localStorage.getItem("callingAttentionNotice");

      if (data) {
        try {
          const parsedData = JSON.parse(data); // ✅ Parse back into an array
          if (Array.isArray(parsedData)) {
            setIsChecked(parsedData); // ✅ Ensure it's an array before setting
          }
        } catch (error) {
          console.error("Error parsing localStorage data:", error);
          setIsChecked([]); // Reset on error
        }
      }
    }
  };

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
        tableTitle="Call Attention Notice"
        headertitlebgColor={"#666"}
        singleDataCard={true}
        headertitletextColor={"#FFF"}
        handlePageChange={handlePageChange}
        currentPage={currentPage}
        pageSize={pageSize}
        totalCount={count ? count : 0}
        showPrint={false}
        hideDeleteIcon={false}
        ActionHide={true}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
        isCheckbox={true}
      />
    </Layout>
  );
}

export default LGMSCallingAttentionNoticeOrderOfDay;
