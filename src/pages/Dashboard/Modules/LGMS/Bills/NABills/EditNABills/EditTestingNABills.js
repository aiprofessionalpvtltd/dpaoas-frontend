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
  getAllMinisterTenures,
  getMinisterByParliamentaryYearID,
  getMinisterParliamentaryYearsByTenure,
  getMinsistriesByTenure,
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
import BothMinisterSenator from "../AddNABills/SeparateForms/BothMinisterSenator";

const EditTestingNABills = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userData = getUserData();

  const NA_Bill_ID = location?.state && location?.state?.id;
  const BillCategory = location?.state && location?.state?.item?.billCategory;
  const BillFrom = location?.state && location?.state?.item?.billFrom;
  const { ministryData, members, sessions, parliamentaryYear } =
    useContext(AuthContext);
  const [MNAparliamentaryYearData, setMNAParliamentaryYearData] = useState([]);
  const [commiteeRecommendations, setCommitteeRecommendations] = useState([]);
  const [billStatusData, setBillStatusesData] = useState([]);
  const [ministryDataOnMinister, setMinistryDataOnMinister] = useState([]);
  const [ministerID, setMinisterID] = useState(null);
  const [MNATenures, setMNATenures] = useState([]);
  const [ministryDataOnTenure, setMinistryDataOnTenure] = useState([]);
  // const [ministerID, setMinisterID] = useState(null);
  const [MNAData, setMNAData] = useState([]);
  const [singleSenateBillData, setSingleSenateBillData] = useState([]);
  const [committieeData, setCommittieData] = useState([]);
  const [parliamentaryYearData, setParliamentaryYearData] = useState([]);
  const [membersOnParliamentaryYear, setMembersOnParliamentaryYear] = useState(
    []
  );

  const [ministerTenure, setMinisterTenure] = useState([]);
  const [memberTenure, setMemberTenure] = useState([]);
  const [ministerParliamentaryYear, setMinisterParliamentaryYear] = useState(
    []
  );
  const [memberParliamentaryYear, setMemberParliamentaryYear] = useState([]);

  const [tenuresTerms, setTenuresTerms] = useState([]);
  const [tenures, setTenures] = useState([]);
  const [ministersOnParliamentaryYear, setMinisterOnParliamentaryYear] =
    useState([]);
  const [isFormShow, setIsFormShow] = useState(false);
  const [showMinster, setShowMinister] = useState(
    location?.state?.forPerson && location?.state?.forPerson
  );

  // Date Of Bill Passed By NA State
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  // Date of Receipt of Message From NA State
  const [isDateReceiptofMessageFromNAOpen, setIsDateofReceiptofMessageFromNA] =
    useState(false);
  // Date of Circulation of Bill (Private Member Bill)
  const [isDateCirculationBillOpen, setIsDateCirculationBillOpen] =
    useState(false);
  // Date of Receipt of Notice
  const [isReceiptofNoticeOpen, setReceiptofNoticeOpen] = useState(false);
  // Date of Circulation of Notice
  const [
    isCirculationNoticeDateCalendarOpen,
    setCirculationNoticeDateCalendarOpen,
  ] = useState(false);
  // Date of Reference to Standing Committe State
  const [
    isDateofReferenceStandingCommitteeOpen,
    setDateofReferenceStandingCommitteeOpen,
  ] = useState(false);
  // Date of Presentation Report State
  const [isReportPresentationCalendarOpen, setReportPresentationCalendarOpen] =
    useState(false);
  // Date of Consideration Report State
  const [isconsiderationDateCalendarOpen, setConsiderationDateCalendarOpen] =
    useState(false);
  // Date of Passage by Senate
  const [isPassageSenateCalendarOpen, setPassageSenateCalendarOpen] =
    useState(false);
  // Date of Transmission to NA
  const [isTransmissionDateCalendarOpen, setTransmissionDateCalendarOpen] =
    useState(false);
  //Date of Assent by the Prisdent
  const [isAssentCalendarOpen, setAssentCalendarOpen] = useState(false);

  // Date of Gazette
  const [isGazetteCalendarOpen, setGazetteCalendarOpen] = useState(false);

  const [isIntroducedCalendarOpen, setIntroducedCalendarOpen] = useState(false);

  const [isReferredCalendarOpen, setReferredCalendarOpen] = useState(false);

  const [isPassageCalendarOpen, setPassageCalendarOpen] = useState(false);

  const [isPassageByNADateCalendarOpen, setPassageByNADateCalendarOpen] =
    useState(false);
  const [isDocomentDateCalendarOpen, setDocomentDateCalendarOpen] =
    useState(false);
  const [isBillStatusDateCalendarOpen, setBillStatusDateCalendarOpen] =
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

  // Getting Tenures
  const fetchTenures = async () => {
    try {
      let tenureData = [];
      if (location?.state?.forPerson === "Senators") {
        // Call `handleTenures` for Senators
        const response = await getAllTenures(0, 5000, "Senators");
        if (response?.success) {
          setMemberTenure(response?.data?.tenures);
        }
      }
      if (location?.state?.forPerson === "Ministers") {
        // Call `getAllMinisterTenure` for Ministers
        const response = await getAllMinisterTenures(0, 5000, "Ministers");
        if (response?.success) {
          setMinisterTenure(response?.data?.tenures);
        }
      }

      // Update the state to store combined tenures
      setTenures(tenureData);
    } catch (error) {
      showErrorMessage(error?.response?.data?.message || error.message);
    }
  };

  const fetchParliamentaryYears = async (id) => {
    try {
      let senatorResponse, ministerResponse;

      if (location?.state?.forPerson === "Ministers") {
        // Call API for Ministers
        ministerResponse = await getMinisterParliamentaryYearsByTenure(id);
        if (ministerResponse?.success) {
          setMinisterParliamentaryYear(ministerResponse?.data); // Update state for Ministers
        }
      }

      if (location?.state?.forPerson === "Senators") {
        // Call API for Senators
        senatorResponse = await getParliamentaryYearsByTermID(id);
        if (senatorResponse?.success) {
          setMemberParliamentaryYear(senatorResponse?.data); // Update state for Senators
        }

        // Additionally call API for Ministers within "Senators"
        ministerResponse = await getMinisterParliamentaryYearsByTenure(id);
        if (ministerResponse?.success) {
          setMinisterParliamentaryYear(ministerResponse?.data); // Update state for Ministers
        }
      } else {
        console.warn("Invalid 'forPerson' value in location.state");
      }
    } catch (error) {
      console.error(
        "Error fetching parliamentary years:",
        error?.response?.data?.message || error.message
      );
    }
  };

  // const fetchParliamentaryYears = async (id) => {
  //   try {
  //     let response;
  //     if (location?.state?.forPerson === "Ministers") {
  //       // Call API for Ministers
  //       response = await getMinisterParliamentaryYearsByTenure(id);
  //       if (response?.success) {
  //         setMinisterParliamentaryYear(response?.data); // Update state for Ministers
  //       }
  //     }  if (location?.state?.forPerson === "Senators") {
  //       // Call API for Senators
  //       response = await getParliamentaryYearsByTermID(id);
  //       if (response?.success) {
  //         setMemberParliamentaryYear(response?.data); // Update state for Senators
  //       }
  //     } else {
  //       console.warn("Invalid 'forPerson' value in location.state");
  //     }
  //   } catch (error) {
  //     console.error(
  //       "Error fetching parliamentary years:",
  //       error?.response?.data?.message || error.message
  //     );
  //   }
  // };

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

  // const getParliamentaryYearsonTheBaseOfTenure = async (id) => {
  //   try {
  //     const response = await getParliamentaryYearsByTenureID(id);
  //     if (response?.success) {
  //       console.log("MNA Paraliamenary Years", response?.data);
  //       if (BillCategory === "Private Member Bill" && BillFrom === "From NA") {
  //         setMNAParliamentaryYearData(response?.data);
  //       } else {
  //         setParliamentaryYearData(response?.data);
  //       }
  //       // setTonerModels(transformedData);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
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

  // //Get Parliamentary Year
  // const getParliamentaryYearsonTheBaseOfTerm = async (id) => {
  //   try {
  //     const response = await getParliamentaryYearsByTermID(id);
  //     if (response?.success) {
  //       setParliamentaryYearData(response?.data);
  //       // setTonerModels(transformedData);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
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

  // const handleTenures = async (selectionType) => {
  //   try {
  //     // Check if the bill is a Private Member Bill and "From NA"
  //     if (BillCategory === "Private Member Bill" && BillFrom === "From NA") {
  //       // Fetch tenures for both ministers and senators
  //       const [ministersResponse, senatorsResponse] = await Promise.all([
  //         getAllTenures(0, 1000, "Ministers"), // Ministers
  //         getAllTenures(0, 1000, "Senators"), // Senators
  //       ]);

  //       // Update state with fetched data
  //       if (ministersResponse?.success) {
  //         setMNATenures(ministersResponse?.data?.tenures);
  //       }
  //       if (senatorsResponse?.success) {
  //         setTenures(senatorsResponse?.data?.tenures);
  //       }
  //     } else {
  //       // Fetch tenures based on the selection type
  //       const response = await getAllTenures(0, 1000, selectionType);
  //       if (response?.success) {
  //         setTenures(response?.data?.tenures);
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error?.response?.data?.message);
  //   }
  // };

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
      fkMinisterTenureId: "",
      fkTermId: "",
      // Define your initial form values here
      fkParliamentaryYearId: "",
      fkMnaParliamentaryYearId: "",
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
      dateOfCirculationOfBill: "",
      dateofReciptofNotice: "",
      dateOfCirculationOfNotice: "",
      dateofReferencetoStandingCommittee: "",
      fkManageCommitteeId: "",
      committeeRecomendation: "",
      reportPresentationDate: "",
      dateOfConsiderationBill: "",
      dateofPassagebySenate: "",
      dateOfPassageBySenate: "",
      dateOfTransmissionToNA: "",
      dateOfAssentByThePresident: "",
      dateOfPublishInGazette: "",
      fkBillStatus: "",
      billStatusDate: "",
      senateBillSenatorMovers: [],
      senateBillMnaMovers: [],
      senateBillMinistryMovers: null,
      introducedInHouseDate: "",
      referedOnDate: "",
      fkMemberPassageId: "",
      memeberNoticeDate: "",
      fkSessionMemberPassageId: "",
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

  console.log(
    "Formik from Edit Testing NA",
    formik.values.fkMnaParliamentaryYearId
  );

  // Handle Passed By NA Date
  const handleCalendarToggle = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const handleDateSelect = (date) => {
    formik.setFieldValue("PassedByNADate", date);
    setIsCalendarOpen(false);
  };

  // Handle Date of Receipt of Message From NA
  const handleReceiptofMesssageFromNAToggle = () => {
    setIsDateofReceiptofMessageFromNA(!isDateReceiptofMessageFromNAOpen);
  };

  const handleReceiptofMessageFromNASelect = (date) => {
    formik.setFieldValue("DateOfReceiptOfMessageFromNA", date);
    setIsDateofReceiptofMessageFromNA(false);
  };

  // Handle Date of Circulation of Bill
  const handleDateCirculationBillToggle = () => {
    setIsDateCirculationBillOpen(!isDateCirculationBillOpen);
  };

  const handleDateCirculationBillSelect = (date) => {
    formik.setFieldValue("dateOfCirculationOfBill", date);
    setIsDateCirculationBillOpen(false);
  };

  // Handle Date of Receipt of Notice
  const handleReceiptofNoticeTogel = () => {
    setReceiptofNoticeOpen(!isReceiptofNoticeOpen);
  };

  const handleReceiptofNotice = (date) => {
    formik.setFieldValue("dateofReciptofNotice", date);
    setReceiptofNoticeOpen(false);
  };

  // Handle Date of Circulation Notice
  const handleCirculationNoticeCalendarToggle = () => {
    setCirculationNoticeDateCalendarOpen(!isCirculationNoticeDateCalendarOpen);
  };

  const handleCirculationNoticeDateSelect = (date) => {
    formik.setFieldValue("dateOfCirculationOfNotice", date);
    setCirculationNoticeDateCalendarOpen(false);
  };

  // Handle Date of Reference to Standing Committee
  const handleDateofReferenceCOmmitteeCalendarToggle = () => {
    setDateofReferenceStandingCommitteeOpen(
      !isDateofReferenceStandingCommitteeOpen
    );
  };

  const handleDateofReferenceCommitteeDateSelect = (date) => {
    formik.setFieldValue("dateofReferencetoStandingCommittee", date);
    setDateofReferenceStandingCommitteeOpen(false);
  };
  // Handle Date of Presentation Report
  const handleReportPresenatationDayCalendarToggle = () => {
    setReportPresentationCalendarOpen(!isReportPresentationCalendarOpen);
  };

  const handleReportPresenatationDateSelect = (date) => {
    formik.setFieldValue("reportPresentationDate", date);
    setReportPresentationCalendarOpen(false);
  };
  // Handle Date of Consideration
  const handleConsiderationCalendarToggle = () => {
    setConsiderationDateCalendarOpen(!isconsiderationDateCalendarOpen);
  };
  const handleconsiderationDateSelect = (date) => {
    formik.setFieldValue("dateOfConsiderationBill", date);
    setConsiderationDateCalendarOpen(false);
  };
  // Handle Date of Passage By Senate
  const handlePassageSenateCalendarToggle = () => {
    setPassageSenateCalendarOpen(!isPassageSenateCalendarOpen);
  };
  const handlePassageSenateDateSelect = (date) => {
    formik.setFieldValue("dateOfPassageBySenate", date);
    setPassageSenateCalendarOpen(false);
  };
  // Handle Date of Transmission to NA
  const handleTransmissionCalendarToggle = () => {
    setTransmissionDateCalendarOpen(!isTransmissionDateCalendarOpen);
  };

  const handleTransmissionDateSelect = (date) => {
    formik.setFieldValue("dateOfTransmissionToNA", date);
    setTransmissionDateCalendarOpen(false);
  };

  // Date of Assent by Prisdent
  const handleAssentCalendarToggle = () => {
    setAssentCalendarOpen(!isAssentCalendarOpen);
  };
  // Handale DateCHange
  const handleAssentDateSelect = (date) => {
    formik.setFieldValue("dateOfAssentByThePresident", date);
    setAssentCalendarOpen(false);
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

  const handleGazetteCalendarToggle = () => {
    setGazetteCalendarOpen(!isGazetteCalendarOpen);
  };
  // Handale DateCHange
  const handleGazetteDateSelect = (date) => {
    formik.setFieldValue("dateOfPublishInGazette", date);
    setGazetteCalendarOpen(false);
  };

  const handlePassageCalendarToggle = () => {
    setPassageCalendarOpen(!isPassageCalendarOpen);
  };
  // Handale DateCHange
  const handlePassageDateSelect = (date) => {
    formik.setFieldValue("memeberNoticeDate", date);
    setPassageCalendarOpen(false);
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
  // const handleTenures = async (selectionType) => {
  //   try {
  //     const response = await getAllTenures(0, 1000, selectionType);
  //     if (response?.success) {
  //       setTenures(response?.data?.tenures);
  //     }
  //   } catch (error) {
  //     console.log(error?.response?.data?.message);
  //   }
  // };

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

  // GetTerms on the Base of Tenure
  const getMinistriesOnTenure = async (id) => {
    try {
      const response = await getMinsistriesByTenure(id);
      if (response?.success) {
        setMinistryDataOnTenure(response?.data);
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
      showErrorMessage(error?.response?.data?.message || "Error");
    }
  };

  // //Get Parliamentary Year On The Base Of Tenure
  // const getParliamentaryYearsonTheBaseOfTenure = async (id) => {
  //   try {
  //     const response = await getParliamentaryYearsByTenureID(id);
  //     if (response?.success) {
  //       setParliamentaryYearData(response?.data);
  //       // setTonerModels(transformedData);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  //Get Members On The Base Of Parliamentary Year
  const getMembersOnParliamentaryYear = async (id) => {
    try {
      const response = await getMemberByParliamentaryYearID(id);
      if (response?.success) {
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
  console.log("singleSenateBillData", singleSenateBillData);
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
        fetchTenures(singleSenateBillData?.billFor);
        if (
          singleSenateBillData?.fkMinisterTenureId &&
          singleSenateBillData?.billFor === "Senators"
        ) {
          getMinistriesOnTenure(singleSenateBillData?.fkMinisterTenureId);
        }
      }
      if (
        singleSenateBillData?.fkTenureId &&
        singleSenateBillData?.billFor === "Senators"
      ) {
        handleTenuresTerms(singleSenateBillData?.fkTenureId);
      }
      if (
        singleSenateBillData?.billFor === "Senators" &&
        singleSenateBillData?.fkTenureId &&
        singleSenateBillData?.fkTermId &&
        singleSenateBillData?.fkMinisterTenureId
      ) {
        console.log("Condition for Senators matched");
        fetchParliamentaryYears(singleSenateBillData?.fkTermId);
        console.log("Member Parliamentary Years", memberParliamentaryYear);
        fetchParliamentaryYears(singleSenateBillData?.fkMinisterTenureId);
      } else if (
        singleSenateBillData?.fkMinisterTenureId &&
        singleSenateBillData?.billFor === "Ministers"
      ) {
        console.log("Condition for Ministers matched");
        fetchParliamentaryYears(singleSenateBillData?.fkMinisterTenureId);
      } else {
        console.log("Conditions did not match");
      }
      // if (
      //   singleSenateBillData?.fkTenureId &&
      //   singleSenateBillData?.fkTermId &&
      //   singleSenateBillData?.fkMinisterTenureId &&
      //   singleSenateBillData?.billFor === "Senators"
      // ) {
      //   fetchParliamentaryYears(singleSenateBillData?.fkTermId);
      //   fetchParliamentaryYears(singleSenateBillData?.fkMinisterTenureId);
      // } else if (
      //   singleSenateBillData?.fkMinisterTenureId &&
      //   singleSenateBillData?.billFor === "Ministers"
      // ) {
      //   fetchParliamentaryYears(singleSenateBillData?.fkMinisterTenureId);
      // }
      if (singleSenateBillData?.billFor === "Ministers") {
        console.log("Min", singleSenateBillData?.billFor);
        getMNAOnParliamentaryYear(
          singleSenateBillData?.fkMnaParliamentaryYearId
        );
      } else if (singleSenateBillData?.billFor === "Senators") {
        getMembersOnParliamentaryYear(
          singleSenateBillData?.fkParliamentaryYearId
        );
      }
      setShowMinister(singleSenateBillData?.billFor);
      if (
        singleSenateBillData &&
        Object.keys(singleSenateBillData).length > 0
      ) {
        formik.setValues({
          selectiontype: singleSenateBillData?.billFor || "",
          membertenure:
            (singleSenateBillData?.tenures && {
              value: singleSenateBillData?.tenures?.id,
              label: singleSenateBillData?.tenures?.tenureName,
            }) ||
            "",
          // membertenure:
          //   (singleSenateBillData?.tenures && {
          //     value: singleSenateBillData?.tenures?.id,
          //     label: singleSenateBillData?.tenures?.tenureName,
          //   }) ||
          //   "",

          fkMinisterTenureId:
            (singleSenateBillData?.tenuresMinisters && {
              value: singleSenateBillData?.tenuresMinisters?.id,
              label: singleSenateBillData?.tenuresMinisters?.tenureName,
            }) ||
            "",

          fkTermId:
            (singleSenateBillData?.terms && {
              value: singleSenateBillData?.terms?.id,
              label: singleSenateBillData?.terms?.termName,
            }) ||
            "",

          fkParliamentaryYearId:
            singleSenateBillData?.fkParliamentaryYearId || "",
          fkMnaParliamentaryYearId:
            singleSenateBillData?.fkMnaParliamentaryYearId || "",

          senateBillSenatorMovers: singleSenateBillData?.senateBillSenatorMovers
            ? singleSenateBillData?.senateBillSenatorMovers.map((senator) => ({
                value: senator?.member?.id,
                label: senator?.member?.memberName,
              }))
            : [],

          senateBillMnaMovers: singleSenateBillData?.senateBillMnaMovers
            ? {
                value: singleSenateBillData?.senateBillMnaMovers[0]?.mna?.id,
                label:
                  singleSenateBillData?.senateBillMnaMovers[0]?.mna?.mnaName,
              }
            : null,

          fkSessionId: singleSenateBillData?.fkSessionId || "",
          billCategory: singleSenateBillData?.billCategory || "",
          billType: singleSenateBillData?.billType || "",
          // billStatuses: singleSenateBillData?.billStatuses || "",
          fileNumber: fileNum || "",
          PassedByNADate: singleSenateBillData?.PassedByNADate
            ? moment(
                singleSenateBillData?.PassedByNADate,
                "YYYY-MM-DD"
              ).toDate()
            : null,
          DateOfReceiptOfMessageFromNA:
            singleSenateBillData?.DateOfReceiptOfMessageFromNA
              ? moment(
                  singleSenateBillData?.DateOfReceiptOfMessageFromNA,
                  "YYYY-MM-DD"
                ).toDate()
              : null,
          dateofReferencetoStandingCommittee:
            singleSenateBillData?.dateofReferencetoStandingCommittee
              ? moment(
                  singleSenateBillData?.dateofReferencetoStandingCommittee,
                  "YYYY-MM-DD"
                ).toDate()
              : null,
          dateofReciptofNotice: singleSenateBillData?.dateofReciptofNotice
            ? moment(
                singleSenateBillData?.dateofReciptofNotice,
                "YYYY-MM-DD"
              ).toDate()
            : null,
          dateOfCirculationOfNotice:
            singleSenateBillData?.dateOfCirculationOfNotice
              ? moment(
                  singleSenateBillData?.dateOfCirculationOfNotice,
                  "YYYY-MM-DD"
                ).toDate()
              : null,
          noticeDate: singleSenateBillData?.noticeDate
            ? moment(singleSenateBillData?.noticeDate, "YYYY-MM-DD").toDate()
            : null,

          //   dateofReciptofNotice:
          // singleSenateBillData?.dateofReciptofNotice
          //   ? moment(
          //       singleSenateBillData?.dateofReciptofNotice,
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

          fkBillStatus:
            (singleSenateBillData?.billStatuses && {
              value: singleSenateBillData?.billStatuses?.id,
              label: singleSenateBillData?.billStatuses?.billStatusName,
            }) ||
            "",

          senateBillMinistryMovers:
            singleSenateBillData?.senateBillMinistryMovers
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
          //   ? singleSenateBillData?.senateBillMnaMovers.map((minister) => ({
          //       value: minister?.mna?.id,
          //       label: minister?.mna?.mnaName,
          //     }))
          //   : [],
          // senateBillMinistryMovers: singleSenateBillData?.senateBillMinistryMovers
          //   ? singleSenateBillData?.senateBillMinistryMovers.map((senator) => ({
          //       value: senator?.ministrie?.id,
          //       label: senator?.ministrie?.ministryName,
          //     }))
          //   : [],
          senateBillMinistryMovers:
            singleSenateBillData?.senateBillMinistryMovers
              ? {
                  value:
                    singleSenateBillData?.senateBillMinistryMovers[0]
                      ?.ministries?.id,
                  label:
                    singleSenateBillData?.senateBillMinistryMovers[0]
                      ?.ministries?.ministryName,
                }
              : null,
          introducedInHouseDate:
            singleSenateBillData?.introducedInHouses &&
            singleSenateBillData?.introducedInHouses?.introducedInHouseDate
              ? moment(
                  singleSenateBillData?.introducedInHouses
                    ?.introducedInHouseDate,
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
                singleSenateBillData?.introducedInHouses
                  ?.reportPresentationDate,
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
            ? moment(
                singleSenateBillData?.billStatusDate,
                "YYYY-MM-DD"
              ).toDate()
            : "",
        });
      }
    }
  }, [singleSenateBillData]);

  const logFormDataTypes = (formData) => {
    console.log("Logging FormData types and values:");
    for (const [key, value] of formData.entries()) {
      console.log(`Key: ${key}, Value: ${value}, Type: ${typeof value}`);
    }
  };

  // console.log("PAAAA FIle", singleSenateBillData?.billDocuments);
  const UpdateNationalAssemblyBill = async (values) => {
    const formData = new FormData();
    console.log("values Update", values);
    if (
      BillCategory === "Government Bill" &&
      location?.state?.forPerson === "Ministers"
    ) {
      formData.append("fkMinisterTenureId", values?.fkMinisterTenureId?.value);
    } else {
      formData.append("fkMinisterTenureId", values?.fkMinisterTenureId?.value);
      formData.append("fkTenureId", values?.membertenure?.value);
    }
    // if (values?.fkTermId?.value) {
    //   formData.append("fkTermId", values?.fkTermId?.value);
    // }
    if (
      BillCategory === "Government Bill" &&
      location?.state?.forPerson === "Ministers"
    ) {
      formData.append(
        "fkMnaParliamentaryYearId",
        values?.fkMnaParliamentaryYearId
      );
    }
    if (
      BillCategory === "Private Member Bill" &&
      BillFrom === "From NA" &&
      location?.state?.forPerson === "Senators"
    ) {
      formData.append(
        "fkMnaParliamentaryYearId",
        values?.fkMnaParliamentaryYearId
      );
      formData.append("fkParliamentaryYearId", values?.fkParliamentaryYearId);
      // formData.append()
    }
    // formData.append("fkParliamentaryYearId", values?.fkParliamentaryYearId);
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
    // formData.append("fkTenureId", values?.membertenure?.value);
    if (values?.fkTermId?.value) {
      formData.append("fkTermId", values?.fkTermId?.value);
    }
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
    // if (values?.dateofReciptofNotice) {
    //   formData.append(
    //     "dateofReciptofNotice",
    //     values?.dateofReciptofNotice
    //   );
    // }
    if (values?.dateofReciptofNotice) {
      const formattedDate = moment(values?.dateofReciptofNotice).format(
        "YYYY-MM-DD"
      );
      formData.append("dateofReciptofNotice", formattedDate);
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
    if (values?.dateOfCirculationOfNotice) {
      const formattedDate = moment(values?.dateOfCirculationOfNotice).format(
        "YYYY-MM-DD"
      );
      formData.append("dateOfCirculationOfNotice", formattedDate);
    }
    // if (values?.dateofReciptofNotice) {
    //   const formattedDate = moment(values?.dateofReciptofNotice).format(
    //     "YYYY-MM-DD"
    //   );
    //   formData.append("dateofReciptofNotice", formattedDate);
    // }
    if (values?.dateofReferencetoStandingCommittee) {
      const formattedDate = moment(
        values?.dateofReferencetoStandingCommittee
      ).format("YYYY-MM-DD");
      formData.append("dateofReferencetoStandingCommittee", formattedDate);
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
    if (values?.senateBillSenatorMovers?.length > 0) {
      values?.senateBillSenatorMovers?.forEach((senator, index) => {
        formData.append(
          `senateBillSenatorMovers[${index}][fkSenatorId]`,
          senator?.value
        );
      });
    }
    if (
      BillCategory === "Private Member" &&
      location?.state?.forPerson === "Senators"
    ) {
      formData.append(
        `senateBillMnaMovers[${0}][fkMnaId]`,
        values?.senateBillMnaMovers?.value
      );
      formData.append(
        `senateBillMinistryMovers[${0}][fkMinistryId]`,
        values?.senateBillMinistryMovers?.value
      );
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
    if (values?.senateBillMinistryMovers?.length > 0) {
      formData.append(
        `senateBillMinistryMovers[${0}][fkMinistryId]`,
        values?.senateBillMinistryMovers?.value
      );
    }

    logFormDataTypes(formData);

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
                  <h1>
                    {location?.state?.forPerson === "Ministers"
                      ? "Update Bill (Government Bill /Received From NA) "
                      : "Update Bill (Private Member Bill /Received From NA) "}
                  </h1>
                </div>
                <div className="card-body">
                  <div className="container-fluid">
                    <div className="row">
                      {BillCategory === "Private Member Bill" &&
                        BillFrom === "From NA" && (
                          <BothMinisterSenator
                            // fkMinisterTenureId={}
                            // MNATenures={MNATenures}
                            ministerParliamentaryYear={
                              ministerParliamentaryYear
                            }
                            ministersOnParliamentaryYear={
                              ministersOnParliamentaryYear
                            }
                            // fetchParliamentaryYears={fetchParliamentaryYears}
                            ministryDataOnMinister={ministryDataOnMinister}
                            formik={formik}
                            // getParliamentaryYearsonTheBaseOfTenure={
                            //   getParliamentaryYearsonTheBaseOfTenure
                            // }
                            getMNAOnParliamentaryYear={
                              getMNAOnParliamentaryYear
                            }
                            setMinisterID={setMinisterID}
                            getMinistriesOnTenure={getMinistriesOnTenure}
                            ministryDataOnTenure={ministryDataOnTenure}
                          />
                        )}
                      <div className="col">
                        {/* {showMinster === "Ministers" ? (
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
                              fetchParliamentaryYears(selectedOption?.value);
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
                          )} */}

                        {showMinster === "Ministers" ? (
                          <>
                            <label className="form-label">
                              Minister Tenure
                            </label>
                            <Select
                              options={
                                Array.isArray(ministerTenure) &&
                                ministerTenure?.length > 0
                                  ? ministerTenure.map((item) => ({
                                      value: item?.id,
                                      label: `${item?.tenureName} (${item?.tenureType})`,
                                      tenureType: item?.tenureType,
                                    }))
                                  : []
                              }
                              onChange={(selectedOption) => {
                                formik.setFieldValue(
                                  "fkMinisterTenureId",
                                  selectedOption
                                );
                                fetchParliamentaryYears(selectedOption?.value);
                                getMinistriesOnTenure(selectedOption?.value);
                                formik.setFieldValue("fkTermId", "");
                                formik.setFieldValue("parliamentaryYear", "");
                                formik.setFieldValue("selectedSenator", "");
                              }}
                              onBlur={formik.handleBlur}
                              value={formik.values.fkMinisterTenureId}
                              id="fkMinisterTenureId"
                              name="fkMinisterTenureId"
                              isClearable={true}
                            />
                            {formik.touched.fkMinisterTenureId &&
                              formik.errors.fkMinisterTenureId && (
                                <div className="invalid-feedback">
                                  {formik.errors.fkMinisterTenureId}
                                </div>
                              )}
                          </>
                        ) : (
                          <>
                            <label className="form-label">Member Tenure</label>
                            <Select
                              options={
                                Array.isArray(memberTenure) &&
                                memberTenure?.length > 0
                                  ? memberTenure.map((item) => ({
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
                                handleTenuresTerms(selectedOption?.value);
                                formik.setFieldValue("fkTermId", "");
                                formik.setFieldValue("parliamentaryYear", "");
                                formik.setFieldValue("selectedSenator", "");
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
                          </>
                        )}
                      </div>
                      {showMinster !== "Ministers" && (
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
                                formik.setFieldValue(
                                  "fkTermId",
                                  selectedOption
                                );
                                formik.setFieldValue(
                                  "fkParliamentaryYearId",
                                  ""
                                );
                                formik.setFieldValue(
                                  "senateBillSenatorMovers",
                                  ""
                                );
                                if (selectedOption?.value) {
                                  fetchParliamentaryYears(
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
                      )}

                      <div class="col">
                        <div class="mb-3">
                          {showMinster === "Ministers" ? (
                            <>
                              <label className="form-label">
                                {" "}
                                Parliamentary Year
                              </label>
                              <select
                                id="fkMnaParliamentaryYearId"
                                name="fkMnaParliamentaryYearId"
                                className={`form-select ${
                                  formik.touched.fkMnaParliamentaryYearId &&
                                  formik.errors.fkMnaParliamentaryYearId
                                    ? "is-invalid"
                                    : ""
                                }`}
                                onBlur={formik.handleBlur}
                                onChange={(e) => {
                                  const selectedId = e.target.value;
                                  formik.handleChange(e);
                                  formik.setFieldValue(
                                    "fkMnaParliamentaryYearId",
                                    selectedId
                                  );
                                  formik.setFieldValue(
                                    "senateBillMinistryMovers",
                                    []
                                  );
                                  setMembersOnParliamentaryYear([]);
                                  getMembersOnParliamentaryYear(selectedId);
                                }}
                                value={formik.values.fkMnaParliamentaryYearId}
                              >
                                <option value="" disabled hidden>
                                  Select
                                </option>
                                {ministerParliamentaryYear?.map((item) => (
                                  <option key={item?.id} value={item?.id}>
                                    {item?.parliamentaryTenure}
                                  </option>
                                ))}
                              </select>
                              {formik.touched.fkMnaParliamentaryYearId &&
                                formik.errors.fkMnaParliamentaryYearId && (
                                  <div className="invalid-feedback">
                                    {formik.errors.fkMnaParliamentaryYearId}
                                  </div>
                                )}
                            </>
                          ) : (
                            <>
                              <label className="form-label">
                                Member Parliamentary Year
                              </label>
                              <select
                                id="memberParliamentaryYearId"
                                name="memberParliamentaryYearId"
                                className={`form-select ${
                                  formik.touched.fkParliamentaryYearId &&
                                  formik.errors.fkParliamentaryYearId
                                    ? "is-invalid"
                                    : ""
                                }`}
                                onBlur={formik.handleBlur}
                                onChange={(e) => {
                                  const selectedId = e.target.value;
                                  formik.handleChange(e);
                                  formik.setFieldValue(
                                    "fkParliamentaryYearId",
                                    selectedId
                                  );
                                  formik.setFieldValue(
                                    "senateBillMnaMovers",
                                    []
                                  );
                                  setMembersOnParliamentaryYear([]);
                                  getMNAOnParliamentaryYear(selectedId);
                                }}
                                value={formik.values.fkParliamentaryYearId}
                              >
                                <option value="" disabled hidden>
                                  Select
                                </option>
                                {memberParliamentaryYear?.map((item) => (
                                  <option key={item?.id} value={item?.id}>
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
                            </>
                          )}
                          {/* {showMinster === "Ministers" ? (
                            <label className="form-label">
                              Parliamentary Year
                            </label>
                          ) : (
                            <label className="form-label">
                              Parliamentary Year
                            </label>
                          )}

                        
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
                              formik.setFieldValue("senateBillMnaMovers", []);
                              formik.setFieldValue(
                                "senateBillMinistryMovers",
                                []
                              );
                              formik.setFieldValue(
                                "senateBillSenatorMovers",
                                []
                              );
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
                            )} */}
                        </div>
                      </div>
                      {showMinster === "Ministers" ? (
                        <>
                          <div class="col">
                            <div class="mb-3">
                              <label class="form-label">Introduced By</label>
                              <Select
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
                              Concerned Ministry
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
                                Constitution Amendment Bill
                              </option>
                              <option value="New Bill">New Law</option>
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
                      <div className="col-3">
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

                      <div className="col-3">
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
                            onClick={handleReceiptofMesssageFromNAToggle}
                          >
                            <FontAwesomeIcon icon={faCalendarAlt} />
                          </span>

                          <DatePicker
                            selected={
                              formik.values.DateOfReceiptOfMessageFromNA
                            }
                            onChange={handleReceiptofMessageFromNASelect}
                            onBlur={formik.handleBlur}
                            className={`form-control ${
                              formik.touched.DateOfReceiptOfMessageFromNA &&
                              formik.errors.DateOfReceiptOfMessageFromNA
                                ? "is-invalid"
                                : ""
                            }`}
                            name="DateOfReceiptOfMessageFromNA"
                            open={isDateReceiptofMessageFromNAOpen}
                            onClickOutside={() =>
                              setIsDateofReceiptofMessageFromNA(false)
                            }
                            onInputClick={handleReceiptofMesssageFromNAToggle}
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

                    {/* <div className="row">
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
                    </div> */}

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
                      {/* <div class="col">
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
                      </div> */}
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
                            onClick={handleDateCirculationBillToggle}
                          >
                            <FontAwesomeIcon icon={faCalendarAlt} />
                          </span>
                          <DatePicker
                            selected={formik.values.dateOfCirculationOfBill}
                            onChange={handleDateCirculationBillSelect}
                            className={"form-control"}
                            open={isDateCirculationBillOpen}
                            onClickOutside={() =>
                              setIsDateCirculationBillOpen(false)
                            }
                            onInputClick={handleDateCirculationBillToggle}
                            maxDate={new Date()}
                            dateFormat="dd-MM-yyyy"
                          />
                        </div>
                      </div>

                      <div className="col-3">
                        <div class="mb-3 " style={{ position: "relative" }}>
                          <label class="form-label">
                            Date of Receipt of Notice
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
                            onClick={handleReceiptofNoticeTogel}
                          >
                            <FontAwesomeIcon icon={faCalendarAlt} />
                          </span>
                          <DatePicker
                            selected={formik.values.dateofReciptofNotice}
                            onChange={handleReceiptofNotice}
                            className={"form-control"}
                            open={isReceiptofNoticeOpen}
                            onClickOutside={() => setReceiptofNoticeOpen(false)}
                            onInputClick={handleReceiptofNoticeTogel}
                            maxDate={new Date()}
                            dateFormat="dd-MM-yyyy"
                          />
                        </div>
                      </div>

                      <div className="col-3">
                        <div class="mb-3 " style={{ position: "relative" }}>
                          <label class="form-label">
                            Date of Circulation of Notice
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
                            onClick={handleCirculationNoticeCalendarToggle}
                          >
                            <FontAwesomeIcon icon={faCalendarAlt} />
                          </span>
                          <DatePicker
                            selected={formik.values.dateOfCirculationOfNotice}
                            onChange={handleCirculationNoticeDateSelect}
                            className={"form-control"}
                            open={isCirculationNoticeDateCalendarOpen}
                            onClickOutside={() =>
                              handleCirculationNoticeDateSelect(false)
                            }
                            onInputClick={handleCirculationNoticeCalendarToggle}
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
                    </div>

                    <div className="row">
                      <div className="col-3">
                        <div class="mb-3 " style={{ position: "relative" }}>
                          <label class="form-label">
                            Date of Reference to Standing Committee
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
                            onClick={
                              handleDateofReferenceCOmmitteeCalendarToggle
                            }
                          >
                            <FontAwesomeIcon icon={faCalendarAlt} />
                          </span>
                          <DatePicker
                            selected={
                              formik.values.dateofReferencetoStandingCommittee
                            }
                            onChange={handleDateofReferenceCommitteeDateSelect}
                            className={"form-control"}
                            open={isDateofReferenceStandingCommitteeOpen}
                            onClickOutside={() =>
                              handleDateofReferenceCommitteeDateSelect(false)
                            }
                            onInputClick={
                              handleDateofReferenceCOmmitteeCalendarToggle
                            }
                            maxDate={new Date()}
                            dateFormat="dd-MM-yyyy"
                          />
                        </div>
                      </div>
                      <div className="col-3">
                        <label className="form-label">
                          Concerned Committee
                        </label>
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
                      </div>
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
                            Date of presenation of report
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

                      {/* <div className="form-group col">
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
                      </div> */}

                      {/* <div className="col">
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
                      </div> */}

                      {/* <div className="form-group col">
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
                      </div> */}
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
                        <option value="Message From NA">Message From NA</option>

                        <option value="Letter circulated to Members/Ministries under rule 118">
                          Letter circulated to Members/Ministries under rule 118
                        </option>
                        <option value="Notice under rule 119">
                          Notice under rule 119
                        </option>
                        <option value="Referred to Standing Committee">
                          Referred to Standing Committee
                        </option>
                        <option value="Bill as introduced">
                          Bill as introduced
                        </option>
                        <option value="Report">Report</option>
                        <option value="Bill as Reported">
                          Bill as Reported
                        </option>
                        <option value="Bill passed">Bill Passed</option>
                        <option value="Message Transmitted to NA under rule 125">
                          Message Transmitted to NA under rule 125
                        </option>
                        <option value="Bill not Passed by senate with in 90 days">
                          Bill not Passed by senate with in 90 days
                        </option>
                        <option value="Bill sent for assent">
                          Bill sent for assent
                        </option>
                        <option value="Bill Returend by President">
                          Bill Returend by President
                        </option>
                        <option value="Sent for Gazette">
                          Sent for Gazette
                        </option>
                        <option value="Published in the Gazette">
                          Published in the Gazette
                        </option>
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

export default EditTestingNABills;
