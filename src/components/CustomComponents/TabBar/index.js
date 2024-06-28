import React, { useState } from "react";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
  Grid,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Editor } from "../Editor";

const TabComponent = ({ tabsData, onEditorChange }) => {
  const [expanded, setExpanded] = useState(false);
  const [editableIndex, setEditableIndex] = useState(null);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleEditToggle = (index) => {
    setEditableIndex(editableIndex === index ? null : index);
  };

  return (
    <>
      {tabsData.map((tab, index) => (
        <Accordion
          expanded={expanded === index}
          onChange={handleChange(index)}
          key={index}
          sx={{
            mb: 1,
            border: "1px solid #ccc",
            borderRadius: 2,
            height: expanded === index ? "520px" : "auto",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}bh-content`}
            id={`panel${index}bh-header`}
            sx={{
              minHeight: "45px",
              "& .MuiAccordionSummary-content": { margin: 0 },
            }}
          >
            <Typography
              sx={{
                width: "50%",
                flexShrink: 0,
                marginBottom: "0px !important",
              }}
            >
              {tab.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              padding: 2,
              borderTop: "1px solid #ccc",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Editor
              onChange={(content) => onEditorChange(index, content)}
              value={tab.description}
              readOnly={editableIndex !== index}
              width={"100%"}
            />
          </AccordionDetails>
          <button
            class="btn btn-primary float-end me-3"
            style={{ marginTop: "8%", width: "100px" }}
            onClick={() => handleEditToggle(index)}
          >
            {editableIndex === index ? "Save" : "Edit"}
          </button>
        </Accordion>
      ))}
    </>
  );
};

export default TabComponent;
