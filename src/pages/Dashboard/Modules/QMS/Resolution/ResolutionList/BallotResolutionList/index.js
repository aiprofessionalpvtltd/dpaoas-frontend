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
  allballotResolutionTemplate,
  getBallotRecord,
} from "../../../../../../../api/APIs/Services/Resolution.service";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";

function QMSBallotResolutionList() {
  const { id } = useParams();
  const navigation = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [isChecked, setIsChecked] = useState([]);
  const [selectedCount, setSelectedCount] = useState(5); // Default to 5
  const pageSize = 10;
  const [resolutionData, setResolutionData] = useState([]);
  const [templateData, setTemplateData] = useState([]);
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
      ContentsOfTheMotion: item?.englishText.replace(/(<([^>]+)>)/gi, "").replace(/&nbsp;/gi, " ")
      .replace(/\s+/g, " "),
      Status: item?.resolutionStatus?.resolutionStatus,
    }));
  };

  //Template Transfer 
  const transferTemplateDetail = (apiData) => {
    return apiData.map((item) => ({
      id: item?.id,
      UserName:item?.templateUserName,
      UserRole:item?.templateUserRole,
      templateDescription: item?.templateDescription?.replace(/(<([^>]+)>)/gi, "").replace(/&nbsp;/gi, " ")
      .replace(/\s+/g, " "),
    }));
  };

   // Function to select random elements from an array
   function getRandomIds(arr, count) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

const handleCheckboxChange = (count) => {
  setSelectedCount(count);
};

  const hendleBallot = async () => {
     // Get random IDs based on selected count
     const randomIds = getRandomIds(isChecked, selectedCount);
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

  const handleTemplate = async () => {
    try {
      const response = await allballotResolutionTemplate();
      if (response?.success) {
        const trensferData = transferTemplateDetail(response?.data?.templates);
        setTemplateData(trensferData);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  }
  useEffect(() => {
    getBallotResolutionsListByIDApi();
    handleTemplate()
  }, []);
  return (
    <Layout sidebarItems={QMSSideBarItems}>
      <ToastContainer />
      <div class="row mb-2">
        <div class="col">
          <CustomTable
            singleDataCard={true}
            hidebtn1={true}
            data={templateData}
            tableTitle="Ballot Template"
            // headerShown={true}
            hideBtn={true}
            headertitlebgColor={"#666"}
            headertitletextColor={"#FFF"}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            pageSize={pageSize}
            hideDeleteIcon={true}
            handleEdit={(item) =>
              navigation("/qms/rsolution/list/ballot/template/edit", {
                state: { id: item.id },
              })
            }
          />
        </div>
      </div>
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
                showcompletTex={true}
              />
            </div>
          </div>
          <div className="row mb-2" style={{ margin: "20px", backgroundColor:"#D3D3D3", alignItems:"center" }}>
            <div class="col">
              <div class="mb-3">
                <div class="form-check" style={{ marginTop: "20px" }}>
                  <input
                    class={`form-check-input`}
                    type="checkbox"
                    id="flexCheckDefault1"
                    checked={selectedCount === 1}
                    onChange={() => handleCheckboxChange(1)}
                  />
                  <label
                    class="form-check-label"
                    for="flexCheckDefault1"
                    style={{ color: "black" }}
                  >
                    Select 1 Resolution
                  </label>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="mb-3">
                <div class="form-check" style={{ marginTop: "20px" }}>
                  <input
                    class={`form-check-input`}
                    type="checkbox"
                    id="flexCheckDefault3"
                    checked={selectedCount === 3}
                    onChange={() => handleCheckboxChange(3)}
                  />
                  <label
                    class="form-check-label"
                    for="flexCheckDefault3"
                    style={{ color: "black" }}
                  >
                    Select 3 Resolution
                  </label>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="mb-3">
                <div class="form-check" style={{ marginTop: "20px" }}>
                  <input
                    class={`form-check-input`}
                    type="checkbox"
                    id="flexCheckDefault5"
                    checked={selectedCount === 5}
                    onChange={() => handleCheckboxChange(5)}
                  />
                  <label
                    class="form-check-label"
                    for="flexCheckDefault5"
                    style={{ color: "black" }}
                  >
                    Select 5 Resolution
                  </label>
                </div>
              </div>
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
