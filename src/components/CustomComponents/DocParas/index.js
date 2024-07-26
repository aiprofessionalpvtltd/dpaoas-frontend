


import React, { useContext, useEffect, useState } from "react";
import { Box, AccordionDetails } from "@mui/material";
import { Editor } from "../Editor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faEdit,
  faFileExport,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import sanitizeHtml from "sanitize-html";
import { Modal } from "react-bootstrap";
import { getAllCorrespondence } from "../../../api/APIs/Services/efiling.service";
import { getSelectedFileID, getUserData } from "../../../api/Auth";
import { imagesUrl } from "../../../api/APIs";
import { AuthContext } from "../../../api/AuthContext";

const DocParas = ({ tabsData, onEditorChange, onDelete, FR, selectedFileId, hendleDeleteAttach }) => {
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
                  <option value={"A"}>A</option>
                  <option value={"B"}>B</option>
                  <option value={"C"}>C</option>
                  <option value={"D"}>D</option>
                  <option value={"Note"}>Note</option>
                  <option value={"FR"}>FR</option>
                  <option value={"None"}>None</option>
                  <option value={"Blank"}>Blank</option>
                  <option value={"-"}>-</option>
                </select>
              </div>
            </div>

            {FR?.frId && (
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
            )}

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

              {editableIndex !== index ? (
                <>
                  <p
                    style={{
                      width: "100%",
                      flexShrink: 0,
                      color: "text.secondary",
                      marginBottom: 0,
                    }}
                    dangerouslySetInnerHTML={{
                      __html: cleanHtml(tab.description),
                    }}></p>
                  {tab?.references && tab?.references?.length > 0 && (
                    <div
                      className="col"
                      style={{ width: "100%", marginTop: "10px" }}>
                      {tab.references?.map((item, idx) => (
                        <div
                          key={idx}
                          style={{ display: "flex", flexDirection: "column" }}>
                          <label>Flag - {item?.flag}</label>
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
                                {console.log("attach", innerItem?.attachments)}
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
                                    <div style={{marginLeft:"10px", cursor:"pointer"}}>
                                    <FontAwesomeIcon  onClick={() => hendleDeleteAttach(item, innerIdx)} color={"red"} icon={faXmark}/>

                                    </div>

                                  </div>
                                  </li>
                                  </>
                                ))}
                              </React.Fragment>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <AccordionDetails
                  sx={{
                    padding: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    mt: 1,
                  }}>
                  <Editor
                    onChange={(content) =>
                      setNotingData({ description: content })
                    }
                    value={notingData.description}
                    width={"100%"}
                    display={"flex"}
                  />
                </AccordionDetails>
              )}
            </Box>
          </Box>
        ))}
    </>
  );
};

export default DocParas;
