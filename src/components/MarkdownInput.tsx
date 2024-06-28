import React, { useState } from "react";
import { Box, Button, Stack, TextField, useTheme } from "@mui/material";
import Markdown from "react-markdown";
import { ContentCopy, ModeEdit, Preview } from "@mui/icons-material";

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
  const [copySuccess, setCopySuccess] = useState(false);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMarkdownText(event.target.value);
  };

  const togglePreview = () => {
    setPreview((prev) => !prev);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(markdownText).then(
      () => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000); // Clear message after 2 seconds
      },
      (err) => {
        console.error("Failed to copy: ", err);
      }
    );
  };

  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Button
          onClick={togglePreview}
          color="primary"
          variant="contained"
          sx={{ marginTop: theme.spacing(2) }}
          startIcon={preview ? <ModeEdit /> : <Preview />}
        >
          {preview ? "Edit" : "Preview"}
        </Button>
        <Box sx={{ flexGrow: 1 }} />
        <Button
          onClick={copyToClipboard}
          color="secondary"
          variant="contained"
          sx={{ marginTop: theme.spacing(2) }}
          startIcon={<ContentCopy />}
          disabled={!markdownText.trim()}
        >
          {copySuccess ? "Copied!" : "Copy to Clipboard"}
        </Button>
      </Stack>
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
