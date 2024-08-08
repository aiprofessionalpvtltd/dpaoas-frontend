// import React from "react";

// import { faClipboardQuestion, faFileImport } from "@fortawesome/free-solid-svg-icons";
// import { Layout } from "../../../../../../../components/Layout";
// import { LegislationSideBarItems } from "../../../../../../../utils/sideBarItems";
// import NoticeStatsCard from "../../../../../../../components/CustomComponents/NoticeStatsCard";
// import Header from "../../../../../../../components/Header";
// import { useLocation, useNavigate } from "react-router-dom";

// function BillFromSelection() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   console.log("loca", location?.state)
//   return (
//     <Layout module={true} sidebarItems={LegislationSideBarItems} centerlogohide={true}>
//       <Header dashboardLink={"/"} title1={"Select The Bill From"} />
//       {/* <div style={{ marginLeft: 15 }}>
//         <h2
//           style={{
//             fontSize: "22px",
//             fontWeight: "bold",
//             marginBottom: "10px",
//             color: "#fb6340",
//           }}
//         >
//           Select Bill From the Given
//         </h2>
//         <div class="row">
//           <div class="col-md-12">
//             <div class="mt-2 mb-4">
//               <div class="row">
//                 <NoticeStatsCard
//                   title={"Introduced In Senate"}
//                   icon={faClipboardQuestion}
//                   iconBgColor={"#FFA500"}
//                   onClick={() => navigate("/lgms/dashboard/bills/senate-bills")}
//                   // total={`20`}
//                   // sent={10}
//                   // received={5}
//                 />
//                 <NoticeStatsCard
//                   title={"Recieved From NA"}
//                   icon={faFileImport}
//                   iconBgColor={"#007bff"}
//                   onClick={() => navigate("/lgms/dashboard/bills/NA-bills")}
//                   // total={`5`}
//                   // sent={`5`}
//                   // received={"44"}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div> */}

//       <div className="w-100" style={{ padding: "10px" }}>
//         <div className="row">
//           <div className="col-12 col-md-6 mb-3">
//             <div
//               className="card text-center  shadow-lg"
//               style={{ height: "150px", cursor: "pointer" }}
//               onClick={() => navigate("/lgms/dashboard/bills/senate-bills", {state:{category:location?.state?.category}})}
//             >
//               <div className="card-body d-flex align-items-center justify-content-center">
//                 <h5 className="card-title mb-0 text-primary">Introduced In Senate</h5>
//               </div>
//             </div>
//           </div>
//           <div className="col-12 col-md-6 mb-3">
//             <div
//               className="card text-center  shadow-lg"
//               style={{ height: "150px", cursor: "pointer" }}
//               onClick={() => navigate("/lgms/dashboard/bills/NA-bills",{state:{category:location?.state?.category}})}
//             >
//               <div className="card-body d-flex align-items-center justify-content-center">
//                 <h5 className="card-title mb-0 text-success">Recieved From NA</h5>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// }

// export default BillFromSelection;
