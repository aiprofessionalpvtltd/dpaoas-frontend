import { ToastContainer } from "react-toastify";
import { Layout } from "../../../../../components/Layout";
import { NoticeSidebarItems } from "../../../../../utils/sideBarItems";
import Header from "../../../../../components/Header";
import { useCallback, useEffect, useState } from "react";
import CustomTable from "../../../../../components/CustomComponents/CustomTable";
import { useNavigate } from "react-router-dom";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../utils/ToastAlert";
import {
  DeleteResearchServices,
  getAllResarchServices,
} from "../../../../../api/APIs/Services/Notice.service";

function CMSResearchServicesDashboard() {
  const navigate = useNavigate();
  const [count, setCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [researchService, setResearchData] = useState([]);
  const pageSize = 4;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const transformresarchServicesData = (apiData) => {
    return apiData.map((item, index) => ({
      SR: item?.id,
      serviceType: item?.service_type,
      details: item?.details,
      status: item?.isActive,
    }));
  };

  const getAllResarchServicesApi = useCallback(async () => {
    try {
      const response = await getAllResarchServices(currentPage, pageSize);
      if (response?.success) {
        setCount(response?.data?.count);
        const trensferData = transformresarchServicesData(
          response?.data?.researchServiceData
        );
        setResearchData(trensferData);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  }, [currentPage, pageSize, setCount, setResearchData]);

  const handleDelete = async (id) => {
    try {
      const response = await DeleteResearchServices(id);
      if (response?.success) {
        showSuccessMessage(response.message);
        getAllResarchServicesApi();
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  };

  useEffect(() => {
    getAllResarchServicesApi();
  }, [currentPage]);
  return (
    <Layout
      module={true}
      sidebarItems={NoticeSidebarItems}
      centerlogohide={true}
    >
      <ToastContainer />
      <Header
        dashboardLink={"/notice/dashboard"}
        // addLink1={"/notice/motion/new"}
        title1={"Research Service"}
      />
      <div class="row mt-5">
        <div class="col-12">
          <CustomTable
            block={false}
            data={researchService}
            // addBtnText={"Add Research Service"}
            hidebtn1={true}
            tableTitle="Research Services"
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            pageSize={pageSize}
            headertitlebgColor={"#666"}
            headertitletextColor={"#FFF"}
            totalCount={count}
            // handleAdd={() => navigate("/notice/research-services/addedit")}
            handleEdit={(item) =>
              navigate("/notice/research-services/addedit", {
                state: { id: item?.SR },
              })
            }
            handleDelete={(item) => handleDelete(item.SR)}
          />
        </div>
      </div>
    </Layout>
  );
}
export default CMSResearchServicesDashboard;
