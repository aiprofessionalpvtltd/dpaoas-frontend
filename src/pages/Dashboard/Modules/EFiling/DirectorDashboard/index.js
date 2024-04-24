import React, { useEffect, useState } from "react";
import { Layout } from "../../../../../components/Layout";
import Header from "../../../../../components/Header";
import {
  EfilingSideBarBranchItem,
  EfilingSideBarItem,
} from "../../../../../utils/sideBarItems";
import NoticeStatsCard from "../../../../../components/CustomComponents/NoticeStatsCard";
import {
  faClipboardQuestion,
  faFileImport,
  faScaleBalanced,
} from "@fortawesome/free-solid-svg-icons";
import {
  getApprovelStats,
  getsentAndRecievedFRStats,
  getsentAndRecievedFilesStats,
} from "../../../../../api/APIs/Services/efiling.service";
import { getUserData } from "../../../../../api/Auth";
import { Link, useNavigate } from "react-router-dom";
import { EFilingNotifications } from "../../../../../components/NotificationsHeaders/EFilingNotifications";
import CustomTable from "../../../../../components/CustomComponents/CustomTable";
import moment from "moment";

function DirectorDashboard() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("FRrecive");
  const [selectedFileTab, setSelectedFIleTab] = useState("FileRecived");
  const [currentPage, setCurrentPage] = useState(0);
  const [togleTable, setTogleTable] = useState(false);
  const [fileTogleTable, setTogleFileTable] = useState(false);
  const [frsentData, setFrsentData] = useState([]);
  const [frrecivedData, setFrRecivedData] = useState([]);
  const [count, setCount] = useState(null);
  const [frrecivedCount, setFRRecivedCount] = useState(null);
  const [filerecivedCount, setFIleRecivedCount] = useState(null);
  const [fileSentCount, setFIleSentCount] = useState(null);
  const [fileSentData, setFilesentData] = useState([]);
  const [filerecivedData, setFileRecivedData] = useState([]);

  const pageSize = 10;

  const userData = getUserData();
  const [fileStatsData, setFileStatsData] = useState(null);
  const [frStatsData, setFrStatsData] = useState(null);
  const [approvelStatsData, setApprovelStatsData] = useState(null);

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  const transformFilesdata = (apiData, id) => {
    return apiData.map((item) => ({
      caseId: item?.fkCaseId,
      internalId: item?.file?.id,
      SNo: item?.id,
      ...(id === 1 && {
        Sender: `${item?.submittedUser?.employee?.firstName} ${item?.submittedUser?.employee?.lastName}`,
      }),
      ...(id !== 1 && {
        Receiver: `${item?.assignedUser?.employee?.firstName} ${item?.assignedUser?.employee?.lastName}`,
      }),
      HeadingNumber: item?.file?.mainHeading?.mainHeadingNumber,
      mainHeading: item?.file?.mainHeading?.mainHeading,
      year: item?.file?.year,
      fileNumber: item?.file?.fileNumber,
      fileSubject: item?.file?.fileSubject,
    }));
  };

  const getAllStats = async () => {
    try {
      const response = await getsentAndRecievedFilesStats(userData?.fkUserId);
      if (response?.success) {
        setFIleSentCount(response?.data?.sentFiles?.count);
        setFIleRecivedCount(response?.data?.receivedFiles?.count);
        const transformsendData = transformFilesdata(
          response?.data?.sentFiles?.rows,
          1
        );
        setFilesentData(transformsendData);
        const transformrecivedData = transformFilesdata(
          response?.data?.receivedFiles?.rows,
          0
        );
        setFileRecivedData(transformrecivedData);
        setFileStatsData(response?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const transformFreshReceiptdata = (apiData) => {
    return apiData.map((item) => ({
      internalId: item?.freshReceipt?.id,
      frType: item?.freshReceipt?.frType,
      Sender: item?.submittedUser
        ? item?.submittedUser?.employee?.firstName
        : "---",
      Receiver: item?.assignedUser
        ? item?.assignedUser?.employee?.firstName
        : "---",
      // Status: item?.fileRemarksData?.length > 0 ? item?.fileRemarksData[item?.fileRemarksData?.length - 1]?.CommentStatus : "Draft",
      frSubject: item?.freshReceipt?.frSubject,
      referenceNumber: item?.freshReceipt?.referenceNumber,
      frDate: moment(item?.frDate).format("DD/MM/YYYY"),
      // DiaryDate: item?.freshReceiptDiaries ? moment(item?.freshReceiptDiaries?.diaryDate).format("DD/MM/YYYY") : "---",
      // staus:item?.status
    }));
  };
  const getAllFRStats = async () => {
    try {
      const response = await getsentAndRecievedFRStats(userData?.fkUserId);
      if (response?.success) {
        setFrStatsData(response?.data);
        setCount(response?.data?.sentFRs?.count);
        setFRRecivedCount(response?.data?.receivedFRs?.count);
        const transformsentData = transformFreshReceiptdata(
          response?.data?.sentFRs?.rows
        );
        const transformsentrecivedData = transformFreshReceiptdata(
          response?.data?.receivedFRs?.rows
        );
        setFrRecivedData(transformsentrecivedData);
        setFrsentData(transformsentData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllApprovelStatsApi = async () => {
    try {
      const response = await getApprovelStats(userData?.fkUserId);
      if (response?.success) {
        setApprovelStatsData(response?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllApprovelStatsApi();
    getAllStats();
    getAllFRStats();
    // getUserData()
  }, []);

  // useEffect(() => {
  //   window.location.reload(true)
  // },[])
  return (
    <Layout
      module={false}
      centerlogohide={true}
      sidebarItems={
        userData && userData?.userType === "Officer"
          ? EfilingSideBarItem
          : EfilingSideBarBranchItem
      }
      dashboardLink={"/efiling/dashboard"}
      addLink1={"/efiling/director-deshboard"}
      title1={"E-Filing"}
      width={"500px"}
      marginTop={"0px"}
      breadcrumbs={true}
    >
      {/* <EFilingNotifications notificationType="Notifications" /> */}

      <h2 style={{ marginLeft: 15, marginBottom: 30, color: "#820001" }}>
        {" "}
        {userData && `${userData?.department?.departmentName} Branch`}
      </h2>
      <div style={{ marginLeft: 15 }}>
        <h2
          style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "10px" }}
        >
          Today's Stats
        </h2>
        <div class="row">
          <div class="col-md-12">
            <div class="mt-2 mb-4">
              <div class="row">
                <NoticeStatsCard
                  onClick={() => {
                    setTogleTable(!togleTable);
                    setTogleFileTable(false);
                  }}
                  title={"Fresh Receipts (FRs)"}
                  icon={faClipboardQuestion}
                  iconBgColor={"#FFA500"}
                  total={frStatsData && frStatsData?.totalFRs}
                  sent={frStatsData && frStatsData?.sentFRs?.count}
                  received={frStatsData && frStatsData?.receivedFRs?.count}
                />

                <NoticeStatsCard
                  onClick={() => {
                    setTogleFileTable(!fileTogleTable);
                    setTogleTable(false);
                  }}
                  title={"Files"}
                  icon={faClipboardQuestion}
                  iconBgColor={"#FFA500"}
                  total={fileStatsData && fileStatsData?.totalFiles}
                  sent={fileStatsData && fileStatsData?.sentFiles?.count}
                  received={
                    fileStatsData && fileStatsData?.receivedFiles?.count
                  }
                />
                {/* <NoticeStatsCard ReceivedText={"Disapproved"} SentText={"Approved"} title={"Approval"} icon={faFileImport} iconBgColor={"#007bff"} total={approvelStatsData && approvelStatsData?.totalFiles} sent={approvelStatsData && approvelStatsData?.approvedFiles} received={approvelStatsData && approvelStatsData?.disapprovedFiles} /> */}
              </div>
              <div class="row">
                <div class="col-md-12 mt-5">
                  <div class="mt-2 mb-4">
                    <div class="row">
                      <NoticeStatsCard
                        title={"Approved"}
                        icon={faClipboardQuestion}
                        overall={true}
                        iconBgColor={"#FFA500"}
                        total={
                          approvelStatsData && approvelStatsData?.approvedFiles
                        }
                        ColValue={"col"}
                      />
                      <NoticeStatsCard
                        title={"Submit for Approval"}
                        icon={faClipboardQuestion}
                        overall={true}
                        iconBgColor={"#FFA500"}
                        total={
                          approvelStatsData &&
                          approvelStatsData?.submitForApproval
                        }
                        ColValue={"col"}
                      />
                      <NoticeStatsCard
                        title={"Under Discussion"}
                        icon={faFileImport}
                        overall={true}
                        iconBgColor={"#FFA500"}
                        total={
                          approvelStatsData && approvelStatsData?.discussedFiles
                        }
                        ColValue={"col"}
                      />
                      <NoticeStatsCard
                        title={"NFA"}
                        icon={faFileImport}
                        overall={true}
                        iconBgColor={"#007bff"}
                        total={approvelStatsData && approvelStatsData.nfaFiles}
                        ColValue={"col"}
                      />
                      <NoticeStatsCard
                        title={"Pending"}
                        icon={faFileImport}
                        overall={true}
                        iconBgColor={"#007bff"}
                        total={
                          approvelStatsData && approvelStatsData.pendingFiles
                        }
                        ColValue={"col"}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* FR Sent Recive Show */}
        {togleTable ? (
          <div>
            <div style={{ padding: "25px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ul className="nav nav-tabs mb-3 mt-3" id="ex1" role="tablist">
                  <li
                    className="nav-item"
                    role="presentation"
                    onClick={() => setSelectedTab("FRrecive")}
                  >
                    <button
                      type="button"
                      className={
                        selectedTab === "FRrecive"
                          ? "nav-link active"
                          : "nav-link"
                      }
                      style={{ width: "170px" }}
                      data-bs-toggle="tab"
                      role="tab"
                      aria-controls="ex1-tabs-2"
                      aria-selected={
                        selectedTab === "FRrecive" ? "true" : "false"
                      }
                    >
                      FR Received
                    </button>
                  </li>
                  <li
                    className="nav-item"
                    role="presentation"
                    onClick={() => setSelectedTab("FRsent")}
                  >
                    <button
                      type="button"
                      className={
                        selectedTab === "FRsent"
                          ? "nav-link active"
                          : "nav-link"
                      }
                      style={{ width: "170px" }}
                      data-bs-toggle="tab"
                      role="tab"
                      aria-controls="ex1-tabs-1"
                      aria-selected={
                        selectedTab === "FRsent" ? "true" : "false"
                      }
                    >
                      FR sent
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            <div className="tab-content" id="ex1-content">
              {selectedTab === "FRsent" ? (
                // Render content for the 'Noting' tab
                <section class="mb-5">
                  <CustomTable
                    hidebtn1={true}
                    // ActionHide={true}
                    hideBtn={true}
                    data={frsentData}
                    tableTitle="Sent FRs"
                    headertitlebgColor={"#666"}
                    headertitletextColor={"#FFF"}
                    handlePageChange={handlePageChange}
                    currentPage={currentPage}
                    pageSize={pageSize}
                    totalCount={count}
                    singleDataCard={true}
                    showAssigned={true}
                    hideDeleteIcon={true}
                    showEditIcon={true}
                    hendleAssigned={(item) =>
                      navigate("/efiling/dashboard/fresh-receipt/frdetail", {
                        state: { id: item.internalId, view: false },
                      })
                    }
                  />
                </section>
              ) : (
                <section class="mb-5">
                  <CustomTable
                    hidebtn1={true}
                    // ActionHide={true}
                    hideBtn={true}
                    data={frrecivedData}
                    tableTitle="Received FRs"
                    headertitlebgColor={"#666"}
                    headertitletextColor={"#FFF"}
                    handlePageChange={handlePageChange}
                    currentPage={currentPage}
                    pageSize={pageSize}
                    totalCount={frrecivedCount}
                    singleDataCard={true}
                    showAssigned={true}
                    hideDeleteIcon={true}
                    showEditIcon={true}
                    hendleAssigned={(item) =>
                      navigate("/efiling/dashboard/fresh-receipt/frdetail", {
                        state: { id: item.internalId, view: false },
                      })
                    }
                  />
                </section>
              )}
            </div>
          </div>
        ) : fileTogleTable ? (
          <div>
            <div style={{ padding: "25px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ul className="nav nav-tabs mb-3 mt-3" id="ex1" role="tablist">
                  <li
                    className="nav-item"
                    role="presentation"
                    onClick={() => setSelectedFIleTab("FileRecived")}
                  >
                    <button
                      type="button"
                      className={
                        selectedFileTab === "FileRecived"
                          ? "nav-link active"
                          : "nav-link"
                      }
                      style={{ width: "170px" }}
                      data-bs-toggle="tab"
                      role="tab"
                      aria-controls="ex1-tabs-2"
                      aria-selected={
                        selectedFileTab === "FileRecived" ? "true" : "false"
                      }
                    >
                      File Received
                    </button>
                  </li>
                  <li
                    className="nav-item"
                    role="presentation"
                    onClick={() => setSelectedFIleTab("Filesent")}
                  >
                    <button
                      type="button"
                      className={
                        selectedFileTab === "Filesent"
                          ? "nav-link active"
                          : "nav-link"
                      }
                      style={{ width: "170px" }}
                      data-bs-toggle="tab"
                      role="tab"
                      aria-controls="ex1-tabs-1"
                      aria-selected={
                        selectedFileTab === "Filesent" ? "true" : "false"
                      }
                    >
                      File sent
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            <div className="tab-content" id="ex1-content">
              {selectedFileTab === "Filesent" ? (
                // Render content for the 'Noting' tab
                <section class="mb-5">
                  <CustomTable
                    hidebtn1={true}
                    // ActionHide={true}
                    hideBtn={true}
                    data={fileSentData}
                    tableTitle="Sent Files"
                    headertitlebgColor={"#666"}
                    headertitletextColor={"#FFF"}
                    handlePageChange={handlePageChange}
                    currentPage={currentPage}
                    pageSize={pageSize}
                    totalCount={fileSentCount}
                    singleDataCard={true}
                    hideDeleteIcon={true}
                    showEditIcon={true}
                    showView={true}
                    handleView={(item) =>
                      navigate("/efiling/dashboard/fileDetail", {
                        state: {
                          view: true,
                          id: item?.caseId,
                          fileId: item?.internalId,
                        },
                      })
                    }
                  />
                </section>
              ) : (
                <section class="mb-5">
                  <CustomTable
                    hidebtn1={true}
                    // ActionHide={true}
                    hideBtn={true}
                    data={filerecivedData}
                    tableTitle="Received Files"
                    headertitlebgColor={"#666"}
                    headertitletextColor={"#FFF"}
                    handlePageChange={handlePageChange}
                    currentPage={currentPage}
                    pageSize={pageSize}
                    totalCount={filerecivedCount}
                    singleDataCard={true}
                    hideDeleteIcon={true}
                    showEditIcon={true}
                    showView={true}
                    handleView={(item) =>
                      navigate("/efiling/dashboard/fileDetail", {
                        state: {
                          view: true,
                          id: item?.caseId,
                          fileId: item?.internalId,
                        },
                      })
                    }
                  />
                </section>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </Layout>
  );
}

export default DirectorDashboard;
