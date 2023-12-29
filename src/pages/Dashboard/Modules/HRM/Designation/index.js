import React, { useEffect, useState } from "react";
import { Layout } from "../../../../../components/Layout";
import Header from "../../../../../components/Header";
import { useNavigate } from "react-router-dom";
import { HRMsidebarItems } from "../../../../../utils/sideBarItems";
import CustomTable from "../../../../../components/CustomComponents/CustomTable";
import { DeleteDesignation, getDesignations } from "../../../../../api/APIs";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";

function HRMDesignation() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(null);
  const [designationData, setDesignationData] = useState([]);
  const pageSize = 4; // Set your desired page size

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  const transformDesignationData = (apiData) => {
    return apiData.map((leave) => ({
      id: leave?.id,
      designationName: leave?.designationName,
      description: leave?.description,
      designationStatus: leave?.designationStatus,
    }));
  };

  const getDesignationApi = async () => {
    try {
      const response = await getDesignations(currentPage, pageSize);
      if (response?.success) {
        setCount(response?.count);
        const transformedData = transformDesignationData(response?.data);
        setDesignationData(transformedData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await DeleteDesignation(id);
      if (response?.success) {
        showSuccessMessage(response.message);
        getDesignationApi();
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  };
  useEffect(() => {
    getDesignationApi();
  }, []);
  return (
    <Layout module={true} sidebarItems={HRMsidebarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/hrm/designation"}
        addLink1={"/hrm/designation"}
        title1={"Designation"}
      />
      <ToastContainer />
      <div class="row">
        <div class="col-12">
          <CustomTable
            data={designationData}
            tableTitle="Designation List"
            addBtnText="Add Designation"
            handleAdd={() => navigate("/hrm/addeditdesignation")}
            handleEdit={(item) =>
              navigate("/hrm/addeditdesignation", { state: item })
            }
            headertitlebgColor={"#666"}
            headertitletextColor={"#FFF"}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            pageSize={pageSize}
            // handlePrint={}
            // handleUser={}
            totalCount={count}
            handleDelete={(item) => handleDelete(item.id)}
          />
        </div>
      </div>
    </Layout>
  );
}

export default HRMDesignation;
