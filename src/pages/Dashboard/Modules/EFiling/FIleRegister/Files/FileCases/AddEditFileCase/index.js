import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AuthContext } from "../../../../../../../../api/AuthContext";
import { Layout } from "../../../../../../../../components/Layout";
import {
  EfilingSideBarBranchItem,
  EfilingSideBarItem,
} from "../../../../../../../../utils/sideBarItems";
import { ToastContainer } from "react-toastify";
import { useLocation } from "react-router";
import {
  UpdateCase,
  createCase,
  getAllCorrespondence,
  getFileByRegisterById,
  getSingleCaseByFileId,
} from "../../../../../../../../api/APIs/Services/efiling.service";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../../../utils/ToastAlert";
import { useNavigate } from "react-router-dom";
import { Editor } from "../../../../../../../../components/CustomComponents/Editor";
import { getSelectedFileID, getUserData, setSelectedFileID } from "../../../../../../../../api/Auth";
import Select from "react-select";
import TabComponent from "../../../../../../../../components/CustomComponents/TabBar";
import NoteEditor from "../../../../../../../../components/CustomComponents/DocEditor";
import DocParas from "../../../../../../../../components/CustomComponents/DocParas";
import CustomTable from "../../../../../../../../components/CustomComponents/CustomTable";
import { Modal } from "react-bootstrap";

