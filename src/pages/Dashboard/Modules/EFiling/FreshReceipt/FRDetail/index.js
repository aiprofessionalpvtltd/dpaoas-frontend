import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Header from "../../../../../../components/Header";
import { ToastContainer } from "react-toastify";
import moment from "moment";
import { getUserData } from "../../../../../../api/Auth";
import { Layout } from "../../../../../../components/Layout";
import thumbnail from "./../../../../../../assets/profile-img.jpg";
import { assiginFR, getFreshReceiptById } from "../../../../../../api/APIs/Services/efiling.service";
import { showErrorMessage, showSuccessMessage } from "../../../../../../utils/ToastAlert";
import { getLLEmployee } from "../../../../../../api/APIs/Services/organizational.service";
import { EfilingSideBarBranchItem, EfilingSideBarItem } from "../../../../../../utils/sideBarItems";





function FRDetail() {
  const location = useLocation();

  

  const [employeeData, setEmployeeData] = useState([]);
  const UserData = getUserData();
  const [filesData, setFilesData] = useState(null);
  const [viewPage, setViewPage] = useState(location?.state?.view);





  const [receptId, setreceptId] = useState(location?.state?.id);

  const [isModalOpen, setIsModalOpen] = useState(false);


  const [remarksData, setRemarksData] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [directorData, setDirectorData] = useState([]);

  const navigate = useNavigate();


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
      // CommentStatus: filesData ? filesData?.fileRemarks[0]?.CommentStatus : "",
      comment: "",
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      hendleassiginFr(values);
    },
  });

  const getFreashRecepitByIdApi = async () => {
    try {
      const response = await getFreshReceiptById(receptId);
      if (response.success) {
        setRemarksData(response?.data?.freshReceipt);
        setAttachments(response?.data?.freshReceiptsAttachments)
        // showSuccessMessage(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const hendleassiginFr = async (values) => {
     const data = {
        submittedBy : UserData?.fkUserId,
        assignedTo:Number(values?.assignedTo),
        CommentStatus:values?.CommentStatus,
        comment : values?.comment
     }
    try {
      const response = await assiginFR(receptId, data);
      if (response.success) {
        showSuccessMessage(response.message);
        setTimeout(() => {
          navigate("/efiling/dashboard/fresh-receipt");
        }, 1000)
      }
    } catch (error) {
     showErrorMessage(error?.response?.data?.message);
    }
  };

  const getEmployeeData = async () => {
    try {
      const response = await getLLEmployee(UserData?.fkUserId);
      if (response?.success) {
        setEmployeeData(response?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (receptId) {
      getFreashRecepitByIdApi();
      getEmployeeData();
    }
  }, []);


  const HandlePrint = async (urlimage) => {
    const url = `http://172.16.170.8:5252${urlimage}`;
    window.open(url, "_blank");
    // setPdfUrl(url)
  };

  return (
    <Layout centerlogohide={true} module={true} sidebarItems={UserData && UserData?.userType === "Officer" ? EfilingSideBarItem : EfilingSideBarBranchItem}>
      {/* <div className="dashboard-content"> */}
        <ToastContainer />
        <Header
          dashboardLink={"/efiling/dashboard"}
          addLink1={"/efiling/dashboard/fresh-receipt"}
          title1={"Fresh Receipts"}
          addLink2={"/efiling/dashboard/addedit"}
          title2={ "FR Detail" }
          width={"500px"}
        />

        {/* <EFilingModal
          title={"Add Remarks"}
          isOpen={isModalOpen}
          toggleModal={toggleModal}
        >
          <label>Remarks</label>
          <textarea
            style={{ display: "block", width: "100%" }}
            className="form-control"
          ></textarea>
          <div className="clearfix"></div>
          <label className=" mt-3">Assign</label>
          <select class="form-control">
            <option>Superintendent</option>
            <option>SO</option>
            <option>DG</option>
          </select>
        </EFilingModal> */}

        <div className="custom-editor">
          <div className="row">
            {/* <div className="col-md-2">
              <div className="noting">
                {directorData?.length > 0 ? (
                  directorData.map((item) => (
                    <div key={item.id}>
                      <p
                        style={{ marginBottom: "0px", fontWeight: "bold" }}
                      >{`${item?.submittedByUser?.employee?.departments?.departmentName} Branch`}</p>
                      <p
                        style={{ marginBottom: "0" }}
                      >{`Diary Number : ${item?.diaryNumber}`}</p>
                      <p style={{ marginBottom: "0" }}>
                        {moment(item?.createdAt).format("DD/MM/YYYY")}
                      </p>
                      <p>{moment(item?.createdAt).format("hh:mm A")}</p>
                    </div>
                  ))
                ) : (
                  <div
                    className="alert alert-danger mt-2"
                    role="alert"
                    style={{
                      width: "208px",
                      margin: "0 auto",
                      textAlign: "center",
                    }}
                  >
                    No data found
                  </div>
                )}
              </div>
            </div> */}
            <div className="col-md-8" style={{ marginLeft: 10 }}>
              <form onSubmit={formik.handleSubmit}>
                <div>
                  

                  <div class="row">
                    <div class="col">
                      <div class="mb-3">
                        <label class="form-label">Action</label>
                        <select
                          class="form-select"
                          id="CommentStatus"
                          name="CommentStatus"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.CommentStatus}
                          disabled={viewPage ? true : false}
                        >
                          <option value="" selected disabled hidden>
                            Select
                          </option>
                          <option value={"Initiated"}>Initiated</option>
                          <option value={"Submit For Approval"}>Submit For Approval</option>
                          <option value={"Retype/Amend"}>Retype/Amend</option>
                        </select>
                      </div>
                    </div>
                    <div class="col">
                      <div class="mb-3">
                        <label class="form-label">Mark To</label>
                        <select
                          class="form-select"
                          id="assignedTo"
                          name="assignedTo"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.assignedTo}
                          disabled={viewPage ? true : false}
                        >
                          <option value={""} selected disabled hidden>
                            Select
                          </option>
                          {employeeData &&
                            employeeData?.map((item) => (
                              <option
                                value={item.id}
                              >{`${item.designations?.designationName}`}</option>
                            ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col">
                      <div class="mb-3">
                        <label class="form-label">Remarks</label>
                        <textarea
                          class="form-control"
                          id="comment"
                          name="comment"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.comment}
                          disabled={viewPage ? true : false}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  {!viewPage && (
                  <div class="row mb-4">
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                      <button class="btn btn-primary" type="submit" disabled={viewPage ? true : false}>
                        Submit
                      </button>
                    </div>
                  </div>
                  )}

                  <div className="row">
  <div className="col-4">
    <label className="form-label" style={{ display: "block" }}>
      Attached Files
    </label>
    {attachments.length > 0 ? (
      attachments.map((item, index) => (
        <div className="MultiFile-label mt-3" key={index}>
          <span
            className="MultiFile-label"
            title={item?.filename
              ?.split("\\")
              .pop()
              .split("/")
              .pop()}
          >
            <span className="MultiFile-title">
              <a
                onClick={() => HandlePrint(item?.filename)}
                style={{ cursor: "pointer", color: 'blue' }}
              >
                - {item?.filename
                  ?.split("\\")
                  .pop()
                  .split("/")
                  .pop()}
              </a>
            </span>
          </span>
        </div>
      ))
    ) : (
      <div
        className="alert alert-danger mt-1"
        role="alert"
        style={{
          width: "350px",
          textAlign: "center",
        }}
      >
        No Attachments found
      </div>
    )}
  </div>
</div>


                  {/* <div className="row">
                    <div class="col-6">
                     
                      <label class="form-label" style={{ display: "block" }}>
                        Attached File
                      </label>
                      <span
                        class="MultiFile-label"
                        style={{ marginBottom: "18px", display: "block" }}
                        title={filesData?.attachment
                          ?.split("\\")
                          .pop()
                          .split("/")
                          .pop()}
                      >
                        <span class="MultiFile-title">
                          <a
                            href={`http://172.16.170.8:5252${filesData?.attachment}`}
                          >
                            {filesData?.attachment
                              ?.split("\\")
                              .pop()
                              .split("/")
                              .pop()}
                          </a>
                        </span>
                      </span>
                      
                    </div>
                  </div> */}

                 
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
            <div className="col-md-3" style={{ marginLeft: 40 }}>
              <div className="custom-editor-main" style={{ marginTop: 0 }}>
                <div className="comment-heading">
                  <h2>Remarks</h2>
                  {/* <a onClick={toggleModal}>
                    <button class="btn add-btn">
                      <FontAwesomeIcon style={{ marginRight: "-5px" }} icon={faPlus} size="md" width={24} /> Add
                    </button>
                  </a> */}
                </div>
                {remarksData?.length > 0 ? (
                  remarksData.map((item) => (
                    <>
                      {item?.comment !== null ? (
                        <div class="d-flex flex-row p-3">
                          <>
                            <img
                              style={{
                                marginBottom: "30px",
                                marginRight: "15px",
                              }}
                              src={thumbnail}
                              width="40"
                              height="40"
                              class="rounded-circle mr-3"
                            />
                            <div class="w-100" style={{ position: "relative" }}>
                              <div class="d-flex justify-content-between align-items-center">
                                <div class="d-flex flex-row align-items-center">
                                  <div style={{ float: "left" }}>
                                    <span class="mr-2">{`${item?.submittedUser?.employee?.firstName}  ${item?.submittedUser?.employee?.lastName}`}</span>
                                    <small
                                      style={{
                                        marginLeft: "0px",
                                        position: "absolute",
                                        top: "-21px",
                                      }}
                                      class="c-badge"
                                    >
                                      {
                                        item?.submittedUser?.employee
                                          ?.designations?.designationNam
                                      }
                                    </small>
                                  </div>
                                </div>
                                <div style={{ float: "right" }}>
                                  <small>
                                    {moment(item?.createdAt).format(
                                      "DD/MM/YYYY"
                                    )}
                                  </small>
                                  <small className="ms-2">
                                    {moment(item?.createdAt).format("hh:mm A")}
                                  </small>
                                </div>
                              </div>
                              <p class="text-justify comment-text mb-0">
                                {item?.comment}
                              </p>
                              <small
                                style={{
                                  marginBottom: "20px",
                                  width: "125px",
                                  background:
                                    item?.CommentStatus === "Approved"
                                      ? "green"
                                      : item?.CommentStatus === "Rejected"
                                        ? "red"
                                        : "grey",
                                }}
                                class="c-badge"
                              >
                                {item?.CommentStatus}
                              </small>
                            </div>
                          </>
                        </div>
                      ) : (
                        <div
                          class="alert alert-danger mt-5"
                          role="alert"
                          style={{
                            width: "350px",
                            margin: "0 auto",
                            textAlign: "center",
                          }}
                        >
                          No data found
                        </div>
                      )}
                    </>
                  ))
                ) : (
                  <div
                    class="alert alert-danger mt-5"
                    role="alert"
                    style={{
                      width: "350px",
                      margin: "0 auto",
                      textAlign: "center",
                    }}
                  >
                    No data found
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      {/* </div> */}
    </Layout>
  );
}

export default FRDetail;
