import React, { useCallback, useEffect, useState } from "react";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";
import { Layout } from "../../../../../../components/Layout";
import { NoticeSidebarItems } from "../../../../../../utils/sideBarItems";
import {
  DeleteLegislativeBill,
  getAllLegislativeBill,
} from "../../../../../../api/APIs/Services/Notice.service";
import Header from "../../../../../../components/Header";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function LegislativeBillList() {
  const navigate = useNavigate();
  const [count, setCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [billData, setBillData] = useState([]);
  const pageSize = 5;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const transformLegislativeData = (apiData) => {
    return apiData.map((item, index) => ({
      SR: item?.id,
      title: item?.title ? item?.title : "",
      sessionno: item?.session?.sessionName ? item?.session?.sessionName : "",
      date: item?.date ? moment(item?.date).format("DD-MM-YYYY") : "",
      description: item?.description ? item?.description : "",
      device: item?.device ? item?.device : "",
      isActive: item?.isActive ? item?.isActive : "",
    }));
  };

  const getAllLegislativeBillApi = useCallback(async () => {
    try {
      const response = await getAllLegislativeBill(currentPage, pageSize);
      if (response?.success) {
        setCount(response?.data?.count);
        const trensferData = transformLegislativeData(
          response?.data?.legislativeBills
        );
        setBillData(trensferData);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  }, [currentPage, pageSize, setCount, setBillData]);

  const handleDelete = async (id) => {
    try {
      const response = await DeleteLegislativeBill(id);
      if (response?.success) {
        showSuccessMessage(response.message);
        getAllLegislativeBillApi();
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  };

  useEffect(() => {
    getAllLegislativeBillApi();
  }, [currentPage]);
  return (
    <Layout
      module={true}
      sidebarItems={NoticeSidebarItems}
      centerlogohide={true}
    >
      <ToastContainer />
      <Header
        dashboardLink={"/notice/dashboard"}
        addLink1={"/"}
        title1={"Legislative Bill"}
      />
      <div class="row mt-5">
        <div class="col-12">
          <CustomTable
            singleDataCard={true}
            block={false}
            data={billData}
            hidebtn1={true}
            // addBtnText={"Create Speech On Demand"}
            tableTitle="Legislative Bill"
            handlePageChange={handlePageChange}
            hideBtn={true}
            currentPage={currentPage}
            pageSize={pageSize}
            headertitlebgColor={"#666"}
            headertitletextColor={"#FFF"}
            totalCount={count}
            // handleAdd={() => navigate("/notice/speech-on-demand/addedit")}
            handleEdit={(item) =>
              navigate("/notice/legislation/legislative-bill/addedit", {
                state: { id: item?.SR },
              })
            }
            handleDelete={(item) => handleDelete(item.SR)}
          />
        </div>
      </div>
    </Layout>
  );
}
export default LegislativeBillList;
