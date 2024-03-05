import { ToastContainer } from "react-toastify";
import { Layout } from "../../../../../components/Layout";
import { NoticeSidebarItems } from "../../../../../utils/sideBarItems";
import Header from "../../../../../components/Header";
import { useState } from "react";
import CustomTable from "../../../../../components/CustomComponents/CustomTable";
import { useNavigate } from "react-router-dom";

function CMSResearchServicesDashboard() {
  const navigate = useNavigate();
  const [count, setCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [researchService, setResearchService] = useState([]);
  const pageSize = 4;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const transformResearchServiceData = (apiData) => {
    return apiData.map((item, index) => ({
      SR: item?.id,
      sessionno: `${item?.requestUser?.employee?.firstName}${item?.requestUser?.employee?.lastName}`,
      fromdate: `${item?.requestBranch?.complaintTypeName}`,
      todate: `${item?.tonerModel?.tonerModel}`,
      justification: item?.quantity,
      status: item?.status,
    }));
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
        // addLink1={"/notice/motion/new"}
        title1={"Research Service"}
      />
      <div class="row mt-5">
        <div class="col-12">
          <CustomTable
            block={false}
            data={researchService}
            addBtnText={"Add Research Service"}
            tableTitle="Research Services"
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            pageSize={pageSize}
            headertitlebgColor={"#666"}
            headertitletextColor={"#FFF"}
            totalCount={count}
            handleAdd={() => navigate("/notice/research-services/addedit")}
            // handleEdit={(item) => hendleEdit(item.SR)}
            // handleDelete={(item) => handleDelete(item.SR)}
          />
        </div>
      </div>
    </Layout>
  );
}
export default CMSResearchServicesDashboard;
