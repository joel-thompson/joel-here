import { Box, Typography, useTheme } from "@mui/material";
import { useEffect, useRef } from "react";
import Markdown from "react-markdown";

export interface ConversationMessage {
  role: "user" | "system" | "assistant";
  content: string;
}
export type Conversation = ConversationMessage[];

interface Props {
  assistantName?: string;
  conversation: Conversation;
  isPending: boolean;
  scrollIntoView?: boolean;
}

export const ConversationList = ({
  assistantName = "ai",
  conversation,
  isPending,
  scrollIntoView = true,
}: Props) => {
  const theme = useTheme();

  const assistantColor = theme.palette.text.primary;
  const userColor = theme.palette.text.secondary;

  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!scrollIntoView) return;
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation, scrollIntoView]);

  if (conversation.length === 0) return null;

  return (
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
          color={message.role === "user" ? userColor : assistantColor}
          variant="body1"
          paragraph
          key={index}
        >
          {message.role === "user" ? "" : `${assistantName}: `}
          <Markdown>{message.content}</Markdown>
        </Typography>
      ))}
      {isPending && (
        <Typography color={assistantColor} variant="body1" paragraph>
          {assistantName} is thinking...
        </Typography>
      )}
      <div ref={endOfMessagesRef} />
    </Box>
  );
};
