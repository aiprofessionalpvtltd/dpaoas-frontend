import React, { useEffect, useState } from "react";
import { Layout } from "../../../../../../components/Layout";
import { QMSSideBarItems } from "../../../../../../utils/sideBarItems";
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

function QMSMembers() {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(null);
  const pageSize = 10; // Set your desired page size

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  const transformData = (apiData) => {
    return apiData.map((item) => ({
      id: item.id,
      memberName: `${item.memberName}`,
      politicalParty: `${item?.politicalParties?.partyName}`,
      // politicalParty: `${item?.politicalParty}`,
      electionType: item?.electionType,
      tenure: item?.tenures?.tenureName,
      phoneNo: item?.phoneNo,
      gender: item?.gender,
      fromDate: moment(item.fromDate).format("YYYY/MM/DD"),
      toDate: moment(item.toDate).format("YYYY/MM/DD"),
      memberStatus: item?.memberStatus,
    }));
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
    <Layout module={true} sidebarItems={QMSSideBarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/qms/department"}
        addLink1={"/qms/manage/members"}
        title1={"Members"}
      />
      <ToastContainer />

      <div class="container-fluid dash-detail-container card">
        <div class="row">
          <div class="col-12">
            <CustomTable
              block={false}
              data={members}
              tableTitle="Member List"
              addBtnText="Add Member"
              handleAdd={() => navigate("/qms/manage/members/addedit")}
              handleEdit={(item) =>
                navigate("/qms/manage/members/addedit", { state: item })
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

export default QMSMembers;
