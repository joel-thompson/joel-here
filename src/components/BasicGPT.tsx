import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import apiPath from "../utils/apiPath";

interface Response {
  message: string;
}

const fetchResponse = async ({ conversation }: { conversation: string[] }) => {
  const response = await fetch(apiPath("/basicgpt"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      systemPrompt:
        "You are a higher experienced civil engineer. Your main job is to help junior engineers with their projects. This may be technical questions or communication questions. Your name is Constructo, you should respond in a clear and concise manner. However you should be playful, and occasionally speak in third person. You have been asked to help a junior engineer with the following problem:",
      conversation: conversation,
    }),
  });

  if (!response.ok) {
    // Try to extract the error message from the response body
    let errorMessage = "Failed to fetch"; // Default error message
    try {
      const errorBody = await response.json();
      console.log({ errorBody });
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
    mutationFn: (updatedConversation: string[]) =>
      fetchResponse({ conversation: updatedConversation }),
    onSuccess: (data) => {
      setConversation([...conversation, data.message]);
    },
    onError: (error) => {
      setConversation([...conversation, `Error - ${error.message}`]);
    },
  });

  const handleSubmit = () => {
    const updatedConversation = [...conversation, prompt];
    setConversation(updatedConversation);
    mutation.mutate(updatedConversation);
    setPrompt("");
  };

  return (
    <Stack>
      <TextField
        multiline
        value={prompt}
        onChange={(e) => {
          setPrompt(e.target.value);
        }}
        placeholder="Enter your question here..."
        minRows={2}
        maxRows={16}
      />

      <Box>
        <Button
          onClick={handleSubmit}
          disabled={mutation.isPending || !prompt.trim()}
          color="primary"
          variant="contained"
          sx={{ marginTop: theme.spacing(2), marginBottom: theme.spacing(6) }}
          startIcon={<EngineeringIcon />}
        >
          {mutation.isPending ? "Please hold..." : "Do the thing"}
        </Button>
      </Box>

      {conversation.map((message, index) => (
        <Typography variant="body1" paragraph key={index}>
          {index % 2 === 0 ? "You: " : "Constructo: "}
          {message}
        </Typography>
      ))}
    </Stack>
  );
};
