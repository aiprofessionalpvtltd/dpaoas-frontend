import React, { useRef } from "react";
import moment from "moment";

const PreviewOrderOfDayPDF = ({
  selectedTabData,
  formatedData,
  startTime,
  contentRef,
}) => {
  const pdfRef = useRef();
  let bullet = 2;

  const formattedDate = moment(formatedData, "YYYY/MM/DD").format(
    "Do MMMM, YYYY"
  );
  const formattedDay = moment(formatedData, "YYYY/MM/DD").format("dddd");

  return (
    <div style={{ width: "940px", margin: "0 auto" }}>
      {/* PDF Content */}
      <div
        ref={contentRef}
        style={{ padding: "20px", backgroundColor: "#fff" }}
      >
        <h1 style={{ textAlign: "center", fontSize: "28px" }}>
          HOUSE OF THE FEDERATION
        </h1>
        <h2
          style={{
            textAlign: "center",
            fontSize: "24px",
            marginBottom: "10px",
          }}
        >
          SENATE SECRETARIAT
        </h2>
        <h2 style={{ textAlign: "center", fontSize: "24px", marginTop: "0" }}>
          ORDERS OF THE DAY
        </h2>

        <p style={{ fontSize: "20px" }}>
          for the meeting of the Senate to be held at {`${startTime}`} on{" "}
          {`${formattedDay}`}, the {`${formattedDate}`}.
        </p>

        <p style={{ fontSize: "20px" }}>
          <strong style={{ marginRight: "25px" }}>1.</strong>
          Recitation from the Holy Quran
        </p>

        {selectedTabData?.length > 0 &&
          selectedTabData.map((item, index) => (
            <div key={index}>
              <h2
                style={{
                  textAlign: "center",
                  fontSize: "24px",
                  marginTop: "0",
                }}
              >
                <strong>
                  <u>{item?.category}</u>
                </strong>
              </h2>
              {item?.data?.map((data, idx) => (
                <p key={idx} style={{ fontSize: "20px", lineHeight: "30px" }}>
                  <strong style={{ marginRight: "25px" }}>{bullet++}.</strong>
                  {data?.nameOfMinistersOrMovers ? (
                    <strong>{`${data?.nameOfMinistersOrMovers},`}</strong>
                  ) : (
                    ""
                  )}{" "}
                  {data?.billTitle}.
                </p>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default PreviewOrderOfDayPDF;
