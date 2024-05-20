import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import apiPath from "../utils/apiPath";

interface Response {
  message: string;
}

const fetchResponse = async ({
  prompt,
  conversation,
}: {
  prompt: string;
  conversation: string[];
}) => {
  const response = await fetch(apiPath('/basicgpt'), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      systemPrompt: "You are a higher experienced civil engineer. Your main job is to help junior engineers with their projects. You have been asked to help a junior engineer with the following problem:",
      prompt: prompt.trim(),
      conversation: conversation,
    }),
  });

  if (!response.ok) {
    // Try to extract the error message from the response body
    let errorMessage = "Failed to fetch"; // Default error message
    try {
      const errorBody = await response.json();
      console.log({ errorBody })
      errorMessage = errorBody.message;
    } catch (e) {
      errorMessage = "Error parsing error response:";
      console.error("Error parsing error response:", e);
    }
    throw new Error(errorMessage);
  }

  const data: Response = await response.json();
  return data;
};

export const BasicGPT = () => {
  const theme = useTheme();
  const [prompt, setPrompt] = useState<string>("");
  const [conversation, setConversation] = useState<string[]>([]);
  const mutation = useMutation({
    mutationFn: (data) => fetchResponse({ ...data, conversation }),
  });

  const handleSubmit = () => {
    setConversation([...conversation, prompt]);
    mutation.mutate({ prompt });
  };

  return (
    <Stack>
      <TextField
        multiline
        value={prompt}
        onChange={(e) => {
          setPrompt(e.target.value);
        }}
        placeholder="Enter your story idea, plot point, or character description here..."
        minRows={8}
        maxRows={16}
        sx={{
          width: "50%",
        }}
      />

      <Box>
        <Button
          onClick={handleSubmit}
          disabled={mutation.isPending || !prompt.trim()}
          color="primary"
          variant="contained"
          sx={{ marginTop: theme.spacing(2), marginBottom: theme.spacing(6) }}
          startIcon={<AutoAwesomeIcon />}
        >
          {mutation.isPending ? "Generating..." : "Get Response"}
        </Button>
      </Box>

      <Typography variant="h6" gutterBottom>
        Generated Response:
      </Typography>
      {conversation.map((message, index) => (
        <Typography variant="body1" paragraph key={index}>
          {index % 2 === 0 ? "You: " : "AI: "}
          {message}
        </Typography>
      ))}
      {mutation.data && (
        <Typography variant="body1" paragraph>
          AI: {mutation.data.message}
        </Typography>
      )}
      <Typography variant="body1" paragraph>
        {mutation.isError && <>Error: {mutation.error.message}</>}
      </Typography>
    </Stack>
  );
};
