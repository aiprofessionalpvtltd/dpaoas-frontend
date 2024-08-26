import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from "../../../../../../components/Layout";
import { ToastContainer } from "react-toastify";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import { TransportSideBarItems } from '../../../../../../utils/sideBarItems';
import { getPoll } from '../../../../../../api/APIs/Services/Transport.service';

function Poll() {
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;
  const [count, setCount] = useState(null);
  const userId = "your_user_id"; 

  const fetchPollData = useCallback(async () => {
    try {
      const response = await getPoll(currentPage, pageSize, userId);
      const data = response?.data || []
      setFilteredData(data);
      setCount()
    } catch (error) {
      console.error("Error fetching Poll data:", error);
    }
  }, [currentPage, pageSize, userId]);

  useEffect(() => {
    fetchPollData();
  }, [fetchPollData]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Layout
      module={false}
      centerlogohide={true}
      sidebarItems={TransportSideBarItems}
    >
      <ToastContainer />
      <div className="row">
        <div className="col-12">
          <CustomTable
            hidebtn1={true}
            addBtnText={"Add Poll"}
            data={filteredData}
            tableTitle="Poll"
            headertitlebgColor={"#666"}
            headertitletextColor={"#FFF"}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            handleAdd={() => navigate("/transport/driver/addeditDrivers")}
            pageSize={pageSize}
            totalCount={count}
            singleDataCard={true}
            showEditIcon={false}
            handleEdit={(item) => navigate("/transport/driver/addeditDrivers", {
              state: item,
            })}
          />
        </div>
      </div>
    </Layout>
  );
}

export default Poll;