function AddEditFileCase() {
  const navigate = useNavigate();
  const userData = getUserData();
  const location = useLocation();
  const { fileIdINRegister } = useContext(AuthContext);
  const [notingTabSubject, setNotingTabSubject] = useState("");
  const [notingData, setNotingData] = useState({
    description: "",
  });
  
  const initialNotingTabData = [
    { title: "Para 1", description: "Content for Paragraph 1", references: [{flag: "A", id: 2, attachments: [{file: "/public/correspondences/2024-06-04T07-58-31/output_1717395191507.pdf"}] }]},
    { title: "Para 2", description: "Content for Paragraph 2", references: [] },
    { title: "Para 3", description: "Content for Paragraph 3", references: [] },
  ];
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(null);
  const [correspondenceTypesData, setCorrespondenceTypesData] = useState([]);
  const pageSize = 10; // Set your desired page size
  const [showModal, setShowModal] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState([]);

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  const [notingTabData, setNotingTabsData] = useState(initialNotingTabData);

  // const handleEditorChange = (index, content) => {
  //   const updatedTabs = [...notingTabData];
  //   updatedTabs[index].description = content;
  //   setNotingTabsData(updatedTabs);
  // };

  const handleEditorChange = (index, content, references, isReference, isNew = false) => {
    if (isNew) {
      setNotingTabsData([
        ...notingTabData,
        {
          title: `Para ${notingTabData.length + 1}`,
          description: content,
          references: [],
        },
      ]);
    } else if (isReference) {
      const updatedTabs = notingTabData.map((tab, i) =>
        i === index
          ? {
              ...tab,
              description: content,
              references: [...tab.references, references],
            }
          : tab
      );
      setNotingTabsData(updatedTabs);
    } else {
      const updatedTabs = notingTabData.map((tab, i) =>
      i === index
        ? {
            ...tab,
            description: content,
          }
        : tab
    );
    setNotingTabsData(updatedTabs);
    }
  };

  console.log(notingTabData);

  const handleDelete = (index) => {
    const updatedTabs = notingTabData.filter((_, i) => i !== index);
    setNotingTabsData(updatedTabs);
  };

  const [selectedTab, setSelectedTab] = useState("Noting");
  const [fkfileId, setFKFileId] = useState(null);

  const fileInputRef = useRef(null);
  const UserData = getUserData();

  const clearInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = null; // Reset the value of the input
    }
  };

  const hendleCreateFileCase = async () => {
    try {
      const data = {
        fkBranchId: UserData.fkBranchId,
        notingSubject: notingTabSubject,
        paragraphArray: notingTabData
      }
      const response = await createCase(
        fkfileId.value,
        UserData?.fkUserId,
        location.state?.frId ? location.state?.frId : null,
        data
      );
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
      const response = await UpdateCase(
        fkfileId.value,
        UserData?.fkUserId,
        location?.state?.caseId,
        formData
      );
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
    return formData;
  };

  // Function to fetch data based on ID
  const fetchCaseById = async (caseId) => {
    try {
      const response = await getSingleCaseByFileId(fileIdINRegister, caseId);

      if (response.success) {
        
      }
    } catch (error) {
      console.error("Error fetching case:", error);
    }
  };

  useEffect(() => {
    if (location.state?.caseId) {
      fetchCaseById(location.state?.caseId);
    }
  }, [location.state?.caseId]);

  const [fileData, setFileData] = useState([]);

  const getAllFiles = async () => {
    const searchParams = {
      branchId: userData?.fkBranchId,
      currentPage: 0,
      pageSize: 100,
    };
    try {
      const response = await getFileByRegisterById(searchParams);
      if (response.success) {
        if (response?.data?.files) {
          setFileData(response?.data?.files);
        } else {
          setFileData([]);
        }
      }
    } catch (error) {
      // showErrorMessage(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    const fileId = getSelectedFileID();
    if(fileId) {  
      setFKFileId(fileId);
    }
    getAllFiles();
  }, []);

  const images =
    location?.state?.freshReceiptsAttachments?.map((item) => ({
      original: `http://172.16.170.8:5252${item?.filename}`,
      thumbnail: `http://172.16.170.8:5252${item?.filename}`,
    })) || [];

  const transformData = (apiData) => {
    return apiData?.map((item) => ({
      internalId: item.id,
      name: item.name,
      description: item.description,
      status: item.status,
      attachmentInternal: item.correspondenceAttachments,
    }));
  };

  const handleCorrespondences = async () => {
    try {
      const response = await getAllCorrespondence(
        fkfileId.value,
        UserData.fkBranchId,
        currentPage,
        pageSize
      );
      if (response?.success) {
        setCount(response?.count);
        const transformedData = transformData(response.data?.correspondences);
        setCorrespondenceTypesData(transformedData);
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    handleCorrespondences();
  }, [fkfileId]);

  const HandlePrint = async (urlimage) => {
    const url = `http://10.10.140.200:5152${urlimage}`;
    window.open(url, "_blank");
    // setPdfUrl(url)
  };

  return (
    <Layout
      module={false}
      centerlogohide={true}
      sidebarItems={
        UserData && UserData?.userType === "Officer"
          ? EfilingSideBarItem
          : EfilingSideBarBranchItem
      }
    >
      {/* <Header
        dashboardLink={"/efiling/dashboard"}
        addLink1={"/efiling/dashboard/file-register-list/files-list/cases"}
        title1={"File Cases"}
        title2={"Add File Case"}
        addLink2={
          "/efiling/dashboard/file-register-list/files-list/addedit-file"
        }
        width={"500px"}
      /> */}
      <ToastContainer />

      <Modal
        show={showModal}
        size="lg"
        onHide={() => setShowModal(false)}
        centered
      >
        <div>
          <Modal.Header closeButton>
            <Modal.Title>Attachments</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ padding: 20 }}>
            {attachedFiles && attachedFiles.length > 0 ? (
              attachedFiles?.map((item) => (
                <ul class="list-group">
                  <li
                    class="list-group-item"
                    onClick={() => HandlePrint(item?.file)}
                    style={{ color: "blue", cursor: "pointer" }}
                  >
                    {item?.file?.split("\\").pop().split("/").pop()}
                  </li>
                </ul>
              ))
            ) : (
              <ul class="list-group">
                <li class="list-group-item">No data found!</li>
              </ul>
            )}
          </Modal.Body>

          <Modal.Footer>
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </Modal.Footer>
        </div>
      </Modal>

      <div class="card">
        <div class="card-header red-bg" style={{ background: "#14ae5c" }}>
          {location && location.state ? (
            <h1>Edit File Case</h1>
          ) : (
            <h1>Add File Case</h1>
          )}
        </div>

        <div class="card-body">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingLeft: 100,
              paddingRight: 100,
            }}
          >
            <div
              style={{
                marginLeft: "20px",
                width: "25%", // Set width to 50%
              }}
            >
              <label for="formFile" class="form-label mt-3">
                * Select File
              </label>
              <Select
                options={
                  fileData &&
                  fileData?.map((item) => ({
                    value: item.id,
                    label: item.fileNumber,
                  }))
                }
                onChange={(selectedOptions) => {
                  setSelectedFileID(selectedOptions);
                  setFKFileId(selectedOptions)
                }}
                // onBlur={formikAssigned.handleBlur}
                value={fkfileId}
                name="fkfileId"
                isClearable={true}
              />
            </div>
            {!location.state?.view && (
              <div style={{ marginLeft: "20px", marginTop: "45px" }}>
                <button
                  class="btn btn-primary float-end me-4"
                  type="submit"
                  onClick={
                    location.state?.caseId
                      ? hendleEditFileCase
                      : hendleCreateFileCase
                  }
                >
                  {location.state?.caseId ? "Update Case" : "Create Case"}
                </button>
              </div>
            )}
          </div>
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
                    setSelectedTab("Noting");
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
                    setSelectedTab("Correspondence");
                    // setSelectedTab("FR Noting");
                    // setSelectedTab(
                    //   location?.state?.freshReceiptsAttachments?.length > 0
                    //     ? "FR Noting"
                    //     : "Sanction"
                    // );
                  }}
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
              </ul>
            </div>
            <div className="row">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {selectedTab === "Correspondence" && (
                  <CustomTable
                    hidebtn1={false}
                    addBtnText={"Create Correspondence"}
                    ActionHide={false}
                    data={correspondenceTypesData}
                    tableTitle="Correspondence"
                    headertitlebgColor={"#666"}
                    headertitletextColor={"#FFF"}
                    handlePageChange={handlePageChange}
                    currentPage={currentPage}
                    handleAdd={() => {
                      if(fkfileId) {
                        navigate(
                          "/efiling/dashboard/file-register-list/files-list/addedit-case/addedit-correspondence", {state: {fileId: fkfileId.value}}
                        )
                      } else {
                        showErrorMessage("Please select file first");
                      }
                    }}
                    pageSize={pageSize}
                    totalCount={count}
                    singleDataCard={true}
                    showView={true}
                    handleView={(item) => {
                      setAttachedFiles(item?.attachmentInternal);
                      setShowModal(true);
                    }}
                    handleEdit={(item) => {
                      if(fkfileId) {
                        navigate(
                          "/efiling/dashboard/file-register-list/files-list/addedit-case/addedit-correspondence",
                          { state: {item: item, fileId: fkfileId.value }}
                        )
                      } else {
                        showErrorMessage("Please select file first");
                      }
                    }}
                  />
                )}
              </div>
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
                  <div className="container">
                    {/* First attempt */}
                    {/* <NoteEditor tabsData={notingTabData} notingTabSubject={notingTabSubject} setNotingTabSubject={setNotingTabSubject} onEditorChange={handleEditorChange} /> */}

                    {/* Second Attempt */}
                    {/* <div class="row mb-5">
                    <div class="col-6">
                      <label for="formFile" class="form-label">
                        Added Paragraphs
                      </label>
                      <TabComponent tabsData={notingTabData} onEditorChange={handleEditorChange} />
                    </div>
                    <div class="col-6">
                        <label className="form-label">Subject</label>
                        <input
                          className={`form-control mb-2`}
                          id="subject"
                          placeholder="Subject"
                          onChange={(e) => setNotingTabSubject(e.target.value)}
                          value={notingTabSubject}
                        />
                        <Editor
                          title={"Add new paragraph"}
                          onChange={(content) =>
                            setNotingData((prev) => ({
                              ...prev,
                              description: content,
                            }))
                          }
                          value={notingData.description}
                          width={"100%"}
                        />
                        <button
                          class="btn btn-primary float-end me-3" 
                          style={{ marginTop: 60, width: "100px" }}
                          onClick={() => {}}
                        >
                          {'Add'}
                        </button>
                    </div>
                  </div> */}

                    {/* Third attempt */}
                    <div className="row mb-5">
                      <div className="col-12">
                        <label className="form-label">Subject</label>
                        <input
                          className={`form-control mb-2`}
                          id="subject"
                          placeholder="Subject"
                          onChange={(e) => setNotingTabSubject(e.target.value)}
                          value={notingTabSubject}
                          style={{ width: "50%" }}
                        />
                        <label htmlFor="formFile" className="form-label mt-2">
                          Added Paragraphs
                        </label>
                        <DocParas
                          tabsData={notingTabData}
                          onEditorChange={handleEditorChange}
                          onDelete={handleDelete}
                        />
                      </div>
                    </div>

                    <label className="form-label">Add new paragraph</label>
                    <Editor
                      onChange={(content) =>
                        setNotingData({ description: content })
                      }
                      value={notingData.description}
                      width={"100%"}
                      display={"flex"}
                    />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: 5,
                      }}
                    >
                      <button
                        className="btn btn-primary"
                        style={{ marginTop: 60, width: "100px" }}
                        onClick={() =>
                          handleEditorChange(null, notingData.description, false, true)
                        }
                      >
                        {"Add"}
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AddEditFileCase;
