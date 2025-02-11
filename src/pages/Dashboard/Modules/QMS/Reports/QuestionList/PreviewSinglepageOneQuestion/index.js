import React, { useEffect, useState } from "react";
import { getSingleQuestionList } from "../../../../../../../api/APIs/Services/Question.service";
import { useLocation } from "react-router-dom";
import moment from "moment";

const PreviewSinglepageOneQuestion = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const encodedJsonString = queryParams.get("state");
  const stateData = JSON.parse(decodeURIComponent(encodedJsonString));
  const [data, setData] = useState(null);

  useEffect(() => {
    const getSingleQuestionData = async () => {
      try {
        const response = await getSingleQuestionList(stateData);
        setData(response);
      } catch (error) {
        console.error(error.message);
      }
    };

    getSingleQuestionData();
  }, [stateData]);

  const questions = [
    {
      id: "27",
      type: "DEF.",
      senator: "SENATOR SHAHADAT AWAN",
      noticeDate: "11/12/2024",
      noticeTime: "3:00 PM",
      qid: "42371",
      minister: "MINISTER INCHARGE OF THE CABINET DIVISION",
      question: `Will the Minister Incharge of the Cabinet Division be pleased to state:

(a)    the details of criteria devised by Pakistan Telecommunications Authority to deal with the roll-out obligations by the licensees in absence of any regulation / framework made for Right of Way; and

(b)    whether it is a fact that licensees have to fulfill the roll-out obligation in the uninhabited areas despite being included in the region for which the license has been granted, if so, the details thereof?`,
    },
    {
      id: "31",
      type: "DEF.",
      senator: "SENATOR QURATULAIN MARRI",
      noticeDate: "27/12/2024",
      noticeTime: "10:38 AM",
      qid: "42760",
      minister: "KHAWAJA MUHAMMAD ASIF",
      question: `Will the Minister for Aviation be pleased to state whether it is a fact that Day Care Centers are not available at all airports in Pakistan as required under Day Care Centers Act, 2023, if so, the reasons thereof indicating also steps taken or being taken to establish such facilities?`,
    },
    // Add more questions here...
  ];

  const printStyles = `
    @media print {
      .question-page {
        page-break-after: always;
        margin: 0;
        padding: 20px;
      }
      
      @page {
        size: A4;
        margin: 2cm;
      }
      
      body {
        -webkit-print-color-adjust: exact;
      }
      
      .no-print-break {
        page-break-inside: avoid;
      }
    }
  `;

  return (
    <div className="container-fluid p-4">
      <style>{printStyles}</style>

      {/* Header Section */}
      <div className="text-center mb-4">
        <p className="fw-bold text-decoration-underline mb-2  text-right">
          ({data?.questionList?.session?.sessionName}th Session)
        </p>
        <h1 className="fw-bold text-decoration-underline mb-3">
          SENATE SECRETARIAT
        </h1>
        <p className="fw-bold mb-2">
          "QUESTIONS FOR ORAL ANSWERS AND THEIR REPLIES"
        </p>
        <p className="mb-2">
          to be asked at a sitting of the Senate to be held on
        </p>
        <p className="fw-bold mb-4">
          {moment(data?.questionList?.houseLayDate).format(
            "dddd, [the] Do MMMM, YYYY"
          )}
        </p>
        <p className="fw-bold text-decoration-underline mb-4">
          {data?.questionList?.defferedQuestions ? "DEFFERED" : "ADMITTED"}{" "}
          QUESTION
        </p>
        {/* <p className="mb-4">[Question Nos. 27 and 31]</p> */}
        {/* <p className="mb-5">were deferred on 15th January, 2025 (345th Session)</p> */}
      </div>

      {/* Questions Section */}
      {data?.data.map((q, index) => (
        <div key={index} className="question-page no-print-break mb-5">
          <div className="border border-dark p-3 mb-4">
            <p className="fw-bold text-decoration-underline mb-3">
              *{q?.questionStatus?.questionStatus === "Deferred" && `(DEF.)`}{" "}
              QUESTION NO. {q.id} SENATOR {q?.member?.memberName}
            </p>
            <p className="mb-3">
              ( Notice Received on{" "}
              {moment(q?.noticeOfficeDiary?.noticeOfficeDiaryDate).format(
                "DD/MM/YYYY"
              )}{" "}
              at {q.noticeTime}) QID: {q.id}
            </p>
            <div className="mb-3" style={{ whiteSpace: "pre-line" }}>
              <div dangerouslySetInnerHTML={{ __html: q?.englishText }} />
            </div>
          </div>

          <p className="fw-bold text-decoration-underline  text-center">
            {q?.divisions?.ministry?.mnas.length > 0
              ? q?.divisions?.ministry?.mnas[0]?.mnaName
              : q?.divisions?.ministry?.ministryName}
          </p>
        </div>
      ))}
    </div>
  );
};

export default PreviewSinglepageOneQuestion;
