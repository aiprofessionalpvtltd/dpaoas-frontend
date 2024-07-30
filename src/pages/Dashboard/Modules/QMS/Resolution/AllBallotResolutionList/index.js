import React, { useContext, useEffect, useState } from "react";
import {
  allBallotResolution,
  changeResolutionStatus,
} from "../../../../../../api/APIs/Services/Resolution.service";
import moment from "moment";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";
import { Layout } from "../../../../../../components/Layout";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import { QMSSideBarItems } from "../../../../../../utils/sideBarItems";
import { AuthContext } from "../../../../../../api/AuthContext";

function AllBallotResolutionList() {
  const { resolutionStatus } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(0);
  const [isChecked, setIsChecked] = useState([]);
  const [resolutionStatusselect, setResolutionStatusSelect] = useState(null);
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
      NameOfTheMover: item?.resolutionMoversAssociation
        .map((mover) => mover.memberAssociation?.memberName)
        .join(", "),
      ContentsOfTheMotion: item?.englishText.replace(/(<([^>]+)>)/gi, ""),
      Status: item?.resolutionStatus?.resolutionStatus,
    }));
  };

  const getAllBallotResolutionListAPi = async () => {
    try {
      const response = await allBallotResolution(currentPage, pageSize);
      if (response?.success) {
        const transferData = transfrerResolutionDetail(
          response?.data?.resolution
        );
        // console.log("transferData", transferData);
        setResolutionData(transferData);
      }
    } catch (error) {
      // Handle error
      showErrorMessage(error?.response?.data?.message);
    }
  };
  const handleChangeStatus = () => {
    const data = {
      resolutionIds: isChecked,
      fkResolutionStatus: resolutionStatusselect,
    };
    try {
      const response = changeResolutionStatus(data);
      // if (response?.success) {
        getAllBallotResolutionListAPi();
        // showSuccessMessage(response?.message?.message);
      // }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    getAllBallotResolutionListAPi();
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
            <h1>Ballot Resolution List</h1>
          </div>
          <div class="row">
            <div class="col">
              <CustomTable
                hidebtn1={true}
                data={resolutionData}
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
          <div class="row mt-4">
            <div class="col-4">
              <div class="mb-3">
                <label class="form-label">Question Status</label>
                <select
                  class="form-select"
                  onChange={(e) => setResolutionStatusSelect(e.target.value)}
                >
                  <option value={""} selected>
                    Select
                  </option>
                  {resolutionStatus &&
                    resolutionStatus.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item?.resolutionStatus}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div class="col-4">
              <button
                style={{ marginTop: "30px" }}
                class="btn btn-primary"
                onClick={handleChangeStatus}
              >
                Change Status
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AllBallotResolutionList;
