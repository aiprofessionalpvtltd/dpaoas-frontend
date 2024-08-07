import React from "react";
import html2pdf from "html2pdf.js";

function BallotMotionPdfTemplate({ data, children }) {
  const handleBallotPrint = () => {
    const element = document.getElementById("template-container");
    const opt = {
      margin: 0.2,
      filename: "ResolutionBallot.pdf",
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
    // <AuthProvider>
    //   <NavigationRoutes />
    // </AuthProvider>
    <>
      <div class="row mb-2 mt-5" style={{ marginRight: "20px" }}>
        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
          <button
            class="btn btn-primary"
            type="button"
            onClick={handleBallotPrint}
          >
            Print
          </button>
        </div>
      </div>
      {/* <div style={{  }}> */}
      <div
        id="template-container"
        style={{
          fontFamily: "Arial, Helvetica, sans-serif",
          width: "700px",
          paddingRight: "50px",
          margin: "0 auto",
        }}
      >
        <div className="template-head">
          <h1
            style={{
              textAlign: "center",
              fontSize: "20px",
              textDecoration: "underline",
            }}
          >
            SENATE SECRETARIAT
          </h1>
          <div style={{ float: "left" }}>
            <p style={{ marginTop: "33px" }}>MD. No. 17 (339th)/2024-M</p>
          </div>
          <div style={{ float: "right" }}>
            <p style={{ marginTop: "33px" }}>
              Islamabad, the 3<sup>rd</sup> July, 2024
            </p>
          </div>
          <div style={{ clear: "both" }}></div>
          <p>To</p>
          <div style={{ clear: "both" }}></div>
          <p style={{ marginLeft: "100px", lineHeight: "26px" }}>
            All Members,
            <br />
            Senate of Pakistan
          </p>
          <p style={{ fontWeight: "bold", marginBottom: "30px" }}>
            Subject:-
            <span
              style={{
                marginLeft: "25px",
                textDecoration: "underline",
                marginBottom: "35px",
              }}
            >
              MOTION UNDER RULE 218 MD. NO.17 (339)/2024-M
            </span>
          </p>
          <p>Respected Madam/Sir,</p>
          <p style={{ marginLeft: "110px", lineHeight: "26px" }}>
          I am directed to refer to your Motion under rule 218 (copy enclosed), the notice ofwhich was received in this Secretariat on 6th June 2024,for the current session and to state that thematter pertains to power and functions of the Senate cannot be discussed by way of a motion underrule 218 as it is not the concern of the Government.
          </p>
          <div className="clearfix"></div>
        </div>
        <div className="template-detail">
          <table
            style={{
              borderSpacing: "0",
              borderCollapse: "separate",
              width: "100%",
            }}
          >
            <thead>
              <tr>
                <th align="center" style={{ backgroundColor: "#acacac", textAlign:"center" }}>
                  S#
                </th>
                <th align="center" style={{ background: "#acacac", textAlign:"center" }}>
                  MID No. & Date
                </th>
                <th align="center" style={{ background: "#acacac", textAlign:"center" }}>
                  NAME OF MOVER
                </th>
                <th align="center" style={{ background: "#acacac", textAlign:"center" }}>
                  SUBJECT
                </th>
                <th align="center" style={{ background: "#acacac", textAlign:"center" }}>
                  Remarks
                </th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data?.map((item, index) => (
                  <tr>
                    <td
                      align="left"
                      style={{ padding: "15px", verticalAlign: "top" }}
                    >{`${index + 1}`}</td>
                    <td
                      align="center"
                      style={{ padding: "15px", verticalAlign: "top" }}
                    >(01) (341) 06.07.24</td>
                    <td
                      align="left"
                      style={{ padding: "15px", verticalAlign: "top" }}
                    >
                      {item?.motionMovers
                        .map((mover) => mover.members.memberName)
                        .join(", ")}
                    </td>
                    <td align="left" style={{ padding: "15px" }}>
                      <p
                        style={{
                          margin: "0",
                          textAlign: "justify",
                          lineHeight: "26px",
                          paddingBottom: "11px",
                        }}
                      >
                        {item?.englishText?.replace(/(<([^>]+)>)/gi, "")}
                      </p>
                    </td>
                    <td
                      align="left"
                      style={{ padding: "15px", verticalAlign: "top" }}
                    >Admitted</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <p
            style={{
              float: "right",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "18px",
              lineHeight: "26px",
            }}
          >
           (HAFSA FAROOQ)
            <br />
            Section Officer (M)
            <br />
            Ph.051-9201575

          </p>
          <div style={{ clear: "both" }}></div>
          <p>Encl: <span style={{textDecoration:"underline"}}>As above</span></p>
          <p style={{ fontWeight: "bold", textDecoration: "underline" }}>
           Copy for information to:-
          </p>
          <ol style={{ listStylePosition: "inside" }}>
            <li
              style={{
                lineHeight: "28px",
                marginLeft: "10px",
                paddingBottom: "15px",
              }}
            >
             The Director Staff to Secretary, Senate Secretariat, Islamabad.
            </li>
            <li
              style={{
                lineHeight: "22px",
                marginLeft: "10px",
                paddingBottom: "20px",
              }}
            >
              The APS to Joint Secretary (Legis), Senate Secretariat, Islamabad.
            </li>
            <li
              style={{
                lineHeight: "22px",
                marginLeft: "10px",
                paddingBottom: "20px",
              }}
            >
              The Director(IT) Senate Secretariat, Islamabad. (For online transmission to concerned Member)
            </li>
           
          
          </ol>
         
        </div>
      </div>
      {/* </div> */}
      {/* <div className="d-flex justify-content-center align-items-center mt-3">
      <button className="btn btn-primary mx-2" onClick={handleBallotPrint}>Print</button>
    </div> */}
      <div>{children}</div>
    </>
  );
}

export default BallotMotionPdfTemplate;
