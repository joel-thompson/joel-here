import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";

import axios, { AxiosError, AxiosResponse } from "axios";
import { useMutation } from "@tanstack/react-query";
import Markdown from "react-markdown";

interface FeedbackSectionProps {
  apiEndpoint: string;
  labelText?: string;
}

export const SendConversationToApi: React.FC<FeedbackSectionProps> = ({
  apiEndpoint,
  labelText = "Input",
}) => {
  const theme = useTheme();
  const [inputText, setInputText] = useState("");

  interface ConversationMessage {
    role: "user" | "system" | "assistant";
    content: string;
  }
  type Conversation = ConversationMessage[];

  interface ApiConversationMessage {
    role: "user" | "system" | "assistant";
    content: string;
    refusal: string;
  }
  interface ResponseType {
    message: ApiConversationMessage;
  }

  const [conversation, setConversation] = useState<Conversation>([]);

  const {
    isPending,
    isError,
    error,
    data: res,
    mutate,
  } = useMutation<AxiosResponse<ResponseType>, AxiosError, Conversation>({
    mutationFn: (conversation) => {
      return axios.post(apiEndpoint, {
        conversation,
      });
    },
    onSuccess: (res) => {
      setConversation([
        ...conversation,
        { content: res.data.message.content, role: "assistant" },
      ]);
    },
    onError: (error) => {
      setConversation([
        ...conversation,
        { content: `Error - ${error.message}`, role: "assistant" },
      ]);
    },
  });

  const data = res?.data;

  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  return (
    <Stack spacing={2}>
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
              color={
                message.role === "user"
                  ? theme.palette.text.primary
                  : theme.palette.text.secondary
              }
              variant="body1"
              paragraph
              key={index}
            >
              <Markdown>{message.content}</Markdown>
            </Typography>
          ))}
          {isPending && (
            <Typography
              color={theme.palette.text.secondary}
              variant="body1"
              paragraph
            >
              ai is thinking...
            </Typography>
          )}
          <div ref={endOfMessagesRef} />
        </Box>
      )}
      <TextField
        label={labelText}
        multiline
        minRows={2}
        maxRows={5}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        variant="outlined"
        fullWidth
      />
      <Button
        onClick={() => {
          const updatedConversation = [
            ...conversation,
            { role: "user", content: inputText.trim() },
          ] as Conversation;
          setConversation(updatedConversation);
          mutate(updatedConversation);
          setInputText("");
        }}
        color="primary"
        variant="contained"
        sx={{ marginTop: theme.spacing(2) }}
        disabled={!inputText.trim() || isPending}
      >
        Send
      </Button>

      {isError && <Typography color="error">{error.message}</Typography>}

      {(data || isPending) && (
        <Box sx={{ marginTop: theme.spacing(2) }}>
          <Typography variant="h6">
            {isPending ? "Loading..." : "Output"}
          </Typography>
          {!isPending && (
            <Typography component="pre" style={{ whiteSpace: "pre-wrap" }}>
              {JSON.stringify(data, null, 2)}
            </Typography>
          )}
        </Box>
      )}
    </Stack>
  );
};
