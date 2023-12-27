import React, { useEffect, useState } from "react";
import { Layout } from "../../../../../../components/Layout";
import { QMSSideBarItems } from "../../../../../../utils/sideBarItems";
import Header from "../../../../../../components/Header";
import { getAllQuestion, questionHistory } from "../../../../../../api/APIs";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import { showErrorMessage, showSuccessMessage } from "../../../../../../utils/ToastAlert";
import { ToastContainer } from "react-bootstrap";

function QMSNoticeQuestion() {
  const [resData, setResData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
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
        NoticeDate: res?.noticeOfficeDiary?.noticeOfficeDiaryDate,
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
        showSuccessMessage(response?.message);
        setCount(response?.count);
        const transformedData = transformLeavesData(response.data);
        console.log("Saqib", transformedData);
        setResData(transformedData);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const QuestionHistoryApi = async () => {
    try {
      const response = await questionHistory()
      if (response?.success) {
        showSuccessMessage(response?.message);
        // setCount(response?.count);
        // const transformedData = transformLeavesData(response.data);
        // console.log("Saqib", transformedData);
        // setResHistory(transformedData);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllQuestionsApi()
  }, [])
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
                block={true}
                hideBtn={true}
                data={resData}
                headerShown={true}
                handlePageChange={handlePageChange}
                currentPage={currentPage}
                pageSize={pageSize}
                hideEditIcon={true}
                totalCount={count}
                ActionHide={true}
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
                    <tr>
                      <td class="text-center green-color">1</td>
                      <td class="text-center green-color">2648</td>
                      <td class="text-center green-color">332</td>
                      <td class="text-center green-color">No English Text</td>
                      <td class="text-center green-color">23-10-2023</td>
                      <td class="text-center green-color">4:36pm</td>
                      <td class="text-center green-color">Starred</td>
                      <td class="text-center green-color">
                        Dr. Afnan Ullah Khan{" "}
                      </td>
                      <td class="text-center green-color">
                        <button class="btn btn-primary" type="submit">
                          View Review
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-center red-message-color">2</td>
                      <td class="text-center red-message-color">2648</td>
                      <td class="text-center red-message-color">332</td>
                      <td class="text-center red-message-color">
                        No English Text
                      </td>
                      <td class="text-center red-message-color">23-10-2023</td>
                      <td class="text-center red-message-color">34:36pm</td>
                      <td class="text-center red-message-color">Starred</td>
                      <td class="text-center red-message-color">
                        Dr. Afnan Ullah Khan{" "}
                      </td>
                      <td class="text-center green-color">
                        <button class="btn btn-primary" type="submit">
                          View Review
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-center green-color">3</td>
                      <td class="text-center green-color">2648</td>
                      <td class="text-center green-color">332</td>
                      <td class="text-center green-color">No English Text</td>
                      <td class="text-center green-color">23-10-2023</td>
                      <td class="text-center green-color">4:36pm</td>
                      <td class="text-center green-color">Starred</td>
                      <td class="text-center green-color">
                        Dr. Afnan Ullah Khan{" "}
                      </td>
                      <td class="text-center green-color">
                        <button class="btn btn-primary" type="submit">
                          View Review
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-center red-message-color">4</td>
                      <td class="text-center red-message-color">2648</td>
                      <td class="text-center red-message-color">332</td>
                      <td class="text-center red-message-color">
                        No English Text
                      </td>
                      <td class="text-center red-message-color">23-10-2023</td>
                      <td class="text-center red-message-color">34:36pm</td>
                      <td class="text-center red-message-color">Starred</td>
                      <td class="text-center red-message-color">
                        Dr. Afnan Ullah Khan{" "}
                      </td>
                      <td class="text-center green-color">
                        <button class="btn btn-primary" type="submit">
                          View Review
                        </button>
                      </td>
                    </tr>
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
