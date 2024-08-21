import React , {useCallback, useEffect, useState}from 'react'
import {useNavigate} from 'react-router-dom'
import { Layout } from "../../../../../../components/Layout";
import { ToastContainer } from "react-toastify";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import { TransportSideBarItems } from '../../../../../../utils/sideBarItems';
import { getDriversVehicles } from '../../../../../../api/APIs/Services/Transport.service';



function SumDriverVehicle() {
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize=10;
  const [count, setCount] = useState(null);


  const getDriversVehiclesApi = useCallback  (async () => {
    try {
      const response = await getDriversVehicles(currentPage, pageSize);
      const data = response?.data || [];
      setFilteredData(data);
      setCount(data.length);
    } catch (error) {
      console.error("Error fetching Drivers and Vehicles data:", error);
    }
  }, [currentPage]);

  useEffect(() => {
    getDriversVehiclesApi();
  }, [getDriversVehiclesApi]);

  





  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
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
            addBtnText={"Add Driver-Vehicle"}
            data={filteredData}
            tableTitle="Drivers and Vehicles"
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
            // seachBarShow={true}
            // searchonchange={onSearchChange}
            // handleDelete={(item) => handleDelete(item.SrNo)}
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

export default SumDriverVehicle