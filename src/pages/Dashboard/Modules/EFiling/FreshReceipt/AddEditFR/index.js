import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { Layout } from "../../../../../../components/Layout";
import { EfilingSideBarBranchItem, EfilingSideBarItem } from "../../../../../../utils/sideBarItems";
import Header from "../../../../../../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {
  DeleteFreahReceptImage,
  UpdateFreshReceipt,
  createFreshReceipt,
  getFreshReceiptById,
} from "../../../../../../api/APIs/Services/efiling.service";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "../../../../../../api/AuthContext";
import Select from "react-select";
import { getUserData } from "../../../../../../api/Auth";
import { TinyEditor } from "../../../../../../components/CustomComponents/Editor/TinyEditor";

const validationSchema = Yup.object().shape({
  // diaryNumber: Yup.string().required("Diary No is required"),
  // diaryDate: Yup.date().required("Diary Date is required"),
  // diaryTime: Yup.string().required("Diary Time is required"),
  frType: Yup.string().required("FR Type is required"),
  frSubject: Yup.string().required("Subject is required"),
  referenceNumber: Yup.string().required("Ref No is required"),
  frDate: Yup.date().required("FR Date is required"),
  // freshReceipt: Yup.string().required("Attachment is required"),
});

const AddEditFR = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [receptId, setRecepitId] = useState(location?.state?.id);
  const [receiptData, setRecepitData] = useState([]);
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
      fkMinistryId: "",
      frSubject: "",
      referenceNumber: "",
      frDate: "",
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
    if (values?.fkMinistryId) {
      formdata.append("fkMinistryId", values?.fkMinistryId?.value);
    }
    formdata.append("frSubject", values?.frSubject);
    formdata.append("referenceNumber", values?.referenceNumber);
    formdata.append("frDate", values?.frDate);
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
    if (values?.fkMinistryId) {
      formdata.append("fkMinistryId", values?.fkMinistryId?.value);
    }
    formdata.append("frSubject", values?.frSubject);
    formdata.append("referenceNumber", values?.referenceNumber);
    formdata.append("frDate", values?.frDate);
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

  useEffect(() => {
    if (receptId) {
      getFreashRecepitByIdApi();
    }
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
        fkMinistryId: receiptData?.ministries
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
    const url = `http://172.16.170.8:5252${urlimage}`;
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
                    <option value="Internal">Internal</option>
                    <option value="External">External</option>
                  </select>
                  {formik.touched.frType && formik.errors.frType && (
                    <div className="invalid-feedback">
                      {formik.errors.frType}
                    </div>
                  )}
                </div>
                {formik.values.frType === "Internal" && (
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
                  <div className="mb-3 col-3">
                    <label htmlFor="fkMinistryId" className="form-label">
                      Ministry Name
                    </label>
                    <Select
                      options={
                        ministryData &&
                        ministryData?.map((item) => ({
                          value: item?.id,
                          label: item?.ministryName,
                        }))
                      }
                      onChange={(selectedOptions) => {
                        formik.setFieldValue("fkMinistryId", selectedOptions);
                      }}
                      onBlur={formik.handleBlur}
                      value={formik.values.fkMinistryId}
                      name="fkMinistryId"
                      // isClearable={true}
                      // className={`form-select`}
                    />
                  </div>
                )}
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
                      
                <div className="col-3">
                  <label htmlFor="referenceNumber" className="form-label">
                    Ref No
                  </label>
                  <input
                    type="number"
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

                <div class="col-3">
                  <div class="mb-3" style={{ position: "relative" }}>
                    <label class="form-label">FR Date</label>
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
                      selected={formik.values.frDate}
                      onChange={(date) => formik.setFieldValue("frDate", date)}
                      className={`form-control ${
                        formik.touched.frDate && formik.errors.frDate
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    {formik.touched.frDate && formik.errors.frDate && (
                      <div
                        className="invalid-feedback"
                        style={{ display: "block" }}
                      >
                        {formik.errors.frDate}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-9">
                  <label className="form-label">F.R Detail</label>
                  <TinyEditor
                      initialContent={""}
                      setEditorContent={(content) =>
                        setDescriptionData(content)
                      }
                      editorContent={descriptionData}
                      multiLanguage={false}
                    />
                </div>
              </div>

              <div class="row mt-2">
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
