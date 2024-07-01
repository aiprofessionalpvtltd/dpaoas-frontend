import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { Layout } from "../../../../../../components/Layout";
import {
  CommitteesSideBarItems,
} from "../../../../../../utils/sideBarItems";

import Header from "../../../../../../components/Header";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
// import CustomTable from "../../../../../components/CustomComponents/CustomTable";

const committeesData = [
  {
    id: 1,
    committeeRoom: "Committee Room 1",
    CommitteeName: "Standing Committee on Finance and Revenue",
    date: "06-11-2024",
    Time: "10:00 AM",
    
  },
  {
    id: 2,
    committeeRoom: "Committee Room 2",
    CommitteeName:
      "Standing Committee on Planning Development and Special Initiatives",
    date: "04-11-2024",
    Time: "12:00 PM",
    
  },
  {
    id: 3,
    committeeRoom: "Committee Room 2",
    date: "01-11-2024",
    Time: "01:00 PM",
    CommitteeName:
      "Standing Committee on Finance and Revenue",
    
  },
  {
    id: 4,
    committeeRoom: "Committee Room 1",
    date: "02-11-2024",
    Time: "8:00 AM",
    CommitteeName:
      "Standing Committee on Planning Development and Special Initiatives",
    
  },
  {
    id: 5,
    committeeRoom: "Committee Room 2",
    date: "02-11-2024",
    Time: "8:00 AM",
    CommitteeName:
      "Standing Committee on Finance and Revenue",
    
  },
 
];

function CommitteesManagementSystemBookingCommitteeRooms() {
  const navigate = useNavigate();
  const [count, setCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  // const [billData, setBillData] = useState([]);
  // const [committeeData, setCommitteeData] = useState([]);
  const pageSize = 10;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  // const transformLegislativeData = (apiData) => {
  //   return apiData.map((item, ) => ({
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
        title1={"Booked Committee Rooms"}
      />
      <div class="row mt-5">
        <div class="col-12">
          <CustomTable
            singleDataCard={true}
            block={false}
            data={committeesData}
            // hidebtn1={true}
            addBtnText={"Create Scheduling in Committee Room"}
            tableTitle="Booked Committee Rooms Lists"
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
            ActionHide={true}
            // showAssigned={true}
            // hendleAssigned={(item) =>
            //   navigate(
            //     "/committees/dashboard/committee-rooms/assign-committee-room",
            //     {
            //       state: { id: item?.SR },
            //     }
            //   )
            // }
            handleAdd={()=> navigate("/committees/dashboard/committee-rooms/addeditbooking")}
          />
        </div>
      </div>
    </Layout>
  );
}
export default CommitteesManagementSystemBookingCommitteeRooms;
