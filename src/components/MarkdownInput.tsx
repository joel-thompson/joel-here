import React, { useState } from "react";
import { Box, Button, Stack, TextField, useTheme } from "@mui/material";
import Markdown from "react-markdown";

interface MarkdownInputProps {
  markdownText: string;
  setMarkdownText: React.Dispatch<React.SetStateAction<string>>;
}

export const MarkdownInput: React.FC<MarkdownInputProps> = ({
  markdownText,
  setMarkdownText,
}) => {
  const theme = useTheme();
  const [preview, setPreview] = useState(false);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMarkdownText(event.target.value);
  };

  const togglePreview = () => {
    setPreview((prev) => !prev);
  };

  return (
    <Stack spacing={2}>
      <Button
        onClick={togglePreview}
        color="primary"
        variant="contained"
        sx={{ marginTop: theme.spacing(2) }}
      >
        {preview ? "Edit" : "Preview"}
      </Button>
      {preview ? (
        <Box
          sx={{ border: "1px solid", borderColor: theme.palette.divider, p: 2 }}
        >
          <Markdown>{markdownText}</Markdown>
        </Box>
      ) : (
        <TextField
          label="Markdown Input"
          multiline
          minRows={10}
          maxRows={20}
          value={markdownText}
          onChange={handleTextChange}
          variant="outlined"
          fullWidth
        />
      )}
    </Stack>
  );
};
