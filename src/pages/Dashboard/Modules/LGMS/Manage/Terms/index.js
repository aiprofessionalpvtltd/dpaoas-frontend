import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../../../../../components/Layout";
import {
  LegislationSideBarItems,
  QMSSideBarItems,
} from "../../../../../../utils/sideBarItems";
import Header from "../../../../../../components/Header";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import {
  deleteTerms,
  getAllTerms,
} from "../../../../../../api/APIs/Services/ManageQMS.service";
import moment from "moment";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";

function LGMSTerms() {
  const navigate = useNavigate();
  const [terms, setTerms] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(null);
  const pageSize = 10; // Set your desired page size

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  const transformData = (apiData) => {
    return apiData.map((item) => ({
      id: item.id,
      tenure: `${item?.tenure?.tenureName}`,
      termName: `${item.termName}`,
      fromDate: moment(item.fromDate).format("YYYY/MM/DD"),
      toDate: moment(item.toDate).format("YYYY/MM/DD"),
      status: `${item.status}`,
    }));
  };

  const handleTerms = async () => {
    try {
      const response = await getAllTerms(currentPage, pageSize);
      if (response?.success) {
        setCount(response?.count);
        const transformedData = transformData(response.data?.terms);
        setTerms(transformedData);
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    handleTerms();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await deleteTerms(id);
      if (response?.success) {
        showSuccessMessage(response.message);
        handleTerms();
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  };

  return (
    <Layout
      module={true}
      sidebarItems={LegislationSideBarItems}
      centerlogohide={true}
    >
      <Header
        dashboardLink={"lgms/manage"}
        addLink1={"/lgms/dashboard/manage/terms/list"}
        title1={"Terms"}
      />
      <ToastContainer />

      <div class="container-fluid dash-detail-container card">
        <div class="row">
          <div class="col-12">
            <CustomTable
              data={terms}
              tableTitle="Terms List"
              addBtnText="Add Terms"
              handleAdd={() => navigate("/lgms/dashboard/manage/terms/addedit")}
              handleEdit={(item) =>
                navigate("/lgms/dashboard/manage/terms/addedit", {
                  state: item,
                })
              }
              handleDelete={(item) => handleDelete(item.id)}
              headertitlebgColor={"#666"}
              headertitletextColor={"#FFF"}
              handlePageChange={handlePageChange}
              currentPage={currentPage}
              pageSize={pageSize}
              totalCount={count}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default LGMSTerms;
