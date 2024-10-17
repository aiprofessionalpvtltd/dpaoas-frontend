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
  getAllLegislativeBillNotice,
  sendLegislativeBill,
} from "../../../../../../api/APIs/Services/Notice.service";
import Header from "../../../../../../components/Header";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function LegislativeBillList() {
  const navigate = useNavigate();
  const [count, setCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [billData, setBillData] = useState([]);
  const pageSize = 10;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const transformLegislativeData = (apiData) => {
    return apiData.map((item, index) => ({
      "S.No": index + 1,
      id: item?.id,
      title: item?.title ? item?.title : "",
      memberName: item?.member?.memberName,
      noticeOfficeDiraryDate: item?.date
        ? moment(item?.date).format("DD-MM-YYYY")
        : "",
      noticeOfficeDiaryTime: item?.noticeOfficeDiaryTime
        ? moment(item?.noticeOfficeDiaryTime, "hh:mm A").format("hh:mm A")
        : "",
      // sessionno: item?.session?.sessionName ? item?.session?.sessionName : "",

      description: item?.description ? item?.description : "",
      device: item?.device ? item?.device : "",
      SubmittedOnBySenator: moment(item?.createdAt).format("DD-MM-YYYY"),
      isActive: item?.isActive ? item?.isActive : "",
    }));
  };

  const getAllLegislativeBillApi = useCallback(async () => {
    try {
      const response = await getAllLegislativeBillNotice(currentPage, pageSize);
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

  const sendBill = async (id) => {
    try {
      const data = {
        billSentDate: new Date(),
      };
      const response = await sendLegislativeBill(id, data);
      if (response?.success) {
        showSuccessMessage(response.message);
        getAllLegislativeBillApi();
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        title1={"Private Member Bills"}
      />
      <div class="row mt-5">
        <div class="col-12">
          <CustomTable
            singleDataCard={true}
            block={false}
            data={billData}
            addBtnText={"Create Private  Member Bill"}
            tableTitle="Private Member Bills"
            handlePageChange={handlePageChange}
            hideBtn={true}
            currentPage={currentPage}
            pageSize={pageSize}
            headertitlebgColor={"#666"}
            headertitletextColor={"#FFF"}
            totalCount={count}
            handleAdd={() =>
              navigate("/notice/legislation/private-bill/addedit")
            }
            handleEdit={(item) =>
              navigate("/notice/legislation/private-bill/addedit", {
                state: { id: item?.id },
              })
            }
            handleDelete={(item) => handleDelete(item.id)}
            showSent={true}
            handleSent={(item) => sendBill(item?.id)}
          />
        </div>
      </div>
    </Layout>
  );
}
export default LegislativeBillList;
