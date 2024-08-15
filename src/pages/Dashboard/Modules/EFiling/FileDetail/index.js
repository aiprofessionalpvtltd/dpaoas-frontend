import React, { useContext, useEffect, useState, useRef } from "react";
import { Layout } from "../../../../../components/Layout";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import {
  getCaseIdForDetailPage,
  getFileIdForDetailPage,
  getUserData,
} from "../../../../../api/Auth";
import {
  ApprovedFIleCase,
  DeleteCorrApi,
  DeleteNotificationById,
  DeletePara,
  DeleteParaAttachement,
  UpdateFIleCase,
  assignFIleCase,
  getAllCorrespondence,
  getCaseDetailByID,
} from "../../../../../api/APIs/Services/efiling.service";
import { ToastContainer } from "react-toastify";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../utils/ToastAlert";
import { AuthContext } from "../../../../../api/AuthContext";
import { getHLEmployee } from "../../../../../api/APIs/Services/organizational.service";
import {
  EfilingSideBarBranchItem,
  EfilingSideBarItem,
} from "../../../../../utils/sideBarItems";
import { Button, Modal, Spinner } from "react-bootstrap";
import CustomTable from "../../../../../components/CustomComponents/CustomTable";
import DocParas from "../../../../../components/CustomComponents/DocParas";
import { Editor } from "../../../../../components/CustomComponents/Editor";
import CKEditorComp from "../../../../../components/CustomComponents/Editor/CKEditorComp";
import { imagesUrl } from "../../../../../api/APIs";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import moment from "moment";
import { CustomAlert } from "../../../../../components/CustomComponents/CustomAlert";

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
  const [showApproveModal, setShowApproveModal] = useState(false);
  const { fildetailsAqain } = useContext(AuthContext);
  const navigate = useNavigate();
  const UserData = getUserData();
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(null);
  const [correspondenceTypesData, setCorrespondenceTypesData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [fkfileId, setFKFileId] = useState(null);
  const [employeeData, setEmployeeData] = useState([]);
  const [viewPage, setViewPage] = useState(location?.state?.view);
  const { fileIdINRegister } = useContext(AuthContext);
  const [caseId, setcaseId] = useState(
    location?.state?.id || fildetailsAqain?.id
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Noting");
  const [remarksData, setRemarksData] = useState([]);
  const [notingTabSubject, setNotingTabSubject] = useState("");
  const [notingData, setNotingData] = useState({
    description: "",
  });
  const [modalInputValue, setModalInputValue] = useState({
    assignedTo: "",
    CommentStatus: "",
    priority: "",
    comment: "",
  });
  const [filesData, setFilesData] = useState(null);
  const [FR, setFR] = useState(null);
  const pageSize = 10;
  const [order, setOrder] = useState("DESC");
  const handleShow = () => setShowApproveModal(true);
  const handleClose = () => setShowApproveModal(false);
  const handleOkClick = () => {
    handleSubmit(true)
    handleClose();
  };

  // const initialNotingTabData = [
  //   {
  //     title: "Para 1",
  //     description: "Content for Paragraph 1",
  //     references: [
  //       {
  //         flag: "A",
  //         id: 2,
  //         attachments: [
  //           {
  //             file: "/public/correspondences/2024-06-04T07-58-31/output_1717395191507.pdf",
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   { title: "Para 2", description: "Content for Paragraph 2", references: [] },
  //   { title: "Para 3", description: "Content for Paragraph 3", references: [] },
  // ];

  const [notingTabData, setNotingTabsData] = useState([]);

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
      assignedTo: "",
      diaryNumber: "",
      comment: "",
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      // UpdateEfilingApi(values);
    },
  });

  const UpdateEfilingApi = async () => {
    const data = {
      notingSubject: notingTabSubject,
      paragraphArray: notingTabData,
    };
    try {
      const response = await UpdateFIleCase(filesData?.caseNoteId, data);
      if (response?.success) {
        showSuccessMessage(response?.message);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  const clearInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = null; // Reset the value of the input
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setModalInputValue({
      assignedTo: "",
      CommentStatus: "",
      priority: "",
      comment: "",
    })
  };

  const hendleAssiginFileCaseApi = async () => {
    try {
      const formData = new FormData();
      formData.append("submittedBy", UserData?.fkUserId);
      formData.append("assignedTo", modalInputValue?.assignedTo);
      formData.append("priority", modalInputValue?.priority);
      formData.append("CommentStatus", modalInputValue?.CommentStatus);
      formData.append(
        "comment",
        modalInputValue?.CommentStatus ? "" : modalInputValue?.comment
      );
      const response = await assignFIleCase(
        location?.state?.fileId || fildetailsAqain?.fileId
          ? location?.state?.fileId || fildetailsAqain?.fileId
          : fileIdINRegister,
        location?.state?.id || caseId,
        formData
      );

      if (response?.success) {
        showSuccessMessage(response?.message, true);
        toggleModal();
        getFilesByID();
        // Clear all fields in modalInputValue
        setModalInputValue({
          assignedTo: "",
          CommentStatus: "",
          priority: "",
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

  const getEmployeeData = async () => {
    try {
      const response = await getHLEmployee(UserData?.fkUserId);
      if (response?.success) {
        const filteredData = response?.data?.filter((item) => item?.userName !== UserData?.userName);
        setEmployeeData(filteredData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    try {
      const data = {
        caseId: caseId,
        newStatus: "approved",
      };

      const response = await ApprovedFIleCase(data);
      if (response?.success) {
        showSuccessMessage(response?.message);
        setTimeout(() => {
          navigate("/efiling/dashboard/file-register-list/files-list/cases");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditorChange = (
    index,
    content,
    references,
    isReference,
    isNew = false
  ) => {
    if (isNew) {
      setNotingTabsData([
        ...notingTabData,
        {
          title: `Para ${notingTabData?.length + 1}`,
          description: content,
          references: [],
          createdBy: UserData && UserData?.fkUserId,
        },
      ]);
      setNotingData("");
    } else if (isReference) {
      const updatedTabs = notingTabData.map((tab, i) =>
        i === index
          ? {
              ...tab,
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

  // const handleDelete = (index) => {
  //   const updatedTabs = notingTabData.filter((_, i) => i !== index);
  //   setNotingTabsData(updatedTabs);
  // };
  const handleDelete = async (item, index) => {
    // Remove the item at the specified index
    // if(item?.isSave){
    //   try {
    //     const response = await DeletePara(caseId, item?.references[0]?.id, item.id)
    //     if(response?.success){
    //       showSuccessMessage(response?.message)
    //       getFilesByID()
    //     }
    //   } catch (error) {
    //     showErrorMessage(error?.response?.data?.message)
    //   }
    // }else{
    const updatedTabs = notingTabData.filter((_, i) => i !== index);

    // // Update the titles of the remaining items
    const renumberedTabs = updatedTabs.map((tab, i) => ({
      ...tab,
      title: `Para ${i + 1}`,
    }));

    setNotingTabsData(renumberedTabs);
    // }
  };
  const handleFlagDeleteFunc = (tabIndex, flagIndex) => {
    // Function to handle deletion of a flag
    const updatedTabs = notingTabData.map((tab, tIndex) => {
      if (tIndex === tabIndex) {
        return {
          ...tab,
          references: tab.references.filter((_, fIndex) => fIndex !== flagIndex),
        };
      }
      return tab;
    });
    setNotingTabsData(updatedTabs);
  }


  const handleAttachDelete = async (item, tabIndex) => {
    //   const updatedTabs = notingTabData.map((tab, tIndex) => {

    //   });
    // console.log("updatedTabs", updatedTabs);
    //   setNotingTabsData(updatedTabs);
    //  console.log("renumberedTabs",renumberedTabs);
    //  setNotingTabsData({
    //   ...notingTabData,
    //   references: renumberedTabs
    // });

    if (item?.attachments[0]?.attachments[0]?.isSave) {
      try {
        const response = await DeleteParaAttachement(
          caseId,
          item?.attachments[0]?.attachments[0]?.correspondenceId,
          item?.attachments[0]?.attachments[0]?.paraID
        );
        if (response?.success) {
          showSuccessMessage(response?.message);
          getFilesByID();
        }
      } catch (error) {
        showErrorMessage(error?.response?.data?.message);
      }
    } else {
      // const tabIndex= 0
      const updatedTabs = notingTabData.map((tab, tIndex) => {
        if (
          item?.attachments[0]?.attachments[0]?.id ===
          item?.attachments[0]?.attachments[0]?.id
        ) {
          return {
            ...tab,
            references: [], // Remove all references by setting to an empty array
          };
        }
        return tab;
      });

      setNotingTabsData(updatedTabs);
    }
  };

  // else{
  // "test"
  //   const updatedTabs = notingTabData.filter((_, i) => i !== index);

  // // // Update the titles of the remaining items
  // const renumberedTabs = updatedTabs.map((tab, i) => ({
  //   ...tab,
  //   title: `Para ${i + 1}`
  // }));

  // setNotingTabsData(renumberedTabs);

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
        filesData?.cases?.files?.id,
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

  const HandlePrint = async (urlimage) => {
    const url = `${imagesUrl}${urlimage}`;
    window.open(url, "_blank");
  };

  const getFilesByID = async (fileGlobalId, caseGlobalId, orderBy) => {
    try {
      const response = await getCaseDetailByID(
        fileGlobalId
          ? fileGlobalId
          : location?.state?.fileId || fildetailsAqain?.fileId,
        caseGlobalId ? caseGlobalId : location?.state?.id || fildetailsAqain?.id,
        orderBy ? orderBy : "DESC"
      );

      if (response?.success) {
        setRemarksData(response?.data?.cases?.casesRemarks);
        setFilesData(response?.data);
        const FRSelection = {
          frId: response?.data?.cases?.freshReceipts?.id,
          frSubject: response?.data?.cases?.freshReceipts?.frSubject,
          freshReceiptsAttachments:
            response?.data?.cases?.freshReceipts?.freshReceiptsAttachments,
        };
        setFR(FRSelection);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    const fileId = location?.state?.fileId || fildetailsAqain?.fileId;
    const caseId = location?.state?.id || fildetailsAqain?.id;
    if (fileId && caseId) {
      setFKFileId(fileId);
      getFilesByID(fileId, caseId);
    }
  }, [
    getFileIdForDetailPage,
    location?.state?.fileId || fildetailsAqain?.fileId,
    caseId,
  ]);

  useEffect(() => {
    handleCorrespondences();
  }, [filesData?.cases?.files?.id]);

  useEffect(() => {
    getEmployeeData();
  }, []);

  useEffect(() => {
    formik.setValues({
      fileNumber: filesData?.cases?.files?.fileNumber || "",
      fileSubject: filesData?.cases?.files?.fileSubject || "",
      // priority: filesData?.cases?.files?.priority || "",
      fileCategory: filesData?.cases?.files?.fileCategory || "",
      // fileType: filesData?.cases?.files?.fileType || "",
      fkBranchId: filesData?.cases?.files?.fkBranchId || "",
      year: filesData?.cases?.files?.year || "",
    });
    setNotingTabSubject(filesData?.notingSubject);
    setNotingTabsData(filesData?.paragraphArray);
  }, [filesData]);

  const images =
    FR?.freshReceiptsAttachments?.map((item) => {
      const fileUrl = `${imagesUrl}${item?.filename}`;
      const isPdf = item?.filename?.toLowerCase().endsWith(".pdf");

      return {
        original: fileUrl,
        thumbnail: fileUrl,
        isPdf: isPdf, // Custom property to identify PDFs
      };
    }) || [];

      // Filter out images from the items
  const imageItems = images.filter((item) => !item.isPdf);

  const PdfPreview = ({ pdfUrl }) => {
    return (
      <>
        {loading && (
          <div
            style={{
              marginTop: "20px",
              marginLeft: "50px",
            }}
          >
            <Spinner />
          </div>
        )}
        <iframe
          src={pdfUrl}
          width="100%"
          height="600px"
          style={{
            border: "none",
            display: loading ? "none" : "block",
            marginTop: "20px",
          }}
          title="PDF Preview"
          onLoad={() => setLoading(false)} // Event listener for when the PDF is fully loaded
        />
      </>
    );
  };

  const handleDeleteCorr = async (id) => {
    try {
      const response = await DeleteCorrApi(id);
      if (response?.success) {
        showSuccessMessage(response.message);
        handleCorrespondences();
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  };

  useEffect(() => {
    const fileId = location?.state?.fileId || fildetailsAqain?.fileId;
    const caseId = location?.state?.id || fildetailsAqain?.id;
    if(fileId && caseId) {
      getFilesByID(fileId, caseId, order);
    }
  }, [order])

  const deleteNotification = async (item) => {
    try {
      const response = await DeleteNotificationById(
        location.state?.notificationId,
        UserData?.fkUserId
      );
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    deleteNotification();
  }, []);

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
      <CustomAlert
        showModal={showApproveModal}
        handleClose={handleClose}
        handleOkClick={handleOkClick}
      />
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
                  <option value={"Please Put Up"}>Please Put Up</option>
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
              <label class="form-label">Priority</label>
              <select
                className="form-select"
                id="priority"
                name="priority"
                onChange={(e) =>
                  setModalInputValue((prevState) => ({
                    ...prevState,
                    priority: e.target.value,
                  }))
                }
                value={modalInputValue.priority}
                disabled={viewPage ? true : false}
              >
                <option value="" selected disabled hidden>
                  Select
                </option>
                  <option value={"Confidential"}>Confidential</option>
                  <option value={"Immediate"}>Immediate</option>
                  <option value={"Routine"}>Routine</option>
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
                        value={item.fkUserId}
                      >{`${item?.firstName} ${item?.lastName} (${item.designations?.designationName})`}</option>
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
                        >
                          Correspondence
                          {/* (
                          {correspondancestore &&
                            correspondancestore[0]?.caseAttachments?.length}
                          ) */}
                        </button>
                      </li>
                      {FR?.freshReceiptsAttachments?.length > 0 && (
                        <li
                          className="nav-item"
                          role="presentation"
                          onClick={() => {
                            clearInput();
                            setSelectedTab("FR");
                          }}
                        >
                          <button
                            type="button"
                            className={
                              selectedTab === "FR"
                                ? "nav-link active"
                                : "nav-link"
                            }
                            style={{ width: "170px" }}
                            data-bs-toggle="tab"
                            role="tab"
                            aria-controls="ex1-tabs-2"
                            aria-selected={
                              selectedTab === "FR" ? "true" : "false"
                            }
                          >
                            FR
                          </button>
                        </li>
                      )}
                    </ul>

                    <div class="tab-content" id="ex1-content">
                      <div class="row">
                        <div class="row mt-2 d-flex justify-content-end float-end">
                        <div class="col-4">
                          <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                            <label style={{
    display: 'flex',
    width: '20%',
    alignItems: 'center'
                              }}
                            >Order By:</label>
                            <select
                              className="form-select w-75"
                              id="status"
                              name="status"
                              onChange={(e) => setOrder(e.target.value)}
                              value={order}
                            >
                              <option value={"ASC"}>Ascending</option>
                              <option value={"DESC"} selected>Descending</option>
                            </select>
                          </div>
                        </div>
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
                              onClick={() => UpdateEfilingApi()} // True means non-editable
                              disabled={
                                viewPage
                                  ? true
                                  : location?.state?.approved
                                    ? true
                                    : false
                              }
                            >
                              Save
                            </button>
                          </div>

                          {UserData && UserData?.userType === "Officer" && (
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
                                onClick={() => handleShow()} // True means non-editable
                                disabled={
                                  viewPage
                                    ? true
                                    : location?.state?.approved
                                      ? true
                                      : false
                                }
                              >
                                Approve Case
                              </button>
                            </div>
                          )}
                        </div>

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {selectedTab === "FR" && (
                            <>
                              <div className="row">
                                <div className="col-12">
                                  <section>
                                    {/* Render the ImageGallery once for all image items */}
                                    {imageItems.length > 0 && (
                                      <ImageGallery
                                        style={{ maxHeight: "calc(100vh 0px)" }}
                                        items={imageItems}
                                        showThumbnails={false}
                                        showFullscreenButton={false}
                                        showPlayButton={false}
                                        slideOnThumbnailOver
                                        renderThumbInner={(item) => (
                                          <div className="image-gallery-thumbnail-inner">
                                            <img
                                              src={item.thumbnail}
                                              alt="file"
                                              width={92}
                                              height={80}
                                              style={{ objectFit: "cover" }}
                                            />
                                          </div>
                                        )}
                                      />
                                    )}
                                  </section>
                                </div>
                              </div>

                              {/* Render PDF previews separately */}
                              {images.map((item, index) =>
                                item.isPdf ? (
                                  <PdfPreview
                                    pdfUrl={item.original}
                                    key={index}
                                  />
                                ) : null
                              )}
                            </>
                          )}
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
                                    disabled={location?.state?.view ? true : false}
                                    placeholder="Subject"
                                    onChange={(e) =>
                                      setNotingTabSubject(e.target.value)
                                    }
                                    value={notingTabSubject}
                                    style={{ width: "50%" }}
                                  />
                                  {notingTabData?.length > 0 && (
                                    <label
                                      htmlFor="formFile"
                                      className="form-label mt-2"
                                    >
                                      Added Paragraphs
                                    </label>
                                  )}
                                  <DocParas
                                    tabsData={notingTabData}
                                    disabled={location?.state?.view ? true : false}
                                    onEditorChange={handleEditorChange}
                                    onDelete={handleDelete}
                                    hendleDeleteAttach={(item, innerIdx) =>
                                      handleAttachDelete(item, innerIdx)
                                    }
                                    handleFlagDelete={(tabIndex, flagIndex) => handleFlagDeleteFunc(tabIndex, flagIndex)}

                                    FR={FR}
                                    selectedFileId={
                                      location?.state?.fileId ||
                                      fildetailsAqain?.fileId
                                    }
                                  />
                                </div>
                              </div>

                              <label className="form-label">
                                Add new paragraph
                              </label>
                              <CKEditorComp
                                onChange={(data) =>
                                  setNotingData({ description: data })
                                }
                                value={notingData.description}
                                disabled={location?.state?.view ? true : false}
                              />

                              {/* <Editor
                                onChange={(content) =>
                                  setNotingData({ description: content })
                                }
                                value={notingData.description}
                                width={"100%"}
                                display={"flex"}
                              /> */}
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
                                  disabled={location?.state?.view ? true : false}
                                  onClick={() =>
                                    handleEditorChange(
                                      null,
                                      notingData.description,
                                      null,
                                      false,
                                      true
                                    )
                                  }
                                >
                                  {"Add"}
                                </button>
                              </div>
                            </div>
                          ) : null}

                          {selectedTab === "Correspondence" ? (
                            <div class="mt-3">
                              <CustomTable
                                hidebtn1={location.state?.view ? true : false}
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
                                      {
                                        state: {
                                          fileId: fkfileId,
                                          fileDetail: true,
                                        },
                                      }
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
                                showEditIcon={location.state?.view ? true : false}
                                hideDeleteIcon={location.state?.view ? true : false}
                                handleDelete={(item) => handleDeleteCorr(item.internalId)}
                                handleEdit={(item) => {
                                  if (fkfileId) {
                                    navigate(
                                      "/efiling/dashboard/file-register-list/files-list/addedit-case/addedit-correspondence",
                                      {
                                        state: {
                                          item: item,
                                          fileId: fkfileId,
                                          fileDetail: true,
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
                          ) : null}
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
                  {!location?.state?.approved && (
                    <a onClick={toggleModal}>
                      <button
                        className="btn add-btn"
                        style={{
                          display: location?.state?.view ? "none" : "block",
                        }}
                      >
                        Proceed
                      </button>
                    </a>
                  )}
                </div>

                <div style={{ maxHeight: "712px", overflowY: "scroll" }}>
                  {remarksData?.length > 0 ? (
                    remarksData.map((item) => (
                      <>
                        {(item?.CommentStatus !== null ||
                        item?.comment !== null) && (
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
                                        style={{
                                          fontSize: "14px",
                                        }}
                                      >{`${item?.submittedUser?.employee?.firstName}  ${item?.submittedUser?.employee?.lastName}/ ${item?.submittedUser?.employee?.designations?.designationName}`}</span>
                                    </div>
                                  </div>
                                  <div style={{ float: "right" }}>
                                    <small>
                                      {moment(item?.createdAt).format(
                                        "DD/MM/YYYY"
                                      )}
                                    </small>
                                    <small className="ms-2">
                                      {moment(item?.createdAt).format(
                                        "hh:mm a"
                                      )}
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
