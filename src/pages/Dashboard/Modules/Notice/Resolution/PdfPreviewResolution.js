import React from 'react'
import html2pdf from "html2pdf.js";
import { useLocation } from "react-router-dom";


const PdfPreviewResolution = () => {
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
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <button className="btn btn-primary" type="button" onClick={handlePrint}>
          Print
        </button>
      </div>
      <div id='template-container' style={{ background: '#fff', fontFamily: 'Arial, Helvetica, sans-serif' }}>
        <div className="template" style={{ width: '700px', margin: '0 auto' }}>
          <div className="template-head">
            <h1 style={{ textAlign: 'center', fontSize: '20px', textDecoration: 'underline' }}>
              SENATE OF PAKISTAN
            </h1>
            <p style={{ textAlign: 'center', fontSize: '20px', marginTop: '10px', marginBottom: '10px' }}>
              (Notice Branch)
            </p>
          </div>
          <table style={{ width: '100%' }}>
            <thead>
              <tr>
                <th style={{ padding: '10px', textAlign: 'left' }}>Sr No</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Resolution Diary Number</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Resolution Date</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Resolution Time</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Session Number</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Mover</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Resolution Type</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Description</th>
                {/* <th style={{ padding: '10px', textAlign: 'left' }}>Action Taken</th> */}
              </tr>
            </thead>
            <tbody>
              {data && data.map((item, index) => (
                <tr key={index}>
                  <td style={{ padding: '10px' }}>{item.SrNo}</td>
                  <td style={{ padding: '10px' }}>{item.diaryNumber}</td>
                  <td style={{ padding: '10px' }}>{item.DiaryDate}</td>
                  <td style={{ padding: '10px' }}>{item.diaryTime}</td>
                  <td style={{ padding: '10px' }}>{item.SessionNumber}</td>
                  <td style={{ padding: '10px' }}>{item.memberName}</td>
                  <td style={{ padding: '10px' }}>{item.ResolutionType}</td>
                  <td style={{ padding: '10px' }}>{item.SubjectMatter}</td>
                  {/* <td style={{ padding: '10px' }}>{item.ResolutionStatus}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default PdfPreviewResolution
