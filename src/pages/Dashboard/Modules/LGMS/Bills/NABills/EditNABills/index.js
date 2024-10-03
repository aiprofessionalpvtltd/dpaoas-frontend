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
  DeleteBillDocumentTypeAttachemnt,
  UpdateNABill,
  getAllBillStatus,
  getAllCommitteeRecommendation,
  getAllMNALists,
  getMinisterByParliamentaryYearID,
  getSingleNABillByID,
} from "../../../../../../../api/APIs/Services/LegislationModule.service";
import moment from "moment";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../../utils/ToastAlert";
import { getUserData } from "../../../../../../../api/Auth";
import { ToastContainer } from "react-toastify";
import { imagesUrl } from "../../../../../../../api/APIs";
import { getSingleMinisteryByMinisterID } from "../../../../../../../api/APIs/Services/Motion.service";
import {
  getAllTenures,
  getMemberByParliamentaryYearID,
  getParliamentaryYearsByTenureID,
  getParliamentaryYearsByTermID,
  getTermByTenureID,
} from "../../../../../../../api/APIs/Services/ManageQMS.service";

const UpdateBills = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userData = getUserData();
  const NA_Bill_ID = location?.state && location?.state?.id;
  const BillCategory = location?.state && location?.state?.item?.billCategory;
  const BillFrom = location?.state && location?.state?.item?.billFrom;
  const { ministryData, members, sessions, parliamentaryYear } =
    useContext(AuthContext);
  const [commiteeRecommendations, setCommitteeRecommendations] = useState([]);
  const [billStatusData, setBillStatusesData] = useState([]);
  const [ministryDataOnMinister, setMinistryDataOnMinister] = useState([]);
  const [ministerID, setMinisterID] = useState(null);
  const [MNAData, setMNAData] = useState([]);
  const [singleSenateBillData, setSingleSenateBillData] = useState([]);
  const [committieeData, setCommittieData] = useState([]);
  const [parliamentaryYearData, setParliamentaryYearData] = useState([]);
  const [membersOnParliamentaryYear, setMembersOnParliamentaryYear] = useState(
    []
  );

  const [tenuresTerms, setTenuresTerms] = useState([]);
  const [tenures, setTenures] = useState([]);
  const [ministersOnParliamentaryYear, setMinisterOnParliamentaryYear] =
    useState([]);
  const [isFormShow, setIsFormShow] = useState(false);
  const [showMinster, setShowMinister] = useState(false);
  // Different Dates of Forms
  const [isNoticeDateCalendarOpen, setIsNoticeDateCalendarOpen] =
    useState(false);

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
  const [isBillStatusDateCalendarOpen, setBillStatusDateCalendarOpen] =
    useState(false);
  const [isGazetteCalendarOpen, setGazetteCalendarOpen] = useState(false);
  const [isAssentCalendarOpen, setAssentCalendarOpen] = useState(false);
  const [isCirculationCalendarOpen, setIsCirculationCalendarOpen] =
    useState(false);
  const [filePath, setFilePath] = useState("");
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

  //  Getting All Committees Recommendation
  const GetAllCommittiesRecommendationApi = async () => {
    try {
      const response = await getAllCommitteeRecommendation(0, 1000);

      if (response?.success) {
        setCommitteeRecommendations(
          response?.data?.manageCommitteeRecomendation
        );
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

  //Get Parliamentary Year
  const getParliamentaryYearsonTheBaseOfTerm = async (id) => {
    try {
      const response = await getParliamentaryYearsByTermID(id);
      if (response?.success) {
        setParliamentaryYearData(response?.data);
        // setTonerModels(transformedData);
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
    GetAllCommittiesRecommendationApi();
    if (ministerID) {
      getMinisteryByMinisterIdApi();
    }
  }, [ministerID]);
  const formik = useFormik({
    initialValues: {
      selectiontype: "",
      membertenure: "",
      fkTermId: "",
      // Define your initial form values here
      fkParliamentaryYearId: "",
      fkSessionId: "",
      billCategory: "",
      billType: "",
      noticeDate: "",
      fileNumber: "",
      PassedByNADate: "",
      DateOfReceiptOfMessageFromNA: "",
      billTitle: "",
      billText: "",
      billRemarks: "",
      fkBillStatus: "",
      billStatusDate: "",
      senateBillSenatorMovers: [],
      senateBillMnaMovers: [],
      senateBillMinistryMovers: null,
      introducedInHouseDate: "",
      fkManageCommitteeId: "",
      referedOnDate: "",
      committeeRecomendation: "",
      reportPresentationDate: "",
      fkMemberPassageId: "",
      memeberNoticeDate: "",
      dateOfPublishInGazette: "",
      dateOfCirculationOfBill: "",
      dateOfAssentByThePresident: "",
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

  const handleNoticeDateCalendarToggle = () => {
    setIsNoticeDateCalendarOpen(!isNoticeDateCalendarOpen);
  };
  // Handale DateCHange
  const handleNoticeDateSelect = (date) => {
    formik.setFieldValue("noticeDate", date);
    setIsNoticeDateCalendarOpen(false);
  };

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
  // Handle Claneder Toggel
  const handleBillStatusCalendarToggle = () => {
    setBillStatusDateCalendarOpen(!isBillStatusDateCalendarOpen);
  };
  // Handale DateCHange
  const handleBillStatustDateSelect = (date) => {
    formik.setFieldValue("billStatusDate", date);
    setBillStatusDateCalendarOpen(false);
  };

  const handleIntroducedCalendarToggle = () => {
    setIntroducedCalendarOpen(!isIntroducedCalendarOpen);
  };
  // Handale DateCHange
  const handleIntroducedDateSelect = (date) => {
    formik.setFieldValue("introducedInHouseDate", date);
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

  const handleCirculationCalendarToggle = () => {
    setIsCirculationCalendarOpen(!isCirculationCalendarOpen);
  };
  // Handale DateCHange
  const handleCirculationDateSelect = (date) => {
    formik.setFieldValue("dateOfCirculationOfBill", date);
    setIsCirculationCalendarOpen(false);
  };
  const handleGazetteCalendarToggle = () => {
    setGazetteCalendarOpen(!isGazetteCalendarOpen);
  };
  // Handale DateCHange
  const handleGazetteDateSelect = (date) => {
    formik.setFieldValue("dateOfPublishInGazette", date);
    setGazetteCalendarOpen(false);
  };

  const handleAssentCalendarToggle = () => {
    setAssentCalendarOpen(!isAssentCalendarOpen);
  };
  // Handale DateCHange
  const handleAssentDateSelect = (date) => {
    formik.setFieldValue("dateOfAssentByThePresident", date);
    setAssentCalendarOpen(false);
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
  const handleTenures = async (selectionType) => {
    try {
      const response = await getAllTenures(0, 1000, selectionType);
      if (response?.success) {
        setTenures(response?.data?.tenures);
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  // GetTerms on the Base of Tenure
  const handleTenuresTerms = async (id) => {
    try {
      const response = await getTermByTenureID(id);
      if (response?.success) {
        setTenuresTerms(response?.data);
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  // Get All Miisters
  const getMinisteryByMinisterIdApi = async () => {
    try {
      const response = await getSingleMinisteryByMinisterID(
        ministerID && ministerID
      );
      if (response?.success) {
        setMinistryDataOnMinister(response?.data?.ministries?.ministries);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  //Get Parliamentary Year On The Base Of Tenure
  const getParliamentaryYearsonTheBaseOfTenure = async (id) => {
    try {
      const response = await getParliamentaryYearsByTenureID(id);
      if (response?.success) {
        console.log(response?.data?.data);
        setParliamentaryYearData(response?.data);
        // setTonerModels(transformedData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //Get Members On The Base Of Parliamentary Year
  const getMembersOnParliamentaryYear = async (id) => {
    try {
      const response = await getMemberByParliamentaryYearID(id);
      if (response?.success) {
        console.log("Memberon Response", response);
        setMembersOnParliamentaryYear(response?.data);
        // setTonerModels(transformedData);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };
  const getMNAOnParliamentaryYear = async (id) => {
    try {
      const response = await getMinisterByParliamentaryYearID(id);
      if (response?.success) {
        console.log("Memberon Response", response);
        setMinisterOnParliamentaryYear(response?.data);
        // setTonerModels(transformedData);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
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

  // Remove Bill Attachemnts
  const hendleRemoveImage = async (docType, fileId) => {
    const data = {
      documentType: docType,
      fileId: fileId,
    };
    try {
      const response = await DeleteBillDocumentTypeAttachemnt(NA_Bill_ID, data);
      if (response?.success) {
        getNABillByIdApi();
        showSuccessMessage(response.message);
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  };

  useEffect(() => {
    if (singleSenateBillData) {
      let fileNum = "";
      if (singleSenateBillData?.fileNumber) {
        const fileNumberMatch =
          singleSenateBillData?.fileNumber?.match(/\((\d+)\)/);
        fileNum = fileNumberMatch ? fileNumberMatch[1] : "";
      }
      const file = singleSenateBillData?.billDocuments?.file?.[0];
      let parsedFile = null;
      if (file) {
        try {
          parsedFile = JSON.parse(file);
          setFilePath(parsedFile.path);
        } catch (error) {
          console.error("Error parsing file:", error);
        }
      }
      const firstDocument = singleSenateBillData?.billDocuments?.[0];
      let parsedFiles = [];
      if (firstDocument && firstDocument.file) {
        parsedFiles = firstDocument.file.map((file) => file.path);
      }
      if (singleSenateBillData?.billFor) {
        handleTenures(singleSenateBillData?.billFor);
      }
      if (singleSenateBillData?.tenures?.id) {
        getParliamentaryYearsonTheBaseOfTerm(singleSenateBillData?.tenures?.id);
      }
      if (singleSenateBillData?.terms?.id) {
        getParliamentaryYearsonTheBaseOfTenure(
          singleSenateBillData?.tenures?.id
        );
      }
      if (singleSenateBillData?.billFor === "Ministers") {
        console.log("Min", singleSenateBillData?.billFor);
        getMNAOnParliamentaryYear(singleSenateBillData?.fkParliamentaryYearId);
      } else {
        getMembersOnParliamentaryYear(
          singleSenateBillData?.fkParliamentaryYearId
        );
      }
      setShowMinister(singleSenateBillData?.billFor);
      formik.setValues({
        selectiontype: singleSenateBillData?.billFor || "",
        membertenure:
          (singleSenateBillData?.tenures && {
            value: singleSenateBillData?.tenures?.id,
            label: singleSenateBillData?.tenures?.tenureName,
          }) ||
          "",

        fkTermId:
          (singleSenateBillData?.terms && {
            value: singleSenateBillData?.terms?.id,
            label: singleSenateBillData?.terms?.termName,
          }) ||
          "",
        fkParliamentaryYearId:
          (singleSenateBillData?.parliamentaryYears && {
            value: singleSenateBillData?.parliamentaryYears?.id,
            label:
              singleSenateBillData?.parliamentaryYears?.parliamentaryTenure,
          }) ||
          "",

        fkSessionId: singleSenateBillData?.fkSessionId || "",
        billCategory: singleSenateBillData?.billCategory || "",
        billType: singleSenateBillData?.billType || "",
        // billStatuses: singleSenateBillData?.billStatuses || "",
        fileNumber: fileNum || "",
        PassedByNADate: singleSenateBillData?.PassedByNADate
          ? moment(singleSenateBillData?.PassedByNADate, "YYYY-MM-DD").toDate()
          : null,
        DateOfReceiptOfMessageFromNA:
          singleSenateBillData?.DateOfReceiptOfMessageFromNA
            ? moment(
                singleSenateBillData?.DateOfReceiptOfMessageFromNA,
                "YYYY-MM-DD"
              ).toDate()
            : null,
        noticeDate: singleSenateBillData?.noticeDate
          ? moment(singleSenateBillData?.noticeDate, "YYYY-MM-DD").toDate()
          : null,

        //   dateOfReceiptMessageFromNA:
        // singleSenateBillData?.dateOfReceiptMessageFromNA
        //   ? moment(
        //       singleSenateBillData?.dateOfReceiptMessageFromNA,
        //       "YYYY-MM-DD"
        //     ).toDate()
        //   : "",
        // dateOfPassageByNA: singleSenateBillData?.dateOfPassageByNA
        //   ? moment(
        //       singleSenateBillData?.dateOfPassageByNA,
        //       "YYYY-MM-DD"
        //     ).toDate()
        //   : "",
        billTitle: singleSenateBillData?.billTitle || "",
        billText: singleSenateBillData?.billText || "",
        billRemarks: singleSenateBillData?.billRemarks || "",
        senateBillSenatorMovers: singleSenateBillData?.senateBillSenatorMovers
          ? singleSenateBillData?.senateBillSenatorMovers.map((senator) => ({
              value: senator?.member?.id,
              label: senator?.member?.memberName,
            }))
          : [],
        fkBillStatus:
          (singleSenateBillData?.billStatuses && {
            value: singleSenateBillData?.billStatuses?.id,
            label: singleSenateBillData?.billStatuses?.billStatusName,
          }) ||
          "",
        senateBillMnaMovers: singleSenateBillData?.senateBillMnaMovers
          ? {
              value: singleSenateBillData?.senateBillMnaMovers[0]?.mna?.id,
              label: singleSenateBillData?.senateBillMnaMovers[0]?.mna?.mnaName,
            }
          : null,
        senateBillMinistryMovers: singleSenateBillData?.senateBillMinistryMovers
          ? {
              value:
                singleSenateBillData?.senateBillMinistryMovers[0]?.ministrie
                  ?.id,
              label:
                singleSenateBillData?.senateBillMinistryMovers[0]?.ministrie
                  ?.ministryName,
            }
          : null,
        // senateBillMnaMovers: singleSenateBillData?.senateBillMnaMovers
        //   ? singleSenateBillData?.senateBillMnaMovers.map((senator) => ({
        //       value: senator?.mna?.id,
        //       label: senator?.mna?.mnaName,
        //     }))
        //   : [],
        // senateBillMinistryMovers: singleSenateBillData?.senateBillMinistryMovers
        //   ? singleSenateBillData?.senateBillMinistryMovers.map((senator) => ({
        //       value: senator?.ministrie?.id,
        //       label: senator?.ministrie?.ministryName,
        //     }))
        //   : [],
        // senateBillMinistryMovers: singleSenateBillData?.senateBillMinistryMovers
        //   ? {
        //       value:
        //         singleSenateBillData?.senateBillMinistryMovers[0]?.ministrie
        //           ?.id,
        //       label:
        //         singleSenateBillData?.senateBillMinistryMovers[0]?.ministrie
        //           ?.ministryName,
        //     }
        //   : null,
        introducedInHouseDate:
          singleSenateBillData?.introducedInHouses &&
          singleSenateBillData?.introducedInHouses?.introducedInHouseDate
            ? moment(
                singleSenateBillData?.introducedInHouses?.introducedInHouseDate,
                "YYYY-MM-DD"
              ).toDate()
            : null,
        referedOnDate:
          singleSenateBillData?.introducedInHouses &&
          singleSenateBillData?.introducedInHouses?.referedOnDate
            ? moment(
                singleSenateBillData?.introducedInHouses?.referedOnDate,
                "YYYY-MM-DD"
              ).toDate()
            : null,
        fkManageCommitteeId: singleSenateBillData?.introducedInHouses
          ? singleSenateBillData?.introducedInHouses?.fkManageCommitteeId
          : "",

        committeeRecomendation: singleSenateBillData?.introducedInHouses
          ?.manageCommitteeRecomendations
          ? {
              value:
                singleSenateBillData?.introducedInHouses
                  ?.manageCommitteeRecomendations?.id,
              label:
                singleSenateBillData?.introducedInHouses
                  ?.manageCommitteeRecomendations?.committeeRecom,
            }
          : null,
        reportPresentationDate: singleSenateBillData?.introducedInHouses
          ?.reportPresentationDate
          ? moment(
              singleSenateBillData?.introducedInHouses?.reportPresentationDate,
              "YYYY-MM-DD"
            ).toDate()
          : "",
        fkMemberPassageId: singleSenateBillData?.memberPassages
          ? singleSenateBillData?.memberPassages?.fkMemberPassageId
          : "",
        memeberNoticeDate: singleSenateBillData?.memberPassages
          ?.memeberNoticeDate
          ? moment(
              singleSenateBillData?.memberPassages?.memeberNoticeDate,
              "YYYY-MM-DD"
            ).toDate()
          : "",
        dateOfConsiderationBill:
          singleSenateBillData?.memberPassages &&
          singleSenateBillData?.memberPassages?.dateOfConsiderationBill
            ? moment(
                singleSenateBillData?.memberPassages?.dateOfConsiderationBill,
                "YYYY-MM-DD"
              ).toDate()
            : "",
        fkSessionMemberPassageId: singleSenateBillData?.memberPassages
          ? singleSenateBillData?.memberPassages?.fkSessionMemberPassageId
          : "",
        dateOfPassageBySenate: singleSenateBillData?.dateOfPassageBySenate
          ? moment(
              singleSenateBillData?.dateOfPassageBySenate,
              "YYYY-MM-DD"
            ).toDate()
          : "",
        dateOfTransmissionToNA: singleSenateBillData?.dateOfTransmissionToNA
          ? moment(
              singleSenateBillData?.dateOfTransmissionToNA,
              "YYYY-MM-DD"
            ).toDate()
          : "",

        dateOfPublishInGazette: singleSenateBillData?.dateOfPublishInGazette
          ? moment(
              singleSenateBillData?.dateOfPublishInGazette,
              "YYYY-MM-DD"
            ).toDate()
          : "",
        dateOfAssentByThePresident:
          singleSenateBillData?.dateOfAssentByThePresident
            ? moment(
                singleSenateBillData?.dateOfAssentByThePresident,
                "YYYY-MM-DD"
              ).toDate()
            : "",
        dateOfCirculationOfBill: singleSenateBillData?.dateOfCirculationOfBill
          ? moment(
              singleSenateBillData?.dateOfCirculationOfBill,
              "YYYY-MM-DD"
            ).toDate()
          : "",

        documentDiscription: singleSenateBillData?.billDocuments
          ? singleSenateBillData?.billDocuments?.documentDiscription
          : "",
        documentDate:
          singleSenateBillData?.billDocuments &&
          singleSenateBillData?.billDocuments?.documentDate
            ? moment(
                singleSenateBillData?.billDocuments?.documentDate,
                "YYYY-MM-DD"
              ).toDate()
            : "",
        documentType: singleSenateBillData?.billDocuments
          ? singleSenateBillData?.billDocuments?.documentType
          : "",
        billStatusDate: singleSenateBillData?.billStatusDate
          ? moment(singleSenateBillData?.billStatusDate, "YYYY-MM-DD").toDate()
          : "",
      });
    }
  }, [singleSenateBillData]);

  // console.log("PAAAA FIle", singleSenateBillData?.billDocuments);
  const UpdateNationalAssemblyBill = async (values) => {
    const formData = new FormData();
    formData.append(
      "fkParliamentaryYearId",
      values?.fkParliamentaryYearId?.value
    );
    formData.append("fkSessionId", values?.fkSessionId);
    formData.append("billCategory", values?.billCategory);
    formData.append("billType", values?.billType);
    formData.append("fkBillStatus", values?.fkBillStatus?.value);
    const currentYear = new Date().getFullYear();
    if (BillCategory === "Private Member Bill") {
      formData.append(
        "fileNumber",
        `24/(${values?.fileNumber})/${currentYear}`
      );
    } else {
      formData.append(
        "fileNumber",
        `09/(${values?.fileNumber})/${currentYear}`
      );
    }
    // formData.append("fileNumber",   `09(${values?.fileNumber})/2024`);
    // formData.append("fileNumber", values?.fileNumber);
    // formData.append("PassedByNADate", values?.PassedByNADate);
    if (values?.PassedByNADate) {
      const formattedDate = moment(values?.PassedByNADate).format("YYYY-MM-DD");
      formData.append("PassedByNADate", formattedDate);
    }
    // formData.append(
    //   "DateOfReceiptOfMessageFromNA",
    //   values?.DateOfReceiptOfMessageFromNA
    // );
    if (values?.DateOfReceiptOfMessageFromNA) {
      const formattedDate = moment(values?.DateOfReceiptOfMessageFromNA).format(
        "YYYY-MM-DD"
      );
      formData.append("DateOfReceiptOfMessageFromNA", formattedDate);
    }
    if (values?.billStatusDate) {
      const formattedDate = moment(values?.billStatusDate).format("YYYY-MM-DD");
      formData.append("billStatusDate", formattedDate);
    }
    formData.append("fkUserId", userData && userData?.id);
    formData.append("billTitle", values?.billTitle);
    formData.append("billText", values?.billText);
    formData.append("billRemarks", values?.billRemarks);

    // if (values?.introducedInHouses) {
    //   formData.append("introducedInHouses", values?.introducedInHouses);
    // }
    if (values?.introducedInHouseDate) {
      const formattedDate = moment(values?.introducedInHouseDate).format(
        "YYYY-MM-DD"
      );
      formData.append("introducedInHouseDate", formattedDate);
    }
    if (values?.fkManageCommitteeId) {
      formData.append("fkManageCommitteeId", values?.fkManageCommitteeId);
    }
    // if (values?.referedOnDate) {
    //   formData.append("referedOnDate", values?.referedOnDate);
    // }
    if (values?.referedOnDate) {
      const formattedDate = moment(values?.referedOnDate).format("YYYY-MM-DD");
      formData.append("referedOnDate", formattedDate);
    }
    // if (values?.committeeRecomendation) {
    //   formData.append("committeeRecomendation", values?.committeeRecomendation);
    // }
    if (values?.committeeRecomendation) {
      formData.append(
        "fkManageCommitteeRecomendationId",
        values?.committeeRecomendation?.value
      );
    }
    // if (values?.reportPresentationDate) {
    //   formData.append("reportPresentationDate", values?.reportPresentationDate);
    // }
    if (values?.reportPresentationDate) {
      const formattedDate = moment(values?.reportPresentationDate).format(
        "YYYY-MM-DD"
      );
      formData.append("reportPresentationDate", formattedDate);
    }
    if (values?.fkMemberPassageId) {
      formData.append("fkMemberPassageId", values?.fkMemberPassageId);
    }
    if (values?.noticeDate) {
      const formattedDate = moment(values?.noticeDate).format("YYYY-MM-DD");
      formData.append("noticeDate", formattedDate);
    }
    // if (values?.memeberNoticeDate) {
    //   formData.append("memeberNoticeDate", values?.memeberNoticeDate);
    // }
    if (values?.memeberNoticeDate) {
      const formattedDate = moment(values?.memeberNoticeDate).format(
        "YYYY-MM-DD"
      );
      formData.append("memeberNoticeDate", formattedDate);
    }
    // if (values?.dateOfConsiderationBill) {
    //   formData.append(
    //     "dateOfConsiderationBill",
    //     values?.dateOfConsiderationBill
    //   );
    // }
    if (values?.dateOfConsiderationBill) {
      const formattedDate = moment(values?.dateOfConsiderationBill).format(
        "YYYY-MM-DD"
      );
      formData.append("dateOfConsiderationBill", formattedDate);
    }
    if (values?.fkSessionMemberPassageId) {
      formData.append(
        "fkSessionMemberPassageId",
        values?.fkSessionMemberPassageId
      );
    }
    // if (values?.dateOfPassageBySenate) {
    //   formData.append("dateOfPassageBySenate", values?.dateOfPassageBySenate);
    // }
    if (values?.dateOfPassageBySenate) {
      const formattedDate = moment(values?.dateOfPassageBySenate).format(
        "YYYY-MM-DD"
      );
      formData.append("dateOfPassageBySenate", formattedDate);
    }
    // if (values?.dateOfTransmissionToNA) {
    //   formData.append("dateOfTransmissionToNA", values?.dateOfTransmissionToNA);
    // }
    if (values?.dateOfTransmissionToNA) {
      const formattedDate = moment(values?.dateOfTransmissionToNA).format(
        "YYYY-MM-DD"
      );
      formData.append("dateOfTransmissionToNA", formattedDate);
    }
    // if (values?.dateOfReceiptMessageFromNA) {
    //   formData.append(
    //     "dateOfReceiptMessageFromNA",
    //     values?.dateOfReceiptMessageFromNA
    //   );
    // }
    if (values?.dateOfReceiptMessageFromNA) {
      const formattedDate = moment(values?.dateOfReceiptMessageFromNA).format(
        "YYYY-MM-DD"
      );
      formData.append("dateOfReceiptMessageFromNA", formattedDate);
    }
    // if (values?.dateOfPassageByNA) {
    //   formData.append("dateOfPassageByNA", values?.dateOfPassageByNA);
    // }

    if (values?.dateOfPublishInGazette) {
      const formattedDate = moment(values?.dateOfPublishInGazette).format(
        "YYYY-MM-DD"
      );
      formData.append("dateOfPublishInGazette", formattedDate);
    }
    if (values?.dateOfAssentByThePresident) {
      const formattedDate = moment(values?.dateOfAssentByThePresident).format(
        "YYYY-MM-DD"
      );
      formData.append("dateOfAssentByThePresident", formattedDate);
    }
    if (values?.dateOfPassageByNA) {
      const formattedDate = moment(values?.dateOfPassageByNA).format(
        "YYYY-MM-DD"
      );
      formData.append("dateOfPassageByNA", formattedDate);
    }
    if (values?.dateOfCirculationOfBill) {
      const formattedDate = moment(values?.dateOfCirculationOfBill).format(
        "YYYY-MM-DD"
      );
      formData.append("dateOfCirculationOfBill", formattedDate);
    }
    if (values?.documentDiscription) {
      formData.append("documentDiscription", values?.documentDiscription);
    }
    // if (values?.documentDate) {
    //   formData.append("documentDate", values?.documentDate);
    // }
    if (values?.documentDate) {
      const formattedDate = moment(values?.documentDate).format("YYYY-MM-DD");
      formData.append("documentDate", formattedDate);
    }
    if (values?.documentType) {
      formData.append("documentType", values?.documentType);
    }
    formData.append("billFrom", "From NA");
    // if (values?.file) {
    //   formData.append("file", values?.file[0]);
    // }

    if (values?.file) {
      Array.from(values?.file).map((file, index) => {
        formData.append("file", file);
      });
    }
    // if (values?.referedOnDate) {
    //   const formattedDate = moment(values?.referedOnDate).format("YYYY-MM-DD");
    //   formData.append("referedOnDate", formattedDate);
    // }
    if (values?.senateBillSenatorMovers) {
      values?.senateBillSenatorMovers?.forEach((senator, index) => {
        formData.append(
          `senateBillSenatorMovers[${index}][fkSenatorId]`,
          senator?.value
        );
      });
    }
    if (values?.senateBillMnaMovers) {
      formData.append(
        `senateBillMnaMovers[${0}][fkMnaId]`,
        values?.senateBillMnaMovers?.value
      );
    }
    // if (values?.senateBillMinistryMovers) {
    //   values?.senateBillMinistryMovers?.forEach((ministry, index) => {
    //     formData.append(
    //       `senateBillMinistryMovers[${index}][fkMinistryId]`,
    //       ministry?.value
    //     );
    //   });
    // }
    if (values?.senateBillMinistryMovers) {
      formData.append(
        `senateBillMinistryMovers[${0}][fkMinistryId]`,
        values?.senateBillMinistryMovers?.value
      );
    }

    try {
      const response = await UpdateNABill(NA_Bill_ID, formData);
      console.log("response", response);
      if (response?.success) {
        showSuccessMessage(response?.message);

        if (
          BillCategory &&
          BillCategory === "Government Bill" &&
          BillFrom &&
          BillFrom === "From NA"
        ) {
          setTimeout(() => {
            navigate(
              "/lgms/dashboard/bills/legislation-bills/government-bills/recieved-from-na"
            );
          }, [3000]);
        } else if (
          BillCategory &&
          BillCategory === "Private Member Bill" &&
          BillFrom &&
          BillFrom === "From NA"
        ) {
          setTimeout(() => {
            navigate(
              "/lgms/dashboard/bills/legislation-bills/private-member-bills/recieved-from-na"
            );
          }, [3000]);
        }
        // setTimeout(() => {
        //   navigate("/lgms/dashboard/bills/legislation-bills");
        // }, [3000]);
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
                <div class="card-header red-bg">
                  <h1>Update National Assembly Bill</h1>
                </div>
                <div className="card-body">
                  <div className="container-fluid">
                    <div className="row">
                      <div class="col-3 mb-3">
                        <div className="mb-3">
                          <label className="form-label">Bill For</label>
                          <select
                            id="selectiontype"
                            name="selectiontype"
                            className={`form-select  ${
                              formik.touched.selectiontype &&
                              formik.errors.selectiontype
                                ? "is-invalid"
                                : ""
                            }`}
                            onBlur={formik.handleBlur}
                            onChange={(e) => {
                              const selectedValue = e.target.value;
                              // Update the formik state
                              formik.handleChange(e);
                              // Call the API with the selected value
                              handleTenures(selectedValue);
                              formik.setFieldValue("membertenure", "");
                              formik.setFieldValue("fkParliamentaryYearId", "");
                              formik.setFieldValue("fkTermId", "");
                              formik.setFieldValue(
                                "senateBillSenatorMovers",
                                null
                              );
                              formik.setFieldValue("senateBillMnaMovers", null);
                              formik.setFieldValue(
                                "senateBillMinistryMovers",
                                null
                              );
                              // SetFormSHow
                              setIsFormShow(true);
                              setShowMinister(selectedValue);
                              setMembersOnParliamentaryYear([]);
                            }}
                            value={formik.values.selectiontype}
                          >
                            <option value="" disabled hidden>
                              Select
                            </option>
                            <option value="Senators">Senators</option>
                            <option value="Ministers">Ministers</option>
                          </select>
                          {formik.touched.selectiontype &&
                            formik.errors.selectiontype && (
                              <div className="invalid-feedback">
                                {formik.errors.selectiontype}
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        {showMinster === "Ministers" ? (
                          <label className="form-label">Minister Tenure</label>
                        ) : (
                          <label className="form-label">Member Tenure</label>
                        )}

                        <Select
                          options={
                            Array.isArray(tenures) && tenures?.length > 0
                              ? tenures.map((item) => ({
                                  value: item?.id,
                                  label: `${item?.tenureName} (${item?.tenureType})`,
                                  tenureType: item?.tenureType,
                                }))
                              : []
                          }
                          onChange={(selectedOption) => {
                            formik.setFieldValue(
                              "membertenure",
                              selectedOption
                            );
                            if (showMinster === "Ministers") {
                              getParliamentaryYearsonTheBaseOfTenure(
                                selectedOption?.value
                              );
                            } else {
                              handleTenuresTerms(selectedOption?.value);
                            }
                            formik.setFieldValue("fkTermId", "");
                            formik.setFieldValue("fkParliamentaryYearId", "");
                            formik.setFieldValue("senateBillSenatorMovers", "");
                            formik.setFieldValue("senateBillMnaMovers", null);
                            formik.setFieldValue(
                              "senateBillMinistryMovers",
                              null
                            );
                          }}
                          onBlur={formik.handleBlur}
                          value={formik.values.membertenure}
                          id="membertenure"
                          name="membertenure"
                          isClearable={true}
                        />
                        {formik.touched.membertenure &&
                          formik.errors.membertenure && (
                            <div className="invalid-feedback">
                              {formik.errors.membertenure}
                            </div>
                          )}
                      </div>
                      {/* <div className="col">
                        <div class="mb-3">
                          <label class="form-label">Parliamentary Year</label>
                          <select
                            id="fkParliamentaryYearId"
                            name="fkParliamentaryYearId"
                            className={`form-select  ${
                              formik.touched.fkParliamentaryYearId &&
                              formik.errors.fkParliamentaryYearId
                                ? "is-invalid"
                                : ""
                            }`}
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
                      </div> */}
                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label">Member Term</label>
                          <Select
                            options={
                              Array.isArray(tenuresTerms) &&
                              tenuresTerms?.length > 0
                                ? tenuresTerms.map((item) => ({
                                    value: item?.id,
                                    label: `${item?.termName}`,
                                  }))
                                : []
                            }
                            onChange={(selectedOption) => {
                              formik.setFieldValue("fkTermId", selectedOption);
                              formik.setFieldValue("fkParliamentaryYearId", "");
                              formik.setFieldValue(
                                "senateBillSenatorMovers",
                                ""
                              );
                              if (selectedOption?.value) {
                                getParliamentaryYearsonTheBaseOfTerm(
                                  selectedOption?.value
                                );
                              }
                            }}
                            onBlur={formik.handleBlur}
                            value={formik.values.fkTermId}
                            id="fkTermId"
                            name="fkTermId"
                            isClearable={true}
                          />
                        </div>
                      </div>

                      <div class="col">
                        <div class="mb-3">
                          {showMinster === "Ministers" ? (
                            <label className="form-label">
                              Minister Parliamentary Year
                            </label>
                          ) : (
                            <label className="form-label">
                              Member Parliamentary Year
                            </label>
                          )}

                          <label class="form-label"></label>
                          <select
                            id="fkParliamentaryYearId"
                            name="fkParliamentaryYearId"
                            className={`form-select  ${
                              formik.touched.fkParliamentaryYearId &&
                              formik.errors.fkParliamentaryYearId
                                ? "is-invalid"
                                : ""
                            }`}
                            onBlur={formik.handleBlur}
                            // onChange={formik.handleChange}
                            onChange={(e) => {
                              const selectedId = e.target.value;
                              formik.handleChange(e);
                              setMembersOnParliamentaryYear([]);
                              getMembersOnParliamentaryYear(e.target.value);
                              getMNAOnParliamentaryYear(e.target.value);
                              // console.log("id", selectedId);
                            }}
                            value={formik.values.fkParliamentaryYearId}
                          >
                            <option value="" disabled hidden>
                              Select
                            </option>
                            {parliamentaryYearData &&
                              parliamentaryYearData?.length > 0 &&
                              parliamentaryYearData.map((item) => (
                                <option value={item?.id}>
                                  {item?.parliamentaryTenure}
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
                      {showMinster === "Ministers" ? (
                        <>
                          <div class="col">
                            <div class="mb-3">
                              <label class="form-label">Select Minister</label>
                              <Select
                                // options={
                                //   ministersOnParliamentaryYear &&
                                //   ministersOnParliamentaryYear?.length > 0 &&
                                //   ministersOnParliamentaryYear?.map((item) => ({
                                //     value: item?.id,
                                //     label: item?.mnaName,
                                //   }))
                                // }
                                options={
                                  Array.isArray(ministersOnParliamentaryYear) &&
                                  ministersOnParliamentaryYear.length > 0
                                    ? ministersOnParliamentaryYear.map(
                                        (item) => ({
                                          value: item?.id,
                                          label: item?.mnaName,
                                        })
                                      )
                                    : []
                                }
                                onChange={(selectedOption) => {
                                  formik.setFieldValue(
                                    "senateBillMnaMovers",
                                    selectedOption
                                  );
                                  formik.setFieldValue(
                                    "senateBillMinistryMovers",
                                    null
                                  );
                                  setMinisterID(selectedOption?.value);
                                }}
                                onBlur={formik.handleBlur}
                                value={formik.values.senateBillMnaMovers}
                                name="senateBillMnaMovers"
                                className={`${
                                  formik.touched.senateBillMnaMovers &&
                                  formik.errors.senateBillMnaMovers
                                    ? "is-invalid"
                                    : ""
                                }`}
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
                            <label className="form-label">
                              Select Ministry
                            </label>
                            <Select
                              options={
                                ministryDataOnMinister &&
                                ministryDataOnMinister?.map((item) => ({
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
                              className={` ${
                                formik.touched.senateBillMinistryMovers &&
                                formik.errors.senateBillMinistryMovers
                                  ? "is-invalid"
                                  : ""
                              }`}
                              value={formik.values.senateBillMinistryMovers}
                              // isMulti={true}
                            />
                            {formik.touched.senateBillMinistryMovers &&
                              formik.errors.senateBillMinistryMovers && (
                                <div class="invalid-feedback">
                                  {formik.errors.senateBillMinistryMovers}
                                </div>
                              )}
                          </div>
                        </>
                      ) : (
                        <div className="col">
                          <div className="mb-3">
                            <label class="form-label">Select Senator</label>
                            <Select
                              // options={
                              //   membersOnParliamentaryYear &&
                              //   membersOnParliamentaryYear?.length > 0 &&
                              //   membersOnParliamentaryYear?.map((item) => ({
                              //     value: item.id,
                              //     label: item?.memberName,
                              //   }))
                              // }
                              options={
                                Array.isArray(membersOnParliamentaryYear) &&
                                membersOnParliamentaryYear.length > 0
                                  ? membersOnParliamentaryYear.map((item) => ({
                                      value: item.id,
                                      label: item?.memberName,
                                    }))
                                  : []
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
                              className={` ${
                                formik.touched.senateBillSenatorMovers &&
                                formik.errors.senateBillSenatorMovers
                                  ? "is-invalid"
                                  : ""
                              }`}
                            />
                            {formik.touched.senateBillSenatorMovers &&
                              formik.errors.senateBillSenatorMovers && (
                                <div class="invalid-feedback">
                                  {formik.errors.senateBillSenatorMovers}
                                </div>
                              )}
                          </div>
                        </div>
                      )}

                      {/* <div class="col">
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
                      </div> */}
                      <div className="row">
                        <div class="col">
                          <div class="mb-3">
                            <label class="form-label">Session</label>
                            <select
                              id="fkSessionId"
                              name="fkSessionId"
                              className={`form-control  ${
                                formik.touched.fkSessionId &&
                                formik.errors.fkSessionId
                                  ? "is-invalid"
                                  : ""
                              }`}
                              onBlur={formik.handleBlur}
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
                        <div className="col">
                          <div className="mb-3">
                            <label className="form-label">File Number</label>

                            <input
                              type="text"
                              id="fileNumber"
                              name="fileNumber"
                              className={`form-control ${
                                formik.touched.fileNumber &&
                                formik.errors.fileNumber
                                  ? "is-invalid"
                                  : ""
                              }`}
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
                        <div class="col">
                          <div class="mb-3">
                            <label class="form-label">Bill Type </label>
                            <select
                              id="billType"
                              name="billType"
                              className={`form-select ${
                                formik.touched.billType &&
                                formik.errors.billType
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
                      </div>
                    </div>

                    <div className="row">
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
                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label">Bill Text</label>
                          <textarea
                            className={`form-control  ${
                              formik.touched.billText && formik.errors.billText
                                ? "is-invalid"
                                : ""
                            }`}
                            id="billText"
                            name="billText"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.billText}
                          ></textarea>
                          {formik.touched.billText &&
                            formik.errors.billText && (
                              <div className="invalid-feedback">
                                {formik.errors.billText}
                              </div>
                            )}
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label">Bill Remarks</label>
                          <textarea
                            className={`form-control  ${
                              formik.touched.billRemarks &&
                              formik.errors.billRemarks
                                ? "is-invalid"
                                : ""
                            }`}
                            id="billRemarks"
                            name="billRemarks"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.billRemarks}
                          ></textarea>
                          {formik.touched.billRemarks &&
                            formik.errors.billRemarks && (
                              <div className="invalid-feedback">
                                {formik.errors.billRemarks}
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
                      {/* <div class="col">
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
                      </div> */}

                      <div class="col">
                        <div class="mb-3">
                          <label class="form-label">Select Minister</label>
                          <Select
                            options={MNAData.map((item) => ({
                              value: item.id,
                              label: item.mnaName,
                            }))}
                            onChange={(selectedOption) => {
                              formik.setFieldValue(
                                "senateBillMnaMovers",
                                selectedOption
                              );
                              formik.setFieldValue(
                                "senateBillMinistryMovers",
                                null
                              );
                              setMinisterID(selectedOption?.value);
                            }}
                            onBlur={formik.handleBlur}
                            value={formik.values.senateBillMnaMovers}
                            name="senateBillMnaMovers"
                            className={` ${
                              formik.touched.senateBillMnaMovers &&
                              formik.errors.senateBillMnaMovers
                                ? "is-invalid"
                                : ""
                            }`}
                            // isMulti
                          />

                          {formik.touched.senateBillMnaMovers &&
                            formik.errors.senateBillMnaMovers && (
                              <div class="invalid-feedback">
                                {formik.errors.senateBillMnaMovers}
                              </div>
                            )}
                        </div>
                        {/* <div class="mb-3">
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
                        </div> */}
                      </div>
                      <div className="col">
                        <label className="form-label">Select Ministry</label>
                        <Select
                          options={
                            ministryDataOnMinister &&
                            ministryDataOnMinister?.map((item) => ({
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
                          // isMulti={true}
                        />
                      </div>
                      {/* <div className="col">
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
                          // isMulti={true}
                        />
                      </div> */}
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
                              color: "#666",
                              cursor: "pointer",
                            }}
                            onClick={handleIntroducedCalendarToggle}
                          >
                            <FontAwesomeIcon icon={faCalendarAlt} />
                          </span>
                          <DatePicker
                            selected={formik.values.introducedInHouseDate}
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
                    </div>

                    <div className="row">
                      <div className="form-group col-3">
                        <div className="form-group col">
                          <label className="form-label">
                            Committee Recommendation
                          </label>
                          <Select
                            options={
                              commiteeRecommendations &&
                              commiteeRecommendations.map((item) => ({
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
                        </div>
                        {/* <label className="form-label">
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
                        </select> */}
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

                      <div class="col-3">
                        <div class="mb-3" style={{ position: "relative" }}>
                          <label class="form-label">
                            Date of Circulation Of Bill
                          </label>
                          <span
                            style={{
                              position: "absolute",
                              right: "15px",
                              top: "36px",
                              zIndex: 1,
                              fontSize: "20px",
                              color: "#666",
                            }}
                            onClick={handleCirculationCalendarToggle}
                          >
                            <FontAwesomeIcon icon={faCalendarAlt} />
                          </span>
                          <DatePicker
                            selected={formik.values.dateOfCirculationOfBill}
                            onChange={handleCirculationDateSelect}
                            className={"form-control"}
                            open={isCirculationCalendarOpen}
                            onClickOutside={() =>
                              setIsCirculationCalendarOpen(false)
                            }
                            onInputClick={handleCirculationCalendarToggle}
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
                      <div className="form-group col">
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

                      <div className="col">
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

                      <div className="col">
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

                      <div className="form-group col">
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
                          Date of Publish in the Gazette
                        </label>
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
                          // onClick={handleConsiderationCalendarToggle}
                          onClick={handleGazetteCalendarToggle}
                        >
                          <FontAwesomeIcon icon={faCalendarAlt} />
                        </span>
                        <DatePicker
                          selected={formik.values.dateOfPublishInGazette}
                          onChange={handleGazetteDateSelect}
                          className={"form-control"}
                          open={isGazetteCalendarOpen}
                          onClickOutside={() => setGazetteCalendarOpen(false)}
                          onInputClick={handleGazetteCalendarToggle}
                          maxDate={new Date()}
                          dateFormat="dd-MM-yyyy"
                        />
                      </div>
                    </div>
                    <div className="col-3">
                      <div class="mb-3 " style={{ position: "relative" }}>
                        <label class="form-label">
                          Date of Assent by President
                        </label>
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
                          // onClick={handleConsiderationCalendarToggle}
                          onClick={handleAssentCalendarToggle}
                        >
                          <FontAwesomeIcon icon={faCalendarAlt} />
                        </span>
                        <DatePicker
                          selected={formik.values.dateOfAssentByThePresident}
                          onChange={handleAssentDateSelect}
                          className={"form-control"}
                          open={isAssentCalendarOpen}
                          onClickOutside={() => setAssentCalendarOpen(false)}
                          onInputClick={handleAssentCalendarToggle}
                          maxDate={new Date()}
                          dateFormat="dd-MM-yyyy"
                        />
                      </div>
                    </div>

                    {/* <div className="col-3">
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
                    </div> */}

                    {/* <div className="col-3">
                      <div class="mb-3 " style={{ position: "relative" }}>
                        <label class="form-label">Date of Passage by NA</label>
                        <span
                          style={{
                            position: "absolute",
                            right: "15px",
                            top: "36px",
                            zIndex: 1,
                            fontSize: "20px",
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
                    </div> */}
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
                        <option value="Ammendment">Ammendment</option>
                        <option value="Bill">Bill</option>
                        <option value="Committee Report">
                          Committee Report
                        </option>
                        <option value="Gazette">Gazette</option>
                        <option value="Letter Sent to Senator">
                          Letter Sent To Senator
                        </option>
                        <option value="Member Notice for Passage">
                          Member Notice For Passage
                        </option>
                        <option value="Member Notice for Withdrawal">
                          Member Notice For withdrawal
                        </option>
                        <option value="Notice">Notice</option>
                      </select>
                    </div>

                    {/* <div className="form-group col-4">
                      <label htmlFor="fileInput" className="form-label">
                        Choose File
                      </label>
                      <input
                        className="form-control"
                        type="file"
                        accept=".pdf, .jpg, .jpeg, .png"
                        id="file"
                        name="file"
                        onChange={(event) => {
                          formik.setFieldValue(
                            "file",
                            event.currentTarget.files
                          );
                        }}
                      />
                    </div> */}
                    <div className="form-group col-4">
                      <label htmlFor="fileInput" className="form-label">
                        Choose File
                      </label>
                      <input
                        className="form-control"
                        type="file"
                        accept=".pdf, .jpg, .jpeg, .png"
                        id="file"
                        name="file"
                        multiple
                        onChange={(event) => {
                          formik.setFieldValue(
                            "file",
                            event.currentTarget.files
                          );
                        }}
                      />
                    </div>
                    {singleSenateBillData &&
                      singleSenateBillData.billDocuments &&
                      singleSenateBillData.billDocuments.map((doc) => (
                        <div key={doc.id} className="document-section">
                          {doc.documentType && (
                            <div
                              className="document-type"
                              style={{
                                display: "flex",
                                color: "black",
                                alignItems: "center",
                              }}
                            >
                              <h6
                                style={{
                                  display: "flex",
                                  color: "black",
                                  fontSize: "14px",
                                  marginTop: "15px",
                                }}
                              >
                                {doc.documentType}
                              </h6>
                              <h6
                                style={{
                                  display: "flex",
                                  color: "black",
                                  fontSize: "10px",
                                  fontWeight: "bold",
                                  marginTop: "15px",
                                  marginLeft: "14px",
                                }}
                              >
                                {doc?.documentDate
                                  ? moment(doc?.documentDate).format(
                                      "DD-MM-YYYY"
                                    )
                                  : ""}
                              </h6>
                            </div>
                          )}
                          {doc.file?.map((file) => (
                            <div className="MultiFile-label mt-1" key={file.id}>
                              <a
                                className="MultiFile-remove"
                                style={{
                                  marginRight: "10px",
                                  color: "red",
                                  cursor: "pointer",
                                }}
                                // onClick={() =>
                                //   alert(
                                //     `File ID: ${file.id}, Document Type: ${doc.documentType}`
                                //   )
                                // }
                                onClick={() =>
                                  hendleRemoveImage(doc?.documentType, file?.id)
                                }
                              >
                                x
                              </a>
                              <span
                                className="MultiFile-label"
                                title={file.path.split("/").pop()}
                              >
                                <span className="MultiFile-title">
                                  <a
                                    href={`${imagesUrl}${file.path}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ cursor: "pointer" }}
                                  >
                                    {file.path.split("/").pop()}
                                  </a>
                                </span>
                              </span>
                            </div>
                          ))}
                        </div>
                      ))}

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
