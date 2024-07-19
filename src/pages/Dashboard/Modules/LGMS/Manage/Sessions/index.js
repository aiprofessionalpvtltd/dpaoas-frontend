import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../../../../../components/Layout";
import {
  LegislationSideBarItems,
  QMSSideBarItems,
} from "../../../../../../utils/sideBarItems";
import Header from "../../../../../../components/Header";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import {
  deleteSessions,
  getAllSessions,
} from "../../../../../../api/APIs/Services/ManageQMS.service";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";
import moment from "moment";

function LGMSSessions() {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(null);
  const pageSize = 10; // Set your desired page size

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  const transformData = (apiData) => {
    return apiData?.map((item) => ({
      id: item.id,
      sessionName: `${item.sessionName}`,
      parliamentaryYear: `${item?.parliamentaryYear?.parliamentaryTenure}`,
      calledBy: `${item?.calledBy}`,
      startDate: moment(item.startDate).format("DD-MM-YYYY"),
      endDate: moment(item.endDate).format("DD-MM-YYYY"),
      legislationDiaryDate: moment(item.legislationDiaryDate).format(
        "DD-MM-YYYY"
      ),
      // businessSessions: String(item?.businessSessions[0]?.sessionName),
      // businessStatus: `${item?.businessStatus}`,
      // isQuoraumAdjourned: `${item?.isQuoraumAdjourned}`,
      summonNoticeDate: moment(item.summonNoticeDate).format("DD-MM-YYYY"),
      summonNoticeTime: item?.summonNoticeTime
        ? moment(item.summonNoticeTime, "hh:mm A").format("hh:mm A")
        : "---",
      // summonNoticeTime: `${item?.summonNoticeTime}`,

     

      // jointSessionPurpose: `${item?.jointSessionPurpose}`,
      sessionStatus: `${item?.sessionStatus}`,
    }));
  };

  const handleSessions = async () => {
    try {
      const response = await getAllSessions(currentPage, pageSize);
      if (response?.success) {
        setCount(response?.data?.count);
        const transformedData = transformData(response.data?.sessions);
        setSessions(transformedData);
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    handleSessions();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await deleteSessions(id);
      if (response?.success) {
        showSuccessMessage(response.message);
        handleSessions();
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  };

  return (
    <Layout
      module={true}
      sidebarItems={LegislationSideBarItems}
      centerlogohide={true}
    >
      <Header
        dashboardLink={"/qms/manage"}
        addLink1={"/qms/manage/sessions"}
        title1={"Sessions"}
      />
      <ToastContainer />

      <div class="container-fluid dash-detail-container card">
        <div class="row">
          <div class="col-12">
            <CustomTable
              block={true}
              data={sessions}
              tableTitle="Sessions List"
              addBtnText="Add Sessions"
              handleAdd={() =>
                navigate("/lgms/dashboard/manage/session/addedit")
              }
              handleEdit={(item) =>
                navigate("/lgms/dashboard/manage/session/addedit", {
                  state: item,
                })
              }
              handleDelete={(item) => handleDelete(item.id)}
              headertitlebgColor={"#666"}
              headertitletextColor={"#FFF"}
              handlePageChange={handlePageChange}
              currentPage={currentPage}
              pageSize={pageSize}
              totalCount={count}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default LGMSSessions;
