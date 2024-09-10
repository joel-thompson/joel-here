import React, { useEffect, useRef, useState } from "react";
import { Stack } from "@mui/material";

import axios, { AxiosError, AxiosResponse } from "axios";
import { useMutation } from "@tanstack/react-query";
import { Conversation, ConversationList } from "../SendToApi/ConversationList";
import { ErrorAlert } from "../SendToApi/ErrorAlert";
import { TextFieldWithButton } from "../SendToApi/TextFieldWithButton";
import apiPath from "../../utils/apiPath";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";

export const TestBuilder: React.FC = () => {
  const apiEndpoint = apiPath("/test-builder");
  const [inputText, setInputText] = useState("");

  // interface ApiConversationMessage {
  //   role: "user" | "system" | "assistant";
  //   content: string;
  //   refusal: string;
  // }
  interface ResponseType {
    explanation: string;
    output: string;
  }

  const [conversation, setConversation] = useState<Conversation>([]);
  const [currentTest, setCurrentTest] = useState<string>("");

  const { isPending, isError, error, mutate } = useMutation<
    AxiosResponse<ResponseType>,
    AxiosError,
    Conversation
  >({
    mutationFn: (conversation) => {
      const conversationToSend = currentTest
        ? [
            ...conversation,
            {
              role: "user",
              content: `This is the current test:\n\n${currentTest}`,
            },
          ]
        : conversation;
      return axios.post(apiEndpoint, {
        testType: "javascript",
        conversation: conversationToSend,
      });
    },

    onSuccess: (res) => {
      setConversation([
        ...conversation,
        { content: res.data.explanation, role: "assistant" },
      ]);
      setCurrentTest(res.data.output);
    },
    onError: (error) => {
      setConversation([
        ...conversation,
        { content: `Error - ${error.message}`, role: "assistant" },
      ]);
    },
  });

  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  return (
    <Stack spacing={2}>
      <ConversationList conversation={conversation} isPending={isPending} />

      <TextFieldWithButton
        label={"Test Builder"}
        placeholder="Enter your question here..."
        onButtonClick={() => {
          const updatedConversation = [
            ...conversation,
            { role: "user", content: inputText.trim() },
          ] as Conversation;
          setConversation(updatedConversation);
          mutate(updatedConversation);
          setInputText("");
        }}
        isPending={isPending}
        inputText={inputText}
        setInputText={setInputText}
      />

      <ErrorAlert isError={isError} error={error} />

      <SyntaxHighlighter language="javascript" style={darcula}>
        {currentTest}
      </SyntaxHighlighter>
    </Stack>
  );
};
