import React, { useEffect, useRef, useState } from "react";
import WebViewer from "@pdftron/webviewer";
import { Spinner } from "react-bootstrap";

const licenseKey =
  "demo:1710315599744:7f3f2bf203000000007ceec613797302897452e5d72a3562de77a0d7ca"; // Replace with your actual license key

const WebviewEditor = ({ docUrl }) => {
  const viewer = useRef(null);
  const [loading, setLoading] = useState(true); // State for loading spinner

  useEffect(() => {
    const callView = async () => {
      try {
        const instance = await WebViewer(
          {
            path: "/webviewer/lib",
            licenseKey: licenseKey,
          },
          viewer.current
        );

        if (instance) {
          instance.UI.loadDocument(docUrl);

          // Hide spinner when document is loaded
          instance.Core.documentViewer.addEventListener(
            "documentLoaded",
            () => {
              setLoading(false); // Hide the spinner
              const { annotationManager, Annotations } = instance.Core;

              // Example: Add an annotation when the document loads
              const rectangleAnnot = new Annotations.RectangleAnnotation({
                PageNumber: 1,
                X: 100,
                Y: 150,
                Width: 400,
                Height: 600,
                Author: annotationManager.getCurrentUser(),
              });

              annotationManager.addAnnotation(rectangleAnnot);
              annotationManager.redrawAnnotation(rectangleAnnot);
            }
          );
        } else {
          console.error("WebViewer instance is invalid.");
        }
      } catch (error) {
        console.error("Error loading WebViewer:", error);
      }
    };

    callView();
  }, [docUrl]);

  return (
    <div style={{ position: "relative", height: "600px" }}>
      {loading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
          }}
        >
          <Spinner />
        </div>
      )}
      <div
        id="viewer"
        className="webviewer"
        ref={viewer}
        style={{ height: "100%" }}
      ></div>
    </div>
  );
};

export default WebviewEditor;

// import React, { useEffect, useRef } from "react";
// import WebViewer from "@pdftron/webviewer";

// const licenseKey =
//   "demo:1710315599744:7f3f2bf203000000007ceec613797302897452e5d72a3562de77a0d7ca"; // Replace with your actual license key

// const WebviewEditor = ({ docUrl }) => {
//   const viewer = useRef(null);

//   useEffect(() => {
//     const callView = async () => {
//       try {
//         const instance = await WebViewer(
//           {
//             path: "/webviewer/lib",
//             licenseKey: licenseKey,
//             // enableOfficeEditing: true,
//           },
//           viewer.current
//         );

//         console.log("njssnjnjnjdc", instance);

//         // Check if instance is valid
//         if (instance) {
//           // Load the document with additional loading options
//           instance.UI.loadDocument(
//             docUrl
//             // "https://pdftron.s3.amazonaws.com/downloads/pl/legal-contract.docx"
//           );

//           const { documentViewer, annotationManager, Annotations, Tools } =
//             instance.Core;

//           documentViewer.addEventListener("documentLoaded", () => {
//             // Perform document operations
//             const rectangleAnnot = new Annotations.RectangleAnnotation({
//               PageNumber: 1,
//               X: 100,
//               Y: 150,
//               Width: 400,
//               Height: 600,
//               Author: annotationManager.getCurrentUser(),
//             });

//             annotationManager.addAnnotation(rectangleAnnot);
//             annotationManager.redrawAnnotation(rectangleAnnot);
//           });
//         } else {
//           console.error("WebViewer instance is invalid.");
//         }
//       } catch (error) {
//         console.error("Error loading WebViewer:", error);
//       }
//     };

//     callView();
//   }, []);

//   return (
//     <div
//       id="viewer"
//       className="webviewer"
//       ref={viewer}
//       style={{ height: "600px" }}
//     ></div>
//   );
// };

// export default WebviewEditor;
