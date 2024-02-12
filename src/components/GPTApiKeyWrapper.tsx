import { Button, Stack, TextField, useTheme } from "@mui/material";
import React, { ReactNode, useState } from "react";
import { useGPTApiKey } from "../hooks/useGPTApiKey";

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
