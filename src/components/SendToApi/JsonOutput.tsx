import { Box, Typography, useTheme } from "@mui/material";

export const JsonOutput = ({
  isPending,
  data,
}: {
  isPending: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any; // JSON.stringify takes any type, so we need to specify the type
}) => {
  const theme = useTheme();
  if (!data && !isPending) return null;
  return (
    <Box sx={{ marginTop: theme.spacing(2) }}>
      <Typography variant="h6">
        {isPending ? "Loading..." : "Output"}
      </Typography>
      {!isPending && (
        <Typography component="pre" style={{ whiteSpace: "pre-wrap" }}>
          {JSON.stringify(data, null, 2)}
        </Typography>
      )}
    </Box>
  );
};
