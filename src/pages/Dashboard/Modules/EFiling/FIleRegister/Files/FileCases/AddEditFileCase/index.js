import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../../../../../../../../api/AuthContext";
import { Layout } from "../../../../../../../../components/Layout";
import {
  EfilingSideBarBranchItem,
  EfilingSideBarItem,
} from "../../../../../../../../utils/sideBarItems";
import Header from "../../../../../../../../components/Header";
import { ToastContainer } from "react-toastify";
import { useLocation } from "react-router";
import {
  DeleteFileCaseImage,
  UpdateCase,
  createCase,
  createFiles,
  getAllFRs,
  getAllFileHeading,
  getAllFileRegister,
  getAllYear,
  getFileByRegisterById,
  getFreshReceiptById,
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
import ImageGallery from "react-image-gallery";
import Select from "react-select";
import TabComponent from "../../../../../../../../components/CustomComponents/TabBar";
import NoteEditor from "../../../../../../../../components/CustomComponents/DocEditor";
import DocParas from "../../../../../../../../components/CustomComponents/DocParas";

function AddEditFileCase() {
  const navigate = useNavigate();
  const userData = getUserData();
  const [headings, setHeadings] = useState([]);
  const location = useLocation();
  const { fileIdINRegister } = useContext(AuthContext);
  const [notingTabSubject, setNotingTabSubject] = useState("");
  const initialNotingTabData = [
    { title: 'Paragraph 1', description: 'Content for Paragraph 1' },
    { title: 'Paragraph 2', description: 'Content for Paragraph 2' },
    { title: 'Paragraph 3', description: 'Content for Paragraph 3' },
  ];

  const [notingTabData, setNotingTabsData] = useState(initialNotingTabData);

  // const handleEditorChange = (index, content) => {
  //   const updatedTabs = [...notingTabData];
  //   updatedTabs[index].description = content;
  //   setNotingTabsData(updatedTabs);
  // };

const handleEditorChange = (index, content, isNew = false) => {
    if (isNew) {
      setNotingTabsData([...notingTabData, { title: `Paragraph ${notingTabData.length + 1}`, description: content }]);
      setNotingData({ description: "" }); // Clear the editor after adding
    } else {
      const updatedTabs = notingTabData.map((tab, i) => (i === index ? { ...tab, description: content } : tab));
      setNotingTabsData(updatedTabs);
    }
  };

  // const [selectedTab, setSelectedTab] = useState(
  //   location.state?.frId ? "FR Noting" : "Noting"
  // );
  const [selectedTab, setSelectedTab] = useState("Noting");
  const [subSelectedTab, setSubSelectedTab] = useState(
    location?.state && location?.state?.freshReceiptsAttachments?.length > 0
      ? "FR"
      : "Sanction"
  );
  const [allFrs, setAllFrs] = useState([]);
  const [fkFreshReceiptId, setFkFreshReceiptId] = useState(null);
  const [fkfileId, setFKFileId] = useState(null);

  const fileInputRef = useRef(null);
  const UserData = getUserData();
  const [showSubButtonsCorrespondence, setShowSubButtonsCorrespondence] =
    useState(false);

  const toggleButtons = () => {
    setShowSubButtonsCorrespondence(true);
  };
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

  const [circular, setCircular] = useState({
    description: "",
    attachedFiles: [],
  });

  const [misc, setMIsc] = useState({
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

  const handleFileChangeCircular = (event) => {
    // Access the files from the event
    const files = event.target.files;
    // Convert the files object to an array
    const fileList = Array.from(files);
    // Store the selected files in state
    setCircular((prevState) => ({
      ...prevState,
      attachedFiles: [...prevState.attachedFiles, ...fileList],
    }));
  };

  const handleFileChangeMisc = (event) => {
    // Access the files from the event
    const files = event.target.files;
    // Convert the files object to an array
    const fileList = Array.from(files);
    // Store the selected files in state
    setMIsc((prevState) => ({
      ...prevState,
      attachedFiles: [...prevState.attachedFiles, ...fileList],
    }));
  };

  const hendleCreateFileCase = async () => {
    try {
      const formData = createFormData();
      const response = await createCase(
        fkfileId.value,
        UserData?.fkUserId,
        location.state?.frId ? location.state?.frId : null,
        formData
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
    // if(location.state?.frId){
    //   formData.append("fkFreshReceiptId", location.state?.frId);
    // }

    formData.append("cases[0][Note][description]", notingData.description);
    formData.append(
      "cases[0][Correspondence][description]",
      correspondenceData.description
    );
    formData.append("cases[0][Sanction][description]", sanction.description);
    formData.append("cases[0][Objection][description]", objection.description);
    formData.append("cases[0][Letter][description]", letter.description);
    formData.append("cases[0][Circular][description]", circular.description);
    formData.append("cases[0][Misc][description]", misc.description);

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
    if (circular.attachedFiles) {
      letter.attachedFiles.forEach((file, index) => {
        formData.append(`cases[0][Circular][sections][${index}]`, file);
      });
    }
    if (misc.attachedFiles) {
      letter.attachedFiles.forEach((file, index) => {
        formData.append(`cases[0][Misc][sections][${index}]`, file);
      });
    }
    if (correspondenceData.attachedFiles) {
      correspondenceData.attachedFiles.forEach((file, index) => {
        formData.append(`cases[0][Correspondence][sections][${index}]`, file);
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
      fetchCaseById(location.state?.caseId);
    }
    hendleGetAllFRs();
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

  const hendleGetAllFRs = async (item) => {
    try {
      const response = await getAllFRs(UserData?.fkBranchId);
      if (response?.success) {
        setAllFrs(response?.data);
      }
    } catch (error) {
      showErrorMessage(error.response?.data.message);
    }
  };
  const [registerData, setRegisterData] = useState([]);
  const getAllRegisterApi = async () => {
    try {
      const response = await getAllFileRegister(UserData?.fkBranchId, 0, 100);
      if (response.success) {
        setRegisterData(response?.data?.fileRegisters);
      }
    } catch (error) {
      // showErrorMessage(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getAllRegisterApi();
  }, []);

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
    getAllFiles();
  }, [])

  const images =
    location?.state?.freshReceiptsAttachments?.map((item) => ({
      original: `http://172.16.170.8:5252${item?.filename}`,
      thumbnail: `http://172.16.170.8:5252${item?.filename}`,
    })) || [];

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
                Select File
              </label>
              <Select
                options={
                  fileData &&
                  fileData?.map((item) => ({
                    value: item.id,
                    label: item.fileNumber,
                  }))
                }
                onChange={(selectedOptions) => setFKFileId(selectedOptions)}
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
                    setShowSubButtonsCorrespondence(false);
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
                    onClick={toggleButtons}
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
                {showSubButtonsCorrespondence && (
                  <div className="row">
                    <ul
                      className="nav nav-tabs mb-3 mt-3"
                      id="ex2"
                      role="tablist"
                    >
                      {location?.state &&
                        location?.state?.freshReceiptsAttachments?.length >
                          0 && (
                          <li
                            className="nav-item"
                            role="presentation"
                            onClick={() => {
                              clearInput();
                              setSubSelectedTab("FR");

                              // setSelectedTab("FR Noting");
                              // setSelectedTab("FR Noting");
                            }}
                          >
                            <button
                              type="button"
                              className={
                                subSelectedTab === "FR"
                                  ? "nav-link active"
                                  : "nav-link"
                              }
                              style={{ width: "170px" }}
                              data-bs-toggle="tab"
                              role="tab"
                              aria-controls="ex1-tabs-1"
                              aria-selected={
                                subSelectedTab === "FR" ? "true" : "false"
                              }
                            >
                              FR (
                              {
                                location?.state?.freshReceiptsAttachments
                                  ?.length
                              }
                              )
                            </button>
                          </li>
                        )}
                      <li
                        className="nav-item"
                        role="presentation"
                        onClick={() => {
                          clearInput();
                          setSubSelectedTab("Sanction");
                        }}
                      >
                        <button
                          type="button"
                          className={
                            subSelectedTab === "Sanction"
                              ? "nav-link active"
                              : "nav-link"
                          }
                          style={{ width: "170px" }}
                          data-bs-toggle="tab"
                          role="tab"
                          aria-controls="ex1-tabs-1"
                          aria-selected={
                            subSelectedTab === "Sanction" ? "true" : "false"
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
                          setSubSelectedTab("Objection");
                        }}
                      >
                        <button
                          type="button"
                          className={
                            subSelectedTab === "Objection"
                              ? "nav-link active"
                              : "nav-link"
                          }
                          style={{ width: "170px" }}
                          data-bs-toggle="tab"
                          role="tab"
                          aria-controls="ex1-tabs-2"
                          aria-selected={
                            subSelectedTab === "Objection" ? "true" : "false"
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
                          setSubSelectedTab("Letter");
                        }}
                      >
                        <button
                          type="button"
                          className={
                            subSelectedTab === "Letter"
                              ? "nav-link active"
                              : "nav-link"
                          }
                          style={{ width: "170px" }}
                          data-bs-toggle="tab"
                          role="tab"
                          aria-controls="ex1-tabs-2"
                          aria-selected={
                            subSelectedTab === "Letter" ? "true" : "false"
                          }
                        >
                          Letter
                        </button>
                      </li>
                      <li
                        className="nav-item"
                        role="presentation"
                        onClick={() => {
                          clearInput();
                          setSubSelectedTab("Circular");
                        }}
                      >
                        <button
                          type="button"
                          className={
                            subSelectedTab === "Circular"
                              ? "nav-link active"
                              : "nav-link"
                          }
                          style={{ width: "170px" }}
                          data-bs-toggle="tab"
                          role="tab"
                          aria-controls="ex1-tabs-1"
                          aria-selected={
                            subSelectedTab === "Circular" ? "true" : "false"
                          }
                        >
                          Circular
                        </button>
                      </li>
                      <li
                        className="nav-item"
                        role="presentation"
                        onClick={() => {
                          clearInput();
                          setSubSelectedTab("Misc");
                        }}
                      >
                        <button
                          type="button"
                          className={
                            subSelectedTab === "Misc"
                              ? "nav-link active"
                              : "nav-link"
                          }
                          style={{ width: "170px" }}
                          data-bs-toggle="tab"
                          role="tab"
                          aria-controls="ex1-tabs-1"
                          aria-selected={
                            subSelectedTab === "Misc" ? "true" : "false"
                          }
                        >
                          Misc
                        </button>
                      </li>
                    </ul>
                  </div>
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
          />
        </div>
      </div>

      <label className="form-label">Add new paragraph</label>
      <Editor
        onChange={(content) => setNotingData({ description: content })}
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
          onClick={() => handleEditorChange(null, notingData.description, true)}
        >
          {"Add"}
        </button>
      </div>
                  </div>
                ) : null}
                {subSelectedTab === "FR" && selectedTab === "Correspondence" ? (
                  <section>
                    {/* <iframe
                      src={`http://172.16.170.8:5252${location?.state?.freshReceiptsAttachments[0]?.filename}`}
                      style={{ width: "700px", height: "400px" }}
                      frameborder="0" 
                    ></iframe> */}
                    <section>
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
                    </section>
                  </section>
                ) : subSelectedTab === "Sanction" &&
                  selectedTab === "Correspondence" ? (
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
                                {sanction?.attachedFiles?.length > 0 && (
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
                                                onClick={() =>
                                                  hendleRemoveImage(file)
                                                }
                                              >
                                                x
                                              </a>
                                              <a
                                                href={
                                                  file?.id
                                                    ? `http://172.16.170.8:5252${file?.fileName}`
                                                    : URL.createObjectURL(file)
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                              >
                                                {file?.id
                                                  ? file?.fileName
                                                      ?.split("/")
                                                      .pop()
                                                  : file.name}
                                              </a>
                                            </div>
                                          );
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
                ) : subSelectedTab === "Objection" &&
                  selectedTab === "Correspondence" ? (
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
                                                onClick={() =>
                                                  hendleRemoveImage(file)
                                                }
                                              >
                                                x
                                              </a>
                                              <a
                                                href={
                                                  file?.id
                                                    ? `http://172.16.170.8:5252${file?.fileName}`
                                                    : URL.createObjectURL(file)
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                              >
                                                {file?.id
                                                  ? file?.fileName
                                                      ?.split("/")
                                                      .pop()
                                                  : file.name}
                                              </a>
                                            </div>
                                          );
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
                ) : subSelectedTab === "Letter" &&
                  selectedTab === "Correspondence" ? (
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
                                                onClick={() =>
                                                  hendleRemoveImage(file)
                                                }
                                              >
                                                x
                                              </a>
                                              <a
                                                href={
                                                  file?.id
                                                    ? `http://172.16.170.8:5252${file?.fileName}`
                                                    : URL.createObjectURL(file)
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                              >
                                                {file?.id
                                                  ? file?.fileName
                                                      ?.split("/")
                                                      .pop()
                                                  : file.name}
                                              </a>
                                            </div>
                                          );
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
                ) : subSelectedTab === "Circular" &&
                  selectedTab === "Correspondence" ? (
                  <section>
                    <label for="formFile" class="form-label mt-3">
                      Circular Data
                    </label>

                    <TinyEditor
                      initialContent={""}
                      setEditorContent={(content) =>
                        setCircular((prev) => ({
                          ...prev,
                          description: content,
                        }))
                      }
                      editorContent={circular.description}
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
                                  id="circular"
                                  name="circular"
                                  multiple
                                  onChange={(event) =>
                                    handleFileChangeCircular(event)
                                  }
                                  disabled={location.state?.view ? true : false}
                                />
                                {circular?.attachedFiles?.length > 0 && (
                                  <div>
                                    <label
                                      for="formFile"
                                      class="form-label mt-3 mb-0"
                                    >
                                      Attached Files
                                    </label>
                                    <ul>
                                      {circular?.attachedFiles?.map(
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
                                                onClick={() =>
                                                  hendleRemoveImage(file)
                                                }
                                              >
                                                x
                                              </a>
                                              <a
                                                href={
                                                  file?.id
                                                    ? `http://172.16.170.8:5252${file?.fileName}`
                                                    : URL.createObjectURL(file)
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                              >
                                                {file?.id
                                                  ? file?.fileName
                                                      ?.split("/")
                                                      .pop()
                                                  : file.name}
                                              </a>
                                            </div>
                                          );
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
                ) : subSelectedTab === "Misc" &&
                  selectedTab === "Correspondence" ? (
                  <section>
                    <label for="formFile" class="form-label mt-3">
                      Misc Data
                    </label>

                    <TinyEditor
                      initialContent={""}
                      setEditorContent={(content) =>
                        setMIsc((prev) => ({
                          ...prev,
                          description: content,
                        }))
                      }
                      editorContent={misc?.description}
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
                                  id="misc"
                                  name="misc"
                                  multiple
                                  onChange={(event) =>
                                    handleFileChangeMisc(event)
                                  }
                                  disabled={location.state?.view ? true : false}
                                />
                                {misc?.attachedFiles?.length > 0 && (
                                  <div>
                                    <label
                                      for="formFile"
                                      class="form-label mt-3 mb-0"
                                    >
                                      Attached Files
                                    </label>
                                    <ul>
                                      {misc?.attachedFiles?.map(
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
                                                onClick={() =>
                                                  hendleRemoveImage(file)
                                                }
                                              >
                                                x
                                              </a>
                                              <a
                                                href={
                                                  file?.id
                                                    ? `http://172.16.170.8:5252${file?.fileName}`
                                                    : URL.createObjectURL(file)
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                              >
                                                {file?.id
                                                  ? file?.fileName
                                                      ?.split("/")
                                                      .pop()
                                                  : file.name}
                                              </a>
                                            </div>
                                          );
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
