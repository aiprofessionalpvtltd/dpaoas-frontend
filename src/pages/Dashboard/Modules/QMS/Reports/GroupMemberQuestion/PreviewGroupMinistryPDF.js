import React from 'react';
import html2pdf from 'html2pdf.js';
import { useLocation } from 'react-router-dom';

const PreviewGroupMinistryPDF = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const encodedJsonString = queryParams.get('state');
    const decodedString = decodeURIComponent(encodedJsonString);
    const responseData = JSON.parse(decodedString); // Renamed to make it clearer
    const data = responseData?.data?.data; // Accessing nested 'data'
    console.log(responseData);

    const handlePrint = () => {
        const element = document.getElementById('template-container');
        const opt = {
            margin: 0.2,
            filename: 'annualReport.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 3 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        };

        html2pdf()
            .set(opt)
            .from(element)
            .toPdf()
            .outputPdf('blob')
            .then((pdfBlob) => {
                const pdfUrl = URL.createObjectURL(pdfBlob);
                const iframe = document.createElement('iframe');
                iframe.style.position = 'fixed';
                iframe.style.width = '100%';
                iframe.style.height = '100%';
                iframe.style.left = '0';
                iframe.style.top = '0';
                iframe.style.zIndex = '-1';
                iframe.style.visibility = 'hidden';
                iframe.src = pdfUrl;

                document.body.appendChild(iframe);

                iframe.onload = () => {
                    iframe.style.visibility = 'visible';
                    iframe.contentWindow.focus();
                    iframe.contentWindow.print();
                    iframe.style.visibility = 'hidden';
                };
            });
    };

    return (
        <div className='bg-white'>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button class="btn btn-primary" type="button" onClick={handlePrint}>
                    Print
                </button>
            </div>
            <div className='bg-white container ' id="template-container">
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <h1 style={{ fontSize: '24px', textTransform: 'uppercase' }}>Senate of Pakistan</h1>
                    <p style={{ fontSize: '18px', fontWeight: 'bold', textTransform: 'uppercase' }}>(Question Branch)</p>
                    <p style={{ fontSize: '18px', fontWeight: 'bold', textTransform: 'uppercase' }}>
                        Ministry Wise Statement of Admitted Starred, Un-Starred and Deferred Questions
                    </p>
                    <p>Session Number: {responseData?.sessions} To 342</p>
                    <p>Report Date: {responseData?.data?.currentDate}</p>
                </div>

                <div>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th style={{ border: '1px solid black', padding: '8px' }}>Sr#</th>
                                <th style={{ border: '1px solid black', padding: '8px' }}>Name of Ministry</th>
                                <th style={{ border: '1px solid black', padding: '8px' }}>Starred Questions</th>
                                <th style={{ border: '1px solid black', padding: '8px' }}>Un-Starred Questions</th>
                                <th style={{ border: '1px solid black', padding: '8px' }}>Short Notice</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((group, groupIndex) => (
                                <React.Fragment key={`group-${groupIndex}`}>
                                    {/* Group name row */}
                                    <tr>
                                        <td colSpan="5" style={{ textAlign: 'center', fontWeight: 'bold', padding: '8px' }}>
                                            {group?.groupName}
                                        </td>
                                    </tr>

                                    {group?.divisions?.map((division, divIndex) => (
                                        <React.Fragment key={`division-${divIndex}`}>
                                            {/* Division name row */}
                                            <tr>
                                                <td colSpan="5" style={{ textAlign: 'left', fontWeight: 'bold', padding: '8px' }}>
                                                    {division?.divisionName}
                                                </td>
                                            </tr>
                                            {/* Category rows */}
                                            <tr>
                                                <td style={{ padding: '8px', textAlign: 'center' }}>
                                                    {divIndex + 1}
                                                </td>
                                                <td style={{ padding: '8px', textAlign: 'left' }}>
                                                    {division?.divisionName}
                                                </td>
                                                <td style={{ padding: '8px', textAlign: 'center' }}>
                                                    {division?.categories?.Starred || 0}
                                                </td>
                                                <td style={{ padding: '8px', textAlign: 'center' }}>
                                                    {division?.categories?.['Un-Starred'] || 0}
                                                </td>
                                                <td style={{ padding: '8px', textAlign: 'center' }}>
                                                    {division?.categories?.['Short Notice'] || 0}
                                                </td>
                                            </tr>
                                        </React.Fragment>
                                    ))}

                                    {/* Total records row for each group */}
                                    <tr style={{ border : "1px solid black"}}>
                                        <td colSpan="2" style={{ padding: '8px', fontWeight: 'bold', textAlign: 'left' }}>
                                            Total:
                                        </td>
                                        <td style={{ padding: '8px', textAlign: 'center' }}>
                                            {group?.total?.categories?.Starred || 0}
                                        </td>
                                        <td style={{ padding: '8px', textAlign: 'center' }}>
                                            {group?.total?.categories?.['Un-Starred'] || 0}
                                        </td>
                                        <td style={{ padding: '8px', textAlign: 'center' }}>
                                            {group?.total?.categories?.['Short Notice'] || 0}
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PreviewGroupMinistryPDF;
