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
import {
  deleteOrderOfTheDay,
  listOrderOfTheDay,
  OrderOfTheDayByID,
} from "../../../../../api/APIs/Services/Legislation.service";
import PDFOrderOfDayModel from "../../../../../components/CustomComponents/OrderofDay/PDFPreviewModel";

function ListOrderOfDay() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(null);
  const [orderOfTheDayData, setOrderOfTheDayData] = useState([]);
  const [singleOrderofDay, setSingleOrderofDay] = useState(null);
  const {
    id,
    sittingId,
    sittingTime,
    sittingDate,
    content = [],
    isMondayCheckBoxChecked,
    actingSecretary,
  } = singleOrderofDay || {};
  const pageSize = 10; // Set your desired page size

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const transformOrderOfTheDayData = (apiData) => {
    return apiData.map((item) => ({
      id: item?.id,
      sessionName: item?.session?.sessionName,
      sittingDate: item?.sittingDate,
      sittingTime: item?.sittingTime,
      orderOfDayType: item?.type,
    }));
  };

  const hendleOrderOfTheDayList = async () => {
    try {
      const response = await listOrderOfTheDay(currentPage, pageSize);
      if (response?.success) {
        const transformedData = transformOrderOfTheDayData(response?.data);
        const simpleOrdersData = transformedData.filter(
          (item) => item.orderOfDayType === "SimpleOrder"
        );
        setCount(response?.data?.count);
        setOrderOfTheDayData(simpleOrdersData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleView = async (id) => {
    try {
      const response = await OrderOfTheDayByID(id);
      if (response?.success) {
        setSingleOrderofDay(response?.data);
        openModal();
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
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

      {showModal && showModal && (
        <PDFOrderOfDayModel
          showModal={showModal}
          selectedTabData={content}
          closeModal={closeModal}
          session={id}
          formatedData={sittingDate}
          startTime={sittingTime}
          sittingId={sittingId}
          isView={true}
          isMondayCheckBoxChecked={isMondayCheckBoxChecked}
          actingSecretary={actingSecretary}
        />
      )}

      <div class="row">
        <div class="col-12">
          <CustomTable
            block={false}
            data={orderOfTheDayData}
            tableTitle="Order Of The Day List"
            addBtnText="Add New Order Of The Day"
            handleAdd={() =>
              navigate("/lgms/dashboard/order-of-the-day/addedit")
            }
            handleEdit={(item) =>
              navigate("/lgms/dashboard/order-of-the-day/addedit", {
                state: { id: item?.id },
              })
            }
            headertitlebgColor={"#666"}
            singleDataCard={true}
            hideEditIcon={false}
            showEditIcon={false}
            headertitletextColor={"#FFF"}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            pageSize={pageSize}
            ActionHide={false}
            hideDeleteIcon={true}
            totalCount={count}
            // showSent={true}
            // handleSent={() => {}}
            showView={true}
            handleView={(item) => {
              handleView(item?.id);
            }}

            // handleDelete={(item) => handleDelete(item.id)}
          />
        </div>
      </div>
    </Layout>
  );
}

export default ListOrderOfDay;
