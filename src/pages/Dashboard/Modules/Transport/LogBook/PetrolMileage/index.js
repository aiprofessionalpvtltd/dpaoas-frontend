import React, { useCallback, useEffect, useState } from "react";
import { Layout } from "../../../../../../components/Layout";
import { ToastContainer } from "react-toastify";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import { useNavigate } from "react-router-dom";
import { showErrorMessage, showSuccessMessage } from "../../../../../../utils/ToastAlert";
import { getUserData } from "../../../../../../api/Auth";
import { deleteMileage, getMileage } from "../../../../../../api/APIs/Services/Transport.service";
import { TransportSideBarItems } from "../../../../../../utils/sideBarItems";


function PetrolMileageList() {
  const navigate = useNavigate();
  const userData = getUserData();
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(0);
  const pageSize = 10;
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchMileageData = async () => {
      try {
        const data = await getMileage(currentPage, pageSize, userData.userId); // Assuming userId is part of userData
        setFilteredData(data.items); 
        setCount(data.totalCount); 
      } catch (error) {
        showErrorMessage("Error fetching mileage data");
      }
    };

    fetchMileageData();
  }, [currentPage, userData.userId]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = async (id) => {
    try {
      await deleteMileage(id);
      showSuccessMessage("Mileage deleted successfully");
      // Refresh the list after deletion
      const updatedData = await getMileage(currentPage, pageSize, userData.userId);
      setFilteredData(updatedData.items);
      setCount(updatedData.totalCount);
    } catch (error) {
      showErrorMessage("Error deleting mileage data");
    }
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
            hideBtn={false}
            addBtnText={"Create"}
            data={filteredData}
            tableTitle="Petrol Mileage"
            headertitlebgColor={"#666"}
            headertitletextColor={"#FFF"}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            handleAdd={() =>
              navigate("/transport/petrol-mileage/addedit")
            }
            pageSize={pageSize}
            totalCount={count}
            singleDataCard={true}
            handleDelete={(item) => handleDelete(item.SrNo)}
            showEditIcon={false}
            handleEdit={(item) =>
              navigate("/transport/petrol-mileage/addedit", {
                state: item,
              })
            }
          />
        </div>
      </div>
    </Layout>
  );
}

export default PetrolMileageList;
