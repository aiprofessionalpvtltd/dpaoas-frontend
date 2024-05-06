import React, { useCallback, useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { Layout } from "../../../../../../../components/Layout";

import CustomTable from "../../../../../../../components/CustomComponents/CustomTable";
import {
  EfilingSideBarBranchItem,
  EfilingSideBarItem,
} from "../../../../../../../utils/sideBarItems";
import {
  getAllCasesThroughSearchParams,
  getAllFileHeading,
  getAllFileRegister,
  getFileByRegisterById,
} from "../../../../../../../api/APIs/Services/efiling.service";
import { AuthContext } from "../../../../../../../api/AuthContext";
import { getUserData } from "../../../../../../../api/Auth";
import moment from "moment";
import Select from "react-select";
import { showSuccessMessage } from "../../../../../../../utils/ToastAlert";

function FileCases() {
  const navigate = useNavigate();
  const { setFileIdInRegister, fileIdINRegister } = useContext(AuthContext);
  const userData = getUserData();
  const location = useLocation();
  const [headings, setHeadings] = useState(null);
  const [headcount, setHeadCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(null);
  const [casesData, setCasesData] = useState([]);
  const pageSize = 4;
  const UserData = getUserData();
  const [fkfileId, setFKFileId] = useState(null);
  const [showHeadings, setShowHeadings] = useState(false);
  const [showFiles, setShowFiles] = useState(false);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const transformFilesCases = (apiData) => {
    return apiData?.map((item, index) => {
      return {
        isEditable: item?.isEditable,
        caseId: item?.fkCaseId,
        internalId: item?.fileData?.id,
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
      };
    });
  };  

  const getAllCasesApi = async () => {
    const searchParams = {
      userId: userData?.fkUserId,
      currentPage: currentPage,
      pageSize: pageSize,
      fileId: fkfileId?.value ? fkfileId?.value : location.state?.internalId,
    };
    try {
      const response = await getAllCasesThroughSearchParams(searchParams);
      console.log(response);
      if (response.success) {
        setCount(response?.data?.count);

        const transferData = transformFilesCases(response?.data?.cases);
        setCasesData(transferData);
        // showSuccessMessage(response?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (location.state?.internalId) {
      setFileIdInRegister(location.state?.internalId);
    }
    getAllCasesApi();
  }, [fileIdINRegister, setFileIdInRegister, fkfileId, currentPage]);

  const [registerData, setRegisterData] = useState([]);
  const getAllRegisterApi = async () => {
    try {
      const response = await getAllFileRegister(UserData?.fkBranchId, 0, 100);

      if (response.success) {
        setRegisterData(response?.data?.fileRegisters);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllRegisterApi();
  }, []);

  const [fileData, setFileData] = useState([]);
  const [registerId, setRegisterId] = useState(null);

  // Register Drop Down Change
  const handleRegisterDropDownChange = (selectedOption) => {
    setRegisterId(selectedOption?.value);
    setShowHeadings(true);
    setFileData([]);
  };

  const handleHeadingChange = (e) => {
    hendleRegisterSelect(e.target.value);
    setShowFiles(true);
  };
  const hendleRegisterSelect = async (headID) => {
    const searchParams = {
      userId: userData?.fkUserId,
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

  const transformFilesHeadings = (apiData) => {
    return apiData?.map((item) => ({
      HeadingNumber: item?.mainHeadingNumber,
    }));
  };

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
  }, [headcount]);

  useEffect(() => {
    getAllFileHeadingApi();
  }, []);

  return (
    <Layout
      module={false}
      centerlogohide={true}
      sidebarItems={
        UserData && UserData?.userType === "Officer"
          ? EfilingSideBarItem
          : EfilingSideBarBranchItem
      }
    >
      <ToastContainer />
      {userData?.userType === "Officer" && (
      <div class="row">
        <div
          className="col-2"
          style={{
            marginTop: "30px",
            float: "right",
            marginBottom: 20,
            marginLeft: 10,
          }}
        >
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
      )}

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
            onChange={handleRegisterDropDownChange}
            name="fkregisterId"
          />
        </div>
        <div class="col-4">
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
        <div className="col-4">
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

      <div class="row">
        <div class="col-12">
          <CustomTable
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
                state: {
                  view: false,
                  id: item?.caseId,
                  fileId: item?.internalId,
                },
              })
            }
            showEditIcon={true}
            pageSize={pageSize}
            totalCount={count}
            singleDataCard={true}
            hideDeleteIcon={true}
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
            showAssigned={false}
            // hendleAssigned={(item) => navigate("/efiling/dashboard/fileDetail", { state: { view: true, id: item.caseId } })}
          />
        </div>
      </div>
    </Layout>
  );
}

export default FileCases;
