import React, { useEffect, useState } from "react";
import { Layout } from "../../../../../components/Layout";
import { LegislationSideBarItems } from "../../../../../utils/sideBarItems";
import CustomTable from "../../../../../components/CustomComponents/CustomTable";
import { getAllResolutions } from "../../../../../api/APIs/Services/Resolution.service";

function LGMSResolution() {
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(null);
  const [resolutionData, setResolutionData] = useState([]);
  const pageSize = 10; // Set your desired page size

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  const transformResolutionData = (apiData) => {
    return apiData.map((leave) => {
      const subjectMatter = [leave?.englishText, leave?.urduText]
        .filter(Boolean)
        .join(", ");
      const cleanedSubjectMatter = subjectMatter.replace(/(<([^>]+)>)/gi, "");
      return {
        SrNo: leave.id,
        memberName: leave?.resolutionMoversAssociation[0]?.memberAssociation?.memberName,
        SessionNumber: leave?.session?.sessionName
          ? leave?.session?.sessionName
          : "",
        ResolutionType: leave?.resolutionType ? leave?.resolutionType : "",
        SubjectMatter: cleanedSubjectMatter ? cleanedSubjectMatter : "",
        NoticeNo: leave?.noticeDiary?.noticeOfficeDiaryNo
          ? leave?.noticeDiary?.noticeOfficeDiaryNo
          : "",
        ResolutionStatus: leave?.resolutionStatus?.resolutionStatus
          ? leave?.resolutionStatus?.resolutionStatus
          : "",
        Status: leave?.resolutionActive ? leave?.resolutionActive : "",
        device : leave?.device,
        createdBy:leave?.resolutionSentStatus === "toResolution" ? "Notice Office": "---"
      };
    });
  };

  const getResolutionListData = async () => {
    const resolutionSentStatus = "toLegislation"
    try {
      const response = await getAllResolutions(
        currentPage,
        pageSize,
        resolutionSentStatus,
      );
      if (response?.success) {
        const transformedData = transformResolutionData(response?.data?.resolution);
        setCount(response?.data?.count);
        setResolutionData(transformedData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getResolutionListData();
  }, []);
  return (
    <Layout
      module={true}
      sidebarItems={LegislationSideBarItems}
      centerlogohide={true}
    >
      <CustomTable
        data={resolutionData}
        seachBarShow={false}
        hideBtn={true}
        hidebtn1={true}
        block={true}
        tableTitle="Resolution"
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

export default LGMSResolution;
