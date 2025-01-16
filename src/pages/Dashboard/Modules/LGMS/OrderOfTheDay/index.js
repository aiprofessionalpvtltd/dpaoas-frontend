import React, { useEffect, useState } from "react";
import { LegislationSideBarItems } from "../../../../../utils/sideBarItems";
import CustomTable from "../../../../../components/CustomComponents/CustomTable";
import { Layout } from "../../../../../components/Layout";
import { ToastContainer } from "react-toastify";
import Header from "../../../../../components/Header";
import { useNavigate } from "react-router-dom";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../utils/ToastAlert";
import { deleteOrderOfTheDay, listOrderOfTheDay } from "../../../../../api/APIs/Services/Legislation.service";

function ListOrderOfDay() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(null);
  const [orderOfTheDayData, setOrderOfTheDayData] = useState([]);
  const pageSize = 10; // Set your desired page size

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  const transformOrderOfTheDayData = (apiData) => {
    return apiData.map((item) => ({
      id: item?.id,
      sessionName: item,
      sittingDate: item,
      description: item,
    }));
  };
  const hendleOrderOfTheDayList = async () => {
    try {
      const response = await listOrderOfTheDay(currentPage, pageSize);
      if (response?.success) {
        const transformedData = transformOrderOfTheDayData(
          response?.data?.rows
        );
        setCount(response?.data?.count);
        setOrderOfTheDayData(transformedData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteOrderOfTheDay(id);
      if (response?.success) {
        showSuccessMessage(response.message);
        hendleOrderOfTheDayList();
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  };
  useEffect(() => {
    hendleOrderOfTheDayList();
  }, [currentPage]);
  return (
    <Layout
      module={true}
      sidebarItems={LegislationSideBarItems}
      centerlogohide={true}
    >
      <ToastContainer />
      <Header
        dashboardLink={"/lgms/dashboard"}
        addLink1={"/lgms/dashboard"}
        title1={"list Order Of The Day"}
      />

      <div class="row">
        <div class="col-12">
          <CustomTable
            data={orderOfTheDayData}
            tableTitle="Order Of The Day List"
            addBtnText="Add New Order Of The Day"
            handleAdd={() =>
              navigate("/lgms/dashboard/order-of-the-day/addedit")
            }
            handleEdit={(item) =>
              navigate("/lgms/dashboard/order-of-the-day/addedit", {
                state: item,
              })
            }
            headertitlebgColor={"#666"}
            singleDataCard={true}
            headertitletextColor={"#FFF"}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            pageSize={pageSize}
            // handlePrint={}
            // handleUser={}
            totalCount={count}
            handleDelete={(item) => handleDelete(item.id)}
          />
        </div>
      </div>
    </Layout>
  );
}

export default ListOrderOfDay;
