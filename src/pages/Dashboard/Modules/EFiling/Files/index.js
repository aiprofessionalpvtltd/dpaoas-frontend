import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../../../../components/Layout";
import CustomTable from "../../../../../components/CustomComponents/CustomTable";
import Header from "../../../../../components/Header";
import { DeleteEfiling, getAllEfiling } from "../../../../../api/APIs/Services/efiling.service";
import { getUserData } from "../../../../../api/Auth";
import { showErrorMessage, showSuccessMessage } from "../../../../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";

function Files() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(null);
  const [fileData, setFileData] = useState([])
  const pageSize = 5; // Set your desired page size
  const UserData = getUserData()

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };



  const transformFilesdata = (apiData) => {
    console.log(apiData);
    return apiData.map((item) => ({
      id: item?.id,
      fileNumber: item?.fileNumber,
      subject: item?.fileSubject,
      branch: item?.branches?.branchName,
    }));
  };
  const getAllFilesAPi = useCallback(async () => {
    try {
      const response = await getAllEfiling(currentPage, pageSize, UserData?.fkUserId);
      if (response?.success) {
        const transformedData = transformFilesdata(response?.data?.rows);
        setCount(response?.data?.count);
        setFileData(transformedData);
      }
    } catch (error) {
      console.log(error);
    }
  }, [currentPage, pageSize, setCount, setFileData]);


  const handleDelete = async (id) => {
    try {
      const response = await DeleteEfiling(id)
      if (response.success) {
        showSuccessMessage(response?.message)
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message)
    }
  }

  useEffect(() => {
    getAllFilesAPi()
  }, [])

  return (
    <Layout centerlogohide={true}>
      <div className="dashboard-content" style={{ marginTop: 80 }}>
        <Header dashboardLink={"/"} addLink1={"/efiling/dashboard"} title1={"E-Filing"} width={"500px"} />
        <ToastContainer />
        <div class="container-fluid dash-detail-container card" style={{ margin: "0 10px" }}>
          <div class="row">
            <div class="col-12">
              <CustomTable
                hidebtn1={true}

                data={fileData}
                tableTitle="Files List"
                addBtnText2="Create File"
                handleAdd2={() => navigate("/efiling/dashboard/addedit")}
                handleEdit={(item) => navigate("/efiling/dashboard/fileDetail", { state: { view: false, id: item.id } })}
                handleView={(item) => navigate("/efiling/dashboard/fileDetail", { state: { view: true, id: item.id } })}
                showView={true}
                headertitlebgColor={"#666"}
                headertitletextColor={"#FFF"}
                handlePageChange={handlePageChange}
                currentPage={currentPage}
                pageSize={pageSize}
                totalCount={count}
                handleDelete={(item) => handleDelete(item.id)}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Files;
