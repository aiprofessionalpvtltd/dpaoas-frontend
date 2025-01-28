import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getSingleQuestionList } from "../../../../../../../api/APIs/Services/Question.service";
import moment from "moment";

const PreviewQuestionList = () => {
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
      .template-head h1, .template-head p {
        font-size: 12pt;
      }
      .template-head {
        margin: 0;
        padding: 0;
      }
      .template-head div {
        margin: 0;
        padding: 0;
      }
      .template-head p {
        margin: 0;
        padding: 0;
      }
    }
  `;

  return (
    <div
      style={{
        background: "#fff",
        fontFamily: "Arial, Helvetica, sans-serif",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <style>{printStyles}</style>
      {data && (
        <>
          <div
            style={{
              position: "absolute",
              top: "30px",
              right: "20px",
              fontWeight: "bold",
              WebkitTouchCallout: "none" /* iOS Safari */,
              WebkitUserSelect: "none" /* Safari */,
              KhtmlUserSelect: "none" /* Konqueror HTML */,
              MozUserSelect: "none" /* Firefox */,
              MsUserSelect: "none" /* Internet Explorer/Edge */,
              userSelect: "none" /* Non-prefixed version */,
            }}
          >
            {data?.memberQuestionCount?.map((item, index) => (
              <p key={index}>
                {item?.name}: {item?.count}
              </p>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h1
              style={{
                textAlign: "center",
                fontSize: "20px",
                textDecoration: "underline",
                marginTop: "20px",
              }}
            >
              SENATE OF PAKISTAN
            </h1>
            <div style={{ textAlign: "center" }}>
              <p style={{ marginTop: "33px" }}>
                ({data?.questionList?.questionCategory} QUESTIONS LIST NO.{" "}
                {data?.questionList?.startListNo} FOR {data?.questionList?.session?.sessionName}TH SESSION)
              </p>
            </div>
            {data.divisionQuestionCount?.map((division, index) => (
              <div
                key={index}
                style={{
                  borderBottom: "#000 solid 1px",
                  textAlign: "center",
                  width: "450px",
                  margin: "0 auto",
                  marginBottom: "25px",
                }}
              >
                <p style={{ float: "left", margin: "0", fontStyle: "italic" }}>
                  {division.name}
                </p>
                <span
                  style={{
                    float: "right",
                    paddingLeft: "120px",
                    fontStyle: "italic",
                  }}
                >
                  {division.count}
                </span>
                <div style={{ clear: "both" }}></div>
              </div>
            ))}
            <div
              style={{
                borderBottom: "#000 solid 1px",
                textAlign: "center",
                width: "450px",
                margin: "0 auto",
                marginBottom: "25px",
              }}
            >
              <p
                style={{
                  float: "left",
                  margin: "0",
                  fontWeight: "bold",
                  fontStyle: "italic",
                }}
              >
                TOTAL QUESTIONS
              </p>
              <span
                style={{
                  float: "right",
                  paddingLeft: "120px",
                  fontWeight: "bold",
                  fontStyle: "italic",
                }}
              >
                {data?.data?.length}
              </span>
              <div style={{ clear: "both" }}></div>
            </div>
          </div>
          {data.data?.map((item, index) => (
            <div
              key={index}
              className="template"
              style={{ margin: "20px 0 0 20px" }}
            >
              <div className="template-head">
                <div
                  style={{
                    marginTop: "35px",
                    fontWeight: "bold",
                    textDecoration: "underline",
                  }}
                >
                  <p>
                    *QUESTION NO. {index + 1} {item?.member?.memberName}
                  </p>
                </div>

                <div style={{ marginTop: "15px", fontWeight: "bold" }}>
                  Notice Received on{" "}
                  {moment(item.noticeOfficeDiary.noticeOfficeDiaryDate).format(
                    "DD/MM/YYYY"
                  )}{" "}
                  at {item.noticeOfficeDiary.noticeOfficeDiaryTime} QID:{" "}
                  {item.noticeOfficeDiary.id}
                </div>

                <div style={{ marginTop: "10px", fontWeight: "bold" }}>
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

export default PreviewQuestionList;
