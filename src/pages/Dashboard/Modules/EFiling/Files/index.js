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
  const [fileData, setFileData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const pageSize = 10; // Set your desired page size
  const UserData = getUserData();

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  const transformFilesdata = (apiData) => {
    return apiData.map((item) => ({
      id: item?.id,
      fileNumber: item?.fileNumber,
      subject: item?.fileSubject,
      branch: item?.branches?.branchName,
      fileStatus: item?.fileStatus,
      status: item?.status
    }));
  };

  const getAllFilesAPi = useCallback(async () => {
    try {
      const response = await getAllEfiling(currentPage, pageSize, UserData?.fkUserId);
      if (response?.success) {
        const transformedData = transformFilesdata(response?.data?.rows);
        setCount(response?.data?.count);
        setFileData(transformedData);
        setFilteredData(transformedData); // Initialize filtered data
      }
    } catch (error) {
      console.log(error);
    }
  }, [currentPage, pageSize, UserData?.fkUserId]);

  const handleDelete = async (id) => {
    try {
      const response = await DeleteEfiling(id);
      if (response.success) {
        showSuccessMessage(response?.message);
        getAllFilesAPi();
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const onSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query) {
      const filtered = fileData.filter((item) => {
        return (
          item.fileNumber.toLowerCase().includes(query.toLowerCase()) ||
          item.subject.toLowerCase().includes(query.toLowerCase()) ||
          item.branch.toLowerCase().includes(query.toLowerCase()) ||
          item.fileStatus.toLowerCase().includes(query.toLowerCase())
        );
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(fileData);
    }
  };

  useEffect(() => {
    getAllFilesAPi();
  }, [getAllFilesAPi]);

  return (
    <Layout centerlogohide={true}>
      <div className="dashboard-content" style={{ marginTop: 80 }}>
        <Header dashboardLink={"/"} addLink1={"/efiling/dashboard"} title1={"E-Filing"} width={"500px"} />
        <ToastContainer />
        <div className="row">
          <div className="col-12">
            <CustomTable
              hidebtn1={true}
              data={filteredData}
              tableTitle="Files List"
              addBtnText2="Create File"
              handleAdd2={() => navigate("/efiling/dashboard/addedit")}
              showEditIcon={true}
              handleEdit={(item) => navigate("/efiling/dashboard/addedit", { state: { view: false, id: item.id } })}
              handleView={(item) => navigate("/efiling/dashboard/fileDetail", { state: { view: true, id: item.id } })}
              showView={true}
              headertitlebgColor={"#666"}
              headertitletextColor={"#FFF"}
              handlePageChange={handlePageChange}
              currentPage={currentPage}
              pageSize={pageSize}
              totalCount={count}
              singleDataCard={true}
              handleDelete={(item) => handleDelete(item.id)}
              seachBarShow={true}
              searchonchange={onSearchChange}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Files;
