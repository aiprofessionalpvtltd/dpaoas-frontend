import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CustomTable from "../../../../../components/CustomComponents/CustomTable";
import { Layout } from "../../../../../components/Layout";
import { VMSsidebarItems } from "../../../../../utils/sideBarItems";
import Header from "../../../../../components/Header";
import {
  DeleteVisitorsByVisitorId,
  getVisirorsByPassId,
} from "../../../../../api/APIs";
import { showSuccessMessage } from "../../../../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";
import { getPassID } from "../../../../../api/Auth";

function VMSVisitors() {
    const location = useLocation()
    // console.log("visitors screen pass is\d",location?.state?.id)
    const PassID = getPassID()
    const navigate = useNavigate();
    const [allvisitorData, setAllVisitorData] = useState([])
    const [currentPage, setCurrentPage] = useState(0);
    const [count, setCount] = useState(null);
    const pageSize = 7; // Set your desired page size

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  const data = [
    {
      id: 1,
      name: "Umar",
      cnic: "61101-",
      details: "Senate Visit 2023",
      visitorStatus: "active",
      createdAt: "2023-11-21T10:47:24.052Z",
      updatedAt: "2023-11-21T10:47:24.052Z",
    },
    {
      id: 2,
      name: "Saqib khan",
      cnic: "61101-",
      details: "Senate Visit 2023",
      visitorStatus: "inactive",
      createdAt: "2023-11-21T10:47:24.052Z",
      updatedAt: "2023-11-21T10:47:24.052Z",
    },
  ];
  const transformLeavesData = (apiData) => {
    return apiData.map((leave) => ({
      id: leave.id,
      name: leave.name,
      cnic: leave.cnic,
      details: leave.details,
      visitorStatus: leave.visitorStatus,
      createdAt: leave.createdAt,
      updatedAt: leave.updatedAt,
    }));
  };
  const getVisitorsAPi = async () => {
    try {
      const response = await getVisirorsByPassId(PassID);
      if (response?.success) {
        // showSuccessMessage(response?.message)
        const transformedData = transformLeavesData(response.data);
        setAllVisitorData(transformedData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getVisitorsAPi();
  }, [allvisitorData]);

  const handleDelete = async (id) => {
    try {
      const response = await DeleteVisitorsByVisitorId(id);
      if (response?.success) {
        showSuccessMessage(response?.message);

        // Filter out the deleted item from the state
        // setPassAllData((prevData) => prevData.filter(item => item.id !== id));

        // Toggle refreshData to trigger a re-render (optional)
        getVisitorsAPi();
      }
    } catch (error) {
      console.log(error);
      // Handle error here
    }
  };
  return (
    <Layout module={true} sidebarItems={VMSsidebarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/vms/dashboard"}
        addLink1={"/vms/visitor"}
        title1={"Visitors"}
      />
      <ToastContainer />

      <div class="row">
        <div class="col-12">
          <CustomTable
            data={allvisitorData}
            tableTitle="Visitors Detail"
            addBtnText="Add Visitor"
            handleAdd={() =>
              navigate("/vms/addeditvisitor", { state: location?.state?.id })
            }
            handleEdit={(item) =>
              navigate("/vms/addeditvisitor", { state: item })
            }
            seachBarShow={true}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            pageSize={pageSize}
            headertitlebgColor={"#666"}
            headertitletextColor={"#FFF"}
            handleDelete={(item) => handleDelete(item.id)}
            // handlePrint={}
            // handleUser={}
            // handleDelete={(item) => handleDelete(item.id)}
          />
        </div>
      </div>
    </Layout>
  );
}

export default VMSVisitors;
