import React, { useContext, useEffect, useState, useRef } from "react";
import { Layout } from "../../../../../components/Layout";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { getUserData } from "../../../../../api/Auth";
import {
  DeleteFileCaseImage,
  DeleteFreahReceptImage,
  DeleteNotificationById,
  UpdateEfiling,
  UpdateFIleCase,
  UploadEfilingAttechment,
  assignFIleCase,
  getAllCorrespondence,
  getCaseDetailByID,
  getEFilesByID,
  getSignatureByUserId,
} from "../../../../../api/APIs/Services/efiling.service";
import { ToastContainer } from "react-toastify";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../utils/ToastAlert";
import moment from "moment";
import { AuthContext } from "../../../../../api/AuthContext";
import {
  getAllEmployee,
  getDepartment,
  getHLEmployee,
} from "../../../../../api/APIs/Services/organizational.service";
import { getBranches } from "../../../../../api/APIs/Services/Branches.services";
import {
  EfilingSideBarBranchItem,
  EfilingSideBarItem,
} from "../../../../../utils/sideBarItems";
import { Button, Modal } from "react-bootstrap";
import CustomTable from "../../../../../components/CustomComponents/CustomTable";
import DocParas from "../../../../../components/CustomComponents/DocParas";
import { Editor } from "../../../../../components/CustomComponents/Editor";

