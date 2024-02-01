import React, { useEffect, useState } from "react";
import { NoticeSidebarItems } from "../../../../../../utils/sideBarItems";
import { Layout } from "../../../../../../components/Layout";
import Header from "../../../../../../components/Header";
import { useNavigate } from "react-router";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import { getAllManageSessions } from "../../../../../../api/APIs";
import { showSuccessMessage } from "../../../../../../utils/ToastAlert";

function ManageSessionDays() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [resData, setResData] = useState([]);
  const [count, setCount] = useState(null);
  const pageSize = 4; // Set your desired page size

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  const transformLeavesData = (apiData) => {
    return apiData.map((item) => {
      return {
        SessionId: item?.fkSessionId,
        SessionAdjourned: item?.sessionAdjourned ? "true" : "false",
        SittingDate: item?.sittingDate,
        startTime: item?.startTime,
        EndTime: item?.endTime,
        SessionName: item?.session?.sessionName,
      };
    });
  };

  const getAllManageSessionsApi = async () => {
    try {
      const response = await getAllManageSessions(currentPage, pageSize);
      if (response?.success) {
        setCount(response.data?.count);
        const transformedData = transformLeavesData(response.data);
        setResData(transformedData);
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getAllManageSessionsApi();
  }, [currentPage]);

  return (
    <Layout
      module={true}
      sidebarItems={NoticeSidebarItems}
      centerlogohide={true}
    >
      <Header
        dashboardLink={"/"}
        addLink1={"/notice/seatingplan/manage-session-days"}
        title1={"Manage Session Days"}
      />
      <div>
        <div class="container-fluid">
          <div class="card mt-1">
            <div
              class="card-header red-bg"
              style={{ background: "#14ae5c !important" }}
            >
              <h1>Manage Session Day</h1>
            </div>
            <div class="card-body">
              <div class="container-fluid">
                <div
                  class="dash-detail-container"
                  style={{ marginTop: "20px" }}
                >
                  <CustomTable
                    hideBtn={true}
                    data={resData}
                    tableTitle="Resolutions"
                    handlePageChange={handlePageChange}
                    currentPage={currentPage}
                    showPrint={true}
                    pageSize={pageSize}
                    handleAdd={(item) => navigate("/")}
                    handleEdit={(item) => navigate("/")}
                    totalCount={count}
                  />
                </div>

                {/* <div
                  class="dash-detail-container"
                  style={{ marginTop: "20px" }}
                >
                  <table class="table red-bg-head th">
                    <thead>
                      <tr>
                        <th class="text-center" scope="col">
                          Sr#
                        </th>
                        <th class="text-center" scope="col">
                          Assembly Sessions
                        </th>
                        <th class="text-center" scope="col">
                          Sitting Date
                        </th>
                        <th class="text-center" scope="col">
                          Start Time
                        </th>
                        <th class="text-center" scope="col">
                          End Time
                        </th>
                        <th class="text-center" scope="col">
                          Prorogued
                        </th>
                        <th class="text-center" scope="col">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="text-center">1</td>
                        <td class="text-center">317</td>
                        <td class="text-center">04/01/2022</td>
                        <td class="text-center">14:00</td>
                        <td class="text-center">19:00</td>
                        <td class="text-center">Yes</td>
                        <td class="text-center">
                          <a href="#">
                            <i class="fas fa-edit"></i>
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ManageSessionDays;
