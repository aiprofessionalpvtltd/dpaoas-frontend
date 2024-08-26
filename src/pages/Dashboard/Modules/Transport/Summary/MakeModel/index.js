import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from "../../../../../../components/Layout";
import { ToastContainer } from "react-toastify";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import { TransportSideBarItems } from '../../../../../../utils/sideBarItems';
import { getMakeModel } from '../../../../../../api/APIs/Services/Transport.service';

function MakeModelWise() {
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;
  const [count, setCount] = useState(null);
  const userId = "your_user_id"; 

  const fetchMakeModelData = useCallback(async () => {
    try {
      const response = await getMakeModel(currentPage, pageSize, userId);
      const data =response?.data || []
      setFilteredData(data)
    } catch (error) {
      console.error("Error fetching MakeModel data:", error);
    }
  }, [currentPage, pageSize, userId]);

  useEffect(() => {
    fetchMakeModelData();
  }, [fetchMakeModelData]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Layout
      module={false}
      centerlogohide={true}
      sidebarItems={TransportSideBarItems}>
      <ToastContainer />
      <div className="row">
        <div className="col-12">
          <CustomTable
            hidebtn1={true}
            addBtnText={"Add Make And Model"}
            data={filteredData}
            tableTitle="Make Model-Wise"
            headertitlebgColor={"#666"}
            headertitletextColor={"#FFF"}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            handleAdd={() =>
              navigate("/transport/driver/addeditDrivers")
            }
            pageSize={pageSize}
            totalCount={count}
            singleDataCard={true}
            showEditIcon={false}
            handleEdit={(item) =>
              navigate("/transport/driver/addeditDrivers", {
                state: item,
              })
            }
          />
        </div>
      </div>
    </Layout>
  );
}

export default MakeModelWise;
