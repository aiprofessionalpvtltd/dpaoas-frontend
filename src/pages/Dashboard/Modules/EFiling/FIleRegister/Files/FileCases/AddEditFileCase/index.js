import React, { useState } from "react";
import { Layout } from "../../../../../../../../components/Layout";
import { EfilingSideBarItem } from "../../../../../../../../utils/sideBarItems";
import Header from "../../../../../../../../components/Header";
import { ToastContainer } from "react-toastify";
import { useLocation } from "react-router";
import { createCase } from "../../../../../../../../api/APIs/Services/efiling.service";
import { useNavigate } from "react-router-dom";
import { Editor } from "../../../../../../../../components/CustomComponents/Editor";

function AddEditFileCase() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState("Noting");
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

  const handleFileChange = (event, setStateFunction) => {
    // Access the files from the event
    const files = event.target.files;
    // Convert the files object to an array
    const fileList = Array.from(files);
    // Store the selected files in state
    setStateFunction((prevState) => ({
      ...prevState,
      attachedFiles: fileList,
    }));
  };

  const hendleCreateFileCase = async () => {
    try {
      const formData = createFormData();
      const response = await createCase(location.state?.id, formData);
      if (response.success) {
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

    notingData.attachedFiles.forEach((file, index) => {
      formData.append(`cases[0][Note][freshReceipt][${index}]`, file);
    });
    sanction.attachedFiles.forEach((file, index) => {
      formData.append(`cases[0][Sanction][freshReceipt][${index}]`, file);
    });
    letter.attachedFiles.forEach((file, index) => {
      formData.append(`cases[0][Letter][freshReceipt][${index}]`, file);
    });
    correspondenceData.attachedFiles.forEach((file, index) => {
      formData.append(`cases[0][Correspondence][freshReceipt][${index}]`, file);
    });

    return formData;
  };

  console.log("Noting", notingData);
  console.log("corres", correspondenceData);

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
                  onClick={() => setSelectedTab("Noting")}
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
                  onClick={() => setSelectedTab("Correspondence")}
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
                  onClick={() => setSelectedTab("Sanction")}
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
                  onClick={() => setSelectedTab("Objection")}
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
                  onClick={() => setSelectedTab("Letter")}
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
                    <Editor
                      title={"Description"}
                      onChange={(content) =>
                        setNotingData((prev) => ({
                          ...prev,
                          description: content,
                        }))
                      }
                      value={notingData.description}
                    />
                  </section>
                ) : selectedTab === "Correspondence" ? (
                  <section>
                    <Editor
                      title={"Correspondence Description"}
                      onChange={(content) =>
                        setCorrespondenceData((prev) => ({
                          ...prev,
                          description: content,
                        }))
                      }
                      value={correspondenceData.description}
                    />
                    <div class="row">
                      <div class="col">
                        <div class="mb-3 mt-5">
                          <div class="form-group">
                            <div class="row">
                              <label for="formFile" class="form-label mt-3">
                                Attach File
                              </label>

                              <div class="col">
                                <input
                                  className="form-control"
                                  type="file"
                                  accept=".pdf, .jpg, .jpeg, .png"
                                  id="formFile"
                                  name="attachment"
                                  multiple
                                  onChange={(event) =>
                                    handleFileChange(
                                      event,
                                      setCorrespondenceData
                                    )
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                ) : selectedTab === "Sanction" ? (
                  <section>
                    <Editor
                      title={"Sanction Description"}
                      onChange={(content) =>
                        setSanction((prev) => ({
                          ...prev,
                          description: content,
                        }))
                      }
                      value={sanction.description}
                    />
                    <div class="row">
                      <div class="col">
                        <div class="mb-3 mt-5">
                          <div class="form-group">
                            <div class="row">
                              <label for="formFile" class="form-label mt-3">
                                Attach File
                              </label>

                              <div class="col">
                                <input
                                  className="form-control"
                                  type="file"
                                  accept=".pdf, .jpg, .jpeg, .png"
                                  id="formFile"
                                  name="attachment"
                                  multiple
                                  onChange={(event) =>
                                    handleFileChange(event, setSanction)
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                ) : selectedTab === "Objection" ? (
                  <section>
                    <Editor
                      title={"Objection Description"}
                      onChange={(content) =>
                        setObjection((prev) => ({
                          ...prev,
                          description: content,
                        }))
                      }
                      value={objection.description}
                    />
                    <div class="row">
                      <div class="col">
                        <div class="mb-3 mt-5">
                          <div class="form-group">
                            <div class="row">
                              <label for="formFile" class="form-label mt-3">
                                Attach File
                              </label>

                              <div class="col">
                                <input
                                  className="form-control"
                                  type="file"
                                  accept=".pdf, .jpg, .jpeg, .png"
                                  id="formFile"
                                  name="attachment"
                                  multiple
                                  onChange={(event) =>
                                    handleFileChange(event, setObjection)
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                ) : (
                  <section>
                    <Editor
                      title={"Letter Description"}
                      onChange={(content) =>
                        setLetter((prev) => ({ ...prev, description: content }))
                      }
                      value={letter.description}
                    />
                    <div class="row">
                      <div class="col">
                        <div class="mb-3 mt-5">
                          <div class="form-group">
                            <div class="row">
                              <label for="formFile" class="form-label mt-3">
                                Attach File
                              </label>

                              <div class="col">
                                <input
                                  className="form-control"
                                  type="file"
                                  accept=".pdf, .jpg, .jpeg, .png"
                                  id="formFile"
                                  name="attachment"
                                  multiple
                                  onChange={(event) =>
                                    handleFileChange(event, setLetter)
                                  }
                                />
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

            <div class="row mt-4">
              <div class="col p-0">
                <button
                  class="btn btn-primary float-end"
                  onClick={hendleCreateFileCase}
                >
                  Create Case
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AddEditFileCase;
