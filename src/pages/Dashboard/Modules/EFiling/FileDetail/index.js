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

  const [showSubButtonsCorrespondence, setShowSubButtonsCorrespondence] =
    useState(false);

  const toggleButtons = () => {
    setShowSubButtonsCorrespondence(true);
  };

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
  const handleFileChangeCircular = (event) => {
    // Access the files from the event
    const files = event.target.files;
    // Convert the files object to an array
    const fileList = Array.from(files);
    // Store the selected files in state
    setCircular((prevState) => ({
      ...prevState,
      attachedFiles: [...prevState.attachedFiles, ...fileList],
    }));
  };
  const handleFileChangeMisc = (event) => {
    // Access the files from the event
    const files = event.target.files;
    // Convert the files object to an array
    const fileList = Array.from(files);
    // Store the selected files in state
    setMisc((prevState) => ({
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

  // use it (editorContent) when submitting whole file content

  const [directorData, setDirectorData] = useState();
  const [notingstore, setNotingStore] = useState();
  const [correspondancestore, setcorrespondanceStore] = useState();
  const [letterstore, setLetterStore] = useState();
  const [objectionstore, setbjectionstore] = useState();
  const [sectionstore, setsectionstore] = useState();
  const [circularStore, setCircularStore] = useState();
  const [miscStore, setMiscStore] = useState();
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
        setDirectorData(response?.data?.cases?.fileDiary);
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
      const Circular = filesData?.sections?.filter(
        (item) => item.sectionType === "Circular"
      );
      const Misc = filesData?.sections?.filter(
        (item) => item.sectionType === "Misc"
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
      setCircularStore(Circular);
      setMiscStore(Misc);

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
      setCircular((prev) => ({
        ...prev,
        description: Circular[0]?.description || "",
      }));
      setMisc((prev) => ({
        ...prev,
        description: Misc[0]?.description || "",
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
    formik.setFieldValue("isEditable", isDraft); // Set isEdit value based on button clicked
  };

  const SanactionImages =
    (filesData &&
      filesData?.sections &&
      sectionstore?.length > 0 &&
      sectionstore[0]?.caseAttachments.map((item) => ({
        original: `http://172.16.170.8:5252${item?.fileName}`,
        thumbnail: `http://172.16.170.8:5252${item?.fileName}`,
      }))) ||
    [];

  const ObjectionImages =
    (filesData &&
      filesData?.sections &&
      objectionstore?.length > 0 &&
      objectionstore[0]?.caseAttachments.map((item) => ({
        original: `http://172.16.170.8:5252${item?.fileName}`,
        thumbnail: `http://172.16.170.8:5252${item?.fileName}`,
      }))) ||
    [];
  const LetterImages =
    (filesData &&
      filesData?.sections &&
      letterstore?.length > 0 &&
      letterstore[0]?.caseAttachments.map((item) => ({
        original: `http://172.16.170.8:5252${item?.fileName}`,
        thumbnail: `http://172.16.170.8:5252${item?.fileName}`,
      }))) ||
    [];
  const CircularImages =
    (filesData &&
      filesData?.sections &&
      circularStore?.length > 0 &&
      circularStore[0]?.caseAttachments.map((item) => ({
        original: `http://172.16.170.8:5252${item?.fileName}`,
        thumbnail: `http://172.16.170.8:5252${item?.fileName}`,
      }))) ||
    [];
  const MiscImages =
    (filesData &&
      filesData?.sections &&
      miscStore?.length > 0 &&
      miscStore[0]?.caseAttachments.map((item) => ({
        original: `http://172.16.170.8:5252${item?.fileName}`,
        thumbnail: `http://172.16.170.8:5252${item?.fileName}`,
      }))) ||
    [];

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
                  <option value={"For Perusal Please"}>For Perusal Please</option>
                  <option value={"Submitted For Approval"}>Submitted For Approval</option>
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

          <div class="row mb-2">
            <div class="col">
              <label for="formFile" class="form-label mt-3">
                Upload Signature
              </label>
              <input
                class="form-control"
                type="file"
                id="formFile"
                onChange={handleFileUpload}
              />
              <div className="clearfix"></div>
            </div>

            <div class="col">
              {(uplodedSignaturePreviewUrl || uplodedSignaturePreview) && (
                <>
              {uplodedSignaturePreview ? (
                <img
                  src={uplodedSignaturePreview}
                  alt="Uploaded Signature"
                  className="img-fluid"
                />
              ) : (
                <img
                  src={`http://10.10.140.200:5152${uplodedSignaturePreviewUrl}`}
                  alt="Signature"
                  className="img-fluid"
                />
              )}
              </>
              )}
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

                    {/* <div className="row">
                      <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}></div>
                    </div> */}
                    {showSubButtonsCorrespondence && (
                      <div className="row">
                        <ul
                          className="nav nav-tabs mb-3 mt-3"
                          id="ex2"
                          role="tablist"
                        >
                          {filesData?.freshReceipts !== null && (
                            <li
                              className="nav-item"
                              role="presentation"
                              onClick={() => {
                                clearInput();
                                setSubSelectedTab("FR");
                              }}
                            >
                              <button
                                type="button"
                                className={
                                  subSelectedTab === "FR"
                                    ? "nav-link active"
                                    : "nav-link"
                                }
                                style={{ width: "170px" }}
                                data-bs-toggle="tab"
                                role="tab"
                                aria-controls="ex1-tabs-1"
                                disabled={frAttachments ? false : true}
                                aria-selected={
                                  subSelectedTab === "FR" ? "true" : "false"
                                }
                              >
                                FR ({frAttachments?.length})
                              </button>
                            </li>
                          )}
                          <li
                            className="nav-item"
                            role="presentation"
                            onClick={() => {
                              clearInput();
                              setSubSelectedTab("Sanction");
                              // setSubSelectedTab("Sanction");
                            }}
                          >
                            <button
                              type="button"
                              className={
                                subSelectedTab === "Sanction"
                                  ? "nav-link active"
                                  : "nav-link"
                              }
                              style={{ width: "140px" }}
                              data-bs-toggle="tab"
                              role="tab"
                              aria-controls="ex1-tabs-1"
                              aria-selected={
                                subSelectedTab === "Sanction" ? "true" : "false"
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
                              setSubSelectedTab("Objection");
                            }}
                          >
                            <button
                              type="button"
                              className={
                                subSelectedTab === "Objection"
                                  ? "nav-link active"
                                  : "nav-link"
                              }
                              style={{ width: "140px" }}
                              data-bs-toggle="tab"
                              role="tab"
                              aria-controls="ex1-tabs-2"
                              aria-selected={
                                subSelectedTab === "Objection"
                                  ? "true"
                                  : "false"
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
                              setSubSelectedTab("Letter");
                            }}
                          >
                            <button
                              type="button"
                              className={
                                subSelectedTab === "Letter"
                                  ? "nav-link active"
                                  : "nav-link"
                              }
                              style={{ width: "140px" }}
                              data-bs-toggle="tab"
                              role="tab"
                              aria-controls="ex1-tabs-2"
                              aria-selected={
                                subSelectedTab === "Letter" ? "true" : "false"
                              }
                            >
                              Letter
                            </button>
                          </li>

                          <li
                            className="nav-item"
                            role="presentation"
                            onClick={() => {
                              clearInput();
                              setSubSelectedTab("Circular");
                            }}
                          >
                            <button
                              type="button"
                              className={
                                subSelectedTab === "Circular"
                                  ? "nav-link active"
                                  : "nav-link"
                              }
                              style={{ width: "140px" }}
                              data-bs-toggle="tab"
                              role="tab"
                              aria-controls="ex1-tabs-2"
                              aria-selected={
                                subSelectedTab === "Circular" ? "true" : "false"
                              }
                            >
                              Circular
                            </button>
                          </li>

                          <li
                            className="nav-item"
                            role="presentation"
                            onClick={() => {
                              clearInput();
                              setSubSelectedTab("Misc");
                            }}
                          >
                            <button
                              type="button"
                              className={
                                subSelectedTab === "Misc"
                                  ? "nav-link active"
                                  : "nav-link"
                              }
                              style={{ width: "140px" }}
                              data-bs-toggle="tab"
                              role="tab"
                              aria-controls="ex1-tabs-2"
                              aria-selected={
                                subSelectedTab === "Misc" ? "true" : "false"
                              }
                            >
                              Misc
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}

                    <div class="tab-content" id="ex1-content">
                      <div class="row">
                        <div class="row mt-2 d-flex justify-content-end float-end">
                          <div class="col-2">
                            <button
                              class="btn btn-primary mb-4"
                              type="submit"
                              style={{
                                width: "150px",
                                display: location?.state?.view
                                  ? "none"
                                  : "block",
                              }}
                              onClick={() => handleSubmit(false)} // False means editable
                              disabled={
                                viewPage
                                  ? true
                                  : location?.state?.approved
                                    ? true
                                    : false
                              }
                            >
                              Save As Draft
                            </button>
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
                              onClick={() => handleSubmit(true)} // True means non-editable
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
                        </div>

                        {/* {selectedTab === "Correspondence" && (
                          <div class="col-2">
                            {filesData?.sections.length > 0 && (
                              <div>
                                <label
                                  for="formFile"
                                  class="form-label mt-3 mb-0"
                                >
                                  Attached Files
                                </label>
                                {filesData?.sections &&
                                  correspondancestore?.length > 0 &&
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
                                              hendleRemoveImage(file?.id)
                                            }
                                          >
                                            x
                                          </a>
                                          <a
                                            href={
                                              file?.id
                                                ? `http://172.16.170.8:5252${file?.fileName}`
                                                : URL.createObjectURL(file)
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                          >
                                            {file?.id
                                              ? file?.fileName?.split("/").pop()
                                              : file.name}
                                          </a>
                                        </div>
                                      );
                                    }
                                  )}
                              </div>
                            )}
                          </div>
                        )} */}

                        <div class="col">
                          {
                            selectedTab === "Noting" ? (
                              // Render content for the 'Noting' tab
                              <section class="mb-5">
                                <label for="formFile" class="form-label mt-3">
                                  Description
                                </label>

                                <TinyEditor
                                  initialContent={""}
                                  disabled={
                                    viewPage
                                      ? true
                                      : filesData?.isEditable
                                        ? true
                                        : false
                                  }
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
                            ) : null
                            // : selectedTab === "Correspondence" ? (
                            // <section>
                            //   <label for="formFile" class="form-label mt-3">
                            //     Description
                            //   </label>

                            //   <TinyEditor
                            //     initialContent={""}
                            //     disabled={
                            //       viewPage
                            //         ? true
                            //         : filesData?.isEditable
                            //           ? filesData?.isEditable
                            //           : false
                            //     }
                            //     setEditorContent={(content) =>
                            //       setCorrespondenceData((prev) => ({
                            //         ...prev,
                            //         description: content,
                            //       }))
                            //     }
                            //     editorContent={correspondenceData.description}
                            //     multiLanguage={false}
                            //     // disabled={location.state?.view ? true : false}
                            //   />
                            //   <div class="row">
                            //     <div class="col">
                            //       <div class="mb-3 mt-5">
                            //         <div class="form-group">
                            //           <div class="row">
                            //             <label
                            //               for="formFile"
                            //               class="form-label mt-3"
                            //             >
                            //               Attach File
                            //             </label>
                            //             <div class="col-6">
                            //               <input
                            //                 ref={fileInputRef}
                            //                 className="form-control"
                            //                 type="file"
                            //                 accept=".pdf, .jpg, .jpeg, .png"
                            //                 id="correspondance"
                            //                 name="correspondance"
                            //                 multiple
                            //                 onChange={(event) =>
                            //                   handleFileChangeCorrespondance(
                            //                     event
                            //                   )
                            //                 }
                            //                 // disabled={location.state?.view ? true : false}
                            //               />
                            //             </div>
                            //           </div>
                            //         </div>
                            //       </div>
                            //     </div>
                            //   </div>
                            // </section>
                            // ) }
                          }
                          <div className="row">
                            {subSelectedTab === "FR" &&
                            selectedTab === "Correspondence" ? (
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
                            ) : subSelectedTab === "Sanction" &&
                              selectedTab === "Correspondence" ? (
                              <>
                                {location?.state && location?.state?.view ? (
                                  <section>
                                    <ImageGallery
                                      style={{ maxHeight: "calc(100vh 0px)" }}
                                      items={SanactionImages}
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
                                ) : (
                                  <div class="col-2">
                                    {filesData?.sections.length > 0 && (
                                      <div>
                                        <label
                                          for="formFile"
                                          class="form-label mt-3 mb-0"
                                        >
                                          Sanction Files
                                        </label>
                                        {filesData &&
                                          filesData?.sections &&
                                          sectionstore?.length > 0 &&
                                          sectionstore[0]?.caseAttachments.map(
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
                                      </div>
                                    )}
                                  </div>
                                )}
                                <div className="col">
                                  <section>
                                    <label
                                      for="formFile"
                                      class="form-label mt-3"
                                    >
                                      Description
                                    </label>

                                    <TinyEditor
                                      initialContent={""}
                                      disabled={
                                        viewPage
                                          ? true
                                          : filesData?.isEditable
                                            ? filesData?.isEditable
                                            : false
                                      }
                                      setEditorContent={(content) =>
                                        setSanction((prev) => ({
                                          ...prev,
                                          description: content,
                                        }))
                                      }
                                      editorContent={sanction.description}
                                      multiLanguage={false}
                                      // disabled={location.state?.view ? true : false}
                                    />
                                    <div
                                      class="row"
                                      style={{
                                        display: location?.state?.view
                                          ? "none"
                                          : "block",
                                      }}
                                    >
                                      <div class="col">
                                        <div class="mb-3 mt-5">
                                          <div class="form-group">
                                            <div
                                              class="row"
                                              style={{
                                                display: location?.state?.view
                                                  ? "none"
                                                  : "block",
                                              }}
                                            >
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
                                                  id="sanction"
                                                  name="sanction"
                                                  multiple
                                                  onChange={(event) =>
                                                    handleFileChangeSanction(
                                                      event
                                                    )
                                                  }
                                                  // disabled={location.state?.view ? true : false}
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </section>
                                </div>
                              </>
                            ) : subSelectedTab === "Objection" &&
                              selectedTab === "Correspondence" ? (
                              <>
                                {location?.state?.view ? (
                                  <section>
                                    <ImageGallery
                                      style={{ maxHeight: "calc(100vh 0px)" }}
                                      items={ObjectionImages}
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
                                ) : (
                                  <div class="col-2">
                                    {filesData?.sections.length > 0 && (
                                      <div>
                                        <label
                                          for="formFile"
                                          class="form-label mt-3 mb-0"
                                        >
                                          Objection Files
                                        </label>
                                        {filesData &&
                                          filesData?.sections &&
                                          objectionstore?.length > 0 &&
                                          objectionstore[0]?.caseAttachments.map(
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
                                      </div>
                                    )}
                                  </div>
                                )}

                                <div className="col">
                                  <section>
                                    <label
                                      for="formFile"
                                      class="form-label mt-3"
                                    >
                                      Description
                                    </label>

                                    <TinyEditor
                                      initialContent={""}
                                      disabled={
                                        viewPage
                                          ? true
                                          : filesData?.isEditable
                                            ? filesData?.isEditable
                                            : false
                                      }
                                      setEditorContent={(content) =>
                                        setObjection((prev) => ({
                                          ...prev,
                                          description: content,
                                        }))
                                      }
                                      editorContent={objection?.description}
                                      multiLanguage={false}
                                      // disabled={location.state?.view ? true : false}
                                    />
                                    <div class="row">
                                      <div class="col">
                                        <div class="mb-3 mt-5">
                                          <div class="form-group">
                                            <div
                                              class="row"
                                              style={{
                                                display: location?.state?.view
                                                  ? "none"
                                                  : "block",
                                              }}
                                            >
                                              <label
                                                for="formFile"
                                                className="form-label mt-3"
                                              >
                                                Attach File
                                              </label>
                                              <div class="col-6">
                                                <input
                                                  ref={fileInputRef}
                                                  className="form-control"
                                                  type="file"
                                                  accept=".pdf, .jpg, .jpeg, .png"
                                                  id="objection"
                                                  name="objection"
                                                  multiple
                                                  onChange={(event) =>
                                                    handleFileChangeObjection(
                                                      event
                                                    )
                                                  }
                                                  // disabled={location.state?.view ? true : false}
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </section>
                                </div>
                              </>
                            ) : subSelectedTab === "Letter" &&
                              selectedTab === "Correspondence" ? (
                              <>
                                {location?.state?.view ? (
                                  <section>
                                    <ImageGallery
                                      style={{ maxHeight: "calc(100vh 0px)" }}
                                      items={LetterImages}
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
                                ) : (
                                  <div class="col-2">
                                    {filesData?.sections.length > 0 && (
                                      <div>
                                        <label
                                          for="formFile"
                                          class="form-label mt-3 mb-0"
                                        >
                                          Letter Files
                                        </label>
                                        {filesData &&
                                          filesData?.sections &&
                                          letterstore?.length > 0 &&
                                          letterstore[0]?.caseAttachments.map(
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
                                      </div>
                                    )}
                                  </div>
                                )}

                                <div className="col">
                                  <section>
                                    <label
                                      for="formFile"
                                      class="form-label mt-3"
                                    >
                                      Description
                                    </label>

                                    <TinyEditor
                                      initialContent={""}
                                      disabled={
                                        viewPage
                                          ? true
                                          : filesData?.isEditable
                                            ? filesData?.isEditable
                                            : false
                                      }
                                      setEditorContent={(content) =>
                                        setLetter((prev) => ({
                                          ...prev,
                                          description: content,
                                        }))
                                      }
                                      editorContent={letter.description}
                                      multiLanguage={false}
                                      // disabled={location.state?.view ? true : false}
                                    />
                                    <div class="row">
                                      <div class="col">
                                        <div class="mb-3 mt-5">
                                          <div class="form-group">
                                            <div
                                              class="row"
                                              style={{
                                                display: location?.state?.view
                                                  ? "none"
                                                  : "block",
                                              }}
                                            >
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
                                                  id="letter"
                                                  name="letter"
                                                  multiple
                                                  onChange={(event) =>
                                                    handleFileChangeLetter(
                                                      event
                                                    )
                                                  }
                                                  // disabled={location.state?.view ? true : false}
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </section>
                                </div>
                              </>
                            ) : subSelectedTab === "Circular" &&
                              selectedTab === "Correspondence" ? (
                              <>
                                {location?.state?.view ? (
                                  <section>
                                    <ImageGallery
                                      style={{ maxHeight: "calc(100vh 0px)" }}
                                      items={CircularImages}
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
                                ) : (
                                  <div class="col-2">
                                    {filesData?.sections.length > 0 && (
                                      <div>
                                        <label
                                          for="formFile"
                                          class="form-label mt-3 mb-0"
                                        >
                                          Circular Files
                                        </label>
                                        {filesData &&
                                          filesData?.sections &&
                                          circularStore?.length > 0 &&
                                          circularStore[0]?.caseAttachments.map(
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
                                      </div>
                                    )}
                                  </div>
                                )}

                                <div className="col">
                                  <section>
                                    <label
                                      for="formFile"
                                      class="form-label mt-3"
                                    >
                                      Description
                                    </label>

                                    <TinyEditor
                                      initialContent={""}
                                      disabled={
                                        viewPage
                                          ? true
                                          : filesData?.isEditable
                                            ? filesData?.isEditable
                                            : false
                                      }
                                      setEditorContent={(content) =>
                                        setCircular((prev) => ({
                                          ...prev,
                                          description: content,
                                        }))
                                      }
                                      editorContent={circular.description}
                                      multiLanguage={false}
                                      // disabled={location.state?.view ? true : false}
                                    />
                                    <div class="row">
                                      <div class="col">
                                        <div class="mb-3 mt-5">
                                          <div class="form-group">
                                            <div
                                              class="row"
                                              style={{
                                                display: location?.state?.view
                                                  ? "none"
                                                  : "block",
                                              }}
                                            >
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
                                                  id="Circular"
                                                  name="Circular"
                                                  multiple
                                                  onChange={(event) =>
                                                    handleFileChangeCircular(
                                                      event
                                                    )
                                                  }
                                                  // disabled={location.state?.view ? true : false}
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </section>
                                </div>
                              </>
                            ) : subSelectedTab === "Misc" &&
                              selectedTab === "Correspondence" ? (
                              <>
                                {location?.state?.view ? (
                                  <section>
                                    <ImageGallery
                                      style={{ maxHeight: "calc(100vh 0px)" }}
                                      items={MiscImages}
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
                                ) : (
                                  <div class="col-2">
                                    {filesData?.sections.length > 0 && (
                                      <div>
                                        <label
                                          for="formFile"
                                          class="form-label mt-3 mb-0"
                                        >
                                          Misc Files
                                        </label>
                                        {filesData?.sections &&
                                          miscStore?.length > 0 &&
                                          miscStore[0]?.caseAttachments.map(
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
                                      </div>
                                    )}
                                  </div>
                                )}

                                <div className="col">
                                  <section>
                                    <label
                                      for="formFile"
                                      class="form-label mt-3"
                                    >
                                      Description
                                    </label>

                                    <TinyEditor
                                      initialContent={""}
                                      disabled={
                                        viewPage
                                          ? true
                                          : filesData?.isEditable
                                            ? filesData?.isEditable
                                            : false
                                      }
                                      setEditorContent={(content) =>
                                        setMisc((prev) => ({
                                          ...prev,
                                          description: content,
                                        }))
                                      }
                                      editorContent={misc.description}
                                      multiLanguage={false}
                                      // disabled={location.state?.view ? true : false}
                                    />
                                    <div class="row">
                                      <div class="col">
                                        <div class="mb-3 mt-5">
                                          <div class="form-group">
                                            <div
                                              class="row"
                                              style={{
                                                display: location?.state?.view
                                                  ? "none"
                                                  : "block",
                                              }}
                                            >
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
                                                  id="Misc"
                                                  name="Misc"
                                                  multiple
                                                  onChange={(event) =>
                                                    handleFileChangeMisc(event)
                                                  }
                                                  // disabled={location.state?.view ? true : false}
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </section>
                                </div>
                              </>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row mt-4">
                    <div class="col-8">
                      <label
                        class="form-label"
                        style={{ display: "block", fontWeight: "bold" }}
                      >
                        Signatures
                      </label>
                    </div>
                  </div>

                  <div className="row" style={{ textAlign: 'center' }}>
                    {filesData?.digitalSignature?.map((item, index) => (
                      <div
                        key={index}
                        style={{
                          width: "200px",
                          height: "200px",
                          marginRight: "10px",
                          marginTop: 30,
                        }}
                      >
                        <img
                          src={`http://10.10.140.200:5152${item?.signature}`}
                          alt="Uploaded Signature"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                          }}
                        />
                        <span
                          style={{ fontSize: "14px" }}
                        >{`${item?.users?.employee?.firstName}  ${item?.users?.employee?.lastName} / ${item?.users?.employee?.designations?.designationName}`}</span>
                      </div>
                    ))}
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
                                  style={{ fontSize: "18px", color: item?.submittedUser?.employee?.userType === "Officer" ? "green" : item?.submittedUser?.employee?.userType === "Section" ? "blue" : "black" }}
                                >
                                  {item?.CommentStatus
                                    ? item?.CommentStatus
                                    : item?.comment}
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
