import React from "react";
import { NoticeSidebarItems } from "../../../../../../utils/sideBarItems";
import { Layout } from "../../../../../../components/Layout";
import Header from "../../../../../../components/Header";
import { useNavigate } from "react-router";
import DatePicker from "react-datepicker";

import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";
import { useFormik } from "formik";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import {
  getAllMotionNotice,
  getMotionByID,
  getallMotionStatus,
  searchMotionNotice,
  sendToMotion,
} from "../../../../../../api/APIs/Services/Motion.service";
import { AuthContext } from "../../../../../../api/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import Select from "react-select";
import SentMotions from "../../NoticeComponents/Motion";

function SentMotion() {
  return (
    <Layout
      module={true}
      sidebarItems={NoticeSidebarItems}
      centerlogohide={true}
    >
      <ToastContainer />
      <Header
        dashboardLink={"/notice/dashboard"}
        addLink1={"/notice/motion/sent"}
        title1={"Motion Lists"}
      />
      <SentMotions />
    </Layout>
  );
}

export default SentMotion;

// const navigate = useNavigate();
// const { members, sessions } = useContext(AuthContext);
// const [currentPage, setCurrentPage] = useState(0);
// const [count, setCount] = useState(null);
// const [motionStatus, setMotionStatus] = useState([]);
// const [motionData, setMotionData] = useState([]);
// const [isFromNoticeOpen, setIsFromNoticeOpen] = useState(false);
// const [isToNoticeOpen, setIsToNoticeOpen] = useState(false);
// const pageSize = 10; // Set your desired page size

// const formik = useFormik({
//   initialValues: {
//     motionDiaryNo: "",
//     motionID: "",
//     keyword: "",
//     memberName: "",
//     fromSession: "",
//     toSession: "",
//     motionType: "",
//     motionStatus: "",
//     fromNoticeDate: "",
//     toNoticeDate: "",
//   },
//   onSubmit: (values) => {
//     // Handle form submission here
//     searchMotionList(values, currentPage);
//   },
// });

// const handlePageChange = (page) => {
//   // Update currentPage when a page link is clicked
//   setCurrentPage(page);
//   if (
//     formik?.values?.motionDiaryNo ||
//     formik?.values?.motionID ||
//     formik?.values?.keyword ||
//     formik?.values?.memberName ||
//     formik?.values?.fromSession ||
//     formik?.values?.toSession ||
//     formik?.values?.motionType ||
//     formik?.values?.fromNoticeDate ||
//     formik?.values?.toNoticeDate ||
//     formik?.values?.motionStatus
//   ) {
//     searchMotionList(formik?.values, page);
//   }
// };

// // Handle From Notice Date Claneder Toggel
// const handleFromNoticeCalendarToggle = () => {
//   setIsFromNoticeOpen(!isFromNoticeOpen);
// };
// // Handale From Notice DateCHange
// const handleFromNoticeDateSelect = (date) => {
//   formik.setFieldValue("fromNoticeDate", date);
//   setIsFromNoticeOpen(false);
// };

// // Handle To Notice Date Claneder Toggel
// const handleToNoticeCalendarToggle = () => {
//   setIsToNoticeOpen(!isToNoticeOpen);
// };
// // Handale To Notice DateCHange
// const handleToNoticeDateSelect = (date) => {
//   formik.setFieldValue("toNoticeDate", date);
//   setIsToNoticeOpen(false);
// };

// const transformMotionData = (apiData) => {
//   return apiData.map((res, index) => {
//     const english = [res?.englishText].filter(Boolean).join(", ");
//     const EnglishText = english.replace(/(<([^>]+)>)/gi, "");

//     const urdu = [res?.urduText].filter(Boolean).join(", ");
//     const UrduText = urdu.replace(/(<([^>]+)>)/gi, "");

