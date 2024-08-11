import React, { useState } from "react";
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

interface FeedbackSectionProps {
  apiEndpoint: string;
  labelText?: string;
}

export const SendTextToApi: React.FC<FeedbackSectionProps> = ({
  apiEndpoint,
  labelText = "Input",
}) => {
  const theme = useTheme();
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
        onClick={() => mutate(inputText)}
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
