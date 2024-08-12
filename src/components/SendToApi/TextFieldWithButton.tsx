import { Button, TextField, useTheme } from "@mui/material";

interface Props {
  label?: string;
  placeholder?: string;
  buttonText?: string;
  onButtonClick: () => void;
  isPending: boolean;
  inputText: string;
  setInputText: (text: string) => void;
}

export const TextFieldWithButton = ({
  label,
  placeholder,
  buttonText = "Send",
  onButtonClick,
  isPending,
  inputText,
  setInputText,
}: Props) => {
  const theme = useTheme();
  return (
    <>
      <TextField
        label={label}
        placeholder={placeholder}
        multiline
        minRows={2}
        maxRows={5}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        variant="outlined"
        fullWidth
      />
      <Button
        onClick={onButtonClick}
        color="primary"
        variant="contained"
        sx={{ marginTop: theme.spacing(2) }}
        disabled={!inputText.trim() || isPending}
      >
        {buttonText}
      </Button>
    </>
  );
};
