import React from 'react'
import html2pdf from "html2pdf.js";
import { useLocation } from "react-router-dom";

const MiscelleneousPDFPreview = () => {
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
            <div className="d-grid gap-2 d-md-flex justify-content-md-end " style={{ width: "100%", background: "white" }}>
                <button className="btn btn-primary me-5 mt-3" type="button" onClick={handlePrint}>
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
                            (Motion Branch)
                        </p>
                    </div>

                    <div>
                        <div>
                            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                                <thead>
                                    <tr style={{}}>
                                        <th style={{ padding: '12px', textAlign: 'left', width: '40%' }}>Senator Name</th>
                                        <th style={{ padding: '12px', textAlign: 'left', width: '40%' }}>Motion Type</th>
                                        <th style={{ padding: '12px', textAlign: 'left', width: '20%' }}>Total Counts</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.senatorData &&
                                        Object.entries(data.senatorData).map(([motionType, senators], index) => (
                                            Object.entries(senators).map(([senatorName, count], idx) => (
                                                <tr key={`${index}-${idx}`} style={{}}>
                                                    <td style={{ padding: '12px' }}>{senatorName}</td>
                                                    <td style={{ padding: '12px' }}>{motionType}</td>
                                                    <td style={{ padding: '12px', textAlign: 'center' }}>{count}</td>
                                                </tr>
                                            ))
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>

                    </div>

                    <div>
                        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                            <thead>
                                <tr style={{}}>
                                    <th style={{ padding: '12px', textAlign: 'left', width: '15%' }}>Sr. No.</th>
                                    <th style={{ padding: '12px', textAlign: 'left', width: '15%' }}>MID No. & Date</th>
                                    <th style={{ padding: '12px', textAlign: 'left', width: '25%' }}>SUBJECT</th>
                                    <th style={{ padding: '12px', textAlign: 'left', width: '25%' }}>Remarks / Reasons</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.data && data?.data?.map((item, index) => (
                                    <tr key={index} style={{}}>
                                        <td style={{ padding: '12px' }}>{item.id}</td>
                                        <td style={{ padding: '12px', alignItems:'center' , justifyContent:'center'}}>{`(${item?.fileNumber})`}<br />{item.createdAt}</td>
                                        <td style={{ padding: '12px' , width: '35%'}}>{item.englishText}</td>
                                        <td style={{ padding: '12px' }}>{item.motionStatus}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MiscelleneousPDFPreview
