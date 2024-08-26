import React, { useCallback, useEffect, useState } from "react";
import { Layout } from "../../../../../../components/Layout";
import { ToastContainer } from "react-toastify";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import { useNavigate } from "react-router-dom";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";
import { getUserData } from "../../../../../../api/Auth";
import { deletePurchase, getPurchase } from "../../../../../../api/APIs/Services/Transport.service";
import { TransportSideBarItems } from "../../../../../../utils/sideBarItems";


function PurchasesMadeList() {
  const navigate = useNavigate();
  const userData = getUserData();
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(null);
  const pageSize = 10; // Set your desired page size
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchPurchases = useCallback(async () => {
    try {
      const data = await getPurchase(currentPage, pageSize, userData?.userId);
      setFilteredData(data?.items || []);
      setCount(data?.totalCount || 0);
    } catch (error) {
      showErrorMessage("Failed to fetch purchases.");
    }
  }, [currentPage, pageSize, userData?.userId]);

  useEffect(() => {
    fetchPurchases();
  }, [fetchPurchases]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = async (id) => {
    try {
      await deletePurchase(id);
      showSuccessMessage("Purchase deleted successfully.");
      fetchPurchases(); // Refresh the list after deletion
    } catch (error) {
      showErrorMessage("Failed to delete purchase.");
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
            addBtnText={"Create"}
            data={filteredData}
            tableTitle="Purchases Made"
            headertitlebgColor={"#666"}
            headertitletextColor={"#FFF"}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            handleAdd={() => navigate("/transport/purchases/addedit")}
            pageSize={pageSize}
            totalCount={count}
            singleDataCard={true}
            // seachBarShow={true}
            // searchonchange={onSearchChange}
            handleDelete={(item) => handleDelete(item.SrNo)}
            showEditIcon={false}
            handleEdit={(item) =>
              navigate("/transport/purchases/addedit", {
                state: item,
              })
            }
          />
        </div>
      </div>
    </Layout>
  );
}

export default PurchasesMadeList;
