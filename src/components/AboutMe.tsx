import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import joelAvatar from "../assets/joel-avatar.jpeg";
import Button from "@mui/material/Button";

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
        Hi! I'm a passionate web developer with experience in building modern
        and responsive web applications. I enjoy working with React and
        Material-UI to create intuitive user interfaces.
      </Typography>
      <Typography variant="body1">
        Let's connect and build something amazing together!
      </Typography>

      <Button
        variant="contained"
        color="primary"
        href="https://www.linkedin.com/in/joel-thompson-5485b824/"
        target="_blank"
        rel="noopener noreferrer"
        sx={{ marginTop: theme.spacing(2) }}
      >
        Connect on LinkedIn
      </Button>
    </Paper>
  );
};
