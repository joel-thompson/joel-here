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
        ></TextField>
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
        onClick={() => setApiKey(null)}
        color="error"
        variant="contained"
        sx={{ marginBottom: theme.spacing(4) }}
      >
        Clear API Key
      </Button>
      <br />
      {children}
    </>
  );
};

export default GPTApiKeyWrapper;
