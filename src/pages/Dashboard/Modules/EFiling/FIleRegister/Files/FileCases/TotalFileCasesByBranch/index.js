import React, { useCallback, useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";

import { Layout } from "../../../../../../../../components/Layout";
import CustomTable from "../../../../../../../../components/CustomComponents/CustomTable";
import {
  EfilingSideBarBranchItem,
  EfilingSideBarItem,
} from "../../../../../../../../utils/sideBarItems";
import {
  deleteCaseById,
  getAllCasesOfTheBranch,
  getAllCasesOfTheSpecificFile,
  getAllFileHeading,
  getFileByRegisterById,
} from "../../../../../../../../api/APIs/Services/efiling.service";
import { AuthContext } from "../../../../../../../../api/AuthContext";
import {
  getSelectedFileID,
  getUserData,
  setCaseIdForDetailPage,
  setFileIdForDetailPage,
} from "../../../../../../../../api/Auth";
import moment from "moment";
import Select from "react-select";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../../../utils/ToastAlert";
import { useFormik } from "formik";
import { CustomAlert } from "../../../../../../../../components/CustomComponents/CustomAlert";

function TotalFileCasesByBranch() {
  const navigate = useNavigate();
  const { setFileIdInRegister, fileIdINRegister } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchSpecificFile, setSearchSpecificFile] = useState("");

  const userData = getUserData();
  const location = useLocation();
  const [headings, setHeadings] = useState(null);
  const [headcount, setHeadCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(null);
  const [casesData, setCasesData] = useState([]);
  const [allFiles, setAllFiles] = useState([]);
  const pageSize = 10;
  const UserData = getUserData();
  const [fkfileId, setFKFileId] = useState(null);
  const [showHeadings, setShowHeadings] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteCaseId, setDeleteCaseId] = useState(null);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const formik = useFormik({
    initialValues: {
      formFile: "",
    },
    onSubmit: (values) => {
      console.log("Values", values);
    },
  });

  const transformFilesCases = (apiData) => {
    return apiData?.map((item, index) => {
      return {
        isEditable: false,
        caseId: item?.fkCaseId,
        caseNoteId: item?.caseNoteId,
        Branch: item?.branch?.name,
        internalId: item?.fileData?.id,
        FileNo: item?.fileData?.fileNumber,
        // FileSubject: item?.fileData?.fileSubject,
        CaseSubject: item?.caseSubject,
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
        Priority:
          item?.fileRemarksData?.length > 0
            ? item?.fileRemarksData[0]?.priority
            : "---",
      };
    });
  };

  const getAllCasesApi = async () => {
    const searchParams = {
      branchId: userData?.fkBranchId,
      currentPage: currentPage,
      pageSize: pageSize,
    };

    try {
      const response = await getAllCasesOfTheBranch(searchParams);
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

  const [fileData, setFileData] = useState([]);
  const [registerId, setRegisterId] = useState(null);
  const [fileNumnerCases, setFileNumberCases] = useState(
    location?.state?.fileNumber ? location?.state?.fileNumber : ""
  );
  // Register Drop Down Change
  const handleRegisterDropDownChange = (selectedOption) => {
    setRegisterId(selectedOption?.value);
    setShowHeadings(true);
    setFileData([]);
  };

  const getAllFilesAPi = async () => {
    const searchParams = {
      branchId: userData?.fkBranchId,
      currentPage: 0,
      pageSize: 500000,
    };
    try {
      const response = await getFileByRegisterById(searchParams);
      if (response?.success) {
        setCount(response?.data?.count);
        setAllFiles(response?.data?.files);
      }
    } catch (error) {
      console.log(error);
      // showErrorMessage(error?.response?.data?.message);
    }
  };

  const transformFilesHeadings = (apiData) => {
    return apiData?.map((item) => ({
      HeadingNumber: item?.mainHeadingNumber,
      mainHead: item?.mainHeading,
    }));
  };

  const getAllFileHeadingApi = useCallback(async () => {
    try {
      const response = await getAllFileHeading(UserData?.fkBranchId, 0, 1000);
      if (response.success) {
        const transformedData = transformFilesHeadings(
          response?.data?.mainHeadings
        );
        setHeadings(transformedData);
      }
    } catch (error) {
      console.log(error);
      // showErrorMessage(error?.response?.data?.message);
    }
  }, [headcount]);

  useEffect(() => {
    const fileId = getSelectedFileID();
    if (fileId) {
      setFKFileId(fileId);
    }
    getAllFileHeadingApi();
    getAllFilesAPi();
  }, []);

  const handleClose = () => {
    setShowDeleteModal(false);
    setDeleteCaseId(null);
  };

  const handleOkClick = async () => {
    try {
      const response = await deleteCaseById(deleteCaseId);
      if (response?.success) {
        showSuccessMessage(response.message);
        getAllCasesApi();
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
    setShowDeleteModal(false);
  };
  // Handle Search Case On Base of File

  const handleSearchCaseOnBaseOfFile = async (selectedOptions) => {
    const { value, label } = selectedOptions;
    if (label === "All Cases") {
      setSearchSpecificFile([]);
      getAllCasesApi();
    } else {
      const searchParams = {
        branchId: userData?.fkBranchId,
        currentPage: 0,
        pageSize: pageSize,
        fileId: value,
      };
      try {
        const response = await getAllCasesOfTheSpecificFile(searchParams);
        if (response.success) {
          if (response?.data?.cases?.length > 0) {
            const transformedData = transformFilesCases(response?.data?.cases);
            setCasesData([]);
            setCasesData(transformedData);
            setCount(response?.data?.count);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

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
      {/* {userData?.userType === "Officer" && ( */}
      <div class="row">
        {/* <div
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
        </div> */}
      </div>

      <div className="row">
        <div className="col-3">
          <div className="mb-3">
            <label className="form-label">Selected File</label>
            <Select
              options={[
                { value: "All Cases", label: "All Cases" }, // Adding the "All Cases" option
                ...(Array.isArray(allFiles) && allFiles?.length > 0
                  ? allFiles.map((item) => ({
                      value: item.id,
                      label: item.fileNumber,
                    }))
                  : []),
              ]}
              onChange={(selectedOptions) => {
                handleSearchCaseOnBaseOfFile(selectedOptions);
                setFileNumberCases(selectedOptions.label || "");
              }}
              onBlur={formik.handleBlur}
              value={
                fileNumnerCases
                  ? {
                      value: allFiles.find(
                        (file) => file.fileNumber === fileNumnerCases
                      )?.id,
                      label: fileNumnerCases,
                    }
                  : formik.values.formFile
              }
              name="formFile"
            />
            {formik.touched.formFile && formik.errors.formFile && (
              <div className="invalid-feedback">{formik.errors.formFile}</div>
            )}
          </div>
        </div>
      </div>

      <CustomAlert
        showModal={showDeleteModal}
        handleClose={handleClose}
        handleOkClick={handleOkClick}
      />

      <div class="row">
        <div class="col-12">
          <CustomTable
            hidebtn1={true}
            hideBtn={true}
            ActionHide={false}
            data={casesData}
            seachBarShow={true}
            searchonchange={(e) => setSearchTerm(e.target.value)}
            tableTitle={`Total Cases of  ${
              UserData?.branch?.branchName || "Total Cases"
            }`}
            headerBgColor={"#4B8FF0"}
            headerTitleColor={"#fff"}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            showEditIcon={true}
            pageSize={pageSize}
            totalCount={count}
            singleDataCard={true}
            hideDeleteIcon={true}
            showView={false}
            caseEditable={false}
            handleView={(item) => {
              setFileIdForDetailPage(item?.internalId);
              setCaseIdForDetailPage(item?.caseId);
              navigate("/efiling/dashboard/fileDetail", {
                state: {
                  view: true,
                  id: item?.caseId,
                  fileId: item?.internalId,
                },
              });
            }}
            showAssigned={false}
          />
        </div>
      </div>
    </Layout>
  );
}

export default TotalFileCasesByBranch;
