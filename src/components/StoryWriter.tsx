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

// const actualResponse = {
//   "id": "chatcmpl-8rAOFSLOEyaedlCNNBObuK13r7oYA",
//   "object": "chat.completion",
//   "created": 1707682015,
//   "model": "gpt-3.5-turbo-0613",
//   "choices": [
//     {
//       "index": 0,
//       "message": {
//         "role": "assistant",
//         "content": "In the realm where code does dance and play,\nThere lies a technique in a grand display,\nLike a fractal, endlessly repeating its sway,\nLet us now delve into the realm of recursion today.\n\nImagine a function, devout and true,\nYearning to solve problems, as they accrue,\nBut sometimes a puzzle is too much to construe,\nAnd that's when recursion steps in, like morning dew.\n\nRecursion, a concept that asks itself again,\nTaking a task and diving deep, without restrain,\nIt breaks problems down, like a hurricane,\nInto smaller and simpler tasks, to attain.\n\nWith each new step, it trusts in itself,\nA leap of faith to solve problems, by itself,\nRecursion unveils its mystical wealth,\nBy breaking complexity, with unwavering stealth.\n\nYet, like a hall of mirrors in grand design,\nRecursion must have a base, a line,\nA condition to halt, a sign,\nOr else, in infinite loops, it would forever twine.\n\nWith elegance, recursion unfolds,\nAn enchanting dance of stories untold,\nA function that calls itself, so bold,\nUnraveling puzzles, like a story to be told.\n\nSo remember, dear programmer, with a wistful smile,\nWhen problems loom, with challenges piled,\nRecursion awaits, like a hero in style,\nTo unravel the mysteries, in programming's aisle.\n\nIn the realm where code does dance and play,\nRecursion, like a compass, leads the way,\nA magical concept that will forever stay,\nGuiding programmers, on their creative array."
//       },
//       "logprobs": null,
//       "finish_reason": "stop"
//     }
//   ],
//   "usage": {
//     "prompt_tokens": 39,
//     "completion_tokens": 318,
//     "total_tokens": 357
//   },
//   "system_fingerprint": null
// }

// Define the structure of the API response data - this is probably wrong
interface StoryResponse {
  choices: [{ message: { content: string } }];
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
      max_tokens: 300,
      messages: [
        {
          role: "system",
          content:
            "You are a writer. You specialize in short stories. You must write stories that can be completed in under 8 sentences. You will be cut off after 8 sentences so it is very important to stay within 8 sentences. Do not under any circumstances write more than 8 sentences. You have been asked to write a story about the following prompt:",
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
  return data.choices[0].message.content;
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
