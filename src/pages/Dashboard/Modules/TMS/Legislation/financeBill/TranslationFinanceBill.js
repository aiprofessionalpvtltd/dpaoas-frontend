import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  QMSSideBarItems,
  TMSsidebarItems,
  TMSsidebarItemsDirector,
} from "../../../../../../utils/sideBarItems";
import { Layout } from "../../../../../../components/Layout";
import Header from "../../../../../../components/Header";
import { useNavigate, useLocation } from "react-router";
import { ToastContainer } from "react-toastify";
import { imagesUrl } from "../../../../../../api/APIs";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Button, Modal, Spinner } from "react-bootstrap";
import CKEditorComp from "../../../../../../components/CustomComponents/Editor/CKEditorComp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  GetAlLMarkTo,
  getFinanceMoneyBillById,
  getGovintroduceInSenateById,
  getQuestionRemarksByID,
  submitQuestion,
} from "../../../../../../api/APIs/Services/translation.service";
import {
  showSuccessMessage,
  showErrorMessage,
} from "../../../../../../utils/ToastAlert";
import moment from "moment";
import { getUserData } from "../../../../../../api/Auth";
import { UpdateQuestionById } from "../../../../../../api/APIs/Services/Question.service";
import {
  getResolutionRemarksByID,
  submitAssiginResolution,
  UpdateResolution,
} from "../../../../../../api/APIs/Services/Resolution.service";
import { UpdateFinanceMoneyBill, UpdateNABill } from "../../../../../../api/APIs/Services/LegislationModule.service";

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

function TranslationFinanceBill() {
  const navigate = useNavigate();
  const userData = getUserData();
  const userId = userData?.fkUserId;
  const location = useLocation();

  const fkResolutionID = location?.state?.id;
  const fkNewResolutionId = location?.state?.id;
  const [markToData, setMarkToData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resolutionData, setresolutionData] = useState(location.state);
  const [singleResolutionRemarks, setSingleResolutionRemarks] = useState([]);
  const [billType, setBillType] = useState("");
  const [file, setFile] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInputValue, setModalInputValue] = useState({
    assignedTo: "",
    CommentStatus: "",
    comment: "",
  });

  const updateQuestion = async () => {
    const formData = new FormData();
    formData.append("billCategory", "Government Bill")
          formData.append("billFrom", "From NA")
    formData.append("documentType", billType);
    if (file) {
      file.forEach((file) => {
        formData.append("file", file);
      });
    }
    try {
      const response = await UpdateFinanceMoneyBill(fkResolutionID, formData);
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

  const images =
    location?.state?.billDocuments?.map((item) => {
      const parsedItem = JSON.parse(item?.file[0]);
      const fileUrl = `${imagesUrl}${parsedItem?.path}`;
      console.log("fileUrl", fileUrl, parsedItem);
      const isPdf = parsedItem?.path?.toLowerCase().endsWith(".pdf");
      return {
        original: fileUrl,
        thumbnail: fileUrl,
        documentType: item.documentType,
        isPdf: isPdf, // Custom property to identify PDFs
      };
    }) || [];

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

  const formattedDate = moment(
    resolutionData?.noticeDiary?.noticeOfficeDiaryDate
  ).format("DD/MM/YYYY");
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

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setModalInputValue({
      assignedTo: "",
      CommentStatus: "",
      priority: "",
      comment: "",
    });

    if (isModalOpen) {
      onSubmit(modalInputValue);
    }
  };

  const onSubmit = async ({
    assignedTo,
    CommentStatus,
    priority,
    comment,
  }) => {
    // const userId = userData?.fkUserId;
    const category = "FinanceGovernmentBill_FromNA";
    const payload = {
        fkFinanceMoneyBillId: fkResolutionID,
      assignedTo: assignedTo,
      // CommentStatus: CommentStatus,
      comment: comment ? comment : CommentStatus,
      priority: priority,
      category: category,
    };
    try {
      const response = await submitAssiginResolution(payload, userId);
      if (response) {
        showSuccessMessage(response?.message);
        setTimeout(() => {
            if (userData?.designation?.designationName === "Assistant Director") {
                navigate("/tms/finance-bill");
              } else {
                navigate("/tms/finance-bill/assigined-list");
              }
        }, 1000);
      }
    } catch (error) {
      console.error("Error submitting question:", error);
    }
  };

  // getGovIntroduseSenateBillRemarksByIDs

  const getGovIntroduseSenateBillRemarksByIDs = async () => {
    const category = "FinanceGovernmentBill_FromNA";
    try {
      const response = await getFinanceMoneyBillById(
        fkNewResolutionId,
        userId,
        category
      );
      if (response?.success) {
        setSingleResolutionRemarks(response?.data[0]?.comment);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMarkTo();
    if (fkNewResolutionId) {
      getGovIntroduseSenateBillRemarksByIDs();
    }
  }, []);
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

      <div className="d-flex row align-items-center justify-content-between">
        <div className="col-md-12">
          <div className="bg-white p-3 border rounded">
            <div className="row">
              <div className="col-4 d-flex">
                <div className="fw-bold me-1">File Number:</div>
                <div className="text-primary">{resolutionData?.fileNumber}</div>
              </div>
              <div className="col-4 d-flex">
                <div className="fw-bold me-1">Bill Title:</div>
                <div className="text-primary">{resolutionData?.billTitle}</div>
              </div>
              <div className="col-4 d-flex">
                <div className="fw-bold me-1">Notice Date:</div>
                <div className="text-primary">{formattedDate}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-8">
          <div style={{ marginBottom: "20px", marginTop: "20px" }}>
            English Version
          </div>
          <section>
            {images?.map((item, index) =>
                item.isPdf ? (
                  <div key={index}>
                    <h5 style={{ marginTop: "10px" }}>{item.documentType}</h5>
                    <PdfPreview pdfUrl={item.original} />
                  </div>
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

          <div className="row">
            <div style={{ marginBottom: "20px", marginTop: "20px" }}>
              Urdu Version
            </div>
            <div className="form-group col-4">
              <label htmlFor="billType" className="form-label">
                Document Type
              </label>
              <select
                id="documentType"
                name="documentType"
                className="form-select"
                onChange={(e) => setBillType(e.target?.value)}
                value={billType}
              >
                <option value="" disabled hidden>
                  Select
                </option>
                <option value="Urdu Translation">Urdu Translation</option>
                <option value="English Translation">English Translation</option>
              </select>
            </div>

            <div className="form-group col-4">
              <label htmlFor="fileInput" className="form-label">
                Choose File
              </label>
              <input
                className="form-control"
                type="file"
                accept=".pdf, .jpg, .jpeg, .png"
                id="file"
                name="file"
                multiple
                onChange={(event) => {
                  setFile(event.currentTarget.files);
                }}
              />
            </div>
          </div>

          {/* <div>
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
          </div> */}
          <div
            class="d-grid gap-2 d-md-flex"
            style={{ marginTop: 30, marginBottom: 40 }}
          >
            <button
              class="btn btn-primary"
              type="submit"
              onClick={updateQuestion}
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
              {singleResolutionRemarks?.length > 0 ? (
                singleResolutionRemarks.map((item) => (
                  <>
                    {(item?.CommentStatus !== null ||
                      item?.comment !== null) && (
                      <div
                        class="d-flex flex-row p-3 ps-3"
                        style={{ borderBottom: "1px solid #ddd" }}
                      >
                        <>
                          <div class="w-100" style={{ position: "relative" }}>
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

export default TranslationFinanceBill;

