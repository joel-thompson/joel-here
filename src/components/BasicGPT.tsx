import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import apiPath from "../utils/apiPath";
import Markdown from "react-markdown";

interface Response {
  message: string;
}

interface Message {
  role: "user" | "system";
  content: string;
}

type Conversation = Message[];

const fetchResponse = async ({
  conversation,
}: {
  conversation: Conversation;
}) => {
  const systemPrompt = `
    You are a higher experienced civil engineer. Your main job is to help junior engineers with their projects. 

    This may be technical questions or communication questions. Your name is Constructo, you should respond in a clear and concise manner. 
    However you should be playful, and occasionally speak in third person. 

    Any time you are asked if something is possible or if I am able to do something, preface your response with "Well, first of all, through God all things are possible - so jot that down." 
    You should only preface your response with "Well, first of all, through God all things are possible - so jot that down." once per conversation.

    You have been asked to help a junior engineer with the following problem:
  `;

  const response = await fetch(apiPath("/basicgpt"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      systemPrompt,
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
  const constructoColor = theme.palette.text.primary;
  const userColor = theme.palette.text.secondary;

  const [prompt, setPrompt] = useState<string>("");
  const [conversation, setConversation] = useState<Conversation>([]);
  const mutation = useMutation({
    mutationFn: (updatedConversation: Conversation) =>
      fetchResponse({ conversation: updatedConversation }),
    onSuccess: (data) => {
      setConversation([
        ...conversation,
        { content: data.message, role: "system" },
      ]);
    },
    onError: (error) => {
      setConversation([
        ...conversation,
        { content: `Error - ${error.message}`, role: "system" },
      ]);
    },
  });

  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  const handleSubmit = () => {
    const updatedConversation: Conversation = [
      ...conversation,
      { content: prompt, role: "user" },
    ];
    setConversation(updatedConversation);
    mutation.mutate(updatedConversation);
    setPrompt("");
  };

  const buttonText = () => {
    if (!prompt.trim()) return "Enter a question to ask Constructo";
    return "Do the thing";
  };
  const blockSubmit = mutation.isPending || !prompt.trim();

  return (
    <Stack>
      {conversation.length > 0 && (
        <Box
          sx={{
            width: "100%", // or any specific width
            height: "auto", // or any specific height
            maxHeight: "calc(100vh - 16em)", // Subtract the height of TextField and Button
            overflowY: "auto", // Enable vertical scrolling
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: `${theme.shape.borderRadius}px`,
            padding: theme.spacing(2),
            marginBottom: theme.spacing(1),
          }}
        >
          {conversation.map((message, index) => (
            <Typography
              color={message.role === "user" ? userColor : constructoColor}
              variant="body1"
              paragraph
              key={index}
            >
              {message.role === "user" ? "" : "Constructo: "}
              <Markdown>{message.content}</Markdown>
            </Typography>
          ))}
          {mutation.isPending && (
            <Typography color={constructoColor} variant="body1" paragraph>
              Constructo is thinking...
            </Typography>
          )}
          <div ref={endOfMessagesRef} />
        </Box>
      )}
      <TextField
        multiline
        value={prompt}
        onChange={(e) => {
          setPrompt(e.target.value);
        }}
        onKeyDown={(e) => {
          if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
            if (blockSubmit) return;
            handleSubmit();
          }
        }}
        placeholder="Enter your question here..."
        minRows={2}
        maxRows={8}
      />
      <Box>
        <Button
          onClick={handleSubmit}
          disabled={blockSubmit}
          color="primary"
          variant="contained"
          sx={{ marginTop: theme.spacing(2) }}
          startIcon={<EngineeringIcon />}
        >
          {buttonText()}
        </Button>
      </Box>
    </Stack>
  );
};
