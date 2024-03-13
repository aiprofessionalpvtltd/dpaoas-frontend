import React, { useContext, useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../../../../../../../../api/AuthContext";
import { Layout } from "../../../../../../../../components/Layout";
import { EfilingSideBarItem } from "../../../../../../../../utils/sideBarItems";
import Header from "../../../../../../../../components/Header";
import { ToastContainer } from "react-toastify";
import { useLocation } from "react-router";
import {
  DeleteFileCaseImage,
  UpdateCase,
  createCase,
  createFiles,
  getAllYear,
  getSingleCaseByFileId,
  geteHeadingNumberbyMainHeadingId,
  geteHeadingbyBranchId,
} from "../../../../../../../../api/APIs/Services/efiling.service";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../../../utils/ToastAlert";
import { useNavigate } from "react-router-dom";
import { Editor } from "../../../../../../../../components/CustomComponents/Editor";
import { TinyEditor } from "../../../../../../../../components/CustomComponents/Editor/TinyEditor";
import { getUserData } from "../../../../../../../../api/Auth";

function AddEditFileCase() {
  const navigate = useNavigate();
  const location = useLocation();
  const { fileIdINRegister } = useContext(AuthContext);
  const [selectedTab, setSelectedTab] = useState("Noting");
  const fileInputRef = useRef(null);
  const UserData = getUserData();

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

  const clearInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = null; // Reset the value of the input
    }
  };
  
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

  const hendleCreateFileCase = async () => {
        try {
      const formData = createFormData();
      const response = await createCase(fileIdINRegister, UserData?.fkUserId, formData);
      showSuccessMessage(response?.message);
      if (response.success) {
        setTimeout(() => {
          navigate("/efiling/dashboard/file-register-list/files-list/cases");
        }, 1000);
      }
    } catch (error) {
      console.error("Error creating case:", error);
    }
  };

  const hendleEditFileCase = async () => {
    try {
      const formData = createFormData();
      const response = await UpdateCase(fileIdINRegister, UserData?.fkUserId, location?.state?.caseId, formData);
      if (response.success) {
        showSuccessMessage(response?.message);
        setTimeout(() => {
          navigate("/efiling/dashboard/file-register-list/files-list/cases");
        }, 1000);
      }
    } catch (error) {
      console.error("Error creating case:", error);
    }
  };

  const createFormData = () => {
    const formData = new FormData();
    formData.append("cases[0][Note][description]", notingData.description);
    formData.append(
      "cases[0][Correspondence][description]",
      correspondenceData.description
    );
    formData.append("cases[0][Sanction][description]", sanction.description);
    formData.append("cases[0][Objection][description]", objection.description);
    formData.append("cases[0][Letter][description]", letter.description);
  
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
    if (correspondenceData.attachedFiles) {
    correspondenceData.attachedFiles.forEach((file, index) => {
      formData.append(
          `cases[0][Correspondence][sections][${index}]`,
          file
        );
    });
  
}
  
    return formData;
  };
  
  // Function to fetch data based on ID
  const fetchCaseById = async (caseId) => {
    try {
      const response = await getSingleCaseByFileId(fileIdINRegister, caseId);
      if (response.success) {
        // Set data in states
        const { Note, Sanction, Correspondence, Objection, Letter } =
          response.data[0];
        // Set noting data
        setNotingData({
          description: Note?.description || "",
          attachedFiles:
            Note?.caseAttachments?.length > 0 ? Note.caseAttachments : [],
        });

        // Set sanction data
        setSanction({
          description: Sanction?.description || "",
          attachedFiles:
            Sanction?.caseAttachments?.length > 0
              ? Sanction.caseAttachments
              : [],
        });

        // Set correspondence data
        setCorrespondenceData({
          description: Correspondence?.description || "",
          attachedFiles:
            Correspondence?.caseAttachments?.length > 0
              ? Correspondence.caseAttachments
              : [],
        });

        // Set objection data
        setObjection({
          description: Objection?.description || "",
          attachedFiles:
            Objection?.caseAttachments?.length > 0
              ? Objection.caseAttachments
              : [],
        });

        // Set letter data
        setLetter({
          description: Letter?.description || "",
          attachedFiles:
            Letter?.caseAttachments?.length > 0 ? Letter.caseAttachments : [],
        });
      }
    } catch (error) {
      console.error("Error fetching case:", error);
    }
  };

  useEffect(() => {
    if (location.state?.caseId) {
      fetchCaseById(location.state.caseId);
    }
  }, [location.state?.caseId]);

  const hendleRemoveImage = async (item) => {
    try {
      const response = await DeleteFileCaseImage(item?.id);
      if (response?.success) {
        showSuccessMessage(response.message);
        if (location.state?.caseId) {
          fetchCaseById(location.state.caseId);
        }
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  };


  return (
    <Layout module={true} sidebarItems={EfilingSideBarItem}>
      <Header
        dashboardLink={"/efiling/dashboard"}
        addLink1={"/efiling/dashboard/file-register-list/files-list/cases"}
        title1={"File Cases"}
        title2={"Add File Case"}
        addLink2={
          "/efiling/dashboard/file-register-list/files-list/addedit-file"
        }
        width={"500px"}
      />
      <ToastContainer />

      <div class="card">
        <div class="card-header red-bg" style={{ background: "#14ae5c" }}>
          {location && location.state ? (
            <h1>Edit File Case</h1>
          ) : (
            <h1>Add File Case</h1>
          )}
        </div>

        <div class="card-body">
          <div style={{ padding: "25px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ul className="nav nav-tabs mb-3 mt-3" id="ex1" role="tablist">
                <li
                  className="nav-item"
                  role="presentation"
                  onClick={() => {
                    clearInput();
                    setSelectedTab("Noting")
                  }}
                >
                  <button
                    type="button"
                    className={
                      selectedTab === "Noting" ? "nav-link active" : "nav-link"
                    }
                    style={{ width: "170px" }}
                    data-bs-toggle="tab"
                    role="tab"
                    aria-controls="ex1-tabs-1"
                    aria-selected={selectedTab === "Noting" ? "true" : "false"}
                  >
                    Noting
                  </button>
                </li>
                <li
                  className="nav-item"
                  role="presentation"
                  onClick={() => {
                    clearInput();
                  setSelectedTab("Correspondence")}}
                >
                  <button
                    type="button"
                    className={
                      selectedTab === "Correspondence"
                        ? "nav-link active"
                        : "nav-link"
                    }
                    style={{ width: "170px" }}
                    data-bs-toggle="tab"
                    role="tab"
                    aria-controls="ex1-tabs-2"
                    aria-selected={
                      selectedTab === "Correspondence" ? "true" : "false"
                    }
                  >
                    Correspondence
                  </button>
                </li>
                <li
                  className="nav-item"
                  role="presentation"
                  onClick={() => {
                    clearInput();
                    setSelectedTab("Sanction")}}
                >
                  <button
                    type="button"
                    className={
                      selectedTab === "Sanction"
                        ? "nav-link active"
                        : "nav-link"
                    }
                    style={{ width: "170px" }}
                    data-bs-toggle="tab"
                    role="tab"
                    aria-controls="ex1-tabs-1"
                    aria-selected={
                      selectedTab === "Sanction" ? "true" : "false"
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
                  setSelectedTab("Objection")}}
                >
                  <button
                    type="button"
                    className={
                      selectedTab === "Objection"
                        ? "nav-link active"
                        : "nav-link"
                    }
                    style={{ width: "170px" }}
                    data-bs-toggle="tab"
                    role="tab"
                    aria-controls="ex1-tabs-2"
                    aria-selected={
                      selectedTab === "Objection" ? "true" : "false"
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
                    setSelectedTab("Letter")}}
                >
                  <button
                    type="button"
                    className={
                      selectedTab === "Letter" ? "nav-link active" : "nav-link"
                    }
                    style={{ width: "170px" }}
                    data-bs-toggle="tab"
                    role="tab"
                    aria-controls="ex1-tabs-2"
                    aria-selected={selectedTab === "Letter" ? "true" : "false"}
                  >
                    Letter
                  </button>
                </li>
              </ul>
            </div>

            <div className="tab-content" id="ex1-content">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {selectedTab === "Noting" ? (
                  // Render content for the 'Noting' tab
                  <section class="mb-5">
                    <label for="formFile" class="form-label mt-3">
                      Noting Data
                    </label>

                    <TinyEditor
                      initialContent={""}
                      setEditorContent={(content) =>
                        setNotingData((prev) => ({
                          ...prev,
                          description: content,
                        }))
                      }
                      editorContent={notingData.description}
                      multiLanguage={false}
                      disabled={location.state?.view ? true : false}
                    />
                  </section>
                ) : selectedTab === "Correspondence" ? (
                  <section>
                    <label for="formFile" class="form-label mt-3">
                      Correspondence Data
                    </label>

                    <TinyEditor
                      initialContent={""}
                      setEditorContent={(content) =>
                        setCorrespondenceData((prev) => ({
                          ...prev,
                          description: content,
                        }))
                      }
                      editorContent={correspondenceData.description}
                      multiLanguage={false}
                      disabled={location.state?.view ? true : false}
                    />
                    <div class="row">
                      <div class="col">
                        <div class="mb-3 mt-5">
                          <div class="form-group">
                            <div class="row">
                              <label for="formFile" class="form-label mt-3">
                                Attach File
                              </label>

                              <div class="col-6">
                                <input
                                ref={fileInputRef}
                                  className="form-control"
                                  type="file"
                                  accept=".pdf, .jpg, .jpeg, .png"
                                  id="correspondance"
                                  name="correspondance"
                                  multiple
                                  onChange={(event) =>
                                    handleFileChangeCorrespondance(event)
                                  }
                      disabled={location.state?.view ? true : false}
                                />
                                {correspondenceData.attachedFiles.length >
                                  0 && (
                                  <div>
                                    <label
                                      for="formFile"
                                      class="form-label mt-3 mb-0"
                                    >
                                      Attached Files
                                    </label>
                                    <ul>
                                      {correspondenceData.attachedFiles?.map(
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
                                                  onClick={() => hendleRemoveImage(file)}
                                                >
                                                  x
                                                </a>
                                                <a
                                                  href={file?.id ? `http://172.16.170.8:5252${file?.fileName}` : URL.createObjectURL(
                                                    file
                                                  )}
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                >
                                                  {file?.id ? file?.fileName?.split("/").pop() : file.name}
                                                </a>
                                              </div>
                                              )
                                          }
                                        )}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                ) : selectedTab === "Sanction" ? (
                  <section>
                    <label for="formFile" class="form-label mt-3">
                      Sanction Data
                    </label>

                    <TinyEditor
                      initialContent={""}
                      setEditorContent={(content) =>
                        setSanction((prev) => ({
                          ...prev,
                          description: content,
                        }))
                      }
                      editorContent={sanction.description}
                      multiLanguage={false}
                      disabled={location.state?.view ? true : false}
                    />
                    <div class="row">
                      <div class="col">
                        <div class="mb-3 mt-5">
                          <div class="form-group">
                            <div class="row">
                              <label for="formFile" class="form-label mt-3">
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
                                    handleFileChangeSanction(event)
                                  }
                                  disabled={location.state?.view ? true : false}
                                />
                                {sanction.attachedFiles.length > 0 && (
                                  <div>
                                    <label
                                      for="formFile"
                                      class="form-label mt-3 mb-0"
                                    >
                                      Attached Files
                                    </label>
                                <ul>
                                {sanction.attachedFiles?.map(
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
                                                  onClick={() => hendleRemoveImage(file)}
                                                >
                                                  x
                                                </a>
                                                <a
                                                  href={file?.id ? `http://172.16.170.8:5252${file?.fileName}` : URL.createObjectURL(
                                                    file
                                                  )}
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                >
                                                  {file?.id ? file?.fileName?.split("/").pop() : file.name}
                                                </a>
                                              </div>
                                              )
                                          }
                                        )}
                                    </ul>
                                    </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                ) : selectedTab === "Objection" ? (
                  <section>
                    <label for="formFile" class="form-label mt-3">
                      Objection Data
                    </label>

                    <TinyEditor
                      initialContent={""}
                      setEditorContent={(content) =>
                        setObjection((prev) => ({
                          ...prev,
                          description: content,
                        }))
                      }
                      editorContent={objection.description}
                      multiLanguage={false}
                      disabled={location.state?.view ? true : false}
                    />
                    <div class="row">
                      <div class="col">
                        <div class="mb-3 mt-5">
                          <div class="form-group">
                            <div class="row">
                              <label for="formFile" class="form-label mt-3">
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
                                    handleFileChangeObjection(event)
                                  }
                                  disabled={location.state?.view ? true : false}
                                />
                                {objection.attachedFiles.length > 0 && (
                                  <div>
                                    <label
                                      for="formFile"
                                      class="form-label mt-3 mb-0"
                                    >
                                      Attached Files
                                    </label>
                                <ul>
                                {objection.attachedFiles?.map(
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
                                                  onClick={() => hendleRemoveImage(file)}
                                                >
                                                  x
                                                </a>
                                                <a
                                                  href={file?.id ? `http://172.16.170.8:5252${file?.fileName}` : URL.createObjectURL(
                                                    file
                                                  )}
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                >
                                                  {file?.id ? file?.fileName?.split("/").pop() : file.name}
                                                </a>
                                              </div>
                                              )
                                          }
                                        )}
                                    </ul>
                                    </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                ) : (
                  <section>
                    <label for="formFile" class="form-label mt-3">
                      Letter Data
                    </label>

                    <TinyEditor
                      initialContent={""}
                      setEditorContent={(content) =>
                        setLetter((prev) => ({ ...prev, description: content }))
                      }
                      editorContent={letter.description}
                      multiLanguage={false}
                      disabled={location.state?.view ? true : false}
                    />
                    <div class="row">
                      <div class="col">
                        <div class="mb-3 mt-5">
                          <div class="form-group">
                            <div class="row">
                              <label for="formFile" class="form-label mt-3">
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
                                    handleFileChangeLetter(event)
                                  }
                                  disabled={location.state?.view ? true : false}
                                />
                                {letter.attachedFiles.length > 0 && (
                                  <div>
                                    <label
                                      for="formFile"
                                      class="form-label mt-3 mb-0"
                                    >
                                      Attached Files
                                    </label>
                                    <ul>
                                    {letter.attachedFiles?.map(
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
                                                  onClick={() => hendleRemoveImage(file)}
                                                >
                                                  x
                                                </a>
                                                <a
                                                  href={file?.id ? `http://172.16.170.8:5252${file?.fileName}` : URL.createObjectURL(
                                                    file
                                                  )}
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                >
                                                  {file?.id ? file?.fileName?.split("/").pop() : file.name}
                                                </a>
                                              </div>
                                              )
                                          }
                                        )}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                )}
              </div>
            </div>

            {!location.state?.view && (
            <div class="row mt-4">
              <div class="col-11 p-0">
                <button
                  class="btn btn-primary float-end me-4"
                  type="submit"
                  onClick={location.state?.caseId ? hendleEditFileCase : hendleCreateFileCase}
                >
                  {location.state?.caseId ? "Update Case" : "Create Case"}
                </button>
              </div>
            </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AddEditFileCase;
