import { Typography } from "@mui/material";
import { AxiosError } from "axios";

export const ErrorAlert = ({
  isError,
  error,
}: {
  isError: boolean;
  error: AxiosError | null;
}) => {
  if (!isError || !error) return null;

  return <Typography color="error">{error.message}</Typography>;
};
