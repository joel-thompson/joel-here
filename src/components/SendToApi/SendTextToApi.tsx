import React, { useState } from "react";
import { Stack } from "@mui/material";

import axios, { AxiosError, AxiosResponse } from "axios";
import { useMutation } from "@tanstack/react-query";
import { ErrorAlert } from "./ErrorAlert";
import { JsonOutput } from "./JsonOutput";
import { TextFieldWithButton } from "./TextFieldWithButton";

interface FeedbackSectionProps {
  apiEndpoint: string;
  labelText?: string;
}

export const SendTextToApi: React.FC<FeedbackSectionProps> = ({
  apiEndpoint,
  labelText = "Input",
}) => {
  const [inputText, setInputText] = useState("");

  type ResponseType = object;

  const {
    isPending,
    isError,
    error,
    data: res,
    mutate,
  } = useMutation<AxiosResponse<ResponseType>, AxiosError, string>({
    mutationFn: (inputText) => {
      return axios.post(apiEndpoint, {
        inputText,
      });
    },
  });

  const data = res?.data;

  return (
    <Stack spacing={2}>
      <TextFieldWithButton
        label={labelText}
        placeholder="Enter your question here..."
        onButtonClick={() => mutate(inputText)}
        isPending={isPending}
        inputText={inputText}
        setInputText={setInputText}
      />

      <ErrorAlert isError={isError} error={error} />

      <JsonOutput isPending={isPending} data={data} />
    </Stack>
  );
};
