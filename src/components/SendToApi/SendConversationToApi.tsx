import React, { useEffect, useRef, useState } from "react";
import { Stack } from "@mui/material";

import axios, { AxiosError, AxiosResponse } from "axios";
import { useMutation } from "@tanstack/react-query";
import { ErrorAlert } from "./ErrorAlert";
import { JsonOutput } from "./JsonOutput";
import { TextFieldWithButton } from "./TextFieldWithButton";
import { Conversation, ConversationList } from "./ConversationList";

interface FeedbackSectionProps {
  apiEndpoint: string;
  labelText?: string;
}

export const SendConversationToApi: React.FC<FeedbackSectionProps> = ({
  apiEndpoint,
  labelText = "Input",
}) => {
  const [inputText, setInputText] = useState("");

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
      <ConversationList conversation={conversation} isPending={isPending} />

      <TextFieldWithButton
        label={labelText}
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

      <JsonOutput isPending={isPending} data={data} />
    </Stack>
  );
};
