import React, { useState, useContext, useEffect, useCallback } from "react";
import Select from "react-select";
import { ToastContainer } from "react-toastify";
import { useFormik } from "formik";

import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { Layout } from "../../../../../../../components/Layout";
import Header from "../../../../../../../components/Header";
import { AuthContext } from "../../../../../../../api/AuthContext";
import {
  DeleteLegislationBill,
  getAllBillStatus,
  getAllCommitteeRecommendation,
  getAllCommitties,
  mainSearchApi,
} from "../../../../../../../api/APIs/Services/LegislationModule.service";
import { getAllParliamentaryYears } from "../../../../../../../api/APIs/Services/ManageQMS.service";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../../utils/ToastAlert";
import { LegislationSideBarItems } from "../../../../../../../utils/sideBarItems";
import IntroducedInSenate from "../../../../../../../components/LegislationBills/IntroducedInSenate";
import RecievedFromNA from "../../../../../../../components/LegislationBills/RecievedFromNA";

const SearchLegislationGovernmentBills = () => {
  const navigate = useNavigate();
  const { ministryData, members, sessions } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageValue, setPageValue] = useState(null);
  const [count, setCount] = useState(null);
  const [concerndCommitte, setConcerndCommitte] = useState(null);
  const [billFrom, setBillFrom] = useState();
  const [remarksAttachmentVal, setRemarksAttachmentVal] = useState();

  const [searchdata, setSearchData] = useState([]);
  const [billdata, setBilldata] = useState([]);
  const [parliamentaryYears, setParliamentaryYears] = useState([]);
  const [commiteeRecommendations, setCommitteeRecommendations] = useState([]);

  const [isPresentedCalenderOpen, setIsPresentedCalenderOpen] = useState(false);

  const [isFromNoticeDateCalenderOpen, setIsFromNoticeDateCalenderOpen] =
    useState(false);

  const [isToNoticeDateCalenderOpen, setIsToNoticeDateCalenderOpen] =
    useState(false);

  const pageSize = 10;

  const handleFromNoticeCalendarToggle = () => {
    setIsFromNoticeDateCalenderOpen(!isFromNoticeDateCalenderOpen);
  };
  // Handale DateCHange
  const handleFromNoticeDateSelect = (date) => {
    formik.setFieldValue("FromNoticeDate", date);
    setIsFromNoticeDateCalenderOpen(false);
  };
  const handleToNoticeCalendarToggle = () => {
    setIsToNoticeDateCalenderOpen(!isToNoticeDateCalenderOpen);
  };
  // Handale DateCHange
  const handleToNoticeDateSelect = (date) => {
    formik.setFieldValue("ToNoticeDate", date);
    setIsToNoticeDateCalenderOpen(false);
  };
  const handlePresentedHouseCalendarToggle = () => {
    setIsPresentedCalenderOpen(!isPresentedCalenderOpen);
  };
  // Handale DateCHange
  const handlePresentedHouseDateSelect = (date) => {
    formik.setFieldValue("PresetedInHOuseOn", date);
    setIsPresentedCalenderOpen(false);
  };

  // Transform Government Bill Introduced In Senate Data
  const transformGovernmentSenateBillData = (apiData) => {
    const docs = apiData?.map((item) => item?.billDocuments);
    if (docs?.length > 0) {
      setRemarksAttachmentVal(true);
    } else {
      setRemarksAttachmentVal(false);
    }
    return apiData?.map((item, index) => ({
      SNo: index + 1,
      id: item.id,
      // internalId: item?.id,
      fileNumber: item?.fileNumber,
      billTitle: item?.billTitle,
      nameOfMinistersOrMovers:
        item?.senateBillMnaMovers?.[0]?.mna?.mnaName ||
        item?.senateBillSenatorMovers
          ?.map((mover) => mover?.member?.memberName)
          .join(", ") ||
        "",
      // dateOfReceiptOfNotice: item?.noticeDate
      //   ? moment(item?.noticeDate, "YYYY-MM-DD").format("DD-MM-YYYY")
      //   : "---",
      dateOfIntroductionReferenceToStandingCommittee: item?.introducedInHouses
        ?.introducedInHouseDate
        ? moment(
            item?.introducedInHouses?.introducedInHouseDate,
            "YYYY-MM-DD"
          ).format("DD-MM-YYYY")
        : "---",

      dateOfPresentationOfTheReport: item?.introducedInHouses
        ?.reportPresentationDate
        ? moment(
            item?.introducedInHouses?.reportPresentationDate,
            "YYYY-MM-DD"
          ).format("DD-MM-YYYY")
        : "---",
      dateOfConsiderationOfTheBillBySenate: item?.memberPassages
        ?.dateOfConsiderationBill
        ? moment(
            item?.memberPassages?.dateOfConsiderationBill,
            "YYYY-MM-DD"
          ).format("DD-MM-YYYY")
        : "---",
      dateOfPassingTheBillByTheSenate: item?.dateOfPassageBySenate
        ? moment(item?.dateOfPassageBySenate, "YYYY-MM-DD").format("DD-MM-YYYY")
        : "---",
      dateOnWhichTheBillTransmittedToNA: item?.dateOfTransmissionToNA
        ? moment(item?.dateOfTransmissionToNA, "YYYY-MM-DD").format(
            "DD-MM-YYYY"
          )
        : "---",
      billCategory: item?.billCategory,
      billFrom: item?.billFrom,
      remarks: item?.billRemarks,
      billDocuments: item?.billDocuments,
    }));
  };

  // Transform Government Bill Recieved From NA Data
  const transformGovernmentRecievedFromNABillData = (apiData) => {
    const docs = apiData?.map((item) => item?.billDocuments);
    if (docs?.length > 0) {
      setRemarksAttachmentVal(true);
    } else {
      setRemarksAttachmentVal(false);
    }
    return apiData?.map((item, index) => ({
      SNo: index + 1,
      id: item.id,
      // internalId: item?.id,
      fileNumber: item?.fileNumber,
      billTitle: item?.billTitle,
      // nameOfMinisters: item?.senateBillSenatorMovers
      //   ? item?.senateBillSenatorMovers
      //       .map((mover) => mover?.mna?.mnaName)
      //       .join(", ")
      //   : "---",
      dateOnWhichBillWasPassedByNA: item?.PassedByNADate
        ? moment(item?.PassedByNADate, "YYYY-MM-DD").format("DD-MM-YYYY")
        : "---",
      dateOfReceiptOfMessageFromNA: item?.DateOfReceiptOfMessageFromNA
        ? moment(item?.DateOfReceiptOfMessageFromNA, "YYYY-MM-DD").format(
            "DD-MM-YYYY"
          )
        : "---",
      // dateOfReceiptOfNotice: item?.noticeDate
      //   ? moment(item?.noticeDate, "YYYY-MM-DD").format("DD-MM-YYYY")
      //   : "---",

      dateOfReferencetoStandingCommittee: item?.introducedInHouses
        ?.referedOnDate
        ? moment(item?.introducedInHouses?.referedOnDate, "YYYY-MM-DD").format(
            "DD-MM-YYYY"
          )
        : "---",
      dateOfPresentationOfTheReport: item?.introducedInHouses
        ?.reportPresentationDate
        ? moment(
            item?.introducedInHouses?.reportPresentationDate,
            "YYYY-MM-DD"
          ).format("DD-MM-YYYY")
        : "---",
      dateOfConsiderationOfTheBillBySenate: item?.memberPassages
        ?.dateOfConsiderationBill
        ? moment(
            item?.memberPassages?.dateOfConsiderationBill,
            "YYYY-MM-DD"
          ).format("DD-MM-YYYY")
        : "---",
      dateOfPassingTheBillByTheSenate: item?.dateOfPassageBySenate
        ? moment(item?.dateOfPassageBySenate, "YYYY-MM-DD").format("DD-MM-YYYY")
        : "---",
      dateOfTransmissionOfMessageToNA: item?.dateOfTransmissionToNA
        ? moment(item?.dateOfTransmissionToNA, "YYYY-MM-DD").format(
            "DD-MM-YYYY"
          )
        : "---",
      dateOfAssentByThePresident: item?.dateOfAssentByThePresident
        ? moment(item?.dateOfAssentByThePresident, "YYYY-MM-DD").format(
            "DD-MM-YYYY"
          )
        : "---",
      dateOfPublishInTheGazette: item?.dateOfPublishInGazette
        ? moment(item?.dateOfPublishInGazette, "YYYY-MM-DD").format(
            "DD-MM-YYYY"
          )
        : "---",
      billCategory: item?.billCategory,
      billFrom: item?.billFrom,
      remarks: item?.billRemarks,
      billDocuments: item?.billDocuments,
    }));
  };

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
    if (
      formik?.values?.selectedMinistry ||
      formik?.values?.selectedSenator ||
      formik?.values?.parliamentaryYear ||
      formik?.values?.fromSession ||
      formik?.values?.toSessionId ||
      formik?.values?.billCategory ||
      formik?.values?.billType ||
      formik?.values?.FromNoticeDate ||
      formik?.values?.ToNoticeDate ||
      formik?.values?.keywords ||
      formik?.values?.concerndCommitties ||
      formik?.values?.committeeRecomendation ||
      formik?.values?.remarks ||
      formik?.values?.billFrom ||
      formik?.values?.billStatus
    ) {
      handleSearch(formik?.values, page);
    }

    handleSearch(formik?.values, page);
  };

  const formik = useFormik({
    initialValues: {
      selectedMinistry: "",
      selectedSenator: "",
      parliamentaryYear: "",
      fromSession: "",
      toSessionId: "",
      originatedIn: "",
      billCategory: "",
      statusId: "",
      billType: "",
      billFrom: "",
      FromNoticeDate: "",
      ToNoticeDate: "",
      PresetedInHOuseOn: "",
      concerndCommitties: "",
      committeeRecomendation: "",
      keywords: "",
    },
    onSubmit: (values) => {
      handleSearch(values, currentPage);
    },
  });

  //  Getting All Committees Recommendation
  const GetAllCommittiesRecommendation = async () => {
    try {
      const response = await getAllCommitteeRecommendation(0, 500);

      if (response?.success) {
        setCommitteeRecommendations(
          response?.data?.manageCommitteeRecomendation
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleParliamentaryYears = async () => {
    try {
      const response = await getAllParliamentaryYears(0, 500);
      if (response?.success) {
        setParliamentaryYears(response?.data);
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  const getBillstatus = async () => {
    try {
      const response = await getAllBillStatus(0, 500);
      if (response?.success) {
        setBilldata(response?.data?.billStatus);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const transformCommittiesData = async (apiData) => {
    return (
      apiData?.map((item) => ({
        id: item.id,
        committeeName: item.committeeName,
      })) || []
    );
  };
  const getCommitties = async () => {
    const response = await getAllCommitties(0, 500);
    if (response?.success) {
      // console.log(response?.data)
      const transformedData = await transformCommittiesData(
        response?.data?.manageCommittees
      );
      setConcerndCommitte(transformedData);
    }
    // console.log("errroorro")
  };

  useEffect(() => {
    handleParliamentaryYears();
    getBillstatus();
    getCommitties();
    GetAllCommittiesRecommendation();
  }, []);

  // const transFormsearchData = (apiData) => {
  //   return (
  //     apiData?.map((item) => ({
  //       id: item.id,
  //       parliamentaryYear: item?.parliamentaryYears?.parliamentaryTenure,
  //       session: item?.sessions?.sessionName,
  //       billType: item.billType,
  //       billCategory: item.billCategory,
  //       billFrom: item.billFrom,
  //       concerndCommittes:
  //         item?.introducedInHouses?.manageCommittees?.committeeName,
  //       billStatus: item?.billStatuses?.billStatusName,
  //       Status: item.billStatus,
  //     })) || []
  //   );
  // };

  //   const transFormsearchData = (apiData) => {
  //     return (
  //       apiData?.map((item) => ({
  //         id: item.id,
  //         billTitle: item?.billTitle,
  //         // dateOfIntroductionInSenate: item?.introducedInHouses?.introducedInHouseDate
  //         //   ? moment(item?.introducedInHouses?.introducedInHouseDate).format("DD-MM-YYYY")
  //         //   : "---",
  //         dateOfPresentationReport: item?.introducedInHouses
  //           ?.reportPresentationDate
  //           ? moment(
  //               item?.introducedInHouses?.reportPresentationDate,
  //               "YYYY-MM-DD"
  //             ).format("DD-MM-YYYY")
  //           : "---",
  //         dateOfTransmission: item?.dateOfTransmissionToNA
  //           ? moment(item?.dateOfTransmissionToNA, "YYYY-MM-DD").format(
  //               "DD-MM-YYYY"
  //             )
  //           : "---",

  //         // movers: item?.senateBillMnaMovers
  //         //   ? item?.senateBillMnaMovers.map((mover) => mover?.mna?.mnaName).join(", ")
  //         //   : "---",
  //         billCategory: item?.billCategory,
  //         fileNumber: item?.fileNumber,
  //         billFrom: item?.billFrom,
  //         remarks: item?.billRemarks,
  //       })) || []
  //     );
  //   };

  const handleSearch = useCallback(
    async (values, page) => {
      const data = {
        billCategory: "Government Bill",
        billFrom: values?.billFrom || "From Senate",
        fkSenatorId: values?.selectedSenator?.value,
        fkParliamentaryYearId: values?.parliamentaryYear,
        fkMinistryId: values?.selectedMinistry?.value,
        keyword: values?.keywords,
        fkSessionIdFrom: values?.fromSession,
        fkSessionIdto: values?.toSessionId,
        fkBillStatus: values?.statusId,
        billType: values?.billType,
        fkManageCommitteeId: values?.concerndCommitties?.value,
        committeeRecomendation: values?.committeeRecomendation?.value,
        // fileNumber: values.fileNumber,
        noticeDateFrom:
          values?.FromNoticeDate &&
          moment(values?.FromNoticeDate).format("YYYY-MM-DD"),
        noticeDateTo:
          values?.ToNoticeDate &&
          moment(values?.ToNoticeDate).format("YYYY-MM-DD"),
        introducedInHouseDate:
          values?.PresetedInHOuseOn &&
          moment(values?.PresetedInHOuseOn).format("YYYY-MM-DD"),
      };
      setPageValue(page);
      try {
        const response = await mainSearchApi(page, pageSize, data);
        if (response?.success) {
          let transformedData;
          if (data?.billFrom === "From Senate") {
            transformedData = await transformGovernmentSenateBillData(
              response?.data?.senateBills
            );
          } else if (data?.billFrom === "From NA") {
            transformedData = await transformGovernmentRecievedFromNABillData(
              response?.data?.senateBills
            );
          }
          setBillFrom(data?.billFrom);
          setCount(response?.data?.count);
          setSearchData(transformedData);
          showSuccessMessage(response?.message);
        }
      } catch (error) {
        showErrorMessage(error?.response?.message);
      }
    },
    [currentPage, pageSize, setCount, setSearchData]
  );

  const handleResetForm = () => {
    formik.resetForm();
    setSearchData([]);
    setRemarksAttachmentVal(false);
  };

  // const handleEditSenateBill = (id) => {
  //   navigate("/lgms/dashboard/bills/edit/senate-bills", { state: id });
  // };
  // const handleEditNABill = (id) => {
  //   navigate("/lgms/dashboard/bills/edit/NA-bills/", { state: id });
  // };

  // Edit Bill Introduced in Senate
  const handleEditSenateBill = (id, item) => {
    navigate("/lgms/dashboard/bills/edit/senate-bills", {
      state: { id, item },
    });
  };

  // Edit Bill Recieved From NA
  const handleEditNABill = (id, item) => {
    navigate("/lgms/dashboard/bills/edit/NA-bills/", { state: { id, item } });
  };
  // Handle Delete Bills
  const handleDeleteLegislationBill = async (id) => {
    try {
      const resposne = await DeleteLegislationBill(id);
      if (resposne?.success) {
        showSuccessMessage(resposne?.message);
        handleSearch(formik?.values, pageValue);
      }
    } catch (error) {
      showErrorMessage(error?.message);
    }
  };
  return (
    <Layout
      module={true}
      sidebarItems={LegislationSideBarItems}
      centerlogohide={true}
    >
      <Header
        dashboardLink={"/lgms/dashboard"}
        addLink1={"/lgms/dashboard"}
        title1={"Search Legislation"}
      />
      <ToastContainer />
      <div className="container-fluid">
        <div className="card">
          <div className="card-header red-bg">
            <h1>Search Bill</h1>
          </div>
          <div className="card-body">
            <div className="container-fluid">
              <form onSubmit={formik.handleSubmit}>
                <div className="row">
                  {/* <div className="col-3">
                    <label htmlFor="keywords" className="form-label">
                      Keywords
                    </label>
                    <input
                      id="keywords"
                      name="keywords"
                      type="text"
                      value={formik.values.keywords}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`form-control ${
                        formik.touched.keywords && formik.errors.keywords
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    {formik.touched.keywords && formik.errors.keywords && (
                      <div className="invalid-feedback">
                        {formik.errors.keywords}
                      </div>
                    )}
                  </div> */}

                  <div className="form-group col-3">
                    <label htmlFor="" className="form-label">
                      Select Bill From
                    </label>
                    <select
                      id="billFrom"
                      name="billFrom"
                      className="form-select"
                      onChange={formik.handleChange}
                      value={formik.values.billFrom}
                    >
                      {/* <option value="" disabled hidden>
                        Select
                      </option> */}
                      <option value="From Senate">Introdced In Senate</option>
                      <option value="From NA">Received From NA</option>
                    </select>
                  </div>

                  <div className="form-group col-3">
                    <label htmlFor="billType" className="form-label">
                      Bill Type
                    </label>
                    <select
                      id="billType"
                      name="billType"
                      className="form-select"
                      onChange={formik.handleChange}
                      value={formik.values.billType}
                    >
                      <option value="" disabled hidden>
                        Select Bill Type
                      </option>
                      <option value="Amendment Bill">Amendment Bill</option>
                      <option value="Constitutional Amendment Bill">
                        Constitutional Amendment Bill
                      </option>
                      <option value="Finance Bill">Finance Bill</option>
                      <option value="Money Bill">Money Bill</option>
                      <option value="New Bill">New Bill</option>
                    </select>
                  </div>

                  <div className="form-group col-3">
                    <label htmlFor="senator" className="form-label">
                      Member Name
                    </label>
                    <Select
                      options={
                        members &&
                        members?.map((item) => ({
                          value: item.id,
                          label: item?.memberName,
                        }))
                      }
                      id="selectedSenator"
                      name="selectedSenator"
                      onChange={(selectedOptions) =>
                        formik.setFieldValue("selectedSenator", selectedOptions)
                      }
                      value={formik.values.selectedSenator}
                    />
                  </div>
                  <div className="form-group col-3">
                    <label htmlFor="ministry" className="form-label">
                      Search Ministry
                    </label>
                    <Select
                      options={
                        ministryData &&
                        ministryData?.map((item) => ({
                          value: item.id,
                          label: item?.ministryName,
                        }))
                      }
                      name="selectedMinistry"
                      id="selectedMinistry"
                      onChange={(selectedOptions) =>
                        formik.setFieldValue(
                          "selectedMinistry",
                          selectedOptions
                        )
                      }
                      value={formik.values.selectedMinistry}
                    />
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="form-group col-3">
                    <label htmlFor="parliamentaryYear" className="form-label">
                      Parliamentary Year
                    </label>
                    <select
                      id="parliamentaryYear"
                      name="parliamentaryYear"
                      className="form-select"
                      onChange={formik.handleChange}
                      value={formik.values.parliamentaryYear}
                    >
                      <option value="" disabled hidden>
                        Select Parliamentary Year
                      </option>
                      {parliamentaryYears.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.parliamentaryTenure}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group col-3">
                    <label htmlFor="statusId" className="form-label">
                      Status
                    </label>
                    <select
                      className="form-select"
                      id="statusId"
                      name="statusId"
                      onChange={formik.handleChange}
                      value={formik.values.statusId}
                    >
                      <option value="" disabled>
                        Select Option
                      </option>
                      {billdata.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.billStatusName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group col-3">
                    <label htmlFor="fromSession" className="form-label">
                      From Session
                    </label>
                    <select
                      id="fromSession"
                      name="fromSession"
                      className="form-select"
                      onChange={formik.handleChange}
                      value={formik.values.fromSession}
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
                  <div className="form-group col-3">
                    <label htmlFor="toSessionId" className="form-label">
                      To Session
                    </label>
                    <select
                      id="toSessionId"
                      name="toSessionId"
                      className="form-select"
                      onChange={formik.handleChange}
                      value={formik.values.toSessionId}
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

                  {/* <div className="form-group col-3">
                    <label htmlFor="billCategory" className="form-label">
                      Bill Category
                    </label>
                    <select
                      className="form-select"
                      id="billCategory"
                      name="billCategory"
                      onChange={formik.handleChange}
                      value={formik.values.billCategory}
                    >
                      <option value="" disabled hidden>
                        Select Bill Category
                      </option>
                      <option value="Government Bill">Government Bill</option>
                      <option value="Private Member Bill">
                        Private Member Bill
                      </option>
                    </select>
                  </div> */}
                </div>

                <div className="row mt-3">
                  {/* <div className="form-group col-3">
                    <label htmlFor="originatedIn" className="form-label">
                      Origniated In
                    </label>
                    <select
                      id="originatedIn"
                      name="originatedIn"
                      className="form-select"
                      onChange={formik.handleChange}
                      value={formik.values.originatedIn}
                    >
                      <option value="" disabled hidden>
                        Select Origination
                      </option>
                      <option value="InSenate">In Senate</option>
                      <option value="InAssembly">In Assembly</option>
                    </select>
                  </div> */}

                  <div class="col-3">
                    <div class="mb-3" style={{ position: "relative" }}>
                      <label class="form-label">Presented In House On</label>
                      <span
                        style={{
                          position: "absolute",
                          right: "15px",
                          top: "36px",
                          zIndex: 1,
                          fontSize: "20px",
                          color: "#666",
                          cursor: "pointer",
                        }}
                        onClick={handlePresentedHouseCalendarToggle}
                      >
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </span>
                      <DatePicker
                        selected={formik.values.PresetedInHOuseOn}
                        onChange={handlePresentedHouseDateSelect}
                        onBlur={formik.handleBlur}
                        className="form-control"
                        open={isPresentedCalenderOpen}
                        onClickOutside={() => setIsPresentedCalenderOpen(false)}
                        onInputClick={handlePresentedHouseCalendarToggle}
                        maxDate={new Date()}
                        dateFormat="dd-MM-yyyy"
                      />
                    </div>
                  </div>

                  <div className="form-group col-3">
                    <label htmlFor="?.value" className="form-label">
                      Concernd Committes
                    </label>
                    <Select
                      options={
                        concerndCommitte &&
                        concerndCommitte?.map((item) => ({
                          value: item?.id,
                          label: item?.committeeName,
                        }))
                      }
                      id="concerndCommitties"
                      name="concerndCommitties"
                      onChange={(selectedOptions) =>
                        formik.setFieldValue(
                          "concerndCommitties",
                          selectedOptions
                        )
                      }
                      value={formik.values?.concerndCommitties}
                    />
                  </div>
                  <div className="form-group col-3">
                    <label className="form-label">
                      Committee Recommendation
                    </label>
                    <Select
                      options={
                        commiteeRecommendations &&
                        commiteeRecommendations?.map((item) => ({
                          value: item?.id,
                          label: item?.committeeRecomendation,
                        }))
                      }
                      onChange={(selectedOption) => {
                        formik.setFieldValue(
                          "committeeRecomendation",
                          selectedOption
                        );
                      }}
                      onBlur={formik.handleBlur}
                      value={formik.values.committeeRecomendation}
                      name="committeeRecomendation"
                      className={` ${
                        formik.touched.committeeRecomendation &&
                        formik.errors.committeeRecomendation
                          ? "is-invalid"
                          : ""
                      }`}
                      // isMulti
                    />
                    {/* <select
                          class="form-select"
                          value={formik.values.committeeRecomendation}
                          id="committeeRecomendation"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        >
                          <option value="" selected disabled hidden>
                            Select
                          </option>
                          {commiteeRecommendations &&
                            commiteeRecommendations?.map((item) => (
                              <option
                                value={item.id}
                              >{`${item?.committeeRecomendation}`}</option>
                            ))}
                         
                        </select> */}
                  </div>
                </div>

                <div className="row mt-3">
                  {/* <div className="form-group col-3">
                    <label htmlFor="FromNoticeDate" className="form-label">
                      From Notice Date
                    </label>
                    <input
                      type="date"
                      id="FromNoticeDate"
                      name="FromNoticeDate"
                      className="form-control"
                      onChange={formik.handleChange}
                      value={formik.values.FromNoticeDate}
                    />
                  </div> */}

                  {/* <div class="col-3">
                    <div class="mb-3" style={{ position: "relative" }}>
                      <label class="form-label">From Notice Date</label>
                      <span
                        style={{
                          position: "absolute",
                          right: "15px",
                          top: "36px",
                          zIndex: 1,
                          fontSize: "20px",
                          color: "#666",
                          cursor: "pointer",
                        }}
                        onClick={handleFromNoticeCalendarToggle}
                      >
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </span>
                      <DatePicker
                        selected={formik.values.FromNoticeDate}
                        onChange={handleFromNoticeDateSelect}
                        onBlur={formik.handleBlur}
                        className="form-control"
                        open={isFromNoticeDateCalenderOpen}
                        onClickOutside={() =>
                          setIsFromNoticeDateCalenderOpen(false)
                        }
                        onInputClick={handleFromNoticeCalendarToggle}
                        maxDate={new Date()}
                        dateFormat="dd-MM-yyyy"
                      />
                    </div>
                  </div>
                  <div class="col-3">
                    <div class="mb-3" style={{ position: "relative" }}>
                      <label class="form-label">To Notice Date</label>
                      <span
                        style={{
                          position: "absolute",
                          right: "15px",
                          top: "36px",
                          zIndex: 1,
                          fontSize: "20px",
                          color: "#666",
                          cursor: "pointer",
                        }}
                        onClick={handleToNoticeCalendarToggle}
                      >
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </span>
                      <DatePicker
                        selected={formik.values.ToNoticeDate}
                        onChange={handleToNoticeDateSelect}
                        onBlur={formik.handleBlur}
                        className="form-control"
                        open={isToNoticeDateCalenderOpen}
                        onClickOutside={() =>
                          setIsToNoticeDateCalenderOpen(false)
                        }
                        onInputClick={handleToNoticeCalendarToggle}
                        maxDate={new Date()}
                        dateFormat="dd-MM-yyyy"
                      />
                    </div>
                  </div> */}

                  {/* <div className="form-group col-3">
                    <label htmlFor="ToNoticeDate" className="form-label">
                      To Notice Date
                    </label>
                    <input
                      type="date"
                      id="ToNoticeDate"
                      name="ToNoticeDate"
                      className="form-control"
                      onChange={formik.handleChange}
                      value={formik.values.ToNoticeDate}
                    />
                  </div> */}

                  {/* <div className="form-group col-3">
                    <label htmlFor="PresetedInHOuseOn" className="form-label">
                      Preseted In House On
                    </label>
                    <input
                      type="date"
                      id="PresetedInHOuseOn"
                      name="PresetedInHOuseOn"
                      className="form-control"
                      onChange={formik.handleChange}
                      value={formik.values.PresetedInHOuseOn}
                    />
                  </div> */}
                </div>

                <div className="row col mt-3">
                  <div className="col d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary me-2">
                      Search
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary me-2"
                      onClick={handleResetForm}
                    >
                      Reset
                    </button>
                    {/* <button type="" className="btn btn-primary me-2">
                      Print
                    </button>
                    <button type="" className="btn btn-primary">
                      Annual Report
                    </button> */}
                  </div>
                </div>
              </form>
            </div>

            <div class="container-fluid">
              <div className="mt-4">
                {billFrom && billFrom === "From Senate" ? (
                  <IntroducedInSenate
                    addBtnText={"Government Bill (Introduced In Senate)"}
                    handleAdd={""}
                    tableTitle={"Government Bills Data (Introduced In Senate)"}
                    data={searchdata}
                    remarksAttachmentVal={remarksAttachmentVal}
                    handleEdit={(item) => {
                      item?.billFrom === "From Senate"
                        ? handleEditSenateBill(item?.id, item)
                        : handleEditNABill(item?.id, item);
                    }}
                    handlePageChange={handlePageChange}
                    currentPage={currentPage}
                    pageSize={pageSize}
                    totalCount={count}
                    hideTableTopButton={true}
                  />
                ) : billFrom === "From NA" ? (
                  <RecievedFromNA
                    addBtnText={"Government Bill (Recieved From NA)"}
                    handleAdd={""}
                    tableTitle={"Government Bills Data (Received From NA)"}
                    data={searchdata}
                    remarksAttachmentVal={remarksAttachmentVal}
                    handleEdit={(item) => {
                      item?.billFrom === "From Senate"
                        ? handleEditSenateBill(item?.id, item)
                        : handleEditNABill(item?.id, item);
                    }}
                    handlePageChange={handlePageChange}
                    currentPage={currentPage}
                    pageSize={pageSize}
                    totalCount={count}
                    hideTableTopButton={true}
                  />
                ) : (
                  "No Data"
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SearchLegislationGovernmentBills;
