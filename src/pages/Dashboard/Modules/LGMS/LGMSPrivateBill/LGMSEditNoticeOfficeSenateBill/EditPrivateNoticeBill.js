import React, { useEffect, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import { useFormik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import moment from "moment";
import * as Yup from "yup";
import { getUserData } from "../../../../../../api/Auth";
import { AuthContext } from "../../../../../../api/AuthContext";
import { ToastContainer } from "react-toastify";
import {
  AllManageCommitties,
  DeleteBillDocumentTypeAttachemnt,
  getAllBillStatus,
  getAllCommitteeRecommendation,
  getAllMinisterTenures,
  getAllMNALists,
  getMinisterByParliamentaryYearID,
  getMinisterParliamentaryYearsByTenure,
} from "../../../../../../api/APIs/Services/LegislationModule.service";
import {
  getAllTenures,
  getMemberByParliamentaryYearID,
  getParliamentaryYearsByTermID,
  getTermByTenureID,
} from "../../../../../../api/APIs/Services/ManageQMS.service";
import { getSingleMinisteryByMinisterID } from "../../../../../../api/APIs/Services/Motion.service";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";
import { imagesUrl } from "../../../../../../api/APIs";
import { LegislationSideBarItems } from "../../../../../../utils/sideBarItems";
import { Layout } from "../../../../../../components/Layout";
import {
  getLegislativeBillById,
  UpdateLegislativeBillById,
} from "../../../../../../api/APIs/Services/Notice.service";
const validationSchema = Yup.object({
  fkParliamentaryYearId: Yup.string().required(
    "Parliamentary Year is required"
  ),
  fkSessionId: Yup.string().required("Session is required"),
  noticeDate: Yup.string().required("Notice Date is required"),
  fileNumber: Yup.string().required("File Number is required"),
  billType: Yup.string().required("Bill Type is required"),
  title: Yup.string().required("Bill Title is required"),
  // senateBillSenatorMovers: Yup.array().required("Senator is required"),
  senateBillMnaMovers: Yup.object().required("Minister is required"),
  senateBillMinistryMovers: Yup.object().required("Ministery is required"),
});

const TestingNoticePrivateMemberBill = () => {
  const location = useLocation();

  const [tenuresTerms, setTenuresTerms] = useState([]);
  const navigate = useNavigate();
  const userData = getUserData();
  const NoticePrivateBillId = location?.state && location?.state?.id;
  const BillCategory = "Private Member Bill";

  const BillFrom = location?.state && location?.state?.item?.billFrom;

  const { members, sessions, parliamentaryYear } = useContext(AuthContext);
  const [billStatusData, setBillStatusesData] = useState([]);
  const [MNAData, setMNAData] = useState([]);
  const [singleSenateBillData, setSingleSenateBillData] = useState([]);
  const [committieeData, setCommittieData] = useState([]);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isIntroducedCalendarOpen, setIntroducedCalendarOpen] = useState(false);
  const [ministerID, setMinisterID] = useState(null);
  const [editTimeMinisterID, setEditTimeMinister] = useState(null);
  const [ministryDataOnMinister, setMinistryDataOnMinister] = useState([]);
  // const [isDateofReciptCalendarOpen, setIsDateofReciptCalendarOpen] =
  //   useState(false);
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
  const [isGazetteCalendarOpen, setGazetteCalendarOpen] = useState(false);
  const [isAssentCalendarOpen, setAssentCalendarOpen] = useState(false);
  const [isRecepitMesageDateCalendarOpen, setRecepitMesageDateCalendarOpen] =
    useState(false);
  const [
    isDateofWithDrawalUnderRule115Open,
    setIsDateofWithDrawalUnderRule115Open,
  ] = useState(false);
  const [isPassageByNADateCalendarOpen, setPassageByNADateCalendarOpen] =
    useState(false);
  const [isDocomentDateCalendarOpen, setDocomentDateCalendarOpen] =
    useState(false);
  const [isBillStatusDateCalendarOpen, setBillStatusDateCalendarOpen] =
    useState(false);
  const [isJointSettingDateCalendarOpen, setJointsettingDateCalendarOpen] =
    useState(false);
  const [filePath, setFilePath] = useState("");
  const [commiteeRecommendations, setCommitteeRecommendations] = useState([]);
  const [tenures, setTenures] = useState([]);
  const [membersOnParliamentaryYear, setMembersOnParliamentaryYear] = useState(
    []
  );

  const [ministersOnParliamentaryYear, setMinisterOnParliamentaryYear] =
    useState([]);
  const [ministersOnParliamentaryYearData, setMinisterParliamentaryYearData] =
    useState([]);
  const [isFormShow, setIsFormShow] = useState(false);
  const [showMinster, setShowMinister] = useState(
    location?.state?.forPerson && location?.state?.forPerson
  );
  //  Getting All Committees Recommendation
  const GetAllCommittiesRecommendation = async () => {
    try {
      const response = await getAllCommitteeRecommendation(0, 5000);

      if (response?.success) {
        setCommitteeRecommendations(
          response?.data?.manageCommitteeRecomendation
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  //  Getting All Committees API
  const GetAllCommittiesApi = async () => {
    try {
      const response = await AllManageCommitties(0, 5000);

      if (response?.success) {
        setCommittieData(response?.data?.manageCommittees);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // Getting All Bill Statuses
  const getAllBillStatusData = async () => {
    try {
      const response = await getAllBillStatus(0, 5000);

      if (response?.success) {
        setBillStatusesData(response?.data?.billStatus);
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

  const fetchParliamentaryYears = async (id) => {
    try {
      let response;
      if (location?.state?.forPerson === "Ministers") {
        // Call API for Ministers
        response = await getMinisterParliamentaryYearsByTenure(id);
        if (response?.success) {
          setMinisterParliamentaryYearData(response?.data); // Update state for Ministers
        }
      } else if (location?.state?.forPerson === "Senators") {
        // Call API for Senators
        response = await getParliamentaryYearsByTermID(id);
        if (response?.success) {
          setMinisterParliamentaryYearData(response?.data); // Update state for Senators
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
  useEffect(() => {
    getAllBillStatusData();
    getAllMNA();
    GetAllCommittiesApi();
    GetAllCommittiesRecommendation();
    if (ministerID) {
      getMinisteryByMinisterIdApi();
    }
  }, [ministerID]);
  const formik = useFormik({
    initialValues: {
      // Define your initial form values here
      selectiontype: "",
      membertenure: "",
      tenuresMinisters: "",
      fkTermId: "",
      fkParliamentaryYearId: "",
      fkMnaParliamentaryYearId: "",
      fkSessionId: "",
      noticeOfficeDiaryTime: "",
      diary_number: "",
      noticeofficeDate: "",
      billCategory: "",
      billType: "",
      fkBillStatus: "",
      billStatusDate: "",
      fileNumber: "",
      noticeDate: "",
      title: "",
      billText: "",
      billRemarks: "",
      senateBillSenatorMovers: null,
      senateBillMnaMovers: null,
      senateBillMinistryMovers: null,
      introducedInHouseDate: "",
      fkManageCommitteeId: "",
      referedOnDate: "",
      committeeRecomendation: "",
      reportPresentationDate: "",
      fkMemberPassageId: "",
      actNo: "",
      dateOfJointSitting: "",
      memeberNoticeDate: "",
      dateofWithDrawalrule115: "",
      dateOfConsiderationBill: "",
      dateOfPublishInGazette: "",
      dateOfAssentByThePresident: "",
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
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      UpdateNationalAssemblyBill(values);
    },
  });
  const handleCalendarToggle = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };
  // Handale DateCHange
  const handleDateSelect = (date) => {
    formik.setFieldValue("noticeDate", date);
    setIsCalendarOpen(false);
  };

  const handleIntroducedCalendarToggle = () => {
    setIntroducedCalendarOpen(!isIntroducedCalendarOpen);
  };
  // Handale DateCHange
  const handleIntroducedDateSelect = (date) => {
    formik.setFieldValue("introducedInHouseDate", date);
    setIntroducedCalendarOpen(false);
  };
  const handleBillStatusCalendarToggle = () => {
    setBillStatusDateCalendarOpen(!isBillStatusDateCalendarOpen);
  };
  // Handale DateCHange
  const handleBillStatustDateSelect = (date) => {
    formik.setFieldValue("billStatusDate", date);
    setBillStatusDateCalendarOpen(false);
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
  const handleDateofWithDrawal = (date) => {
    formik.setFieldValue("dateofWithDrawalrule115", date);
    setIsDateofWithDrawalUnderRule115Open(false);
  };

  const handleDateofWithDrawalToggle = () => {
    setIsDateofWithDrawalUnderRule115Open(!isDateofWithDrawalUnderRule115Open);
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

  //  Start of Handle Date of Joint Setting
  const handleJointDateCalendarToggle = () => {
    setJointsettingDateCalendarOpen(!isJointSettingDateCalendarOpen);
  };

  const handleJointDateSelect = (date) => {
    formik.setFieldValue("dateOfJointSitting", date);
    setJointsettingDateCalendarOpen(false);
  };
  //  End of Handle Date of Joint Setting

  const fetchTenures = async () => {
    try {
      let tenureData = [];
      if (location?.state?.forPerson === "Senators") {
        // Call `handleTenures` for Senators
        const response = await getAllTenures(0, 5000, "Senators");
        if (response?.success) {
          tenureData = response?.data?.tenures;
        }
      } else if (location?.state?.forPerson === "Ministers") {
        // Call `getAllMinisterTenure` for Ministers
        const response = await getAllMinisterTenures(0, 5000, "Ministers");
        if (response?.success) {
          tenureData = response?.data?.tenures;
        }
      }

      // Update the state to store combined tenures
      setTenures(tenureData);
    } catch (error) {
      console.error(error?.response?.data?.message || error.message);
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

  // //Get Parliamentary Year On The Base Of Tenure
  // const getParliamentaryYearsonTheBaseOfTenure = async (id) => {
  //   try {
  //     const response = await getParliamentaryYearsByTenureID(id);
  //     if (response?.success) {
  //       console.log(response?.data?.data);
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

  useEffect(() => {
    // getAllMNA();
    // handleTenures(formik?.selectionType);
    // if (ministerID) {
    //   getMinisteryByMinisterIdApi();
    // }
  }, []);

  // Get Single Record
  const getNotciePrivateMemberBillByID = async () => {
    try {
      const response = await getLegislativeBillById(
        NoticePrivateBillId && NoticePrivateBillId
      );
      if (response?.success) {
        setSingleSenateBillData(response?.data[0]);
        // setMinisterID(response?.data[0]?.senateBillMnaMovers[0]?.fkMnaId);
      }
    } catch (error) {
      console.log("error", error);
      // showErrorMessage(error?.response?.data?.message);
    }
  };
  // Remove Bill Attachemnts
  const hendleRemoveImage = async (docType, fileId) => {
    const data = {
      documentType: docType,
      fileId: fileId,
    };
    try {
      const response = await DeleteBillDocumentTypeAttachemnt(
        NoticePrivateBillId,
        data
      );
      if (response?.success) {
        getNotciePrivateMemberBillByID();
        showSuccessMessage(response.message);
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  };

  // Getting Data By Single ID and Setting It
  useEffect(() => {
    if (NoticePrivateBillId) {
      getNotciePrivateMemberBillByID();
    }
  }, [NoticePrivateBillId]);
  useEffect(() => {
    if (singleSenateBillData) {
      let fileNum = "";
      if (singleSenateBillData?.legislativeBill?.fileNumber) {
        const fileNumberMatch =
          singleSenateBillData?.legislativeBill?.fileNumber?.match(/\((\d+)\)/);
        fileNum = fileNumberMatch ? fileNumberMatch[1] : "";
      }
      const file =
        singleSenateBillData?.legislativeBill?.billDocumentsLegis?.file?.[0];
      let parsedFile = null;
      if (file) {
        try {
          parsedFile = JSON.parse(file);
          setFilePath(parsedFile.path);
        } catch (error) {
          console.error("Error parsing file:", error);
        }
      }

      const firstDocument =
        singleSenateBillData?.legislativeBill?.billDocumentsLegis?.[0];
      let parsedFiles = [];
      if (firstDocument && firstDocument.file) {
        parsedFiles = firstDocument.file.map((file) => file.path);
      }
      if (singleSenateBillData?.legislativeBill?.billFor) {
        fetchTenures(singleSenateBillData?.legislativeBill?.billFor);
      }
      if (
        singleSenateBillData?.legislativeBill?.fkTenureId &&
        singleSenateBillData?.legislativeBill?.billFor === "Senators"
      ) {
        handleTenuresTerms(singleSenateBillData?.legislativeBill?.fkTenureId);
      }
      if (
        singleSenateBillData?.legislativeBill?.fkTermId &&
        singleSenateBillData?.legislativeBill?.billFor === "Senators"
      ) {
        fetchParliamentaryYears(
          singleSenateBillData?.legislativeBill?.fkTermId
        );
      } else if (
        singleSenateBillData?.legislativeBill?.fkMinisterTenureId &&
        singleSenateBillData?.legislativeBill?.billFor === "Ministers"
      ) {
        fetchParliamentaryYears(
          singleSenateBillData?.legislativeBill?.fkMinisterTenureId
        );
      }
      if (singleSenateBillData?.legislativeBill?.billFor === "Ministers") {
        getMNAOnParliamentaryYear(
          singleSenateBillData?.legislativeBill?.fkMnaParliamentaryYearId
        );
      } else {
        getMembersOnParliamentaryYear(
          singleSenateBillData?.legislativeBill?.fkParliamentaryYearId
        );
      }
      setShowMinister(singleSenateBillData?.legislativeBill?.billFor);
      formik.setValues({
        selectiontype: singleSenateBillData?.legislativeBill?.billFor || "",
        membertenure: singleSenateBillData?.legislativeBill?.tenures
          ? {
              value: singleSenateBillData?.legislativeBill?.tenures?.id,
              label: singleSenateBillData?.legislativeBill?.tenures?.tenureName,
            }
          : "",

        fkTermId:
          (singleSenateBillData?.legislativeBill?.terms && {
            value: singleSenateBillData?.legislativeBill?.terms?.id,
            label: singleSenateBillData?.legislativeBill?.terms?.termName,
          }) ||
          "",

        fkParliamentaryYearId:
          (singleSenateBillData?.legislativeBill?.fkParliamentaryYearId &&
            singleSenateBillData?.legislativeBill?.fkParliamentaryYearId) ||
          null,

        fkSessionId: singleSenateBillData?.legislativeBill?.fkSessionId || "",
        billCategory: singleSenateBillData?.legislativeBill?.billCategory || "",
        billType: singleSenateBillData?.legislativeBill?.billType || "",
        // fkBillStatus:
        //   singleSenateBillData?.billStatuses &&
        //     singleSenateBillData?.billStatuses ||
        //   "",
        fkBillStatus:
          (singleSenateBillData?.legislativeBill?.billStatuses && {
            value: singleSenateBillData?.legislativeBill?.billStatuses?.id,
            label:
              singleSenateBillData?.legislativeBill?.billStatuses
                ?.billStatusName,
          }) ||
          "",
        fileNumber: fileNum || "",
        noticeDate: singleSenateBillData?.legislativeBill?.noticeDate
          ? moment(
              singleSenateBillData?.legislativeBill?.noticeDate,
              "YYYY-MM-DD"
            ).toDate()
          : "",

        title: singleSenateBillData?.legislativeBill?.title || "",
        noticeOfficeDiaryTime:
          singleSenateBillData?.legislativeBill?.noticeOfficeDiaryTime &&
          singleSenateBillData?.legislativeBill?.noticeOfficeDiaryTime,
        noticeofficeDate:
          (singleSenateBillData?.legislativeBill?.date &&
            new Date(singleSenateBillData?.legislativeBill?.date)) ||
          "",
        diary_number: singleSenateBillData?.legislativeBill?.diary_number || "",
        billText: singleSenateBillData?.legislativeBill?.billText || "",
        billRemarks: singleSenateBillData?.legislativeBill?.billRemarks || "",
        senateBillSenatorMovers: singleSenateBillData?.legislativeBill
          ?.legislationMovers
          ? singleSenateBillData?.legislativeBill?.legislationMovers.map(
              (senator) => ({
                value: senator?.member?.id,
                label: senator?.member?.memberName,
              })
            )
          : [],

        introducedInHouseDate:
          singleSenateBillData?.legislativeBill?.introducedInHousesLegis &&
          singleSenateBillData?.legislativeBill?.introducedInHousesLegis
            ?.introducedInHouseDate
            ? moment(
                singleSenateBillData?.legislativeBill?.introducedInHousesLegis
                  ?.introducedInHouseDate,
                "YYYY-MM-DD"
              ).toDate()
            : "",
        // Act No
        actNo:
          singleSenateBillData?.legislativeBill?.actNo &&
          singleSenateBillData?.legislativeBill?.actNo,
        dateOfJointSitting:
          singleSenateBillData?.legislativeBill?.dateOfJointSitting &&
          singleSenateBillData?.legislativeBill?.dateOfJointSitting,
        referedOnDate:
          singleSenateBillData?.legislativeBill?.introducedInHousesLegis &&
          singleSenateBillData?.legislativeBill?.introducedInHousesLegis
            ?.referedOnDate
            ? moment(
                singleSenateBillData?.legislativeBill?.introducedInHousesLegis
                  ?.referedOnDate,
                "YYYY-MM-DD"
              ).toDate()
            : "",
        fkManageCommitteeId: singleSenateBillData?.legislativeBill
          ?.introducedInHousesLegis
          ? singleSenateBillData?.legislativeBill?.introducedInHousesLegis
              ?.fkManageCommitteeId
          : "",

        committeeRecomendation: singleSenateBillData?.recommendation
          ? {
              value: singleSenateBillData?.recommendation?.id,
              label:
                singleSenateBillData?.recommendation?.committeeRecomendation,
            }
          : null,

        reportPresentationDate: singleSenateBillData?.legislativeBill
          ?.introducedInHousesLegis?.reportPresentationDate
          ? moment(
              singleSenateBillData?.legislativeBill?.introducedInHousesLegis
                ?.reportPresentationDate,
              "YYYY-MM-DD"
            ).toDate()
          : "",
        fkMemberPassageId: singleSenateBillData?.legislativeBill
          ?.memberPassagesLegis
          ? singleSenateBillData?.legislativeBill?.memberPassagesLegis
              ?.fkMemberPassageId
          : "",
        memeberNoticeDate: singleSenateBillData?.legislativeBill
          ?.memberPassagesLegis?.memeberNoticeDate
          ? moment(
              singleSenateBillData?.legislativeBill?.memberPassagesLegis
                ?.memeberNoticeDate,
              "YYYY-MM-DD"
            ).toDate()
          : "",
        dateofWithDrawalrule115: singleSenateBillData?.legislativeBill
          ?.memberPassagesLegis?.dateofWithDrawalrule115
          ? moment(
              singleSenateBillData?.legislativeBill?.memberPassagesLegis
                ?.dateofWithDrawalrule115,
              "YYYY-MM-DD"
            ).toDate()
          : "",
        dateOfConsiderationBill:
          singleSenateBillData?.legislativeBill?.memberPassagesLegis &&
          singleSenateBillData?.legislativeBill?.memberPassagesLegis
            ?.dateOfConsiderationBill
            ? moment(
                singleSenateBillData?.legislativeBill?.memberPassagesLegis
                  ?.dateOfConsiderationBill,
                "YYYY-MM-DD"
              ).toDate()
            : "",
        fkSessionMemberPassageId: singleSenateBillData?.legislativeBill
          ?.memberPassagesLegis
          ? singleSenateBillData?.legislativeBill?.memberPassagesLegis
              ?.fkSessionMemberPassageId
          : "",
        dateOfPassageBySenate: singleSenateBillData?.legislativeBill
          ?.dateOfPassageBySenate
          ? moment(
              singleSenateBillData?.legislativeBill?.dateOfPassageBySenate,
              "YYYY-MM-DD"
            ).toDate()
          : "",
        dateOfPublishInGazette: singleSenateBillData?.legislativeBill
          ?.dateOfPublishInGazette
          ? moment(
              singleSenateBillData?.legislativeBill?.dateOfPublishInGazette,
              "YYYY-MM-DD"
            ).toDate()
          : "",
        dateOfAssentByThePresident: singleSenateBillData?.legislativeBill
          ?.dateOfAssentByThePresident
          ? moment(
              singleSenateBillData?.legislativeBill?.dateOfAssentByThePresident,
              "YYYY-MM-DD"
            ).toDate()
          : "",
        dateOfTransmissionToNA: singleSenateBillData?.legislativeBill
          ?.dateOfTransmissionToNA
          ? moment(
              singleSenateBillData?.legislativeBill?.dateOfTransmissionToNA,
              "YYYY-MM-DD"
            ).toDate()
          : "",
        dateOfReceiptMessageFromNA: singleSenateBillData?.legislativeBill
          ?.dateOfReceiptMessageFromNA
          ? moment(
              singleSenateBillData?.legislativeBill?.dateOfReceiptMessageFromNA,
              "YYYY-MM-DD"
            ).toDate()
          : "",
        dateOfPassageByNA: singleSenateBillData?.legislativeBill
          ?.dateOfPassageByNA
          ? moment(
              singleSenateBillData?.legislativeBill?.dateOfPassageByNA,
              "YYYY-MM-DD"
            ).toDate()
          : "",
        dateOfJointSitting: singleSenateBillData?.legislativeBill
          ?.dateOfJointSitting
          ? moment(
              singleSenateBillData?.legislativeBill?.dateOfJointSitting,
              "YYYY-MM-DD"
            ).toDate()
          : "",
        billStatusDate: singleSenateBillData?.legislativeBill?.billStatusDate
          ? moment(
              singleSenateBillData?.legislativeBill?.billStatusDate,
              "YYYY-MM-DD"
            ).toDate()
          : "",
      });
    }
  }, [singleSenateBillData]);

  // Updating Senate Bills
  const UpdateNationalAssemblyBill = async (values) => {
    const formData = new FormData();
    formData.append("fkSessionId", values?.fkSessionId);
    formData.append("billFor", showMinster);
    if (location?.state?.forPerson === "Ministers") {
      formData.append("fkMinisterTenureId", values?.tenuresMinisters?.value);
    } else {
      formData.append("fkTenureId", values?.membertenure?.value);
    }

    if (values?.fkTermId?.value) {
      formData.append("fkTermId", values?.fkTermId?.value);
    }

    if (location?.state?.forPerson === "Senators") {
      formData.append("fkParliamentaryYearId", values?.fkParliamentaryYearId);
    } else if (location?.state?.forPerson === "Ministers") {
      formData.append(
        "fkMnaParliamentaryYearId",
        values?.fkMnaParliamentaryYearId
      );
    }
    formData.append("billCategory", BillCategory);
    formData.append("billType", values?.billType);
    formData.append("fkBillStatus", values?.fkBillStatus?.value);
    if (values?.billStatusDate) {
      const formattedDate = moment(values?.billStatusDate).format("YYYY-MM-DD");
      formData.append("billStatusDate", formattedDate);
    }
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
    if (values?.noticeDate) {
      const formattedDate = moment(values?.noticeDate).format("YYYY-MM-DD");
      formData.append("noticeDate", formattedDate);
    }
    formData.append("billFrom", "From Senate");
    formData.append("fkUserId", userData && userData?.id);
    formData.append("title", values?.title);
    formData.append("billText", values?.billText);
    formData.append("billRemarks", values?.billRemarks);
    if (values?.introducedInHouseDate) {
      const formattedDate = moment(values?.introducedInHouseDate).format(
        "YYYY-MM-DD"
      );
      formData.append("introducedInHouseDate", formattedDate);
    }
    if (values?.actNo) {
      formData.append("actNo", values?.actNo);
    }
    if (values?.fkManageCommitteeId) {
      formData.append("fkManageCommitteeId", values?.fkManageCommitteeId);
    }
    if (values?.referedOnDate) {
      const formattedDate = moment(values?.referedOnDate).format("YYYY-MM-DD");
      formData.append("referedOnDate", formattedDate);
    }

    if (values?.committeeRecomendation) {
      formData.append(
        "fkManageCommitteeRecomendationId",
        values?.committeeRecomendation?.value
      );
    }
    if (values?.reportPresentationDate) {
      const formattedDate = moment(values?.reportPresentationDate).format(
        "YYYY-MM-DD"
      );
      formData.append("reportPresentationDate", formattedDate);
    }
    if (values?.fkMemberPassageId) {
      formData.append("fkMemberPassageId", values?.fkMemberPassageId);
    }
    if (values?.memeberNoticeDate) {
      const formattedDate = moment(values?.memeberNoticeDate).format(
        "YYYY-MM-DD"
      );
      formData.append("memeberNoticeDate", formattedDate);
    }
    if (values?.dateOfConsiderationBill) {
      const formattedDate = moment(values?.dateOfConsiderationBill).format(
        "YYYY-MM-DD"
      );
      formData.append("dateOfConsiderationBill", formattedDate);
    }
    if (values?.dateOfPublishInGazette) {
      const formattedDate = moment(values?.dateOfPublishInGazette).format(
        "YYYY-MM-DD"
      );
      formData.append("dateOfPublishInGazette", formattedDate);
    }
    if (values?.dateofWithDrawalrule115) {
      const formattedDate = moment(values?.dateofWithDrawalrule115).format(
        "YYYY-MM-DD"
      );
      formData.append("dateofWithDrawalrule115", formattedDate);
    }
    if (values?.dateOfAssentByThePresident) {
      const formattedDate = moment(values?.dateOfAssentByThePresident).format(
        "YYYY-MM-DD"
      );
      formData.append("dateOfAssentByThePresident", formattedDate);
    }
    if (values?.fkSessionMemberPassageId) {
      formData.append(
        "fkSessionMemberPassageId",
        values?.fkSessionMemberPassageId
      );
    }
    if (values?.dateOfPassageBySenate) {
      const formattedDate = moment(values?.dateOfPassageBySenate).format(
        "YYYY-MM-DD"
      );
      formData.append("dateOfPassageBySenate", formattedDate);
    }

    if (values?.dateOfTransmissionToNA) {
      const formattedDate = moment(values?.dateOfTransmissionToNA).format(
        "YYYY-MM-DD"
      );
      formData.append("dateOfTransmissionToNA", formattedDate);
    }

    if (values?.dateOfReceiptMessageFromNA) {
      const formattedDate = moment(values?.dateOfReceiptMessageFromNA).format(
        "YYYY-MM-DD"
      );
      formData.append("dateOfReceiptMessageFromNA", formattedDate);
    }

    if (values?.dateOfPassageByNA) {
      const formattedDate = moment(values?.dateOfPassageByNA).format(
        "YYYY-MM-DD"
      );
      formData.append("dateOfPassageByNA", formattedDate);
    }
    if (values?.documentDiscription) {
      formData.append("documentDiscription", values?.documentDiscription);
    }

    // if (values?.documentDate) {
    //   const formattedDate = moment(values?.documentDate).format("YYYY-MM-DD");
    //   formData.append("documentDate", formattedDate);
    // }

    const formattedDate = values?.documentDate
      ? moment(values?.documentDate).format("YYYY-MM-DD")
      : moment().format("YYYY-MM-DD");
    formData.append("documentDate", formattedDate);
    if (values?.dateOfJointSitting) {
      const formattedDate = moment(values?.dateOfJointSitting).format(
        "YYYY-MM-DD"
      );
      formData.append("dateOfJointSitting", formattedDate);
    }
    if (values?.documentType) {
      formData.append("documentType", values?.documentType);
    }

    if (values?.file) {
      Array.from(values?.file).map((file, index) => {
        formData.append("billdocumentlegis", file);
      });
    }
    if (values?.senateBillSenatorMovers) {
      values?.senateBillSenatorMovers?.forEach((senator, index) => {
        formData.append(
          `legislationMovers[${index}][fkMemberId]`,
          senator?.value
        );
      });
    }

    if (values?.senateBillMnaMovers?.value) {
      formData.append(
        `senateBillMnaMovers[${0}][fkMnaId]`,
        values?.senateBillMnaMovers?.value
      );
    }
    if (values?.senateBillMinistryMovers?.value) {
      formData.append(
        `senateBillMinistryMovers[${0}][fkMinistryId]`,
        values?.senateBillMinistryMovers?.value
      );
    }

    try {
      const response = await UpdateLegislativeBillById(
        NoticePrivateBillId,
        formData
      );
      if (response?.success) {
        showSuccessMessage(response?.message);

        setTimeout(() => {
          navigate("/lgms/legislation/private-bill");
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
                <div class="card-header red-bg">
                  {/* <h1>Update Senate Bill</h1> */}
                  <h1>
                    {BillCategory &&
                    BillCategory === "Government Bill" &&
                    BillFrom === "From Senate"
                      ? "Update Bill (Government Bill/Introduced in Senate)"
                      : "Update Bill (Private Member Bill/Introduced in Senate)"}
                  </h1>
                </div>
                <div className="card-body">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col">
                        {showMinster === "Ministers" ? (
                          <>
                            <label className="form-label">
                              Minister Tenure
                            </label>
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
                                  "tenuresMinisters",
                                  selectedOption
                                );
                                fetchParliamentaryYears(selectedOption?.value); // For Ministers
                                formik.setFieldValue("fkTermId", "");
                                formik.setFieldValue(
                                  "fkParliamentaryYearId",
                                  ""
                                );
                                formik.setFieldValue(
                                  "senateBillSenatorMovers",
                                  ""
                                );
                                formik.setFieldValue(
                                  "senateBillMnaMovers",
                                  null
                                );
                                formik.setFieldValue(
                                  "senateBillMinistryMovers",
                                  null
                                );
                              }}
                              onBlur={formik.handleBlur}
                              value={formik.values.tenuresMinisters}
                              id="tenuresMinisters"
                              name="tenuresMinisters"
                              isClearable={true}
                            />
                          </>
                        ) : (
                          <>
                            <label className="form-label">Member Tenure</label>
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
                                handleTenuresTerms(selectedOption?.value); // For Senators
                                formik.setFieldValue("fkTermId", "");
                                formik.setFieldValue(
                                  "fkParliamentaryYearId",
                                  ""
                                );
                                formik.setFieldValue(
                                  "senateBillSenatorMovers",
                                  ""
                                );
                                formik.setFieldValue(
                                  "senateBillMnaMovers",
                                  null
                                );
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
                          </>
                        )}
                        {formik.touched.membertenure &&
                          formik.errors.membertenure && (
                            <div className="invalid-feedback">
                              {formik.errors.membertenure}
                            </div>
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
                                formik.setFieldValue("selectedSenator", "");
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
                        <div className="mb-3">
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
                                {ministersOnParliamentaryYearData?.map(
                                  (item) => (
                                    <option key={item?.id} value={item?.id}>
                                      {item?.parliamentaryTenure}
                                    </option>
                                  )
                                )}
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
                                {ministersOnParliamentaryYearData?.map(
                                  (item) => (
                                    <option key={item?.id} value={item?.id}>
                                      {item?.parliamentaryTenure}
                                    </option>
                                  )
                                )}
                              </select>
                              {formik.touched.fkParliamentaryYearId &&
                                formik.errors.fkParliamentaryYearId && (
                                  <div className="invalid-feedback">
                                    {formik.errors.fkParliamentaryYearId}
                                  </div>
                                )}
                            </>
                          )}
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
                                  ministersOnParliamentaryYear?.length > 0
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
                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label">Diary Number</label>
                          <input
                            className="form-control"
                            type="text"
                            id="diary_number"
                            value={formik.values.diary_number}
                            name="diary_number"
                            readOnly // Make field read-only
                          />
                        </div>
                      </div>

                      <div className="col">
                        <div className="mb-3" style={{ position: "relative" }}>
                          <label className="form-label">
                            Notice Office Diary Date
                          </label>
                          <span
                            style={{
                              position: "absolute",
                              right: "15px",
                              top: "36px",
                              zIndex: "1",
                              fontSize: "20px",
                              color: "#666",
                              cursor: "not-allowed", // Disable click
                              pointerEvents: "none", // Prevent click events
                            }}
                          >
                            <FontAwesomeIcon icon={faCalendarAlt} />
                          </span>

                          <DatePicker
                            selected={
                              formik.values.noticeofficeDate
                                ? moment(
                                    formik.values.noticeofficeDate,
                                    "YYYY-MM-DD"
                                  ).toDate()
                                : null
                            }
                            className="form-control"
                            dateFormat="dd-MM-yyyy"
                            disabled={true} // Disable selection
                          />
                        </div>
                      </div>

                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label">
                            Notice Office Diary Time
                          </label>
                          <TimePicker
                            value={formik.values.noticeOfficeDiaryTime}
                            clockIcon={null} // Hide clock view
                            format="hh:mm a"
                            disabled={true} // Disable selection
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="col-3">
                        <div className="mb-3" style={{ position: "relative" }}>
                          <label className="form-label">
                            {BillCategory === "Private Member Bill"
                              ? "Date of Notice Under Rule 94"
                              : "Date of Notice Under Rule 96"}
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
                            selected={formik.values.noticeDate}
                            onChange={handleDateSelect}
                            onBlur={formik.handleBlur}
                            className={`form-control ${
                              formik.touched.noticeDate &&
                              formik.errors.noticeDate
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

                          {formik.touched.noticeDate &&
                            formik.errors.noticeDate && (
                              <div
                                className="invalid-feedback"
                                style={{ display: "block" }}
                              >
                                {formik.errors.noticeDate}
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
                              formik.touched.title && formik.errors.title
                                ? "is-invalid"
                                : ""
                            }`}
                            id="title"
                            name="title"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.title || ""}
                          ></textarea>
                          {formik.touched.title && formik.errors.title && (
                            <div className="invalid-feedback">
                              {formik.errors.title}
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
                            Introduced in House on
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
                          <label class="form-label">
                            Referred to the Committee on
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
                      <div class="col">
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

                      <div className="col">
                        <label className="form-label">
                          Concerned Committees
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
                      <div className="form-group col">
                        <label className="form-label">
                          Committee Recommendation
                        </label>
                        <Select
                          options={
                            commiteeRecommendations &&
                            commiteeRecommendations.map((item) => ({
                              value: item.id,
                              label: item.committeeRecomendation,
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
                    </div>

                    <div className="row"></div>
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
                      <div className="col-3">
                        <div class="mb-3 " style={{ position: "relative" }}>
                          <label class="form-label">
                            Date of Notice for Passage Under Rules 100/113
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

                      <div class="col-3">
                        <div class="mb-3" style={{ position: "relative" }}>
                          <label class="form-label">
                            Date of Notice for Withdrawal Under Rule 115
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
                            onClick={handleDateofWithDrawalToggle}
                          >
                            <FontAwesomeIcon icon={faCalendarAlt} />
                          </span>
                          <DatePicker
                            selected={formik.values.dateofWithDrawalrule115}
                            onChange={handleDateofWithDrawal}
                            className={"form-control"}
                            open={isDateofWithDrawalUnderRule115Open}
                            onClickOutside={() =>
                              setIsDateofWithDrawalUnderRule115Open(false)
                            }
                            onInputClick={handleDateofWithDrawalToggle}
                            maxDate={new Date()}
                            dateFormat="dd-MM-yyyy"
                          />
                        </div>
                      </div>

                      <div className="col">
                        <div class="mb-3 " style={{ position: "relative" }}>
                          <label class="form-label">
                            Date of Consideration of the Bill
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
                      <div className="col">
                        <div class="mb-3 " style={{ position: "relative" }}>
                          <label class="form-label">
                            Date of Bill Passed by the Senate
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
                    </div>
                    <div className="row">
                      <div className="col">
                        <div class="mb-3 " style={{ position: "relative" }}>
                          <label class="form-label">
                            Date of Bill Transmitted to NA
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
                      <div className="col">
                        <div class="mb-3 " style={{ position: "relative" }}>
                          <label class="form-label">
                            Date of Bill Referred to Joint Sitting
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
                            // onClick={handleAssentCalendarToggle}
                            onClick={handleJointDateCalendarToggle}
                          >
                            <FontAwesomeIcon icon={faCalendarAlt} />
                          </span>
                          <DatePicker
                            selected={formik.values.dateOfJointSitting}
                            onChange={handleJointDateSelect}
                            className={"form-control"}
                            open={isJointSettingDateCalendarOpen}
                            onClickOutside={() =>
                              setJointsettingDateCalendarOpen(false)
                            }
                            onInputClick={handleJointDateCalendarToggle}
                            maxDate={new Date()}
                            dateFormat="dd-MM-yyyy"
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div class="mb-3 " style={{ position: "relative" }}>
                          <label class="form-label">
                            Date of Bill Passed by NA
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
                      <div className="col">
                        <div class="mb-3 " style={{ position: "relative" }}>
                          <label class="form-label">
                            Date of Bill Publish in the Gazette
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
                      <div className="col">
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
                        {/* <label className="form-label" htmlFor="billDescription">
                          Document Description
                        </label>
                        <textarea
                          id="documentDiscription"
                          name="documentDiscription"
                          value={formik.values.documentDiscription}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="form-control"
                        ></textarea> */}
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
                        <option value="test">
                          {BillCategory === "Private Member Bill"
                            ? "Notice Under Rule 94"
                            : "Notice Under Rule 96"}
                        </option>
                        <option value="Notes">Notes</option>
                        <option value="Correspondence">Correspondence</option>
                        <option value="Bill (English)">Bill (English)</option>
                        <option value="Bill (Urdu)">Bill (Urdu)</option>
                        <option value="Original Act">Original Act </option>
                        <option value="Letter Sent to Senator for Rectification">
                          Letter Sent to Senator for Rectification{" "}
                        </option>
                        <option value="Letter Sent to Concerned Ministry / Division">
                          Letter Sent to Concerned Ministry / Division{" "}
                        </option>
                        <option value="Bill Introduced in the House">
                          Bill Introduced in the House
                        </option>
                        <option value="Committee Report">
                          Committee Report
                        </option>
                        <option value="Notice for Consideration and Passage Under Rules 100 /113">
                          Notice for Consideration and Passage Under Rules 100
                          /113
                        </option>
                        <option value="Notice for Withdrawal Under Rule 115">
                          Notice for Withdrawal Under Rule 115
                        </option>
                        <option value="Bill Passed by the House">
                          Bill Passed by the House
                        </option>
                        <option value="Message sent to NA">
                          Message sent to NA{" "}
                        </option>
                        <option value="Note For Gazette">
                          Note For Gazette{" "}
                        </option>
                        <option value="Gazette Publication">
                          Gazette Publication
                        </option>
                      </select>
                    </div>

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
                      singleSenateBillData?.legislativeBill
                        ?.billDocumentsLegis &&
                      singleSenateBillData.legislativeBill?.billDocumentsLegis.map(
                        (doc) => (
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
                              <div
                                className="MultiFile-label mt-1"
                                key={file.id}
                              >
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
                                    hendleRemoveImage(
                                      doc?.documentType,
                                      file?.id
                                    )
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
                        )
                      )}

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

export default TestingNoticePrivateMemberBill;
