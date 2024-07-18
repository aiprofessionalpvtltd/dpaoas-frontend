import React, { useState, useEffect } from "react";
import { Layout } from "../../../../../../components/Layout";
import { QMSSideBarItems } from "../../../../../../utils/sideBarItems";
import Header from "../../../../../../components/Header";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { getAllDeferedQuestions } from "../../../../../../api/APIs/Services/Question.service";

function QMSDeferQuestionReports() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(null);
  const [data, setData] = useState(null);
  const pageSize = 10; // Set your desired page size
  // const data = [
  //   {
  //     "Sr#": 1,
  //     MID: "21-11-2023",
  //     "M-File No": "Ali Ahmad Jan",
  //     "Motion Diary No": "Additional Secretary Office",
  //     "Session Number": "Educational Trip",
  //     "Motion Type": "Personal",
  //     "Subject Matter": "AI Professionals Pvt Limited",
  //     "Notice No./Date": "21-11-2023",
  //     "Motion Week": "30-11-2023",
  //     "Motion Status": ["Saturday"],
  //     Movers: "Visit",
  //     Ministries: "Inactive",
  //   },
  //   {
  //     "Sr#": 1,
  //     MID: "21-11-2023",
  //     "M-File No": "Ali Ahmad Jan",
  //     "Motion Diary No": "Additional Secretary Office",
  //     "Session Number": "Educational Trip",
  //     "Motion Type": "Personal",
  //     "Subject Matter": "AI Professionals Pvt Limited",
  //     "Notice No./Date": "21-11-2023",
  //     "Motion Week": "30-11-2023",
  //     "Motion Status": ["Saturday"],
  //     Movers: "Visit",
  //     Ministries: "Inactive",
  //   },
  // ];
  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  const transformedQuesData = (apiData) => {
    return apiData.map((res, index) => {
      return {
        id: res.id,
        deferredDate: moment(res?.deferredDate).format("DD/MM/YYYY"),
        deferredSession: res?.deferredSession?.sessionName ? res?.deferredSession?.sessionName :"--",
        deferredBy: res?.deferredByUser?.employee ? res?.deferredByUser?.employee?.firstName + res?.deferredByUser?.employee?.lastName :"--",
      };
    });
  };
  const getAllDeferedQuestionsApi = async () => {
    try {
      const response = await getAllDeferedQuestions(currentPage, pageSize);
      if (response?.success) {
        // showSuccessMessage(response?.message);
        setCount(response?.count);
        const transformedData = transformedQuesData(response.data?.questions);
        setData(transformedData);
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getAllDeferedQuestionsApi();
  }, [currentPage, pageSize])

  return (
    <Layout module={true} sidebarItems={QMSSideBarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/"}
        addLink1={"/qms/reports/defer-question-reports"}
        title1={"Defer Question Reports"}
      />
      <div class="container-fluid">
        <div class="card mt-4">
          <div
            class="card-header red-bg"
            style={{ background: "#14ae5c !important" }}
          >
            <h1>Defferd Question (Current Session)</h1>
          </div>
          <div class="card-body">
            <div class="container-fluid">
              <CustomTable
                headerShown={true}
                hideBtn={true}
                ActionHide={true}
                // block={true}
                data={data}
                // seachBarShow={true}
                handlePageChange={handlePageChange}
                currentPage={currentPage}
                pageSize={pageSize}
                headertitlebgColor={"#666"}
                headertitletextColor={"#FFF"}
                // handlePrint={}
                // handleUser={}
                // handleDelete={(item) => handleDelete(item.id)}
              />
              {/* <div style={{ float: "right", marginTop: "10px" }}>
                <button class="btn btn-primary" type="submit">
                  Print
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default QMSDeferQuestionReports;
