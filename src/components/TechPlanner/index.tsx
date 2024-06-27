import { Container, Typography } from "@mui/material";
import { MarkdownEditor } from "./MarkdownEditor";

const TechPlanner = () => {
  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Technical Plan Document
      </Typography>
      <MarkdownEditor />
    </Container>
  );
};

export default TechPlanner;
