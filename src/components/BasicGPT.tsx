import {
  Box,
  Button,
  Stack,
  TextField,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItemButton,
  ListItemText,
  IconButton,
} from "@mui/material";
import EngineeringIcon from "@mui/icons-material/Engineering";
import SaveIcon from "@mui/icons-material/Save";
import ListIcon from "@mui/icons-material/List";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useLocalStorage } from "@uidotdev/usehooks";
import apiPath from "../utils/apiPath";

import { Conversation, ConversationList } from "./SendToApi/ConversationList";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useSearchParams } from "react-router-dom";

interface Response {
  message: string;
}

export const BasicGPT = () => {
  const theme = useTheme();
  const [searchParams] = useSearchParams();
  const fallback = searchParams.get("fallback");

  const url = fallback
    ? apiPath("/basicgpt")
    : apiPath("/constructo-assistant");

  const [prompt, setPrompt] = useState<string>("");
  const [conversation, setConversation] = useState<Conversation>([]);
  const [savedConversations, setSavedConversations] = useLocalStorage<{
    [key: string]: Conversation;
  }>("saved-conversations", {});

  const savedConvArray = Object.keys(savedConversations);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const mutation = useMutation<
    AxiosResponse<Response>,
    AxiosError,
    Conversation
  >({
    mutationFn: (conversation) => {
      return axios.post(url, {
        conversation,
      });
    },
    onSuccess: (res) => {
      setConversation([
        ...conversation,
        { content: res.data.message || "", role: "assistant" },
      ]);
    },
    onError: (error) => {
      setConversation([
        ...conversation,
        {
          content: `Error - ${error.message || "Something went wrong"}`,
          role: "assistant",
        },
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

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleRestoreConversation = (key: string) => {
    const restoredConversation = savedConversations[key];
    setConversation(restoredConversation);
    setIsDialogOpen(false);
  };

  const handleDeleteConversation = (key: string) => {
    const updatedConversations = { ...savedConversations };
    delete updatedConversations[key];
    setSavedConversations(updatedConversations);
  };

  const handleNewConversation = () => {
    setConversation([]);
    setPrompt("");
  };

  const buttonText = () => {
    if (!prompt.trim()) return "Enter a question to ask Constructo";
    return "Do the thing";
  };
  const blockSubmit = mutation.isPending || !prompt.trim();

  return (
    <Stack>
      <ConversationList
        assistantName="Constructo"
        conversation={conversation}
        isPending={mutation.isPending}
        scrollIntoView={true}
      />

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
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        gap={4}
        sx={{ marginTop: theme.spacing(2) }}
      >
        <Button
          onClick={handleSubmit}
          disabled={blockSubmit}
          color="primary"
          variant="contained"
          startIcon={<EngineeringIcon />}
        >
          {buttonText()}
        </Button>
        <Box display="flex" justifyContent="right" alignItems="center" gap={2}>
          <Button
            onClick={handleNewConversation}
            disabled={conversation.length === 0}
            color="secondary"
            variant="contained"
            startIcon={<AddIcon />}
          >
            New
          </Button>
          <Button
            onClick={handleSave}
            disabled={conversation.length === 0}
            color="secondary"
            variant="contained"
            startIcon={<SaveIcon />}
          >
            Save
          </Button>
          <Button
            onClick={handleOpenDialog}
            disabled={savedConvArray.length === 0}
            color="secondary"
            variant="contained"
            startIcon={<ListIcon />}
          >
            Saved
          </Button>
        </Box>
      </Box>

      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          Saved Conversations
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <List>
            {savedConvArray.map((key) => (
              <Box key={key} display="flex" alignItems="center">
                <ListItemButton
                  onClick={() => handleRestoreConversation(key)}
                  sx={{ flexGrow: 1 }}
                >
                  <ListItemText primary={key} />
                </ListItemButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteConversation(key)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};
