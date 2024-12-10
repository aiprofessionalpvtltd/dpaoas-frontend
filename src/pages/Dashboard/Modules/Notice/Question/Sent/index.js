import React from "react";
import { NoticeSidebarItems } from "../../../../../../utils/sideBarItems";
import { Layout } from "../../../../../../components/Layout";
import { ToastContainer } from "react-toastify";
import Header from "../../../../../../components/Header";
import AllQuestionComponent from "../../NoticeComponents/Question";

function SentQuestion() {
  return (
    <Layout
      module={true}
      sidebarItems={NoticeSidebarItems}
      centerlogohide={true}
    >
      <ToastContainer />
      <Header
        dashboardLink={"/notice/dashboard"}
        title1={"Question Lists"}
        addLink1={"/notice/question/sent"}
      />
      <AllQuestionComponent />
    </Layout>
  );
}

export default SentQuestion;

// const navigate = useNavigate();
//   const { members, sessions } = useContext(AuthContext);
//   const [pdfData, setPDFData] = useState([]);
//   const [resData, setResData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [allquestionStatus, setAllQuestionStatus] = useState([]);
//   const [count, setCount] = useState(null);
//   const [isFromNoticeOpen, setIsFromNoticeOpen] = useState(false);
//   const [isToNoticeOpen, setIsToNoticeOpen] = useState(false);
//   const [searchingFlag, setSearchingFlag] = useState(false);
//   const pageSize = 10; // Set your desired page size

//   const handlePageChange = (page) => {
//     // Update currentPage when a page link is clicked
//     setCurrentPage(page);
//     if (
//       formik?.values?.questionDiaryNo ||
//       formik?.values?.questionID ||
//       formik?.values?.keyword ||
//       formik?.values?.memberName ||
//       formik?.values?.fromSession ||
//       formik?.values?.toSession ||
//       formik?.values?.category ||
//       formik?.values?.questionStatus ||
//       formik?.values?.fromNoticeDate ||
//       formik?.values?.toNoticeDate
//     ) {
//       SearchQuestionApi(formik?.values, page);
//     }
//     // SearchQuestionApi(formik?.values, page);
//   };

//   const formik = useFormik({
//     initialValues: {
//       questionDiaryNo: "",
//       questionID: "",
//       keyword: "",
//       memberName: "",
//       fromSession: "",
//       toSession: "",
//       category: "",
//       questionStatus: "",
//       fromNoticeDate: "",
//       toNoticeDate: "",
//     },
//     onSubmit: (values) => {
//       // Handle form submission here
//       SearchQuestionApi(values, currentPage);
//     },
//   });

//   // Handle From Notice Date Claneder Toggel
//   const handleFromNoticeCalendarToggle = () => {
//     setIsFromNoticeOpen(!isFromNoticeOpen);
//   };
//   // Handale From Notice DateCHange
//   const handleFromNoticeDateSelect = (date) => {
//     formik.setFieldValue("fromNoticeDate", date);
//     setIsFromNoticeOpen(false);
//   };

//   // Handle To Notice Date Claneder Toggel
//   const handleToNoticeCalendarToggle = () => {
//     setIsToNoticeOpen(!isToNoticeOpen);
//   };
//   // Handale To Notice DateCHange
//   const handleToNoticeDateSelect = (date) => {
//     formik.setFieldValue("toNoticeDate", date);

//     setIsToNoticeOpen(false);
//   };

//   const transformLeavesData = (apiData) => {
//     return apiData.map((res, index) => {
//       const subjectMatter = [res?.englishText, res?.urduText]
//         .filter(Boolean)
//         .join(", ");
//       const cleanedSubjectMatter = subjectMatter.replace(/(<([^>]+)>)/gi, "");

//       return {
//         // SrNo: index + 1,
//         Id: res?.id,
//         MemberName: res?.member ? res?.member?.memberName : "--",
//         noticeOfficeDiaryNumber: res?.noticeOfficeDiary?.noticeOfficeDiaryNo
//           ? res?.noticeOfficeDiary?.noticeOfficeDiaryNo
//           : "",
//         NoticeDate: res?.noticeOfficeDiary?.noticeOfficeDiaryDate
//           ? moment(res?.noticeOfficeDiary?.noticeOfficeDiaryDate).format(
//               "DD-MM-YYYY"
//             )
//           : "",
//         NoticeTime: res?.noticeOfficeDiary?.noticeOfficeDiaryTime
//           ? moment(
//               res?.noticeOfficeDiary?.noticeOfficeDiaryTime,
//               "hh:mm A"
//             ).format("hh:mm A")
//           : "",
//         SessionNumber: res?.session?.sessionName
//           ? res?.session?.sessionName
//           : "",
//         SubjectMatter: cleanedSubjectMatter ? cleanedSubjectMatter : "",
//         Category: res.questionCategory ? res.questionCategory : "",
//         // Status: res.questionStatus?.questionStatus
//         //   ? res.questionStatus?.questionStatus
//         //   : "",
//         division: res?.divisions ? res?.divisions?.divisionName : "--",
//         ministry: res?.divisions?.ministry?.ministryName
//           ? res?.divisions?.ministry?.ministryName
//           : "--",
//         device: res?.device,
//         createdBy:
//           res?.questionSentStatus === "inNotice" ? "Notice Office" : "---",
//       };
//     });
//   };

//   const transformPdfData = (apiData) => {
//     return apiData.map((res, index) => {
//       const subjectMatter = [res?.englishText, res?.urduText]
//         .filter(Boolean)
//         .join(", ");
//       const cleanedSubjectMatter = subjectMatter.replace(/(<([^>]+)>)/gi, "");

