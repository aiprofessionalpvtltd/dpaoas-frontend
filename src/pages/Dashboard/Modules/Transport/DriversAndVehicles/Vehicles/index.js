import React , {useState}from 'react'
import {useNavigate} from 'react-router-dom'
import { Layout } from "../../../../../../components/Layout";
import { ToastContainer } from "react-toastify";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import { TransportSideBarItems } from '../../../../../../utils/sideBarItems';
function Drivers() {
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize=10;
  const [count, setCount] = useState(null);


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
            hideBtn={false}
            addBtnText={"Add Vehicle"}
            data={filteredData}
            tableTitle="Vehicles"
            headertitlebgColor={"#666"}
            headertitletextColor={"#FFF"}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            handleAdd={() =>
              navigate("/transport/vehicles/addeditVehicles")
            }
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

export default Drivers