const EFilingModal = ({ isOpen, toggleModal, title, children }) => {
  return (
    <Modal show={isOpen} onHide={toggleModal} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

function FileDetail() {
  const location = useLocation();
  const fileInputRef = useRef(null);
  const UserData = getUserData();
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(null);
  const [correspondenceTypesData, setCorrespondenceTypesData] = useState([]);
  const pageSize = 10; // Set your desired page size
  const [showModal, setShowModal] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [fkfileId, setFKFileId] = useState(null);

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  const [showSubButtonsCorrespondence, setShowSubButtonsCorrespondence] =
    useState(false);

  const toggleButtons = () => {
    setShowSubButtonsCorrespondence(true);
  };

  const [correspondenceData, setCorrespondenceData] = useState({
    description: "",
    attachedFiles: [],
  });

  const [objection, setObjection] = useState({
    description: "",
    attachedFiles: [],
  });

  const [sanction, setSanction] = useState({
    description: "",
    attachedFiles: [],
  });

  const [letter, setLetter] = useState({
    description: "",
    attachedFiles: [],
  });

  const [circular, setCircular] = useState({
    description: "",
    attachedFiles: [],
  });

  const [misc, setMisc] = useState({
    description: "",
    attachedFiles: [],
  });

  const [employeeData, setEmployeeData] = useState([]);

  const [filesData, setFilesData] = useState(null);
  const [viewPage, setViewPage] = useState(location?.state?.view);

  const [documentTypeVal, setDocumentTypeVal] = useState("");

  const { ministryData, fileIdINRegister } = useContext(AuthContext);
  const [departmentData, setDepartmentData] = useState([]);
  const [branchesData, setBranchesData] = useState([]);

  const [caseId, setcaseId] = useState(location?.state?.id);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [togleOpan, setTogleOpan] = useState(true);
  const [selectedTab, setSelectedTab] = useState("Noting");
  const [subSelectedTab, setSubSelectedTab] = useState("Sanction");
  const [remarksData, setRemarksData] = useState([]);
  const [frAttachments, setFrAttachments] = useState([]);
  const navigate = useNavigate();

  const clearInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = null; // Reset the value of the input
    }
  };

  const formik = useFormik({
    initialValues: {
      fileNumber: "",
      fileSubject: "",
      priority: "",
      fileCategory: "",
      fileType: "",
      fkBranchId: "",
      fkdepartmentId: "",
      fkMinistryId: "",
      receivedOn: "",
      year: "",
      // notingDescription: "",
      // correspondingDescription: "",
      assignedTo: "",
      diaryNumber: "",
      // CommentStatus: filesData ? filesData?.fileRemarks[0]?.CommentStatus : "",
      comment: "",
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      UpdateEfilingApi(values);
    },
  });

  const [modalInputValue, setModalInputValue] = useState({
    assignedTo: "",
    CommentStatus: "",
    comment: "",
  });

  const handleFileChangeCorrespondance = (event) => {
    // Access the files from the event
    const files = event.target.files;
    // Convert the files object to an array
    const fileList = Array.from(files);

    // Merge the new files with the existing ones
    setCorrespondenceData((prevState) => ({
      ...prevState,
      attachedFiles: [...prevState.attachedFiles, ...fileList],
    }));
  };

  const UpdateEfilingApi = async (values) => {
    const formData = new FormData();
    // formData.append("submittedBy", UserData?.fkUserId);
    // formData.append("assignedTo",  values?.assignedTo);
    // formData.append("CommentStatus", values?.CommentStatus);
    // formData.append("comment", values?.comment);

    // console.log("alues?.isEditable", values?.isEditable);

    formData.append("isEditable", values?.isEditable);
    formData.append("cases[0][Note][description]", notingData.description);
    formData.append(
      "cases[0][Correspondence][description]",
      correspondenceData.description
    );
    formData.append("cases[0][Sanction][description]", sanction.description);
    formData.append("cases[0][Objection][description]", objection.description);
    formData.append("cases[0][Letter][description]", letter.description);
    formData.append("cases[0][Circular][description]", circular.description);
    formData.append("cases[0][Misc][description]", misc.description);
    // formData.append("diaryNumber", values?.diaryNumber);

    if (objection.attachedFiles) {
      objection.attachedFiles.forEach((file, index) => {
        formData.append(`cases[0][Objection][sections][${index}]`, file);
      });
    }
    if (sanction.attachedFiles) {
      sanction.attachedFiles.forEach((file, index) => {
        formData.append(`cases[0][Sanction][sections][${index}]`, file);
      });
    }
    if (letter.attachedFiles) {
      letter.attachedFiles.forEach((file, index) => {
        formData.append(`cases[0][Letter][sections][${index}]`, file);
      });
    }
    if (circular.attachedFiles) {
      circular.attachedFiles.forEach((file, index) => {
        formData.append(`cases[0][Circular][sections][${index}]`, file);
      });
    }
    if (misc.attachedFiles) {
      misc.attachedFiles.forEach((file, index) => {
        formData.append(`cases[0][Misc][sections][${index}]`, file);
      });
    }
    if (correspondenceData.attachedFiles) {
      correspondenceData.attachedFiles.forEach((file, index) => {
        formData.append(`cases[0][Correspondence][sections][${index}]`, file);
      });
    }

    try {
      const response = await UpdateFIleCase(
        location?.state?.fileId
          ? location?.state?.fileId
          : fileIdINRegister && fileIdINRegister,
        location?.state?.id,
        formData
      );
      if (response?.success) {
        showSuccessMessage(response?.message);
        // formik.resetForm()
        // setTimeout(() => {
        //   navigate("/efiling/dashboard/file-register-list/files-list/cases");
        // }, 1000);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const hendleAssiginFileCaseApi = async () => {
    try {
      const formData = new FormData();
      formData.append("submittedBy", UserData?.fkUserId);
      formData.append("assignedTo", modalInputValue?.assignedTo);
      formData.append("CommentStatus", modalInputValue?.CommentStatus);
      formData.append(
        "comment",
        modalInputValue?.CommentStatus ? "" : modalInputValue?.comment
      );
      formData.append(
        "signature",
        uplodedSignature ? uplodedSignature : uplodedSignaturePreviewUrl
      );

      const response = await assignFIleCase(
        location?.state?.fileId ? location?.state?.fileId : fileIdINRegister,
        location?.state?.id,
        formData
      );

      if (response?.success) {
        showSuccessMessage(response?.message);
        toggleModal();
        getFilesByID();
        // Clear all fields in modalInputValue
        setModalInputValue({
          assignedTo: "",
          CommentStatus: "",
          comment: "",
        });

        setTimeout(() => {
          navigate("/efiling/dashboard/file-register-list/files-list/cases");
        }, 1000);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setUplodedSignaturePreview(null);
  };

  const [uplodedSignature, setUplodedSignature] = useState(null);
  const [uplodedSignaturePreview, setUplodedSignaturePreview] = useState(null);
  const [uplodedSignaturePreviewUrl, setUplodedSignaturePreviewUrl] =
    useState(null);

  // Function to handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setUplodedSignature(file);

    if (file) {
      // Read the uploaded file as a data URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setUplodedSignaturePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const getFilesByID = async () => {
    try {
      const response = await getCaseDetailByID(
        location?.state?.fileId ? location?.state?.fileId : fileIdINRegister,
        caseId
      );

      if (response?.success) {
        setRemarksData(response?.data?.cases?.fileRemarks);
        setFilesData(response?.data?.cases);
        const FRSelection =
          response?.data?.cases?.freshReceipts?.freshReceiptsAttachments;
        if (FRSelection?.length > 0) {
          setSubSelectedTab("FR");
        }
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const getUsersSignatureApi = async () => {
    try {
      const response = await getSignatureByUserId(UserData?.fkUserId);

      if (response?.success) {
        setUplodedSignaturePreviewUrl(`${response?.data?.signature}`);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const hendleRemoveImage = async (id) => {
    try {
      const response = await DeleteFileCaseImage(id);
      if (response?.success) {
        showSuccessMessage(response.message);
        // if (caseId) {
        getFilesByID(
          location?.state?.fileId ? location?.state?.fileId : fileIdINRegister,
          caseId
        );
        // }
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  };

  useEffect(() => {
    if (location.state?.id) {
      getFilesByID();
      getUsersSignatureApi();
    }
  }, []);

  const getDepartmentData = async () => {
    try {
      const response = await getDepartment(0, 50);
      if (response?.success) {
        setDepartmentData(response?.data?.departments);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getBranchesapi = async () => {
    try {
      const response = await getBranches(0, 50);
      if (response?.success) {
        setBranchesData(response?.data?.rows);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getEmployeeData = async () => {
    try {
      const response = await getHLEmployee(UserData?.fkUserId);
      if (response?.success) {
        setEmployeeData(response?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNotification = async (item) => {
    try {
      const response = await DeleteNotificationById(
        location.state?.notificationId,
        UserData?.fkUserId
      );
      // console.log("Notification deleted", response?.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    if (location.state?.notificationId) {
      deleteNotification();
    }
    getEmployeeData();
    getBranchesapi();
    getDepartmentData();
  }, []);

  const images =
    (frAttachments &&
      frAttachments?.map((item) => ({
        original: `http://172.16.170.8:5252${item?.filename}`,
        thumbnail: `http://172.16.170.8:5252${item?.filename}`,
      }))) ||
    [];

  // const HandlePrint = async (urlimage) => {
  //   const url = `http://172.16.170.8:5252${urlimage}`;
  //   window.open(url, "_blank");
  // };

  const handleSubmit = (isDraft) => {
    formik.setFieldValue("isEditable", isDraft); // Set isEdit value based on button clicked
  };

  const [notingTabSubject, setNotingTabSubject] = useState("");
  const [notingData, setNotingData] = useState({
    description: "",
  });
  
  const initialNotingTabData = [
    { title: "Para 1", description: "Content for Paragraph 1", references: [{flag: "A", id: 2, attachments: [{file: "/public/correspondences/2024-06-04T07-58-31/output_1717395191507.pdf"}] }]},
    { title: "Para 2", description: "Content for Paragraph 2", references: [] },
    { title: "Para 3", description: "Content for Paragraph 3", references: [] },
  ];
  const [notingTabData, setNotingTabsData] = useState(initialNotingTabData);

  const handleEditorChange = (index, content, references, isReference, isNew = false) => {
    if (isNew) {
      setNotingTabsData([
        ...notingTabData,
        {
          title: `Para ${notingTabData.length + 1}`,
          description: content,
          references: [],
        },
      ]);
    } else if (isReference) {
      const updatedTabs = notingTabData.map((tab, i) =>
        i === index
          ? {
              ...tab,
              description: content,
              references: [...tab.references, references],
            }
          : tab
      );
      setNotingTabsData(updatedTabs);
    } else {
      const updatedTabs = notingTabData.map((tab, i) =>
      i === index
        ? {
            ...tab,
            description: content,
          }
        : tab
    );
    setNotingTabsData(updatedTabs);
    }
  };

  const handleDelete = (index) => {
    const updatedTabs = notingTabData.filter((_, i) => i !== index);
    setNotingTabsData(updatedTabs);
  };

  const transformData = (apiData) => {
    return apiData?.map((item) => ({
      internalId: item.id,
      name: item.name,
      description: item.description,
      status: item.status,
      attachmentInternal: item.correspondenceAttachments,
    }));
  };

  const handleCorrespondences = async () => {
    try {
      const response = await getAllCorrespondence(
        fkfileId.value,
        UserData.fkBranchId,
        currentPage,
        pageSize
      );
      if (response?.success) {
        setCount(response?.count);
        const transformedData = transformData(response.data?.correspondences);
        setCorrespondenceTypesData(transformedData);
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    handleCorrespondences();
  }, [fkfileId]);

  const HandlePrint = async (urlimage) => {
    const url = `http://10.10.140.200:5152${urlimage}`;
    window.open(url, "_blank");
    // setPdfUrl(url)
  };

  return (
    <Layout
      centerlogohide={true}
      module={false}
      sidebarItems={
        UserData && UserData?.userType === "Officer"
          ? EfilingSideBarItem
          : EfilingSideBarBranchItem
      }
    >
      <div className="dashboard-content">
        <Modal
          show={showModal}
          size="lg"
          onHide={() => setShowModal(false)}
          centered
        >
          <div>
            <Modal.Header closeButton>
              <Modal.Title>Attachments</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ padding: 20 }}>
              {attachedFiles && attachedFiles.length > 0 ? (
                attachedFiles?.map((item) => (
                  <ul class="list-group">
                    <li
                      class="list-group-item"
                      onClick={() => HandlePrint(item?.file)}
                      style={{ color: "blue", cursor: "pointer" }}
                    >
                      {item?.file?.split("\\").pop().split("/").pop()}
                    </li>
                  </ul>
                ))
              ) : (
                <ul class="list-group">
                  <li class="list-group-item">No data found!</li>
                </ul>
              )}
            </Modal.Body>

            <Modal.Footer>
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </Modal.Footer>
          </div>
        </Modal>

        <ToastContainer />
        <EFilingModal
          title="Add Comments"
          isOpen={isModalOpen}
          toggleModal={toggleModal}
          // hendleSubmit={() => hendleAssiginFileCaseApi()}
        >
          <div class="row">
            <div class="col">
              <div class="mb-3">
                <label class="form-label">Predefined Comments</label>
                <select
                  className="form-select"
                  id="CommentStatus"
                  name="CommentStatus"
                  onChange={(e) =>
                    setModalInputValue((prevState) => ({
                      ...prevState,
                      CommentStatus: e.target.value,
                    }))
                  }
                  value={modalInputValue.CommentStatus}
                >
                  <option value="" selected>
                    Select
                  </option>
                  <option value={"Put Up For"}>Put Up For</option>
                  <option value={"Please Link"}>Please Link</option>
                  <option value={"For Perusal Please"}>
                    For Perusal Please
                  </option>
                  <option value={"Submitted For Approval"}>
                    Submitted For Approval
                  </option>
                </select>
              </div>
            </div>
            <div class="col">
              <div class="mb-3">
                <label class="form-label">Mark To</label>
                <select
                  class="form-select"
                  id="assignedTo"
                  name="assignedTo"
                  onChange={(e) =>
                    setModalInputValue((prevState) => ({
                      ...prevState,
                      assignedTo: e.target.value,
                    }))
                  }
                  value={modalInputValue.assignedTo}
                >
                  <option value={""} selected>
                    Select
                  </option>
                  {employeeData &&
                    employeeData?.map((item) => (
                      <option
                        value={item.id}
                      >{`${item.designations?.designationName}`}</option>
                    ))}
                </select>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="mb-3">
                <label class="form-label">Special Comment</label>
                <textarea
                  class="form-control"
                  id="comment"
                  name="comment"
                  onChange={(e) =>
                    setModalInputValue((prevState) => ({
                      ...prevState,
                      comment: e.target.value,
                    }))
                  }
                  value={modalInputValue.comment}
                  disabled={modalInputValue.CommentStatus ? true : false}
                ></textarea>
              </div>
            </div>
          </div>

          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => {
                hendleAssiginFileCaseApi();
                toggleModal();
              }}
            >
              Submit
            </Button>
            <Button variant="secondary" onClick={toggleModal}>
              Close
            </Button>
          </Modal.Footer>
        </EFilingModal>

        <div className="custom-editor">
          <div className="row">
            <div className="col-md-9">
              <form onSubmit={formik.handleSubmit}>
                <div>
                  <div class="content">
                    <div class="row">
                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label">File</label>
                          <input
                            className="form-control"
                            id="fileNumber"
                            name="fileNumber"
                            disabled={true}
                            value={formik.values.fileNumber}
                          />
                        </div>
                      </div>

                      <div className="col">
                        <div className="mb-3">
                          <label htmlFor="fileSubject" className="form-label">
                            Subject
                          </label>
                          <input
                            className="form-control"
                            id="fileSubject"
                            name="fileSubject"
                            disabled={true}
                            value={formik.values.fileSubject}
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label">Year</label>
                          <input
                            className="form-control"
                            id="year"
                            name="year"
                            value={formik.values.year}
                            disabled={true}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row"></div>
                  </div>

                  <div class="shadow" style={{ padding: "25px" }}>
                    <ul
                      className="nav nav-tabs mb-3 mt-3"
                      id="ex1"
                      role="tablist"
                    >
                      <li
                        className="nav-item"
                        role="presentation"
                        onClick={() => {
                          clearInput();
                          setSelectedTab("Noting");
                          setShowSubButtonsCorrespondence(false);
                        }}
                      >
                        <button
                          type="button"
                          className={
                            selectedTab === "Noting"
                              ? "nav-link active"
                              : "nav-link"
                          }
                          style={{ width: "140px" }}
                          data-bs-toggle="tab"
                          role="tab"
                          aria-controls="ex1-tabs-1"
                          aria-selected={
                            selectedTab === "Noting" ? "true" : "false"
                          }
                        >
                          Noting
                        </button>
                      </li>
                      <li
                        className="nav-item"
                        role="presentation"
                        onClick={() => {
                          clearInput();
                          setSelectedTab("Correspondence");
                        }}
                      >
                        <button
                          type="button"
                          className={
                            selectedTab === "Correspondence"
                              ? "nav-link active"
                              : "nav-link"
                          }
                          style={{ width: "200px" }}
                          data-bs-toggle="tab"
                          role="tab"
                          aria-controls="ex1-tabs-2"
                          aria-selected={
                            selectedTab === "Correspondence" ? "true" : "false"
                          }
                          onClick={toggleButtons}
                        >
                          Correspondence
                          {/* (
                          {correspondancestore &&
                            correspondancestore[0]?.caseAttachments?.length}
                          ) */}
                        </button>
                      </li>
                    </ul>

                    <div class="tab-content" id="ex1-content">
                      <div class="row">
                        <div class="row mt-2 d-flex justify-content-end float-end">
                          <div class="col-2">
                            <button
                              class="btn btn-primary"
                              type="submit"
                              style={{
                                width: "150px",
                                display: location?.state?.view
                                  ? "none"
                                  : "block",
                              }}
                              onClick={() => handleSubmit(true)} // True means non-editable
                              disabled={
                                viewPage
                                  ? true
                                  : location?.state?.approved
                                    ? true
                                    : false
                              }
                            >
                              Finalize
                            </button>
                          </div>
                        </div>

                        <div class="col">
                          {selectedTab === "Noting" ? (
                            // Render content for the 'Noting' tab
                            <div className="container">
                              <div className="row mb-5">
                                <div className="col-12">
                                  <label className="form-label">Subject</label>
                                  <input
                                    className={`form-control mb-2`}
                                    id="subject"
                                    placeholder="Subject"
                                    onChange={(e) =>
                                      setNotingTabSubject(e.target.value)
                                    }
                                    value={notingTabSubject}
                                    style={{ width: "50%" }}
                                  />
                                  <label
                                    htmlFor="formFile"
                                    className="form-label mt-2"
                                  >
                                    Added Paragraphs
                                  </label>
                                  <DocParas
                                    tabsData={notingTabData}
                                    onEditorChange={handleEditorChange}
                                    onDelete={handleDelete}
                                  />
                                </div>
                              </div>

                              <label className="form-label">
                                Add new paragraph
                              </label>
                              <Editor
                                onChange={(content) =>
                                  setNotingData({ description: content })
                                }
                                value={notingData.description}
                                width={"100%"}
                                display={"flex"}
                              />
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                  marginTop: 5,
                                }}
                              >
                                <button
                                  className="btn btn-primary"
                                  style={{ marginTop: 60, width: "100px" }}
                                  onClick={() =>
                                    handleEditorChange(
                                      null,
                                      notingData.description,
                                      false,
                                      true
                                    )
                                  }
                                >
                                  {"Add"}
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div class="mt-3">
                              <CustomTable
                                hidebtn1={false}
                                addBtnText={"Create Correspondence"}
                                ActionHide={false}
                                data={correspondenceTypesData}
                                tableTitle="Correspondence"
                                headertitlebgColor={"#666"}
                                headertitletextColor={"#FFF"}
                                handlePageChange={handlePageChange}
                                currentPage={currentPage}
                                handleAdd={() => {
                                  if (fkfileId) {
                                    navigate(
                                      "/efiling/dashboard/file-register-list/files-list/addedit-case/addedit-correspondence",
                                      { state: { fileId: fkfileId.value } }
                                    );
                                  } else {
                                    showErrorMessage(
                                      "Please select file first"
                                    );
                                  }
                                }}
                                pageSize={pageSize}
                                totalCount={count}
                                singleDataCard={true}
                                showView={true}
                                handleView={(item) => {
                                  setAttachedFiles(item?.attachmentInternal);
                                  setShowModal(true);
                                }}
                                handleEdit={(item) => {
                                  if (fkfileId) {
                                    navigate(
                                      "/efiling/dashboard/file-register-list/files-list/addedit-case/addedit-correspondence",
                                      {
                                        state: {
                                          item: item,
                                          fileId: fkfileId.value,
                                        },
                                      }
                                    );
                                  } else {
                                    showErrorMessage(
                                      "Please select file first"
                                    );
                                  }
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-md-3" style={{ paddingRight: 0 }}>
              <div
                className="custom-editor-main"
                style={{ marginTop: 0, borderLeft: "1px solid #ddd" }}
              >
                <div className="comment-heading">
                  <h2
                    class="ps-3"
                    style={{ fontWeight: "bold", paddingTop: "7px" }}
                  >
                    Comments
                  </h2>
                  {!location?.state.approved && (
                    <a onClick={toggleModal}>
                      <button
                        className="btn add-btn"
                        style={{
                          display: location?.state?.view ? "none" : "block",
                        }}
                      >
                        {/* <FontAwesomeIcon
                          style={{ marginRight: "-5px" }}
                          // icon={faPlus}
                          size="md"
                          width={24}
                        /> */}
                        Proceed
                      </button>
                    </a>
                  )}
                </div>

                <div style={{ maxHeight: "712px", overflowY: "scroll" }}>
                  {remarksData?.length > 0 ? (
                    remarksData.map((item) => (
                      <>
                        {item?.CommentStatus !== null ||
                        item?.comment !== null ? (
                          <div
                            class="d-flex flex-row p-3 ps-3"
                            style={{ borderBottom: "1px solid #ddd" }}
                          >
                            <>
                              <div
                                class="w-100"
                                style={{ position: "relative" }}
                              >
                                <div class="d-flex justify-content-between align-items-center">
                                  <div class="d-flex flex-row align-items-center">
                                    <div style={{ float: "left" }}>
                                      <span
                                        class="mr-2"
                                        style={{ fontSize: "14px" }}
                                      >{`${item?.submittedUser?.employee?.firstName}  ${item?.submittedUser?.employee?.lastName}/ ${item?.submittedUser?.employee?.designations?.designationName}`}</span>
                                    </div>
                                  </div>
                                  <div style={{ float: "right" }}>
                                    <small>
                                      {/* {moment(item?.createdAt).format(
                                        "DD/MM/YYYY"
                                      )} */}
                                      {item?.formattedDateCreatedAt}
                                    </small>
                                    <small className="ms-2">
                                      {/* {moment(item?.createdAt).format(
                                        "hh:mm A"
                                      )} */}
                                      {item?.formattedTimeCreatedAt}
                                    </small>
                                  </div>
                                </div>
                                <p
                                  class="text-justify comment-text mb-0"
                                  style={{
                                    fontSize: "18px",
                                    color:
                                      item?.submittedUser?.employee
                                        ?.userType === "Officer"
                                        ? "green"
                                        : item?.submittedUser?.employee
                                              ?.userType === "Section"
                                          ? "blue"
                                          : "black",
                                  }}
                                >
                                  {item?.CommentStatus
                                    ? item?.CommentStatus
                                    : item?.comment}
                                </p>
                              </div>
                            </>
                          </div>
                        ) : (
                          <div
                            class="alert alert-danger mt-5"
                            role="alert"
                            style={{
                              width: "350px",
                              margin: "0 auto",
                              textAlign: "center",
                            }}
                          >
                            No data found
                          </div>
                        )}
                      </>
                    ))
                  ) : (
                    <div
                      class="alert alert-danger mt-5"
                      role="alert"
                      style={{
                        width: "350px",
                        margin: "0 auto",
                        textAlign: "center",
                      }}
                    >
                      No data found
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default FileDetail;
