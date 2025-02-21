import React, { useEffect, useState } from "react";
import moment from "moment";
import { getAllMotion } from "../../../../api/APIs/Services/Motion.service";
import { Layout } from "../../../Layout";
import CustomTable from "../../CustomTable";
import { LegislationSideBarItems } from "../../../../utils/sideBarItems";

function LGMSMotionUnderRule218OrderofDay({
  motionUnderRule218,
  setMotionUnderRule218,
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
          (item) => item?.motionType === "Motion Under Rule 218"
        );
        const transformedData = transformMotionData(filterData);
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
      localStorage.setItem("MotionUnderRule218", isChecked);
      const checkedData = motionData?.filter((item) =>
        isChecked.includes(item?.id)
      );

      const updatedData = checkedData.flatMap((item) => [
        {
          ...item,
          billTitle: `to move that the House may discuss ${item?.englishText}`,
        },
      ]);
      setMotionUnderRule218(updatedData);
    } else {
      setMotionUnderRule218([]);
    }
  }, [isChecked, motionData]);

  useEffect(() => {
    const data = localStorage.getItem("MotionUnderRule218");
    if (data?.length > 0) {
      setIsChecked(data);
    }
    if (Edit === true) {
      if (motionUnderRule218 && motionUnderRule218?.length > 0) {
        const updatedData = motionData.map((item) => {
          const found = motionUnderRule218.find(
            (element) => element.id === item.id
          );

          if (found) {
            setIsChecked((prevChecked) => [...prevChecked, item.id]); // Push ID if found
          }
          return item;
        });

        setMotionData(updatedData);
      } else {
        setMotionData(motionData);
      }
    }
  }, []);
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
        tableTitle="Motion Under Rule 218"
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

export default LGMSMotionUnderRule218OrderofDay;
