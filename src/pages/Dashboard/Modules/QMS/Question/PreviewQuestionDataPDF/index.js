import React, { useEffect, useState } from "react";
import html2pdf from "html2pdf.js";
import { useLocation } from "react-router-dom";
import moment from "moment";
import { showErrorMessage } from "../../../../../../utils/ToastAlert";
import { getAllQuestionByID } from "../../../../../../api/APIs/Services/Question.service";

function QuestionDataPreviewPDF() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const encodedJsonString = queryParams.get("state");
  const questionId = decodeURIComponent(encodedJsonString);

  const [data, setData] = useState(null);

  const getQuestionAPi = async () => {
    try {
      const { question } = await getAllQuestionByID(questionId);
      if (question?.success) {
        setData(question?.data);
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
    getQuestionAPi();
  }, [questionId]);
  console.log("data?.session?.sessionName", data);

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
          width: "80%",
          margin: "0 auto",
          fontFamily: "Times New Roman, Times, serif",
          color: "#000",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <h2 style={{ fontSize: "1.8rem", marginBottom: "5px" }}>
            SENATE OF PAKISTAN
          </h2>
          <h3 style={{ fontSize: "1.2rem", marginBottom: "10px" }}>
            (Question Branch)
          </h3>
          <p style={{ fontSize: "1rem", fontWeight: "bold" }}>
            SESSION NO: {data && data?.session?.sessionName}
          </p>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <div style={{ textAlign: "right" }}>
            <p style={{ margin: "5px 0", fontSize: "1rem" }}>
              <strong>Diary No:</strong> {data && data?.questionDiary?.questionDiaryNo}
            </p>
            <p style={{ margin: "5px 0", fontSize: "1rem" }}>
              <strong>Group No:</strong>{data && data?.groups?.groupNameStarred}
            </p>
            <p style={{ margin: "5px 0", fontSize: "1rem" }}>
              <strong>QID:</strong> {data && data?.id}
            </p>
          </div>
          <div>
            <p style={{ margin: "5px 0", fontSize: "1rem" }}>
              <strong>NOTICE DATE/TIME:</strong>{" "}
              {data &&
                moment(data?.noticeOfficeDiary?.noticeOfficeDiaryDate).format(
                  "DD/MM/YYYY"
                )}{" "}
              at {data?.noticeOfficeDiary?.noticeOfficeDiaryTime}
            </p>
            <p style={{ margin: "5px 0", fontSize: "1rem" }}>
              <strong>MIN/DIV/DEPTT:</strong> OVERSEAS PAKISTANIS AND HUMAN
              RESOURCE DEVELOPMENT DIVISION
            </p>
            <p style={{ margin: "5px 0", fontSize: "1rem" }}>
              <strong>STATUS:</strong>{" "}
              {data && data?.questionStatus?.questionStatus}
            </p>
          </div>
        </div>

        <div style={{ marginTop: "30px" }}>
          <h3
            style={{
              fontSize: "1.2rem",
              marginBottom: "15px",
              fontWeight: "bold",
            }}
          >
            *{data && data?.member?.memberName}
          </h3>
          <div dangerouslySetInnerHTML={{ __html: data?.englishText }} />
        </div>
      </div>
    </>
  );
}

export default QuestionDataPreviewPDF;
