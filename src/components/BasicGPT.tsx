import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import EngineeringIcon from "@mui/icons-material/Engineering";
import SaveIcon from "@mui/icons-material/Save";
import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useLocalStorage } from "@uidotdev/usehooks";
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
  const response = await fetch(apiPath("/basicgpt"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      conversation: conversation,
    }),
  });

  if (!response.ok) {
    let errorMessage = "Failed to fetch";
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
  const [savedConversations, setSavedConversations] = useLocalStorage<{
    [key: string]: Conversation;
  }>("saved-conversations", {});

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

  const handleSave = () => {
    if (conversation.length === 0) return;
    const firstMessageContent = conversation[0].content;
    const firstMessageKey = firstMessageContent.slice(0, 20);
    setSavedConversations({
      ...savedConversations,
      [firstMessageKey]: conversation,
    });
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
            width: "100%",
            height: "auto",
            maxHeight: "calc(100vh - 16em)",
            overflowY: "auto",
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
      <Box display="flex" justifyContent="space-between" alignItems="center">
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
        <Button
          onClick={handleSave}
          color="secondary"
          variant="contained"
          sx={{ marginTop: theme.spacing(2) }}
          startIcon={<SaveIcon />}
        >
          Save
        </Button>
      </Box>
    </Stack>
  );
};
