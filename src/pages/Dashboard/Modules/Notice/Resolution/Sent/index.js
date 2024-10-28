import React from "react";
import { NoticeSidebarItems } from "../../../../../../utils/sideBarItems";
import { Layout } from "../../../../../../components/Layout";
import { ToastContainer } from "react-toastify";
import Header from "../../../../../../components/Header";
import SentResolutionList from "../../NoticeComponents/Resolution";

function SentResolution() {
  return (
    <Layout
      module={true}
      sidebarItems={NoticeSidebarItems}
      centerlogohide={true}
    >
      <ToastContainer />

      <Header
        dashboardLink={"/"}
        addLink1={"/notice/resolution/sent"}
        title1={"Sent Resolution"}
      />
      <SentResolutionList />
    </Layout>
  );
}

export default SentResolution;

// const navigate = useNavigate();
// const { members, sessions, resolutionStatus } = useContext(AuthContext);
// const [resData, setResData] = useState([]);
// const [currentPage, setCurrentPage] = useState(0);
// const [count, setCount] = useState(null);
// const pageSize = 10; // Set your desired page size

// const handlePageChange = (page) => {
//   // Update currentPage when a page link is clicked
//   setCurrentPage(page);
//   if (
//     formik?.values?.noticeDiaryNo ||
//     formik?.values?.resolutionId ||
//     formik?.values?.keyword ||
//     formik?.values?.memberName ||
//     formik?.values?.fromSession ||
//     formik?.values?.toSession ||
//     formik?.values?.resolutionType ||
//     formik?.values?.resolutionStatus ||
//     formik?.values?.fromNoticeDate ||
//     formik?.values?.toNoticeDate
//   ) {
//     SearchResolutionApi(formik?.values, page);
//   }
// };

// const initialValues = {
//   noticeDiaryNo: "",
//   resolutionId: "",
//   keyword: "",
//   memberName: "",
//   fromSession: "",
//   toSession: "",
//   resolutionType: "",
//   resolutionStatus: "",
//   fromNoticeDate: "",
//   toNoticeDate: "",
// };

// const transformLeavesData = (apiData) => {
//   return apiData.map((leave) => {
//     const subjectMatter = [leave?.englishText, leave?.urduText]
//       .filter(Boolean)
//       .join(", ");
//     const cleanedSubjectMatter = subjectMatter.replace(/(<([^>]+)>)/gi, "");
//     return {
//       SrNo: leave.id,
//       memberName:
//         leave?.resolutionMoversAssociation[0]?.memberAssociation?.memberName,
//       SessionNumber: leave?.session?.sessionName
//         ? leave?.session?.sessionName
//         : "",
//       diaryNumber: leave?.noticeDiary?.noticeOfficeDiaryNo
//         ? leave?.noticeDiary?.noticeOfficeDiaryNo
//         : "---",
//       DiaryDate: leave?.noticeDiary?.noticeOfficeDiaryDate
//         ? moment(leave?.noticeDiary?.noticeOfficeDiaryDate).format(
//             "DD-MM-YYYY"
//           )
//         : "",
//       diaryTime: leave?.noticeDiary?.noticeOfficeDiaryTime
//         ? leave?.noticeDiary?.noticeOfficeDiaryTime
//         : "---",
//       ResolutionType: leave?.resolutionType ? leave?.resolutionType : "",
//       SubjectMatter: cleanedSubjectMatter ? cleanedSubjectMatter : "",
//       NoticeNo: leave?.noticeDiary?.noticeOfficeDiaryNo
//         ? leave?.noticeDiary?.noticeOfficeDiaryNo
//         : "",
//       // ResolutionStatus: leave?.resolutionStatus?.resolutionStatus
//       //   ? leave?.resolutionStatus?.resolutionStatus
//       //   : "",
//       // Status: leave?.resolutionActive ? leave?.resolutionActive : "",
//       // device : leave?.device,
//       createdBy:
//         leave?.resolutionSentStatus === "inNotice" ? "Notice Office" : "---",
//     };
//   });
// };

