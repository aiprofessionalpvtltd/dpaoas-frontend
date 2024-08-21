import React, { useEffect, useState, useCallback } from "react";
import { Layout } from "../../../../../components/Layout";
import { ToastContainer } from "react-toastify";
import CustomTable from "../../../../../components/CustomComponents/CustomTable";
import { useNavigate } from "react-router-dom";
import { showErrorMessage, showSuccessMessage } from "../../../../../utils/ToastAlert";
import { getUserData } from "../../../../../api/Auth";
import { TransportSideBarItems } from '../../../../../utils/sideBarItems';
import { deleteHandedForm, getHandedForm } from "../../../../../api/APIs/Services/Transport.service";


function FleetManagementList() {
  const navigate = useNavigate();
  const userData = getUserData();
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(null);
  const [data, setData] = useState([]);
  const pageSize = 10; // Set your desired page size

  // Fetch data when the component mounts or when currentPage changes
  const fetchData = useCallback(async () => {
    try {
      const result = await getHandedForm(currentPage, pageSize, userData?.id);
      setData(result?.items || []);
      setCount(result?.totalCount || 0);
    } catch (error) {
      showErrorMessage("Error fetching fleet management data.");
    }
  }, [currentPage, pageSize, userData?.id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = async (id) => {
    try {
      await deleteHandedForm(id);
      showSuccessMessage("Fleet record deleted successfully.");
      fetchData(); // Refresh data after deletion
    } catch (error) {
      showErrorMessage("Error deleting fleet record.");
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
            addBtnText={"Create Fleet"}
            data={data}
            tableTitle="Fleet Management"
            headertitlebgColor={"#666"}
            headertitletextColor={"#FFF"}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            handleAdd={() =>
              navigate("/transport/fleet/addedit")
            }
            pageSize={pageSize}
            totalCount={count}
            singleDataCard={true}
            // seachBarShow={true}
            // searchonchange={onSearchChange}
            handleDelete={(item) => handleDelete(item.id)}
            showEditIcon={true}
            handleEdit={(item) =>
              navigate("/transport/fleet/addedit", {
                state: { fleetData: item },
              })
            }
          />
        </div>
      </div>
    </Layout>
  );
}

export default FleetManagementList;
