import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Header from "../../../../../../components/Header";
import { ToastContainer } from "react-toastify";
import moment from "moment";
import { getUserData } from "../../../../../../api/Auth";
import { Layout } from "../../../../../../components/Layout";
import thumbnail from "./../../../../../../assets/profile-img.jpg";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import {
  DeleteNotificationById,
  assiginFR,
  assignFR,
  getFreshReceiptById,
} from "../../../../../../api/APIs/Services/efiling.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";
import { getLLEmployee } from "../../../../../../api/APIs/Services/organizational.service";
import {
  EfilingSideBarBranchItem,
  EfilingSideBarItem,
} from "../../../../../../utils/sideBarItems";
import { Button, Modal, Spinner } from "react-bootstrap";
import { TinyEditor } from "../../../../../../components/CustomComponents/Editor/TinyEditor";
import { imagesUrl } from "../../../../../../api/APIs";
import { Editor } from "../../../../../../components/CustomComponents/Editor";

const EFilingModal = ({ isOpen, toggleModal, title, children }) => {
  return (
    <Modal size="lg" show={isOpen} onHide={toggleModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

function FRDetail() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [employeeData, setEmployeeData] = useState([]);
  const UserData = getUserData();
  const [filesData, setFilesData] = useState(null);
  const [viewPage, setViewPage] = useState(location?.state?.view);
  const [descriptionData, setDescriptionData] = useState("");

  const [receptId, setreceptId] = useState(location?.state?.id);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [remarksData, setRemarksData] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [directorData, setDirectorData] = useState([]);
  const [modalInputValue, setModalInputValue] = useState({
    assignedTo: "",
    CommentStatus: "",
    comment: "",
  });

  const navigate = useNavigate();

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
      // CommentStatus: filesData ? filesData?.fileRemarks[0]?.CommentStatus : "",
      comment: "",
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      hendleassiginFr(values);
    },
  });

  const getFreashRecepitByIdApi = async () => {
    try {
      const response = await getFreshReceiptById(receptId);
      if (response.success) {
        setRemarksData(response?.data?.freshReceipt);
        setDescriptionData(response?.data?.shortDescription)
        setAttachments(response?.data?.freshReceiptsAttachments);
        // showSuccessMessage(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const hendleassiginFr = async (values) => {
    const data = {
      submittedBy: UserData?.fkUserId,
      assignedTo: Number(values?.assignedTo),
      CommentStatus: values?.CommentStatus,
      comment: values?.comment,
    };
    try {
      const response = await assiginFR(receptId, data);
      if (response.success) {
        showSuccessMessage(response.message);
        setTimeout(() => {
          navigate("/efiling/dashboard/fresh-receipt");
        }, 1000);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const getEmployeeData = async () => {
    try {
      const response = await getLLEmployee(UserData?.fkUserId);
      if (response?.success) {
        const filteredData = response?.data?.filter((item) => item?.userName !== UserData?.userName);
        setEmployeeData(filteredData);
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
      console.log("Notification deleted", response?.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    deleteNotification();
    if (receptId) {
      getFreashRecepitByIdApi();
      getEmployeeData();
    }
  }, []);

  const HandlePrint = async (urlimage) => {
    const url = `${imagesUrl}${urlimage}`;
    window.open(url, "_blank");
    // setPdfUrl(url)
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
    const data = {
      submittedBy: UserData?.fkUserId,
      assignedTo: modalInputValue?.assignedTo,
      priority: modalInputValue?.priority,
      CommentStatus: modalInputValue?.CommentStatus,
      comment: modalInputValue?.comment,
    };
    try {
      const response = await assignFR(receptId, data);
      if (response?.success) {
        
        showSuccessMessage(response?.message, true);

        toggleModal();
        getFreashRecepitByIdApi();
        // Clear all fields in modalInputValue
        setModalInputValue({
          assignedTo: "",
          CommentStatus: "",
          priority: "",
          comment: "",
        });
        setTimeout(() => {
          navigate("/efiling/dashboard/fresh-receipt");
        }, 3000);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  // const images =
  //   attachments?.map((item) => ({
  //     original: `${imagesUrl}${item?.filename}`,
  //     thumbnail: `${imagesUrl}${item?.filename}`,
  //   })) || [];

    const images =
    attachments?.map((item) => {
      const fileUrl = `${imagesUrl}${item?.filename}`;
      const isPdf = item?.filename?.toLowerCase().endsWith('.pdf');
  
      return {
        original: fileUrl,
        thumbnail: fileUrl,
        isPdf: isPdf, // Custom property to identify PDFs
      };
    }) || [];

    // Component to render PDF preview
const PdfPreview = ({ pdfUrl }) => {
  return (
    <div style={{ position: 'relative', marginBottom: '20px' }}>
      {loading && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
        }}>
           <Spinner />
        </div>
      )}
      <iframe
        src={pdfUrl}
        width="100%"
        height="600px"
        style={{ border: 'none', display: loading ? 'none' : 'block' }}
        title="PDF Preview"
        onLoad={() => setLoading(false)} // Event listener for when the PDF is fully loaded
      />
    </div>
  );
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
      <ToastContainer />
      {/* <Header
        dashboardLink={"/efiling/dashboard"}
        addLink1={"/efiling/dashboard/fresh-receipt"}
        title1={"Fresh Receipts"}
        addLink2={"/efiling/dashboard/addedit"}
        title2={"FR Detail"}
        width={"500px"}
      /> */}

      <EFilingModal
        title={"Add Comments"}
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
                disabled={viewPage ? true : false}
              >
                <option value="" selected disabled hidden>
                  Select
                </option>
                  <option value={"Please Put Up"}>Please Put Up</option>
                  <option value={"Please Link"}>Please Link</option>
                  <option value={"For Perusal Please"}>For Perusal Please</option>
                  <option value={"Submitted For Approval"}>Submitted For Approval</option>
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
                <option value={""} selected disabled hidden>
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
        {/* <MDBModalFooter>
            <MDBBtn color="secondary" onClick={toggleModal}>
              Close
            </MDBBtn>
            <MDBBtn
              onClick={() => {
                hendleAssiginFileCaseApi();
                toggleModal();
              }}
            >
              Submit
            </MDBBtn>
          </MDBModalFooter> */}
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
          <div className="col-7">
            <section>
            {images.map((item, index) =>
              item.isPdf ? (
                <PdfPreview pdfUrl={item.original} key={index} />
              ) : (
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
              )
              )}
            </section>

            <label className="form-label">F.R Detail</label>
            <Editor
              onChange={(content) =>
                setDescriptionData(content)
              }
              value={descriptionData}
              // width={"100%"}
              display={"flex"}
            />
          </div>

          <div className="col-5" style={{ paddingRight: 0 }}>
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
                <a onClick={toggleModal}>
                  <button class="btn add-btn">
                    <FontAwesomeIcon
                      style={{ marginRight: "-5px" }}
                      // icon={faPlus}
                      size="md"
                      width={24}
                    />{" "}
                    {/* Add your comment */}
                    Proceed
                  </button>
                </a>
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
                            <div class="w-100" style={{ position: "relative" }}>
                              <div class="d-flex justify-content-between align-items-center">
                                <div class="d-flex flex-row align-items-center">
                                  <div style={{ float: "left" }}>
                                    <span
                                      class="mr-2"
                                      style={{ fontSize: "14px" }}
                                    >{`${item?.submittedUser?.employee?.firstName}  ${item?.submittedUser?.employee?.lastName}/ ${item?.submittedUser?.employee?.designations?.designationNam}`}</span>
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
                                    {/* {moment(item?.formattedCreatedAt).format(
                                      "DD/MM/YYYY"
                                    )} */}
                                    {item?.formattedDateCreatedAt}
                                  </small>
                                  <small className="ms-2">
                                    {/* {moment(item?.formattedCreatedAt).format("hh:mm A")} */}
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
      {/* </div> */}
    </Layout>
  );
}

export default FRDetail;