// const formik = useFormik({
//   initialValues: initialValues,
//   onSubmit: (values) => {
//     // Handle your form submission here
//     SearchResolutionApi(values, currentPage);
//   },
// });

// const SearchResolutionApi = async (values, page) => {
//   const searchParams = {
//     fkSessionNoFrom: values.fromSession,
//     fkSessionNoTo: values.toSession,
//     resolutionType: values.resolutionType,
//     keyword: values.keyword,
//     resolutionId: values.resolutionID,
//     resolutionDiaryNo: values.resolutionDiaryNo,
//     fkResolutionStatus: values.resolutionStatus?.value,
//     noticeOfficeDiaryNo: values?.noticeDiaryNo,
//     noticeOfficeDiaryDateFrom: values.fromNoticeDate,
//     noticeOfficeDiaryDateTo: values.toNoticeDate,
//     resolutionMovers: values?.memberName?.value,
//     resolutionSentStatus: ["inNotice", "toResolution"],
//   };

//   try {
//     const response = await searchResolution(searchParams, page, pageSize);

//     if (response?.success) {
//       showSuccessMessage(response?.message);

//       setCount(response.data?.count);
//       if (response.data?.resolutions?.length > 0) {
//         const transformedData = transformLeavesData(
//           response.data?.resolutions
//         );
//         setResData(transformedData);
//       } else {
//         setResData(response.data);
//       }
//     }
//   } catch (error) {
//     showErrorMessage(error?.response?.data?.message);
//   }
// };

// const getAllResolutionsApi = useCallback(async () => {
//   try {
//     const response = await getAllResolutionsNotice(currentPage, pageSize);
//     if (response?.success) {
//       const transformedData = transformLeavesData(response?.data?.resolution);
//       setCount(response?.data?.count);
//       setResData(transformedData);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }, [currentPage, pageSize, setCount, setResData]);

// const handleEdit = async (id) => {
//   try {
//     const response = await getResolutionBYID(id);
//     if (response?.success) {
//       navigate("/notice/resolution/edit", {
//         state: response?.data,
//       });
//     }
//   } catch (error) {
//     showErrorMessage(error.response.data.message);
//   }
// };

// const deleteResolutionApi = async (id) => {
//   try {
//     const response = await DeleteResolution(id);
//     if (response?.success) {
//       showSuccessMessage(response?.message);
//       getAllResolutionsApi();
//     }
//   } catch (error) {
//     showErrorMessage(error?.response?.data?.message);
//   }
// };
// useEffect(() => {
//   if (
//     formik?.values?.noticeDiaryNo ||
//     formik?.values?.resolutionId ||
//     formik?.values?.keyword ||
//     formik?.values?.memberName ||
//     formik?.values?.fromSession ||
//     formik?.values?.toSession ||
//     formik?.values?.resolutionType ||
//     formik?.values?.resolutionStatus ||
//     formik?.values?.fromNoticeDate ||
//     formik?.values?.toNoticeDate
//   ) {
//     return;
//   }
//   getAllResolutionsApi();
// }, [getAllResolutionsApi, formik?.values]);

// const handleResetForm = () => {
//   formik.resetForm();
//   getAllResolutionsApi();
// };

// const sendResolution = async (id) => {
//   try {
//     const data = {
//       resolutionSentDate: new Date(),
//     };
//     const response = await sendToResolution(id, data);
//     if (response?.success) {
//       showSuccessMessage(response.message);
//       getAllResolutionsApi();
//     }
//   } catch (error) {
//     showErrorMessage(error?.response?.data?.message);
//   }
// };

// const handlePDF = async () => {
//   const encodedJsonString = encodeURIComponent(JSON.stringify(resData));
//   const url = `/notice/resolution/pdf-preview-resolution?state=${encodedJsonString}`;
//   window.open(url, "_blank");
// };
