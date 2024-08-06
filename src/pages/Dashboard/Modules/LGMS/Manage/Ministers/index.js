import React, { useEffect, useState } from "react";
import { Layout } from "../../../../../../components/Layout";
import { LegislationSideBarItems } from "../../../../../../utils/sideBarItems";
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
import { getAllMinisters } from "../../../../../../api/APIs/Services/LegislationModule.service";

function LGMSMinisters() {
  const navigate = useNavigate();
  const [ministers, setMinisters] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(null);
  const pageSize = 10; // Set your desired page size

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  const transformData = (apiData) => {
    console.log("apiData", apiData);
    return apiData.map((item) => ({
      id: item.id,
      ministerName: `${item.mnaName}`,
      politicalParty: `${item?.politicalParties?.partyName}`,
      minstries: item?.ministries
        ? item?.ministries
            .map((ministries) => ministries?.ministryName)
            .join(" , ")
        : "---",
      phoneNumber: item?.phone ? item?.phone : "",
      constituency: item?.constituency ? item?.constituency : "",
      address: item?.address ? item?.address : "",
    }));
  };

  const getAllMinisterApi = async () => {
    try {
      const response = await getAllMinisters(currentPage, pageSize);
      if (response?.success) {
        setCount(response?.data?.count);
        const transformedData = transformData(response.data?.mnas);
        setMinisters(transformedData);
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getAllMinisterApi();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await deleteMembers(id);
      if (response?.success) {
        showSuccessMessage(response.message);
        getAllMinisterApi();
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

      <div class="container-fluid dash-detail-container card">
        <div class="row">
          <div class="col-12">
            <CustomTable
              data={ministers}
              tableTitle="Ministers List"
              addBtnText="Add Minister"
              handleAdd={() =>
                navigate("/lgms/dashboard/manage/ministers/addedit")
              }
              handleEdit={(item) =>
                navigate("/lgms/dashboard/manage/ministers/addedit", {
                  state: item,
                })
              }
              hideDeleteIcon={true}
              // handleDelete={(item) => handleDelete(item.id)}
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

export default LGMSMinisters;
