import React, { useEffect, useState } from "react";
import { QMSSideBarItems } from "../../../../utils/sideBarItems";
import { Layout } from "../../../../components/Layout";
import Header from "../../../../components/Header";
import { useNavigate } from "react-router-dom";
import NoticeStatsCard from "../../../../components/CustomComponents/NoticeStatsCard";
import { faClipboardQuestion, faRectangleList } from "@fortawesome/free-solid-svg-icons";
import { resolutionStatusCount } from "../../../../api/APIs/Services/Resolution.service";
import { allquestionsByStatus } from "../../../../api/APIs/Services/Question.service";

function QMSQuestionDashboard() {
  const navigate = useNavigate()
  const[routResolutionData, setRoutResolutionData]=useState({
    inResolutionData:[],
    toResolutionData:[]
  })
  const [resolutionCount, setResolutionCount] = useState({
    toResolutionCount:0,
    inResolutionCount:0
  })
  const [questionCount, setQuestionCount] = useState({
    toQuestionCount:0,
    inQuestionCount:0
  })
  const[routQuestionData, setRoutQUestionData]=useState({
    inQuestionData:[],
    toQuestionData:[]
  })

  const ResolutionCountAPi = async () => {
    try {
      const response = await resolutionStatusCount();
      if (response?.success) {
        setResolutionCount({
          toResolutionCount: response?.data?.counts?.toResolution || 0,
          inResolutionCount: response?.data?.counts?.inResolution || 0
      });
      setRoutResolutionData({
        toResolutionData: response?.data?.toResolutionResolutions || [],
        inResolutionData: response?.data?.inResolutionResolutions || []
    })
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const QuestionCountAPi = async () => {
    try {
      const response = await allquestionsByStatus();
      if (response?.success) {
        setQuestionCount({
          toQuestionCount: response?.data?.counts?.toQuestion || 0,
          inQuestionCount: response?.data?.counts?.inQuestion || 0
      });
      setRoutQUestionData({
        toQuestionData: response?.data?.toQuestionQuestions || [],
        inQuestionData: response?.data?.inQuestionQuestions || []
    })
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  useEffect(() => {
    QuestionCountAPi()
    ResolutionCountAPi()
  },[])
  return (
    <Layout module={true} sidebarItems={QMSSideBarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/"}
      />
       <div style={{ marginLeft: 15 }}>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            marginBottom: "10px",
            color: "#fb6340",
          }}
        >
          Form Notice Office Branch
        </h2>
        <div class="row">
          <div class="col">
            <div class="mt-2 mb-4">
              <div class="row">
                <NoticeStatsCard
                  title={"Questions"}
                  icon={faClipboardQuestion}
                  overall={true}
                  iconBgColor={"#FFA500"}
                  total={questionCount?.toQuestionCount}
                  onClick={() => navigate("/qms/notice/notice-question")}
                />
                <NoticeStatsCard
                  title={"Resolutions"}
                  icon={faRectangleList}
                  overall={true}
                  iconBgColor={"#007bff"}
                  total={resolutionCount?.toResolutionCount}
                  onClick={() => navigate("/qms/notice/notice-resolution")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginLeft: 15 }}>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            marginBottom: "10px",
            color: "#fb6340",
          }}
        >
          Question Branch
        </h2>
        <div class="row">
          <div class="col">
            <div class="mt-2 mb-4">
              <div class="row">
                <NoticeStatsCard
                  title={"Questions"}
                  icon={faClipboardQuestion}
                  overall={true}
                  iconBgColor={"#FFA500"}
                  total={questionCount?.inQuestionCount}
                  onClick={() => navigate("/qms/search/question",{state:routQuestionData?.inQuestionData})}
                />
                <NoticeStatsCard
                  title={"Resolutions"}
                  icon={faRectangleList}
                  overall={true}
                  iconBgColor={"#007bff"}
                  total={resolutionCount?.inResolutionCount}
                  onClick={() => navigate("/qms/search/resolution",{state:routResolutionData?.inResolutionData})}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default QMSQuestionDashboard;
