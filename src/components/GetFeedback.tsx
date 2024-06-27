import React, { useState } from "react";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import Markdown from "react-markdown";
import axios from "axios";

interface FeedbackSectionProps {
  inputText: string;
  apiEndpoint: string;
  labelText?: string;
}

export const GetFeedback: React.FC<FeedbackSectionProps> = ({
  inputText,
  apiEndpoint,
  labelText = "Requirements",
}) => {
  const theme = useTheme();
  const [requirements, setRequirements] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRequirementsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRequirements(event.target.value);
  };

  const getFeedback = async () => {
    try {
      setFeedback("");
      setLoading(true);
      const response = await axios.post(apiEndpoint, {
        inputText,
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
      <TextField
        label={labelText}
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
    </Stack>
  );
};
