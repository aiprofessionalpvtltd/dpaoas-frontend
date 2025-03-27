import React, { useEffect, useState } from "react";
import { LegislationSideBarItems } from "../../../../../../utils/sideBarItems";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import { Layout } from "../../../../../../components/Layout";
import { ToastContainer } from "react-toastify";
import Header from "../../../../../../components/Header";
import { useNavigate } from "react-router-dom";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";
import {
  deleteOrderOfTheDay,
  listOrderOfTheDay,
  OrderOfTheDayByID,
} from "../../../../../../api/APIs/Services/Legislation.service";
import PDFOrderOfDayModel from "../../../../../../components/CustomComponents/OrderofDay/PDFPreviewModel";

function SupplementaryOrderOfDayList() {
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
    actingSecretary,
    content = [],
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
      actingSecretary: item?.actingSecretary && item?.actingSecretary,
    }));
  };

  const hendleOrderOfTheDayList = async () => {
    try {
      const response = await listOrderOfTheDay(currentPage, pageSize);
      if (response?.success) {
        const transformedData = transformOrderOfTheDayData(response?.data);
        setCount(response?.data?.count);
        const supplementaryOrdersData = transformedData.filter(
          (item) => item.orderOfDayType === "Supplementary"
        );
        setOrderOfTheDayData(supplementaryOrdersData);
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
        title1={"List Supplementary Order Of The Day"}
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
          actingSecretary={actingSecretary}
          type={"Supplementary"}
          // isMondayCheckBoxChecked={isMondayCheckBoxChecked}
        />
      )}

      <div class="row">
        <div class="col-12">
          <CustomTable
            block={false}
            data={orderOfTheDayData}
            tableTitle="Supplementary Order Of The Day List"
            addBtnText="Add New Supplementary Order Of The Day"
            handleAdd={() =>
              navigate("/lgms/dashboard/order-of-the-day/addedit", {
                state: { isSupplementaryOrderOfDay: true },
              })
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

export default SupplementaryOrderOfDayList;
