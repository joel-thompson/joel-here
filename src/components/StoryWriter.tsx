import GPTApiKeyWrapper from "./GPTApiKeyWrapper";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useGPTApiKey } from "../hooks/useGPTApiKey";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

export const StoryWriter = () => {
  return (
    <GPTApiKeyWrapper>
      <WritingAssistant />
    </GPTApiKeyWrapper>
  );
};

// Define the structure of the API response data - this is probably wrong
interface StoryResponse {
  choices: [{ text: string }];
}

// Define the function for fetching the story from the API
const fetchStory = async ({
  prompt,
  apiKey,
}: {
  prompt: string;
  apiKey: string | null;
}) => {
  console.log({ apiKey });
  if (!apiKey) {
    throw new Error("API Key not set");
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a writer. You specialize in short stories. You have been asked to write a story about the following prompt:",
        },
        {
          role: "user",
          content: prompt.trim(),
        },
      ],
    }),
  });

  if (!response.ok) {
    // Try to extract the error message from the response body
    let errorMessage = "Failed to fetch story"; // Default error message
    try {
      const errorBody = await response.json();
      errorMessage = errorBody.error.message;
    } catch (e) {
      errorMessage = "Error parsing error response:";
      console.error("Error parsing error response:", e);
    }
    throw new Error(errorMessage);
  }

  const data: StoryResponse = await response.json();
  return data.choices[0].text;
};

const WritingAssistant = () => {
  const theme = useTheme();
  const [prompt, setPrompt] = useState<string>("");
  const mutation = useMutation({
    mutationFn: fetchStory,
  });

  const { apiKey } = useGPTApiKey();

  const handleSubmit = () => {
    mutation.mutate({ prompt, apiKey });
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
          disabled={mutation.isPending || !prompt.trim() || !apiKey}
          color="primary"
          variant="contained"
          sx={{ marginTop: theme.spacing(2), marginBottom: theme.spacing(6) }}
          startIcon={<AutoAwesomeIcon />}
        >
          {mutation.isPending ? "Generating..." : "Generate Story"}
        </Button>
      </Box>

      <Typography variant="h6" gutterBottom>
        Generated Story:
      </Typography>
      <Typography variant="body1" paragraph>
        {mutation.data ?? "Your story will appear here..."}
      </Typography>
      <Typography variant="body1" paragraph>
        {mutation.isError && <>Error: {mutation.error.message}</>}
      </Typography>
    </Stack>
  );
};
