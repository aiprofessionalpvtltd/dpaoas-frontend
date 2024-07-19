import React from "react";
import html2pdf from 'html2pdf.js';

function BallotResolutionPdfTemplate({data, children}) {
  
  const handleBallotPrint = () => {
    const element = document.getElementById('template-container');
    const opt = {
      margin: 0.2,
      filename: 'ResolutionBallot.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 3 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
  
    html2pdf().set(opt).from(element).toPdf().outputPdf('blob').then((pdfBlob) => {
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
    // <AuthProvider>
    //   <NavigationRoutes />
    // </AuthProvider>
    <>
     <div class="row mb-2 mt-5" style={{marginRight:"20px"}}>
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
    {/* <div style={{  }}> */}
      <div id="template-container" style={{  fontFamily: 'Arial, Helvetica, sans-serif', width: '700px',paddingRight:"50px", margin: '0 auto' }}>
      <div className="template-head">
      <h1 style={{ textAlign: 'center', fontSize: '20px', textDecoration: 'underline' }}>SENATE SECRETARIAT</h1>
      <div style={{ float: 'left' }}>
        <p style={{ marginTop: '33px' }}>No. F.2(1)/2023-Q</p>
      </div>
      <div style={{ float: 'right' }}>
        <p style={{ marginTop: '33px' }}>Islamabad, the 3<sup>rd</sup> July, 2024</p>
      </div>
      <div style={{ clear: 'both' }}></div>
      <p>To</p>
      <div style={{ clear: 'both' }}></div>
      <p style={{ marginLeft: '100px', lineHeight: '26px' }}>All Members,<br />Senate of Pakistan</p>
      <p style={{ fontWeight: 'bold', marginBottom: '30px' }}>
        Subject:-
        <span style={{ marginLeft: '25px', textDecoration: 'underline', marginBottom: '35px' }}>
          BALLOT OF PRIVATE MEMBER'S RESOLUTIONS
        </span>
      </p>
      <p>Dear Madam/Sir,</p>
      <p style={{ marginLeft: '110px', lineHeight: '26px' }}>
        I am directed to inform you that the following Private Member's Resolution will be set down in the Orders of
        the Day for the sitting of the Senate to be held on Monday, the 8<sup>th</sup> July, 2024, which will be a
        Private Member's Day:-
      </p>
      <div className="clearfix"></div>
    </div>
    <div className="template-detail">
      <table style={{ borderSpacing: '0', borderCollapse: 'separate', width:"100%" }}>
        <thead>
          <tr>
            <th align="center" style={{ backgroundColor: '#acacac' }}>S#</th>
            <th align="center" style={{ background: '#acacac' }}>NAME OF MOVER</th>
            <th align="center" style={{ background: '#acacac' }}>CONTENT OF RESOLUTION</th>
          </tr>
        </thead>
        <tbody>
            {data && data?.map((item, index) => (
               <tr>
               <td align="left" style={{ padding: '15px', verticalAlign: 'top' }}>{`${index + 1}`}</td>
               <td align="left" style={{ padding: '15px', verticalAlign: 'top' }}>{item?.resolutionMoversAssociation[0]?.memberAssociation?.memberName}</td>
               <td align="left" style={{ padding: '15px' }}>
                 <p style={{ margin: '0', textAlign: 'justify', lineHeight: '26px', paddingBottom:"11px" }}>
                   {item?.englishText?.replace(/(<([^>]+)>)/gi, "")}
                 </p>
               </td>
             </tr> 
            ))}
        </tbody>
      </table>
      <p style={{ float: 'right', textAlign: 'center', fontWeight: 'bold', fontSize: '18px',lineHeight:"26px", }}>
        Syed Hasnain Haider<br />
        Secretary
      </p>
      <div style={{ clear: 'both' }}></div>
      <p style={{ fontWeight: 'bold', textDecoration: 'underline' }}>
        Copy forwarded for information and necessary action to:-
      </p>
      <ol style={{ listStylePosition: 'inside' }}> 
        <li style={{ lineHeight: '28px', marginLeft: '10px',paddingBottom:"15px" }}>
          Secretaries Ministry of Federal Education and Professional Training and Ministry of National Health
          Services, Regulations and Coordination with a request to depute an officer not below the rank of Joint
          Secretary of the Ministry/Division dealing with the subject matter of these Resolution to attend the
          proceedings of the Sitting of the Senate. They are also requested to send a copy of the brief on the
          Resolution, relating to their Ministry/Division, to the office of the Leader of the House in the Senate
          before commencement of the Session.
        </li>
        <li style={{ lineHeight: '22px', marginLeft: '10px',paddingBottom:"15px" }}>
          The Director Staff, Leader of the House, Senate Secretariat, Islamabad.
        </li>
        <li style={{ lineHeight: '22px', marginLeft: '10px',paddingBottom:"15px" }}>
          The Director Staff to the Secretary Senate, Senate Secretariat, Islamabad.
        </li>
        <li style={{ lineHeight: '22px', marginLeft: '10px',paddingBottom:"15px" }}>
          The Joint Secretary (Legis), Senate Secretariat, Islamabad.
        </li>
        <li style={{ lineHeight: '22px', marginLeft: '10px',paddingBottom:"15px" }}>
          The Section Officer (Council), Ministry of Federal Education and Professional Training, Islamabad.
        </li>
        <li style={{ lineHeight: '22px', marginLeft: '10px',paddingBottom:"15px" }}>
          The Section Officer (Council), Ministry of National Health Services, Regulations and Coordination,
          Islamabad.
        </li>
        <li style={{ lineHeight: '22px', marginLeft: '10px',paddingBottom:"15px" }}>
          The Assistant Secretary (Council), Ministry of Parliamentary Affairs, Islamabad.
        </li>
        <li style={{ lineHeight: '22px', marginLeft: '10px',paddingBottom:"15px" }}>
          Personal Secretary to the Minister for Parliamentary Affairs / Minister In charge of the Prime Minister’s
          Office Public Affairs and Grievances Wing, ”R” Block Pak-Secretariat, Islamabad.
        </li>
        <li style={{ lineHeight: '22px', marginLeft: '10px',paddingBottom:"15px" }}>The Legislation Branch, Senate Secretariat, Islamabad.</li>
        <li style={{ lineHeight: '22px', marginLeft: '10px',paddingBottom:"15px" }}>
          Director to (IT), Senate Secretariat, Islamabad. (With a request for online transmission to all Members of the
          Senate)
        </li>
      </ol>
      <p style={{ borderBottom: 'dotted 4px', width: '100%', marginTop: '20px' }}></p>
    </div>
      </div>
    {/* </div> */}
    {/* <div className="d-flex justify-content-center align-items-center mt-3">
      <button className="btn btn-primary mx-2" onClick={handleBallotPrint}>Print</button>
    </div> */}
    <div>
        {children}
    </div>
  </>
  );
}

export default BallotResolutionPdfTemplate;