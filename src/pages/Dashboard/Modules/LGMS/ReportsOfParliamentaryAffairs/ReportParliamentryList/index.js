import { useCallback, useEffect, useState } from "react";
import Header from "../../../../../../components/Header";
import { Layout } from "../../../../../../components/Layout";
import { LegislationSideBarItems } from "../../../../../../utils/sideBarItems";
import {
  DeleteOrdinance,
  GetAllOrdinancesList,
  GetAllParliamentaryReportList,
} from "../../../../../../api/APIs/Services/LegislationModule.service";
import {
  showSuccessMessage,
  showErrorMessage,
} from "../../../../../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const LGMSReportParliamentaryAffairsList = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [affairsReportData, setAffairsReportData] = useState([]);
  const [count, setCount] = useState(null);
  const pageSize = 10;

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  const transformAffairsReport = (apiData) => {
    return apiData.map((item) => ({
      id: item.id,
      ministerTenure: item?.tenuresMinisters?.tenureName,
      parliamentaryYear: item?.parliamentaryYearsMna?.parliamentaryTenure,
      ministerName: item?.minister?.mnaName,
      ministryName: item?.ministry?.ministryName,
      reportDescription: item?.description,
    }));
  };

  const GetAllReportsParliamentaryAffairs = useCallback(async () => {
    try {
      const resposne = await GetAllParliamentaryReportList(
        currentPage,
        pageSize
      );
      if (resposne?.success) {
        const transformData = await transformAffairsReport(
          resposne?.data?.reports
        );
        setAffairsReportData(transformData);
        setCount(resposne?.data?.count);
      }
    } catch (error) {
      console.log("error", error);
    }
  }, [currentPage, pageSize, setCount, setAffairsReportData]);

  useEffect(() => {
    GetAllReportsParliamentaryAffairs();
  }, [GetAllReportsParliamentaryAffairs]);

  //  Delete Ordinaance
  const handleDeleteOrdinance = async (id) => {
    try {
      const resposne = await DeleteOrdinance(id);
      if (resposne?.success) {
        showSuccessMessage(resposne?.message);
        GetAllReportsParliamentaryAffairs();
      }
    } catch (error) {
      showErrorMessage(error?.message);
    }
  };
  return (
    <Layout
      module={true}
      sidebarItems={LegislationSideBarItems}
      centerlogohide={true}
    >
      <ToastContainer />
      <Header
        dashboardLink={"/lgms/dashboard"}
        addLink1={"/lgms/dashboard/reports/parliamentaryaffairs/report"}
        title1={"Parliamentary Affairs Reports"}
      />
      <div class="container-fluid">
        <div>
          <CustomTable
            hidebtn1={false}
            addBtnText={"Create Report"}
            tableTitle={"Report List"}
            data={affairsReportData}
            hideBtn={true}
            singleDataCard={true}
            headertitlebgColor={"#666"}
            headertitletextColor={"#FFF"}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            pageSize={pageSize}
            totalCount={count}
            hideDeleteIcon={true}
            handleAdd={() =>
              navigate(
                "/lgms/dashboard/reports/parliamentaryaffairs/report/addedit"
              )
            }
            handleEdit={(item) =>
              navigate(
                "/lgms/dashboard/reports/parliamentaryaffairs/report/addedit",
                {
                  state: item,
                }
              )
            }
            // handleDelete={(item) => handleDeleteOrdinance(item?.id)}
          />
        </div>
      </div>
    </Layout>
  );
};

export default LGMSReportParliamentaryAffairsList;
