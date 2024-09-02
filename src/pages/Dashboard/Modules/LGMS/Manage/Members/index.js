import React, { useEffect, useState } from "react";
import { Layout } from "../../../../../../components/Layout";
import {
  LegislationSideBarItems,
  QMSSideBarItems,
} from "../../../../../../utils/sideBarItems";
import Header from "../../../../../../components/Header";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import { useNavigate } from "react-router-dom";
import { deleteMembers } from "../../../../../../api/APIs/Services/ManageQMS.service";
import moment from "moment";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";
import { getallMembers } from "../../../../../../api/APIs/Services/Motion.service";
import UpdateMemberParliamentaryYear from "../../../../../../components/MemberUpdateParliamentaryYearModal";

function LGMSMembers() {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [toUpdateMemberId, setToUpdateMemberId] = useState(null);
  const pageSize = 200; // Set your desired page size

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  const transformData = (apiData) => {
    console.log("apiData", apiData);
    return apiData.map((item) => ({
      id: item.id,
      memberName: `${item.memberName}`,
      // politicalParty: `${item?.politicalParties?.partyName}`,
      // electionType: item?.electionType,
      memberTenure: item?.tenures?.tenureName
        ? item?.tenures?.tenureName
        : "---",
      memberTerm: item?.terms?.termName ? item?.terms?.termName : "---",
      parliamentaryYear: item?.parliamentaryYears?.parliamentaryTenure
        ? item?.parliamentaryYears?.parliamentaryTenure
        : "---",
      memberProvince: item?.memberProvince ? item?.memberProvince : "---",
      // phoneNo: item?.phoneNo ? item?.phoneNo : "---",
      // gender: item?.gender,
      // fromDate: moment(item.fromDate).format("YYYY/MM/DD"),
      // toDate: moment(item.toDate).format("YYYY/MM/DD"),
      // memberStatus: item?.memberStatus,
    }));
  };

  // Handle Models
  const openModal = (id) => {
    setToUpdateMemberId(id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleMembers = async () => {
    try {
      const response = await getallMembers(currentPage, pageSize);
      if (response?.success) {
        setCount(response?.data?.count);
        const transformedData = transformData(response.data?.members);
        setMembers(transformedData);
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    handleMembers();
  }, [currentPage]);

  const handleDelete = async (id) => {
    try {
      const response = await deleteMembers(id);
      if (response?.success) {
        showSuccessMessage(response.message);
        handleMembers();
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
        dashboardLink={"lgms/dashboard"}
        addLink1={"/lgms/dashboard/manage/members/list"}
        title1={"Members"}
      />
      <ToastContainer />

      {showModal && showModal && (
        <UpdateMemberParliamentaryYear
          closeModal={closeModal}
          UpdateMemberId={toUpdateMemberId}
          showModal={showModal}
          handleMembers={handleMembers}
          member="Senators"
          // toUpdateMemberData={toUpdateMemberData}
        />
      )}

      <div class="container-fluid dash-detail-container card">
        <div class="row">
          <div class="col-12">
            <CustomTable
              data={members}
              tableTitle="Member List"
              addBtnText="Add Member"
              handleAdd={() =>
                navigate("/lgms/dashboard/manage/members/addedit")
              }
              handleEdit={(item) =>
                navigate("/lgms/dashboard/manage/members/addedit", {
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
              showSent={true}
              handleSent={(item) => openModal(item?.id)}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default LGMSMembers;
