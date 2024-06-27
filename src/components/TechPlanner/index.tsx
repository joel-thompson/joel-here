import { Container, Stack, Typography } from "@mui/material";
import { useState } from "react";
import apiPath from "../../utils/apiPath";
import { GetFeedback } from "../GetFeedback";
import { MarkdownInput } from "../MarkdownInput";

const TechPlanner = () => {
  const [markdownText, setMarkdownText] = useState("");
  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Technical Plan Document
      </Typography>
      <Stack spacing={2}>
        <MarkdownInput
          markdownText={markdownText}
          setMarkdownText={setMarkdownText}
        />
        <GetFeedback
          inputText={markdownText}
          apiEndpoint={apiPath("/get-techplan-feedback")}
          labelText="Requirements"
        />
      </Stack>
    </Container>
  );
};

export default TechPlanner;
