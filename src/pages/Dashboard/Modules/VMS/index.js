import React, { useState, useEffect } from "react";
import { Layout } from "../../../../components/Layout";
import { VMSsidebarItems } from "../../../../utils/sideBarItems";
import CustomTable from "../../../../components/CustomComponents/CustomTable";
import { useNavigate } from "react-router-dom";
import Header from "../../../../components/Header";
import {
  DeletePasses,
  SearchPasses,
  getPassPdfBYPassID,
  getPasses,
} from "../../../../api/APIs";
import { ToastContainer } from "react-toastify";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../utils/ToastAlert";
import { setPassID } from "../../../../api/Auth";
import moment from "moment";

function VMSDashboard() {
  const navigate = useNavigate();
  const [pdfUrl, setPdfUrl] = useState(null);

  const [passAllData, setPassAllData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 5; // Set your desired page size

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  const transformLeavesData = (apiData) => {
    return apiData.map((leave) => ({
      id: leave.id,
      passDate: moment(leave.passDate).format("YYYY/MM/DD"),
      requestedBy: leave.requestedBy,
      branch: leave.branch,
      visitPurpose: leave.visitPurpose,
      cardType: leave.cardType,
      companyName: leave.companyName,
      fromDate: moment(leave.fromDate).format("YYYY/MM/DD"),
      toDate: moment(leave.toDate).format("YYYY/MM/DD"),
      allowOffDays: leave.allowOffDays,
      remarks: leave.remarks,
      passStatus: leave.passStatus,
      createdAt: moment(leave.createdAt).format("YYYY/MM/DD"),
      updatedAt: moment(leave.updatedAt).format("YYYY/MM/DD"),
    }));
  };

  const getPassesData = async () => {
    try {
      const response = await getPasses(currentPage, pageSize);
      if (response?.success) {
        // showSuccessMessage(response?.message);
        const transformedData = transformLeavesData(response?.data);
        setPassAllData(transformedData);
      }
    } catch (error) {
      console.log(error);
      showErrorMessage(error?.response?.data?.error);
    }
  };

  const HandlePrint = async (id) => {
    try {
      const response = await getPassPdfBYPassID(id);
      console.log("response", response?.data?.fileLink);
      const url = `http://172.16.170.8:5152${response?.data?.fileLink}`;
      window.open(url, "_blank");
      // setPdfUrl(url)
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await DeletePasses(id);
      if (response?.success) {
        showSuccessMessage(response?.message);

        // Filter out the deleted item from the state
        // setPassAllData((prevData) => prevData.filter(item => item.id !== id));

        // Toggle refreshData to trigger a re-render (optional)
        getPassesData();
      }
    } catch (error) {
      console.log(error);
      // Handle error here
    }
  };

  const searchPassess = async (data) => {
    try {
      const response = await SearchPasses(data); // Add await here
      if (response?.success) {
        console.log("response Response", response.data);
        // showSuccessMessage(response?.message);

        // Assuming response.data is an array of data
        const transformedData = transformLeavesData(response.data);
        setPassAllData(transformedData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPassesData();
  }, []);

  return (
    <Layout module={true} sidebarItems={VMSsidebarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/vms/dashboard"}
        addLink1={"/vms/dashboard"}
        title1={"Passes"}
      />
      <ToastContainer />
      {/* <div>
      <iframe title="PDF Viewer" src={pdfUrl} width="100%" height="500px" />
    </div> */}
      <div class="row">
        <div class="col-12">
          <CustomTable
            block={true}
            data={passAllData}
            tableTitle="Passes"
            addBtnText="Add Pass"
            handleAdd={() => navigate("/vms/addeditpass")}
            handleEdit={(item) => navigate("/vms/addeditpass", { state: item })}
            hideUserIcon={true}
            handleUser={(item) => {
              setPassID(item.id);
              navigate("/vms/visitor", { state: item });
            }}
            handleDuplicate={(item) =>
              navigate("/vms/duplicatepass", { state: item.id })
            }
            seachBarShow={true}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            pageSize={pageSize}
            handlePrint={(item) => HandlePrint(item.id)}
            headertitlebgColor={"#666"}
            headertitletextColor={"#FFF"}
            handleDelete={(item) => handleDelete(item.id)}
            searchonchange={(e) => searchPassess(e.target.value)}
          // handlePrint={}
          // handleUser={}
          // handleDelete={(item) => handleDelete(item.id)}
          />
        </div>
      </div>
    </Layout>
  );
}

export default VMSDashboard;
