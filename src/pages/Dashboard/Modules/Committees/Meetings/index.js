import React, { useCallback, useEffect, useState } from "react";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";
import { Layout } from "../../../../../components/Layout";
import { CommitteesSideBarItems } from "../../../../../utils/sideBarItems";
import {
  DeleteLegislativeBill,
  getAllLegislativeBill,
} from "../../../../../api/APIs/Services/Notice.service";
import Header from "../../../../../components/Header";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import CustomTable from "../../../../../components/CustomComponents/CustomTable";
import ScheduleCommitteeMeetingDocsModel from "../../../../../components/CommitteeModels/ComitteeMeetingAttachDocModel";
import MarkMeetingMemberAttendance from "../../../../../components/CommitteeModels/CommitteeMeetingMarkAttendanceModel";

const committeesData = [
  {
    id: 1,
    committeeName:
      "Committee to consider and make recommendations on the Money Bill",
    meetingDate:"11-06-2024",
    meetingTime:"11:00 AM: 12:00 PM",
    committeeRoom:"Committee Room 3",
    meetingStatus:"Pending",
    status: "active",
  },
  {
    id: 2,
    committeeName: "Senate House Committee",
    meetingDate:"12-06-2024",
    meetingTime:"10:00 AM: 11:00 PM",
    committeeRoom:"Committee Room 1",
    meetingStatus:"Pending",
    status: "active",
  },
  {
    id: 3,
    committeeName: "Senate Finance Committee",
    meetingDate:"14-06-2024",
    meetingTime:"09:00 AM: 10:00 PM",
    committeeRoom:"Committee Room 4",
    meetingStatus:"Pending",
    status: "active",
  },
  {
    id: 4,
    committeeName: "Business Advisory Committee",
    meetingDate:"18-06-2024",
    meetingTime:"11:00 AM: 12:00 PM",
    committeeRoom:"Committee Room 1",
    meetingStatus:"Pending",
    status: "active",
  },
];

function CommitteesManagementSystemMeetings() {
  const navigate = useNavigate();
  const [count, setCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [billData, setBillData] = useState([]);
  const [committeeData, setCommitteeData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isView, setIsView] = useState(false);
  const [isAttendanceModalOpen, setIsAttendaceModalOpen] = useState(false);
  const pageSize = 5;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAttendanceModal = ()=>{
     setIsAttendaceModalOpen(!isAttendanceModalOpen)
     setIsView(false);
     
  }

  const handleView = ()=>{
    setIsAttendaceModalOpen(!isAttendanceModalOpen)
    setIsView(true);
  }
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
      title1={"Committee Meetings"}
    />
    {isModalOpen && (
        <ScheduleCommitteeMeetingDocsModel
          isModalOpen={isModalOpen}
          handleModal={() => setIsModalOpen(!isModalOpen)}
          
        />
      )}
    {isAttendanceModalOpen && (
        <MarkMeetingMemberAttendance
          isModalOpen={isAttendanceModalOpen}
          handleModal={handleAttendanceModal }
          isview= {isView}
          
        />
      )}
    <div className="row mt-5">
      <div className="col-12">
        <CustomTable
          singleDataCard={true}
          block={false}
          data={committeesData}
          hidebtn1={true}
          tableTitle="Meeting Lists"
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
          handleAdd={() =>
            navigate("/committees/dashboard/committees/addedit")
          }
          showView={true}
          
          handleView={handleView}
          
          showAttendance={true}
          hendleAttendance={()=>setIsAttendaceModalOpen(!isAttendanceModalOpen)}
          showDocs={true}
          hendleDocs={()=> setIsModalOpen(!isModalOpen)}
          // handleDelete={(item) => handleDelete(item.SR)}
          // ActionHide={true}
        />
      </div>
    </div>
  </Layout>
  );
}

export default CommitteesManagementSystemMeetings;
