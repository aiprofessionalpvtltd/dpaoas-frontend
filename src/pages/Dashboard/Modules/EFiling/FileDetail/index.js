import React, { useState } from "react";
import { Layout } from "../../../../../components/Layout";
import Header from "../../../../../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import thumbnail from "./../../../../../assets/profile-img.jpg";
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
import { TinyEditor } from "../../../../../components/CustomComponents/Editor/TinyEditor";
import NewCaseEfilling from "../AddEditFileForm";
import { useLocation } from "react-router-dom";

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

function FileDetail() {
  const location = useLocation();
  const [editorContent, setEditorContent] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [togleOpan, setTogleOpan] = useState(true);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  // use it (editorContent) when submitting whole file content
  console.log("Editor content", editorContent);
  return (
    <Layout centerlogohide={true}>
      <div className="dashboard-content" style={{ marginTop: 80 }}>
        <Header
          dashboardLink={"/"}
          addLink1={"/efiling/dashboard"}
          title1={"E-Filing"}
          addLink2={"/efiling/dashboard/addedit"}
          title2={"File Detail"}
          width={"500px"}
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
                <p style={{ marginBottom: "0px", fontWeight: "bold" }}>IT Directorate</p>
                <p style={{ marginBottom: "0" }}>31-01-2024</p>
                <p>4:03pm</p>
              </div>
            </div>
            <div className="col-md-7">
              <div>
                <div class="content">
                  <div class="row">
                    <div class="col-6">
                      <div class="mb-3">
                        <label class="form-label">File</label>
                        <select class="form-select" disabled={location?.state?.view ? true : false}>
                          <option>8(14)/2022/IT</option>
                          <option>8(15)/2022/IT</option>
                        </select>
                      </div>
                    </div>

                    <div class="col">
                      <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">
                          Subject
                        </label>
                        <input
                          type="email"
                          class="form-control"
                          placeholder="Subject"
                          disabled={location?.state?.view ? true : false}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col">
                      <div class="mb-3">
                        <label class="form-label">Case Number</label>
                        <input
                          type="email"
                          class="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Case Number"
                          disabled={location?.state?.view ? true : false}
                        />
                      </div>
                    </div>
                    <div class="col">
                      <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">
                          Date
                        </label>
                        <input
                          type="email"
                          class="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Date"
                          disabled={location?.state?.view ? true : false}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col">
                      <div class="mb-3">
                        <div class="mb-3">
                          <label class="form-label">Priority</label>
                          <select class="form-select" disabled={location?.state?.view ? true : false}>
                            <option>Normal</option>
                            <option>Immediate</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="col">
                      <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">
                          File Type
                        </label>
                        <select class="form-select" disabled={location?.state?.view ? true : false}>
                          <option>Budget</option>
                          <option>Procurement</option>
                          <option>Legislative</option>
                          <option>Tendor</option>
                          <option>Policies</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="shadow" style={{ padding: "25px" }}>
                  <ul class="nav nav-tabs mb-3 mt-3" id="ex1" role="tablist">
                    <li class="nav-item" role="presentation" onClick={() => setTogleOpan(!togleOpan)}>
                      <a
                        class={togleOpan ? "nav-link active" : "nav-link"}
                        id="ex1-tab-1"
                        data-bs-toggle="tab"
                        href="#ex1-tabs-1"
                        role="tab"
                        aria-controls="ex1-tabs-1"
                        aria-selected="true"
                      >
                        Noting
                      </a>
                    </li>
                    <li class="nav-item" role="presentation" onClick={() => setTogleOpan(!togleOpan)}>
                      <a
                        class={!togleOpan ? "nav-link active" : "nav-link"}
                        id="ex1-tab-2"
                        data-bs-toggle="tab"
                        href="#ex1-tabs-2"
                        role="tab"
                        aria-controls="ex1-tabs-2"
                        aria-selected="false"
                      >
                        Correspondence
                      </a>
                    </li>
                  </ul>
                  <div class="tab-content" id="ex1-content">
                    {togleOpan ? (
                      // <div class="tab-pane fade show active" id="ex1-tabs-1" role="tabpanel" aria-labelledby="ex1-tab-1">
                      <section>
                        <div class="row">
                          <div class="col">
                            <div class="mb-3">
                              <label class="form-label">Description</label>
                              <TinyEditor
                                initialContent={"Hello there! Write something new"}
                                setEditorContent={setEditorContent}
                                editorContent={editorContent}
                                multiLanguage={false}
                              />
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col">
                            <div class="mb-3">
                              <label class="form-label">Action</label>
                              <select class="form-select">
                                <option>Approve</option>
                                <option>Reject</option>
                              </select>
                            </div>
                          </div>
                          <div class="col">
                            <div class="mb-3">
                              <label class="form-label">Mark To</label>
                              <select class="form-select">
                                <option>Ali</option>
                                <option>Muhammad</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col">
                            <div class="mb-3">
                              <label class="form-label">Remarks</label>
                              <textarea class="form-control"></textarea>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button class="btn btn-primary" type="button">
                              Submit
                            </button>
                          </div>
                        </div>
                      </section>
                    ) : (
                      // </div>
                      // <div class="tab-pane fade" id="ex1-tabs-2" role="tabpanel" aria-labelledby="ex1-tab-2">
                      <section>
                        <div class="row">
                          <div class="col">
                            <div class="mb-3">
                              <label class="form-label">Description</label>
                              <TinyEditor
                                initialContent={"Hello there! Write something new"}
                                setEditorContent={setEditorContent}
                                editorContent={editorContent}
                                multiLanguage={false}
                              />
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-6">
                            <div class="mb-3 mt-3">
                              <div class="form-group">
                                <div class="row">
                                  <label for="formFile" class="form-label mt-3">
                                    Attach File
                                  </label>

                                  <div class="col">
                                    <div class="MultiFile-wrap" id="T7">
                                      <input class="form-control" type="file" id="formFile" />
                                    </div>
                                  </div>
                                  <div class="MultiFile-label mt-3">
                                    <a href="#">
                                      <i class="fas fa-download"></i>
                                    </a>
                                    <a class="MultiFile-remove" href="#T7">
                                      x
                                    </a>
                                    <span class="MultiFile-label" title="File selected: file.pdf">
                                      <span class="MultiFile-title">file.pdf</span>
                                    </span>
                                  </div>
                                  <div class="MultiFile-label mt-3">
                                    <a href="#">
                                      <i class="fas fa-download"></i>
                                    </a>
                                    <a class="MultiFile-remove" href="#T7">
                                      x
                                    </a>
                                    <span class="MultiFile-label" title="File selected: file.pdf">
                                      <span class="MultiFile-title">Case file.pdf</span>
                                    </span>
                                  </div>
                                  <div class="MultiFile-label mt-3">
                                    <a href="#">
                                      <i class="fas fa-download"></i>
                                    </a>
                                    <a class="MultiFile-remove" href="#T7">
                                      x
                                    </a>
                                    <span class="MultiFile-label" title="File selected: file.pdf">
                                      <span class="MultiFile-title">Tendar file.pdf</span>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
                      // </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="m-2">
                <div class="row mt-4">
                  <div class="col-6">
                    <div class="mb-3">
                      <label class="form-label">Diary Number</label>
                      <input
                        type="email"
                        class="form-control"
                        id="exampleFormControlInput1"
                        placeholder="Diary Number"
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
              </div>
            </div>
            <div className="col-md-3">
              <div className="custom-editor-main" style={{ marginTop: 0 }}>
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
                        <span class="mr-2">Mohsin Ali</span>
                        <small style={{ marginLeft: "8px" }} class="c-badge">
                          Superintendent
                        </small>
                      </div>
                      <small>12h ago</small>
                    </div>
                    <p class="text-justify comment-text mb-0">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua. Ut enim ad minim veniam
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
                        <span class="mr-2">Naeem Malik</span>
                        <small style={{ marginLeft: "8px" }} class="c-badge">
                          SO
                        </small>
                      </div>
                      <small>12h ago</small>
                    </div>
                    <p class="text-justify comment-text mb-0">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua. Ut enim ad minim veniam
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
                        <span class="mr-2">Abbas Khan</span>
                        <small style={{ marginLeft: "8px" }} class="c-badge">
                          Director
                        </small>
                      </div>
                      <small>12h ago</small>
                    </div>
                    <p class="text-justify comment-text mb-0">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua. Ut enim ad minim veniam
                    </p>
                  </div>
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
