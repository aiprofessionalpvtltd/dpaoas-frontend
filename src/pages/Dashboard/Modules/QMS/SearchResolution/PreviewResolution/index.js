import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import html2pdf from "html2pdf.js";

function PreviewResolutionList() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const encodedJsonString = queryParams.get('state');
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);

  useEffect(() => {
    if (encodedJsonString) {
      try {
        const stateData = JSON.parse(decodeURIComponent(encodedJsonString));
        const transformedData = transformData(stateData);
        setData(transformedData);
        // Generate headers based on all fields in the transformed data
        const allHeaders = transformedData.reduce((acc, item) => {
          Object.keys(item).forEach(key => {
            if (!acc.includes(key)) {
              acc.push(key);
            }
          });
          return acc;
        }, []);
        setHeaders(allHeaders);
      } catch (error) {
        console.error("Failed to parse state data:", error);
      }
    }
  }, [encodedJsonString]);

  const transformData = (apiData) => {
    return apiData.map((res, index) => {
      const subjectMatter = [res?.englishText, res?.urduText]
        .filter(Boolean)
        .join(", ");
      const cleanedSubjectMatter = subjectMatter.replace(/(<([^>]+)>)/gi, "");
      const movers =
        res?.resolutionMoversAssociation?.map(
          (item) => item?.memberAssociation?.memberName
        ) || [];

      const transformedItem = {
        id: res.id,
      };

      const createdBy = res?.createdBy
        ? `${res?.createdBy?.employee?.firstName} ${res?.createdBy?.employee?.lastName}`
        : "--";

      if (createdBy !== "--") {
        transformedItem.createdBy = createdBy;
      }

      if (res.session?.sessionName) {
        transformedItem.sessionName = res.session.sessionName;
      }
      if (res.resolutionType) {
        transformedItem.resolutionType = res.resolutionType;
      }
      if (cleanedSubjectMatter) {
        transformedItem.englishText = cleanedSubjectMatter;
      }
      if (res.noticeDiary?.noticeOfficeDiaryNo) {
        transformedItem.noticeOfficeDiaryNo = res.noticeDiary.noticeOfficeDiaryNo;
      }
      if (res.resolutionStatus?.resolutionStatus) {
        transformedItem.resolutionStatus = res.resolutionStatus.resolutionStatus;
      }
      if (movers.length) {
        transformedItem.memberName = movers.join(", ");
      }
      if (res.memberPosition) {
        transformedItem.memberPosition = res.memberPosition;
      }
      if (res.deletedBy?.employee) {
        transformedItem.deletedByUser = `${res.deletedBy.employee?.firstName} ${res.deletedBy.employee?.lastName}`;
      }
      if (res.description) {
        transformedItem.description = res.description;
      }
      if (res.resolutionActive) {
        transformedItem.Status = res.resolutionActive;
      }

      return transformedItem;
    });
  };

  const handleBallotPrint = () => {
    const element = document.getElementById("template-container");
    const opt = {
      margin: 0.2,
      filename: "ResolutionBallot.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 3 },
      jsPDF: { unit: "in", format: "letter", orientation: "landscape" },
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
    <div style={{ padding: "0 15px" }}>
      <div className="row mb-2 mt-5" style={{ marginRight: "20px" }}>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleBallotPrint}
          >
            Print
          </button>
        </div>
      </div>
      <div id="template-container">
        <table className="table table-bordered" style={{ width: "100%" }}>
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index} scope="col" style={{ fontSize: "14px", textAlign: "center" }}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {headers.map((header, colIndex) => (
                  <td key={colIndex} align="center">
                    {row[header]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PreviewResolutionList;
