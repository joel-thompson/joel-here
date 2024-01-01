import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import joelAvatar from "../assets/joel-avatar.jpeg";
import Button from "@mui/material/Button";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

export const AboutMe = () => {
  const theme = useTheme();

  return (
    <Paper variant="outlined" elevation={3} sx={{ padding: theme.spacing(3) }}>
      <Avatar
        alt="Joel Thompson"
        src={joelAvatar}
        sx={{ width: 56, height: 56, margin: theme.spacing(2) }}
      />
      <Typography variant="h4" gutterBottom>
        Joel Thompson
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        Software Enginner
      </Typography>
      <Typography variant="body1" paragraph>
        Hello! I'm software engineer with experience in JavaScript and
        TypeScript, specializing in React and Next.js for frontend work. I also
        have backend experience using Ruby on Rails and Go.
      </Typography>

      <Button
        variant="contained"
        color="primary"
        href="https://www.linkedin.com/in/joel-thompson-5485b824/"
        target="_blank"
        rel="noopener noreferrer"
        sx={{ marginTop: theme.spacing(2) }}
        startIcon={<LinkedInIcon />}
      >
        Connect on LinkedIn
      </Button>

      <Button
        variant="contained"
        color="primary"
        href="https://github.com/joel-thompson/joel-here"
        target="_blank"
        rel="noopener noreferrer"
        sx={{ marginTop: theme.spacing(2), marginLeft: theme.spacing(2) }}
        startIcon={<GitHubIcon />}
      >
        View this site's code
      </Button>
    </Paper>
  );
};
