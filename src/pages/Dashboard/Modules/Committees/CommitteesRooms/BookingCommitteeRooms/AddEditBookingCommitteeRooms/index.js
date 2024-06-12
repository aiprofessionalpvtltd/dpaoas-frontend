import React, { useCallback, useEffect, useState } from "react";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";
import { Layout } from "../../../../../../../components/Layout";
import {
  CommitteesSideBarItems,
  LegislationSideBarItems,
} from "../../../../../../../utils/sideBarItems";
import {
  DeleteLegislativeBill,
  getAllLegislativeBill,
} from "../../../../../../../api/APIs/Services/Notice.service";
import Header from "../../../../../../../components/Header";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import CustomTable from "../../../../../../../components/CustomComponents/CustomTable";
import ScheduleCommitteeRoom from "../../../../../../../components/CommitteeModels/CommitteeRoomModal";
// import CustomTable from "../../../../../components/CustomComponents/CustomTable";

const CommitteeRooms = [
  {
    id: 1,
    committeeRoom: "Time Slots",
  },
  {
    id: 2,
    committeeRoom: "Committee Room 1",
  },
  {
    id: 3,
    committeeRoom: "Committee Room 2",
  },
  {
    id: 4,
    committeeRoom: "Committee Room 3",
  },
  {
    id: 5,
    committeeRoom: "Committee Room 4",
  },
  {
    id: 6,
    committeeRoom: "Committee Room 5",
  },
];

const bookedData = [
  {
    id: 1,
    time: "09:00 am - 10:00 am",
    CommitteeRoomData1: "Available",
    CommitteeRoomData2: "Available",
    CommitteeRoomData3: "Booked",
    CommitteeRoomData4: "Available",
    CommitteeRoomData5: "Available",
  },
  {
    id: 2,
    time: "10:00 am - 11:00 am",
    CommitteeRoomData1: "Booked",
    CommitteeRoomData2: "Available",
    CommitteeRoomData3: "Available",
    CommitteeRoomData4: "Available",
    CommitteeRoomData5: "Booked",
  },
  {
    id: 3,
    time: "11:00 am - 12:00 pm",
    CommitteeRoomData1: "Available",
    CommitteeRoomData2: "Booked",
    CommitteeRoomData3: "Booked",
    CommitteeRoomData4: "Available",
    CommitteeRoomData5: "Available",
  },
  {
    id: 4,
    time: "12:00 pm - 01:00 pm",
    CommitteeRoomData1: "Available",
    CommitteeRoomData2: "Available",
    CommitteeRoomData3: "Available",
    CommitteeRoomData4: "Available",
    CommitteeRoomData5: "Booked",
  },
  {
    id: 5,
    time: "01:00 pm - 02:00 pm",
    CommitteeRoomData1: "Available",
    CommitteeRoomData2: "Booked",
    CommitteeRoomData3: "Booked",
    CommitteeRoomData4: "Available",
    CommitteeRoomData5: "Available",
  },
  {
    id: 6,
    time: "02:00 pm - 03:00 pm",
    CommitteeRoomData1: "Available",
    CommitteeRoomData2: "Booked",
    CommitteeRoomData3: "Available",
    CommitteeRoomData4: "Available",
    CommitteeRoomData5: "Available",
  },
  {
    id: 7,
    time: "03:00 pm - 04:00 pm",
    CommitteeRoomData1: "Available",
    CommitteeRoomData2: "Booked",
    CommitteeRoomData3: "Booked",
    CommitteeRoomData4: "Available",
    CommitteeRoomData5: "Booked",
  },
  {
    id: 8,
    time: "04:00 pm - 05:00 pm",
    CommitteeRoomData1: "Available",
    CommitteeRoomData2: "Booked",
    CommitteeRoomData3: "Booked",
    CommitteeRoomData4: "Available",
    CommitteeRoomData5: "Booked",
  },
];

