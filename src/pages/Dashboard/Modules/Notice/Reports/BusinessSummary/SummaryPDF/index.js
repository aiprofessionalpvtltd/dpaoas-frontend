import React from "react";
import html2pdf from "html2pdf.js";
import { useLocation } from "react-router-dom";
import moment from "moment";

const PDFAllBusinessSummary = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const encodedJsonString = queryParams.get("state");
  const decodedString = decodeURIComponent(encodedJsonString);
  const data = JSON.parse(decodedString);
  console.log(data);

  const handlePrint = () => {
    const element = document.getElementById("template-container");
    const opt = {
      margin: 0.2,
      filename: "annualReport.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 3 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf()
      .set(opt)
      .from(element)
      .toPdf()
      .outputPdf("blob")
      .then((pdfBlob) => {
        const pdfUrl = URL.createObjectURL(pdfBlob);
        const iframe = document.createElement("iframe");
        iframe.style.position = "fixed";
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        iframe.style.left = "0";
        iframe.style.top = "0";
        iframe.style.zIndex = "-1";
        iframe.style.visibility = "hidden";
        iframe.src = pdfUrl;

        document.body.appendChild(iframe);

        iframe.onload = () => {
          iframe.style.visibility = "visible";
          iframe.contentWindow.focus();
          iframe.contentWindow.print();
          iframe.style.visibility = "hidden";
        };
      });
  };

  return (
    <>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end p-4 bg-white">
        <button className="btn btn-primary" type="button" onClick={handlePrint}>
          Print
        </button>
      </div>
      <div
        id="template-container"
        style={{
          background: "#fff",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div className="template" style={{ width: "750px", margin: "0 auto" }}>
          <div className="template-head">
            <h1
              style={{
                textAlign: "center",
                fontSize: "20px",
                textDecoration: "underline",
              }}
            >
              SENATE OF PAKISTAN
            </h1>
            <p
              style={{
                textAlign: "center",
                fontSize: "20px",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            >
              (Notice Branch)
            </p>
          </div>
          <div>
            <h1
              style={{
                //   textAlign: "center",
                fontSize: "20px",
                margin: "20px 0px",
                //   textDecoration: "underline",
              }}
            >
              Questions
            </h1>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr
                  style={{
                    backgroundColor: "#f4f4f4",
                    borderBottom: "2px solid #ddd",
                  }}
                >
                  <th
                    style={{
                      padding: "10px",
                      textAlign: "left",
                      fontSize: "14px",
                    }}
                  >
                    Sr No
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      textAlign: "left",
                      fontSize: "14px",
                    }}
                  >
                    Notice Diary Number
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      textAlign: "left",
                      fontSize: "14px",
                    }}
                  >
                    Notice Date
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      textAlign: "left",
                      fontSize: "14px",
                    }}
                  >
                    Notice Time
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      textAlign: "left",
                      fontSize: "14px",
                    }}
                  >
                    Session Number
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      textAlign: "left",
                      fontSize: "14px",
                    }}
                  >
                    Mover
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      textAlign: "left",
                      fontSize: "14px",
                    }}
                  >
                    Category
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      textAlign: "left",
                      fontSize: "14px",
                    }}
                  >
                    Division
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      textAlign: "left",
                      fontSize: "14px",
                    }}
                  >
                    Ministry
                  </th>
                </tr>
              </thead>

              <tbody>
                {data?.questionReport?.map((item, index) => (
                  <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
                    <td
                      style={{
                        padding: "10px",
                        textAlign: "left",
                        fontSize: "14px",
                      }}
                    >
                      {item?.SrNo ? item.SrNo : index + 1}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        textAlign: "left",
                        fontSize: "14px",
                      }}
                    >
                      {item?.noticeOfficeDiary?.noticeOfficeDiaryNo}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        textAlign: "left",
                        fontSize: "14px",
                      }}
                    >
                      {item?.noticeOfficeDiary?.noticeOfficeDiaryDate &&
                        moment(
                          item?.noticeOfficeDiary?.noticeOfficeDiaryDate
                        ).format("DD-MM-YYYY")}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        textAlign: "left",
                        fontSize: "14px",
                      }}
                    >
                      {item?.noticeOfficeDiary?.noticeOfficeDiaryTime}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        textAlign: "left",
                        fontSize: "14px",
                      }}
                    >
                      {item?.session?.sessionName}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        textAlign: "left",
                        fontSize: "14px",
                      }}
                    >
                      {item?.member?.memberName}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        textAlign: "left",
                        fontSize: "14px",
                      }}
                    >
                      {item?.questionCategory}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        textAlign: "left",
                        fontSize: "14px",
                      }}
                    >
                      {item?.divisions?.divisionName}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        textAlign: "left",
                        fontSize: "14px",
                      }}
                    >
                      {item?.divisions?.ministry?.ministryName
                        ? item?.divisions?.ministry?.ministryName
                        : "---"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th style={{ padding: "10px", textAlign: "left" }}>Sr No</th>
                <th style={{ padding: "10px", textAlign: "left" }}>
                  Notice Diary Number
                </th>
                <th style={{ padding: "10px", textAlign: "left" }}>
                  Notice Date
                </th>
                <th style={{ padding: "10px", textAlign: "left" }}>
                  Notice Time
                </th>
                <th style={{ padding: "10px", textAlign: "left" }}>
                  Session Number
                </th>
                <th style={{ padding: "10px", textAlign: "left" }}>Mover</th>
                <th style={{ padding: "10px", textAlign: "left" }}>Category</th>
                <th style={{ padding: "10px", textAlign: "left" }}>Division</th>
                <th style={{ padding: "10px", textAlign: "left" }}>Ministry</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data?.questionReport &&
                data?.questionReport?.map((item, index) => (
                  <tr key={index}>
                    <td style={{ padding: "10px" }}>{item.SrNo}</td>
                    <td style={{ padding: "10px" }}>
                      {item?.noticeOfficeDiary?.noticeOfficeDiaryNo}
                    </td>
                    <td style={{ padding: "10px" }}>
                      {item?.noticeOfficeDiary?.noticeOfficeDiaryDate}
                    </td>
                    <td style={{ padding: "10px" }}>
                      {item?.noticeOfficeDiary?.noticeOfficeDiaryTime}
                    </td>
                    <td style={{ padding: "10px" }}>
                      {item?.session?.SessionName}
                    </td>
                    <td style={{ padding: "10px" }}>
                      {item?.member?.memberName}
                    </td>
                    <td style={{ padding: "10px" }}>{item.Category}</td>
                    <td style={{ padding: "10px" }}>{item.SubjectMatter}</td>
                    <td style={{ padding: "10px" }}>{item.ActionTaken}</td>
                  </tr>
                ))}
            </tbody>
          </table> */}
          {/* <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr
                style={{
                  backgroundColor: "#f4f4f4",
                  borderBottom: "2px solid #ddd",
                }}
              >
                <th style={{ padding: "12px", textAlign: "left" }}>Sr No</th>
                <th style={{ padding: "12px", textAlign: "left" }}>
                  Notice Diary Number
                </th>
                <th style={{ padding: "12px", textAlign: "left" }}>
                  Notice Date
                </th>
                <th style={{ padding: "12px", textAlign: "left" }}>
                  Notice Time
                </th>
                <th style={{ padding: "12px", textAlign: "left" }}>
                  Session Number
                </th>
                <th style={{ padding: "12px", textAlign: "left" }}>Mover</th>
                <th style={{ padding: "12px", textAlign: "left" }}>Category</th>
                <th style={{ padding: "12px", textAlign: "left" }}>Division</th>
                <th style={{ padding: "12px", textAlign: "left" }}>Ministry</th>
              </tr>
            </thead>

            <tbody>
              {data?.questionReport &&
                data?.questionReport?.map((item, index) => (
                  <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
                    <td style={{ padding: "10px", textAlign: "left" }}>
                      {item?.SrNo ? item?.SrNo : index + 1}
                    </td>
                    <td style={{ padding: "10px", textAlign: "left" }}>
                      {item?.noticeOfficeDiary?.noticeOfficeDiaryNo}
                    </td>
                    <td style={{ padding: "10px", textAlign: "left" }}>
                      {item?.noticeOfficeDiary?.noticeOfficeDiaryDate &&
                        moment(
                          item?.noticeOfficeDiary?.noticeOfficeDiaryDate
                        ).format("DD-MM-YYYY")}
                    </td>
                    <td style={{ padding: "10px", textAlign: "left" }}>
                      {item?.noticeOfficeDiary?.noticeOfficeDiaryTime}
                    </td>
                    <td style={{ padding: "10px", textAlign: "left" }}>
                      {item?.session?.SessionName}
                    </td>
                    <td style={{ padding: "10px", textAlign: "left" }}>
                      {item?.member?.memberName}
                    </td>
                    <td style={{ padding: "10px", textAlign: "left" }}>
                      {item.Category}
                    </td>
                    <td style={{ padding: "10px", textAlign: "left" }}>
                      {item.Division}
                    </td>
                    <td style={{ padding: "10px", textAlign: "left" }}>
                      {item.Ministry}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table> */}

          <div>
            <h1
              style={{
                //   textAlign: "center",
                fontSize: "20px",
                margin: "20px 0px",
                //   textDecoration: "underline",
              }}
            >
              Motions
            </h1>

            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr
                  style={{
                    backgroundColor: "#f4f4f4",
                    borderBottom: "2px solid #ddd",
                  }}
                >
                  <th
                    style={{
                      padding: "10px",
                      textAlign: "left",
                      fontSize: "14px",
                    }}
                  >
                    Sr No
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      textAlign: "left",
                      fontSize: "14px",
                    }}
                  >
                    Notice Diary Number
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      textAlign: "left",
                      fontSize: "14px",
                    }}
                  >
                    Notice Date
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      textAlign: "left",
                      fontSize: "14px",
                    }}
                  >
                    Notice Time
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      textAlign: "left",
                      fontSize: "14px",
                    }}
                  >
                    Session Number
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      textAlign: "left",
                      fontSize: "14px",
                    }}
                  >
                    Mover
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      textAlign: "left",
                      fontSize: "14px",
                    }}
                  >
                    Motion Type
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      textAlign: "left",
                      fontSize: "14px",
                    }}
                  >
                    Description
                  </th>
                  {/* <th style={{ padding: "10px", textAlign: "left" }}>Ministry</th> */}
                </tr>
              </thead>

              <tbody>
                {data?.motionReport &&
                  data?.motionReport?.map((item, index) => (
                    <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
                      <td
                        style={{
                          padding: "10px",
                          textAlign: "left",
                          fontSize: "14px",
                        }}
                      >
                        {item?.SrNo ? item.SrNo : index + 1}
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          textAlign: "left",
                          fontSize: "14px",
                        }}
                      >
                        {item?.noticeOfficeDairies?.noticeOfficeDiaryNo}
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          textAlign: "left",
                          fontSize: "14px",
                        }}
                      >
                        {item?.noticeOfficeDairies?.noticeOfficeDiaryDate &&
                          moment(
                            item?.noticeOfficeDairies?.noticeOfficeDiaryDate
                          ).format("DD-MM-YYYY")}
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          textAlign: "left",
                          fontSize: "14px",
                        }}
                      >
                        {item?.noticeOfficeDairies?.noticeOfficeDiaryTime}
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          textAlign: "left",
                          fontSize: "14px",
                        }}
                      >
                        {item?.sessions?.sessionName}
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          textAlign: "left",
                          fontSize: "14px",
                        }}
                      >
                        {item?.motionMovers?.length > 0
                          ? item?.motionMovers?.map((mover, index) => (
                              <span key={index}>
                                {mover?.members?.memberName}
                                {index < item.motionMovers.length - 1 && ", "}
                              </span>
                            ))
                          : "No Movers"}
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          textAlign: "left",
                          fontSize: "14px",
                        }}
                      >
                        {item?.motionType}
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          textAlign: "left",
                          fontSize: "14px",
                        }}
                        dangerouslySetInnerHTML={{ __html: item.englishText }}
                      ></td>
                      <td
                        style={{
                          padding: "10px",
                          textAlign: "left",
                          fontSize: "14px",
                        }}
                      >
                        {item.Ministry}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div>
            <h1
              style={{
                //   textAlign: "center",
                fontSize: "20px",
                margin: "20px 0px",

                //   textDecoration: "underline",
              }}
            >
              Resolutions
            </h1>

            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr
                  style={{
                    backgroundColor: "#f4f4f4",
                    borderBottom: "2px solid #ddd",
                  }}
                >
                  <th
                    style={{
                      padding: "10px",
                      textAlign: "left",
                      fontSize: "14px",
                    }}
                  >
                    Sr No
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      textAlign: "left",
                      fontSize: "14px",
                    }}
                  >
                    Notice Diary Number
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      textAlign: "left",
                      fontSize: "14px",
                    }}
                  >
                    Notice Date
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      textAlign: "left",
                      fontSize: "14px",
                    }}
                  >
                    Notice Time
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      textAlign: "left",
                      fontSize: "14px",
                    }}
                  >
                    Session Number
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      textAlign: "left",
                      fontSize: "14px",
                    }}
                  >
                    Mover
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      textAlign: "left",
                      fontSize: "14px",
                    }}
                  >
                    Resolution Type
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      textAlign: "left",
                      fontSize: "14px",
                    }}
                  >
                    Description
                  </th>
                  {/* <th style={{ padding: "10px", textAlign: "left" }}>Ministry</th> */}
                </tr>
              </thead>

              <tbody>
                {data?.resolutionReport &&
                  data?.resolutionReport?.map((item, index) => (
                    <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
                      <td
                        style={{
                          padding: "10px",
                          textAlign: "left",
                          fontSize: "14px",
                        }}
                      >
                        {item?.SrNo ? item.SrNo : index + 1}
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          textAlign: "left",
                          fontSize: "14px",
                        }}
                      >
                        {item?.noticeDiary?.noticeOfficeDiaryNo}
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          textAlign: "left",
                          fontSize: "14px",
                        }}
                      >
                        {item?.noticeDiary?.noticeOfficeDiaryDate &&
                          moment(
                            item?.noticeDiary?.noticeOfficeDiaryDate
                          ).format("DD-MM-YYYY")}
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          textAlign: "left",
                          fontSize: "14px",
                        }}
                      >
                        {item?.noticeDiary?.noticeOfficeDiaryTime}
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          textAlign: "left",
                          fontSize: "14px",
                        }}
                      >
                        {item?.session?.sessionName}
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          textAlign: "left",
                          fontSize: "14px",
                        }}
                      >
                        {item?.resolutionMoversAssociation?.length > 0
                          ? item?.resolutionMoversAssociation.map(
                              (mover, index) => (
                                <span key={index}>
                                  {mover?.memberAssociation?.memberName}
                                  {index <
                                    item.resolutionMoversAssociation.length -
                                      1 && ", "}
                                </span>
                              )
                            )
                          : "No Movers"}
                      </td>

                      <td
                        style={{
                          padding: "10px",
                          textAlign: "left",
                          fontSize: "14px",
                        }}
                      >
                        {item?.resolutionType}
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          textAlign: "left",
                          fontSize: "14px",
                        }}
                        dangerouslySetInnerHTML={{ __html: item?.englishText }}
                      ></td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default PDFAllBusinessSummary;
