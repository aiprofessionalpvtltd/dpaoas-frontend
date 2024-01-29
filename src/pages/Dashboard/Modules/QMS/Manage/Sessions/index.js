import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../../../../../components/Layout";
import { QMSSideBarItems } from "../../../../../../utils/sideBarItems";
import Header from "../../../../../../components/Header";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import { getAllSessions } from "../../../../../../api/APIs";

function QMSSessions() {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [count, setCount] = useState(null);
    const pageSize = 5; // Set your desired page size

    const handlePageChange = (page) => {
      // Update currentPage when a page link is clicked
      setCurrentPage(page);
    };

    const transformData = (apiData) => {
      return apiData?.map((item) => ({
        id: item.id,
        divisionName: `${item.divisionName}`,
        ministry: `${item?.ministry?.ministryName}`,
        divisionStatus: String(item?.divisionStatus),
      }));
    };

    const handleSessions = async () => {
      try {
        const response = await getAllSessions(currentPage, pageSize);
        if (response?.success) {
          setCount(response?.count);
          const transformedData = transformData(response.data);
          setSessions(transformedData);
        }
      } catch (error) {
        console.log(error?.response?.data?.message);
      }
    }    
  
    useEffect(() => {
      handleSessions();
    }, [])

  return (
    <Layout module={true} sidebarItems={QMSSideBarItems} centerlogohide={true}>
      <Header dashboardLink={"/qms/manage"} addLink1={"/qms/manage/sessions"} title1={"Sessions"} />
      {/* <ToastContainer /> */}
      <div class="container-fluid dash-detail-container card">
        <div class="row">
          <div class="col-12">
            <CustomTable
              data={sessions}
              tableTitle="Sessions List"
              addBtnText="Add Sessions"
              handleAdd={() => navigate("/qms/manage/sessions/addedit")}
              handleEdit={(item) => navigate("/qms/manage/sessions/addedit", { state: item })}
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

export default QMSSessions;
