import React, { useEffect, useState } from "react";
import { Layout } from "../../../Layout";
import { LegislationSideBarItems } from "../../../../utils/sideBarItems";
import CustomTable from "../../CustomTable";
import { getAllResolutions } from "../../../../api/APIs/Services/Resolution.service";

function LGMSResolutionOrderOfDay({
  resolutionOrderOfDay,
  setResolutionOrderOfDay,
  Edit,
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(null);
  const [resolutionData, setResolutionData] = useState([]);
  const [isChecked, setIsChecked] = useState([]);
  const pageSize = 10; // Set your desired page size
  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  const transformResolutionData = (apiData) => {
    return apiData.map((leave, index) => {
      const subjectMatter = [leave?.englishText, leave?.urduText]
        .filter(Boolean)
        .join(", ");
      const cleanedSubjectMatter = subjectMatter.replace(/(<([^>]+)>)/gi, "");
      return {
        SrNo: index + 1,
        id: leave.id,
        nameOfMinistersOrMovers: leave?.resolutionMoversAssociation?.map(
          (item) => item?.memberAssociation?.memberName
        ),
        SessionNumber: leave?.session?.sessionName
          ? leave?.session?.sessionName
          : "",
        internalId: leave?.id,
        ResolutionType: leave?.resolutionType ? leave?.resolutionType : "",
        SubjectMatter: cleanedSubjectMatter ? cleanedSubjectMatter : "",
      };
    });
  };

  const getResolutionListData = async () => {
    const resolutionSentStatus = "toLegislation";
    try {
      const response = await getAllResolutions(
        currentPage,
        pageSize,
        resolutionSentStatus
      );
      if (response?.success) {
        const transformedData = transformResolutionData(
          response?.data?.resolution
        );
        handleCheckedData(resolutionOrderOfDay, transformedData);
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

  useEffect(() => {
    if (isChecked?.length > 0) {
      localStorage.setItem("resolution", JSON.stringify(isChecked)); // ✅ Store as JSON string
      const checkedData = resolutionData?.filter((item) =>
        isChecked.includes(item?.id)
      );
      const updatedData = checkedData.map((item) => ({
        ...item,
        billTitle: `to move the following resolution:- ${item?.SubjectMatter}`,
      }));

      setResolutionOrderOfDay(updatedData);
    } else {
      setResolutionOrderOfDay([]);
    }
  }, [isChecked, resolutionData]);

  const handleCheckedData = async (resolutionOrderOfDay, resolutionData) => {
    if (Edit === true) {
      if (resolutionOrderOfDay && resolutionOrderOfDay.length > 0) {
        const updatedData = resolutionData.map((item) => {
          const found = resolutionOrderOfDay.find(
            (element) => element.id === item.id
          );

          if (found) {
            setIsChecked((prevChecked) => [...prevChecked, item.id]); // ✅ Push ID if found
          }
          return item;
        });

        setResolutionData(updatedData);
      } else {
        setResolutionData(resolutionData);
      }
    } else {
      const data = localStorage.getItem("resolution");

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

export default LGMSResolutionOrderOfDay;
