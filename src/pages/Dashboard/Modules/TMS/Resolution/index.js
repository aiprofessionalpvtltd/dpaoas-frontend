import React, { useEffect, useState } from "react";
import { Layout } from "../../../../../components/Layout";
import Header from "../../../../../components/Header";
import {
  RevivedQuestionsBYID,
  allRevivedQuestions,
  getAllQuestion,
} from "../../../../../api/APIs";
import CustomTable from "../../../../../components/CustomComponents/CustomTable";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../utils/ToastAlert";
import { ToastContainer } from "react-bootstrap";
import { useNavigate } from "react-router";
import moment from "moment";
import { TMSsidebarItems } from "../../../../../utils/sideBarItems";

function TMSResolution() {
  const navigate = useNavigate();
  const [resData, setResData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [revivedData, setRivivedData] = useState([]);
  const [count, setCount] = useState(null);
  const pageSize = 10;

  const data = [
    {
      id: 1,
      name: "Saqib Khan",
      leaveType: "Sick",
      startDate: "11/02/2023",
      endDate: "11/02/2023",
      totalDays: "30",
      reason: "Feeling Not Good",
      leaveStatus: "Approved",
      submittedTo: "Mohsin",
    },
    {
      id: 2,
      name: "Mohsin Khan",
      leaveType: "Sick",
      startDate: "11/02/2023",
      endDate: "11/02/2023",
      totalDays: "30",
      reason: "Feeling Not Good",
      leaveStatus: "Approved",
      submittedTo: "Mohsin",
    },
    {
      id: 3,
      name: "Saqib Khan",
      leaveType: "Sick",
      startDate: "11/02/2023",
      endDate: "11/02/2023",
      totalDays: "30",
      reason: "Feeling Not Good",
      leaveStatus: "Approved",
      submittedTo: "Mohsin",
    },
    {
      id: 4,
      name: "Hamid Khan",
      leaveType: "Sick",
      startDate: "11/02/2023",
      endDate: "11/02/2023",
      totalDays: "30",
      reason: "Feeling Not Good",
      leaveStatus: "Approved",
      submittedTo: "Mohsin",
    },
  ];

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
    <Layout module={true} sidebarItems={TMSsidebarItems} centerlogohide={true}>
      <ToastContainer />
      <Header
        dashboardLink={"/tms/dashboard"}
        title1={"Resolution"}
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
                data={data}
                headerShown={true}
                handlePageChange={handlePageChange}
                currentPage={currentPage}
                pageSize={pageSize}
                // totalCount={count}
                ActionHide={false}
                headertitlebgColor={"#666"}
                headertitletextColor={"#FFF"}
              />
            </div>
          </div>
        </div>

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
                data={data}
                headerShown={true}
                handlePageChange={handlePageChange}
                currentPage={currentPage}
                pageSize={pageSize}
                // totalCount={count}
                ActionHide={false}
                headertitlebgColor={"#666"}
                headertitletextColor={"#FFF"}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default TMSResolution;
