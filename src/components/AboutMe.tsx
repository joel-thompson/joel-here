import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import joelAvatar from "../assets/jpic.jpg";
import Button from "@mui/material/Button";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

export const AboutMe = () => {
  const theme = useTheme();

  return (
    <Paper variant="outlined" elevation={0} sx={{ padding: theme.spacing(3) }}>
      <Avatar
        alt="Joel Thompson"
        src={joelAvatar}
        sx={{ width: 56, height: 56, margin: theme.spacing(2) }}
      />
      <Typography variant="h4" gutterBottom>
        Joel Thompson
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        Software Engineer
      </Typography>
      <Typography variant="body1" paragraph>
        Hello! I'm a software engineer with experience in JavaScript and
        TypeScript, specializing in React for frontend work. I also have backend
        experience working with Node.js/Express, Go, and Ruby on Rails.
      </Typography>

      <Button
        variant="contained"
        color="primary"
        href="https://www.linkedin.com/in/joel-thompson-5485b824/"
        target="_blank"
        rel="noopener noreferrer"
        sx={{ marginTop: theme.spacing(2), marginRight: theme.spacing(2) }}
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
        sx={{ marginTop: theme.spacing(2), marginRight: theme.spacing(2) }}
        startIcon={<GitHubIcon />}
      >
        View on GitHub
      </Button>
    </Paper>
  );
};
