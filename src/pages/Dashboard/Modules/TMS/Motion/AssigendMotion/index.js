import React, { useState, useCallback, useEffect } from "react";
import { Layout } from "../../../../../../components/Layout";
import {
  TMSsidebarItems,
  TMSsidebarItemsDirector,
} from "../../../../../../utils/sideBarItems";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import {
  getAllQuestion,
  getAllQuestionByID,
} from "../../../../../../api/APIs/Services/Question.service";
import moment from "moment";
import { getUserData } from "../../../../../../api/Auth";
import {
  getAllRemarks,
  getAssignedMotion,
} from "../../../../../../api/APIs/Services/translation.service";
import { useNavigate } from "react-router-dom";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";
import { getMotionByID } from "../../../../../../api/APIs/Services/Motion.service";
import { ToastContainer } from "react-toastify";

const AssignedMotion = () => {
  const [resData, setResData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(null);
  const userData = getUserData();
  const pageSize = 10;
  const navigate = useNavigate();

  const transformMotionData = (apiData) => {
    return apiData.map((res, index) => {
      const english = [res?.englishText].filter(Boolean).join(", ");
      const EnglishText = english.replace(/(<([^>]+)>)/gi, "");

      const urdu = [res?.urduText].filter(Boolean).join(", ");
      const UrduText = urdu.replace(/(<([^>]+)>)/gi, "");

      return {
        id: res?.id,
        // memberName: res?.motionMovers[0]?.members?.memberName,
        SessionName: res?.sessions?.sessionName
          ? res?.sessions?.sessionName
          : "",
        motionType: res?.motionType ? res?.motionType : "",
        noticeOfficeDiaryNo: res?.noticeOfficeDairies?.noticeOfficeDiaryNo
          ? res?.noticeOfficeDairies?.noticeOfficeDiaryNo
          : "",
        noticeOfficeDiaryDate: res?.noticeOfficeDairies?.noticeOfficeDiaryDate
          ? moment(res?.noticeOfficeDairies?.noticeOfficeDiaryDate).format(
              "DD-MM-YYYY"
            )
          : "",
        noticeOfficeDiaryTime: res?.noticeOfficeDairies?.noticeOfficeDiaryTime
          ? moment(
              res?.noticeOfficeDairies?.noticeOfficeDiaryTime,
              "hh:ss A"
            ).format("hh:ss A")
          : "",
        englishText: EnglishText ? EnglishText : "",
        urduText: UrduText ? UrduText : "",
        motionStatus: res?.motionStatuses?.statusName,
        memberPosition: res?.memberPosition,
        device: res?.device,
        createdBy:
          res?.motionSentStatus === "toMotion"
            ? "From Notice Office"
            : res?.motionSentStatus === "inMotion"
              ? "Motion Branch"
              : "---",
      };
    });
  };

  const getAllAssignedMotion = useCallback(async () => {
    const userId = userData?.fkUserId;
    const category = "Motion";
    try {
      const response = await getAssignedMotion(
        userId,
        category,
        currentPage,
        pageSize
      );
      console.log("response assif", response);
      if (response?.success) {
        const transformedData = transformMotionData(response?.data);
        setCount(response?.data?.count);
        setResData(transformedData);
        showSuccessMessage(response?.message);
      }
    } catch (error) {
      console.log(error);
      showErrorMessage(error.response?.data?.message);
    }
  }, [currentPage, pageSize, setCount, setResData]);

  useEffect(() => {
    getAllAssignedMotion();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  //  const handleEdit = async (id) => {
  //   navigate("/tms/question/questionTranslation", {
  //       state: {id  },
  //     });
  //   }

  const handleEdit = async (id) => {
    try {
      // const { question, history } = await getMotionByID(id);
      const response = await getMotionByID(id);

      if (response?.success) {
        navigate("/tms/motion/motion-translation", { state: response?.data });
        //   navigate("/notice/question/detail", {
        //     state: { question: question?.data, history: history?.data },
        //   });
      }
    } catch (error) {
      showErrorMessage(error.response?.data?.message);
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
          <div class="card mt-1">
            <div
              class="card-header red-bg"
              style={{ background: "#14ae5c !important" }}
            >
              <h1>Assigned Motion List</h1>
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
                    tableTitle="Motions"
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
                    handleEdit={(item) => handleEdit(item?.id)}
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

export default AssignedMotion;
