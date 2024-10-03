import React, { useEffect, useState } from "react";
import { Layout } from "../../../../components/Layout";
import { TMSsidebarItems } from "../../../../utils/sideBarItems";
import StatsCard from "../../../../components/CustomComponents/StatsCard";
import { useNavigate } from "react-router-dom";
import { allquestionsByStatus } from "../../../../api/APIs/Services/Question.service";
import { resolutionStatusCount } from "../../../../api/APIs/Services/Resolution.service";
import NoticeStatsCard from "../../../../components/CustomComponents/NoticeStatsCard";
import { faClipboardQuestion, faFileImport, faHandshake } from "@fortawesome/free-solid-svg-icons";

function TMSDashboard() {
  const navigate = useNavigate()
  const [resolutionCount, setResolutionCount] = useState({
    toResolutionCount:0,
    inResolutionCount:0
  })
  const [questionCount, setQuestionCount] = useState({
    toQuestionCount:0,
    inQuestionCount:0
  })

  const ResolutionCountAPi = async () => {
    try {
      const response = await resolutionStatusCount();
      if (response?.success) {
        setResolutionCount({
          toResolutionCount: response?.data?.counts?.toResolution || 0,
          inResolutionCount: response?.data?.counts?.inResolution || 0
      });
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
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
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    QuestionCountAPi()
    ResolutionCountAPi()
  },[])

  return (
    <Layout module={true} sidebarItems={TMSsidebarItems} centerlogohide={true}>
      <div class="row">
      <div style={{ marginLeft: 15 }}>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            marginBottom: "10px",
            color: "#fb6340",
          }}
        >
          Overall Stats
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
                  title={"Motions"}
                  icon={faFileImport}
                  overall={true}
                  iconBgColor={"#007bff"}
                  total={20}
                  onClick={() => navigate("/notice/motion/sent")}
                />
                <NoticeStatsCard
                  title={"Resolutions"}
                  icon={faHandshake}
                  overall={true}
                  iconBgColor={"#2dce89"}
                  total={resolutionCount?.toResolutionCount}
                  onClick={() => navigate("/qms/notice/notice-resolution")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
        {/* <div class="col-md-12">
          <div class="mt-5 mb-4">
            <div class="row">
              <StatsCard
                name={"Question"}
                freshVal={10}
                InprogressVal={35}
                completedVal={25}
                handleClick={() => navigate("/tms/dashboard/detail", { state: categories[0].Question })}
              />
              <StatsCard name={"Motion"} freshVal={20} InprogressVal={15} completedVal={13} />
              <StatsCard name={"Resolution"} freshVal={30} InprogressVal={25} completedVal={18} />
            </div>
            <div className="mt-4">
              <div className="row">
                <StatsCard
                  name={"Legislation"}
                  freshVal={40}
                  InprogressVal={13}
                  completedVal={10}
                  subCat={true}
                  handleClick={() => navigate("/tms/dashboard/detail", { state: categories[0].Legislation })}
                />
                <StatsCard
                  name={"Research Branch"}
                  freshVal={50}
                  InprogressVal={45}
                  completedVal={50}
                  subCat={true}
                  handleClick={() => navigate("/tms/dashboard/detail", { state: categories[0].RB })}
                />
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </Layout>
  );
}

export default TMSDashboard;
