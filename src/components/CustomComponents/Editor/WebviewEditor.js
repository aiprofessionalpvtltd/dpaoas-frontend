import React, { useEffect, useRef } from "react";
import WebViewer from "@pdftron/webviewer";

const licenseKey = "demo:1710315599744:7f3f2bf203000000007ceec613797302897452e5d72a3562de77a0d7ca"; // Replace with your actual license key

const WebviewEditor = () => {
  const viewer = useRef(null);

  useEffect(() => {
    const callView = async () => {
      try {
        const instance = await WebViewer(
          {
            path: "/webviewer/lib",
            licenseKey: licenseKey,
            enableOfficeEditing: true,
          },
          viewer.current
        );

        console.log("njssnjnjnjdc", instance);
        
        // Check if instance is valid
        if (instance) {
          // Load the document with additional loading options
          instance.UI.loadDocument('https://pdftron.s3.amazonaws.com/downloads/pl/legal-contract.docx', { filename: 'myfile.pdf' });

          const { documentViewer, annotationManager, Annotations, Tools } = instance.Core;

          documentViewer.addEventListener('documentLoaded', () => {
            // Perform document operations
            const rectangleAnnot = new Annotations.RectangleAnnotation({
              PageNumber: 1,
              X: 100,
              Y: 150,
              Width: 200,
              Height: 50,
              Author: annotationManager.getCurrentUser()
            });

            annotationManager.addAnnotation(rectangleAnnot);
            annotationManager.redrawAnnotation(rectangleAnnot);
          });
        } else {
          console.error("WebViewer instance is invalid.");
        }
      } catch (error) {
        console.error("Error loading WebViewer:", error);
      }
    };

    callView();
  }, []);

  return (
    <div id="viewer" className="webviewer" ref={viewer} style={{ height: "100%" }}></div>
  );
};

export default WebviewEditor;
