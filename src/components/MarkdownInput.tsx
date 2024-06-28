import React, { useState, useCallback } from "react";
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

  const handleBoldShortcut = useCallback(() => {
    const textarea = document.querySelector(
      "#markdown-input"
    ) as HTMLTextAreaElement;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = textarea.value.substring(start, end);
      const beforeText = textarea.value.substring(0, start);
      const afterText = textarea.value.substring(end);
      const newText = `${beforeText}**${selectedText}**${afterText}`;
      setMarkdownText(newText);

      // Reset selection
      setTimeout(() => {
        textarea.selectionStart = start + 2;
        textarea.selectionEnd = end + 2;
      }, 0);
    }
  }, [setMarkdownText]);

  const handleHyperlinkShortcut = useCallback(() => {
    const textarea = document.querySelector(
      "#markdown-input"
    ) as HTMLTextAreaElement;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = textarea.value.substring(start, end);
      const beforeText = textarea.value.substring(0, start);
      const afterText = textarea.value.substring(end);
      const newText = `${beforeText}[${selectedText}](url)${afterText}`;
      setMarkdownText(newText);

      // Reset selection to highlight the URL part
      setTimeout(() => {
        textarea.selectionStart = start + selectedText.length + 3; // After "[selectedText]("
        textarea.selectionEnd = start + selectedText.length + 6; // After "url"
      }, 0);
    }
  }, [setMarkdownText]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "b") {
      event.preventDefault();
      handleBoldShortcut();
    }
    if ((event.metaKey || event.ctrlKey) && event.key === "k") {
      event.preventDefault();
      handleHyperlinkShortcut();
    }
    // Add more shortcuts handling here
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
          id="markdown-input"
          label="Markdown Input"
          multiline
          minRows={10}
          maxRows={20}
          value={markdownText}
          onChange={handleTextChange}
          variant="outlined"
          fullWidth
          onKeyDown={handleKeyDown}
        />
      )}
    </Stack>
  );
};