//     return {
//       id: res?.id,
//       // SrNo : res?.SrNo,
//       memberName: res?.motionMovers[0]?.members?.memberName,
//       SessionNumber: res?.sessions?.sessionName
//         ? res?.sessions?.sessionName
//         : "",
//       motionType: res?.motionType ? res?.motionType : "",
//       noticeOfficeDiaryNo: res?.noticeOfficeDairies?.noticeOfficeDiaryNo
//         ? res?.noticeOfficeDairies?.noticeOfficeDiaryNo
//         : "",
//       noticeOfficeDiaryDate: res?.noticeOfficeDairies?.noticeOfficeDiaryDate
//         ? moment(res?.noticeOfficeDairies?.noticeOfficeDiaryDate).format(
//           "DD-MM-YYYY"
//         )
//         : "",
//       noticeOfficeDiaryTime: res?.noticeOfficeDairies?.noticeOfficeDiaryTime
//         ? moment(
//           res?.noticeOfficeDairies?.noticeOfficeDiaryTime,
//           "hh:ss A"
//         ).format("hh:ss A")
//         : "",
//       englishText: EnglishText ? EnglishText : "",
//       urduText: UrduText ? UrduText : "",
//       // motionStatus: res?.motionStatuses?.statusName,
//       device: res?.device,

//       // createdBy:res?.motionSentStatus === "inNotice" ? "Notice Office": "---"
//     };
//   });
// };

// const getMotionListDataa = useCallback(async () => {
//   const motionSentStatus = "inNotice";
//   try {
//     const response = await getAllMotionNotice(
//       currentPage,
//       pageSize,
//       motionSentStatus
//     );
//     if (response?.success) {
//       const transformedData = transformMotionData(response?.data?.rows);
//       console.log(response?.data?.rows)
//       setCount(response?.data?.count);
//       setMotionData(transformedData);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }, [currentPage, pageSize, setCount, setMotionData]);

// const searchMotionList = async (values, page) => {
//   const data = {
//     // fileNumber: ,
//     // fkSessionId: values?.fromSession,
//     noticeOfficeDiaryNo: values?.motionDiaryNo,
//     fkMemberId: values?.memberName?.value,
//     fkMinistryId: "",
//     motionId: values?.motionID,
//     sessionStartRange: values?.fromSession,
//     sessionEndRange: values?.toSession,
//     noticeStartRange:
//       values?.fromNoticeDate &&
//       moment(values?.fromNoticeDate).format("YYYY-MM-DD"),
//     noticeEndRange:
//       values?.toNoticeDate &&
//       moment(values?.toNoticeDate).format("YYYY-MM-DD"),
//     englishText: values?.keyword,
//     motionWeek: values?.motionWeek,
//     motionType: values?.motionType,
//     fkMotionStatus: values?.motionStatus,
//     motionSentStatus: ["inNotice", "toMotion"],
//   };

//   try {
//     const response = await searchMotionNotice(page, pageSize, data); // Add await here
//     if (response?.success) {
//       // showSuccessMessage(response?.message);
//       const transformedData = transformMotionData(response?.data?.rows);
//       setMotionData(transformedData);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// const getMotionStatus = async () => {
//   try {
//     const response = await getallMotionStatus();
//     if (response?.success) {
//       setMotionStatus(response?.data);
//     }
//   } catch (error) {
//     showErrorMessage(error?.response?.data?.message);
//   }
// };

// const hendleEdit = async (id) => {
//   try {
//     // const { question, history } = await getMotionByID(id);
//     const response = await getMotionByID(id);

//     if (response?.success) {
//       navigate("/notice/motion/edit", { state: response?.data });
//       //   navigate("/notice/question/detail", {
//       //     state: { question: question?.data, history: history?.data },
//       //   });
//     }
//   } catch (error) {
//     showErrorMessage(error.response?.data?.message);
//   }
// };

// useEffect(() => {
//   getMotionStatus();
// }, []);

// useEffect(() => {
//   if (
//     formik?.values?.motionDiaryNo ||
//     formik?.values?.motionID ||
//     formik?.values?.keyword ||
//     formik?.values?.memberName ||
//     formik?.values?.fromSession ||
//     formik?.values?.toSession ||
//     formik?.values?.motionType ||
//     formik?.values?.fromNoticeDate ||
//     formik?.values?.toNoticeDate ||
//     formik?.values?.motionStatus
//   ) {
//     return;
//   }
//   getMotionListDataa();
// }, [getMotionListDataa, formik?.values]);

// const sendMotion = async (id) => {
//   try {
//     const data = {
//       motionSentDate: new Date(),
//     };
//     const response = await sendToMotion(id, data);
//     if (response?.success) {
//       showSuccessMessage(response.message);
//       getMotionListDataa();
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// const handlePDF = async () =>{
//   const encodedJsonString = encodeURIComponent(JSON.stringify(motionData));
//   const url = `/notice/motion/pdf-preview?state=${encodedJsonString}`;
//   window.open(url, "_blank");
// }
