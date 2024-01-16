import React, { useEffect, useState } from "react";
import { Layout } from "../../../../../components/Layout";
import Header from "../../../../../components/Header";
import { RevivedQuestionsBYID, allRevivedQuestions, getAllQuestion } from "../../../../../api/APIs";
import CustomTable from "../../../../../components/CustomComponents/CustomTable";
import { showErrorMessage, showSuccessMessage } from "../../../../../utils/ToastAlert";
import { Button, ToastContainer } from "react-bootstrap";
import { useNavigate } from "react-router";
import moment from "moment";
import { TMSsidebarItems } from "../../../../../utils/sideBarItems";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "30%", // Adjust the width as needed, for example '80%',
    border: "none",
    background: "transparent"
  },
};

function TMSQuestion() {
  const navigate = useNavigate();
  const [resData, setResData] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [revivedData, setRivivedData] = useState([]);
  const [count, setCount] = useState(null);
  const pageSize = 10;


  const openModal = () => {
    setIsOpen(true);
  };

  const data = [
    {
      "Sr#": 1,
      QID: "41465",
      SessionNumber: "332",
      SubjectMatter: "Translated Question 123",
      NoticeNo: "2132 ",
      NoticeDate: "8/25/2023 ",
      NoticeTime: "12:00 AM",
      Category: "Starred",
      SubmittedBy: "Mohsin",
      Status: "Defferd",
      SentOn: "12/12/2023",
      ReturnedOn: "1/12/2024",
    },
  ];
  const translatedData = [
    {
      "Sr#": 1,
      QID: "41465",
      SessionNumber: "332",
      NoticeDate: "8/25/2023 ",
      NoticeTime: "12:00 AM",
      Category: "Starred",
      SubmittedBy: "Mohsin",
      Status: "Defferd",
      SentOn: "12/12/2023",
      ReturnedOn: "1/12/2024",
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
        SubjectMatter: [res?.englishText, res?.urduText].filter(Boolean).join(", "),
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
      <Header dashboardLink={"/tms/dashboard"} title1={"Question"} />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div class="card">
          <div
            class="card-header red-bg"
            style={{ background: "#14ae5c !important" }}
          >
            <h1>Assign Question</h1>
          </div>
          <div class="card-body">
            <div className="row">
              <div className="col-12">
                <div className="mb-3">
                  <label className="form-label">Remarks</label>
                  <textarea
                    type="text"
                    className={`form-control`}
                    id="seatNo"
                    // placeholder={selectedItem?.seatNo}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div>
                  <label className="form-label">Assign To</label>
                  <select class="form-select " placeholder="Assign To">
                    <option value="" selected disabled>
                      Select
                    </option>
                    <option value="1">Translator</option>
                    <option value="2">Typist</option>
                    <option value="2">Proof Reader</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="float-end">
              <div className="col-4" style={{ marginTop: "30px" }}>
                <Button
                  variant="success"
                  type="submit"
                  style={{ width: 130, backgroundColor: "#14ae5c" }}
                  onClick={() => setIsOpen(false)}
                >
                  Assign
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <div class="container-fluid">
        <div class="card mt-4">
          <div class="card-header red-bg" style={{ background: "#14ae5c !important" }}>
            <h1>QUESTION SENT FROM QUESTION BRANCH</h1>
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
                hideEditIcon={true}
                assignBtn={true}
                assignClick={openModal}
                headertitlebgColor={"#666"}
                headertitletextColor={"#FFF"}
              />
            </div>
          </div>
        </div>

        <div class="card mt-4">
          <div class="card-header red-bg" style={{ background: "#14ae5c !important" }}>
            <h1>TRANSLATED QUESTION</h1>
          </div>
          <div class="card-body">
            <div class="container-fluid">
              <CustomTable
                hideBtn={true}
                data={translatedData}
                headerShown={true}
                handlePageChange={handlePageChange}
                currentPage={currentPage}
                pageSize={pageSize}
                // totalCount={count}
                ActionHide={true}
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

export default TMSQuestion;
