import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Tesseract from "tesseract.js";
import { showErrorMessage } from "../../utils/ToastAlert";

export const ExtractText = ({ isOpen, toggleModal }) => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // Handle image selection
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  // Perform OCR
  const handleTextRecognition = () => {
    if (!image) {
      showErrorMessage("Please upload an image first.");
      return;
    }

    setLoading(true);
    Tesseract.recognize(image, "eng", {
      logger: (info) => {
        if (info.status === "recognizing text") {
          setProgress(Math.floor(info.progress * 100));
        }
      },
    })
      .then(({ data: { text } }) => {
        setText(text);
      })
      .catch((err) => {
        console.error("Error during OCR:", err);
      })
      .finally(() => {
        setLoading(false);
        setProgress(0);
      });
  };
  return (
    <Modal show={isOpen} onHide={toggleModal} centered size="lg">
      <Modal.Header
        closeButton
        closeVariant="white"
        style={{
          backgroundColor: "#4B8FF0",
          color: "white",
        }}
      >
        <Modal.Title>Image to Text Recognition</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {image && (
            <div
              style={{
                height: "30vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                marginTop: "20px",
              }}
            >
              <img
                src={image}
                alt="Uploaded"
                style={{
                  maxHeight: "100%",
                  maxWidth: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          )}

          <button
            onClick={handleTextRecognition}
            class="btn btn-primary"
            style={{
              marginTop: "10px",
              cursor: "pointer",
              float: "right",
            }}
            disabled={loading}
          >
            {loading ? `Processing (${progress}%)...` : "Extract Text"}
          </button>
          <div style={{ clear: "both" }}> </div>

          {text && (
            <div style={{ marginTop: "10px", textAlign: "left" }}>
              <h2>Extracted Text:</h2>
              <textarea
                readOnly
                value={text}
                style={{ width: "100%", height: "200px" }}
              />
            </div>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};
