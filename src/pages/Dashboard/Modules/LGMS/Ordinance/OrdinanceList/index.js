import { useCallback, useEffect, useState } from "react";
import Header from "../../../../../../components/Header";
import { Layout } from "../../../../../../components/Layout";
import { LegislationSideBarItems } from "../../../../../../utils/sideBarItems";
import {
  DeleteOrdinance,
  GetAllOrdinancesList,
} from "../../../../../../api/APIs/Services/LegislationModule.service";
import {
  showSuccessMessage,
  showErrorMessage,
} from "../../../../../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const AllOrdinanceList = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [ordinanceData, setOrdinanceData] = useState([]);
  const [count, setCount] = useState(null);
  const pageSize = 10;

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  const trnasformOridinaceData = (apiData) => {
    console.log("api", apiData);
    return apiData.map((item) => ({
      id: item.id,
      ordinanceTitle: item.ordinanceTitle,
      parliamentaryYear: item?.parliamentaryYears?.parliamentaryTenure,
      session: item?.sessions?.sessionName,
      dateOfLayingInSenate: item?.dateOfLayingInTheSenate
        ? moment(item?.dateOfLayingInTheSenate).format("DD-MM-YYYY")
        : "---",
      dateOfLayingInNationalAssembly: item?.dateOfLayingInTheNA
        ? moment(item?.dateOfLayingInTheNA).format("DD-MM-YYYY")
        : "---",
      ordinanceStatus: item?.billStatuses && item?.billStatuses?.billStatusName,
      documentDate: item?.documentDate
        ? moment(item?.documentDate).format("DD-MM-YYYY")
        : "---",
      Status: item.ordinanceStatus,
    }));
  };

  const GetAllOrdinancesApi = useCallback(async () => {
    try {
      const resposne = await GetAllOrdinancesList(currentPage, pageSize);
      if (resposne?.success) {
        const transformData = await trnasformOridinaceData(
          resposne?.data?.ordinance
        );
        setOrdinanceData(transformData);
        setCount(resposne?.data?.count);
      }
    } catch (error) {
      console.log("error", error);
    }
  }, [currentPage, pageSize, setCount, setOrdinanceData]);

  useEffect(() => {
    GetAllOrdinancesApi();
  }, [GetAllOrdinancesApi]);

  //  Delete Ordinaance
  const handleDeleteOrdinance = async (id) => {
    try {
      const resposne = await DeleteOrdinance(id);
      if (resposne?.success) {
        showSuccessMessage(resposne?.message);
        GetAllOrdinancesApi();
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
        addLink1={"/lgms/dashboard"}
        title1={"Ordinances"}
      />
      <div class="container-fluid">
        <div>
          <CustomTable
            hidebtn1={false}
            addBtnText={"Create Ordinance"}
            tableTitle={"Ordinance List"}
            data={ordinanceData}
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
              navigate("/lgms/dashboard/ordinances/add/ordinance")
            }
            handleEdit={(item) =>
              navigate("/lgms/dashboard/ordinances/edit/ordinance", {
                state: item,
              })
            }
            // handleDelete={(item) => handleDeleteOrdinance(item?.id)}
          />
        </div>
      </div>
    </Layout>
  );
};

export default AllOrdinanceList;
