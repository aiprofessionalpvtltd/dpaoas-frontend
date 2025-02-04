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
import { getAllRemarks } from "../../../../../../api/APIs/Services/translation.service";
import { useNavigate } from "react-router-dom";
import { showErrorMessage } from "../../../../../../utils/ToastAlert";

const AssignedQuestion = () => {
  const [resData, setResData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(null);
  const userData = getUserData();
  const pageSize = 10;
  const navigate = useNavigate();
  const transformLeavesData = (apiData) => {
    console.log("apiData", apiData);
    return apiData.map((res, index) => {
      console.log("resfcccfc", res);
      const subjectMatter = [res?.englishText, res?.urduText]
        .filter(Boolean)
        .join(", ");
      const cleanedSubjectMatter = subjectMatter.replace(/(<([^>]+)>)/gi, "");

      return {
        // SrNo: index + 1,
        Id: res?.id,
        MemberName: res?.member ? res?.member?.memberName : "--",
        noticeOfficeDiaryNumber: res?.noticeOfficeDiary?.noticeOfficeDiaryNo
          ? res?.noticeOfficeDiary?.noticeOfficeDiaryNo
          : "",
        NoticeDate: res?.noticeOfficeDiary?.noticeOfficeDiaryDate
          ? moment(res?.noticeOfficeDiary?.noticeOfficeDiaryDate).format(
              "DD-MM-YYYY"
            )
          : "",
        NoticeTime: res?.noticeOfficeDiary?.noticeOfficeDiaryTime
          ? moment(
              res?.noticeOfficeDiary?.noticeOfficeDiaryTime,
              "hh:mm A"
            ).format("hh:mm A")
          : "",
        SessionNumber: res?.session?.sessionName
          ? res?.session?.sessionName
          : "",
        SubjectMatter: cleanedSubjectMatter ? cleanedSubjectMatter : "",
        Category: res.questionCategory ? res.questionCategory : "",
        Status: res.questionStatus?.questionStatus
          ? res.questionStatus?.questionStatus
          : "",
        device: res?.device,
        createdBy:
          res?.questionSentStatus === "toQuestion" ? "Notice Office" : "---",
      };
    });
  };

  const getAllAssignedQuestions = useCallback(async () => {
    const userId = userData?.fkUserId;
    const category = "Question";
    try {
      const response = await getAllRemarks(
        userId,
        category,
        currentPage,
        pageSize
      );
      if (response?.success) {
        console.log(response);
        const transformedData = transformLeavesData(response?.data);
        console.log("transform data", transformedData);
        setCount(response?.data?.count);
        setResData(transformedData);
      }
    } catch (error) {
      console.log(error);
    }
  }, [currentPage, pageSize, setCount, setResData]);

  useEffect(() => {
    getAllAssignedQuestions();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  //  const handleEdit = async (id) => {
  //   navigate("/tms/question/questionTranslation", {
  //       state: {id  },
  //     });
  //   }

  // HandleEdit
  const handleEdit = async (id) => {
    try {
      const { question, history } = await getAllQuestionByID(id);

      if (question?.success) {
        navigate("/tms/question/questionTranslation", {
          state: { question: question?.data, history: history?.data, qId: id },
        });
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
      <div>
        <div class="container-fluid">
          <div class="card mt-1">
            <div
              class="card-header red-bg"
              style={{ background: "#14ae5c !important" }}
            >
              <h1>Assigned Questions List</h1>
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
                    tableTitle="Questions"
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
                    handleEdit={(item) => handleEdit(item?.Id)}
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

export default AssignedQuestion;
