import { ToastContainer } from "react-toastify";
import { Layout } from "../../../../../components/Layout";
import Header from "../../../../../components/Header";
import { NoticeSidebarItems } from "../../../../../utils/sideBarItems";
import CustomTable from "../../../../../components/CustomComponents/CustomTable";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CMSSpeechOnDemandDashboard() {
  const navigate = useNavigate();
  const [count, setCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [speechOnDemand, setSpeechOnDemand] = useState([]);
  const pageSize = 4;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const transformSpeechOnDemandData = (apiData) => {
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
        addLink1={"/notice/speech-on-demand/addedit"}
        title1={"Speech On Demand"}
      />
      <div class="row mt-5">
        <div class="col-12">
          <CustomTable
            block={false}
            data={speechOnDemand}
            addBtnText={"Add Speech On Demand"}
            tableTitle="Speech On Demand"
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            pageSize={pageSize}
            headertitlebgColor={"#666"}
            headertitletextColor={"#FFF"}
            totalCount={count}
            handleAdd={() => navigate("/notice/speech-on-demand/addedit")}
            // handleEdit={(item) => hendleEdit(item.SR)}
            // handleDelete={(item) => handleDelete(item.SR)}
          />
        </div>
      </div>
    </Layout>
  );
}
export default CMSSpeechOnDemandDashboard;
