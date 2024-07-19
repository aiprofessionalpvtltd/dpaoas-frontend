import React, { useCallback, useEffect, useState } from "react";

import { ToastContainer } from "react-toastify";
import { Layout } from "../../../../../../../components/Layout";
import { CommitteesSideBarItems } from "../../../../../../../utils/sideBarItems";

import Header from "../../../../../../../components/Header";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import CustomTable from "../../../../../../../components/CustomComponents/CustomTable";

const Questions = [
  {
    id: 11,
    committeeName: "Senate House Committee",
    description: "It is necessary to resolve in the coming month",
    //   status: "Deffered",
  },
  {
    id: 4,
    committeeName: "Senate Finance Committee",
    description: "Important",
  },
];

function CommitteesManagementSystemPreviousNoticesHistory() {
  const navigate = useNavigate();
  const [count, setCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [billData, setBillData] = useState([]);
  const [committeeData, setCommitteeData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isView, setIsView] = useState(false);
  const [isAttendanceModalOpen, setIsAttendaceModalOpen] = useState(false);
  const pageSize = 10;

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
        title1={"Assigned Noices History"}
      />

      <div className="row mt-5">
        <div className="col-12">
          <CustomTable
            singleDataCard={true}
            hideBtn={true}
            hidebtn1={true}
            ActionHide={true}
            data={Questions}
            tableTitle="Assigned Notices"
            headertitlebgColor={"#666"}
            headertitletextColor={"#FFF"}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            pageSize={pageSize}
            totalCount={count}
          />
        </div>
      </div>
    </Layout>
  );
}

export default CommitteesManagementSystemPreviousNoticesHistory;
