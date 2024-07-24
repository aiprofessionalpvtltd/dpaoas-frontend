import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { Layout } from "../../../../../../components/Layout";
import { EfilingSideBarBranchItem, EfilingSideBarItem } from "../../../../../../utils/sideBarItems";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faPlusSquare,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../../../../../../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {
  DeleteFreahReceptImage, 
  UpdateFreshReceipt,
  createFreshReceipt,
  createReceivedFromBranches,
  getFreshReceiptById,
  getReceivedFromBranches,
} from "../../../../../../api/APIs/Services/efiling.service";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "../../../../../../api/AuthContext";
import Select from "react-select";
import { getUserData } from "../../../../../../api/Auth";
import { TinyEditor } from "../../../../../../components/CustomComponents/Editor/TinyEditor";
import { Editor } from "../../../../../../components/CustomComponents/Editor";
import { Modal } from "react-bootstrap";
import { imagesUrl } from "../../../../../../api/APIs";
import moment from "moment";

const validationSchema = Yup.object().shape({
  // diaryNumber: Yup.string().required("Diary No is required"),
  // diaryDate: Yup.date().required("Diary Date is required"),
  // diaryTime: Yup.string().required("Diary Time is required"),
  frType: Yup.string().required("FR Type is required"),
  frSubject: Yup.string().required("Subject is required"),
  referenceNumber: Yup.string().required("Ref No is required"),
  // frDate: Yup.date().required("FR Date is required"),
  // freshReceipt: Yup.string().required("Attachment is required"),
});

