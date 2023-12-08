// import React from "react";
// import { Layout } from "../../../../../../components/Layout";
// import { QMSSideBarItems } from "../../../../../../utils/sideBarItems";
// import Header from "../../../../../../components/Header";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// const validationSchema = Yup.object({
//   sessionNo: Yup.number(),
//   noticeOfficeDiaryNo: Yup.number().required("Session Number is required"),
//   noticeOfficeDiaryDate: Yup.string(),
//   noticeOfficeDiaryTime: Yup.string(),
//   priority: Yup.string(),
//   questionId: Yup.string(),
//   questionDiaryNo: Yup.string(),
//   category: Yup.string(),
//   questionStatus: Yup.string(),
//   replyDate: Yup.string(),
//   senator: Yup.string(),
//   group: Yup.string(),
//   division: Yup.string(),
//   fileStatus: Yup.string(),
// });

// function QMSDaferQuestionDetail() {
//   const formik = useFormik({
//     initialValues: {
//       sessionNo: "",
//       noticeOfficeDiaryNo: "",
//       noticeOfficeDiaryDate: "",
//       noticeOfficeDiaryTime: "",
//       priority: "",
//       questionId: "",
//       questionDiaryNo: "",
//       category: "",
//       questionStatus: "",
//       replyDate: "",
//       senator: "",
//       group: "",
//       division: "",
//       fileStatus: "",
//     },
//     validationSchema: validationSchema,
//     onSubmit: (values) => {
//       // Handle form submission here
//       console.log(values);
//     },
//   });
//   return (
//     <Layout module={true} sidebarItems={QMSSideBarItems} centerlogohide={true}>
//       <Header
//         dashboardLink={"/"}
//         addLink1={"/qms/dashboard"}
//         title1={"Question"}
//         addLink2={"/qms/question/defer"}
//         title2={"Defer Question Detail"}
//       />
//       <div class="container-fluid">
//         <div class="card mt-4">
//           <div class="card-header red-bg" style={{ background: "#14ae5c !important" }}>
//             <h1>DEFER QUESTIONS DETAIL</h1>
//           </div>
//           <div class="card-body">
//             <div class="container-fluid">
//               <form onSubmit={formik.handleSubmit}>
//                 <div class="row mb-4">
//                   <div class="d-grid gap-2 d-md-flex justify-content-md-end">
//                     <button class="btn btn-warning" type="">
//                       No File Attached
//                     </button>
//                     <button class="btn btn-primary" type="">
//                       Revive
//                     </button>
//                     <button class="btn btn-primary" type="">
//                       Defer
//                     </button>
//                     <button class="btn btn-primary" type="">
//                       Send for Translation
//                     </button>
//                   </div>
//                   <div class="clearfix"></div>
//                 </div>
//                 <div class="row">
//                   <div class="col">
//                     <div class="mb-3">
//                       <label class="form-label">Session No</label>
//                       <select
//                         class="form-control form-select"
//                         id="sessionNo"
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                       >
//                         <option>123</option>
//                         <option>12123</option>
//                         <option>45456</option>
//                       </select>
//                     </div>
//                   </div>
//                   <div class="col">
//                     <div class="mb-3">
//                       <label class="form-label">Notice Office Diary No</label>
//                       <input
//                         type="text"
//                         placeholder={formik.values.noticeOfficeDiaryNo}
//                         className={`form-control ${
//                           formik.touched.noticeOfficeDiaryNo && formik.errors.noticeOfficeDiaryNo ? "is-invalid" : ""
//                         }`}
//                         id="noticeOfficeDiaryNo"
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                       />
//                       {formik.touched.noticeOfficeDiaryNo && formik.errors.noticeOfficeDiaryNo && (
//                         <div className="invalid-feedback">{formik.errors.noticeOfficeDiaryNo}</div>
//                       )}
//                     </div>
//                   </div>
//                   <div class="col">
//                     <div class="mb-3">
//                       <label class="form-label">Notice Office Diary Date</label>
//                       <input
//                         type="text"
//                         placeholder={formik.values.noticeOfficeDiaryDate}
//                         className={`form-control ${
//                           formik.touched.noticeOfficeDiaryDate && formik.errors.noticeOfficeDiaryDate
//                             ? "is-invalid"
//                             : ""
//                         }`}
//                         id="noticeOfficeDiaryDate"
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                       />
//                       {formik.touched.noticeOfficeDiaryDate && formik.errors.noticeOfficeDiaryDate && (
//                         <div className="invalid-feedback">{formik.errors.noticeOfficeDiaryDate}</div>
//                       )}
//                     </div>
//                   </div>
//                   <div class="col">
//                     <div class="mb-3">
//                       <label class="form-label">Notice Office Diary Time</label>
//                       <input
//                         type="text"
//                         placeholder={formik.values.noticeOfficeDiaryTime}
//                         className={`form-control ${
//                           formik.touched.noticeOfficeDiaryTime && formik.errors.noticeOfficeDiaryTime
//                             ? "is-invalid"
//                             : ""
//                         }`}
//                         id="noticeOfficeDiaryTime"
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                       />
//                       {formik.touched.noticeOfficeDiaryTime && formik.errors.noticeOfficeDiaryTime && (
//                         <div className="invalid-feedback">{formik.errors.noticeOfficeDiaryTime}</div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//                 <div class="row">
//                   <div class="col">
//                     <div class="mb-3">
//                       <div class="form-check" style={{ marginTop: "25px" }}>
//                         <input
//                           class="form-check-input "
//                           type="checkbox"
//                           id="priority"
//                           onChange={formik.handleChange}
//                           onBlur={formik.handleBlur}
//                         />
//                         <label class="form-check-label" for="flexCheckDefault">
//                           {" "}
//                           Priority
//                         </label>
//                       </div>
//                     </div>
//                   </div>
//                   <div class="col">
//                     <div class="mb-3">
//                       <label class="form-label">Question ID</label>
//                       <input
//                         type="text"
//                         placeholder={formik.values.questionId}
//                         className={`form-control ${
//                           formik.touched.questionId && formik.errors.questionId ? "is-invalid" : ""
//                         }`}
//                         id="questionId"
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                       />
//                       {formik.touched.questionId && formik.errors.questionId && (
//                         <div className="invalid-feedback">{formik.errors.questionId}</div>
//                       )}
//                     </div>
//                   </div>
//                   <div class="col">
//                     <div class="mb-3">
//                       <label class="form-label">Question Diary No</label>
//                       <input
//                         type="text"
//                         placeholder={formik.values.questionDiaryNo}
//                         className={`form-control ${
//                           formik.touched.questionDiaryNo && formik.errors.questionDiaryNo ? "is-invalid" : ""
//                         }`}
//                         id="questionDiaryNo"
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                       />
//                       {formik.touched.questionDiaryNo && formik.errors.questionDiaryNo && (
//                         <div className="invalid-feedback">{formik.errors.questionDiaryNo}</div>
//                       )}
//                     </div>
//                   </div>
//                   <div class="col">
//                     <div class="mb-3">
//                       <label class="form-label">Category</label>
//                       <select
//                         class="form-control form-select"
//                         id="category"
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                       >
//                         <option>Select</option>
//                         <option>Starred</option>
//                         <option>Un-Starred</option>
//                         <option>Short Notice</option>
//                       </select>
//                     </div>
//                   </div>
//                 </div>
//                 <div class="row">
//                   <div class="col">
//                     <div class="mb-3">
//                       <label class="form-label">Question Status</label>
//                       <select
//                         class="form-control form-select"
//                         id="questionStatus"
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                       >
//                         <option>Select</option>
//                         <option>Admitted</option>
//                         <option>Admitted but Lapsed</option>
//                         <option>Deferred</option>
//                         <option>Disallowed</option>
//                         <option>Disallowed on Reconsideration</option>
//                         <option>File not Available</option>
//                         <option>Lapsed</option>
//                         <option>NFA</option>
//                         <option>Replied</option>
//                         <option>Replied/Referred to Standing Committee</option>
//                         <option>Under Correspondence</option>
//                         <option>Under Process</option>
//                         <option>Withdrawn</option>
//                       </select>
//                     </div>
//                   </div>
//                   <div class="col">
//                     <div class="mb-3">
//                       <label class="form-label">Reply Date</label>
//                       <input
//                         type="text"
//                         placeholder={formik.values.replyDate}
//                         className={`form-control ${
//                           formik.touched.replyDate && formik.errors.replyDate ? "is-invalid" : ""
//                         }`}
//                         id="replyDate"
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                       />
//                       {formik.touched.replyDate && formik.errors.replyDate && (
//                         <div className="invalid-feedback">{formik.errors.replyDate}</div>
//                       )}
//                     </div>
//                   </div>
//                   <div class="col">
//                     <div class="mb-3">
//                       <label class="form-label">Senator</label>
//                       <input
//                         type="text"
//                         placeholder={formik.values.senator}
//                         className={`form-control ${
//                           formik.touched.senator && formik.errors.senator ? "is-invalid" : ""
//                         }`}
//                         id="senator"
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                       />
//                       {formik.touched.senator && formik.errors.senator && (
//                         <div className="invalid-feedback">{formik.errors.senator}</div>
//                       )}
//                     </div>
//                   </div>
//                   <div class="col">
//                     <div class="mb-3">
//                       <label class="form-label">Group</label>
//                       <select
//                         class="form-control form-select"
//                         id="group"
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                       >
//                         <option>Select</option>
//                         <option>1st Group</option>
//                         <option>2nd Group</option>
//                         <option>3rd Group</option>
//                         <option>4th Group</option>
//                         <option>5th Group</option>
//                       </select>
//                     </div>
//                   </div>
//                 </div>
//                 <div class="row">
//                   <div class="col">
//                     <div class="mb-3">
//                       <label class="form-label">Division</label>
//                       <select
//                         class="form-control form-select"
//                         id="division"
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                       >
//                         <option>Select</option>
//                         <option>Aviation Division</option>
//                         <option>Cabinet Division</option>
//                         <option>Capital Administration &amp; Development Div.</option>
//                         <option>Climate Change and Environmental Coordination</option>
//                         <option>Establishment Division</option>
//                         <option>Housing and Works Division</option>
//                         <option>Information Technology &amp; Telecommunications Division</option>
//                         <option>National Security Division</option>
//                         <option>Poverty Alleviation and Social Safety Division</option>
//                         <option>Textile Division</option>
//                       </select>
//                     </div>
//                   </div>
//                   <div class="col">
//                     <div class="mb-3">
//                       <label class="form-label">File Status</label>
//                       <select
//                         class="form-control form-select"
//                         id="fileStatus"
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                       >
//                         <option>Available</option>
//                         <option>Missing</option>
//                         <option>Moved for Approval</option>
//                         <option>Moved for Advance Copy</option>
//                       </select>
//                     </div>
//                   </div>
//                 </div>
//                 <p>Original Question text here</p>
//                 <p>Ammended Question Text here</p>
//                 <p>Urdu Text here</p>

