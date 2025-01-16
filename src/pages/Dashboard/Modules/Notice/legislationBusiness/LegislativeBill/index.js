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
  getCurrentAllPrivateMemberBills,
  sendLegislativeBill,
} from "../../../../../../api/APIs/Services/Notice.service";
import Header from "../../../../../../components/Header";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function LegislativeBillList({ isDashboardData }) {
  const navigate = useNavigate();
  const [count, setCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [billData, setBillData] = useState([]);
  const pageSize = 10;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const transformLegislativeData = (apiData) => {
    console.log("apiData bills bills", apiData);
    return apiData.map((item, index) => ({
      "S.No": index + 1,
      id: item?.id,
      title: item?.title ? item?.title : "",
      memberName:
        item?.legislationMovers
          ?.map((mover) => mover?.member?.memberName)
          .join(", ") ||
        item?.member?.memberName ||
        "---",

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
    let response;
    const data = { legislativeSentStatus: "inNotice" };
    try {
      if (isDashboardData) {
        response = await getCurrentAllPrivateMemberBills(
          currentPage,
          pageSize,
          data
        );
      } else {
        response = await getAllLegislativeBillNotice(currentPage, pageSize);

        console.log("responseresponseresponse", response);
      }
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

  const sendBill = async (item) => {
    console.log("send Bill Clicked and called");
    console.log("ITemmmmm", item);
    // try {
    //   const data = {
    //     billSentDate: new Date(),
    //   };
    //   const response = await sendLegislativeBill(id, data);
    //   if (response?.success) {
    //     showSuccessMessage(response.message);
    //     getAllLegislativeBillApi();
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <>
      {isDashboardData ? (
        <div>
          <div className="container-fluid">
            <div className="card mt-1">
              <div
                className="card-header red-bg"
                style={{ background: "#14ae5c" }}
              >
                <h1>Private Member List</h1>
              </div>
              <div className="card-body">
                <div style={{ marginTop: "20px" }}>
                  <CustomTable
                    block={false}
                    data={billData}
                    hidebtn1={isDashboardData}
                    addBtnText="Create Private Member Bill"
                    tableTitle="Private Member Bills"
                    handlePageChange={handlePageChange}
                    hideBtn
                    currentPage={currentPage}
                    pageSize={pageSize}
                    headertitlebgColor="#666"
                    headertitletextColor="#FFF"
                    totalCount={count}
                    handleAdd={() =>
                      navigate("/notice/legislation/private-bill/addedit")
                    }
                    handleEdit={(item) =>
                      navigate("/notice/legislation/private-bill/addedit", {
                        state: { id: item?.id },
                      })
                    }
                    hideDeleteIcon
                    showSent
                    handleSent={(item) => sendBill(item)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Layout module sidebarItems={NoticeSidebarItems} centerlogohide>
          <ToastContainer />
          {!isDashboardData && (
            <Header
              dashboardLink="/notice/dashboard"
              addLink1="/"
              title1="Private Member Bills"
            />
          )}
          <div className="container-fluid">
            <div className="card mt-1">
              <div
                className="card-header red-bg"
                style={{ background: "#14ae5c" }}
              >
                <h1>Private Member Bill List</h1>
              </div>
              <div className="card-body">
                <div style={{ marginTop: "20px" }}>
                  <CustomTable
                    block={false}
                    data={billData}
                    hidebtn1={isDashboardData}
                    addBtnText="Create Private Member Bill"
                    tableTitle="Private Member Bills"
                    handlePageChange={handlePageChange}
                    hideBtn
                    currentPage={currentPage}
                    pageSize={pageSize}
                    headertitlebgColor="#666"
                    headertitletextColor="#FFF"
                    totalCount={count}
                    handleAdd={() =>
                      navigate("/notice/legislation/private-bill/addedit")
                    }
                    handleEdit={(item) =>
                      navigate("/notice/legislation/private-bill/addedit", {
                        state: { id: item?.id },
                      })
                    }
                    hideDeleteIcon
                    showSent
                    handleSent={(item) => sendBill(item?.id)}
                  />
                </div>
              </div>
            </div>
          </div>
        </Layout>
      )}
    </>
  );
}
export default LegislativeBillList;
