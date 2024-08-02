


import React, { useContext, useEffect, useState } from "react";
import { Box, AccordionDetails } from "@mui/material";
import { Editor } from "../Editor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faClipboard,
  faEdit,
  faFileExport,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import sanitizeHtml from "sanitize-html";
import { Modal } from "react-bootstrap";
import { getAllBranchFlagsApi, getAllCorrespondence } from "../../../api/APIs/Services/efiling.service";
import { getSelectedFileID, getUserData } from "../../../api/Auth";
import { imagesUrl } from "../../../api/APIs";
import { AuthContext } from "../../../api/AuthContext";
import CKEditorComp from "../Editor/CKEditorComp";
import { showErrorMessage, showSuccessMessage } from "../../../utils/ToastAlert";


const DocParas = ({ tabsData, onEditorChange, onDelete, FR, selectedFileId, hendleDeleteAttach, handleFlagDelete, disabled }) => {
  const UserData = getUserData();
  const { fildetailsAqain } = useContext(AuthContext)
  const [correspondenceTypesData, setCorrespondenceTypesData] = useState([]);
  const [editableIndex, setEditableIndex] = useState(null);
  const [notingData, setNotingData] = useState({
    description: "",
    references: [],
  });
  const [showModal, setShowModal] = useState(false);
  const [showImgModal, setShowImgModal] = useState(false);
  const [showModalIndex, setShowModalIndex] = useState("");
  const [pdfview, setPdfView] = useState(null)
  const [referenceFlag, setReferenceFlag] = useState("");
  const [referenceAttachment, setReferenceAttachment] = useState(null);
  const [frAttachment, setFrAttachment] = useState(null);
  const userData = getUserData();
  const [flagsData, setFlagsData] = useState([]);

  const handleEditToggle = (index, edited) => {
    const selectedAttachment = correspondenceTypesData.find(
      (item) => item.id === Number(referenceAttachment)
    );

    const ref = {
      flag: referenceFlag,
      id: frAttachment ? frAttachment : referenceAttachment,
      attachments: frAttachment ? FR?.freshReceiptsAttachments : selectedAttachment ? [selectedAttachment] : [],
    };

    if (edited && ref?.id) {
      onEditorChange(index, notingData.description, ref, true);
      setEditableIndex(null); // Reset editable index after saving
      setReferenceFlag("");
      setReferenceAttachment(null);
      setFrAttachment(null);
    } else if (edited) {
      onEditorChange(index, notingData.description, ref);
      setEditableIndex(null); // Reset editable index after saving
    } else {
      setNotingData({ description: tabsData[index].description });
      setEditableIndex(index);
    }
  };

  const cleanHtml = (html) => {
    return sanitizeHtml(html, {
      allowedTags: ["b", "i", "em", "strong", "a"], // Adjust based on your needs
      allowedAttributes: {
        a: ["href"],
      },
    });
  };

  const transformData = (apiData) => {
    return apiData?.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      attachments: item.correspondenceAttachments,
    }));
  };

  const handleCorrespondences = async () => {
    const fileId = getSelectedFileID();

    try {
      const response = await getAllCorrespondence(
        selectedFileId ? selectedFileId : fileId?.value,
        UserData?.fkBranchId,
        0,
        1000
      );
      if (response?.success) {
        const transformedData = transformData(response.data?.correspondences);
        setCorrespondenceTypesData(transformedData);
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    handleCorrespondences();
  }, [fildetailsAqain, selectedFileId]);

  const HandlePrint = async (urlimage) => {
    const url = `${imagesUrl}${urlimage}`;
    setPdfView(url)
    if (imagesUrl) {
      setShowImgModal(true)
    }
  };

  const getFileName = (filePath) => {
    return filePath.split("/").pop();
  };

// Function to copy text to clipboard
const copyToClipboard = (text) => {
  if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(
      () => {
        showSuccessMessage('Link copied to clipboard!');
      },
      (err) => {
        console.error('Failed to copy text: ', err);
      }
    );
  } else {
    // Fallback to execCommand if clipboard API is not supported
    fallbackCopyToClipboard(text);
  }
};

