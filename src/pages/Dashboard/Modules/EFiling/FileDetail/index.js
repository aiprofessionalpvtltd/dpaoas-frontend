import React, { useContext, useEffect, useState } from "react";
import { Layout } from "../../../../../components/Layout";
import Header from "../../../../../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import thumbnail from "./../../../../../assets/profile-img.jpg";
import DatePicker from "react-datepicker";
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
import { useFormik } from "formik";
import { getUserData } from "../../../../../api/Auth";
import { UpdateEfiling, UploadEfilingAttechment, getEFilesByID } from "../../../../../api/APIs/Services/efiling.service";
import { ToastContainer } from "react-toastify";
import { showErrorMessage, showSuccessMessage } from "../../../../../utils/ToastAlert";
import moment from "moment";
import { AuthContext } from "../../../../../api/AuthContext";

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
  const [editorContent1, setEditorContent1] = useState();
  const { employeeData } = useContext(AuthContext)
  const UserData = getUserData()

  const [fileId, setFIleId] = useState(location?.state?.id)

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [togleOpan, setTogleOpan] = useState(true);

  const [filesData, setFilesData] = useState();
  const [remarksData, setRemarksData] = useState([]);

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
      CommentStatus: "",
      comment: "",
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      UpdateEfilingApi(values)
    },
  });


  const UpdateEfilingApi = async (values) => {

    const Data = {
      fileNumber: values?.fileNumber,
      fileSubject: values?.fileSubject,
      priority: values?.priority,
      fileCategory: values?.fileCategory,
      fileType: values?.fileType,
      // fkBranchId: values?.fkBranchId,
      // fkdepartmentId: values?.fkdepartmentId,

      receivedOn: values?.receivedOn,
      year: values?.year,
      notingDescription: editorContent,
      correspondingDescription: editorContent1,
      submittedBy: UserData?.fkUserId,
      assignedTo: values?.assignedTo,
      CommentStatus: values?.CommentStatus,
      comment: values?.comment,
      commentBy: UserData?.fkUserId
    }

    try {
      const response = await UpdateEfiling(fileId, Data)
      if (response?.success) {
        showSuccessMessage(response?.message)
        formik.resetForm()
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  }


  const toggleModal = () => setIsModalOpen(!isModalOpen);

  // use it (editorContent) when submitting whole file content
  console.log("Editor content", editorContent);


  const getFilesByID = async () => {
    try {
      const response = await getEFilesByID(fileId);
      if (response?.success) {
        setRemarksData(response?.data?.fileRemarks)
        setFilesData(response?.data);
      }
    } catch (error) {
      // showErrorMessage(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (location.state?.id) {
      getFilesByID();
    }
  }, [])

  useEffect(() => {
    // Update form values when termsById changes
    if (filesData) {
      setEditorContent(filesData?.notingDescription || "")
      setEditorContent1(filesData?.correspondingDescription || "")
      formik.setValues({
        fileNumber: filesData?.fileNumber || "",
        fileSubject: filesData?.fileSubject || "",
        priority: filesData?.priority || "",
        fileCategory: filesData?.fileCategory || "",
        fileType: filesData?.fileType || "",
        fkBranchId: filesData?.fkBranchId || "",
        fkdepartmentId: filesData?.fkdepartmentId || "",
        fkMinistryId: filesData?.fkMinistryId || "",
        receivedOn: new Date(filesData?.receivedOn) || "",
        year: filesData?.year || "",
        // notingDescription: filesData?.notingDescription || "",
        // correspondingDescription: filesData?.correspondingDescription || "",
        assignedTo: filesData?.assignedTo || "",
        CommentStatus: filesData?.fileRemarks[0]?.CommentStatus || "",
        comment: filesData?.fileRemarks[0]?.comment || "",
      });
    }
  }, [filesData, formik.setValues]);

  const handleUploadFile = async (event) => {
    // Get the selected file
    const file = event.target.files[0];

    // Create FormData object
    const formData = new FormData();

    // Append the file to FormData
    formData.append('attachment', file);
    try {
      const response = await UploadEfilingAttechment(UserData?.fkUserId, fileId, formData)
      showSuccessMessage(response?.message)
      if (response.success) {
        getFilesByID()
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message)
    }
  }

  return (
    <Layout centerlogohide={true}>
      <div className="dashboard-content" style={{ marginTop: 80 }}>
        <ToastContainer />
        <Header
          dashboardLink={"/"}
          addLink1={"/efiling/dashboard/files"}
          title1={"E-Filing"}
          addLink2={"/efiling/dashboard/addedit"}
          title2={location && location?.state?.view ? "File Detail" : "Edit File"}
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
              <form onSubmit={formik.handleSubmit}>
                <div>
                  <div class="content">
                    <div class="row">
                      <div class="col-6">
                        <div class="mb-3">
                          <label class="form-label">File</label>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="fileNumber"
                            disabled={location?.state?.view ? true : false}
                            id="fileNumber"
                            name="fileNumber"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.fileNumber}
                          />
                          {/* <select class="form-select" disabled={location?.state?.view ? true : false}
                            id="fileNumber"
                            name="fileNumber"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.fileNumber}>
                            <option>8(14)/2022/IT</option>
                            <option>8(15)/2022/IT</option>
                          </select> */}
                        </div>
                      </div>

                      <div class="col">
                        <div class="mb-3">
                          <label for="exampleFormControlInput1" class="form-label">
                            Subject
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Subject"
                            disabled={location?.state?.view ? true : false}
                            id="fileSubject"
                            name="fileSubject"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.fileSubject}
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      {/* <div class="col">
                        <div class="mb-3">
                          <label class="form-label">Case Number</label>
                          <input
                            type="email"
                            class="form-control"
                            placeholder="Case Number"
                            disabled={location?.state?.view ? true : false}
                            id="caseNumber"
                            name="caseNumber"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.caseNumber}
                          />
                        </div>
                      </div> */}
                      <div className="col">
                        <div className="mb-3" style={{ position: "relative" }}>
                          <label className="form-label">Received On</label>
                          <span
                            style={{
                              position: "absolute",
                              right: "15px",
                              top: "36px",
                              zIndex: 1,
                              fontSize: "20px",
                              zIndex: "1",
                              color: "#666",
                            }}
                          >
                            <FontAwesomeIcon icon={faCalendarAlt} />
                          </span>
                          <DatePicker
                            selected={formik.values.receivedOn}
                            disabled={location?.state?.view ? true : false}
                            onChange={(date) =>
                              formik.setFieldValue("receivedOn", date)
                            }
                            onBlur={formik.handleBlur}
                            minDate={new Date()}
                            className={`form-control`}
                          />

                        </div>
                      </div>
                      <div class="col-6">
                        <div class="mb-3">
                          <label class="form-label">Year</label>
                          <select
                            disabled={location?.state?.view ? true : false}
                            class="form-select"
                            id="year"
                            name="year"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.year}
                          >
                            <option value={""} selected disabled hidden>
                              Select
                            </option>
                            <option value={"2021"}>2021</option>
                            <option value={"2023"}>2023</option>
                          </select>
                        </div>
                      </div>

                    </div>
                    <div class="row">
                      <div class="col">
                        <div class="mb-3">
                          <div class="mb-3">
                            <label class="form-label">Priority</label>
                            <select class="form-select" disabled={location?.state?.view ? true : false}
                              id="priority"

                              name="priority"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.priority}>
                              <option value={"Normal"}>Normal</option>
                              <option value={"Immediate"}>Immediate</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col">
                        <div class="mb-3">
                          <label for="exampleFormControlInput1" class="form-label" >
                            File Type
                          </label>
                          <select class="form-select" disabled={location?.state?.view ? true : false}
                            id="fileType"
                            name="fileType"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.fileType}>
                            <option value={"Internal"}>Internal</option>
                            <option value={"External"}>External</option>
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
                                <select class="form-select"
                                  id="CommentStatus"
                                  name="CommentStatus"
                                  disabled={location?.state?.view ? true : false}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.CommentStatus}>
                                  <option value={"Approved"}>Approve</option>
                                  <option value={"Disapproved"}>Disapprove</option>
                                </select>
                              </div>
                            </div>
                            <div class="col">
                              <div class="mb-3">
                                <label class="form-label">Mark To</label>
                                <select class="form-select"
                                  id="assignedTo"
                                  name="assignedTo"
                                  disabled={location?.state?.view ? true : false}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.assignedTo}>
                                  <option value={""} selected disabled hidden>
                                    Select
                                  </option>
                                  {employeeData &&
                                    employeeData?.map((item) => (
                                      <option value={item.id}>{`${item.firstName}${item.lastName}`}</option>
                                    ))}
                                </select>
                              </div>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col">
                              <div class="mb-3">
                                <label class="form-label">Remarks</label>
                                <textarea class="form-control"
                                  id="comment"
                                  name="comment"
                                  disabled={location?.state?.view ? true : false}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.comment}></textarea>
                              </div>
                            </div>
                          </div>
                          <div class="row">
                            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                              <button class="btn btn-primary" type="submit" disabled={location?.state?.view ? true : false}>
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
                                  setEditorContent={setEditorContent1}
                                  editorContent={editorContent1}
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
                                        <input class="form-control" type="file" id="formFile" onChange={handleUploadFile} />
                                      </div>
                                    </div>
                                    {filesData && filesData?.fileAttachments?.map((item) => (
                                      <div class="MultiFile-label mt-3">
                                        <a href={`http://172.16.170.8:5252/api${item.filename}`}>
                                          <i class="fas fa-download"></i>
                                        </a>
                                        <a class="MultiFile-remove" href="#T7">
                                          x
                                        </a>
                                        <span class="MultiFile-label" title={item.filename?.split('\\').pop().split('/').pop()}>
                                          <span class="MultiFile-title"><a href={`http://172.16.170.8:5252/api${item.filename}`}>{item.filename?.split('\\').pop().split('/').pop()}</a></span>
                                        </span>
                                      </div>
                                    ))}

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
            <div className="col-md-3">
              <div className="custom-editor-main" style={{ marginTop: 0 }}>
                <div className="comment-heading">
                  <h2>Remarks</h2>
                  {/* <a onClick={toggleModal}>
                    <button class="btn add-btn">
                      <FontAwesomeIcon style={{ marginRight: "-5px" }} icon={faPlus} size="md" width={24} /> Add
                    </button>
                  </a> */}
                </div>
                {remarksData.length > 0 ? remarksData.map((item) => (
                  <>
                    {item?.comment !== null ? (
                      <div class="d-flex flex-row p-3">
                        <>
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
                                <span class="mr-2">{`${item?.employees?.firstName}  ${item?.employees?.lastName}`}</span>
                                <small style={{ marginLeft: "8px" }} class="c-badge">
                                  {item?.employees?.employeeDesignation?.designationName}
                                </small>
                              </div>
                              <small>{moment(item?.createdAt).format("DD/MM/YYYY")}</small>
                            </div>
                            <p class="text-justify comment-text mb-0">
                              {item?.comment}
                            </p>
                          </div>
                        </>
                      </div>
                    ) : (
                      <div
                        class="alert alert-danger mt-5"
                        role="alert"
                        style={{ width: "350px", margin: "0 auto", textAlign: "center" }}
                      >
                        No data found
                      </div>
                    )}
                  </>
                )) : (
                  <div
                    class="alert alert-danger mt-5"
                    role="alert"
                    style={{ width: "350px", margin: "0 auto", textAlign: "center" }}
                  >
                    No data found
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default FileDetail;
