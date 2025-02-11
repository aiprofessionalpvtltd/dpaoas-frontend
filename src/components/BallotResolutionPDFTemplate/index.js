import React, { useEffect } from "react";
import html2pdf from "html2pdf.js";
import { allballotResolutionTemplate } from "../../api/APIs/Services/Resolution.service";
import { showErrorMessage } from "../../utils/ToastAlert";

function BallotResolutionPdfTemplate({ data }) {
  const [templateData, setTemplateData] = React.useState([]);

  const handleBallotPrint = () => {
    const element = document.getElementById("template-container");
    const opt = {
        margin: 0, // Adjust margin
        filename: "ResolutionBallot.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 4 }, // Increase scale
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
  const handleTemplate = async () => {
    try {
      const response = await allballotResolutionTemplate();
      if (response?.success) {
        setTemplateData(response?.data?.templates);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };




  useEffect(() => {
    handleTemplate();
  }, []);
  return (
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
            <p style={{ marginTop: "33px" }}>No. {templateData?.length > 0 && templateData[0]?.ballotingFileNo}</p>
          </div>
          <div style={{ float: "right" }}>
            <p style={{ marginTop: "33px" }}>
              Islamabad, the {templateData?.length > 0 && templateData[0]?.ballotingDate}
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
              BALLOT OF PRIVATE MEMBER'S RESOLUTIONS
            </span>
          </p>
          <p>Dear Madam/Sir,</p>
          <p style={{ marginLeft: "110px", lineHeight: "26px" }}>
            I am directed to inform you that the following Private Member's
            Resolution will be set down in the Orders of the Day for the sitting
            of the Senate to be held on Monday, the {templateData?.length > 0 && templateData[0]?.ballotingOrderDate},
            which will be a Private Member's Day:-
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
                <th align="center" style={{ backgroundColor: "#acacac" }}>
                  S#
                </th>
                <th align="center" style={{ background: "#acacac" }}>
                  NAME OF MOVER
                </th>
                <th align="center" style={{ background: "#acacac" }}>
                  CONTENT OF RESOLUTION
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
                      align="left"
                      style={{ padding: "15px", verticalAlign: "top" }}
                    >
                      {
                        item?.resolutionMoversAssociation[0]?.memberAssociation
                          ?.memberName
                      }
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
            {templateData?.length > 0 && templateData[0]?.templateUserName}
            <br />
            {templateData?.length > 0 && templateData[0]?.templateUserRole}
          </p>
          <div style={{ clear: "both" }}></div>
          <p style={{ fontWeight: "bold", textDecoration: "underline" }}>
            Copy forwarded for information and necessary action to:-
          </p>
          <div
            dangerouslySetInnerHTML={{
              __html:
                templateData?.length > 0 &&
                templateData[0]?.templateDescription,
            }}
          />
          <p
            style={{
              borderBottom: "dotted 4px",
              width: "100%",
              marginTop: "20px",
            }}
          ></p>
        </div>
      </div>
    </>
  );
}

export default BallotResolutionPdfTemplate;
