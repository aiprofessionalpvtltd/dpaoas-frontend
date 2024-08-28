import React, { useEffect, useState } from "react";
import {
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
import { MMSSideBarItems } from "../../../../../../utils/sideBarItems";
import { allBallotMotionList, ChangeMotionStatus, getallMotionStatus } from "../../../../../../api/APIs/Services/Motion.service";

function AllBallotMotionList() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isChecked, setIsChecked] = useState([]);
  const [motionStatusValue, setMotionStatusValue] = useState(null);
  const [motionStatus, setMotionStatus] = useState([]);
  const pageSize = 10;
  const [motionData, setMotionData] = useState([]);
  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  const transfrerMotionBallotDetail = (apiData) => {
    return apiData.map((item, index) => ({
      internalId: item.id,
      id: item.id,
      Date: moment(item?.createdAt).format("YYYY/MM/DD"),
      NameOfTheMover: item?.motionMovers
        .map((mover) => mover.members?.memberName)
        .join(", "),
      ContentsOfTheMotion: item?.englishText.replace(/(<([^>]+)>)/gi, ""),
      Status: item?.motionStatuses?.statusName,
    }));
  };

  const getAllBallotMotionListAPi = async () => {
    try {
      const response = await allBallotMotionList(currentPage, pageSize);
      if (response?.success) {
        const transferData = transfrerMotionBallotDetail(
          response?.data?.motions
        );
        // console.log("transferData", transferData);
        setMotionData(transferData);
      }
    } catch (error) {
      // Handle error
      showErrorMessage(error?.response?.data?.message);
    }
  };
  const handleChangeStatus = () => {
    const data = {
      motionIds: isChecked,
      fkMotionStatus: motionStatusValue,
    };
    try {
      const response = ChangeMotionStatus(data);
        getAllBallotMotionListAPi();
        showSuccessMessage(response?.message);
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const getMotionStatus = async () => {
    try {
      const response = await getallMotionStatus();
      if (response?.success) {
        setMotionStatus(response?.data);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getMotionStatus();
  }, []);

  useEffect(() => {
    getAllBallotMotionListAPi();
  }, []);
  return (
    <Layout sidebarItems={MMSSideBarItems}>
      <ToastContainer />
      <div class="container-fluid">
        <div class="card">
          <div
            class="card-header red-bg"
            style={{ background: "#14ae5c !important" }}
          >
            <h1>Ballot Motion List</h1>
          </div>
          <div class="row">
            <div class="col">
              <CustomTable
                hidebtn1={true}
                data={motionData}
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
                <label class="form-label">Motion Status</label>
                <select
                  class="form-select"
                  onChange={(e) => setMotionStatusValue(e.target.value)}
                >
                  <option value={""} selected>
                    Select
                  </option>
                  {motionStatus &&
                    motionStatus.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item?.statusName}
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

export default AllBallotMotionList;
