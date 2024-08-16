import { Modal } from "react-bootstrap";
import { imagesUrl } from "../../api/APIs";
import React from "react";

function BillAttachedDocsModal({ showModal, closeModal, AttachDocsData }) {
  console.log("AttachDocsData", AttachDocsData);
  return (
    <>
      <Modal show={showModal} onHide={closeModal} size="lg" centered>
        <div>
          <Modal.Header closeButton>
            <Modal.Title>Attached Documents</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ padding: 20 }}>
            {AttachDocsData && AttachDocsData.length > 0 ? (
              AttachDocsData.map((item, index) => (
                <React.Fragment key={index}>
                  <h6 style={{ marginTop: "10px" }}>{item?.documentType}</h6>
                  <ul className="list-group">
                    {item?.file?.map((fileItem, fileIndex) => {
                      // Parse the JSON string to extract the path
                      const fileData = JSON.parse(fileItem);
                      const fileName = fileData.path
                        .split("\\")
                        .pop()
                        .split("/")
                        .pop();

                      return (
                        <li className="list-group-item" key={fileIndex}>
                          <a
                            href={`${imagesUrl}${fileData.path}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "blue", cursor: "pointer" }}
                          >
                            {fileName}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </React.Fragment>
              ))
            ) : (
              <ul className="list-group">
                <li className="list-group-item">No data found!</li>
              </ul>
            )}
          </Modal.Body>

          <Modal.Footer>
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => closeModal()}
            >
              Close
            </button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
}

export default BillAttachedDocsModal;