//                 <div class="d-grid gap-2 d-md-flex">
//                   <button class="btn btn-primary" type="submit">
//                     Update
//                   </button>
//                   <button class="btn btn-primary" type="">
//                     Print Ammended Question
//                   </button>
//                   <button class="btn btn-primary" type="">
//                     Print Original Question
//                   </button>
//                   <button class="btn btn-primary" type="">
//                     Print Urdu
//                   </button>
//                   <button class="btn btn-danger" type="">
//                     Delete
//                   </button>
//                 </div>
//               </form>

//               <p>Reply Text here</p>

//               <div class="dash-detail-container" style={{ marginTop: "20px" }}>
//                 <table class="table red-bg-head th">
//                   <thead>
//                     <tr>
//                       <th class="text-left" scope="col">
//                         Action
//                       </th>
//                       <th class="text-left" scope="col">
//                         User
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       <td class="text-left" style={{ paddingLeft: "23px" }}>
//                         Inserted By
//                       </td>
//                       <td class="text-left" style={{ paddingLeft: "23px" }}>
//                         on 17/07/2023 1:40:14 PM
//                       </td>
//                     </tr>
//                     <tr>
//                       <td class="text-left" style={{ paddingLeft: "23px" }}>
//                         Updated By
//                       </td>
//                       <td class="text-left" style={{ paddingLeft: "23px" }}>
//                         Muneeb Hussain on 19/07/2023 12:11:46 PM
//                       </td>
//                     </tr>
//                     <tr>
//                       <td class="text-left" style={{ paddingLeft: "23px" }}>
//                         Sent for translation By
//                       </td>
//                       <td class="text-left" style={{ paddingLeft: "23px" }}></td>
//                     </tr>
//                     <tr>
//                       <td class="text-left" style={{ paddingLeft: "23px" }}>
//                         Translation Approved By{" "}
//                       </td>
//                       <td class="text-left" style={{ paddingLeft: "23px" }}></td>
//                     </tr>
//                     <tr>
//                       <td class="text-left" style={{ paddingLeft: "23px" }}>
//                         Deleted By
//                       </td>
//                       <td class="text-left" style={{ paddingLeft: "23px" }}>
//                         Muneeb Hussain on 19/07/2023 12:11:49 PM
//                       </td>
//                     </tr>
//                     <tr>
//                       <td class="text-left" style={{ paddingLeft: "23px" }}>
//                         Recovered By{" "}
//                       </td>
//                       <td class="text-left" style={{ paddingLeft: "23px" }}></td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>

