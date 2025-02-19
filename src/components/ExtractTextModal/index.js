import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import Tesseract from "tesseract.js";
import { showErrorMessage } from "../../utils/ToastAlert";
import { imagesUrl } from "../../api/APIs";

export const ExtractText = ({ isOpen, toggleModal, selectedImage }) => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);


  useEffect(() => {
    if (selectedImage) {
      const absoluteImageUrl = `${imagesUrl}${selectedImage}`;
      setImage(absoluteImageUrl);
  
      // Create a new image element to check if it loads successfully
      const img = new Image();
      img.src = absoluteImageUrl;
      
      img.onload = () => {
        console.log("Image successfully loaded!");
        handleTextRecognition(absoluteImageUrl);
      };
  
      img.onerror = () => {
        console.error("Error loading image:", absoluteImageUrl);
        showErrorMessage("Image failed to load. Please check the URL.");
      };
    }
  }, [selectedImage]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      handleTextRecognition(imageUrl);
    }
  };

  const handleTextRecognition = (imageSrc) => {
    if (!imageSrc) {
      showErrorMessage("Please upload an image first.");
      return;
    }

    setLoading(true);
    Tesseract.recognize(imageSrc, "eng", {
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
                onError={() => showErrorMessage("Image failed to load")}
                style={{
                  maxHeight: "100%",
                  maxWidth: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          )}

          <button
            onClick={() => handleTextRecognition(image)}
            className="btn btn-primary"
            style={{
              marginTop: "10px",
              cursor: "pointer",
              float: "right",
            }}
            disabled={loading || !image}
          >
            {loading ? `Processing (${progress}%)...` : "Extract Text"}
          </button>
          <div style={{ clear: "both" }}> </div>

          {text && (
            <div style={{ marginTop: "10px", textAlign: "left" }}>
              <h2>Extracted Text:</h2>
              <textarea
                value={text}
                style={{ width: "100%", height: "200px" }}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};