function CommitteesManagementSystemAddEditBookinginCommitteeRooms() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCommitteeRoom, setSelectedCommitteeRoom] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCellClick = (roomId, timeSlot) => {
    setSelectedCommitteeRoom(roomId);
    setSelectedTimeSlot(timeSlot);
    setShowPopup(true);
    setIsModalOpen(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedCommitteeRoom(null);
    setSelectedTimeSlot(null);
  };

  return (
    <Layout
      module={true}
      sidebarItems={CommitteesSideBarItems}
      centerlogohide={true}
    >
      <ToastContainer />
      <Header
        dashboardLink={"/committees/dashboard"}
        addLink1={"/"}
        title1={"Scheduling in Committee Rooms"}
      />
      {isModalOpen && (
        <ScheduleCommitteeRoom
          isModalOpen={isModalOpen}
          handleModal={() => setIsModalOpen(!isModalOpen)}
          committeeRoom={selectedCommitteeRoom}
          timeSlot={selectedTimeSlot}
        />
      )}
      <div className="row mt-5">
        <div className="col-12">
          <div className="card">
            <div
              className="dash-card-header "
              style={{
                background: "rgb(20, 174, 92)",
                padding: "10px",
              }}
            >
              <h4 style={{ fontSize: "18px", marginTop: "4px" }}>Scheduling</h4>
            </div>
            <div className="card-body">
              <table className="table red-bg-head th">
                <thead>
                  <tr>
                    {CommitteeRooms.map((committeeRoom) => (
                      <th className="text-center" scope="col">
                        {committeeRoom?.committeeRoom}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bookedData &&
                    bookedData.map((data) => (
                      <tr key={data?.id}>
                        <td
                          className="text-center"
                          style={{ cursor: "pointer" }}
                        >
                          {data.time}
                        </td>
                        {/* {Object.keys(data).map((key, index) => {
                        // const backgroundColor = data[key] === "Available" ? "green" : data[key] === "Booked" ? "blue" : "white";
                        const text = data[key];
                        const backgroundColor = text === "Available" ? "green" : text === "Booked" ? "blue" : "transparent";
                        if (key.includes('CommitteeRoomData')) {
                          return (
                            <td
                              key={index}
                              className="text-center"
                              style={{ cursor: "pointer", backgroundColor  }}
                              onClick={() => handleCellClick(index-1, data.time)}
                            >
                                 <span style={{ backgroundColor, padding: '0.5px' }}>{text}</span>
                             
                            </td>
                          );
                        }
                        return null;
                      })} */}
                        {Object.keys(data).map((key, index) => {
                          if (key.includes("CommitteeRoomData")) {
                            const text = data[key];
                            const backgroundColor =
                              text === "Available"
                                ? "#14AE5C"
                                : text === "Booked"
                                  ? "#4276F0"
                                  : "transparent";
                            return (
                              <td
                                key={index}
                                className="text-center"
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  handleCellClick(index - 1, data.time)
                                }
                              >
                                <span
                                  style={{
                                    backgroundColor,
                                    padding: "4px 5px",
                                    color: "white",
                                  }}
                                >
                                  {text}
                                </span>
                              </td>
                            );
                          }
                          return null;
                        })}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CommitteesManagementSystemAddEditBookinginCommitteeRooms;

// function CommitteesManagementSystemBookedCommitteeRooms() {
//   const [showPopup, setShowPopup] = useState(false);
//   const [selectedCell, setSelectedCell] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const handleCellClick = (cellId) => {
//     setSelectedCell(cellId);
//     setShowPopup(true);
//     setIsModalOpen(true);
//   };

//   const handleClosePopup = () => {
//     setShowPopup(false);
//     setSelectedCell(null);
//   };
//   return (
//     <Layout
//       module={true}
//       sidebarItems={CommitteesSideBarItems}
//       centerlogohide={true}
//     >
//       <ToastContainer />
//       <Header
//         dashboardLink={"/committees/dashboard"}
//         addLink1={"/"}
//         title1={"Scheduling in Committee Rooms"}
//       />
//       {isModalOpen && (
//         <ScheduleCommitteeRoom
//           isModalOpen={isModalOpen}
//           hendleModal={() => setIsModalOpen(!isModalOpen)}
//         />
//       )}
//       <div class="row mt-5">
//         <div class="col-12">
//           <h2 style={{ color: "#666", marginTop: "30px", fontSize: "21px" }}>
//             Scheduling
//           </h2>
//           <div class="dash-detail-container" style={{ marginTop: "20px" }}>
//             <table class="table red-bg-head th">
//               <thead>
//                 <tr>
//                   {CommitteeRooms.map((committeeRoom) => (
//                     <th class="text-center" scope="col">
//                       {committeeRoom?.committeeRoom}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {bookedData &&
//                   bookedData.map((data) => (
//                     <tr key={data?.id}>
//                       <td className="text-center" style={{ cursor: "pointer" }}>
//                         {data.time}
//                       </td>
//                       <td
//                         className="text-center"
//                         style={{ cursor: "pointer" }}
//                         onClick={() => handleCellClick(data.id + "-1")}
//                       >
//                         {data.CommitteeRoomData1}
//                       </td>
//                       <td
//                         className="text-center"
//                         style={{ cursor: "pointer" }}
//                         onClick={() => handleCellClick(data.id + "-2")}
//                       >
//                         {data.CommitteeRoomData2}
//                       </td>
//                       <td
//                         className="text-center"
//                         style={{ cursor: "pointer" }}
//                         onClick={() => handleCellClick(data.id + "-3")}
//                       >
//                         {data.CommitteeRoomData3}
//                       </td>
//                       <td
//                         className="text-center"
//                         style={{ cursor: "pointer" }}
//                         onClick={() => handleCellClick(data.id + "-4")}
//                       >
//                         {data.CommitteeRoomData4}
//                       </td>
//                       <td
//                         className="text-center"
//                         style={{ cursor: "pointer" }}
//                         onClick={() => handleCellClick(data.id + "-5")}
//                       >
//                         {data.CommitteeRoomData5}
//                       </td>

//                       {/* <td class="text-center">{data.time}</td>
//                       <td class="text-center">{data.CommitteeRoomData1}</td>
//                       <td class="text-center">{data.CommitteeRoomData2}</td>
//                       <td class="text-center">{data.CommitteeRoomData3}</td>
//                       <td class="text-center">{data.CommitteeRoomData4}</td>
//                       <td class="text-center">{data.CommitteeRoomData5}</td> */}
//                     </tr>
//                   ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//       {/* {showPopup && (
//         <div className="popup">
//           <div className="popup-inner">
//             <h3>Assign Time for Cell ID: {selectedCell}</h3>
//             <button onClick={handleClosePopup}>Close</button>
//           </div>
//         </div>
//       )} */}
//     </Layout>
//   );
// }
// export default CommitteesManagementSystemBookedCommitteeRooms;

{
  /* <CustomTable
            singleDataCard={true}
            block={false}
            data={committeeData}
            hidebtn1={true}
            // addBtnText={"Create Committee Room"}
            tableTitle="Committee Rooms Lists"
            handlePageChange={handlePageChange}
            hideBtn={true}
            hideDeleteIcon={true}
            currentPage={currentPage}
            pageSize={pageSize}
            headertitlebgColor={"#666"}
            headertitletextColor={"#FFF"}
            totalCount={count}
            hideEditIcon={false}
            showEditIcon={true}
            showAssigned={true}
            hendleAssigned={(item) => navigate("/committees/dashboard/committee-rooms/assign-committee-room", {
                  state: { id: item?.SR },
                })}
            
          /> */
}

// const navigate = useNavigate();
// const [count, setCount] = useState(null);
// const [currentPage, setCurrentPage] = useState(0);
// const [billData, setBillData] = useState([]);
// const [committeeData, setCommitteeData] = useState([]);
// const pageSize = 5;

// const handlePageChange = (page) => {
//   setCurrentPage(page);
// };
// const transformLegislativeData = (apiData) => {
//   return apiData.map((item, index) => ({
//     SR: item?.id,
//     committeeName: item?.title ? item?.title : "",
//     committeeType: item?.session?.sessionName
//       ? item?.session?.sessionName
//       : "",
//     chairpersonConvener: item?.date
//       ? moment(item?.date).format("DD-MM-YYYY")
//       : "",
//     committeeSecretary: item?.description ? item?.description : "",
//     members: item?.device ? item?.device : "",
//     status: item?.isActive ? item?.isActive : "",
//   }));
// };

// const getAllLegislativeBillApi = useCallback(async () => {
//   try {
//     const response = await getAllLegislativeBill(currentPage, pageSize);
//     if (response?.success) {
//       setCount(response?.data?.count);
//       const trensferData = transformLegislativeData(
//         response?.data?.legislativeBills
//       );
//       setBillData(trensferData);
//     }
//   } catch (error) {
//     showErrorMessage(error?.response?.data?.message);
//   }
// }, [currentPage, pageSize, setCount, setBillData]);

// const handleDelete = async (id) => {
//   try {
//     const response = await DeleteLegislativeBill(id);
//     if (response?.success) {
//       showSuccessMessage(response.message);
//       getAllLegislativeBillApi();
//     }
//   } catch (error) {
//     showErrorMessage(error.response.data.message);
//   }
// };

//   useEffect(() => {
//     getAllLegislativeBillApi();
//     setCommitteeData(committeesData);
//   }, [currentPage]);
