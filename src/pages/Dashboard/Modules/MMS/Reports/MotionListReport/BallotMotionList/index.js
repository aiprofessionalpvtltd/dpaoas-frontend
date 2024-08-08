import React, { useEffect, useState } from "react";
import { Layout } from "../../../../../../../components/Layout";
import { MMSSideBarItems } from "../../../../../../../utils/sideBarItems";
import CustomTable from "../../../../../../../components/CustomComponents/CustomTable";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import {
  allBallotByMotionListId,
  getBallotMotionRecord,
} from "../../../../../../../api/APIs/Services/Motion.service";
import Header from "../../../../../../../components/Header";

function MMSBallotMotionList() {
  const { id } = useParams();
  const navigation = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [isChecked, setIsChecked] = useState([]);
  const pageSize = 10;
  const [motionListData, setMotionListData] = useState([]);
  const [motionListId, setMotionListid] = useState(null)
  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };
  const transfrerMotionDetail = (apiData) => {
    return apiData.map((item, index) => ({
      internalId: item.id,
      id: item.id,
      Date: item?.createdAt
        ? moment(item?.createdAt).format("YYYY/MM/DD")
        : "--",
      NameOfTheMover: item?.motionMovers
        .map((mover) => mover.members.memberName)
        .join(", "),
      ContentsOfTheMotion: item?.englishText.replace(/(<([^>]+)>)/gi, ""),
      Status: item?.motionStatuses?.statusName,
    }));
  };
  const hendleBallot = async () => {
    // const resolutionIds = {isChecked}
    const motionData = {
      motionsIds:isChecked,
      motionListId:motionListId
    }
    try {
      const response = await getBallotMotionRecord(motionData); // Add await here
      if (response?.success) {
        showSuccessMessage(response?.message);
        const jsonString = JSON.stringify(response?.data?.motions);
        const encodedJsonString = encodeURIComponent(jsonString);
        const url = `/mms/reports/motion-list/ballot/preview-pdf?state=${encodedJsonString}`;
        window.open(url, "_blank");
        const handleFocus = () => {
          getBallotMotionListByIDApi();
          window.removeEventListener("focus", handleFocus); // Remove listener after it fires
        };

        window.addEventListener("focus", handleFocus);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.error);
    }
  };

  const getBallotMotionListByIDApi = async () => {
    try {
      const response = await allBallotByMotionListId(id);
      if (response?.success) {
        const transferData = transfrerMotionDetail(response?.data[0]?.motions);
        setMotionListData(transferData);
        setMotionListid(response?.data[0]?.id)
      }
    } catch (error) {
      // Handle error
      showErrorMessage(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    getBallotMotionListByIDApi();
  }, []);
  return (
    <Layout sidebarItems={MMSSideBarItems}>
      <ToastContainer />
      <Header
        dashboardLink={"/mms/dashboard"}
        addLink1={"/mms/reports/motion-list"}
        title1={"Motion List"}
        addLink2={"/"}
        title2={"Ballot List"}
      />
      <div class="container-fluid">
        <div class="card">
          <div
            class="card-header red-bg"
            style={{ background: "#14ae5c !important" }}
          >
            <h1>Motion Detail For Ballot</h1>
          </div>
          <div class="row">
            <div class="col">
              <CustomTable
                hidebtn1={true}
                data={motionListData}
                tableTitle="Motion Detail For Ballot"
                headerShown={true}
                hideBtn={true}
                headertitlebgColor={"#666"}
                headertitletextColor={"#FFF"}
                handlePageChange={handlePageChange}
                currentPage={currentPage}
                pageSize={pageSize}
                hideEditIcon={true}
                ActionHide={true}
                isChecked={isChecked}
                setIsChecked={setIsChecked}
                isCheckbox={true}
              />
            </div>
          </div>
          <div class="row mb-2" style={{ marginRight: "20px" }}>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
              <button
                class="btn btn-primary"
                type="button"
                onClick={hendleBallot}
                disabled={isChecked.length === 0 ? true : false}
              >
                Request To Ballot
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default MMSBallotMotionList;
