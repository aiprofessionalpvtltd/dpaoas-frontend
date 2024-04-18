import React, { useContext, useEffect, useState, useRef } from "react";
import { Layout } from "../../../../../components/Layout";
import Header from "../../../../../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import thumbnail from "./../../../../../assets/profile-img.jpg";
import DatePicker from "react-datepicker";
import ImageGallery from "react-image-gallery";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
// import Modal from "react-modal";
import { TinyEditor } from "../../../../../components/CustomComponents/Editor/TinyEditor";
import NewCaseEfilling from "../AddEditFileForm";
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
  getCaseDetailByID,
  getEFilesByID,
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

const EFilingModal = ({ isOpen, toggleModal, title, children }) => {
  return (
    <Modal show={isOpen} onHide={toggleModal} centered>
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

  console.log(
    "location?.state?.fileIdlocation?.state?.fileIdlocation?.state?.fileIdlocation?.state?.fileId",
    location?.state?.fileId
  );

  console.log("location?.state", location?.state);

  const [notingData, setNotingData] = useState({
    description: "",
  });

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

  const [employeeData, setEmployeeData] = useState([]);
  console.log("employeeDataemployeeDataemployeeData", employeeData);
  const [filesData, setFilesData] = useState(null);
  const [viewPage, setViewPage] = useState(location?.state?.view);

  const [documentTypeVal, setDocumentTypeVal] = useState("");

  const { ministryData, fileIdINRegister } = useContext(AuthContext);
  const [departmentData, setDepartmentData] = useState([]);
  const [branchesData, setBranchesData] = useState([]);

  const [caseId, setcaseId] = useState(location?.state?.id);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [togleOpan, setTogleOpan] = useState(true);
  const [selectedTab, setSelectedTab] = useState("FR Noting");

  const [remarksData, setRemarksData] = useState([]);
  const [frAttachments, setFrAttachments] = useState([]);

  const navigate = useNavigate();

  const yaerData = [
    {
      name: "2024",
    },
    {
      name: "2023",
    },
    {
      name: "2022",
    },
    {
      name: "2021",
    },
    {
      name: "2020",
    },
    {
      name: "2019",
    },
    {
      name: "2018",
    },
    {
      name: "2017",
    },
    {
      name: "2016",
    },
    {
      name: "2015",
    },
  ];

  console.log("File ID", location.state.fileId, fileIdINRegister);

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

  const handleFileChangeSanction = (event) => {
    // Access the files from the event
    const files = event.target.files;
    // Convert the files object to an array
    const fileList = Array.from(files);
    // Store the selected files in state
    setSanction((prevState) => ({
      ...prevState,
      attachedFiles: [...prevState.attachedFiles, ...fileList],
    }));
  };

  const handleFileChangeObjection = (event) => {
    // Access the files from the event
    const files = event.target.files;
    // Convert the files object to an array
    const fileList = Array.from(files);
    // Store the selected files in state
    setObjection((prevState) => ({
      ...prevState,
      attachedFiles: [...prevState.attachedFiles, ...fileList],
    }));
  };

  const handleFileChangeLetter = (event) => {
    // Access the files from the event
    const files = event.target.files;
    // Convert the files object to an array
    const fileList = Array.from(files);
    // Store the selected files in state
    setLetter((prevState) => ({
      ...prevState,
      attachedFiles: [...prevState.attachedFiles, ...fileList],
    }));
  };

  console.log("Case Id----------------------", location?.state?.id);
  const UpdateEfilingApi = async (values) => {
    const formData = new FormData();
    // formData.append("submittedBy", UserData?.fkUserId);
    // formData.append("assignedTo",  values?.assignedTo);
    // formData.append("CommentStatus", values?.CommentStatus);
    // formData.append("comment", values?.comment);

    console.log("alues?.isEditable", values?.isEditable);

    formData.append("isEditable", values?.isEditable);
    formData.append("cases[0][Note][description]", notingData.description);
    formData.append(
      "cases[0][Correspondence][description]",
      correspondenceData.description
    );
    formData.append("cases[0][Sanction][description]", sanction.description);
    formData.append("cases[0][Objection][description]", objection.description);
    formData.append("cases[0][Letter][description]", letter.description);
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
    const data = {
      submittedBy: UserData?.fkUserId,
      assignedTo: modalInputValue?.assignedTo,
      CommentStatus: modalInputValue?.CommentStatus,
      comment: modalInputValue?.comment,
    };
    try {
      const response = await assignFIleCase(
        location?.state?.fileId ? location?.state?.fileId : fileIdINRegister,
        location?.state?.id,
        data
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
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  // use it (editorContent) when submitting whole file content

  const [directorData, setDirectorData] = useState();
  const [notingstore, setNotingStore] = useState();
  const [correspondancestore, setcorrespondanceStore] = useState();
  const [letterstore, setLetterStore] = useState();
  const [objectionstore, setbjectionstore] = useState();
  const [sectionstore, setsectionstore] = useState();

  const getFilesByID = async () => {
    try {
      const response = await getCaseDetailByID(
        location?.state?.fileId ? location?.state?.fileId : fileIdINRegister,
        caseId
      );
      if (response?.success) {
        setDirectorData(response?.data?.cases?.fileDiary);
        setRemarksData(response?.data?.cases?.fileRemarks);
        setFilesData(response?.data?.cases);
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
    }
  }, []);

  // console.log("year-----------", filesData?.fileType);
  useEffect(() => {
    // Update form values when termsById changes
    if (filesData) {
      const noting = filesData?.sections?.filter(
        (item) => item.sectionType === "Note"
      );
      const correspondance = filesData?.sections?.filter(
        (item) => item.sectionType === "Correspondence"
      );
      const letter = filesData?.sections?.filter(
        (item) => item.sectionType === "Letter"
      );
      const Objection = filesData?.sections?.filter(
        (item) => item.sectionType === "Objection"
      );
      const Sanction = filesData?.sections?.filter(
        (item) => item.sectionType === "Sanction"
      );
      const frAttachments =
        filesData?.freshReceipts?.freshReceiptsAttachments?.length > 0 &&
        filesData?.freshReceipts?.freshReceiptsAttachments;
      setFrAttachments(frAttachments);

      setNotingStore(noting);
      setcorrespondanceStore(correspondance);
      setLetterStore(letter);
      setbjectionstore(Objection);
      setsectionstore(Sanction);

      setCorrespondenceData((prev) => ({
        ...prev,
        description: correspondance[0]?.description || "",
      }));
      setObjection((prev) => ({
        ...prev,
        description: Objection[0]?.description || "",
      }));
      setLetter((prev) => ({
        ...prev,
        description: letter[0]?.description || "",
      }));
      setSanction((prev) => ({
        ...prev,
        description: Sanction[0]?.description || "",
      }));
      setNotingData((prev) => ({
        ...prev,
        description: noting[0]?.description || "",
      }));

      formik.setValues({
        fileNumber: filesData?.fileDetails?.fileNumber || "",
        fileSubject: filesData?.fileDetails?.fileSubject || "",
        // priority: filesData?.fileDetails?.priority || "",
        fileCategory: filesData?.fileDetails?.fileCategory || "",
        // fileType: filesData?.fileDetails?.fileType || "",
        fkBranchId: filesData?.fileDetails?.fkBranchId || "",
        year: filesData?.fileDetails?.year || "",
      });
      setDocumentTypeVal(filesData?.fileDetails?.fileType);
    }
  }, [filesData, formik.setValues]);

  const handleDocumentType = (e) => {
    setDocumentTypeVal(e.target.value);
  };
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
      const response = await DeleteNotificationById(location.state?.notificationId, UserData?.fkUserId);
      console.log("Notification deleted", response?.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    if(location.state?.notificationId) {
      deleteNotification();
    }
    getEmployeeData();
    getBranchesapi();
    getDepartmentData();
  }, []);

  const hendleFRRemoveImage = async (item) => {
    try {
      const response = await DeleteFreahReceptImage(item?.id);
      if (response?.success) {
        showSuccessMessage(response.message);
        getFilesByID(
          location?.state?.fileId ? location?.state?.fileId : fileIdINRegister,
          caseId
        );
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  };

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
    formik.setFieldValue('isEditable', isDraft); // Set isEdit value based on button clicked
    formik.submitForm(); // Trigger form submission
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
        <ToastContainer />
        {/* <Header
          dashboardLink={"/efiling/dashboard"}
          addLink1={"/efiling/dashboard/file-register-list/files-list/cases"}
          title1={"File Cases"}
          addLink2={"/efiling/dashboard/addedit"}
          title2={location && viewPage ? "File Detail" : "Edit File"}
          width={"500px"}
        /> */}

        <EFilingModal
          title="Add Comments"
          isOpen={isModalOpen}
          toggleModal={toggleModal}
          // hendleSubmit={() => hendleAssiginFileCaseApi()}
        >
          <div class="row">
            <div class="col">
              <div class="mb-3">
                <label class="form-label">Action</label>
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
                  <option value="" selected disabled hidden>
                    Select
                  </option>
                  <option value={"Approved"}>Approved</option>
                  <option value={"Under Discussion"}>Under Discussion</option>
                  <option value={"Retype/Amend"}>Retype/Amend</option>
                  <option value={"Rejected"}>Rejected</option>
                  <option value={"Submit For Approval"}>
                    Submit For Approval
                  </option>
                  <option value={"Seen"}>Seen</option>
                  <option value={"Pend"}>Pend</option>
                  <option value={"NFA"}>NFA</option>
                  <option value={"Approval For Para"}>Approval For Para</option>
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
                  <option value={""} selected disabled hidden>
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
                <label class="form-label">Add Comments</label>
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
            {/* <div className="col-md-2">
              <div className="noting">
                {directorData?.length > 0 ? (
                  directorData.map((item) => (
                    <div key={item.id}>
                      <p
                        style={{ marginBottom: "0px", fontWeight: "bold" }}
                      >{`${item?.submittedByUser?.employee?.departments?.departmentName} Branch`}</p>
                      <p
                        style={{ marginBottom: "0" }}
                      >{`Diary Number : ${item?.diaryNumber}`}</p>
                      <p style={{ marginBottom: "0" }}>
                        {moment(item?.createdAt).format("DD/MM/YYYY")}
                      </p>
                      <p>{moment(item?.createdAt).format("hh:mm A")}</p>
                    </div>
                  ))
                ) : (
                  <div
                    className="alert alert-danger mt-2"
                    role="alert"
                    style={{
                      width: "208px",
                      margin: "0 auto",
                      textAlign: "center",
                    }}
                  >
                    No data found
                  </div>
                )}
              </div>
            </div> */}
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
                  {/* <div className="row">
                    {documentTypeVal === "Internal" ? (
                      <>
                        <div class="col-6">
                          <div class="mb-3">
                            <label class="form-label">Branch</label>
                            <select
                              class="form-select"
                              id="fkBranchId"
                              name="fkBranchId"
                              disabled={true}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.fkBranchId}
                            >
                              <option value={""} selected disabled hidden>
                                Select
                              </option>
                              {branchesData &&
                                branchesData?.map((item) => (
                                  <option value={item.id}>
                                    {item.branchName}
                                  </option>
                                ))}
                            </select>
                          </div>
                        </div>
                      </>
                    ) : documentTypeVal === "External" ? (
                      <>
                        <div class="col-6">
                          <div class="mb-3">
                            <label class="form-label">Ministries</label>
                            <select
                              disabled={true}
                              class="form-select"
                              id="fkMinistryId"
                              name="fkMinistryId"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.fkMinistryId}
                            >
                              <option value={""} selected disabled hidden>
                                Select
                              </option>
                              {ministryData &&
                                ministryData.map((item) => (
                                  <option value={item.id}>
                                    {item.ministryName}
                                  </option>
                                ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-6">
                          <div
                            className="mb-3"
                            style={{ position: "relative" }}
                          >
                            <label className="form-label">Received On</label>
                            <span
                              style={{
                                position: "absolute",
                                right: "15px",
                                top: "36px",
                                zIndex: 1,
                                fontSize: "20px",
                                color: "#666",
                              }}
                            >
                              <FontAwesomeIcon icon={faCalendarAlt} />
                            </span>
                            <DatePicker
                              disabled={true}
                              selected={formik.values.receivedOn}
                              onChange={(date) =>
                                formik.setFieldValue("receivedOn", date)
                              }
                              onBlur={formik.handleBlur}
                              // minDate={new Date()}
                              className={`form-control`}
                            />
                          </div>
                        </div>
                      </>
                    ) : null}
                  </div> */}

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
                          setSelectedTab("FR Noting");
                        }}
                      >
                        <button
                          type="button"
                          className={
                            selectedTab === "FR Noting"
                              ? "nav-link active"
                              : "nav-link"
                          }
                          style={{ width: "170px" }}
                          data-bs-toggle="tab"
                          role="tab"
                          aria-controls="ex1-tabs-1"
                          disabled={frAttachments ? false : true}
                          aria-selected={
                            selectedTab === "FR Noting" ? "true" : "false"
                          }
                        >
                          FR ({frAttachments.length})
                        </button>
                      </li>
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
                          Correspondence ({correspondancestore && correspondancestore[0]?.caseAttachments?.length})
                        </button>
                      </li>
                      {/*
                      <li
                        className="nav-item"
                        role="presentation"
                        onClick={() => {
                          clearInput();
                          setSelectedTab("Sanction");
                        }}
                      >
                        <button
                          type="button"
                          className={
                            selectedTab === "Sanction"
                              ? "nav-link active"
                              : "nav-link"
                          }
                          style={{ width: "140px" }}
                          data-bs-toggle="tab"
                          role="tab"
                          aria-controls="ex1-tabs-1"
                          aria-selected={
                            selectedTab === "Sanction" ? "true" : "false"
                          }
                        >
                          Sanction
                        </button>
                      </li>
                      <li
                        className="nav-item"
                        role="presentation"
                        onClick={() => {
                          clearInput();
                          setSelectedTab("Objection");
                        }}
                      >
                        <button
                          type="button"
                          className={
                            selectedTab === "Objection"
                              ? "nav-link active"
                              : "nav-link"
                          }
                          style={{ width: "140px" }}
                          data-bs-toggle="tab"
                          role="tab"
                          aria-controls="ex1-tabs-2"
                          aria-selected={
                            selectedTab === "Objection" ? "true" : "false"
                          }
                        >
                          Objection
                        </button>
                      </li>
                      <li
                        className="nav-item"
                        role="presentation"
                        onClick={() => {
                          clearInput();
                          setSelectedTab("Letter");
                        }}
                      >
                        <button
                          type="button"
                          className={
                            selectedTab === "Letter"
                              ? "nav-link active"
                              : "nav-link"
                          }
                          style={{ width: "140px" }}
                          data-bs-toggle="tab"
                          role="tab"
                          aria-controls="ex1-tabs-2"
                          aria-selected={
                            selectedTab === "Letter" ? "true" : "false"
                          }
                        >
                          Letter
                        </button>
                      </li> */}
                    </ul>

                    <div class="tab-content" id="ex1-content">
                      {selectedTab === "FR Noting" ? (
                        <section>
                          <ImageGallery
                            style={{ maxHeight: "calc(100vh 0px)" }}
                            items={images}
                            showThumbnails={false}
                            showFullscreenButton={false}
                            showPlayButton={false}
                            slideOnThumbnailOver
                            renderThumbInner={(item) => (
                              <div className="image-gallery-thumbnail-inner">
                                <img
                                  src={item.thumbnail}
                                  alt={"file"}
                                  width={92}
                                  height={80}
                                />
                                {/* Add any additional elements or styles for the thumbnail */}
                              </div>
                            )}
                          />
                        </section>
                      ) : selectedTab === "Noting" ? (
                        // Render content for the 'Noting' tab
                        <section class="mb-5">
                          <label for="formFile" class="form-label mt-3">
                            Description
                          </label>

                          <TinyEditor
                            initialContent={""}
                            disabled={viewPage ? true : filesData?.isEditable ? true : false}
                            setEditorContent={(content) =>
                              setNotingData((prev) => ({
                                ...prev,
                                description: content,
                              }))
                            }
                            editorContent={notingData.description}
                            multiLanguage={false}
                            // disabled={location.state?.view ? true : false}
                          />
                        </section>
                      ) : selectedTab === "Correspondence" ? (
                        <section>
                          <label for="formFile" class="form-label mt-3">
                            Description
                          </label>

                          <TinyEditor
                            initialContent={""}
                            disabled={viewPage ? true  : filesData?.isEditable ? filesData?.isEditable : false}
                            setEditorContent={(content) =>
                              setCorrespondenceData((prev) => ({
                                ...prev,
                                description: content,
                              }))
                            }
                            editorContent={correspondenceData.description}
                            multiLanguage={false}
                            // disabled={location.state?.view ? true : false}
                          />
                          <div class="row">
                            <div class="col">
                              <div class="mb-3 mt-5">
                                <div class="form-group">
                                  <div class="row">
                                    <label
                                      for="formFile"
                                      class="form-label mt-3"
                                    >
                                      Attach File
                                    </label>
                                    <div class="col-6">
                                      <input
                                        ref={fileInputRef}
                                        className="form-control"
                                        type="file"
                                        accept=".pdf, .jpg, .jpeg, .png"
                                        id="correspondance"
                                        name="correspondance"
                                        multiple
                                        onChange={(event) =>
                                          handleFileChangeCorrespondance(event)
                                        }
                                        // disabled={location.state?.view ? true : false}
                                      />
                                      {filesData?.sections.length > 0 && (
                                        <div>
                                          <label
                                            for="formFile"
                                            class="form-label mt-3 mb-0"
                                          >
                                            Attached Files
                                          </label>
                                          <ul>
                                            {filesData?.sections &&
                                              correspondancestore[0]?.caseAttachments.map(
                                                (file, index) => {
                                                  return (
                                                    <div key={index}>
                                                      <a
                                                        class="MultiFile-remove"
                                                        style={{
                                                          marginRight: "10px",
                                                          color: "red",
                                                          cursor: "pointer",
                                                        }}
                                                        onClick={() =>
                                                          hendleRemoveImage(
                                                            file?.id
                                                          )
                                                        }
                                                      >
                                                        x
                                                      </a>
                                                      <a
                                                        href={
                                                          file?.id
                                                            ? `http://172.16.170.8:5252${file?.fileName}`
                                                            : URL.createObjectURL(
                                                                file
                                                              )
                                                        }
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                      >
                                                        {file?.id
                                                          ? file?.fileName
                                                              ?.split("/")
                                                              .pop()
                                                          : file.name}
                                                      </a>
                                                    </div>
                                                  );
                                                }
                                              )}
                                          </ul>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                      ) : null}
                    </div>
                  </div>

                  <div class="row mt-4 d-md-flex justify-content-end float-end">
                    <div class="col">
                      <button
                        class="btn btn-primary"
                        type="submit"
                        style={{ width: '150px' }}
                        onClick={() => handleSubmit(false)} // False means editable
                        disabled={viewPage ? true : location?.state?.approved ?  true : false}
                      >
                        Save As Draft
                      </button>
                    </div>

                    <div class="col">
                      <button
                        class="btn btn-primary"
                        type="submit"
                        onClick={() => handleSubmit(true)} // True means non-editable
                        disabled={viewPage ? true : location?.state?.approved ?  true : false}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                  {/* <div className="row">
                    <div class="col-6">
                     
                      <label class="form-label" style={{ display: "block" }}>
                        Attached File
                      </label>
                      <span
                        class="MultiFile-label"
                        style={{ marginBottom: "18px", display: "block" }}
                        title={filesData?.attachment
                          ?.split("\\")
                          .pop()
                          .split("/")
                          .pop()}
                      >
                        <span class="MultiFile-title">
                          <a
                            href={`http://172.16.170.8:5252${filesData?.attachment}`}
                          >
                            {filesData?.attachment
                              ?.split("\\")
                              .pop()
                              .split("/")
                              .pop()}
                          </a>
                        </span>
                      </span>
                      
                    </div>
                  </div> */}
                </div>
                {/* 
                <div className="m-2">
                  <div class="row mt-4">
                    <div class="col-6">
                      <div class="mb-3">
                        <label class="form-label">Diary Number</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Diary Number"
                          id="diaryNumber"
                          name="diaryNumber"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.diaryNumber}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label for="formFile" class="form-label mt-3">
                      Upload Signature
                    </label>
                    <input class="form-control" type="file" id="formFile" />
                    <div className="clearfix"></div>
                  </div>
                </div> */}
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
                    <button class="btn add-btn">
                      <FontAwesomeIcon
                        style={{ marginRight: "-5px" }}
                        icon={faPlus}
                        size="md"
                        width={24}
                      />{" "}
                      Add your comment
                    </button>
                  </a>
                  )}
                  
                </div>

                <div style={{ maxHeight: "712px", overflowY: "scroll" }}>
                  {remarksData?.length > 0 ? (
                    remarksData.map((item) => (
                      <>
                        {item?.comment !== null ? (
                          <div
                            class="d-flex flex-row p-3 ps-3"
                            style={{ borderBottom: "1px solid #ddd" }}
                          >
                            <>
                              {/* <img
                              style={{
                                marginBottom: "30px",
                                marginRight: "15px",
                              }}
                              src={thumbnail}
                              width="40"
                              height="40"
                              class="rounded-circle mr-3"
                            /> */}
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
                                      {/* <small
                                      style={{
                                        marginLeft: "0px",
                                        position: "absolute",
                                        top: "-21px",
                                      }}
                                      class="c-badge"
                                    >
                                      {
                                        item?.submittedUser?.employee
                                          ?.designations?.designationNam
                                      }
                                    </small> */}
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
                                        "hh:mm A"
                                      )}
                                    </small>
                                  </div>
                                </div>
                                <p
                                  class="text-justify comment-text mb-0"
                                  style={{ fontSize: "18px" }}
                                >
                                  {item?.comment}
                                </p>
                                {/* <small
                                style={{
                                  marginBottom: "20px",
                                  background:
                                    item?.CommentStatus === "Approved"
                                      ? "green"
                                      : item?.CommentStatus === "Rejected"
                                        ? "red"
                                        : "grey",
                                }}
                                class="c-badge"
                              >
                                {item?.CommentStatus}
                              </small> */}
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
