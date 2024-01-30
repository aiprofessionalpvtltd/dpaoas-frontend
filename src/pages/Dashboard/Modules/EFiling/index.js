import React, { useState } from "react";
import { Layout } from "../../../../components/Layout";
import Header from "../../../../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import thumbnail from "./../../../../assets/profile-img.jpg";
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
import { TinyEditor } from "../../../../components/CustomComponents/Editor/TinyEditor";

  const EFilingModal = ({ isOpen, toggleModal, title, children }) => {
    return (
      <MDBModal open={isOpen} setopen={toggleModal} tabIndex="-1">
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>{title}</MDBModalTitle>
              <MDBBtn className="btn-close" color="none" onClick={toggleModal}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody className="justify-content-center align-items-center">{children}</MDBModalBody>
  
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={toggleModal}>
                Close
              </MDBBtn>
              <MDBBtn>Submit</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    );
  };

function EFilingDashboard() {
    const [editorContent, setEditorContent] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const toggleModal = () => setIsModalOpen(!isModalOpen);

  // use it (editorContent) when submitting whole file content
  console.log("Editor content", editorContent);
  return (
    <Layout centerlogohide={true}>
      <Header
        dashboardLink={"/"}
        addLink1={"/efiling/dashboard"}
        title1={"E-Filing"}
      />

    <EFilingModal title={"Add Remarks"} isOpen={isModalOpen} toggleModal={toggleModal}>
        <label>Remarks</label>
        <textarea style={{ display: "block", width: "100%" }} className="form-control"></textarea>
        <div className="clearfix"></div>
        <label className=" mt-3">Assign</label>
        <select class="form-control">
          <option>Superintendent</option>
          <option>SO</option>
          <option>DG</option>
        </select>
      </EFilingModal>

      <div className="custom-editor">
        <div className="row">
          <div className="col-md-2">
            <div class="noting">
              <p style={{ marginTop: "70px", marginBottom: "0px", fontWeight: "bold" }}>It Directorate</p>
              <p style={{ marginBottom: "0" }}>15-01-2024</p>
              <p>4:03pm</p>
            </div>
          </div>
          <div className="col-md-7 mt-5">
            {/* <QuillEditor onChange={handleProcedureContentChange} /> */}
            <TinyEditor initialContent={"Hello there! Write something new"} setEditorContent={setEditorContent} editorContent={editorContent} />
            <div className="clearfix"></div>
            <div className="m-2 mt-5">
              <div className="row">
                <div className="col">
                  <div class="mt-3">
                    <label class="form-label mt-3">File Number</label>
                    <input class="form-control" type="text" />
                    <div className="clearfix"></div>
                  </div>
                </div>
                <div className="col">
                  <div class="mt-3">
                    <label for="formFile" class="form-label mt-3">
                      Diary Number
                    </label>
                    <input class="form-control" type="text" />
                    <div className="clearfix"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="m-2">
              <div>
                <label for="formFile" class="form-label mt-3">
                  Upload Signature
                </label>
                <input class="form-control" type="file" id="formFile" />
                <div className="clearfix"></div>
              </div>
            </div>
            <div className="m-2">
              <div class="mb-3 mt-3">
                <label for="formFile" class="form-label mt-3">
                  Attach File
                </label>
                <input class="form-control" type="file" id="formFile" />
                <div className="clearfix"></div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="custom-editor-main">
              <div className="comment-heading">
                <h2>Remarks</h2>
                <a onClick={toggleModal}>
                  <button class="btn add-btn">
                    <FontAwesomeIcon style={{ marginRight: "-5px" }} icon={faPlus} size="md" width={24} /> Add
                  </button>
                </a>
              </div>
              <div class="d-flex flex-row p-3">
                <img
                  style={{ marginBottom: "30px", marginRight: "15px" }}
                  src={thumbnail}
                  width="40"
                  height="40"
                  class="rounded-circle mr-3"
                />
                <div class="w-100">
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="d-flex flex-row align-items-center">
                      <span class="mr-2">SO</span>
                      <small style={{ marginLeft: "8px" }} class="c-badge">
                        Top Comment
                      </small>
                    </div>
                    <small>12h ago</small>
                  </div>
                  <p class="text-justify comment-text mb-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam
                  </p>
                </div>
              </div>
              <div class="d-flex flex-row p-3">
                <img
                  style={{ marginBottom: "30px", marginRight: "15px" }}
                  src={thumbnail}
                  width="40"
                  height="40"
                  class="rounded-circle mr-3"
                />
                <div class="w-100">
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="d-flex flex-row align-items-center">
                      <span class="mr-2">Director</span>
                      <small style={{ marginLeft: "8px" }} class="c-badge">
                        Top Comment
                      </small>
                    </div>
                    <small>12h ago</small>
                  </div>
                  <p class="text-justify comment-text mb-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam
                  </p>
                </div>
              </div>
              <div class="d-flex flex-row p-3">
                <img
                  style={{ marginBottom: "30px", marginRight: "15px" }}
                  src={thumbnail}
                  width="40"
                  height="40"
                  class="rounded-circle mr-3"
                />
                <div class="w-100">
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="d-flex flex-row align-items-center">
                      <span class="mr-2">DG</span>
                      <small style={{ marginLeft: "8px" }} class="c-badge">
                        Top Comment
                      </small>
                    </div>
                    <small>12h ago</small>
                  </div>
                  <p class="text-justify comment-text mb-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </Layout>
  );
}

export default EFilingDashboard;