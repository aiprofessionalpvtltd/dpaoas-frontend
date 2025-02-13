import React, { useState } from 'react';
import { getQuestionListCountsHourStatement } from '../../../../../../../api/APIs/Services/Question.service';
import { useLocation } from "react-router-dom";

const PreviewHourStatementList = () => {
 const location = useLocation();
   const queryParams = new URLSearchParams(location.search);
   const encodedJsonString = queryParams.get("state");
   const stateData = JSON.parse(decodeURIComponent(encodedJsonString));
   const [data, setData] = useState(null);

  React.useEffect(() => {
        const getSingleQuestionData = async () => {
          try {
            const response = await getQuestionListCountsHourStatement(stateData);
            setData(response?.data);
          } catch (error) {
            console.error(error.message);
          }
        };
    
        getSingleQuestionData();
      }, [stateData]);
    


  const printStyles = `
    @media print {
      body {
        -webkit-print-color-adjust: exact;
        margin: 0;
        padding: 0;
      }
      .template {
        page-break-inside: avoid;
        margin: 0;
        padding: 0;
        width: 100%;
      }
    }
  `;

  if (!data) return null;

  return (
    <div className="container-fluid bg-white" style={{ fontFamily: 'Arial, sans-serif', minHeight: '100vh' }}>
      <style>{printStyles}</style>
      <div className="text-center mt-4">
        <h1 className="text-decoration-underline fw-bold fs-4 mt-4">
          SENATE SECRETARIAT
        </h1>
        
        <div className="text-center mt-4">
          <p>(Questions Branch)</p>
        </div>

        <div className="border-bottom border-dark text-center mx-auto mb-4" style={{ width: '670px' }}>
          <p className="float-start m-0 fw-bold fst-italic">
            MINISTRY-WISE BREAK-UP OF THE QUESTIONS SET DOWN FOR ANSWERING ON
          </p>
          <div className="clearfix"></div>
        </div>

        <div className="border-bottom border-dark text-center mx-auto mb-4" style={{ width: '600px' }}>
          <p className="float-start m-0 fw-bold fst-italic">
            28TH JANUARY, 2025 MENTIONED IN LIST NO. {data.questionListData.listName}
          </p>
          <div className="clearfix"></div>
        </div>

        <p className="fw-bold">
          STARRED QUESTIONS: {data.summary.totalStarred}
        </p>

        <div className="container mt-4">
          {data.summary.divisions.map((division, index) => (
            <div key={index} className="row mb-4">
              <div className="col-6 text-start">
                <p className="fw-bold mb-2">{division.divisionName}</p>
                {division.members.map((member, mIndex) => (
                  <p key={mIndex} className="mb-1">{member.name}</p>
                ))}
              </div>
              <div className="col-6 text-start">
                <p className="fw-bold mb-2">
                  {division.categorySummary.split(',')[0]}
                </p>
                {division.members.map((member, mIndex) => (
                  <p key={mIndex} className="mb-1">
                    (No. {member.questionNumbers.join(', ')})
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PreviewHourStatementList;