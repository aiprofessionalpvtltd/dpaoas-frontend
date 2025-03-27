import React, { useRef } from "react";
import moment from "moment";

const PreviewOrderOfDayPDF = ({
  selectedTabData,
  formatedData,
  startTime,
  contentRef,
  actingSecretary,
  type,
}) => {
  const pdfRef = useRef();
  let bullet = 2;

  console.log("selectedTabData", selectedTabData);

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
        <h1
          style={{
            textAlign: "center",
            fontSize: "28px",
            fontFamily: "verdana",
          }}
        >
          <strong> HOUSE OF THE FEDERATION </strong>
        </h1>
        <h2
          style={{
            textAlign: "center",
            fontSize: "24px",
            marginBottom: "10px",
            fontFamily: "verdana",
          }}
        >
          <strong> SENATE SECRETARIAT</strong>
        </h2>
        <h2
          style={{
            textAlign: "center",
            fontSize: "24px",
            marginTop: "0",
            fontFamily: "verdana",
          }}
        >
          <strong>
            {" "}
            {type === "Supplementary"
              ? "SUPPLEMENTARY ORDER OF THE DAY"
              : "ORDERS OF THE DAY "}
          </strong>
        </h2>

        <p style={{ fontSize: "20px", fontFamily: "verdana" }}>
          for the meeting of the Senate to be held at {`${startTime}`} on{" "}
          {`${formattedDay}`}, the {`${formattedDate}`}.
        </p>

        <p style={{ fontSize: "20px", fontFamily: "verdana" }}>
          <strong style={{ marginRight: "25px" }}>1.</strong>
          Recitation from the Holy Quran
        </p>

        {selectedTabData?.length > 0 &&
          selectedTabData.map((item, index) => (
            <React.Fragment key={index}>
              <div>
                <h2
                  style={{
                    textAlign: "center",
                    fontSize: "24px",
                    marginTop: "7px",
                    marginBottom: "10px",
                    fontFamily: "verdana",
                  }}
                >
                  <strong>
                    <u>{item?.category}</u>
                  </strong>
                  <br />
                  <strong>
                    <u>{item?.subCategory ? item?.subCategory : null}</u>
                  </strong>
                </h2>
                {item?.data?.map((data, idx) => (
                  <p
                    key={idx}
                    style={{
                      fontSize: "20px",
                      lineHeight: "27px",
                      fontFamily: "verdana",
                      textAlign: "justify",
                    }}
                  >
                    <strong style={{ marginRight: "20px" }}>{bullet++}.</strong>
                    <strong>
                      {Array.isArray(data?.nameOfMinistersOrMovers)
                        ? data?.nameOfMinistersOrMovers
                            .map((name) => `SENATOR ${name.toUpperCase()}`)
                            .join(", ") + ", "
                        : data?.nameOfMinistersOrMovers
                          ? `SENATOR ${data?.nameOfMinistersOrMovers.toUpperCase()}, `
                          : data?.nameOfMinister
                            ? `SENATOR ${data?.nameOfMinister.toUpperCase()}, `
                            : ""}
                    </strong>
                    {/* {data?.nameOfMinistersOrMovers ? (
                      <strong>{`SENATOR ${
                        data?.nameOfMinistersOrMovers
                          ? data?.nameOfMinistersOrMovers.toUpperCase()
                          : data?.nameOfSenator.toUpperCase()
                      },`}</strong>
                    ) : (
                      ""
                    )}{" "} */}
                    {data?.billTitle}.
                  </p>
                ))}
              </div>
            </React.Fragment>
          ))}
        <br />
        <div className="row mt-3">
          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <strong
              style={{
                textAlign: "center",
                fontSize: "20px",
                lineHeight: "24px",
                fontFamily: "verdana",
              }}
            >
              {actingSecretary ? actingSecretary : "Syed Hasnain Haider"} <br />
              {actingSecretary ? "Acting Secretary" : "Secretary"}
            </strong>
          </div>
        </div>
        <div>
          <strong
            style={{
              fontSize: "20px",
              lineHeight: "24px",
              fontFamily: "verdana",
            }}
          >
            Islamabad, the <br />
            <span>{formattedDate}</span>
          </strong>
        </div>
      </div>
    </div>
  );
};

export default PreviewOrderOfDayPDF;
