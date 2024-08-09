import React, { useEffect, useState } from "react";
import html2pdf from "html2pdf.js";
import { useLocation } from "react-router-dom";
import { getMotionByID } from "../../api/APIs/Services/Motion.service";
import { showErrorMessage } from "../../utils/ToastAlert";
import moment from "moment";

function MotionPreviewPDF() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const encodedJsonString = queryParams.get("state");
  const motionId = decodeURIComponent(encodedJsonString);

  const [data, setData] = useState(null);

  const getSingleMotionDetail = async () => {
    try {
      const response = await getMotionByID(motionId);
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
    getSingleMotionDetail();
  }, [motionId]);

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
            ({data && data?.motionType})
          </h2>
          <div style={{ float: "right" }} className="row">
            <div className="col">
              <p>File Number:</p>
            </div>
            <div className="col">
              <p>{data && data?.fileNumber}</p>
            </div>
          </div>
          <div style={{ float: "left" }} className="row">
            <div className="col">
              <p style={{ marginTop: "33px" }}>SESSION NO / MID:</p>
            </div>
            <div className="col">
              <p style={{ marginTop: "33px" }}>{`${
                data && data?.sessions?.sessionName
              }/${data && data?.id}`}</p>
            </div>
            <div className="col">
              <p style={{ marginTop: "33px" }}>MOTION WEEK:</p>
            </div>
            <div className="col">
              <p style={{ marginTop: "33px" }}>
                {data && data?.motionWeek ? data?.motionWeek : "--"}
              </p>
            </div>
          </div>
          <div style={{ float: "left" }} className="row">
            <div className="col">
              <p style={{ marginTop: "33px" }}>NOTICE RECEIVED ON:</p>
            </div>
            <div className="col">
              <p style={{ marginTop: "33px" }}>
                {data &&
                  moment(
                    data?.noticeOfficeDairies?.noticeOfficeDiaryDate
                  ).format("DD/MM/YYYY")}
              </p>
            </div>
            <div className="col">
              <p style={{ marginTop: "33px" }}>STATUS:</p>
            </div>
            <div className="col">
              <p style={{ marginTop: "33px" }}>
                {data && data?.motionStatuses?.statusName}
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
            {data && data?.motionMovers[0]?.members?.memberName}
          </p>
          <div style={{ clear: "both" }}></div>
        </div>
      </div>
    </>
  );
}

export default MotionPreviewPDF;
