import React, { useEffect, useState } from "react";
import moment from "moment";
import { getAllMotion } from "../../../../api/APIs/Services/Motion.service";
import { Layout } from "../../../Layout";
import CustomTable from "../../CustomTable";
import { LegislationSideBarItems } from "../../../../utils/sideBarItems";
import { GetAllParliamentaryReportList } from "../../../../api/APIs/Services/LegislationModule.service";

function LGMSReportToBeLaidOrderofDay({
  reportToBeLaidData,
  setReportToBeLaid,
  Edit,
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(null);
  const [reportLaidData, setReportLaidData] = useState([]);
  const [isChecked, setIsChecked] = useState([]);
  const pageSize = 10; // Set your desired page size

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  const transformData = (apiData) => {
    return apiData.map((res, index) => {
      return {
        SNo: index + 1,
        id: res?.id,
        internalId: res?.id,
        nameOfMinister: res?.minister?.mnaName,
        // ministerName: res?.minister?.mnaName,
        parliamentaryYear: res?.parliamentaryYearsMna?.parliamentaryTenure,
        ministryName: res?.ministry?.ministryName,
        reportDescription: res?.description,
      };
    });
  };

  const getAllParliamentaryAffairsRepots = async () => {
    const motionSentStatus = "toLegislation";
    const motiontoStatus = "toLegislation";
    try {
      const response = await GetAllParliamentaryReportList(
        currentPage,
        pageSize
      );
      if (response?.success) {
        const transformedData = transformData(response?.data?.reports);
        handleCheckedData(reportToBeLaidData, transformedData);
        setCount(response?.data?.reports?.length);
        setReportLaidData(transformedData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllParliamentaryAffairsRepots();
  }, []);

  useEffect(() => {
    if (isChecked?.length > 0) {
      localStorage.setItem("reportToBeLaidData", JSON.stringify(isChecked)); // ✅ Store as JSON string

      const checkedData = reportLaidData?.filter((item) =>
        isChecked.includes(item?.id)
      );
      const updatedData = checkedData.map((item) => ({
        ...item,
        billTitle: `Minister for ${item?.ministryName} to lay before the Senate ${item?.reportDescription}`,
      }));

      setReportToBeLaid(updatedData);
    } else {
      setReportToBeLaid([]);
    }
  }, [isChecked, reportLaidData]);

  const handleCheckedData = async (reportToBeLaidData, reportLaidData) => {
    if (Edit === true) {
      if (reportToBeLaidData && reportToBeLaidData.length > 0) {
        const updatedData = reportLaidData.map((item) => {
          const found = reportToBeLaidData.find(
            (element) => element.id === item.id
          );

          if (found) {
            setIsChecked((prevChecked) => [...prevChecked, item.id]);
          }
          return item;
        });

        setReportLaidData(updatedData);
      } else {
        setReportLaidData(reportLaidData);
      }
    } else {
      const data = localStorage.getItem("reportToBeLaidData");

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
        data={reportLaidData}
        seachBarShow={false}
        hideBtn={true}
        hidebtn1={true}
        block={false}
        tableTitle="Reports To Be Laid In Senate Data"
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

export default LGMSReportToBeLaidOrderofDay;
