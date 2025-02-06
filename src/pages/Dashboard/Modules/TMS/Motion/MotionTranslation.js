import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  QMSSideBarItems,
  TMSsidebarItems,
  TMSsidebarItemsDirector,
} from "../../../../../utils/sideBarItems";
import { Layout } from "../../../../../components/Layout";
import Header from "../../../../../components/Header";
import { useNavigate, useLocation } from "react-router";
import { ToastContainer } from "react-toastify";
import { imagesUrl } from "../../../../../api/APIs";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Button, Modal, Spinner } from "react-bootstrap";
import CKEditorComp from "../../../../../components/CustomComponents/Editor/CKEditorComp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { getUserData } from "../../../../../api/Auth";
import {
  assignedMotionForTranslation,
  GetAlLMarkTo,
  getMotionRemarksByID,
} from "../../../../../api/APIs/Services/translation.service";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../utils/ToastAlert";
import { updateNewMotion } from "../../../../../api/APIs/Services/Motion.service";

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

function MotionTranslation() {
  const navigate = useNavigate();
  const userData = getUserData();
  const userId = userData?.fkUserId;
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [motionData, setMotionData] = useState(
    location?.state && location?.state
  );
  const [singleMotionRemarks, setSingleMotionRemarks] = useState([]);
  const fkMotionId = motionData ? motionData?.id : null;
  const [englishText, setEnglishText] = useState(motionData?.englishText || "");
  const [urduText, setUrduText] = useState(motionData?.urduText || "");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInputValue, setModalInputValue] = useState({
    assignedTo: "",
    CommentStatus: "",
    comment: "",
  });
  const [markToData, setMarkToData] = useState([]);

  const images =
    location.state?.question?.questionImage?.map((item) => {
      const fileUrl = `${imagesUrl}${item?.path}`;
      const isPdf = item?.path?.toLowerCase().endsWith(".pdf");

      return {
        original: fileUrl,
        thumbnail: fileUrl,
        isPdf: isPdf, // Custom property to identify PDFs
      };
    }) || [];

  const updateMotion = async () => {
    const formData = new FormData();

    formData.append("urduText", urduText);
    formData.append("englishText", englishText);

    try {
      const response = await updateNewMotion(fkMotionId, formData);
      if (response?.success) {
        showSuccessMessage(response?.message);
        // setTimeout(() => {
        //   navigate("/qms/search/question");
        // }, 1000);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const getMarkTo = async () => {
    try {
      const res = await GetAlLMarkTo(userId);
      if (res.success && res.data) {
        setMarkToData(res.data.employees || []);
      } else {
        console.error("Failed to fetch data:", res.message);
        setMarkToData([]);
      }
    } catch (error) {
      console.error("Error fetching MarkTo data:", error);
      setMarkToData([]);
    }
  };

  const getMotionRemarksByIDs = async () => {
    try {
      const response = await getMotionRemarksByID(fkMotionId, userId);
      if (response?.success) {
        setSingleMotionRemarks(response?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMarkTo();
    if (fkMotionId) {
      getMotionRemarksByIDs();
    }
  }, []);

  // Component to render PDF preview
  const PdfPreview = ({ pdfUrl }) => {
    return (
      <div style={{ position: "relative", marginBottom: "20px" }}>
        {loading && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 10,
            }}
          >
            <Spinner />
          </div>
        )}
        <iframe
          src={pdfUrl}
          width="100%"
          height="600px"
          style={{ border: "none", display: loading ? "none" : "block" }}
          title="PDF Preview"
          onLoad={() => setLoading(false)} // Event listener for when the PDF is fully loaded
        />
      </div>
    );
  };

  // Assigned Motion
  const onSubmitMotion = async ({
    assignedTo,
    CommentStatus,
    priority,
    comment,
  }) => {
    const category = "Motion";
    try {
      const response = await assignedMotionForTranslation(
        assignedTo,
        CommentStatus,
        priority,
        comment,
        fkMotionId,
        category,
        userId
      );
      if (response) {
        showSuccessMessage(response?.message);
        setTimeout(() => {
          if (userData?.designation?.designationName === "Assistant Director") {
            navigate("/tms/motion");
          } else {
            navigate("/tms/assigned-motion");
          }
        }, 3000);
      }
    } catch (error) {
      console.error("Error submitting question:", error);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setModalInputValue({
      assignedTo: "",
      CommentStatus: "",
      priority: "",
      comment: "",
    });
    if (isModalOpen) {
      onSubmitMotion(modalInputValue);
    }
  };

  return (
    <Layout
      module={true}
      sidebarItems={
        userData?.designation?.designationName === "Assistant Director"
          ? TMSsidebarItemsDirector
          : TMSsidebarItems
      }
      centerlogohide={true}
    >
      <ToastContainer />
      {/* <Header
        dashboardLink={"/"}
        addLink1={"/qms/notice/notice-question"}
        title1={"Translate Question"}
      /> */}

      <div className="d-flex row align-items-center justify-content-between">
        <div className="col-md-12">
          <div className="bg-white p-3 border rounded">
            <div className="row">
              <div className="col-4 d-flex">
                <div className="fw-bold me-1">Member Name:</div>
                <div className="text-primary">
                  {motionData?.motionMovers?.map(
                    (item) => item?.members?.memberName
                  )}
                </div>
              </div>
              <div className="col-4 d-flex">
                <div className="fw-bold me-1">Office Diary Number:</div>
                <div className="text-primary">
                  {motionData?.noticeOfficeDairies?.noticeOfficeDiaryNo}
                </div>
              </div>
              <div className="col-4 d-flex">
                <div className="fw-bold me-1">Notice Date:</div>
                <div className="text-primary">
                  {motionData?.noticeOfficeDairies?.noticeOfficeDiaryDate
                    ? moment(
                        motionData?.noticeOfficeDairies?.noticeOfficeDiaryDate
                      ).format("DD/MM/YYYY")
                    : ""}
                </div>
              </div>
              <div className="col-4 d-flex">
                <div className="fw-bold me-1">Notice Time:</div>
                <div className="text-primary">
                  {motionData?.noticeOfficeDairies?.noticeOfficeDiaryTime
                    ? moment(
                        motionData?.noticeOfficeDairies?.noticeOfficeDiaryTime
                      ).format("hh:mm a")
                    : ""}
                </div>
              </div>
              <div className="col-4 d-flex">
                <div className="fw-bold me-1">Session:</div>
                <div className="text-primary">
                  {motionData?.sessions?.sessionName}
                </div>
              </div>
              <div className="col-4 d-flex">
                <div className="fw-bold me-1">Motion Type:</div>
                <div className="text-primary">{motionData?.motionType}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-8">
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

          <div>
            <label className="form-label mt-3">English Text</label>
            <CKEditorComp
              onChange={(data) => setEnglishText(data)}
              value={englishText}
            />
          </div>

          <div>
            <label className="form-label mt-3">Urdu Text</label>
            <CKEditorComp
              onChange={(data) => setUrduText(data)}
              value={urduText}
            />
          </div>
          <div
            class="d-grid gap-2 d-md-flex"
            style={{ marginTop: 30, marginBottom: 40 }}
          >
            <button
              class="btn btn-primary"
              type="submit"
              onClick={updateMotion}
            >
              Update
            </button>
          </div>
        </div>

        <div className="col-4 justify-content-end">
          <div
            className="custom-editor-main"
            style={{ marginTop: 0, borderLeft: "1px solid #ddd", padding: 10 }}
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
              {singleMotionRemarks?.length > 0 ? (
                singleMotionRemarks.map((item) => (
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
                                  {moment(item?.createdAt).format("DD/MM/YYYY")}
                                </small>
                                <small className="ms-2">
                                  {moment(item?.createdAt).format("hh:mm a")}
                                </small>
                              </div>
                            </div>
                            <p
                              class="text-justify comment-text mb-0"
                              style={{
                                fontSize: "18px",
                                color:
                                  item?.submittedUser?.employee?.userType ===
                                  "Officer"
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

      <EFilingModal
        title={"Add Comment and Assign"}
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
                <option value="" selected disabled hidden>
                  Select
                </option>
                <option value={"Please Put Up"}>Please Put Up</option>
                <option value={"Please Link"}>Please Link</option>
                <option value={"For Perusal Please"}>For Perusal Please</option>
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
                {markToData?.length > 0 ? (
                  markToData.map((item) => (
                    <option key={item?.fkUserId} value={item?.fkUserId}>
                      {`${item.firstName} ${item.lastName} (${item.designations.designationName})`}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    No Employees Available
                  </option>
                )}
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
              // hendleAssiginFileCaseApi();
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
    </Layout>
  );
}

export default MotionTranslation;
