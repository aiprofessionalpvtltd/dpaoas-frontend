import html2pdf from "html2pdf.js";
import { Modal } from "react-bootstrap";
import React, { useRef } from "react";
import PreviewOrderOfDay from "../../../../pages/Dashboard/Modules/LGMS/OrderOfTheDay/PreviewOrderOfData";
import {
  createOrderOfTheDay,
  updateOrderOfTheDay,
} from "../../../../api/APIs/Services/Legislation.service";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../utils/ToastAlert";
import { useNavigate } from "react-router-dom";

function PDFOrderOfDayModel({
  showModal,
  closeModal,
  selectedTabData,
  session,
  formatedData,
  startTime,
  isMondayCheckBoxChecked,
  sittingId,
  isView,
  isEdit,
  OrderOfTheDayID,
}) {
  const navigate = useNavigate();
  const contentRef = useRef(null); // Reference to capture PDF content

  // Function to generate PDF
  const handleDownloadPDF = () => {
    const element = contentRef.current;
    html2pdf()
      .from(element)
      .set({
        margin: [10, 10, 10, 10],
        filename: "OrderOfDay.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: {
          orientation: "portrait",
          unit: "mm",
          format: "a4",
          compressPDF: true,
        },
      })
      .save();
  };

  // Create Order of the Day
  const hendleCreateOrderOfTheDay = async () => {
    const Data = {
      fkSessionId: session,
      sittingId: sittingId,
      sittingDate: formatedData,
      sittingTime: startTime,
      isMonday: isMondayCheckBoxChecked,
      content: selectedTabData,
    };
    try {
      const response = await createOrderOfTheDay(Data);
      if (response?.success) {
        showSuccessMessage(response?.message);
        localStorage.removeItem("billData");
        setTimeout(() => {
          navigate("/lgms/dashboard/order-of-the-day/list");
        }, 1000);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  // Create Order of the Day
  const handleUpdateOrderOfDay = async () => {
    const Data = {
      fkSessionId: session,
      sittingId: sittingId,
      sittingDate: formatedData,
      sittingTime: startTime,
      isMonday: isMondayCheckBoxChecked,
      content: selectedTabData,
    };
    try {
      const response = await updateOrderOfTheDay(OrderOfTheDayID, Data);
      if (response?.success) {
        showSuccessMessage(response?.message);
        localStorage.removeItem("billData");
        setTimeout(() => {
          navigate("/lgms/dashboard/order-of-the-day/list");
        }, 1000);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  return (
    <>
      <Modal show={showModal} onHide={closeModal} size="xl" centered>
        <div>
          <Modal.Header
            closeButton
            style={{
              backgroundColor: "#007236",
              color: "#ffffff",
              padding: "15px",
            }}
          >
            <Modal.Title style={{ fontSize: "1rem", fontWeight: "bold" }}>
              Preview Order of Day
            </Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{ padding: 20, maxHeight: "75vh", overflowY: "auto" }}
          >
            <div>
              <PreviewOrderOfDay
                selectedTabData={selectedTabData}
                session={session}
                formatedData={formatedData}
                startTime={startTime}
                isMondayCheckBoxChecked={isMondayCheckBoxChecked}
                contentRef={contentRef}
              />
            </div>
          </Modal.Body>

          <Modal.Footer>
            {isView ? (
              <div>
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={closeModal}
                  style={{ marginRight: "10px" }}
                >
                  Close
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleDownloadPDF} // Download PDF on click
                >
                  Download PDF
                </button>
              </div>
            ) : (
              <div>
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={closeModal}
                  style={{ marginRight: "10px" }}
                >
                  Close
                </button>
                {isEdit === true ? (
                  <button
                    className="btn btn-primary"
                    onClick={handleUpdateOrderOfDay}
                  >
                    Update
                  </button>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={hendleCreateOrderOfTheDay}
                  >
                    Publish
                  </button>
                )}
              </div>
            )}
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
}

export default PDFOrderOfDayModel;

// import { Modal } from "react-bootstrap";
// import React from "react";
// import PreviewOrderOfDay from "../../../../pages/Dashboard/Modules/LGMS/OrderOfTheDay/PreviewOrderOfData";
// import { createOrderOfTheDay } from "../../../../api/APIs/Services/Legislation.service";
// import {
//   showErrorMessage,
//   showSuccessMessage,
// } from "../../../../utils/ToastAlert";
// import { useNavigate } from "react-router-dom";

// function PDFOrderOfDayModel({
//   showModal,
//   closeModal,
//   selectedTabData,
//   session,
//   formatedData,
//   startTime,
//   isMondayCheckBoxChecked,
//   sittingId,
//   isView,
// }) {
//   const navigate = useNavigate();
//   //Create
//   const hendleCreateOrderOfTheDay = async () => {
//     const Data = {
//       fkSessionId: session,
//       sittingId: sittingId,
//       sittingDate: formatedData,
//       sittingTime: startTime,
//       isMonday: isMondayCheckBoxChecked,
//       content: selectedTabData,
//     };
//     try {
//       const response = await createOrderOfTheDay(Data);
//       if (response?.success) {
//         showSuccessMessage(response?.message);
//         localStorage.removeItem("billData");
//         setTimeout(() => {
//           navigate("/lgms/dashboard/order-of-the-day/list");
//         }, 1000);
//       }
//     } catch (error) {
//       showErrorMessage(error?.response?.data?.message);
//     }
//   };

//   return (
//     <>
//       <Modal show={showModal} onHide={closeModal} size="xl" centered>
//         <div>
//           <Modal.Header
//             closeButton
//             style={{
//               backgroundColor: "#007236",
//               color: "#ffffff",
//               padding: "15px",
//             }}
//           >
//             <Modal.Title style={{ fontSize: "1rem", fontWeight: "bold" }}>
//               Preview Order of Day
//             </Modal.Title>
//           </Modal.Header>
//           <Modal.Body
//             style={{ padding: 20, maxHeight: "75vh", overflowY: "auto" }}
//           >
//             <PreviewOrderOfDay
//               selectedTabData={selectedTabData}
//               session={session}
//               formatedData={formatedData}
//               startTime={startTime}
//               isMondayCheckBoxChecked={isMondayCheckBoxChecked}
//             />
//           </Modal.Body>

//           <Modal.Footer>
//             {isView ? (
//               <div>
//                 <button
//                   className="btn btn-primary"
//                   type="button"
//                   onClick={() => closeModal()}
//                   style={{ marginRight: "10px" }}
//                 >
//                   Close
//                 </button>
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => window.print()}
//                   // disabled={loading} // Disable while loading
//                 >
//                   Print
//                 </button>
//               </div>
//             ) : (
//               <div>
//                 <button
//                   className="btn btn-primary"
//                   type="button"
//                   onClick={() => closeModal()}
//                   style={{ marginRight: "10px" }}
//                 >
//                   Close
//                 </button>
//                 <button
//                   className="btn btn-primary"
//                   onClick={hendleCreateOrderOfTheDay}
//                   // disabled={loading} // Disable while loading
//                 >
//                   Publish
//                 </button>
//               </div>
//             )}
//           </Modal.Footer>
//         </div>
//       </Modal>
//     </>
//   );
// }

// export default PDFOrderOfDayModel;
