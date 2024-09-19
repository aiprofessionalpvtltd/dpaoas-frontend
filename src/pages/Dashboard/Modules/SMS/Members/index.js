import React, { useEffect, useState } from "react";
import { Layout } from "../../../../../components/Layout";
import Header from "../../../../../components/Header";
import CustomTable from "../../../../../components/CustomComponents/CustomTable";

import { useNavigate } from "react-router-dom";
import { deleteMembers } from "../../../../../api/APIs/Services/ManageQMS.service";
import moment from "moment";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";
import { SMSsidebarItems } from "../../../../../utils/sideBarItems";
import { getallMembers } from "../../../../../api/APIs/Services/Motion.service";

function SMSMembers() {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
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
      electionType: item?.electionType,
      reason: item?.reason ? item?.reason : "---",
      phoneNo: item?.phoneNo,
      memberStatus: item?.memberStatus,
    }));
  };

  const handleMembers = async () => {
    try {
      const response = await getallMembers(currentPage, pageSize);
      if (response?.success) {
        console.log("count", response?.data?.count);
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
  }, [count, currentPage, pageSize]);

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
    <Layout module={true} sidebarItems={SMSsidebarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/sms/dashboard"}
        addLink1={"/sms/members/list"}
        title1={"Members"}
      />
      <ToastContainer />
      <div class="container-fluid dash-detail-container card">
        <div class="row">
          <div class="col-12">
            <CustomTable
              data={members}
              tableTitle="Member List"
              addBtnText="Add Member"
              hideDeleteIcon={true}
              hidebtn1={true}
              handleAdd={() => navigate("/sms/members/addedit")}
              handleEdit={(item) =>
                navigate("/sms/members/addedit", { state: item })
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

export default SMSMembers;