//       return {
//         SrNo: index + 1,
//         Id: res?.id,
//         MemberName: res?.member ? res?.member?.memberName : "--",
//         noticeOfficeDiaryNumber: res?.noticeOfficeDiary?.noticeOfficeDiaryNo
//           ? res?.noticeOfficeDiary?.noticeOfficeDiaryNo
//           : "",
//         NoticeDate: res?.noticeOfficeDiary?.noticeOfficeDiaryDate
//           ? moment(res?.noticeOfficeDiary?.noticeOfficeDiaryDate).format(
//               "DD-MM-YYYY"
//             )
//           : "",
//         NoticeTime: res?.noticeOfficeDiary?.noticeOfficeDiaryTime
//           ? moment(
//               res?.noticeOfficeDiary?.noticeOfficeDiaryTime,
//               "hh:mm A"
//             ).format("hh:mm A")
//           : "",
//         SessionNumber: res?.session?.sessionName
//           ? res?.session?.sessionName
//           : "",
//         // SubjectMatter: cleanedSubjectMatter ? cleanedSubjectMatter : "",
//         Category: res.questionCategory ? res.questionCategory : "",
//         Division: res?.divisions ? res?.divisions?.divisionName : "",
//         Ministry: res?.divisions?.ministry?.ministryName
//           ? res?.divisions?.ministry?.ministryName
//           : "",
//         createdBy:
//           res?.questionSentStatus === "inNotice" ? "Notice Office" : "---",
//       };
//     });
//   };

//   const SearchQuestionApi = useCallback(
//     async (values, page) => {
//       setSearchingFlag(true);
//       const searchParams = {
//         fromSessionNo: values?.fromSession,
//         toSessionNo: values?.toSession,
//         memberName: values?.memberName?.value,
//         questionCategory: values?.category,
//         keyword: values?.keyword,
//         questionID: values?.questionID,
//         questionStatus: values?.questionStatus,
//         questionDiaryNo: values?.questionDiaryNo,
//         noticeOfficeDiaryDateFrom:
//           values?.fromNoticeDate &&
//           moment(values?.fromNoticeDate).format("YYYY-MM-DD"),
//         noticeOfficeDiaryDateTo:
//           values?.toNoticeDate &&
//           moment(values?.toNoticeDate).format("YYYY-MM-DD"),
//         questionSentStatus: ["inNotice", "toQuestion"],
//       };
//       try {
//         const response = await searchQuestion(searchParams, page, pageSize);

//         if (response?.success) {
//           showSuccessMessage(response?.message);
//           setCount(response?.data?.count);
//           const transformedData = transformLeavesData(response.data?.questions);
//           setResData(transformedData);
//         }
//         // formik.resetForm();
//       } catch (error) {
//         showErrorMessage(error?.response?.data?.message);
//       } finally {
//         setSearchingFlag(false); // Set searching flag back to false
//       }
//     },
//     [currentPage, pageSize, setCount, setResData]
//   );

//   // HandleEdit
//   const handleEdit = async (id) => {
//     try {
//       const { question, history } = await getAllQuestionByID(id);

//       if (question?.success) {
//         navigate("/notice/question/detail", {
//           state: { question: question?.data, history: history?.data },
//         });
//       }
//     } catch (error) {
//       showErrorMessage(error.response?.data?.message);
//     }
//   };

//   const getAllQuestionsApi = useCallback(async () => {
//     try {
//       const response = await getAllQuestionNotice(currentPage, pageSize);
//       if (response?.success) {
//         const transformedData = transformLeavesData(response?.data?.questions);
//         setCount(response?.data?.count);
//         setResData(transformedData);
//         const pdfData = transformPdfData(response?.data?.questions);
//         setPDFData(pdfData);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }, [currentPage, pageSize, setCount, setResData]);

//   const GetALlStatus = async () => {
//     try {
//       const response = await getAllQuestionStatus();
//       if (response?.success) {
//         setAllQuestionStatus(response?.data);
//         // showSuccessMessage(response.message);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     GetALlStatus();
//   }, []);

//   // useEffect(() => {
//   //   getAllQuestionsApi();
//   // }, [getAllQuestionsApi]);

//   useEffect(() => {
//     if (
//       formik?.values?.questionDiaryNo ||
//       formik?.values?.questionID ||
//       formik?.values?.keyword ||
//       formik?.values?.memberName ||
//       formik?.values?.fromSession ||
//       formik?.values?.toSession ||
//       formik?.values?.category ||
//       formik?.values?.questionStatus ||
//       formik?.values?.fromNoticeDate ||
//       formik?.values?.toNoticeDate
//     ) {
//       return;
//     }
//     getAllQuestionsApi();
//   }, [getAllQuestionsApi, formik?.values]);
//   // Handle Reset Form
//   const handleResetForm = () => {
//     formik.resetForm();
//     getAllQuestionsApi();
//   };

//   const sendQuestion = async (id) => {
//     try {
//       const data = {
//         questionSentDate: new Date(),
//       };
//       const response = await sendToQuestion(id, data);
//       if (response?.success) {
//         showSuccessMessage(response.message);
//         getAllQuestionsApi();
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const handlePDF = async () => {
//     const encodedJsonString = encodeURIComponent(JSON.stringify(pdfData));
//     const url = `/notice/question/pdf-allQuestion?state=${encodedJsonString}`;
//     window.open(url, "_blank");
//   };
