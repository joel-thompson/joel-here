import { Box } from "@mui/material";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const Basic = () => {
  const { basicId } = useParams();
  return (
    <>
      <Box>Here's the basicId: {basicId}</Box>
      <Link to={`/`}>Home</Link>
    </>
  );
};
