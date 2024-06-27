import React, { useState } from "react";
import {
  Box,
  Button,
  Stack,
  TextField,
  useTheme,
  Typography,
} from "@mui/material";
import Markdown from "react-markdown";
import axios from "axios";
import apiPath from "../../utils/apiPath";

export const MarkdownEditor = () => {
  const theme = useTheme();
  const [markdownText, setMarkdownText] = useState("");
  const [requirements, setRequirements] = useState("");
  const [feedback, setFeedback] = useState("");
  const [preview, setPreview] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMarkdownText(event.target.value);
  };

  const handleRequirementsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRequirements(event.target.value);
  };

  const togglePreview = () => {
    setPreview((prev) => !prev);
  };

  const getFeedback = async () => {
    try {
      setFeedback("");
      setLoading(true);
      const response = await axios.post(apiPath("/get-techplan-feedback"), {
        markdownText,
        requirements,
      });
      setFeedback(response.data.feedback);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error getting feedback", error);
    }
  };

  return (
    <Stack spacing={2}>
      {/* START OF INPUT SECTION */}
      <Button
        onClick={togglePreview}
        color="primary"
        variant="contained"
        sx={{ marginTop: theme.spacing(2) }}
      >
        {preview ? "Edit" : "Preview"}
      </Button>
      {preview ? (
        <Box
          sx={{ border: "1px solid", borderColor: theme.palette.divider, p: 2 }}
        >
          <Markdown>{markdownText}</Markdown>
        </Box>
      ) : (
        <TextField
          label="Markdown Input"
          multiline
          minRows={10}
          maxRows={20}
          value={markdownText}
          onChange={handleTextChange}
          variant="outlined"
          fullWidth
        />
      )}
      {/* END OF INPUT SECTION */}

      {/* START OF FEEDBACK SECTION */}
      <TextField
        label="Requirements"
        multiline
        minRows={2}
        maxRows={5}
        value={requirements}
        onChange={handleRequirementsChange}
        variant="outlined"
        fullWidth
      />

      <Button
        onClick={getFeedback}
        color="secondary"
        variant="contained"
        sx={{ marginTop: theme.spacing(2) }}
      >
        Get Feedback
      </Button>
      {(feedback || loading) && (
        <Box sx={{ marginTop: theme.spacing(2) }}>
          <Typography variant="h6">
            {loading ? "Loading..." : "Feedback"}
          </Typography>
          <Markdown>{feedback}</Markdown>
        </Box>
      )}
      {/* END OF FEEDBACK SECTION */}
    </Stack>
  );
};
