import React, { useState, useCallback, useEffect } from "react";
import { Layout } from "../../../../../../../components/Layout";
import {
  TMSsidebarItems,
  TMSsidebarItemsDirector,
} from "../../../../../../../utils/sideBarItems";
import CustomTable from "../../../../../../../components/CustomComponents/CustomTable";
import moment from "moment";
import { getUserData } from "../../../../../../../api/Auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  getResolutionBYID,
  getResolutionRemarksByUserId,
} from "../../../../../../../api/APIs/Services/Resolution.service";
import { showErrorMessage, showSuccessMessage } from "../../../../../../../utils/ToastAlert";

const TMSGOVRecivedFromNA = () => {
  const [resData, setResData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(null);
  const userData = getUserData();
  const pageSize = 10;
  const navigate = useNavigate();
  const transformLeavesData = (apiData) => {
    return apiData.map((leave) => {
      const subjectMatter = [leave?.englishText, leave?.urduText]
        .filter(Boolean)
        .join(", ");
      const cleanedSubjectMatter = subjectMatter.replace(/(<([^>]+)>)/gi, "");
      return {
        SrNo: leave.id,
        memberName:
          leave?.resolutionMoversAssociation[0]?.memberAssociation?.member,
        SessionNumber: leave?.session?.sessionName
          ? leave?.session?.sessionName
          : "",
        ResolutionType: leave?.resolutionType ? leave?.resolutionType : "",
        SubjectMatter: cleanedSubjectMatter ? cleanedSubjectMatter : "",
        NoticeNo: leave?.noticeDiary?.noticeOfficeDiaryNo
          ? leave?.noticeDiary?.noticeOfficeDiaryNo
          : "",
        ResolutionStatus: leave?.resolutionStatus?.resolutionStatus
          ? leave?.resolutionStatus?.resolutionStatus
          : "",
        Status: leave?.resolutionActive ? leave?.resolutionActive : "",
        device: leave?.device,
        createdBy:
          leave?.resolutionSentStatus === "toResolution"
            ? "Notice Office"
            : "---",
      };
    });
  };

  const getAllAssignedResolutions = useCallback(async () => {
    const userId = userData?.fkUserId;
    const category = "Resolution";
    try {
      const response = await getResolutionRemarksByUserId(
        userId,
        category,
        currentPage,
        pageSize
      );
      if (response?.success) {
        const transformedData = transformLeavesData(response?.data);
        setCount(response?.data?.count);
        setResData(transformedData);
        showSuccessMessage(response?.message);
      }
    } catch (error) {
      console.log(error);
    }
  }, [currentPage, pageSize, setCount, setResData]);

  useEffect(() => {
    getAllAssignedResolutions();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // HandleEdit
  const handleEdit = async (id) => {
    try {
      const response = await getResolutionBYID(id);
      if (response?.success) {
        navigate("/tms/resolution/resolution-translation", {
          state: response?.data,
        });
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  };

  return (
    <Layout
      sidebarItems={
        userData?.designation?.designationName === "Assistant Director"
          ? TMSsidebarItemsDirector
          : TMSsidebarItems
      }
      module={true}
      centerlogohide={true}
    >
      <ToastContainer />
      <div>
        <div class="container-fluid">
          <div class="row">
            <div class="d-grid gap-2 d-md-flex justify-content-md-start">
              <button class="btn btn-primary mb-3" type="button" onClick={() => navigate("/tms/legislation/government-bill-translation/introduce-in-senate")}>
                Introduce In Senate
              </button>
              <button class="btn btn-primary mb-3" type="button" onClick={() => navigate("/tms/legislation/government-bill-translation/recived-from-na")}>
                Recieved From NA
              </button>
            </div>
          </div>
          <div class="card mt-1">
            <div
              class="card-header red-bg"
              style={{ background: "#14ae5c !important" }}
            >
              <h1>Recived From NA List</h1>
            </div>

            <div class="card-body">
              <div class="container-fluid">
                <div
                  class="dash-detail-container"
                  style={{ marginTop: "20px" }}
                >
                  <CustomTable
                    hideBtn={true}
                    hidebtn1={true}
                    data={resData}
                    tableTitle="Recived Recived From NA"
                    handlePageChange={handlePageChange}
                    currentPage={currentPage}
                    totalCount={count}
                    pageSize={pageSize}
                    headertitlebgColor={"#666"}
                    headertitletextColor={"#FFF"}
                    showPrint={false}
                    hideEditIcon={false}
                    hideDeleteIcon={true}
                    // handleAdd={(item) => navigate("/")}
                    handleEdit={(item) => handleEdit(item?.SrNo)}
                  />
                </div>
                <div
                  class="dash-detail-container"
                  style={{ marginTop: "20px" }}
                >
                  <CustomTable
                    hideBtn={true}
                    hidebtn1={true}
                    data={resData}
                    tableTitle="Assiged Recived From NA"
                    handlePageChange={handlePageChange}
                    currentPage={currentPage}
                    totalCount={count}
                    pageSize={pageSize}
                    headertitlebgColor={"#666"}
                    headertitletextColor={"#FFF"}
                    showPrint={false}
                    hideEditIcon={false}
                    hideDeleteIcon={true}
                    // handleAdd={(item) => navigate("/")}
                    handleEdit={(item) => handleEdit(item?.SrNo)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TMSGOVRecivedFromNA;
