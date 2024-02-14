import {
  Button,
  Link,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { ReactNode, useState } from "react";
import { useGPTApiKey } from "../hooks/useGPTApiKey";
import { Link as RouterLink } from "react-router-dom";

type GPTApiKeyWrapperProps = {
  children: ReactNode;
};

const GPTApiKeyWrapper: React.FC<GPTApiKeyWrapperProps> = ({ children }) => {
  const { apiKey, setApiKey } = useGPTApiKey();
  const [value, setValue] = useState("");
  const trimmed = value.trim();
  const isKeyEntered = apiKey !== null && apiKey !== "";
  const [confirmReset, setConfirmReset] = useState(false);

  const theme = useTheme();

  const onSubmit = () => {
    //TODO: Add validation call to check if the key is valid
    setApiKey(trimmed);
    setValue("");
  };

  if (!isKeyEntered) {
    return (
      <Stack spacing={4}>
        <Stack alignItems={"center"} flexBasis={"content"} direction={"row"}>
          <TextField
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSubmit();
              }
            }}
            value={value}
            label="Enter GPT API Key"
            variant="standard"
            onChange={(e) => setValue(e.target.value)}
            sx={{ width: theme.spacing(50) }}
          />
          <Button
            disabled={trimmed === ""}
            onClick={onSubmit}
            color="primary"
            variant="contained"
          >
            Add
          </Button>
        </Stack>
        <Typography>
          This page requires an openAI api key. See instructions below on how to
          get one.
        </Typography>
        <Stack>
          <Typography>
            1. Visit the OpenAI website and{" "}
            <Link
              component={RouterLink}
              to="https://platform.openai.com/signup"
            >
              sign up
            </Link>{" "}
            or{" "}
            <Link component={RouterLink} to="https://platform.openai.com/login">
              log in
            </Link>
            .
          </Typography>
          <Typography>
            2. Once you have an account, make sure you have billing set up via
            the{" "}
            <Link
              component={RouterLink}
              to="https://platform.openai.com/account/billing/overview"
            >
              billing settings
            </Link>
            .
          </Typography>
          <Typography>
            3. Navigate to the{" "}
            <Link
              component={RouterLink}
              to="https://platform.openai.com/api-keys"
            >
              API section
            </Link>
            .
          </Typography>
          <Typography>
            4. Follow the instructions to create a new API key.
          </Typography>
          <Typography>
            5. Copy the generated API key, and paste it into the input above.
          </Typography>
          <Typography>
            6. Click the 'Add' button.
          </Typography>
        </Stack>
      </Stack>
    );
  }

  return (
    <>
      <Button
        onClick={() => setConfirmReset(true)}
        color="error"
        variant="outlined"
        sx={{ marginBottom: theme.spacing(4) }}
      >
        Clear API Key
      </Button>

      {confirmReset && (
        <>
          <Button
            onClick={() => {
              setApiKey(null);
              setConfirmReset(false);
            }}
            color="error"
            variant="contained"
            sx={{
              marginBottom: theme.spacing(4),
              marginLeft: theme.spacing(4),
            }}
          >
            Yes
          </Button>

          <Button
            onClick={() => setConfirmReset(false)}
            color="success"
            variant="contained"
            sx={{
              marginBottom: theme.spacing(4),
              marginLeft: theme.spacing(2),
            }}
          >
            No
          </Button>
        </>
      )}
      <br />
      {children}
    </>
  );
};

export default GPTApiKeyWrapper;
