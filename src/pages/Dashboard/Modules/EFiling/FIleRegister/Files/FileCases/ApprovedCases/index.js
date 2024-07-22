import { useCallback, useEffect, useState } from "react";
import { getUserData } from "../../../../../../../../api/Auth";
import { Layout } from "../../../../../../../../components/Layout";
import {
  EfilingSideBarBranchItem,
  EfilingSideBarItem,
} from "../../../../../../../../utils/sideBarItems";
import CustomTable from "../../../../../../../../components/CustomComponents/CustomTable";
import {
  getAllFileHeading,
  getAllFileRegister,
  getFileByRegisterById,
  getUserApprovedCaseHistory,
} from "../../../../../../../../api/APIs/Services/efiling.service";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import moment from "moment";
import { ToastContainer } from "react-toastify";
import { showSuccessMessage } from "../../../../../../../../utils/ToastAlert";
function ApprovedCasesHistory() {
  const location = useLocation();
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState([]);
  const [fileData, setFileData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(null);
  const [approvedCasesData, setApprovedCasesData] = useState([]);
  const pageSize = 10; // Set your desired page size
  const UserData = getUserData();
  const [headings, setHeadings] = useState(null);
  const [registerDataid, setRegisterDataId] = useState(null);
  const [headingNumber, setHeadingNumber] = useState(null);
  const [showHeadings, setShowHeadings] = useState(false);
  const [showFiles, setShowFiles] = useState(false);
  const [fkfileId, setFKFileId] = useState(null);

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  // console.log("Register Data", registerData);
  // console.log("Approved", approvedCasesData);

  //Transform Data
  const transformFilesHeadings = (apiData) => {
    return apiData?.map((item) => ({
      HeadingNumber: item?.mainHeadingNumber,
    }));
  };

  const transformApprovedCases = (apiData) => {
    console.log("API Response", apiData);
    return apiData.map((item, index) => ({
      caseId: item?.fkCaseId,
      internalId: item?.fileData?.id,
      FileNo: item?.fileData?.fileNumber,
      Sender: item?.fileRemarksData?.length > 0
      ? `${item?.fileRemarksData[0]
        ?.submittedUser?.employee?.firstName
      } ${item?.fileRemarksData[0]
        ?.submittedUser?.employee?.lastName
      }`
      : "---",
      Receiver: item?.fileRemarksData?.length > 0
      ? `${item?.fileRemarksData[0]
        ?.assignedUser?.employee?.firstName
      } ${item?.fileRemarksData[0]
        ?.assignedUser?.employee?.lastName
      }`
      : "---",
      markDate: moment(item?.fileData?.createdAt).format("DD/MM/YYYY"),
      Status: item?.fileRemarksData?.CommentStatus,

      // Status: item?.fileData?.map((status) => status?.fileStatus),
    }));
  };

  console.log("locationID", location?.state);

  //Getting Approved Cases Data
  const getAllApprovedCasesApi = async () => {
    let searchParams = {};
    if(UserData && UserData?.userType==="Officer"){
      searchParams = {
        branchId: UserData?.fkBranchId,
        currentPage: currentPage,
        pageSize: pageSize,
        fileId: fkfileId?.value,
      };
    }else{
      searchParams = {
        branchId: UserData?.fkBranchId,
        currentPage: currentPage,
        pageSize: pageSize,
        fileId: fkfileId?.value,
        userId:UserData?.fkUserId,
      };
    }
     
    try {
      const response = await getUserApprovedCaseHistory(searchParams);
      console.log("Response", response);
      if (response?.success) {
        setCount(response?.data?.count);
        showSuccessMessage(response?.message)
        const transformedData = transformApprovedCases(response?.data?.cases);
        setApprovedCasesData(transformedData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllApprovedCasesApi();
  }, [currentPage, fkfileId, currentPage]);

  // Get All Register Api
  const getAllRegisterApi = async () => {
    try {
      const response = await getAllFileRegister(UserData?.fkBranchId, 0, 100);
      if (response.success) {
        setRegisterData(response?.data?.fileRegisters);
      }
    } catch (error) {
      console.log(error);
      // showErrorMessage(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getAllRegisterApi();
  }, []);

  // Get All Heading Api's
  const getAllFileHeadingApi = useCallback(async () => {
    try {
      const response = await getAllFileHeading(UserData?.fkBranchId, 0, 1000);
      if (response.success) {
        const transformedData = transformFilesHeadings(
          response?.data?.mainHeadings
        );
        // setHeadCount(transformedData[transformedData.length - 1].HeadingNumber);
        setHeadings(transformedData);
        // if (registerDataid) {
        //   getAllFilesAPi(registerDataid);
        // }
      }
    } catch (error) {
      // showErrorMessage(error?.response?.data?.message);
    }
  }, []);

  useEffect(() => {
    getAllFileHeadingApi();
  }, []);

  const hendleRegisterSelect = async (headID) => {
    const searchParams = {
      userId: UserData?.fkUserId,
      currentPage: currentPage,
      pageSize: pageSize,
      mainHeadingNumber: headID,
    };
    try {
      const response = await getFileByRegisterById(searchParams);
      if (response.success) {
        if (response?.data?.files) {
          setFileData(response?.data?.files);
        } else {
          setFileData([]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegisterDropDownChange = (selectedOption) => {
    setRegisterDataId(selectedOption?.value);
    setShowHeadings(true);
    setFileData([]);
  };

  const handleHeadingChange = (e) => {
    hendleRegisterSelect(e.target.value);
    setShowFiles(true);
  };
  return (
    <Layout
      module={false}
      sidebarItems={
        UserData && UserData?.userType === "Officer"
          ? EfilingSideBarItem
          : EfilingSideBarBranchItem
      }
    >
      <ToastContainer />
      <div className="container-fluid">
        <div className="row mb-5">
          <div class="col">
            <label for="formFile" class="form-label">
              Select Register
            </label>
            <Select
              options={
                registerData &&
                registerData?.map((item) => ({
                  value: item.id,
                  label: item.year,
                }))
              }
              // onChange={(selectedOptions) => {
              //   setRegisterDataId(selectedOptions?.value);
              // }}
              onChange={handleRegisterDropDownChange}
              name="fkregisterId"
              isClearable={true}
            />
          </div>
          <div class="col" style={{ marginLeft: "20px" }}>
            {/* <label class="form-label">Heading Number</label>
            <select
              class="form-select"
              placeholder={"Select Heading Number"}
              onChange={handleHeadingChange}
              id="headings"
            >
              <option selected disabled hidden>
                Select
              </option>
              {headings &&
                headings.map((item) => (
                  <option value={item.HeadingNumber}>
                    {item.HeadingNumber}
                  </option>
                ))}
            </select> */}
            {showHeadings && (
              <>
                <label class="form-label">Head Number</label>
                <select
                  class="form-select"
                  placeholder={"Select Head Number"}
                  onChange={handleHeadingChange}
                  // onChange={(event) => hendleRegisterSelect(event.target.value)}
                  id="headings"
                >
                  <option selected disabled hidden>
                    Select
                  </option>
                  {headings &&
                    headings?.map((item) => (
                      <option value={item.HeadingNumber}>
                        {item.HeadingNumber}
                      </option>
                    ))}
                </select>
              </>
            )}
          </div>
          <div className="col">
            {showFiles && (
              <>
                <label for="formFile" class="form-label">
                  Select File
                </label>
                <Select
                  options={
                    fileData &&
                    fileData?.map((item) => ({
                      value: item.id,
                      label: item.fileNumber,
                    }))
                  }
                  onChange={(selectedOptions) => {
                    setFKFileId(selectedOptions);
                  }}
                  value={fkfileId}
                  name="fkfileId"
                  isClearable={true}
                />
              </>
            )}
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <CustomTable
            ActionHide={false}
            hidebtn1={true}
            hideBtn={true}
            data={approvedCasesData}
            tableTitle="Approved Cases History"
            headertitlebgColor={"#666"}
            headertitletextColor={"#FFF"}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            pageSize={pageSize}
            totalCount={count}
            singleDataCard={true}
            showEditIcon={true}
            hideDeleteIcon={true}
            showView={true}
            handleView={(item) =>
              navigate("/efiling/dashboard/fileDetail", {
                state: {
                  approved: true,
                  id: item?.caseId,
                  fileId: item?.internalId,

                },
              })
            }
          />
        </div>
      </div>
    </Layout>
  );
}
export default ApprovedCasesHistory;
