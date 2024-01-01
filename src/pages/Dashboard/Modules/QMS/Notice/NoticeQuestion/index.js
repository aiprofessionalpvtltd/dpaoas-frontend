import React, { useEffect, useState } from "react";
import { Layout } from "../../../../../../components/Layout";
import { QMSSideBarItems } from "../../../../../../utils/sideBarItems";
import Header from "../../../../../../components/Header";
import {
  RevivedQuestionsBYID,
  allRevivedQuestions,
  getAllQuestion,
} from "../../../../../../api/APIs";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";
import { ToastContainer } from "react-bootstrap";
import { useNavigate } from "react-router";
import moment from "moment";

function QMSNoticeQuestion() {
  const navigate = useNavigate();
  const [resData, setResData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [revivedData, setRivivedData] = useState([]);
  const [count, setCount] = useState(null);
  const pageSize = 10;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const transformLeavesData = (apiData) => {
    return apiData.map((res, index) => {
      return {
        SrNo: index,
        QID: res.id,
        QDN: res.fkQuestionDiaryId,
        NoticeDate: moment(res?.noticeOfficeDiary?.noticeOfficeDiaryDate).format("YYYY/MM/DD"),
        NoticeTime: res?.noticeOfficeDiary?.noticeOfficeDiaryTime,
        SessionNumber: res?.session?.sessionName,
        SubjectMatter: [res?.englishText, res?.urduText]
          .filter(Boolean)
          .join(", "),
        Category: res.questionCategory,
        // SubmittedBy: res.category,
        Status: res.questionStatus?.questionStatus,
      };
    });
  };

  const getAllQuestionsApi = async () => {
    try {
      const response = await getAllQuestion(currentPage, pageSize);
      if (response?.success) {
        // showSuccessMessage(response?.message);
        setCount(response?.count);
        const transformedData = transformLeavesData(response.data);
        // console.log("Saqib", transformedData);
        setResData(transformedData);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const getallRevivedQuestionsAPI = async () => {
    try {
      const response = await allRevivedQuestions();
      if (response?.success) {
        // showSuccessMessage(response?.message);
        setRivivedData(response?.data);
        console.log("sdasd", response?.data);
        // setCount(response?.count);
        // const transformedData = transformLeavesData(response.data);
        // console.log("Saqib", transformedData);
        // setResHistory(transformedData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const hendleViewDetail = async (id) => {
    try {
      const response = await RevivedQuestionsBYID(id);
      if (response?.success) {
        navigate("/qms/notice/notice-question-detail", {
          state: response?.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllQuestionsApi();
    getallRevivedQuestionsAPI();
  }, []);

  return (
    <Layout module={true} sidebarItems={QMSSideBarItems} centerlogohide={true}>
      <ToastContainer />
      <Header
        dashboardLink={"/"}
        addLink1={"/qms/dashboard"}
        title1={"Question"}
        addLink2={"/qms/notice/notice-question"}
        title2={"Notice Question"}
      />
      <div class="container-fluid">
        <div class="card mt-4">
          <div
            class="card-header red-bg"
            style={{ background: "#14ae5c !important" }}
          >
            <h1>Question Received from Notice Office</h1>
          </div>
          <div class="card-body">
            <div class="container-fluid">
              <CustomTable
                hideBtn={true}
                data={resData}
                headerShown={true}
                handlePageChange={handlePageChange}
                currentPage={currentPage}
                pageSize={pageSize}
                hideEditIcon={true}
                totalCount={count}
                ActionHide={false}
                headertitlebgColor={"#666"}
                headertitletextColor={"#FFF"}
              />
              <h3 class="mt-3">Revived Questions</h3>
              <div class="dash-detail-container" style={{ marginTop: "20px" }}>
                <table class="table red-bg-head th">
                  <thead>
                    <tr>
                      <th class="text-center" scope="col">
                        Sr#
                      </th>
                      <th class="text-center" scope="col">
                        Notice Diary Number
                      </th>
                      <th class="text-center" scope="col">
                        Session Number
                      </th>
                      <th class="text-center" scope="col">
                        Subject Matter
                      </th>
                      <th class="text-center" scope="col">
                        Notice Date
                      </th>
                      <th class="text-center" scope="col">
                        Notice Time
                      </th>
                      <th class="text-center" scope="col">
                        Category
                      </th>
                      <th class="text-center" scope="col">
                        Submitted By
                      </th>
                      <th class="text-center" scope="col">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {revivedData && revivedData.map((item, index) => (
                      <tr key={index}>
                        <td class="text-center">{`${index + 1}`}</td>
                        <td class="text-center">{item?.noticeOfficeDiary?.noticeOfficeDiaryNo}</td>
                        <td class="text-center">{item?.ToSession?.sessionName}</td>
                        <td class="text-center">{`${item?.question?.englishText} ${item?.question?.urduText}`}</td>
                        <td class="text-center">{moment(item?.noticeOfficeDiary?.noticeOfficeDiaryDate).format("YYYY/MM/DD")}</td>
                        <td class="text-center">{item?.noticeOfficeDiary?.noticeOfficeDiaryTime}</td>
                        <td class="text-center">{item?.question?.questionCategory}</td>
                        <td class="text-center">
                          {item?.question?.member?.memberName}
                        </td>
                        <td class="text-center">
                          <button class="btn btn-primary" type="button" onClick={() => hendleViewDetail(item?.id)}>
                            View Review
                          </button>
                        </td>
                      </tr>
                    ))}

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default QMSNoticeQuestion;
