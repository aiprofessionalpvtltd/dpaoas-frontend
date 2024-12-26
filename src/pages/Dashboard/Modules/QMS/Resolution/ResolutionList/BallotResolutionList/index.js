import React, { useEffect, useState } from "react";
import { Layout } from "../../../../../../../components/Layout";
import { QMSSideBarItems } from "../../../../../../../utils/sideBarItems";
import CustomTable from "../../../../../../../components/CustomComponents/CustomTable";
import LZString from "lz-string";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";
import {
  allBallotByResolutionListId,
  getBallotRecord,
} from "../../../../../../../api/APIs/Services/Resolution.service";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";

function QMSBallotResolutionList() {
  const { id } = useParams();
  const navigation = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [isChecked, setIsChecked] = useState([]);
  const pageSize = 10;
  const [resolutionData, setResolutionData] = useState([]);
  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };
  const transfrerResolutionDetail = (apiData) => {
    return apiData.map((item, index) => ({
      internalId: item.id,
      id: item.id,
      Date: moment(item?.createdAt).format("YYYY/MM/DD"),
      NameOfTheMover: item?.memberNames
        .map((mover) => mover.memberName)
        .join(", "),
      ContentsOfTheMotion: item?.englishText.replace(/(<([^>]+)>)/gi, ""),
      Status: item?.resolutionStatus?.resolutionStatus,
    }));
  };

   // Function to select random elements from an array
   function getRandomIds(arr, count) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

  const hendleBallot = async () => {
     // Get 5 random IDs
     const randomIds = getRandomIds(isChecked, 5);
    try {
      const response = await getBallotRecord(randomIds); // Add await here
      if (response?.success) {
        showSuccessMessage(response?.message);
        const pdfData = JSON.stringify(response?.data?.resolutions);
        const compressedData = LZString.compressToEncodedURIComponent(
            pdfData
            );
        const url = `/qms/rsolution/list/ballot/preview-pdf?state=${compressedData}`;
        window.open(url, "_blank");

        const handleFocus = () => {
          getBallotResolutionsListByIDApi();
          window.removeEventListener("focus", handleFocus); // Remove listener after it fires
        };

        window.addEventListener("focus", handleFocus);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.error);
    }
  };

  const getBallotResolutionsListByIDApi = async () => {
    try {
      const response = await allBallotByResolutionListId(id);
      if (response?.success) {
        const transferData = transfrerResolutionDetail(
          response?.data[0]?.resolutions
        );
        console.log("transferData", transferData);
        setResolutionData(transferData);
        const ids = transferData.map(item => item.id);
        setIsChecked(ids)
      }
    } catch (error) {
      // Handle error
      showErrorMessage(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    getBallotResolutionsListByIDApi();
  }, []);
  return (
    <Layout sidebarItems={QMSSideBarItems}>
      <ToastContainer />
      <div class="container-fluid">
        <div class="card">
          <div
            class="card-header red-bg"
            style={{ background: "#14ae5c !important" }}
          >
            <h1>Resolution Detail For Ballot</h1>
          </div>
          <div class="row">
            <div class="col">
              <CustomTable
                hidebtn1={true}
                data={resolutionData}
                tableTitle="Resolution Detail For Ballot"
                headerShown={true}
                hideBtn={true}
                headertitlebgColor={"#666"}
                headertitletextColor={"#FFF"}
                handlePageChange={handlePageChange}
                currentPage={currentPage}
                pageSize={pageSize}
                hideEditIcon={true}
                ActionHide={true}
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

export default QMSBallotResolutionList;
