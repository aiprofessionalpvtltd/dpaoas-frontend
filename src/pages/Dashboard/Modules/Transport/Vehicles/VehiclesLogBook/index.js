import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../../../../../components/Layout";
import { ToastContainer } from "react-toastify";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import { TransportSideBarItems } from "../../../../../../utils/sideBarItems";
import { getVehicles } from "../../../../../../api/APIs/Services/Transport.service";
import Header from "../../../../../../components/Header";

function EditAddVehMov() {
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(0);
  const pageSize = 10;
  const userId = 1; // Replace with the actual user ID if needed

  // Fetch vehicles data from API
  const fetchVehicles = async () => {
    try {
      const data = await getVehicles(currentPage, pageSize, userId);
      setFilteredData(data.vehicles || []); // Adjust according to the actual response structure
      setCount(data.totalCount || 0); // Adjust according to the actual response structure
    } catch (error) {
      console.error("Failed to fetch vehicles:", error);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Layout
      module={false}
      centerlogohide={true}
      sidebarItems={TransportSideBarItems}
    >
      <Header dashboardLink={"/"} title1={"Vehicles Log Book"} />
      <ToastContainer />
      <div className="row">
        <div className="col-12">
          <CustomTable
            hideBtn={false}
            addBtnText={"Add Log Book"}
            data={filteredData}
            tableTitle="Vehicles Log Book"
            headerBgColor={"#4B8FF0"}
            headerTitleColor={"#fff"}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            handleAdd={() => navigate("/transport/vehicles/profiles/addeditlogbook")}
            pageSize={pageSize}
            totalCount={count}
            singleDataCard={true}
            // seachBarShow={true}
            // searchonchange={onSearchChange}
            // handleDelete={(item) => handleDelete(item.SrNo)}
            showEditIcon={false}
            handleEdit={(item) =>
              navigate("/transport/vehicles/addeditVehicles", {
                state: item,
              })
            }
          />
        </div>
      </div>
    </Layout>
  );
}

export default EditAddVehMov;
