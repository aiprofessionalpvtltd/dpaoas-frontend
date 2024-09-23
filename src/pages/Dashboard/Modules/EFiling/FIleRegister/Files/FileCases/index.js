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
  getAllEfiling,
  getAllFileHeading,
  getAllFileRegister,
  getFileByRegisterById,
} from "../../../../../../../api/APIs/Services/efiling.service";
import { AuthContext } from "../../../../../../../api/AuthContext";
import {
  getSelectedFileID,
  getUserData,
  setCaseIdForDetailPage,
  setFileIdForDetailPage,
} from "../../../../../../../api/Auth";
import moment from "moment";
import Select from "react-select";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../../utils/ToastAlert";
import { useFormik } from "formik";

function FileCases() {
  const navigate = useNavigate();
  const { setFileIdInRegister, fileIdINRegister } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
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
  const [showFiles, setShowFiles] = useState(false);
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
        Priority:
          item?.fileRemarksData?.length > 0
            ? item?.fileRemarksData[0]?.priority
            : "---",
      };
    });
  };

  const getAllCasesApi = async () => {
    const searchParams = {
      userId: userData?.fkUserId,
      currentPage: currentPage,
      pageSize: pageSize,
      // fileId: fkfileId?.value ? fkfileId?.value : location.state?.internalId,
      // fkBranchId:userData && userData?.fkBranchId
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
      pageSize: 2000,
      // fileRegisterId: registerDataid,
      // mainHeadingNumber: headingNumber,
    };
    try {
      const response = await getFileByRegisterById(searchParams);
      if (response?.success) {
        setCount(response?.data?.count);
        setAllFiles(response?.data?.files);
        //   if (response?.data?.files) {
        //     const transformedData = transformFilesHeadingdata(
        //       response?.data?.files
        //     );
        //     setFileData(transformedData);
        //   } else {
        //     setFileData([]);
        //   }
      }
    } catch (error) {
      console.log(error);
      // showErrorMessage(error?.response?.data?.message);
    }
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
      branchId: userData?.fkBranchId,
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

  // FIltered Data
  // const filteredCaseData = casesData?.filter((item) =>
  //   item?.FileNo?.toLowerCase().includes(searchTerm?.toLowerCase())
  // );

  // Filtered Data based on fileNumnerCases and searchTerm
  const filteredCaseData = casesData?.filter((item) => {
    // If "All Cases" is selected or fileNumnerCases is empty, show all data
    const fileNumberMatches =
      fileNumnerCases === "All Cases" || fileNumnerCases === ""
        ? true // If "All Cases" or no file is selected, show all data
        : item?.FileNo?.toLowerCase() === fileNumnerCases?.toLowerCase(); // Otherwise, filter by file number

    const searchTermMatches = searchTerm
      ? item?.FileNo?.toLowerCase().includes(searchTerm?.toLowerCase())
      : true; // Show all if no search term

    return fileNumberMatches && searchTermMatches;
  });

  useEffect(() => {
    const fileId = getSelectedFileID();
    if (fileId) {
      setFKFileId(fileId);
    }
    getAllFileHeadingApi();
    getAllFilesAPi();
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
      {/* {userData?.userType === "Officer" && ( */}
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
                // Update form field
                formik.setFieldValue("formFile", selectedOptions);
                // Update the fileNumnerCases state to filter the data
                setFileNumberCases(selectedOptions.label || ""); // Handle empty value for "All Cases"
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

      {/* )} */}
      {/* Hide THis Field */}
      {/* <div className="row" style={{ marginBottom: "20px", marginLeft: "3px" }}>
        <div className="col-4">
          <label for="formFile" class="form-label">
            Select Register
          </label>
          <Select
            options={
              registerData &&
              registerData?.map((item) => ({
                value: item.id,
                label: `${item.registerSubject} (${item.year})`,
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
                      {item.mainHead}
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
      </div> */}

      <div class="row">
        <div class="col-12">
          <CustomTable
            ActionHide={false}
            hideBtn={false}
            addBtnText={"Create Case"}
            data={filteredCaseData}
            seachBarShow={true}
            searchonchange={(e) => setSearchTerm(e.target.value)}
            tableTitle="File Cases"
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
              setFileIdForDetailPage(item?.internalId);
              setCaseIdForDetailPage(item?.caseId);
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
            totalCount={count}
            singleDataCard={true}
            hideDeleteIcon={true}
            showView={false}
            caseEditable={true}
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
            // hendleAssigned={(item) => navigate("/efiling/dashboard/fileDetail", { state: { view: true, id: item.caseId } })}
          />
        </div>
      </div>
    </Layout>
  );
}

export default FileCases;
