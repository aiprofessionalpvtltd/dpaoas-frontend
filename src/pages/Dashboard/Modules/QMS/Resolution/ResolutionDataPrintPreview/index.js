import React, { useEffect, useState } from "react";
import html2pdf from "html2pdf.js";
import { useLocation } from "react-router-dom";
import moment from "moment";
import { showErrorMessage } from "../../../../../../utils/ToastAlert";
import { getResolutionBYID } from "../../../../../../api/APIs/Services/Resolution.service";

function ResolutionDataPreview() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const encodedJsonString = queryParams.get("state");
  const resolutionID = decodeURIComponent(encodedJsonString);

  const [data, setData] = useState(null);

  const getSingleResolutionDetail = async () => {
    try {
      const response = await getResolutionBYID(resolutionID);
      if (response?.success) {
        setData(response?.data);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const handlePrint = () => {
    const element = document.getElementById("template-container");
    const opt = {
      margin: 0.2,
      filename: "motion.pdf",
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

  useEffect(() => {
    getSingleResolutionDetail();
  }, [resolutionID]);

  return (
    <>
      <div class="row mb-2 mt-5" style={{ marginRight: "20px" }}>
        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
          <button class="btn btn-primary" type="button" onClick={handlePrint}>
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
          <h2
            style={{
              textAlign: "center",
              fontSize: "20px",
            }}
          >
            (RESOLUTION)
          </h2>
          
          <div style={{clear:"both"}}>

          </div>
          <div style={{ float: "left", width:"50%" }}>
            <div style={{float:"left", width:"165px"}}>
              <p style={{ marginTop: "33px", fontSize:"14px", fontWeight:"bold" }}>SESSION NO / MID:</p>
            </div>
            <div style={{float:"left"}}>
              <p style={{ marginTop: "33px", fontSize:"14px", fontWeight:"bold"  }}>{`${
                data && data?.session?.sessionName
              }/${data && data?.id}`}</p>
            </div>
            <div style={{float:"left", width:"165px"}}>
              <p style={{ marginTop: "33px", fontSize:"14px", fontWeight:"bold" }}>NOTICE RECEIVED ON:</p>
            </div>
            <div style={{float:"left"}}>
              <p style={{ marginTop: "33px", fontSize:"14px", fontWeight:"bold" }}>
                {data &&
                  moment(
                    data?.noticeDiary?.noticeOfficeDiaryDate
                  ).format("DD/MM/YYYY")}
              </p>
            </div>
            
          </div>
          <div style={{ float: "left", width:"50%" }}>
           <div style={{float:"left", width:"190px"}}>
              <p style={{ marginTop: "33px", fontSize:"14px", fontWeight:"bold" }}>R.D.NO:</p>
            </div>
            <div style={{float:"left"}}>
              <p style={{ marginTop: "33px", fontSize:"14px", fontWeight:"bold" }}>
                {data && data?.resolutionDiaries ? data?.resolutionDiaries?.resolutionDiaryNo : "--"}
              </p>
            </div>
           <div style={{float:"left", width:"120px", fontWeight:"bold"}}>
              <p style={{ marginTop: "33px", fontSize:"14px" }}>STATUS:</p>
            </div>
            <div style={{float:"left"}}>
              <p style={{ marginTop: "33px", fontSize:"14px", fontWeight:"bold" }}>
                {data && data?.resolutionStatus?.resolutionStatus}
              </p>
            </div>
            
          </div>
          <div style={{ clear: "both" }}></div>
          <p style={{ lineHeight: "26px" }}>
            "{data && data?.englishText?.replace(/(<([^>]+)>)/gi, "")}"
          </p>
          <div className="clearfix"></div>
        </div>
        <div className="template-detail">
          <p
            style={{
              float: "right",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "18px",
              lineHeight: "26px",
            }}
          >
            {data && data?.resolutionMoversAssociation[0]?.memberAssociation?.memberName}
          </p>
          <div style={{ clear: "both" }}></div>
        </div>
      </div>
    </>
  );
}

export default ResolutionDataPreview;