// Fallback method using document.execCommand('copy')
const fallbackCopyToClipboard = (text) => {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  // Position the textarea off-screen
  textarea.style.position = 'fixed';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  textarea.select();
  
  try {
    const successful = document.execCommand('copy');
    const msg = successful ? 'Link copied to clipboard!' : 'Failed to copy text!';
    showSuccessMessage(msg);
  } catch (err) {
    console.error('Fallback: Unable to copy', err);
  }

  document.body.removeChild(textarea);
};

  const transformFilesHeadingdata = (apiData) => {
    return apiData.map((item) => ({
      SrNo: item?.id,
      flag: item?.flag,
      branch: item?.branches?.branchName,
    }));
  };

  const getBranchFlags = async () => {
    try {
      const response = await getAllBranchFlagsApi(
        userData?.fkBranchId,
        0,
        100
      );
      if (response.success) {
        //   showSuccessMessage(response?.message)
        const transformedData = transformFilesHeadingdata(
          response?.data
        );
        setFlagsData(transformedData);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  }

  useEffect(() => {
    getBranchFlags();
  }, [])

  return (
    <>
      <Modal
        show={showModal}
        size="lg"
        onHide={() => setShowModal(false)}
        centered>
        <div>
          <Modal.Header closeButton>
            <Modal.Title>Assign Flag</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row mb-3">
              <div className="col">
                <label className="form-label">Flag</label>
                <select
                  className="form-select"
                  id="flag"
                  name="flag"
                  onChange={(e) => setReferenceFlag(e.target.value)}
                  value={referenceFlag}>
                  <option value="" selected disabled hidden>
                    Select
                  </option>
                  {flagsData && flagsData?.length > 0 && flagsData.map((item) => (
                    <option value={item?.flag}>{item?.flag}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* {FR?.frId && (
              <div className="row mb-3">
                <div className="col">
                  <label className="form-label">Attach FR</label>
                  <select
                    className="form-select"
                    id="attachment"
                    name="attachment"
                    onChange={(e) => setFrAttachment(e.target.value)}
                    value={frAttachment}
                  >
                    <option value="" selected disabled hidden>
                      Select
                    </option>
                    <option key={FR?.frId} value={FR?.frId}>
                      {FR?.frSubject}
                    </option>
                  </select>
                </div>
              </div>
            )} */}

            <div className="row mb-3">
              <div className="col">
                <label className="form-label">Attachment</label>
                <select
                  className="form-select"
                  id="attachment"
                  name="attachment"
                  onChange={(e) => setReferenceAttachment(e.target.value)}
                  value={referenceAttachment}
                  disabled={frAttachment ? true : false}>
                  <option value="" selected disabled hidden>
                    Select
                  </option>
                  {correspondenceTypesData &&
                    correspondenceTypesData.length > 0 &&
                    correspondenceTypesData.map((item) => (
                      <option key={item.id} value={item.id}>
                        {`${item?.name} (${item.description})`}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <button
              className="btn btn-primary"
              type="submit"
              onClick={() => {
                handleEditToggle(showModalIndex, true);
                setShowModal(false);
              }}>
              Submit
            </button>
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => setShowModal(false)}>
              Close
            </button>
          </Modal.Footer>
        </div>
      </Modal>
      <Modal
        show={showImgModal}
        size="xl"
        onHide={() => setShowImgModal(false)}
        centered
      >
        <div><iframe title="PDF Viewer" src={pdfview} width="100%" height="700px" /></div>
      </Modal>
      {tabsData &&
        tabsData.length > 0 &&
        tabsData.map((tab, index) => (
          <Box
            key={index}
            sx={{
              height: "auto",
            }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: editableIndex !== index ? 2 : 6,
              }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}>
                <label
                  style={{
                    width: "100%",
                    fontWeight: "bold",
                    fontSize: "16px",
                    marginTop: "8px",
                  }}>
                  {tab.title}
                </label>
                {/* {tab.createdBy === UserData?.fkUserId && (
                {editableIndex !== index ? (
                
                  <>
                    <button
                      onClick={() => {
                        setShowModalIndex(index);
                        setShowModal(true);
                      }}
                      className="btn-xs black circle-btn"
                      style={{
                        color: "black",
                      }}
                    >
                      <FontAwesomeIcon icon={faFileExport} />
                    </button>
                    <button
                      onClick={() => onDelete(index)}
                      className="btn-xs red circle-btn"
                      style={{
                        color: "red",
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <button
                      onClick={() => handleEditToggle(index, false)}
                      className="btn-xs green circle-btn"
                      style={{
                        color: "#2dce89",
                      }}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEditToggle(index, true)}
                      className="btn-xs green circle-btn"
                      style={{
                        color: "#2dce89",
                      }}
                    >
                      <FontAwesomeIcon icon={faCheckCircle} />
                    </button>
                  </>
                )}
              )} */}
                {tab.createdBy === UserData?.fkUserId && (
                  editableIndex !== index ? (
                    <>
                      {!disabled && (
                        <>
                      <button
                        onClick={() => {
                          setShowModalIndex(index);
                          setShowModal(true);
                        }}
                        className="btn-xs black circle-btn"
                        style={{
                          color: "black",
                        }}
                      >
                        <FontAwesomeIcon icon={faFileExport} />
                      </button>
                      <button
                        onClick={() => onDelete(tab, index)}
                        className="btn-xs red circle-btn"
                        style={{
                          color: "red",
                        }}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                      <button
                        onClick={() => handleEditToggle(index, false)}
                        className="btn-xs green circle-btn"
                        style={{
                          color: "#2dce89",
                        }}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      </>
                      )}
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditToggle(index, true)}
                        className="btn-xs green circle-btn"
                        style={{
                          color: "#2dce89",
                        }}
                      >
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </button>
                    </>
                  )
                )}

              </div>

              <div
                  style={{
                    padding: 0,
                    display: "block",
                    width: "100%",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "5px",
                  }}>
                    <CKEditorComp onChange={(data) => setNotingData({ description: data })} value={tab.description} disabled={editableIndex !== index ? true : false} />
                </div>
                  {tab?.references && tab?.references?.length > 0 && (
                    <div
                      className="col"
                      style={{ width: "100%", marginTop: "10px" }}>
                      {tab.references?.map((item, idx) => (
                        <div
                          key={idx}
                          style={{ display: "flex", flexDirection: "column" }}>
                          <div style={{ display: "flex", flexDirection: "row" }}>
                          <label>Flag - {item?.flag}</label>
                          <div
                            style={{ marginLeft: "20px", color: "red", cursor: "pointer" }}
                          >
                            <FontAwesomeIcon icon={faXmark} onClick={() => handleFlagDelete(index, idx)} />
                          </div>
                          </div>
                          {/* <label>Attachments: </label> */}
                          <ul style={{ marginBottom: 0 }}>
                            {item?.attachments?.map((innerItem, innerIdx) => (
                              <React.Fragment key={innerIdx}>
                                {innerItem?.filename && (
                                  <li>
                                    <p
                                      onClick={() =>
                                        HandlePrint(innerItem?.filename)
                                      }
                                      style={{
                                        color: "blue",
                                        cursor: "pointer",
                                      }}>
                                      {`${getFileName(innerItem?.filename)}`}
                                    </p>
                                  </li>
                                )}
                                {innerItem?.attachments?.map((nestedItem, nestedItemIdx) => (
                                  <>
                                  
                                  <li key={`${innerIdx}-${nestedItemIdx}`}>
                                  <div style={{flexDirection:"row", display:"flex", }}>

                                    <p
                                      onClick={() => HandlePrint(nestedItem?.file)}
                                      style={{ color: "blue", cursor: "pointer" }}
                                    >
                                      {`${innerItem?.name} (${innerItem?.description}) - ${getFileName(nestedItem?.file)}`}
                                    </p>
                                    {/* <div style={{marginLeft:"10px", cursor:"pointer"}}>
                                    <FontAwesomeIcon  onClick={() => hendleDeleteAttach(item, innerIdx)} color={"red"} icon={faXmark}/>

                                    </div> */}
                                    <div
                                      style={{
                                        marginLeft: '10px',
                                        cursor: 'pointer',
                                      }}
                                      onClick={() => copyToClipboard(`${`http://172.16.170.8:3000`}${nestedItem?.file}`)}
                                      title="Copy Link"
                                    >
                                      <FontAwesomeIcon icon={faClipboard} color={"rgb(45, 206, 137)"} />
                                    </div>
                                  </div>
                                  </li>
                                  </>
                                ))}
                              </React.Fragment>
                            ))}
                          </ul>
                          {tab?.createdByUser && (
                            <div style={{display:"flex", alignItems:"flex-end", justifyContent:"flex-end"}}>
                              <div>Created By: <p style={{fontStyle:"italic", textTransform:"capitalize"}}>{tab?.createdByUser && tab?.createdByUser}</p></div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

            </Box>
          </Box>
        ))}
    </>
  );
};

export default DocParas;
