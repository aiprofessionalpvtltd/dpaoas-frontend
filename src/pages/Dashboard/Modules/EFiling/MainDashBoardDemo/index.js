import { Layout } from "../../../../../components/Layout";
import { getSelectedFileID, getUserData, setCaseIdForDetailPage, setFRAttachmentsData, setFRId, setFileIdForDetailPage } from "../../../../../api/Auth";
import {
  EfilingSideBarBranchItem,
  EfilingSideBarItem,
} from "../../../../../utils/sideBarItems";
import { Padding } from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faEye,
  faFileAlt,
  faFileSignature,
  faMailBulk,
  faReceipt,
} from "@fortawesome/free-solid-svg-icons";
import CalenderImage from "../../../../../assets/calander.png";
import { useCallback, useEffect, useState } from "react";
import {
  DeleteFreshReceipt,
  getAllCasesThroughSearchParams,
  getAllFreshReceipt,
  getApprovelStats,
  getPendingCasesThroughSearchParams,
  getPendingFreshReceipts,
  getsentAndRecievedFRStats,
  getsentAndRecievedFilesStats,
} from "../../../../../api/APIs/Services/efiling.service";
import moment from "moment";
import { keyframes } from "@emotion/react";
import { Box } from "@mui/system";
import { Calendar } from "../../../../../components/Calendar";
import CustomTable from "../../../../../components/CustomComponents/CustomTable";
import { useNavigate } from "react-router-dom";
import { showErrorMessage, showSuccessMessage } from "../../../../../utils/ToastAlert";

