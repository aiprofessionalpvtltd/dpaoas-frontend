import React, { useState } from "react";
import { Layout } from "../../../../components/Layout";
import { CommitteesSideBarItems } from "../../../../utils/sideBarItems";
import { useNavigate } from "react-router-dom";
import Header from "../../../../components/Header";
import NoticeStatsCard from "../../../../components/CustomComponents/NoticeStatsCard";
import {
  faClipboardQuestion,
  faFileImport,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import CustomTable from "../../../../components/CustomComponents/CustomTable";
import CommitteeReceievedBusinessModal from "../../../../components/CommitteeModels/RecievedBusinessModal";
import ScheduleCommitteeRoom from "../../../../components/CommitteeModels/CommitteeRoomModal";

const Questions = [
  {
    id: 1,
    NoticeOfficeDiaryNumber: 220,
    NoticeDate: "22-5-2024",
    NoticeTime: "12:00 PM",
    sessionNumber: 401,
    SubjectMatter: "Assign to Committee",
    category: "Short Notice",
    status: "Deffered",
  },
  {
    id: 12,
    NoticeOfficeDiaryNumber: 120,
    NoticeDate: "27-5-2024",
    NoticeTime: "3:00 PM",
    sessionNumber: 403,
    SubjectMatter: "Assign to Committee This",
    category: "Short Notice",
    status: "Deffered",
  },
];

const Motions = [
  {
    id: 4,
    NoticeOfficeDiaryNumber: 220,
    NoticeOfficeDate: "18-5-2024",
    NoticeOfficeDiaryTime: "11:00 AM",
    sessionNumber: 400,
    motionType: "Motion Under Rule 218",
    SubjectMatter:
      "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever",
    motionStatus: "Admitted",
  },
  {
    id: 9,
    NoticeOfficeDiaryNumber: 320,
    NoticeOfficeDate: "19-5-2024",
    NoticeOfficeDiaryTime: "09:00 AM",
    sessionNumber: 401,
    motionType: "Motion Under Rule 218",
    SubjectMatter: " standard dummy text ever",
    motionStatus: "Admitted",
  },
];

const Resolution = [
  {
    id: 16,
    SessionNumber: 402,
    ResolutionType: "Private Member Resolution",
    SubjectMatter: "Testing",
    NoticeOfficeDiaryNumber: 157,
    resolutionStatus: "under process",
  },
];

const Bills = [
  {
    id: 21,
    ParliamentaryYear: "2024-2025",
    Session: 400,
    billType: "Money Bill",
    BillCategory: "Government Bill",
    FileNumber: 202,
    billFrom: "From NA",
  },
];
function CommitteesManagementSystemDashboard() {
  const navigate = useNavigate();
  const [showTabs, setShowTabs] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Questions");
  const [count, setCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCommitteeMeetingModalOpen, setIsCommitteeMeetingModalOpen] =
    useState(false);
  const [selectedCommitteeRoom, setSelectedCommitteeRoom] = useState(null);
  const [modalBusinessName, setModalBusinessName] = useState("");
  const pageSize = 10; // Set your desired page size
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Modal Functions
  const handleModal = (data, businessName) => {
    setModalBusinessName(businessName);
    setIsModalOpen(true);
  };

  const handleReceivedBusinessClick = () => {
    setShowTabs(!showTabs);
    setSelectedTab("Questions"); // Reset selected link when toggling links visibility
  };

  // Committee Meeting Modal
  const handleCommitteeMeetingOpen = (committeeRoom) => {
    setSelectedCommitteeRoom(committeeRoom);
    setIsCommitteeMeetingModalOpen(true);
  };
  return (
    <Layout
      module={true}
      sidebarItems={CommitteesSideBarItems}
      centerlogohide={true}
    >
      {/* Questions Modal */}
      {isModalOpen && (
        <CommitteeReceievedBusinessModal
          modalisOpan={isModalOpen}
          hendleModal={() => setIsModalOpen(!isModalOpen)}
          modalBusinessName={modalBusinessName}
        />
      )}
      {/* {isCommitteeMeetingModalOpen && (
        <ScheduleCommitteeRoom
          isModalOpen={isModalOpen}
          handleModal={() => setIsCommitteeMeetingModalOpen(!isCommitteeMeetingModalOpen)}
          // committeeRoom={selectedCommitteeRoom}
          // timeSlot={selectedTimeSlot}
        />
      )} */}
      {isCommitteeMeetingModalOpen && (
        <ScheduleCommitteeRoom
          isModalOpen={isCommitteeMeetingModalOpen}
          handleModal={() =>
            setIsCommitteeMeetingModalOpen(!isCommitteeMeetingModalOpen)
          }
          committeeRoom={selectedCommitteeRoom} // Pass the appropriate committee room number or data
          // timeSlot={"10:00 AM - 11:00 AM"} // Pass the appropriate time slot data
        />
      )}

      <Header dashboardLink={"/"} title1={"Committees Stats"} />
      <div style={{ marginLeft: 15 }}>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            marginBottom: "10px",
            color: "#fb6340",
          }}
        >
          Daily Stats
        </h2>

        <div class="row">
          <div class="col-md-12">
            <div class="mt-2 mb-4">
              <div class="row">
                <NoticeStatsCard
                  title={"Total Committees"}
                  icon={faClipboardQuestion}
                  overall={true}
                  iconBgColor={"#FFA500"}
                  total={`8`}
                />
                <NoticeStatsCard
                  title={"Total Committee Rooms"}
                  icon={faFileImport}
                  overall={true}
                  iconBgColor={"#007bff"}
                  total={`4`}
                />
                <NoticeStatsCard
                  title={"Received Business"}
                  icon={faFileImport}
                  overall={true}
                  iconBgColor={"#007bff"}
                  total={`10`}
                  onClick={handleReceivedBusinessClick}
                />
              </div>
            </div>
          </div>
        </div>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            marginBottom: "10px",
            color: "#fb6340",
          }}
        >
          Schedule Meeting
        </h2>
        <div className="row">
          <div className="col-3">
            <div className="row d-flex flex-column">
              <NoticeStatsCard
                title={"Scheduled Meetings"}
                icon={faUsers}
                overall={true}
                iconBgColor={"#FFA500"}
                total={`3`}
                ColValue={"col"}
                onClick={() =>
                  navigate("/committees/dashboard/committee-rooms/booked")
                }
              />
              <div className="col mt-3 mb-4">
                <button
                  className="btn btn-primary"
                  style={{ width: "100%" }}
                  onClick={() => {
                    handleCommitteeMeetingOpen(1);
                  }}
                >
                  Schedule Meeting In Committee Room 1
                </button>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="row d-flex flex-column">
              <NoticeStatsCard
                title={"Scheduled Meetings"}
                icon={faUsers}
                overall={true}
                iconBgColor={"#FFA500"}
                total={`2`}
                ColValue={"col"}
                onClick={() =>
                  navigate("/committees/dashboard/committee-rooms/booked")
                }
              />
              <div className="col mt-3 mb-4">
                <button
                  className="btn btn-primary"
                  style={{ width: "100%" }}
                  onClick={() => {
                    handleCommitteeMeetingOpen(2);
                  }}
                >
                  Schedule Meeting In Committee Room 2
                </button>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="row d-flex flex-column">
              <NoticeStatsCard
                title={"Scheduled Meetings"}
                icon={faUsers}
                overall={true}
                iconBgColor={"#FFA500"}
                total={`0`}
                ColValue={"col"}
                onClick={() =>
                  navigate("/committees/dashboard/committee-rooms/booked")
                }
              />
              <div className="col mt-3 mb-4">
                <button
                  className="btn btn-primary"
                  style={{ width: "100%" }}
                  onClick={() => {
                    handleCommitteeMeetingOpen(3);
                  }}
                >
                  Schedule Meeting In Committee Room 3
                </button>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="row d-flex flex-column">
              <NoticeStatsCard
                title={"Scheduled Meetings"}
                icon={faUsers}
                overall={true}
                iconBgColor={"#FFA500"}
                total={`5`}
                ColValue={"col"}
                onClick={() =>
                  navigate("/committees/dashboard/committee-rooms/booked")
                }
              />
              <div className="col mt-3 mb-4">
                <button
                  className="btn btn-primary"
                  style={{ width: "100%" }}
                  onClick={() => {
                    handleCommitteeMeetingOpen(4);
                  }}
                >
                  Schedule Meeting In Committee Room 4
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row p-2">
          {showTabs && (
            <div className="card">
              <div className="card-body">
                <div style={{ padding: "10px" }}>
                  <div class="col-md-12">
                    <div class="mt-1 mb-4">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          // justifyContent: "center",
                        }}
                      >
                        <ul
                          className="nav nav-tabs mb-3 mt-3"
                          id="ex1"
                          role="tablist"
                        >
                          <li
                            className="nav-item"
                            role="presentation"
                            onClick={() => setSelectedTab("Questions")}
                          >
                            <button
                              type="button"
                              className={
                                selectedTab === "Questions"
                                  ? "nav-link active"
                                  : "nav-link"
                              }
                              style={{ width: "170px" }}
                              data-bs-toggle="tab"
                              role="tab"
                              aria-controls="ex1-tabs-1"
                              aria-selected={
                                selectedTab === "Questions" ? "true" : "false"
                              }
                            >
                              Questions
                            </button>
                          </li>
                          <li
                            className="nav-item"
                            role="presentation"
                            onClick={() => setSelectedTab("Motions")}
                          >
                            <button
                              type="button"
                              className={
                                selectedTab === "Motions"
                                  ? "nav-link active"
                                  : "nav-link"
                              }
                              style={{ width: "170px" }}
                              data-bs-toggle="tab"
                              role="tab"
                              aria-controls="ex1-tabs-2"
                              aria-selected={
                                selectedTab === "Motions" ? "true" : "false"
                              }
                            >
                              Motions
                            </button>
                          </li>
                          <li
                            className="nav-item"
                            role="presentation"
                            onClick={() => setSelectedTab("Resolutions")}
                          >
                            <button
                              type="button"
                              className={
                                selectedTab === "Resolutions"
                                  ? "nav-link active"
                                  : "nav-link"
                              }
                              style={{ width: "170px" }}
                              data-bs-toggle="tab"
                              role="tab"
                              aria-controls="ex1-tabs-2"
                              aria-selected={
                                selectedTab === "Resolutions" ? "true" : "false"
                              }
                            >
                              Resolution
                            </button>
                          </li>
                          <li
                            className="nav-item"
                            role="presentation"
                            onClick={() => setSelectedTab("Notices")}
                          >
                            <button
                              type="button"
                              className={
                                selectedTab === "Notices"
                                  ? "nav-link active"
                                  : "nav-link"
                              }
                              style={{ width: "170px" }}
                              data-bs-toggle="tab"
                              role="tab"
                              aria-controls="ex1-tabs-2"
                              aria-selected={
                                selectedTab === "Notices" ? "true" : "false"
                              }
                            >
                              Notices
                            </button>
                          </li>
                          <li
                            className="nav-item"
                            role="presentation"
                            onClick={() => setSelectedTab("Bills")}
                          >
                            <button
                              type="button"
                              className={
                                selectedTab === "Bills"
                                  ? "nav-link active"
                                  : "nav-link"
                              }
                              style={{ width: "170px" }}
                              data-bs-toggle="tab"
                              role="tab"
                              aria-controls="ex1-tabs-2"
                              aria-selected={
                                selectedTab === "Bills" ? "true" : "false"
                              }
                            >
                              Bills
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tab-content" id="ex1-content">
                  {selectedTab === "Questions" ? (
                    // Render content for the 'Noting' tab
                    <section class="mb-5">
                      <CustomTable
                        ActionHide={false}
                        addBtnText="View History"
                        data={Questions}
                        tableTitle="Questions history"
                        headertitlebgColor={"#666"}
                        headertitletextColor={"#FFF"}
                        handlePageChange={handlePageChange}
                        currentPage={currentPage}
                        hideDeleteIcon={true}
                        showAssigned={false}
                        showEditIcon={true}
                        assignBtn={true}
                        assignClick={(items) => {
                          // console.log("items", items)
                          handleModal(items, "Question");
                        }}
                        handleAdd={() => {
                          navigate(
                            "/committees/dashboard/received-business-history/questions"
                          );
                        }}
                        pageSize={pageSize}
                        totalCount={count}
                        singleDataCard={true}
                      />
                    </section>
                  ) : selectedTab === "Motions" ? (
                    <section class="mb-5">
                      <CustomTable
                        addBtnText="View History"
                        ActionHide={false}
                        data={Motions}
                        tableTitle="Motions"
                        headertitlebgColor={"#666"}
                        headertitletextColor={"#FFF"}
                        handlePageChange={handlePageChange}
                        currentPage={currentPage}
                        hideDeleteIcon={true}
                        showAssigned={false}
                        showEditIcon={true}
                        assignBtn={true}
                        assignClick={(items) => {
                          handleModal(items, "Motions");
                        }}
                        handleAdd={() => {
                          navigate(
                            "/committees/dashboard/received-business-history/motions"
                          );
                        }}
                        pageSize={pageSize}
                        totalCount={count}
                        singleDataCard={true}
                      />
                    </section>
                  ) : selectedTab === "Resolutions" ? (
                    <section class="mb-5">
                      <CustomTable
                        ActionHide={false}
                        addBtnText="View History"
                        data={Resolution}
                        tableTitle="Resolutions"
                        headertitlebgColor={"#666"}
                        headertitletextColor={"#FFF"}
                        handlePageChange={handlePageChange}
                        currentPage={currentPage}
                        hideDeleteIcon={true}
                        showAssigned={false}
                        showEditIcon={true}
                        assignBtn={true}
                        assignClick={(items) => {
                          handleModal(items, "Resolution");
                        }}
                        handleAdd={() => {
                          navigate(
                            "/committees/dashboard/received-business-history/resolutions"
                          );
                        }}
                        pageSize={pageSize}
                        totalCount={count}
                        singleDataCard={true}
                      />
                    </section>
                  ) : selectedTab === "Notices" ? (
                    <section class="mb-5">
                      <CustomTable
                        ActionHide={false}
                        addBtnText="View History"
                        data={[]}
                        tableTitle="Notices"
                        headertitlebgColor={"#666"}
                        headertitletextColor={"#FFF"}
                        handlePageChange={handlePageChange}
                        currentPage={currentPage}
                        hideDeleteIcon={true}
                        showAssigned={false}
                        showEditIcon={true}
                        assignBtn={true}
                        assignClick={(items) => {
                          handleModal(items, "Notice");
                        }}
                        handleAdd={() => {
                          navigate(
                            "/committees/dashboard/received-business-history/notices"
                          );
                        }}
                        pageSize={pageSize}
                        totalCount={count}
                        singleDataCard={true}
                      />
                    </section>
                  ) : selectedTab === "Bills" ? (
                    <section class="mb-5">
                      <CustomTable
                        ActionHide={false}
                        addBtnText="View History"
                        data={Bills}
                        tableTitle="Bills"
                        headertitlebgColor={"#666"}
                        headertitletextColor={"#FFF"}
                        handlePageChange={handlePageChange}
                        currentPage={currentPage}
                        hideDeleteIcon={true}
                        showAssigned={false}
                        showEditIcon={true}
                        assignBtn={true}
                        assignClick={(items) => {
                          handleModal(items, "Bill");
                        }}
                        handleAdd={() => {
                          navigate(
                            "/committees/dashboard/received-business-history/bills"
                          );
                        }}
                        pageSize={pageSize}
                        totalCount={count}
                        singleDataCard={true}
                      />
                    </section>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default CommitteesManagementSystemDashboard;
