import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import moment from 'moment';

const PreviewSuplementryList = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const encodedJsonString = queryParams.get("state");
  const stateData = JSON.parse(decodeURIComponent(encodedJsonString));
  console.log("hshshhs",stateData)
//   const [data, setData] = useState(stateData);


  return (
    <div style={{ background: '#fff', fontFamily: 'Arial, Helvetica, sans-serif', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
      {stateData && (
        <>
          <div
            style={{
              position: 'absolute',
              top: '50px',
              right: '100px',
              fontWeight: 'bold',
              WebkitTouchCallout: 'none', /* iOS Safari */
              WebkitUserSelect: 'none', /* Safari */
              KhtmlUserSelect: 'none', /* Konqueror HTML */
              MozUserSelect: 'none', /* Firefox */
              MsUserSelect: 'none', /* Internet Explorer/Edge */
              userSelect: 'none', /* Non-prefixed version */
            }}
          >
            {stateData?.memberQuestionCount?.map((item, index) => (
              <p key={index}>{item?.name}: {item?.count}</p>
            ))}
          </div>

          {stateData?.questions?.map((item, index) => (
            <div key={index} className="template" style={{ width: '940px', margin: '20px auto' }}>
              <div className="template-head">
                <h1 style={{ textAlign: 'center', fontSize: '20px', textDecoration: 'underline', marginTop: "20px" }}>SENATE OF PAKISTAN</h1>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ marginTop: '33px' }}>(ADMITTED STARRED QUESTIONS LIST NO. 1 FOR 340TH SESSION)</p>
                </div>

                <div
                  style={{
                    borderBottom: '#000 solid 1px',
                    textAlign: 'center',
                    width: '450px',
                    margin: '0 auto',
                    marginBottom: '25px',
                  }}
                >
                  <p style={{ float: 'left', margin: '0', fontStyle: 'italic' }}>Ministry of Energy (Power Division)</p>
                  <span style={{ float: 'right', paddingLeft: '120px', fontStyle: 'italic' }}>04</span>
                  <div style={{ clear: 'both' }}></div>
                </div>

                <div
                  style={{
                    borderBottom: '#000 solid 1px',
                    textAlign: 'center',
                    width: '450px',
                    margin: '0 auto',
                    marginBottom: '25px',
                  }}
                >
                  <p style={{ float: 'left', margin: '0', fontStyle: 'italic' }}>Ministry of Law and Justice</p>
                  <span style={{ float: 'right', paddingLeft: '120px', fontStyle: 'italic' }}>03</span>
                  <div style={{ clear: 'both' }}></div>
                </div>

                <div
                  style={{
                    borderBottom: '#000 solid 1px',
                    textAlign: 'center',
                    width: '450px',
                    margin: '0 auto',
                    marginBottom: '25px',
                  }}
                >
                  <p style={{ float: 'left', margin: '0', fontWeight: 'bold', fontStyle: 'italic' }}>TOTAL QUESTIONS</p>
                  <span style={{ float: 'right', paddingLeft: '120px', fontWeight: 'bold', fontStyle: 'italic' }}>07</span>
                  <div style={{ clear: 'both' }}></div>
                </div>

                <div style={{ marginTop: '35px', fontWeight: 'bold', textDecoration: 'underline' }}>
                  {stateData?.memberQuestionCount?.map((question, idx) => (
                    <p key={idx}>*QUESTION NO. 1 {question?.name}</p>
                  ))}
                </div>

                <div style={{ marginTop: '15px', fontWeight: 'bold' }}>
                  Notice Received on {moment(item.noticeOfficeDiary.noticeOfficeDiaryDate).format("DD/MM/YYYY")} at {item.noticeOfficeDiary.noticeOfficeDiaryTime} QID: {item.noticeOfficeDiary.id}
                </div>

                <div style={{ marginTop: '10px', fontWeight: 'bold' }}>
                  <div dangerouslySetInnerHTML={{ __html: item.englishText }} />
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default PreviewSuplementryList;



