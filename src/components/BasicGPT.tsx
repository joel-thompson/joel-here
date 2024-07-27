import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
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
import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useLocalStorage } from "@uidotdev/usehooks";
import apiPath from "../utils/apiPath";
import Markdown from "react-markdown";

interface Response {
  message: string;
}

interface Message {
  role: "user" | "system";
  content: string;
}

type Conversation = Message[];

const fetchResponse = async ({
  conversation,
}: {
  conversation: Conversation;
}) => {
  const response = await fetch(apiPath("/basicgpt"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      conversation: conversation,
    }),
  });

  if (!response.ok) {
    let errorMessage = "Failed to fetch";
    try {
      const errorBody = await response.json();
      console.log({ errorBody });
      errorMessage = errorBody.message;
    } catch (e) {
      errorMessage = "Error parsing error response:";
      console.error("Error parsing error response:", e);
    }
    throw new Error(errorMessage);
  }

  const data: Response = await response.json();
  return data;
};

export const BasicGPT = () => {
  const theme = useTheme();
  const constructoColor = theme.palette.text.primary;
  const userColor = theme.palette.text.secondary;

  const [prompt, setPrompt] = useState<string>("");
  const [conversation, setConversation] = useState<Conversation>([]);
  const [savedConversations, setSavedConversations] = useLocalStorage<{
    [key: string]: Conversation;
  }>("saved-conversations", {});

  const savedConvArray = Object.keys(savedConversations);
  console.log({ savedConvArray });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: (updatedConversation: Conversation) =>
      fetchResponse({ conversation: updatedConversation }),
    onSuccess: (data) => {
      setConversation([
        ...conversation,
        { content: data.message, role: "system" },
      ]);
    },
    onError: (error) => {
      setConversation([
        ...conversation,
        { content: `Error - ${error.message}`, role: "system" },
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
              color={message.role === "user" ? userColor : constructoColor}
              variant="body1"
              paragraph
              key={index}
            >
              {message.role === "user" ? "" : "Constructo: "}
              <Markdown>{message.content}</Markdown>
            </Typography>
          ))}
          {mutation.isPending && (
            <Typography color={constructoColor} variant="body1" paragraph>
              Constructo is thinking...
            </Typography>
          )}
          <div ref={endOfMessagesRef} />
        </Box>
      )}
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
              <ListItemButton
                onClick={() => handleRestoreConversation(key)}
                key={key}
              >
                <ListItemText primary={key} />
              </ListItemButton>
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
