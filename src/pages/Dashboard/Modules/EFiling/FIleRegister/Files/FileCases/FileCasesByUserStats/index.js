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

function FileCasesByUserStats() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(null);
  const [casesData, setCasesData] = useState([]);
  const [allFiles, setAllFiles] = useState([]);
  const pageSize = 1000;
  const UserData = getUserData();
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
        isEditable: item?.isEditable,
        caseId: item?.fkCaseId,
        caseNoteId: item?.caseNoteId,
        Branch: item?.branch?.name,
        internalId: item?.fileData?.id,
        FileNo: item?.fileData?.fileNumber,
        // FileSubject: item?.fileData?.fileSubject,
        CaseSubject: item?.fileData?.fileSubject,
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
    const transferData = transformFilesCases(location.state?.filesData);
    setCasesData(transferData);
  };

  useEffect(() => {
    getAllCasesApi();
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

  const deleteCaseHandler = (item) => {
    setDeleteCaseId(item?.caseNoteId);
    setShowDeleteModal(true);
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

      {/* <div className="row">
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
      </div> */}

      <CustomAlert
        showModal={showDeleteModal}
        handleClose={handleClose}
        handleOkClick={handleOkClick}
      />

      <div class="row">
        <div class="col-12">
          <CustomTable
            ActionHide={false}
            hideBtn={false}
            hidebtn1={true}
            hidebtn={true}
            data={casesData}
            tableTitle={`Cases Stats`}
            headerBgColor={"#4B8FF0"}
            headerTitleColor={"#fff"}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            handleAdd={() =>
              navigate(
                "/efiling/dashboard/file-register-list/files-list/addedit-case"
              )
            }
            handleEdit={(item) => {
              navigate("/efiling/dashboard/fileDetail", {
                state: {
                  view: false,
                  id: item?.caseId,
                  fileId: item?.internalId,
                },
              });
            }}
            showEditIcon={true}
            pageSize={pageSize}
            totalCount={1000}
            singleDataCard={true}
            hideDeleteIcon={true}
            showView={false}
            caseEditable={true}
            handleDelete={(item) => deleteCaseHandler(item)}
            handleView={(item) => {
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

export default FileCasesByUserStats;