function MainDashBoardDemo() {
  const userData = getUserData();
  const navigate = useNavigate();
  const [fileStatsData, setFileStatsData] = useState(null);
  const [frStatsData, setFrStatsData] = useState(null);
  const [fileSentCount, setFileSentCount] = useState(null);
  const [fileRecivedCount, setFileRecivedCount] = useState(null);
  const [frrecivedCount, setFRRecivedCount] = useState(null);
  const [allStatsData, setAllStatsData] = useState([]);
  const [fileSentData, setFilesentData] = useState([]);
  const [filerecivedData, setFileRecivedData] = useState([]);
  const [frsentData, setFrsentData] = useState([]);
  const [frrecivedData, setFrRecivedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(null);
  const [casesData, setCasesData] = useState([]);
  const pageSize = 2;
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Getting Stats Data
  const getAllStatsDataApi = async () => {
    try {
      const response = await getApprovelStats(userData?.fkUserId);
      if (response?.success) {
        setAllStatsData(response?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // TransForm Fr Data
  const transformFreshReceiptdataStats = (apiData) => {
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

  // Getting All Fr Data
  const getAllFRDataApi = async () => {
    try {
      const response = await getsentAndRecievedFRStats(userData?.fkUserId);
      if (response?.success) {
        setFrStatsData(response?.data);
        setCount(response?.data?.sentFRs?.count);
        setFRRecivedCount(response?.data?.receivedFRs?.count);
        const transformsentData = transformFreshReceiptdataStats(
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

  // Getting Files Data
  const getAllFilesDataApi = async () => {
    try {
      const response = await getsentAndRecievedFilesStats(userData?.fkUserId);
      if (response?.success) {
        setFileSentCount(response?.data?.sentFiles);
        setFileRecivedCount(response?.data?.receivedFiles);
        setFileStatsData(response?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const transformFilesCases = (apiData) => {
    return apiData?.map((item, index) => {
      return {
        isEditable: item?.isEditable,
        caseId: item?.fkCaseId,
        internalId: item?.fileData?.id,
        FileNo: item?.fileData?.fileNumber,
        initiatedBy: item?.createdByUser?.firstName,
        Sender:
          item?.fileRemarksData?.length > 0
            ? item?.fileRemarksData[0]?.submittedUser?.employee?.firstName
            : "---",
        Receiver:
          item?.fileRemarksData?.length > 0
            ? item?.fileRemarksData[0]?.assignedUser?.employee?.firstName
            : "---",
        Status: item?.caseStatus || "-",
        MarkedDate:
          item?.fileRemarksData?.length > 0
            ? moment(item?.fileRemarksData[0]?.createdAt).format("DD/MM/YYYY")
            : "---",
        MarkedTime:
          item?.fileRemarksData?.length > 0
            ? moment(item?.fileRemarksData[0]?.createdAt).format("hh:mm A")
            : "---",
        Priority: item?.fileRemarksData?.length > 0 ? item?.fileRemarksData[0]?.priority : "---",
      };
    });
  };  

  const getAllCasesApi = async () => {
      const searchParams = {
        userId: userData?.fkUserId,
        currentPage: currentPage,
        pageSize: pageSize,
        branchId:userData && userData?.fkBranchId
      };
  
      try {
        const response = await getPendingCasesThroughSearchParams(searchParams);
        if (response.success) {
          setCount(response?.data?.count);
  
          const transferData = transformFilesCases(response?.data?.cases);
          setCasesData(transferData);
        }
      } catch (error) {
        console.log(error);
      }
  };

  const [fRCurrentPage, setFrCurrentPage] = useState(0);
  const [frCount, setFRCount] = useState(null);
  const frPageSize = 2; // Set your desired page size
  const [fileData, setFileData] = useState([]);

  const handleFrPageChange = (page) => {
    // Update currentPage when a page link is clicked
    setFrCurrentPage(page);
  };

    const transformFreshReceiptdata = (apiData) => {
        return apiData.map((item) => ({
          isEditable: item?.isEditable,
          id: item?.id,
          frType: item?.frType,
          initiatedBy: item?.createdByUser?.employee?.firstName,
          Sender: item?.freshReceipt?.length > 0 ? item?.freshReceipt[0]?.submittedUser?.employee?.firstName : "---",
          Receiver: item?.freshReceipt?.length > 0 ? item?.freshReceipt[0]?.assignedUser?.employee?.firstName : "---",
          // Status: item?.fileRemarksData?.length > 0 ? item?.fileRemarksData[item?.fileRemarksData?.length - 1]?.CommentStatus : "Draft",
          Status: item?.caseStatus,
          frSubject:item?.frSubject,
          referenceNumber: item?.referenceNumber,
          frDate: moment(item?.frDate).format("DD/MM/YYYY"),
          internalAttachment: item?.freshReceiptsAttachments,
          Priority: item?.freshReceipt.length > 0 ? item?.freshReceipt[0]?.priority : "---",
        }));
      };

      const getAllFreshReceiptAPi = useCallback(async () => {
        try {
            const response = await getPendingFreshReceipts(userData?.fkUserId, fRCurrentPage, frPageSize)
            if (response.success) {
            //   showSuccessMessage(response?.message)
              setFRCount(response?.data?.count)
              const transformedData = transformFreshReceiptdata(response?.data?.freshReceipts)
              setFileData(transformedData)
            }
          } catch (error) {
            // showErrorMessage(error?.response?.data?.message);
          }
      }, [currentPage, pageSize, setCount, setFileData]);

      const handleDelete = async (id) => {
        try {
          const response = await DeleteFreshReceipt(id);
          if (response?.success) {
            showSuccessMessage(response.message);
            getAllFreshReceiptAPi();
          }
        } catch (error) {
          showErrorMessage(error.response.data.message);
        }
      };

  useEffect(() => {
    getAllStatsDataApi();
    getAllFilesDataApi();
    getAllFRDataApi();
  }, []);

  useEffect(() => {
    getAllCasesApi();
  }, [currentPage]);

  useEffect(() => {
    getAllFreshReceiptAPi();
  }, [fRCurrentPage])

  const blink = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
`;

const BlinkingIndicator = () => {
  return (
    <Box
      sx={{
        width: 15,
        height: 15,
        borderRadius: '50%',
        marginTop: "5px",
        backgroundColor: 'red',
        animation: `${blink} 1s infinite`,
      }}
    ></Box>
  );
};

const NonBlinkingIndicator = (color) => {
  return (
    <Box
      sx={{
        width: 15,
        height: 15,
        marginTop: "5px",
        borderRadius: '50%',
        backgroundColor: color ? color : 'blue',
      }}
    ></Box>
  );
}

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
      <div className="row">
        {/* <h2 style={{ marginBottom: 30, color: "#820001" }}>
          {" "}
          {userData && `${userData?.department?.departmentName} Branch`}
        </h2>
        <h2
          style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "10px" }}
        >
          Today's Stats
        </h2> */}
      </div>
      <div className="row">
        <div className="col-5">
          <div className="dash-detail-container" style={{ background: "none" }}>
            <div className="row">

{/* FRs Card */}
              <div className="col-6">
                <div className="dash-card">
                  <div
                    className="dash-card-header"
                    style={{ textAlign: "center", background: "#4f5966" , borderRadius:"0px"}}
                  >
                    <h2 style={{ marginBottom: "0" }}>IN </h2>
                  </div>

                  <div className="float-start" style={{ width: "50%" }}>
                    <div
                      className="count"
                      style={{ width: "100%", height: 135, background: "#FFF" }}
                    >
                      <span style={{ display: "inline-flex", marginTop: 40 }}>
                        <h4>F.Rs<span style={{ marginLeft: 5 }}>({(frStatsData && frStatsData?.receivedFRs?.totalCount) ? frStatsData?.receivedFRs?.totalCount : 0})</span></h4>
                      </span>
                      <div className="clearfix" />

                    </div>
                  </div>
                  <div className="float-start" style={{ width: "50%" }}>
                    <div
                      className="count"
                      style={{
                        width: "100%",
                        borderLeft: "#ddd solid 1px",
                        background: "#FFF",
                        height: 45,
                      }}
                    >
                      <span style={{ display: "flex" }}>
                        {BlinkingIndicator()} <span style={{ marginLeft: 5 }}>Immediate ({(frStatsData && frStatsData?.receivedFRs?.priorityCounts?.Immediate) ? frStatsData?.receivedFRs?.priorityCounts?.Immediate : 0})</span>
                      </span>
                      <div className="clearfix" />
                    </div>
                    <div
                      className="count"
                      style={{
                        borderLeft: "#ddd solid 1px",
                        width: "100%",
                        background: "#FFF",
                        height: 45,
                      }}
                    >
                      <span style={{ display: "flex" }}>
                      {NonBlinkingIndicator("blue")} <span style={{ marginLeft: 5 }}>Routine ({(frStatsData && frStatsData?.receivedFRs?.priorityCounts?.Routine) ? frStatsData?.receivedFRs?.priorityCounts?.Routine : 0})</span>
                      </span>
                      <div className="clearfix" />
                    </div>
                    <div
                      className="count"
                      style={{
                        borderLeft: "#ddd solid 1px",
                        width: "100%",
                        background: "#FFF",
                        height: 45,
                      }}
                    >
                      <span style={{ display: "flex" }}>
                      {NonBlinkingIndicator("green")} <span style={{ marginLeft: 5 }}>Confidential ({(frStatsData && frStatsData?.receivedFRs?.priorityCounts?.Confidential) ? frStatsData?.receivedFRs?.priorityCounts?.Confidential : 0})</span>
                      </span>
                      <div className="clearfix" />
                    </div>
                  </div>


                  <div className="float-start" style={{ width: "50%" }}>
                    <div
                      className="count"
                      style={{ width: "100%", height: 135, background: "#FFF" }}
                    >
                      <span style={{ display: "inline-flex", marginTop: 40 }}>
                        <h4>Files <span style={{ marginLeft: 5 }}>({(fileStatsData && fileStatsData?.receivedFiles?.totalCount) ? fileStatsData?.receivedFiles?.totalCount : 0})</span></h4>
                      </span>
                      <div className="clearfix" />

                    </div>
                  </div>
                  <div className="float-start" style={{ width: "50%" }}>
                    <div
                      className="count"
                      style={{
                        width: "100%",
                        borderLeft: "#ddd solid 1px",
                        background: "#FFF",
                        height: 45,
                      }}
                    >
                      <span style={{ display: "flex" }}>
                        {BlinkingIndicator()} <span style={{ marginLeft: 5 }}>Immediate ({(fileStatsData && fileStatsData?.receivedFiles?.priorityCounts?.Immediate) ? fileStatsData?.receivedFiles?.priorityCounts?.Immediate : 0})</span>
                      </span>
                      <div className="clearfix" />
                    </div>
                    <div
                      className="count"
                      style={{
                        borderLeft: "#ddd solid 1px",
                        width: "100%",
                        background: "#FFF",
                        height: 45,
                      }}
                    >
                      <span style={{ display: "flex" }}>
                      {NonBlinkingIndicator("blue")} <span style={{ marginLeft: 5 }}>Routine ({(fileStatsData && fileStatsData?.receivedFiles?.priorityCounts?.Routine) ? fileStatsData?.receivedFiles?.priorityCounts?.Routine : 0})</span>
                      </span>
                      <div className="clearfix" />
                    </div>
                    <div
                      className="count"
                      style={{
                        borderLeft: "#ddd solid 1px",
                        width: "100%",
                        background: "#FFF",
                        height: 45,
                      }}
                    >
                      <span style={{ display: "flex" }}>
                      {NonBlinkingIndicator("green")} <span style={{ marginLeft: 5 }}>Confidential ({(fileStatsData && fileStatsData?.receivedFiles?.priorityCounts?.Confidential) ? fileStatsData?.receivedFiles?.priorityCounts?.Confidential : 0})</span>
                      </span>
                      <div className="clearfix" />
                    </div>
                  </div>

                  <div class="clearfix"></div>
                </div>
              </div>


{/* Files Card */}
              <div className="col-6">
                <div className="dash-card">
                  <div
                    className="dash-card-header"
                    style={{ textAlign: "center", background: "#4f5966" ,borderRadius:"0px"}}
                  >
                    <h2 style={{ marginBottom: "0" }}>OUT </h2>
                  </div>

                  <div className="float-start" style={{ width: "50%" }}>
                    <div
                      className="count"
                      style={{ width: "100%", height: 135, background: "#FFF" }}
                    >
                      <span style={{ display: "inline-flex", marginTop: 40 }}>
                        <h4>F.Rs <span style={{ marginLeft: 5 }}>({(frStatsData && frStatsData?.sentFRs?.totalCount) ? frStatsData?.sentFRs?.totalCount : 0})</span></h4>
                      </span>
                      <div className="clearfix" />

                    </div>
                  </div>
                  <div className="float-start" style={{ width: "50%" }}>
                    <div
                      className="count"
                      style={{
                        width: "100%",
                        borderLeft: "#ddd solid 1px",
                        background: "#FFF",
                        height: 45,
                      }}
                    >
                      <span style={{ display: "flex" }}>
                        {BlinkingIndicator()} <span style={{ marginLeft: 5 }}>Immediate ({(frStatsData && frStatsData?.sentFRs?.priorityCounts?.Immediate) ? frStatsData?.sentFRs?.priorityCounts?.Immediate : 0})</span>
                      </span>
                      <div className="clearfix" />
                    </div>
                    <div
                      className="count"
                      style={{
                        borderLeft: "#ddd solid 1px",
                        width: "100%",
                        background: "#FFF",
                        height: 45,
                      }}
                    >
                      <span style={{ display: "flex" }}>
                      {NonBlinkingIndicator("blue")} <span style={{ marginLeft: 5 }}>Routine ({(frStatsData && frStatsData?.sentFRs?.priorityCounts?.Routine) ? frStatsData?.sentFRs?.priorityCounts?.Routine : 0})</span>
                      </span>
                      <div className="clearfix" />
                    </div>
                    <div
                      className="count"
                      style={{
                        borderLeft: "#ddd solid 1px",
                        width: "100%",
                        background: "#FFF",
                        height: 45,
                      }}
                    >
                      <span style={{ display: "flex" }}>
                      {NonBlinkingIndicator("green")} <span style={{ marginLeft: 5 }}>Confidential ({(frStatsData && frStatsData?.sentFRs?.priorityCounts?.Confidential) ? frStatsData?.sentFRs?.priorityCounts?.Confidential : 0})</span>
                      </span>
                      <div className="clearfix" />
                    </div>
                  </div>


                  <div className="float-start" style={{ width: "50%" }}>
                    <div
                      className="count"
                      style={{ width: "100%", height: 135, background: "#FFF" }}
                    >
                      <span style={{ display: "inline-flex", marginTop: 40 }}>
                        <h4>Files <span style={{ marginLeft: 5 }}>({(fileStatsData && fileStatsData?.sentFiles?.totalCount) ? fileStatsData?.sentFiles?.totalCount : 0})</span></h4>
                      </span>
                      <div className="clearfix" />

                    </div>
                  </div>
                  <div className="float-start" style={{ width: "50%" }}>
                    <div
                      className="count"
                      style={{
                        width: "100%",
                        borderLeft: "#ddd solid 1px",
                        background: "#FFF",
                        height: 45,
                      }}
                    >
                      <span style={{ display: "flex" }}>
                        {BlinkingIndicator()} <span style={{ marginLeft: 5 }}>Immediate ({(fileStatsData && fileStatsData?.sentFiles?.priorityCounts?.Immediate) ? fileStatsData?.sentFiles?.priorityCounts?.Immediate : 0})</span>
                      </span>
                      <div className="clearfix" />
                    </div>
                    <div
                      className="count"
                      style={{
                        borderLeft: "#ddd solid 1px",
                        width: "100%",
                        background: "#FFF",
                        height: 45,
                      }}
                    >
                      <span style={{ display: "flex" }}>
                      {NonBlinkingIndicator()} <span style={{ marginLeft: 5 }}>Routine ({(fileStatsData && fileStatsData?.sentFiles?.priorityCounts?.Routine) ? fileStatsData?.sentFiles?.priorityCounts?.Routine : 0})</span>
                      </span>
                      <div className="clearfix" />
                    </div>
                    <div
                      className="count"
                      style={{
                        borderLeft: "#ddd solid 1px",
                        width: "100%",
                        background: "#FFF",
                        height: 45,
                      }}
                    >
                      <span style={{ display: "flex" }}>
                      {NonBlinkingIndicator("green")} <span style={{ marginLeft: 5 }}>Confidential ({(fileStatsData && fileStatsData?.sentFiles?.priorityCounts?.Confidential) ? fileStatsData?.sentFiles?.priorityCounts?.Confidential : 0})</span>
                      </span>
                      <div className="clearfix" />
                    </div>
                  </div>

                  <div class="clearfix"></div>
                </div>
              </div>

            </div>
          </div>


          

            <div
              className="dash-detail-container mt-2"
              style={{ background: "none" }}
            >
              {/* <img
                src={CalenderImage}
                alt="calender"
                style={{ width: "100%", height: "499px" }}
              /> */}
              <Calendar />
            </div>

        </div>

        {/* Add FRs and Files here */}
        <div className="col-7">
          {/* File cases table */}
          <div className="dash-detail-container" style={{ background: "none", height: 400 }}>
            <div class="row">
              <div class="col-12">
                <CustomTable
                  ActionHide={false}
                  hideBtn={true}
                  block={true}
                  hidebtn1={true}
                  addBtnText={"Create Case"}
                  data={casesData}
                  tableTitle="File Cases on desk"
                  headertitlebgColor={"#666"}
                  headertitletextColor={"#FFF"}
                  headerBgColor={"rgb(79, 89, 102)"}
                  headerTitleColor={"#FFF"}
                  handlePageChange={handlePageChange}
                  currentPage={currentPage}
                  pageSize={pageSize}
                  totalCount={count}
                  handleAdd={() =>
                    navigate(
                      "/efiling/dashboard/file-register-list/files-list/addedit-case"
                    )
                  }
                  handleEdit={(item) => {
                    setFileIdForDetailPage(item?.internalId);
                    setCaseIdForDetailPage(item?.caseId);
                    navigate("/efiling/dashboard/fileDetail", {
                      state: {
                        view: false,
                        id: item?.caseId,
                        fileId: item?.internalId,
                      },
                    })
                  }}
                  showEditIcon={true}
                  singleDataCard={true}
                  hideDeleteIcon={true}
                  showView={false}
                  caseEditable = {true}
                  handleView={(item) => {
                    setFileIdForDetailPage(item?.internalId);
                    setCaseIdForDetailPage(item?.caseId);
                    navigate("/efiling/dashboard/fileDetail", {
                      state: {
                        view: true,
                        id: item?.caseId,
                        fileId: item?.internalId,
                      },
                    })
                  }}
                  showAssigned={false}
                  // hendleAssigned={(item) => navigate("/efiling/dashboard/fileDetail", { state: { view: true, id: item.caseId } })}
                />
              </div>
            </div>
          </div>



          {/* FRs table */}
          <div className="dash-detail-container mt-2" style={{ background: "none", height: 400 }}>
            <div class="row">
              <div class="col-12">
                <CustomTable
                        hidebtn1={true}
                        block={true}
                        hideBtn={true}
                        addBtnText={"Create Fresh Receipt"}
                        data={fileData}
                        tableTitle="Fresh Receipts on desk" 
                        headertitlebgColor={"#666"}
                        headertitletextColor={"#FFF"}
                        headerBgColor={"rgb(79, 89, 102)"}
                        headerTitleColor={"#FFF"}
                        handlePageChange={handleFrPageChange}
                        currentPage={fRCurrentPage}
                        handleAdd={() => navigate("/efiling/dashboard/fresh-receipt/addedit")}
                        pageSize={frPageSize}
                        totalCount={frCount}
                        singleDataCard={true}
                        hideDeleteIcon={true}
                        handleDelete={(item) => handleDelete(item.id)}
                        showEditIcon={true}
                        handleEdit={(item) => navigate("/efiling/dashboard/fresh-receipt/addedit", {state:{id:item.id, view: true}})}
                        showAssigned={false}
                        hendleAssigned={(item) => navigate("/efiling/dashboard/fresh-receipt/frdetail", {state:{id:item.id, view: false}})}
                        showCreateBtn={false}
                        hendleCreateBtn={(item) => {
                          setFRId(item.id);
                          setFRAttachmentsData(item.internalAttachment);
                          if(item?.internalAttachment) {
                            navigate("/efiling/dashboard/file-register-list/files-list/addedit-case", {state:{freshReceiptsAttachments:item.internalAttachment, frId: item.id, frSubject: item.frSubject}})
                          } else {
                            alert("Please select an attachment")
                          }
                        }}
                        showView={false}
                        handleView={(item) =>
                          navigate("/efiling/dashboard/fresh-receipt/frdetail", {
                            state: { id: item.id, view: true },
                          })
                        }
                    />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default MainDashBoardDemo;
