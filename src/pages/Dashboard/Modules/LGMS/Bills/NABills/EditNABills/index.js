import React, { useEffect, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import { useFormik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import { AuthContext } from "../../../../../../../api/AuthContext";
import { Layout } from "../../../../../../../components/Layout";
import { LegislationSideBarItems } from "../../../../../../../utils/sideBarItems";
import {
  AllManageCommitties,
  UpdateNABill,
  getAllBillStatus,
  getAllMNALists,
  getSingleNABillByID,
} from "../../../../../../../api/APIs/Services/LegislationModule.service";
import moment from "moment";
import { showSuccessMessage } from "../../../../../../../utils/ToastAlert";
import { getUserData } from "../../../../../../../api/Auth";
import { ToastContainer } from "react-toastify";

const UpdateBills = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userData = getUserData();
  const NA_Bill_ID = location?.state;
  const { ministryData, members, sessions, parliamentaryYear } =
    useContext(AuthContext);
  const [billStatusData, setBillStatusesData] = useState([]);

  const [MNAData, setMNAData] = useState([]);
  const [singleSenateBillData, setSingleSenateBillData] = useState([]);
  const [committieeData, setCommittieData] = useState([]);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isIntroducedCalendarOpen, setIntroducedCalendarOpen] = useState(false);
  const [isDateofReciptCalendarOpen, setIsDateofReciptCalendarOpen] =
    useState(false);
  const [isReferredCalendarOpen, setReferredCalendarOpen] = useState(false);
  const [isReportPresentationCalendarOpen, setReportPresentationCalendarOpen] =
    useState(false);
  const [isPassageCalendarOpen, setPassageCalendarOpen] = useState(false);
  const [isPassageSenateCalendarOpen, setPassageSenateCalendarOpen] =
    useState(false);
  const [isTransmissionDateCalendarOpen, setTransmissionDateCalendarOpen] =
    useState(false);

  const [isconsiderationDateCalendarOpen, setConsiderationDateCalendarOpen] =
    useState(false);
  const [isRecepitMesageDateCalendarOpen, setRecepitMesageDateCalendarOpen] =
    useState(false);
  const [isPassageByNADateCalendarOpen, setPassageByNADateCalendarOpen] =
    useState(false);
  const [isDocomentDateCalendarOpen, setDocomentDateCalendarOpen] =
    useState(false);

  const GetAllCommittiesApi = async () => {
    try {
      const response = await AllManageCommitties(0, 500);

      if (response?.success) {
        setCommittieData(response?.data?.manageCommittees);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Getting All MNA
  const getAllMNA = async () => {
    try {
      const response = await getAllMNALists(0, 500);

      if (response?.success) {
        setMNAData(response?.data?.mnas);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllBillStatusData = async () => {
    try {
      const response = await getAllBillStatus(0, 500);

      if (response?.success) {
        setBillStatusesData(response?.data?.billStatus);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllMNA();
    GetAllCommittiesApi();
    getAllBillStatusData();
  }, []);
  const formik = useFormik({
    initialValues: {
      // Define your initial form values here
      fkParliamentaryYearId: "",
      fkSessionId: "",
      billCategory: "",
      billType: "",
      fileNumber: "",
      PassedByNADate: "",
      DateOfReceiptOfMessageFromNA: "",
      billTitle: "",
      fkBillStatus: "",
      senateBillSenatorMovers: [],
      senateBillMnaMovers: [],
      senateBillMinistryMovers: [],
      introducedInHouses: "",
      fkManageCommitteeId: "",
      referedOnDate: "",
      committeeRecomendation: "",
      reportPresentationDate: "",
      fkMemberPassageId: "",
      memeberNoticeDate: "",
      dateOfConsiderationBill: "",
      fkSessionMemberPassageId: "",
      dateOfPassageBySenate: "",
      dateOfTransmissionToNA: "",
      dateOfReceiptMessageFromNA: "",
      dateOfPassageByNA: "",
      documentDiscription: "",
      documentDate: "",
      documentType: "",
      file: "",
    },

    onSubmit: (values) => {
      UpdateNationalAssemblyBill(values);
      console.log(values);
    },
  });
  const handleCalendarToggle = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };
  // Handale DateCHange
  const handleDateSelect = (date) => {
    formik.setFieldValue("PassedByNADate", date);
    setIsCalendarOpen(false);
  };

  // Handle Claneder Toggel
  const handleReciptCalendarToggle = () => {
    setIsDateofReciptCalendarOpen(!isDateofReciptCalendarOpen);
  };
  // Handale DateCHange
  const handleReciptDateSelect = (date) => {
    formik.setFieldValue("DateOfReceiptOfMessageFromNA", date);
    setIsDateofReciptCalendarOpen(false);
  };

  const handleIntroducedCalendarToggle = () => {
    setIntroducedCalendarOpen(!isIntroducedCalendarOpen);
  };
  // Handale DateCHange
  const handleIntroducedDateSelect = (date) => {
    formik.setFieldValue("introducedInHouses", date);
    setIntroducedCalendarOpen(false);
  };

  const handleReferredCalendarToggle = () => {
    setReferredCalendarOpen(!isReferredCalendarOpen);
  };
  // Handale DateCHange
  const handleReferredDateSelect = (date) => {
    formik.setFieldValue("referedOnDate", date);
    setReferredCalendarOpen(false);
  };

  const handleReportPresenatationDayCalendarToggle = () => {
    setReportPresentationCalendarOpen(!isReportPresentationCalendarOpen);
  };
  // Handale DateCHange
  const handleReportPresenatationDateSelect = (date) => {
    formik.setFieldValue("reportPresentationDate", date);
    setReportPresentationCalendarOpen(false);
  };

  const handlePassageCalendarToggle = () => {
    setPassageCalendarOpen(!isPassageCalendarOpen);
  };
  // Handale DateCHange
  const handlePassageDateSelect = (date) => {
    formik.setFieldValue("memeberNoticeDate", date);
    setPassageCalendarOpen(false);
  };

  const handlePassageSenateCalendarToggle = () => {
    setPassageSenateCalendarOpen(!isPassageSenateCalendarOpen);
  };
  // Handale DateCHange
  const handlePassageSenateDateSelect = (date) => {
    formik.setFieldValue("dateOfPassageBySenate", date);
    setPassageSenateCalendarOpen(false);
  };

  const handleTransmissionCalendarToggle = () => {
    setTransmissionDateCalendarOpen(!isTransmissionDateCalendarOpen);
  };
  // Handale DateCHange
  const handleTransmissionDateSelect = (date) => {
    formik.setFieldValue("dateOfTransmissionToNA", date);
    setTransmissionDateCalendarOpen(false);
  };

  const handleConsiderationCalendarToggle = () => {
    setConsiderationDateCalendarOpen(!isconsiderationDateCalendarOpen);
  };
  // Handale DateCHange
  const handleconsiderationDateSelect = (date) => {
    formik.setFieldValue("dateOfConsiderationBill", date);
    setConsiderationDateCalendarOpen(false);
  };

  const handleRecepitMesageCalendarToggle = () => {
    setRecepitMesageDateCalendarOpen(!isRecepitMesageDateCalendarOpen);
  };
  // Handale DateCHange
  const handleRecepitMesageDateSelect = (date) => {
    formik.setFieldValue("dateOfReceiptMessageFromNA", date);
    setRecepitMesageDateCalendarOpen(false);
  };

  const handlePassageByNACalendarToggle = () => {
    setPassageByNADateCalendarOpen(!isPassageByNADateCalendarOpen);
  };
  // Handale DateCHange
  const handlePassageByNADateSelect = (date) => {
    formik.setFieldValue("dateOfPassageByNA", date);
    setPassageByNADateCalendarOpen(false);
  };

  const handleDocomentDateCalendarToggle = () => {
    setDocomentDateCalendarOpen(!isDocomentDateCalendarOpen);
  };
  // Handale DateCHange

  const handleDocumentDateSelect = (date) => {
    formik.setFieldValue("documentDate", date);
    setDocomentDateCalendarOpen(false);
  };
  // Get Single Record
  const getNABillByIdApi = async () => {
    try {
      const response = await getSingleNABillByID(NA_Bill_ID && NA_Bill_ID);
      console.log("response by single NA BIll", response);
      if (response?.success) {
        setSingleSenateBillData(response?.data[0]);
      }
    } catch (error) {
      // showErrorMessage(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    if (NA_Bill_ID) {
      getNABillByIdApi();
    }
  }, []);

  useEffect(() => {
    if (singleSenateBillData) {
      formik.setValues({
        fkParliamentaryYearId:
          singleSenateBillData?.fkParliamentaryYearId || "",
        fkSessionId: singleSenateBillData?.fkSessionId || "",
        billCategory: singleSenateBillData?.billCategory || "",
        billType: singleSenateBillData?.billType || "",
        // billStatuses: singleSenateBillData?.billStatuses || "",
        fileNumber: singleSenateBillData?.fileNumber || "",
        PassedByNADate: singleSenateBillData?.PassedByNADate
          ? moment(singleSenateBillData?.PassedByNADate).toDate()
          : null,
        DateOfReceiptOfMessageFromNA:
          singleSenateBillData?.DateOfReceiptOfMessageFromNA
            ? moment(
                singleSenateBillData?.DateOfReceiptOfMessageFromNA
              ).toDate()
            : null,
        billTitle: singleSenateBillData?.billTitle || "",
        senateBillSenatorMovers: singleSenateBillData?.senateBillSenatorMovers
          ? singleSenateBillData?.senateBillSenatorMovers.map((senator) => ({
              value: senator?.member?.id,
              label: senator?.member?.memberName,
            }))
          : [],
          fkBillStatus: singleSenateBillData?.billStatuses &&
          {
            value: singleSenateBillData?.billStatuses?.id,
            label: singleSenateBillData?.billStatuses?.billStatusName,
          }
        || "",
        senateBillMnaMovers: singleSenateBillData?.senateBillMnaMovers
          ? singleSenateBillData?.senateBillMnaMovers.map((senator) => ({
              value: senator?.mna?.id,
              label: senator?.mna?.mnaName,
            }))
          : [],
        senateBillMinistryMovers: singleSenateBillData?.senateBillMinistryMovers
          ? singleSenateBillData?.senateBillMinistryMovers.map((senator) => ({
              value: senator?.ministrie?.id,
              label: senator?.ministrie?.ministryName,
            }))
          : [],
        introducedInHouses:
          singleSenateBillData?.introducedInHouses &&
          singleSenateBillData?.introducedInHouses?.introducedInHouseDate
            ? moment(
                singleSenateBillData?.introducedInHouses?.introducedInHouseDate
              ).toDate()
            : null,
        referedOnDate:
          singleSenateBillData?.introducedInHouses &&
          singleSenateBillData?.introducedInHouses?.referedOnDate
            ? moment(
                singleSenateBillData?.introducedInHouses?.referedOnDate
              ).toDate()
            : null,
        fkManageCommitteeId: singleSenateBillData?.introducedInHouses
          ? singleSenateBillData?.introducedInHouses?.fkManageCommitteeId
          : "",

        committeeRecomendation: singleSenateBillData?.introducedInHouses
          ? singleSenateBillData?.introducedInHouses?.committeeRecomendation
          : "",
        reportPresentationDate: singleSenateBillData?.introducedInHouses
          ?.reportPresentationDate
          ? moment(
              singleSenateBillData?.introducedInHouses?.reportPresentationDate
            ).toDate()
          : "",
        fkMemberPassageId: singleSenateBillData?.memberPassages
          ? singleSenateBillData?.memberPassages?.fkMemberPassageId
          : "",
        memeberNoticeDate: singleSenateBillData?.memberPassages
          ?.memeberNoticeDate
          ? moment(
              singleSenateBillData?.memberPassages?.memeberNoticeDate
            ).toDate()
          : "",
        dateOfConsiderationBill:
          singleSenateBillData?.memberPassages &&
          singleSenateBillData?.memberPassages?.dateOfConsiderationBill
            ? moment(
                singleSenateBillData?.memberPassages?.dateOfConsiderationBill
              ).toDate()
            : "",
        fkSessionMemberPassageId: singleSenateBillData?.memberPassages
          ? singleSenateBillData?.memberPassages?.fkSessionMemberPassageId
          : "",
        dateOfPassageBySenate: singleSenateBillData?.dateOfPassageBySenate
          ? moment(singleSenateBillData?.dateOfPassageBySenate).toDate()
          : "",
        dateOfTransmissionToNA: singleSenateBillData?.dateOfTransmissionToNA
          ? moment(singleSenateBillData?.dateOfTransmissionToNA).toDate()
          : "",
        dateOfReceiptMessageFromNA:
          singleSenateBillData?.dateOfReceiptMessageFromNA
            ? moment(singleSenateBillData?.dateOfReceiptMessageFromNA).toDate()
            : "",
        dateOfPassageByNA: singleSenateBillData?.dateOfPassageByNA
          ? moment(singleSenateBillData?.dateOfPassageByNA).toDate()
          : "",
        documentDiscription: singleSenateBillData?.billDocuments
          ? singleSenateBillData?.billDocuments?.documentDiscription
          : "",
        documentDate:
          singleSenateBillData?.billDocuments &&
          singleSenateBillData?.billDocuments?.documentDate
            ? moment(singleSenateBillData?.billDocuments?.documentDate).toDate()
            : "",
        documentType: singleSenateBillData?.billDocuments
          ? singleSenateBillData?.billDocuments?.documentType
          : "",
      });
    }
  }, [singleSenateBillData, formik.setValues]);

  const UpdateNationalAssemblyBill = async (values) => {
    const formData = new FormData();
    formData.append("fkParliamentaryYearId", values?.fkParliamentaryYearId);
    formData.append("fkSessionId", values?.fkSessionId);
    formData.append("billCategory", values?.billCategory);
    formData.append("billType", values?.billType);
    formData.append("fkBillStatus", values?.fkBillStatus?.value);
    formData.append("fileNumber", values?.fileNumber);
    formData.append("PassedByNADate", values?.PassedByNADate);
    formData.append(
      "DateOfReceiptOfMessageFromNA",
      values?.DateOfReceiptOfMessageFromNA
    );
    formData.append("fkUserId", userData && userData?.id);
    formData.append("billTitle", values?.billTitle);
    if (values?.introducedInHouses) {
      formData.append("introducedInHouses", values?.introducedInHouses);
    }
    if (values?.fkManageCommitteeId) {
      formData.append("fkManageCommitteeId", values?.fkManageCommitteeId);
    }
    if (values?.referedOnDate) {
      formData.append("referedOnDate", values?.referedOnDate);
    }
    if (values?.committeeRecomendation) {
      formData.append("committeeRecomendation", values?.committeeRecomendation);
    }
    if (values?.reportPresentationDate) {
      formData.append("reportPresentationDate", values?.reportPresentationDate);
    }
    if (values?.fkMemberPassageId) {
      formData.append("fkMemberPassageId", values?.fkMemberPassageId);
    }
    if (values?.memeberNoticeDate) {
      formData.append("memeberNoticeDate", values?.memeberNoticeDate);
    }
    if (values?.dateOfConsiderationBill) {
      formData.append(
        "dateOfConsiderationBill",
        values?.dateOfConsiderationBill
      );
    }
    if (values?.fkSessionMemberPassageId) {
      formData.append(
        "fkSessionMemberPassageId",
        values?.fkSessionMemberPassageId
      );
    }
    if (values?.dateOfPassageBySenate) {
      formData.append("dateOfPassageBySenate", values?.dateOfPassageBySenate);
    }
    if (values?.dateOfTransmissionToNA) {
      formData.append("dateOfTransmissionToNA", values?.dateOfTransmissionToNA);
    }
    if (values?.dateOfReceiptMessageFromNA) {
      formData.append(
        "dateOfReceiptMessageFromNA",
        values?.dateOfReceiptMessageFromNA
      );
    }
    if (values?.dateOfPassageByNA) {
      formData.append("dateOfPassageByNA", values?.dateOfPassageByNA);
    }
    if (values?.documentDiscription) {
      formData.append("documentDiscription", values?.documentDiscription);
    }
    if (values?.documentDate) {
      formData.append("documentDate", values?.documentDate);
    }
    if (values?.documentType) {
      formData.append("documentType", values?.documentType);
    }
    formData.append("billFrom", "From NA");
    if (values?.file) {
      formData.append("file", values?.file);
    }

    if (values?.senateBillSenatorMovers) {
      values?.senateBillSenatorMovers?.forEach((senator, index) => {
        formData.append(
          `senateBillSenatorMovers[${index}][fkSenatorId]`,
          senator?.value
        );
      });
    }
    if (values?.senateBillMnaMovers) {
      values?.senateBillMnaMovers?.forEach((MNA, index) => {
        formData.append(`senateBillMnaMovers[${index}][fkMnaId]`, MNA?.value);
      });
    }
    if (values?.senateBillMinistryMovers) {
      values?.senateBillMinistryMovers?.forEach((ministry, index) => {
        formData.append(
          `senateBillMinistryMovers[${index}][fkMinistryId]`,
          ministry?.value
        );
      });
    }

    try {
      const response = await UpdateNABill(NA_Bill_ID, formData);
      console.log("response", response);
      if (response?.success) {
        showSuccessMessage(response?.message);

        setTimeout(() => {
          navigate("/lgms/dashboard/bills/legislation-bills");
        }, [3000]);
        formik.resetForm();
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <Layout
      module={true}
      sidebarItems={LegislationSideBarItems}
      centerlogohide={true}
    >
      <ToastContainer />
      {/* <Header /> */}
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <div className="container-fluid">
              <div class="card mt-1">
                <div
                  class="card-header red-bg"
                  style={{ background: "#14ae5c !important" }}
                >
                  <h1>Update National Assembly Bill</h1>
                </div>
                <div className="card-body">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col">
                        <div class="mb-3">
                          <label class="form-label">Parliamentary Year</label>
                          <select
                            id="fkParliamentaryYearId"
                            name="fkParliamentaryYearId"
                            className="form-select"
                            onChange={formik.handleChange}
                            value={formik.values.fkParliamentaryYearId}
                          >
                            <option value="" disabled hidden>
                              Select
                            </option>
                            {parliamentaryYear &&
                              parliamentaryYear.map((item) => (
                                <option value={item.id}>
                                  {item.parliamentaryTenure}
                                </option>
                              ))}
                          </select>
                          {formik.touched.fkParliamentaryYearId &&
                            formik.errors.fkParliamentaryYearId && (
                              <div className="invalid-feedback">
                                {formik.errors.fkParliamentaryYearId}
                              </div>
                            )}
                        </div>
                      </div>

                      <div class="col">
                        <div class="mb-3">
                          <label class="form-label">Session</label>
                          <select
                            id="fkSessionId"
                            name="fkSessionId"
                            className="form-control"
                            onChange={formik.handleChange}
                            value={formik.values.fkSessionId}
                          >
                            <option value="" disabled hidden>
                              Select
                            </option>
                            {sessions &&
                              sessions.map((item) => (
                                <option value={item.id}>
                                  {item.sessionName}
                                </option>
                              ))}
                          </select>
                          {formik.touched.fkSessionId &&
                            formik.errors.fkSessionId && (
                              <div class="invalid-feedback">
                                {formik.errors.fkSessionId}
                              </div>
                            )}
                        </div>
                      </div>

                      <div class="col">
                        <div class="mb-3">
                          <label class="form-label">Bill Category </label>
                          <select
                            id="billCategory"
                            name="billCategory"
                            className={`form-select ${
                              formik.touched.billCategory &&
                              formik.errors.billCategory
                                ? "is-invalid"
                                : ""
                            }`}
                            onChange={formik.handleChange}
                            value={formik.values.billCategory}
                          >
                            <option value="" disabled hidden>
                              Select
                            </option>
                            <option value="Government Bill">
                              Government Bill
                            </option>
                            <option value="Private Member Bill">
                              Private Member Bill
                            </option>
                          </select>
                          {formik.touched.billCategory &&
                            formik.errors.billCategory && (
                              <div class="invalid-feedback">
                                {formik.errors.billCategory}
                              </div>
                            )}
                        </div>
                      </div>

                      <div class="col-3">
                        <div class="mb-3">
                          <label class="form-label">Bill Type </label>
                          <select
                            id="billType"
                            name="billType"
                            className={`form-select ${
                              formik.touched.billType && formik.errors.billType
                                ? "is-invalid"
                                : ""
                            }`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.billType}
                          >
                            <option value="" disabled hidden>
                              Select
                            </option>
                            <option value="Amendment Bill">
                              Amendment Bill
                            </option>
                            <option value="Constitutional Amendment Bill">
                              Constitutional Amendment Bill
                            </option>
                            <option value="Finance Bill">Finance Bill</option>
                            <option value="Money Bill">Money Bill</option>
                            <option value="New Bill">New Bill</option>
                          </select>
                          {formik.touched.billType &&
                            formik.errors.billType && (
                              <div class="invalid-feedback">
                                {formik.errors.billType}
                              </div>
                            )}
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div class="col">
                        <div class="mb-3">
                          <label class="form-label">Bill Status</label>
                          {/* <select
                            id="fkBillStatus"
                            name="fkBillStatus"
                            className="form-select"
                            onChange={formik.handleChange}
                            value={formik.values.fkBillStatus}
                          >
                            <option value="" disabled hidden>
                              Select
                            </option>
                            {billStatusData &&
                              billStatusData.map((item) => (
                                <option value={item.id}>
                                  {item.billStatusName}
                                </option>
                              ))}
                          </select> */}
                           <Select
                      options={
                        billStatusData &&
                        billStatusData?.map((item) => ({
                          value: item.id,
                          label: item?.billStatusName,
                        }))
                      }
                      onChange={(selectedOptions) =>
                        formik.setFieldValue(
                          "fkBillStatus",
                          selectedOptions
                        )
                      }
                      // onBlur={formikAssigned.handleBlur}
                      value={formik.values.fkBillStatus}
                      name="fkBillStatus"
                      
                    />
                          {formik.touched.fkBillStatus &&
                            formik.errors.fkBillStatus && (
                              <div class="invalid-feedback">
                                {formik.errors.fkBillStatus}
                              </div>
                            )}
                        </div>
                      </div>
                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label">File Number</label>

                          <input
                            type="text"
                            id="fileNumber"
                            name="fileNumber"
                            className="form-control"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.fileNumber}
                          />
                          {formik.touched.fileNumber &&
                            formik.errors.fileNumber && (
                              <div
                                className="invalid-feedback"
                                style={{ display: "block" }}
                              >
                                {formik.errors.fileNumber}
                              </div>
                            )}
                        </div>
                      </div>
                      <div className="col">
                        <div className="mb-3" style={{ position: "relative" }}>
                          <label className="form-label">
                            Passed By NA Date
                          </label>
                          <span
                            style={{
                              position: "absolute",
                              right: "15px",
                              top: "36px",
                              zIndex: 1,
                              fontSize: "20px",
                              zIndex: "1",
                              color: "#666",
                              cursor: "pointer",
                            }}
                            onClick={handleCalendarToggle}
                          >
                            <FontAwesomeIcon icon={faCalendarAlt} />
                          </span>

                          <DatePicker
                            selected={formik.values.PassedByNADate}
                            onChange={handleDateSelect}
                            onBlur={formik.handleBlur}
                            className={`form-control ${
                              formik.touched.PassedByNADate &&
                              formik.errors.PassedByNADate
                                ? "is-invalid"
                                : ""
                            }`}
                            open={isCalendarOpen}
                            onClickOutside={() => setIsCalendarOpen(false)}
                            onInputClick={handleCalendarToggle}
                            // onClick={handleCalendarToggle}
                            maxDate={new Date()}
                            dateFormat="dd-MM-yyyy"
                          />

                          {formik.touched.PassedByNADate &&
                            formik.errors.PassedByNADate && (
                              <div
                                className="invalid-feedback"
                                style={{ display: "block" }}
                              >
                                {formik.errors.PassedByNADate}
                              </div>
                            )}
                        </div>
                      </div>

                      <div className="col">
                        <div className="mb-3" style={{ position: "relative" }}>
                          <label className="form-label">
                            Date of Recipt of Message From NA
                          </label>
                          <span
                            style={{
                              position: "absolute",
                              right: "15px",
                              top: "36px",
                              zIndex: 1,
                              fontSize: "20px",
                              zIndex: "1",
                              color: "#666",
                              cursor: "pointer",
                            }}
                            onClick={handleReciptCalendarToggle}
                          >
                            <FontAwesomeIcon icon={faCalendarAlt} />
                          </span>

                          <DatePicker
                            selected={
                              formik.values.DateOfReceiptOfMessageFromNA
                            }
                            onChange={handleReciptDateSelect}
                            onBlur={formik.handleBlur}
                            className={`form-control ${
                              formik.touched.DateOfReceiptOfMessageFromNA &&
                              formik.errors.DateOfReceiptOfMessageFromNA
                                ? "is-invalid"
                                : ""
                            }`}
                            name="DateOfReceiptOfMessageFromNA"
                            open={isDateofReciptCalendarOpen}
                            onClickOutside={() =>
                              setIsDateofReciptCalendarOpen(false)
                            }
                            onInputClick={handleReciptCalendarToggle}
                            // onClick={handleCalendarToggle}
                            maxDate={new Date()}
                            dateFormat="dd-MM-yyyy"
                          />

                          {formik.touched.DateOfReceiptOfMessageFromNA &&
                            formik.errors.DateOfReceiptOfMessageFromNA && (
                              <div
                                className="invalid-feedback"
                                style={{ display: "block" }}
                              >
                                {formik.errors.DateOfReceiptOfMessageFromNA}
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label">Bill Title</label>
                          <textarea
                            className={`form-control  ${
                              formik.touched.billTitle &&
                              formik.errors.billTitle
                                ? "is-invalid"
                                : ""
                            }`}
                            id="billTitle"
                            name="billTitle"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.billTitle}
                          ></textarea>
                          {formik.touched.billTitle &&
                            formik.errors.billTitle && (
                              <div className="invalid-feedback">
                                {formik.errors.billTitle}
                              </div>
                            )}
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className=" col">
                        <label className="form-label">Senator</label>
                        <Select
                          options={
                            members &&
                            members?.map((item) => ({
                              value: item.id,
                              label: item?.memberName,
                            }))
                          }
                          id="senateBillSenatorMovers"
                          name="senateBillSenatorMovers"
                          onChange={(selectedOptions) =>
                            formik.setFieldValue(
                              "senateBillSenatorMovers",
                              selectedOptions
                            )
                          }
                          value={formik.values.senateBillSenatorMovers}
                          isMulti={true}
                        />
                      </div>
                      <div class="col">
                        <div class="mb-3">
                          <label class="form-label">Select MNA</label>
                          <Select
                            options={MNAData.map((item) => ({
                              value: item.id,
                              label: item.mnaName,
                            }))}
                            onChange={(selectedOption) =>
                              formik.setFieldValue(
                                "senateBillMnaMovers",
                                selectedOption
                              )
                            }
                            onBlur={formik.handleBlur}
                            value={formik.values.senateBillMnaMovers}
                            name="senateBillMnaMovers"
                            className={` ${
                              formik.touched.senateBillMnaMovers &&
                              formik.errors.senateBillMnaMovers
                                ? "is-invalid"
                                : ""
                            }`}
                            isMulti
                          />

                          {formik.touched.senateBillMnaMovers &&
                            formik.errors.senateBillMnaMovers && (
                              <div class="invalid-feedback">
                                {formik.errors.senateBillMnaMovers}
                              </div>
                            )}
                        </div>
                      </div>
                      <div className="col">
                        <label className="form-label">Select Ministry</label>
                        <Select
                          options={
                            ministryData &&
                            ministryData?.map((item) => ({
                              value: item.id,
                              label: item?.ministryName,
                            }))
                          }
                          name="senateBillMinistryMovers"
                          id="senateBillMinistryMovers"
                          onChange={(selectedOptions) =>
                            formik.setFieldValue(
                              "senateBillMinistryMovers",
                              selectedOptions
                            )
                          }
                          value={formik.values.senateBillMinistryMovers}
                          isMulti={true}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2nd card */}

          <div className="mt-2">
            <div className="container-fluid">
              <div class="card mt-1">
                <div className="card-body">
                  <div className="container-fluid">
                    <div className="row">
                      <div class="col">
                        <div class="mb-3" style={{ position: "relative" }}>
                          <label class="form-label">
                            Introduced in House On
                          </label>
                          <span
                            style={{
                              position: "absolute",
                              right: "15px",
                              top: "36px",
                              zIndex: 1,
                              fontSize: "20px",
                              zIndex: "1",
                              color: "#666",
                              cursor: "pointer",
                            }}
                            onClick={handleIntroducedCalendarToggle}
                          >
                            <FontAwesomeIcon icon={faCalendarAlt} />
                          </span>
                          <DatePicker
                            selected={formik.values.introducedInHouses}
                            onChange={handleIntroducedDateSelect}
                            onBlur={formik.handleBlur}
                            className="form-control"
                            open={isIntroducedCalendarOpen}
                            onClickOutside={() =>
                              setIntroducedCalendarOpen(false)
                            }
                            onInputClick={handleIntroducedCalendarToggle}
                            maxDate={new Date()}
                            dateFormat="dd-MM-yyyy"
                          />
                        </div>
                      </div>

                      <div className="col">
                        <label className="form-label">
                          Introduced in Session
                        </label>
                        <select
                          id="fkSessionId"
                          name="fkSessionId"
                          className="form-select"
                          onChange={formik.handleChange}
                          value={formik.values.fkSessionId}
                        >
                          <option value="" disabled hidden>
                            Select Session
                          </option>
                          {sessions.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.sessionName}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col">
                        <label className="form-label">Concernd Committes</label>
                        <select
                          id="fkManageCommitteeId"
                          name="fkManageCommitteeId"
                          className="form-select"
                          onChange={formik.handleChange}
                          value={formik.values.fkManageCommitteeId}
                        >
                          <option value="" disabled hidden>
                            Select
                          </option>
                          {committieeData &&
                            committieeData.map((item) => (
                              <option key={item.id} value={item.id}>
                                {item.committeeName}
                              </option>
                            ))}
                        </select>
                        {/* <Select
                          options={
                            committieeData &&
                            committieeData?.map((item) => ({
                              value: item.id,
                              label: item?.committeeName,
                            }))
                          }
                          id="fkManageCommitteeId"
                          name="fkManageCommitteeId"
                          onChange={(selectedOptions) =>
                            formik.setFieldValue(
                              "fkManageCommitteeId",
                              selectedOptions
                            )
                          }
                          value={formik.values.fkManageCommitteeId}
                          isMulti={true}
                        /> */}
                      </div>

                      <div class="col">
                        <div class="mb-3" style={{ position: "relative" }}>
                          <label class="form-label">Refered On</label>
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
                            onClick={handleReferredCalendarToggle}
                          >
                            <FontAwesomeIcon icon={faCalendarAlt} />
                          </span>
                          <DatePicker
                            selected={formik.values.referedOnDate}
                            onChange={handleReferredDateSelect}
                            className={"form-control"}
                            open={isReferredCalendarOpen}
                            onClickOutside={() =>
                              setReferredCalendarOpen(false)
                            }
                            onInputClick={handleReferredCalendarToggle}
                            maxDate={new Date()}
                            dateFormat="dd-MM-yyyy"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="form-group col-3">
                        <label className="form-label">
                          Committee Recommendation
                        </label>
                        <select
                          class="form-select"
                          value={formik.values.committeeRecomendation}
                          id="committeeRecomendation"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        >
                          <option selected disabled hidden>
                            Select
                          </option>
                          <option value="Ammended By Standing Committee">
                            Ammended By Standing Committee
                          </option>
                          <option value="May be Passed as Introduced in the House">
                            May be Passed as Introduced in the House
                          </option>
                          <option value="Passed without sending to Committee">
                            Passed without sending to Committee
                          </option>
                          <option value="Ammended By Standing Committee">
                            Ammended By Standing Committee
                          </option>
                        </select>
                      </div>

                      <div class="col-3">
                        <div class="mb-3" style={{ position: "relative" }}>
                          <label class="form-label">
                            Report Presenation Day
                          </label>
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
                            onClick={handleReportPresenatationDayCalendarToggle}
                          >
                            <FontAwesomeIcon icon={faCalendarAlt} />
                          </span>
                          <DatePicker
                            selected={formik.values.reportPresentationDate}
                            onChange={handleReportPresenatationDateSelect}
                            className={"form-control"}
                            open={isReportPresentationCalendarOpen}
                            onClickOutside={() =>
                              setReportPresentationCalendarOpen(false)
                            }
                            onInputClick={
                              handleReportPresenatationDayCalendarToggle
                            }
                            maxDate={new Date()}
                            dateFormat="dd-MM-yyyy"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3rd card */}

          <div className="mt-2">
            <div className="container-fluid">
              <div class="card mt-1">
                <div className="card-body">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="form-group col-3">
                        <label
                          htmlFor="passageWithdrawal"
                          className="form-label"
                        >
                          Memeber Passage/Withdrawal Status
                        </label>

                        <select
                          id="fkMemberPassageId"
                          name="fkMemberPassageId"
                          className={`form-select ${
                            formik.touched.fkMemberPassageId &&
                            formik.errors.fkMemberPassageId
                              ? "is-invalid"
                              : ""
                          }`}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.fkMemberPassageId}
                        >
                          <option value="" disabled hidden>
                            Select
                          </option>
                          <option value={"Passage"}>Passage</option>
                          <option value={"withdrawal"}>withdrawal</option>
                        </select>
                      </div>

                      <div className="col-3">
                        <div class="mb-3 " style={{ position: "relative" }}>
                          <label class="form-label">
                            Memeber Passage/Withdrawal Notice Date
                          </label>
                          <span
                            style={{
                              position: "absolute",
                              right: "15px",
                              top: "36px",
                              zIndex: 1,
                              fontSize: "20px",
                              zIndex: "1",
                              color: "#666",
                              cursor: "pointer",
                            }}
                            onClick={handlePassageCalendarToggle}
                          >
                            <FontAwesomeIcon icon={faCalendarAlt} />
                          </span>
                          <DatePicker
                            selected={formik.values.memeberNoticeDate}
                            onChange={handlePassageDateSelect}
                            className={"form-control"}
                            open={isPassageCalendarOpen}
                            onClickOutside={() => setPassageCalendarOpen(false)}
                            onInputClick={handlePassageCalendarToggle}
                            maxDate={new Date()}
                            dateFormat="dd-MM-yyyy"
                          />
                        </div>
                      </div>

                      <div className="col-3">
                        <div class="mb-3 " style={{ position: "relative" }}>
                          <label class="form-label">
                            Date of consideration of the Bill
                          </label>
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
                            onClick={handleConsiderationCalendarToggle}
                          >
                            <FontAwesomeIcon icon={faCalendarAlt} />
                          </span>
                          <DatePicker
                            selected={formik.values.dateOfConsiderationBill}
                            onChange={handleconsiderationDateSelect}
                            className={"form-control"}
                            open={isconsiderationDateCalendarOpen}
                            onClickOutside={() =>
                              setConsiderationDateCalendarOpen(false)
                            }
                            onInputClick={handleConsiderationCalendarToggle}
                            maxDate={new Date()}
                            dateFormat="dd-MM-yyyy"
                          />
                        </div>
                      </div>

                      <div className="form-group col-3">
                        <label htmlFor="session" className="form-label">
                          Consideration in Session
                        </label>
                        <select
                          id="fkSessionMemberPassageId"
                          name="fkSessionMemberPassageId"
                          className="form-control"
                          onChange={formik.handleChange}
                          value={formik.values.fkSessionMemberPassageId}
                        >
                          <option value="" disabled hidden>
                            Select
                          </option>
                          {sessions &&
                            sessions.map((item) => (
                              <option value={item.id}>
                                {item.sessionName}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4th card */}

          <div className="container-fluid mt-2">
            <div class="card mt-1">
              <div className="card-body">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-3">
                      <div class="mb-3 " style={{ position: "relative" }}>
                        <label class="form-label">
                          Date of Passage by Senate
                        </label>
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
                          onClick={handlePassageSenateCalendarToggle}
                        >
                          <FontAwesomeIcon icon={faCalendarAlt} />
                        </span>
                        <DatePicker
                          selected={formik.values.dateOfPassageBySenate}
                          onChange={handlePassageSenateDateSelect}
                          className={"form-control"}
                          open={isPassageSenateCalendarOpen}
                          onClickOutside={() =>
                            setPassageSenateCalendarOpen(false)
                          }
                          onInputClick={handlePassageSenateCalendarToggle}
                          maxDate={new Date()}
                          dateFormat="dd-MM-yyyy"
                        />
                      </div>
                    </div>

                    <div className="col-3">
                      <div class="mb-3 " style={{ position: "relative" }}>
                        <label class="form-label">
                          Date of Transmission to NA
                        </label>
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
                          onClick={handleTransmissionCalendarToggle}
                        >
                          <FontAwesomeIcon icon={faCalendarAlt} />
                        </span>
                        <DatePicker
                          selected={formik.values.dateOfTransmissionToNA}
                          onChange={handleTransmissionDateSelect}
                          className={"form-control"}
                          open={isTransmissionDateCalendarOpen}
                          onClickOutside={() =>
                            setTransmissionDateCalendarOpen(false)
                          }
                          onInputClick={handleTransmissionCalendarToggle}
                          maxDate={new Date()}
                          dateFormat="dd-MM-yyyy"
                        />
                      </div>
                    </div>

                    <div className="col-3">
                      <div class="mb-3 " style={{ position: "relative" }}>
                        <label class="form-label">
                          Date of Receipt of Message from NA
                        </label>
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
                          onClick={handleRecepitMesageCalendarToggle}
                        >
                          <FontAwesomeIcon icon={faCalendarAlt} />
                        </span>
                        <DatePicker
                          selected={formik.values.dateOfReceiptMessageFromNA}
                          onChange={handleRecepitMesageDateSelect}
                          className={"form-control"}
                          open={isRecepitMesageDateCalendarOpen}
                          onClickOutside={() =>
                            setRecepitMesageDateCalendarOpen(false)
                          }
                          onInputClick={handleRecepitMesageCalendarToggle}
                          maxDate={new Date()}
                          dateFormat="dd-MM-yyyy"
                        />
                      </div>
                    </div>

                    <div className="col-3">
                      <div class="mb-3 " style={{ position: "relative" }}>
                        <label class="form-label">Date of Passage by NA</label>
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
                          onClick={handlePassageByNACalendarToggle}
                        >
                          <FontAwesomeIcon icon={faCalendarAlt} />
                        </span>
                        <DatePicker
                          selected={formik.values.dateOfPassageByNA}
                          onChange={handlePassageByNADateSelect}
                          className={"form-control"}
                          open={isPassageByNADateCalendarOpen}
                          onClickOutside={() =>
                            setPassageByNADateCalendarOpen(false)
                          }
                          onInputClick={handlePassageByNACalendarToggle}
                          maxDate={new Date()}
                          dateFormat="dd-MM-yyyy"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 5th card */}

          <div className="container-fluid mt-2">
            <div class="card mt-1">
              <div className="ms-3 mt-3">
                <h6 className="text-black">Bill Documents</h6>
              </div>
              <div className="card-body">
                <div className="container-fluid">
                  <div className="row">
                    <div className="">
                      <div className="form-group">
                        <label className="form-label" htmlFor="billDescription">
                          Document Description
                        </label>
                        <textarea
                          id="documentDiscription"
                          name="documentDiscription"
                          value={formik.values.documentDiscription}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="form-control"
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 row">
                    <div className="col-4">
                      <div class="mb-3 " style={{ position: "relative" }}>
                        <label class="form-label">Document Date</label>
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
                          onClick={handleDocomentDateCalendarToggle}
                        >
                          <FontAwesomeIcon icon={faCalendarAlt} />
                        </span>
                        <DatePicker
                          selected={formik.values.documentDate}
                          onChange={handleDocumentDateSelect}
                          className={"form-control"}
                          open={isDocomentDateCalendarOpen}
                          onClickOutside={() =>
                            setDocomentDateCalendarOpen(false)
                          }
                          onInputClick={handleDocomentDateCalendarToggle}
                          maxDate={new Date()}
                          dateFormat="dd-MM-yyyy"
                        />
                      </div>
                    </div>

                    <div className="form-group col-4">
                      <label htmlFor="billType" className="form-label">
                        Document Type
                      </label>
                      <select
                        id="documentType"
                        name="documentType"
                        className="form-select"
                        onChange={formik.handleChange}
                        value={formik.values.documentType}
                      >
                        <option value="" disabled hidden>
                          Select
                        </option>
                        <option value="Amendment">Amendment</option>
                        <option value="Bill">Bill</option>
                        <option value="Committee Report">
                          Committee Report
                        </option>
                        <option value="Gazette">Gazette</option>
                        <option value="Letter Sent To Senator">
                          Letter Sent To Senator
                        </option>
                        <option value="Member Notice For Passage">
                          Member Notice For Passage
                        </option>
                        <option value="Member Notice For withdrawal">
                          Member Notice For withdrawal
                        </option>
                        <option value="Notice">Notice</option>
                      </select>
                    </div>

                    <div className="form-group col-4">
                      <label htmlFor="fileInput" className="form-label">
                        Choose File
                      </label>
                      <input
                        type="file"
                        id="fileInput"
                        name="fileInput"
                        className="form-control"
                        onChange={(event) => {
                          // Handle file input change event
                          console.log(event.target.files);
                        }}
                      />
                    </div>
                    <div className="row mt-3">
                      <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button class="btn btn-primary" type="submit">
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default UpdateBills;