//               <h2 style={{ color: "#666", fontSize: "24px", marginTop: "30px" }}>Status History</h2>
//               <div class="dash-detail-container" style={{ marginTop: "20px" }}>
//                 <table class="table red-bg-head th">
//                   <thead>
//                     <tr>
//                       <th class="text-center" scope="col">
//                         Sr#
//                       </th>
//                       <th class="text-center" scope="col">
//                         Session No
//                       </th>
//                       <th class="text-center" scope="col">
//                         Question Status
//                       </th>
//                       <th class="text-center" scope="col">
//                         Status Date
//                       </th>
//                       <th class="text-center" scope="col">
//                         User
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       <td class="text-center">1</td>
//                       <td class="text-center"></td>
//                       <td class="text-center"></td>
//                       <td class="text-center"></td>
//                       <td class="text-center"></td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//               <h2 style={{ color: "#666", marginTop: "25px", fontSize: "24px" }}>Revival History</h2>
//               <div class="dash-detail-container" style={{ marginTop: "20px" }}>
//                 <table class="table red-bg-head th">
//                   <thead>
//                     <tr>
//                       <th class="text-center" scope="col">
//                         Sr#
//                       </th>
//                       <th class="text-center" scope="col">
//                         From Session Number
//                       </th>
//                       <th class="text-center" scope="col">
//                         To Session Number
//                       </th>
//                       <th class="text-center" scope="col">
//                         Previous Notice Office Diary No
//                       </th>
//                       <th class="text-center" scope="col">
//                         Revival Date
//                       </th>
//                       <th class="text-center" scope="col">
//                         User
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       <td class="text-center"></td>
//                       <td class="text-center"></td>
//                       <td class="text-center"></td>
//                       <td class="text-center"></td>
//                       <td class="text-center"></td>
//                       <td class="text-center"></td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//               <h2 style={{ color: "#666", marginTop: "25px", fontSize: "24px" }}>Defer History</h2>
//               <div class="dash-detail-container" style={{ marginTop: "20px" }}>
//                 <table class="table red-bg-head th">
//                   <thead>
//                     <tr>
//                       <th class="text-center" scope="col">
//                         Sr#
//                       </th>
//                       <th class="text-center" scope="col">
//                         Defered to Session No
//                       </th>
//                       <th class="text-center" scope="col">
//                         Defered on
//                       </th>
//                       <th class="text-center" scope="col">
//                         Defered by
//                       </th>
//                       <th class="text-center" scope="col">
//                         User
//                       </th>
//                       <th class="text-center" scope="col">
//                         Action
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       <td class="text-center"></td>
//                       <td class="text-center"></td>
//                       <td class="text-center"></td>
//                       <td class="text-center"></td>
//                       <td class="text-center"></td>
//                       <td class="text-center"></td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//               <h2 style={{ color: "#666", marginTop: "25px", fontSize: "24px" }}>File Status History</h2>
//               <div class="dash-detail-container" style={{ marginTop: "20px" }}>
//                 <table class="table red-bg-head th">
//                   <thead>
//                     <tr>
//                       <th class="text-center" scope="col">
//                         Sr#
//                       </th>
//                       <th class="text-center" scope="col">
//                         File Status
//                       </th>
//                       <th class="text-center" scope="col">
//                         Date
//                       </th>
//                       <th class="text-center" scope="col">
//                         User
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       <td class="text-center"></td>
//                       <td class="text-center"></td>
//                       <td class="text-center"></td>
//                       <td class="text-center"></td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// }

// export default QMSDaferQuestionDetail;
