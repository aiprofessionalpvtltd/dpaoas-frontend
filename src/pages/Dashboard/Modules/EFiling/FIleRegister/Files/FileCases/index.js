import React, { useCallback, useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { Layout } from "../../../../../../../components/Layout";
import Header from "../../../../../../../components/Header";
import CustomTable from "../../../../../../../components/CustomComponents/CustomTable";
import { EfilingSideBarBranchItem, EfilingSideBarItem } from "../../../../../../../utils/sideBarItems";
import {
  getAllCasesByFileId,
  getAllFileHeading,
  getAllFileRegister,
  getFileByRegisterById,
} from "../../../../../../../api/APIs/Services/efiling.service";
import { AuthContext } from "../../../../../../../api/AuthContext";
import { getUserData } from "../../../../../../../api/Auth";
import moment from "moment";
import Select from "react-select";

function FileCases() {
  const navigate = useNavigate();
  const { setFileIdInRegister, fileIdINRegister } = useContext(AuthContext);
  const location = useLocation();
  const [headings, setHeadings] = useState(null);
  const [headcount, setHeadCount] = useState(null);


  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(null);
  const [casesData, setCasesData] = useState([]);
  const pageSize = 5; // Set your desired page size
  const UserData = getUserData();
  const [fkfileId, setFKFileId] = useState(null);

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  const transformFilesCases = (apiData) => {
    return apiData.map((item, index) => ({
      caseId: item?.fkCaseId,
      FileNo: item?.fileData?.fileNumber,
      Sender:
        item?.fileRemarksData?.length > 0
          ? item?.fileRemarksData[0]?.submittedUser?.employee?.firstName
          : "---",
      Receiver:
        item?.fileRemarksData?.length > 0
          ? item?.fileRemarksData[0]?.assignedUser?.employee?.firstName
          : "---",
      Status:
        item?.fileRemarksData?.length > 0
          ? item?.fileRemarksData[0]?.CommentStatus
          : "Draft",
      MarkedDate:
        item?.fileRemarksData?.length > 0
          ? moment(item?.fileRemarksData[0]?.createdAt).format("DD/MM/YYYY")
          : "---",
      MarkedTime:
        item?.fileRemarksData?.length > 0
          ? moment(item?.fileRemarksData[0]?.createdAt).format("hh:mm A")
          : "---",
      // Noting: item?.Note?.description ? new DOMParser().parseFromString(item.Note?.description, 'text/html').documentElement.innerText : '',
      // Correspondence: item?.Correspondence?.description ? new DOMParser().parseFromString(item.Correspondence?.description, 'text/html').documentElement.innerText : '',
      // Sanction: item?.Sanction?.description ? new DOMParser().parseFromString(item.Sanction?.description, 'text/html').documentElement.innerText : '',
      // Objection: item?.Objection?.description ? new DOMParser().parseFromString(item.Objection?.description, 'text/html').documentElement.innerText : '',
      // Letter: item?.Letter?.description ? new DOMParser().parseFromString(item.Letter?.description, 'text/html').documentElement.innerText : '',
    }));
  };

  const getAllCasesApi = async (fileId) => {
    try {
      const response = await getAllCasesByFileId(
        fileId.value,
        UserData?.fkUserId,
        currentPage,
        pageSize
      );
      if (response.success) {
        setCount(response?.data?.count);
        const transferData = transformFilesCases(response?.data?.cases);
        setCasesData(transferData);
      }
    } catch (error) {
      // showErrorMessage(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (location.state?.internalId) {
      setFileIdInRegister(location.state?.internalId);
    }
    getAllCasesApi();
  }, [fileIdINRegister, setFileIdInRegister, currentPage]);

  const [registerData, setRegisterData] = useState([]);
  const getAllRegisterApi = async () => {
    try {
      const response = await getAllFileRegister(
        UserData?.fkDepartmentId,
        0,
        100
      );
      if (response.success) {
        setRegisterData(response?.data?.fileRegisters);
      }
    } catch (error) {
      // showErrorMessage(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getAllRegisterApi();
  }, []);

  const [fileData, setFileData] = useState([]);
  const [registerId, setRegisterId] = useState(null)
  const hendleRegisterSelect = async (headID) => {
    try {
      const response = await getFileByRegisterById(registerId, headID);
      if (response.success) {
        if (response?.data?.files) {
          setFileData(response?.data?.files);
        } else {
          setFileData([]);
        }
      }
    } catch (error) {
      // showErrorMessage(error?.response?.data?.message);
    }
  };

  const transformFilesHeadings = (apiData) => {
    console.log(apiData);
    return apiData.map((item) => ({
      HeadingNumber: item?.mainHeadingNumber,
    }));
  };

  const getAllFileHeadingApi = useCallback(async () => {
    try {
      const response = await getAllFileHeading(0, 1000);
      if (response.success) {
        //   showSuccessMessage(response?.message)
        setCount(response?.data?.count);
        const transformedData = transformFilesHeadings(
          response?.data?.mainHeadings
        );
        setHeadCount(transformedData[transformedData.length - 1].HeadingNumber);
        setHeadings(transformedData);
        // if (registerDataid) {
        //   getAllFilesAPi(registerDataid);
        // }
      }
    } catch (error) {
      // showErrorMessage(error?.response?.data?.message);
    }
  }, [headcount]);

  useEffect(() => {
    getAllFileHeadingApi();
  }, []);

  
  return (
    <Layout
      module={true}
      centerlogohide={true}
      sidebarItems={UserData && UserData?.userType === "Officer" ? EfilingSideBarItem : EfilingSideBarBranchItem}
    >
      <div class="row">
        <Header
          dashboardLink={"/efiling/dashboard"}
          addLink1={"/efiling/dashboard/file-register-list/files-list"}
          title1={"Files"}
          title2={"File Cases"}
          addLink2={"/efiling/dashboard/file-register-list/files-list/cases"}
          width={"500px"}
        />
        <div className="col" style={{ marginTop: "30px", float: "right" }}>
          <button
            className="btn btn-primary"
            onClick={() =>
              navigate(
                "/efiling/dashboard/file-register-list/files-list/cases-history",
                { state: { fileId: fkfileId.value } }
              )
            }
            disabled={fkfileId?.value ? false : true}
          >
            View Previous History
          </button>
        </div>
      </div>

      <div className="row" style={{ marginBottom: "20px", marginLeft: "3px" }}>
        <div className="col-4">
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
            onChange={(selectedOptions) =>
                setRegisterId(selectedOptions.value)
            }
            // onBlur={formikAssigned.handleBlur}
            // value={registerId}
            name="fkregisterId"
            // isClearable={true}
            
          />
        </div>
        <div class="col-4">
              <label class="form-label">Heading Number</label>
              <select
                class="form-select"
                placeholder={"Select Heading Number"}
                onChange={(event) =>  hendleRegisterSelect(event.target.value)}
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
              </select>
            </div>
        <div className="col-4">
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
              getAllCasesApi(selectedOptions);
            }}
            // onBlur={formikAssigned.handleBlur}
            value={fkfileId}
            name="fkfileId"
            isClearable={true}
          />
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <CustomTable
            // hidebtn1={true}
            ActionHide={false}
            hideBtn={false}
            addBtnText={"Create Case"}
            data={casesData}
            tableTitle="File Cases"
            headertitlebgColor={"#666"}
            headertitletextColor={"#FFF"}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            handleAdd={() =>
              navigate(
                "/efiling/dashboard/file-register-list/files-list/addedit-case"
              )
            }
            handleEdit={(item) =>
              navigate("/efiling/dashboard/fileDetail", {
                state: { view: false, id: item.caseId, fileId: fkfileId.value },
              })
            }
            pageSize={pageSize}
            totalCount={count}
            singleDataCard={true}
            hideDeleteIcon={true}
            showView={true}
            handleView={(item) =>
              navigate("/efiling/dashboard/fileDetail", {
                state: { view: true, id: item.caseId, fileId: fkfileId.value },
              })
            }
            showAssigned={false}
            // hendleAssigned={(item) => navigate("/efiling/dashboard/fileDetail", { state: { view: true, id: item.caseId } })}
          />
        </div>
      </div>
    </Layout>
  );
}

export default FileCases;