const AddEditFR = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [receptId, setRecepitId] = useState(location?.state?.id);
  const [receiptData, setRecepitData] = useState([]);
  const [receivedFromData, setReceivedFrom] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [receivedMinistryData, setReceivedMinistryData] = useState("");

  const [descriptionData, setDescriptionData] = useState("");
  const { allBranchesData, ministryData } = useContext(AuthContext);
  const userData = getUserData()
  const formik = useFormik({
    initialValues: {
      // diaryNumber: "",
      // diaryDate: "",
      // diaryTime: "",
      frType: "",
      fkBranchId: "",
      fkExternalMinistryId: "",
      frSubject: "",
      referenceNumber: "",
      frDate: new Date(),
      shortDescription: "",
      freshReceipt: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (receptId) {
        UpdateFreshReceiptApi(values);
      } else {
        handleCreateFreshReceipt(values);
      }
    },
  });

  const handleFrTypeChange = (e) => {
    formik.setFieldValue("frType", e.target.value);
  };

  const handleCreateFreshReceipt = async (values) => {
    const formdata = new FormData();
    formdata.append("diaryType", "Incoming");
    // formdata.append("diaryNumber", values?.diaryNumber);
    // formdata.append("diaryDate", values?.diaryDate);
    // formdata.append("diaryTime", values?.diaryTime);
    formdata.append("frType", values?.frType);
    formdata.append("fkUserBranchId", userData?.fkBranchId);
    if (values?.fkBranchId) {
      formdata.append("fkBranchId", values?.fkBranchId?.value);
    }
    if (values?.fkExternalMinistryId) {
      formdata.append("fkExternalMinistryId", values?.fkExternalMinistryId?.value);
    }
    formdata.append("frSubject", values?.frSubject);
    formdata.append("referenceNumber", values?.referenceNumber);
    formdata.append("frDate", values?.frDate ? values?.frDate : new Date());
    formdata.append("shortDescription", descriptionData);
    //    formdata.append("freshReceipt", values?.freshReceipt)
    if (values?.freshReceipt) {
      Array.from(values?.freshReceipt).map((file, index) => {
        formdata.append("freshReceipt", file);
      });
    }

    try {
      const response = await createFreshReceipt(userData?.fkUserId ,formdata);
      console.log("response Create", response);
      if (response.success) {
        showSuccessMessage(response.message);
        formik.resetForm();
        setTimeout(() => {
          navigate("/efiling/dashboard/fresh-receipt");
        }, 1000);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  //Update Speach On Demand
  const UpdateFreshReceiptApi = async (values) => {
    const formdata = new FormData();
    formdata.append("diaryType", "Incoming");
    // formdata.append("diaryNumber", values?.diaryNumber);
    // formdata.append("diaryDate", values?.diaryDate);
    // formdata.append("diaryTime", values?.diaryTime);
    formdata.append("frType", values?.frType);
    if (values?.fkBranchId) {
      formdata.append("fkBranchId", values?.fkBranchId?.value);
    }
    if (values?.fkExternalMinistryId) {
      formdata.append("fkExternalMinistryId", values?.fkExternalMinistryId?.value);
    }
    formdata.append("frSubject", values?.frSubject);
    formdata.append("referenceNumber", values?.referenceNumber);
    formdata.append("frDate", values?.frDate ? values?.frDate : new Date());
    formdata.append("shortDescription", descriptionData);
    if (values?.freshReceipt) {
      Array.from(values?.freshReceipt).map((file, index) => {
        formdata.append("freshReceipt", file);
      });
    }
    //    formdata.append("freshReceipt", values?.freshReceipt)
    // console.log(values?.freshReceipt);
    // if (values?.freshReceipt) {
    //   Array.from(values?.freshReceipt).map((file, index) => {
    //     formdata.append("freshReceipt", file);
    //   });
    // }
    // console.log(receiptData?.freshReceiptsAttachments);
    // if (receiptData?.freshReceiptsAttachments.length > 0) {
    //   Array.from(receiptData?.freshReceiptsAttachments).map((file, index) => {
    //     formdata.append("freshReceipt", file?.id);
    //   });
    // }
    try {
      const response = await UpdateFreshReceipt(location.state.id, formdata);
      if (response.success) {
        showSuccessMessage(response.message);
        formik.resetForm();
        setTimeout(() => {
          navigate("/efiling/dashboard/fresh-receipt");
        }, 1000);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const getFreashRecepitByIdApi = async () => {
    try {
      const response = await getFreshReceiptById(receptId);
      if (response.success) {
        setRecepitData(response?.data);
        // showSuccessMessage(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const hendleRemoveImage = async (item) => {
    try {
      const response = await DeleteFreahReceptImage(item?.id);
      if (response?.success) {
        showSuccessMessage(response.message);
        getFreashRecepitByIdApi();
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  };

  const getReceivedFromApi = async () => {
    try {
      const response = await getReceivedFromBranches();
      if (response.success) {
        setReceivedFrom(response?.data?.externalMinistries);
        // showSuccessMessage(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleReceivedFrom = async () => {
    const data = {
      receivedFrom: receivedMinistryData
    }

    try {
      const response = await createReceivedFromBranches(data);
      showSuccessMessage(response.message);
      getReceivedFromApi();
      setReceivedMinistryData("");
      formik.setFieldValue("frType", "External");
      setShowModal(false);
    } catch (error) {
      setShowModal(false);
      showErrorMessage(error?.response?.data?.message);
    }
  }

  useEffect(() => {
    if (receptId) {
      getFreashRecepitByIdApi();
    }
    getReceivedFromApi();
  }, []);
  useEffect(() => {
    // Update form values when termsById changes
    setDescriptionData(receiptData?.shortDescription)
    if (receiptData) {
      formik.setValues({
        fkBranchId: receiptData?.branches
          ? {
              value: receiptData?.branches?.id,
              label: receiptData?.branches?.branchName,
            }
          : "",
        // diaryNumber: receiptData
        //   ? receiptData?.freshReceiptDiaries?.diaryNumber
        //   : "",
        fkExternalMinistryId: receiptData?.ministries
          ? {
              value: receiptData?.ministries?.id,
              label: receiptData?.ministries?.ministryName,
            }
          : "",
        // diaryDate:
        //   receiptData && receiptData?.freshReceiptDiaries
        //     ? new Date(receiptData?.freshReceiptDiaries?.diaryDate)
        //     : "",
        // diaryTime:
        //   receiptData && receiptData?.freshReceiptDiaries
        //     ? receiptData?.freshReceiptDiaries?.diaryTime
        //     : "",
        referenceNumber: receiptData ? receiptData?.referenceNumber : "",
        frDate:
          receiptData && receiptData?.frDate
            ? new Date(receiptData?.frDate)
            : "",
        frType: receiptData ? receiptData?.frType : "",
        frSubject: receiptData ? receiptData?.frSubject : "",
      });
    }
  }, [receiptData, formik.setValues]);

  const HandlePrint = async (urlimage) => {
    const url = `${imagesUrl}${urlimage}`;
    window.open(url, "_blank");
    // setPdfUrl(url)
  };
  return (
    <Layout
      module={false}
      sidebarItems={userData && userData?.userType === "Officer" ? EfilingSideBarItem : EfilingSideBarBranchItem}
      centerlogohide={true}
    >
      {/* <Header
        dashboardLink={"/"}
        title1={"Fresh Receipts"}
        addLink1={"/efiling/dashboard/fresh-receipt"}
        title2={location.state?.id ? "Edit Fresh Receipt" : "Add Fresh Receipt"}
        addLink2={"/efiling/dashboard/fresh-receipt/addedit"}
      /> */}
      <ToastContainer />

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <div>
            <Modal.Header closeButton>
              <Modal.Title>
                Add External Branch
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="mb-3">
                <label htmlFor="receivedMinistryData" className="form-label">
                  Add External Branch 
                </label>
                <input
                  type="text"
                  id="receivedMinistryData"
                  value={receivedMinistryData}
                  onChange={(e) => setReceivedMinistryData(e.target.value)}
                  className="form-control"
                />
              </div>
            </Modal.Body>

            <Modal.Footer>
              <button className="btn btn-primary" type="submit" onClick={() => handleReceivedFrom()}>
                Add
              </button>
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

      <div className="container-fluid">
        <div className="card">
          <div class="card-header red-bg" style={{ background: "#14ae5c" }}>
            <h1>Fresh Receipts</h1>
          </div>

          <div className="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div className="row">
                {/* <div className="col-3">
                  <div className="mb-3">
                    <label htmlFor="diaryNumber" className="form-label">
                      Diary No
                    </label>
                    <input
                      className={`form-control ${
                        formik.touched.diaryNumber && formik.errors.diaryNumber
                          ? "is-invalid"
                          : ""
                      }`}
                      type="text"
                      id="diaryNumber"
                      value={formik.values.diaryNumber}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.diaryNumber &&
                      formik.errors.diaryNumber && (
                        <div className="invalid-feedback">
                          {formik.errors.diaryNumber}
                        </div>
                      )}
                  </div>
                </div> */}
{/* 
                <div class="col-3">
                  <div class="mb-3" style={{ position: "relative" }}>
                    <label class="form-label">Diary Date</label>
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
                      //   minDate={new Date()}
                      selected={formik.values.diaryDate}
                      onChange={(date) =>
                        formik.setFieldValue("diaryDate", date)
                      }
                      className={`form-control ${
                        formik.touched.diaryDate && formik.errors.diaryDate
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    {formik.touched.diaryDate && formik.errors.diaryDate && (
                      <div
                        className="invalid-feedback"
                        style={{ display: "block" }}
                      >
                        {formik.errors.diaryDate}
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-3">
                  <div className="mb-3">
                    <label className="form-label">Diary Time</label>
                    <TimePicker
                      value={formik.values.diaryTime}
                      clockIcon={null} // Disable clock view
                      openClockOnFocus={false}
                      format="hh:mm a"
                      onChange={(time) =>
                        formik.setFieldValue("diaryTime", time)
                      }
                      className={`form-control ${
                        formik.touched.diaryTime && formik.errors.diaryTime
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    {formik.touched.diaryTime && formik.errors.diaryTime && (
                      <div className="invalid-feedback">
                        {formik.errors.diaryTime}
                      </div>
                    )}
                  </div>
                </div> */}

                <div className="col-6">
                  <div className="mb-3">
                    <label htmlFor="frSubject" className="form-label">
                      Subject
                    </label>
                    <input
                      className={`form-control ${
                        formik.touched.frSubject && formik.errors.frSubject
                          ? "is-invalid"
                          : ""
                      }`}
                      type="text"
                      id="frSubject"
                      value={formik.values.frSubject}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.frSubject && formik.errors.frSubject && (
                      <div className="invalid-feedback">
                        {formik.errors.frSubject}
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-3">
        <div className="mb-3" style={{ position: 'relative' }}>
          <label className="form-label">FR Date</label>
          <span
            style={{
              position: 'absolute',
              right: '15px',
              top: '36px',
              zIndex: 1,
              fontSize: '20px',
              color: '#666',
            }}
          >
            <FontAwesomeIcon icon={faCalendarAlt} />
          </span>
          <DatePicker
            selected={formik.values.frDate ? formik.values.frDate : new Date()}
            onChange={(date) => formik.setFieldValue('frDate', date)}
            className={`form-control ${
              formik.touched.frDate && formik.errors.frDate ? 'is-invalid' : ''
            }`}
          />
          {formik.touched.frDate && formik.errors.frDate && (
            <div className="invalid-feedback" style={{ display: 'block' }}>
              {formik.errors.frDate}
            </div>
          )}
        </div>
      </div>

                <div className="col-3">
                  <label htmlFor="referenceNumber" className="form-label">
                    Ref No
                  </label>
                  <input
                    type="text"
                    id="referenceNumber"
                    value={formik.values.referenceNumber}
                    onChange={formik.handleChange}
                    className={`form-control ${
                      formik.touched.referenceNumber &&
                      formik.errors.referenceNumber
                        ? "is-invalid"
                        : ""
                    }`}
                  />
                  {formik.touched.referenceNumber &&
                    formik.errors.referenceNumber && (
                      <div className="invalid-feedback">
                        {formik.errors.referenceNumber}
                      </div>
                    )}
                </div>
              </div>

              <div className="row">  
              <div className="col-3">
                  <div className="mb-3">
                    <label htmlFor="freshReceipt" className="form-label">
                      Attachment
                    </label>
                    <input
                      className={`form-control`}
                      type="file"
                      accept=".pdf, .jpg, .jpeg, .png"
                      id="freshReceipt"
                      name="freshReceipt"
                      multiple
                      onChange={(event) => {
                        formik.setFieldValue(
                          "freshReceipt",
                          event.currentTarget.files
                        );
                      }}
                    />

                    {receiptData &&
                      receiptData?.freshReceiptsAttachments?.map((item) => (
                        <div class="MultiFile-label mt-3">
                          <a
                            class="MultiFile-remove"
                            style={{
                              marginRight: "10px",
                              color: "red",
                              cursor: "pointer",
                            }}
                            onClick={() => hendleRemoveImage(item)}
                          >
                            x
                          </a>
                          <span
                            class="MultiFile-label"
                            title={item?.filename
                              ?.split("\\")
                              .pop()
                              .split("/")
                              .pop()}
                          >
                            <span class="MultiFile-title">
                              <a
                                onClick={() => HandlePrint(item?.filename)}
                                style={{ cursor: "pointer" }}
                              >
                                {item?.filename
                                  ?.split("\\")
                                  .pop()
                                  .split("/")
                                  .pop()}
                              </a>
                            </span>
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
                      
                
                <div className=" mb-3 col-3">
                  <label htmlFor="frType" className="form-label">
                    FR Type
                  </label>
                  <select
                    id="frType"
                    className={`form-select ${
                      formik.touched.frType && formik.errors.frType
                        ? "is-invalid"
                        : ""
                    }`}
                    value={formik.values.frType}
                    onChange={handleFrTypeChange}
                  >
                    <option value="">Select FreshReceipt</option>
                    <option value="Senate Secretariat">Senate Secretariat</option>
                    <option value="External">External</option>
                  </select>
                  {formik.touched.frType && formik.errors.frType && (
                    <div className="invalid-feedback">
                      {formik.errors.frType}
                    </div>
                  )}
                </div>
                {formik.values.frType === "Senate Secretariat" && (
                  <div className="mb-3 col-3">
                    <label htmlFor="fkBranchId" className="form-label">
                      Branch Name
                    </label>
                    <Select
                      options={
                        allBranchesData &&
                        allBranchesData?.map((item) => ({
                          value: item?.id,
                          label: item?.branchName,
                        }))
                      }
                      onChange={(selectedOptions) => {
                        formik.setFieldValue("fkBranchId", selectedOptions);
                      }}
                      onBlur={formik.handleBlur}
                      value={formik.values.fkBranchId}
                      name="fkBranchId"
                      // isClearable={true}
                      
                    />
                  </div>
                )}
                {formik.values.frType === "External" && (
                  <>
                  <div className="mb-3 col-5">
                    <div className="row">
                      <div className="col">
                        <label htmlFor="fkExternalMinistryId" className="form-label">
                          Received From
                        </label>
                        <Select
                          options={
                            receivedFromData &&
                            receivedFromData?.map((item) => ({
                              value: item?.id,
                              label: item?.receivedFrom,
                            }))
                          }
                          onChange={(selectedOptions) => {
                            formik.setFieldValue("fkExternalMinistryId", selectedOptions);
                          }}
                          onBlur={formik.handleBlur}
                          value={formik.values.fkExternalMinistryId}
                          name="fkExternalMinistryId"
                          // isClearable={true}
                          // className={`form-select`}
                        />
                      </div>

                      <div className="col">
                        <FontAwesomeIcon
                          icon={faPlusSquare}
                          style={{
                            fontSize: "30px",
                            color: "#14ae5c",
                            cursor: "pointer",
                            marginTop: "33px",
                          }}
                          onClick={() => setShowModal(true)}
                        />
                      </div>

                    </div>
                  </div>

                  </>
                )}

              </div>

              <div class="row">
                <div class="col-9">
                  <label className="form-label">F.R Detail</label>
                  <Editor
                    onChange={(content) =>
                      setDescriptionData(content)
                    }
                    value={descriptionData}
                    // width={"100%"}
                    display={"flex"}
                  />
                </div>
              </div>

              <div class="row mt-4">
                <div class="col">
                  <button class="btn btn-primary float-end" type="submit">
                    {receptId ? "Update Fresh Receipt" : "Create Fresh Receipt"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddEditFR;
