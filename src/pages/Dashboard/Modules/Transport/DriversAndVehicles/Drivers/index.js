// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Layout } from "../../../../../../components/Layout";
// import { ToastContainer } from "react-toastify";
// import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
// import { TransportSideBarItems } from '../../../../../../utils/sideBarItems';
// import { getDrivers, deleteDrivers } from '../../../../../../api/APIs/Services/Transport.service';

// function Drivers() {
//   const navigate = useNavigate();
//   const [filteredData, setFilteredData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(0);
//   const pageSize = 10;
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     fetchDrivers();
//   }, [currentPage]);

//   const fetchDrivers = async () => {
//     try {
//       const userId = 1; 
//       const data = await getDrivers(currentPage, pageSize, userId);
//       setFilteredData(data.items);
//       setCount(data.totalCount);
//     } catch (error) {
//       console.error("Error fetching drivers:", error);
//     }
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await deleteDrivers(id);
//       fetchDrivers(); // Refresh the list after deletion
//     } catch (error) {
//       console.error("Error deleting driver:", error);
//     }
//   };

//   return (
//     <Layout
//       module={false}
//       centerlogohide={true}
//       sidebarItems={TransportSideBarItems}
//     >
//       <ToastContainer />
//       <div className="row">
//         <div className="col-12">
//           <CustomTable
//             hideBtn={false}
//             addBtnText={"Add Driver"}
//             data={filteredData}
//             tableTitle="Drivers"
//             headertitlebgColor={"#666"}
//             headertitletextColor={"#FFF"}
//             handlePageChange={handlePageChange}
//             currentPage={currentPage}
//             handleAdd={() => navigate("/transport/driver/addeditDrivers")}
//             pageSize={pageSize}
//             totalCount={count}
//             singleDataCard={true}
//             handleEdit={(item) =>
//               navigate("/transport/driver/addeditDrivers", {
//                 state: item,
//               })
//             }
//             handleDelete={(id) => handleDelete(id)}
//           />
//         </div>
//       </div>
//     </Layout>
//   );
// }

// export default Drivers;


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from "../../../../../../components/Layout";
import { ToastContainer } from "react-toastify";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import { TransportSideBarItems } from '../../../../../../utils/sideBarItems';

function Drivers() {
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetchDrivers();
  }, [currentPage]);

  const fetchDrivers = async () => {
    try {
      // Simulate a delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mocked data
      const mockData = {
        items: [
          { id: 1, name: "Driver 1", vehicle: "Car A" },
          { id: 2, name: "Driver 2", vehicle: "Car B" },
        ],
        totalCount: 2,
      };

      setFilteredData(mockData.items);
      setCount(mockData.totalCount);
    } catch (error) {
      console.error("Error fetching drivers:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = async (id) => {
    try {
      // Since this is a mock, we'll just filter out the item instead of actually deleting it from a server.
      setFilteredData((prevData) => prevData.filter((item) => item.id !== id));
      setCount((prevCount) => prevCount - 1);
      // fetchDrivers(); // Uncomment if you want to refresh the data after deletion.
    } catch (error) {
      console.error("Error deleting driver:", error);
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
            addBtnText={"Add Driver"}
            data={filteredData}
            tableTitle="Drivers"
            headertitlebgColor={"#666"}
            headertitletextColor={"#FFF"}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            handleAdd={() => navigate("/transport/driver/addeditDrivers")}
            pageSize={pageSize}
            totalCount={count}
            singleDataCard={true}
            handleEdit={(item) =>
              navigate("/transport/driver/addeditDrivers", {
                state: item,
              })
            }
            handleDelete={(id) => handleDelete(id)}
          />
        </div>
      </div>
    </Layout>
  );
}

export default Drivers;
