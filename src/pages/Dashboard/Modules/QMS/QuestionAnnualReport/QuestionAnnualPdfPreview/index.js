import React from 'react';
import html2pdf from "html2pdf.js";
import { useLocation } from "react-router-dom";

export const AnnualPdf = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const encodedJsonString = queryParams.get("state");
    const decodedString = decodeURIComponent(encodedJsonString);
    const data = JSON.parse(decodedString);
    console.log(data)


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
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button class="btn btn-primary" type="button" onClick={handlePrint}>
                    Print
                </button>
            </div>
            <div id='template-container' style={{ background: '#fff', fontFamily: 'Arial, Helvetica, sans-serif' }}>

                <div className="template" style={{ width: '700px', margin: '0 auto' }}>
                    <div className="template-head">
                        <h1 style={{ textAlign: 'center', fontSize: '20px', textDecoration: 'underline' }}>
                            SENATE SECRETARIAT
                        </h1>
                        <p style={{ textAlign: 'center', fontSize: '20px', marginTop: '10px', marginBottom: '10px' }}>
                            (Questions Branch)
                        </p>
                        <p style={{ textAlign: 'center' }}>*****</p>
                        <p style={{ fontWeight: 'bold', textDecoration: 'underline' }}>
                            STATEMENT SHOWING THE POSITION OF STARRED AND UN-STARRED QUESTIONS AND RESOLUTIONS DURING THE {data?.parlimentryYear}<sup>st</sup> PARLIAMENTARY YEAR ({data?.sessionNames?.fromSessionName}<sup>th</sup> TO {data?.sessionNames?.toSessionName}<sup>th</sup> SESSIONS) TILL DATE.
                        </p>

                    </div>
                    <div className="template-detail">
                        <p style={{ textAlign: 'center', fontWeight: 'bold', marginTop: '25px', textDecoration: 'underline' }}>
                            STARRED QUESTIONS
                        </p>
                        <div style={{ margin: '0 25px' }}>

                            {data?.questionCategoryCounts?.Starred?.questionStatusCounts.map((item, index) => (
                                <div key={index}>
                                    <p style={{ float: 'left', width: '60%', margin: '10px 0' }}>
                                        {item.statusName || item.status}
                                        <span style={{ float: 'right', marginRight: '25px', fontWeight: 'bold' }}>:</span>
                                    </p>
                                    <p style={{ float: 'right', textAlign: 'right', margin: '10px 0' }}>
                                        {item.statusCount}
                                    </p>
                                    <div style={{ clear: 'both' }}></div>
                                </div>
                            ))}

                        </div>
                    </div>


                    <div className="template-detail">
                        <p style={{ textAlign: 'center', fontWeight: 'bold', marginTop: '25px', textDecoration: 'underline' }}>
                            UN - STARRED QUESTIONS
                        </p>
                        <div style={{ margin: '0 25px' }}>
                            {data?.questionCategoryCounts?.['Un-Starred']?.questionStatusCounts?.map((item, index) => (
                                <div key={index}>
                                    <p style={{ float: 'left', width: '60%', margin: '10px 0' }}>
                                        {item.statusName || item.status}
                                        <span style={{ float: 'right', marginRight: '25px', fontWeight: 'bold' }}>:</span>
                                    </p>
                                    <p style={{ float: 'right', textAlign: 'right', margin: '10px 0' }}>
                                        {item.statusCount}
                                    </p>
                                    <div style={{ clear: 'both' }}></div>
                                </div>
                            ))}
                        </div>
                    </div>


                    <div className="template-detail">
                        <p style={{ textAlign: 'center', fontWeight: 'bold', marginTop: '25px', textDecoration: 'underline' }}>
                            RESOLUTIONS
                        </p>
                        <div style={{ margin: '0 25px' }}>
                            {data?.resolutionStatusCounts?.map((item, index) => (
                                <div key={index}>
                                    <p style={{ float: 'left', width: '60%', margin: '10px 0' }}>
                                        {item.statusName.charAt(0).toUpperCase() + item.statusName.slice(1)}
                                        <span style={{ float: 'right', marginRight: '25px', fontWeight: 'bold' }}>:</span>
                                    </p>
                                    <p style={{ float: 'right', textAlign: 'right', margin: '10px 0' }}>
                                        {item.statusCount}
                                    </p>
                                    <div style={{ clear: 'both' }}></div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};
