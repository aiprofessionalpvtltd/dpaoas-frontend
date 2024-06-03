import React, { useState } from "react";
import { Box, AccordionDetails } from "@mui/material";
import { Editor } from "../Editor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faEdit } from "@fortawesome/free-solid-svg-icons";
import sanitizeHtml from "sanitize-html";

const DocParas = ({ tabsData, onEditorChange }) => {
  const [editableIndex, setEditableIndex] = useState(null);
  const [notingData, setNotingData] = useState({ description: "" });

  const handleEditToggle = (index, edited) => {
    if (edited) {
      onEditorChange(editableIndex, notingData.description);
      setEditableIndex(null); // Reset editable index after saving
    } else {
      setNotingData({ description: tabsData[index].description });
      setEditableIndex(index);
    }
  };

  const cleanHtml = (html) => {
    return sanitizeHtml(html, {
      allowedTags: ["b", "i", "em", "strong", "a"], // Adjust based on your needs
      allowedAttributes: {
        a: ["href"]
      },
    });
  };

  return (
    <>
      {tabsData.map((tab, index) => (
        <Box
          key={index}
          sx={{
            height: "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              position: "relative",
              justifyContent: "space-between",
              alignItems: "center",
              mb: editableIndex !== index ? 2 : 6,
            }}
          >
            <label
              style={{
                width: "100%",
                fontWeight: "bold",
                fontSize: "16px",
                marginTop: '8px'
              }}
            >
              {tab.title}
            </label>
            {editableIndex !== index ? (
              <p
                style={{
                  width: "100%",
                  flexShrink: 0,
                  color: "text.secondary",
                  marginBottom: 0,
                }}
                dangerouslySetInnerHTML={{ __html: cleanHtml(tab.description) }}
              ></p>
            ) : (
              <AccordionDetails
                sx={{
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  mt: 1
                }}
              >
                <Editor
                  onChange={(content) => setNotingData({ description: content })}
                  value={notingData.description}
                  width={"100%"}
                  display={"flex"}
                />
              </AccordionDetails>
            )}

            {editableIndex !== index ? (
              <button
                onClick={() => handleEditToggle(index, false)}
                className="btn-xs green circle-btn"
                style={{
                  background: "#2dce89",
                  position: "absolute",
                  top: 5,
                  right: 5,
                }}
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
            ) : (
              <button
                onClick={() => handleEditToggle(index, true)}
                className="btn-xs green circle-btn"
                style={{
                  background: "#2dce89",
                  position: "absolute",
                  top: 5,
                  right: 5,
                }}
              >
                <FontAwesomeIcon icon={faCheckCircle} />
              </button>
            )}
          </Box>
        </Box>
      ))}
    </>
  );
};

export default DocParas;