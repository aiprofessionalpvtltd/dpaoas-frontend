import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../../../../../components/Layout";
import {
  LegislationSideBarItems,
  QMSSideBarItems,
} from "../../../../../../utils/sideBarItems";
import Header from "../../../../../../components/Header";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import moment from "moment";
import {
  deleteTenures,
  getAllTenures,
} from "../../../../../../api/APIs/Services/ManageQMS.service";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";
import { getAllMinisterTenures } from "../../../../../../api/APIs/Services/LegislationModule.service";

function LGMSMinsisterTenures() {
  const navigate = useNavigate();
  const [ministerTenures, setMinisterTenures] = useState([]);

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
      tenureName: `${item.tenureName}`,
      tenureType: item?.tenureType ? `${item?.tenureType}` : "--",
      fromDate: moment(item.fromDate).format("YYYY/MM/DD"),
      toDate: moment(item.toDate).format("YYYY/MM/DD"),
      status: `${item?.status}`,
    }));
  };

  const handleMinisterTenures = async () => {
    try {
      const response = await getAllMinisterTenures(
        currentPage,
        pageSize,
        "Ministers"
      );
      if (response?.success) {
        setCount(response?.count);
        const transformedData = transformData(response.data?.tenures);
        setMinisterTenures(transformedData);
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    handleMinisterTenures();
  }, [currentPage]);

  // const handleDelete = async (id) => {
  //   try {
  //     const response = await deleteTenures(id);
  //     if (response?.success) {
  //       showSuccessMessage(response.message);
  //       handleTenures();
  //     }
  //   } catch (error) {
  //     showErrorMessage(error.response.data.message);
  //   }
  // };

  return (
    <Layout
      module={true}
      sidebarItems={LegislationSideBarItems}
      centerlogohide={true}
    >
      <Header
        dashboardLink={"lgms/manage"}
        addLink1={"/lgms/dashboard/manage/minister-tenures/list"}
        title1={"Minister's Tenures"}
      />
      <ToastContainer />

      <div class="container-fluid dash-detail-container card">
        <div class="row">
          <div class="col-12">
            <CustomTable
              data={ministerTenures}
              tableTitle="Minister Tenures List"
              addBtnText="Add Minister Tenures"
              handleAdd={() =>
                navigate("/lgms/dashboard/manage/ministers-tenures/addedit")
              }
              handleEdit={(item) =>
                navigate("/lgms/dashboard/manage/ministers-tenures/addedit", {
                  state: item,
                })
              }
              hideDeleteIcon={true}
              // handleDelete={(item) => handleDelete(item.id)}
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

export default LGMSMinsisterTenures;
