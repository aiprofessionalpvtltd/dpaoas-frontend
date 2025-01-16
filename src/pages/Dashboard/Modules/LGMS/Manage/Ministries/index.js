import React, { useEffect, useState } from "react";
import { Layout } from "../../../../../../components/Layout";
import { LegislationSideBarItems } from "../../../../../../utils/sideBarItems";
import Header from "../../../../../../components/Header";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import { useNavigate } from "react-router-dom";
import { showErrorMessage } from "../../../../../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";
import { getAllLegisMinistries } from "../../../../../../api/APIs/Services/LegislationModule.service";

function LGMSMinistries() {
  const navigate = useNavigate();
  const [ministriesData, setMinistriesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(null);
  const pageSize = 10; // Set your desired page size

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  const transformData = (apiData) => {
    return apiData.map((item) => ({
      id: item.id,
      ministeryName: `${item.ministryName}`,
      ministeryTenure: item?.tenure?.tenureName
        ? item?.tenure?.tenureName
        : "---",
    }));
  };

  const getAllMinisteriesApi = async () => {
    try {
      const response = await getAllLegisMinistries(currentPage, pageSize);
      if (response?.success) {
        setCount(response?.data?.count);
        const transformedData = transformData(response.data?.ministries);
        setMinistriesData(transformedData);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getAllMinisteriesApi();
  }, [currentPage]);

  return (
    <Layout
      module={true}
      sidebarItems={LegislationSideBarItems}
      centerlogohide={true}
    >
      <Header
        dashboardLink={"lgms/dashboard"}
        addLink1={"/lgms/dashboard/manage/members/list"}
        title1={"Ministries"}
      />
      <ToastContainer />
      <div class="container-fluid dash-detail-container card">
        <div class="row">
          <div class="col-12">
            <CustomTable
              data={ministriesData}
              tableTitle="Ministries List"
              addBtnText="Add Ministry"
              handleAdd={() =>
                navigate("/lgms/dashboard/manage/ministries/addedit")
              }
              handleEdit={(item) =>
                navigate("/lgms/dashboard/manage/ministries/addedit", {
                  state: item,
                })
              }
              hideDeleteIcon={true}
              headertitlebgColor={"#666"}
              headertitletextColor={"#FFF"}
              handlePageChange={handlePageChange}
              currentPage={currentPage}
              pageSize={pageSize}
              totalCount={count}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default LGMSMinistries;
