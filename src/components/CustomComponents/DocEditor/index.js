import React, { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  TextField,
  Button,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Editor } from "../Editor";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NoteEditor = ({ notingTabSubject, setNotingTabSubject, tabsData, onEditorChange }) => {
  const [editableIndex, setEditableIndex] = useState(null);
  const [notingData, setNotingData] = useState({ description: "" });

  const handleEdit = (index) => {
    setEditableIndex(index);
    setNotingData({ description: tabsData[index].description });
  };

  const handleAddOrEdit = () => {
    if (editableIndex !== null) {
      onEditorChange(editableIndex, notingData.description);
      setEditableIndex(null);
    } else {
      onEditorChange(null, notingData.description, true);
    }
    setNotingData({ description: "" });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Grid container spacing={2}>
          {tabsData.map((tab, index) => (
            <Grid item xs={12} key={index}>
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      position: "relative",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{ width: "100%", marginBottom: "0px !important", fontWeight: "bold", fontSize: "16px" }}
                    >
                      {tab.title}
                    </Typography>
                    <Typography
                      sx={{
                        width: "100%",
                        flexShrink: 0,
                        color: "text.secondary",
                        marginBottom: "0px !important",
                        mt: 2,
                      }}
                      dangerouslySetInnerHTML={{ __html: tab.description }}
                    />
                    <button
                      onClick={() => handleEdit(index)}
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
                    {/* <IconButton style={{ position: 'absolute', top: 5, right: 5 }} onClick={() => handleEdit(index)}>
                      <EditIcon />
                    </IconButton> */}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12} md={6}>
        <label className="form-label">Subject</label>
        <input
          className={`form-control mb-2`}
          id="subject"
          placeholder="Subject"
          onChange={(e) => setNotingTabSubject(e.target.value)}
          value={notingTabSubject}
        />
        <label className="form-label">{editableIndex !== null ? "Edit new paragraph" : "Add new paragraph"}</label>
        <Editor
          onChange={(content) =>
            setNotingData((prev) => ({
              ...prev,
              description: content,
            }))
          }
          value={notingData.description}
          width={"100%"}
        />
<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 60 }}>
  <button
    className="btn btn-primary"
    style={{ width: "100px" }}
    onClick={handleAddOrEdit}
  >
    {editableIndex !== null ? "Edit" : "Add"}
  </button>
</div>
      </Grid>
    </Grid>
  );
};

export default NoteEditor;
