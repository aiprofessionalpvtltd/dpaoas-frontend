export const handlePreviewNotingDoc = (pdfData) => {
  const newTab = window.open("", "_blank");

  if (newTab) {
    const tableRows = pdfData
      .map(
        (item, index) => `
        <tr>
          <td style="padding: 8px; font-size:12px">${item?.SrNo}</td>
          <td style="padding: 8px; font-size:12px">${item?.SessionNumber}</td>
          <td style="padding: 8px; font-size:12px">${
            item?.noticeOfficeDiaryNo
          }</td>
          <td style="padding: 8px; font-size:11px">${item?.NoticeDate}</td>
          <td style="padding: 8px; font-size:11px">${item?.NoticeTime}</td>
          <td style="padding: 8px; font-size:12px">${item?.SubjectMatter}</td>
          <td style="padding: 8px; font-size:12px">${item?.Category}</td>
          <td style="padding: 8px; font-size:12px">${
            item?.questionStatus || "---"
          }</td>
        </tr>`
      )
      .join("");

    newTab.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Print Preview</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
            margin: 0;
            background-color: white;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          @page {
            size: A4 portrait;
            margin: 10mm;
          }
          @media print {
            html, body {
              height: 100%;
              margin: 0 !important;
              padding: 0 !important;
            }
            .template {
              page-break-inside: avoid;
              margin: 0;
              padding: 0;
              width: 100%;
            }
            .template-head h1, .template-head p {
              font-size: 12pt;
            }
            .template-head {
              margin: 0;
              padding: 0;
            }
            .template-head div {
              margin: 0;
              padding: 0;
            }
            .template-head p {
              margin: 0;
              padding: 0;
            }
            table {
              page-break-inside: auto;
            }
            tr {
              page-break-inside: avoid;
              page-break-after: auto;
            }
            thead {
              display: table-header-group;
            }
            tfoot {
              display: table-footer-group;
            }
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 0;
            padding: 0;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 8px;
          }
          th {
            background-color: #f4f4f4;
            text-align: left;
          }
        </style>
      </head>
      <body>
        <div class="template">
          <div class="template-head">
            <h1 style="text-align: center; font-size: 20px; text-decoration: underline;">
              SENATE OF PAKISTAN
            </h1>
            <p style="text-align: center; font-size: 20px; margin: 10px 0;">
              (Question Branch) / Questions
            </p>
          </div>
          <table>
            <thead>
              <tr>
                <th>Sr No</th>
                <th>Session Number</th>
                <th>Notice Office Diary No</th>
                <th>Notice Date</th>
                <th>Notice Time</th>
                <th>Subject Matter</th>
                <th>Category</th>
                <th>Question Status</th>
              </tr>
            </thead>
            <tbody>
              ${tableRows}
            </tbody>
          </table>
        </div>
        <script>
          window.onload = () => {
            window.print();
            window.onafterprint = () => window.close();
          };
        </script>
      </body>
      </html>
    `);

    newTab.document.close();
  } else {
    alert("Unable to open new tab. Please allow pop-ups for this site.");
  }
}