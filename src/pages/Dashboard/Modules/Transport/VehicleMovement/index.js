import React, { useCallback, useEffect, useState } from "react";
import { Layout } from "../../../../../components/Layout";
import { ToastContainer } from "react-toastify";
import CustomTable from "../../../../../components/CustomComponents/CustomTable";
import { useNavigate } from "react-router-dom";
import { showErrorMessage, showSuccessMessage } from "../../../../../utils/ToastAlert";
import { getUserData } from "../../../../../api/Auth";
import { deleteMovement, getMovement } from "../../../../../api/APIs/Services/Transport.service";
import { TransportSideBarItems } from "../../../../../utils/sideBarItems";



function VehicleMovementList() {
  const navigate = useNavigate();
  const userData = getUserData();
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const pageSize = 10; // Set your desired page size

  const fetchData = useCallback(async (page) => {
    try {
      const response = await getMovement(page, pageSize, userData.userId);
      setData(response?.items || []); // Adjust based on your API response
      setCount(response?.totalCount || 0); // Adjust based on your API response
    } catch (error) {
      showErrorMessage("Failed to fetch vehicle movements");
    }
  }, [userData.userId, pageSize]);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, fetchData]);

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  const handleDelete = async (id) => {
    try {
      await deleteMovement(id);
      showSuccessMessage("Movement deleted successfully");
      fetchData(currentPage); // Refresh the data after deletion
    } catch (error) {
      showErrorMessage("Failed to delete movement");
    }
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
            hideBtn={false}
            addBtnText={"Create Vehicle"}
            data={data}
            tableTitle="Vehicle Movement"
            headertitlebgColor={"#666"}
            headertitletextColor={"#FFF"}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            handleAdd={() =>
              navigate("/transport/vehicle-movement/addedit")
            }
            pageSize={pageSize}
            totalCount={count}
            singleDataCard={true}
            // seachBarShow={true}
            // searchonchange={onSearchChange}
            handleDelete={(item) => handleDelete(item.id)} // Assuming 'id' is the primary key
            showEditIcon={false}
            handleEdit={(item) =>
              navigate("/transport/vehicle-movement/addedit", {
                state: item,
              })
            }
          />
        </div>
      </div>
    </Layout>
  );
}

export default VehicleMovementList;
