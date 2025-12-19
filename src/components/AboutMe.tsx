import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import Button from "@mui/material/Button";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import MenuBookIcon from "@mui/icons-material/MenuBook";

interface ProjectCardProps {
  title: string;
  description: string;
  url: string;
  buttonText: string;
}

const ProjectCard = ({
  title,
  description,
  url,
  buttonText,
}: ProjectCardProps) => {
  return (
    <Card
      variant="outlined"
      sx={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="medium"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          endIcon={<OpenInNewIcon />}
          sx={{
            fontSize: "1rem",
            textTransform: "none",
            fontWeight: 500,
          }}
        >
          {buttonText}
        </Button>
      </CardActions>
    </Card>
  );
};

export const AboutMe = () => {
  const theme = useTheme();

  const projects = [
    {
      title: "gi",
      description:
        "A command-line tool that uses AI to generate meaningful commit messages for your git changes. It analyzes your diff, understands the changes made, and creates conventional commit messages that accurately describe your work.",
      url: "https://github.com/joel-thompson/gi",
      buttonText: "View on GitHub",
    },
    {
      title: "training-tracker",
      description:
        "A web app to track jiu jitsu training sessions. Track your session, set goals, map out your techniques. Built with Typescript, React, and Hono.",
      url: "https://github.com/joel-thompson/training-tracker",
      buttonText: "View on GitHub",
    },
  ];

  return (
    <>
      <Paper
        variant="outlined"
        elevation={0}
        sx={{ padding: theme.spacing(3) }}
      >
        <Avatar
          alt="Joel Thompson"
          src="/images/jpic.jpg"
          sx={{ width: 56, height: 56, margin: theme.spacing(2) }}
        />
        <Typography variant="h4" gutterBottom>
          Joel Thompson
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Software Engineer
        </Typography>
        <Typography variant="body1" paragraph>
          Hello! I'm a software engineer focused on building modern applications
          with React and Next.js. Lately, I've been working on AI integration
          projects. I have experience working with JavaScript / TypeScript,
          Golang, and Ruby / Ruby on Rails.
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: theme.spacing(1),
          }}
        >
          <Button
            variant="contained"
            color="primary"
            href="https://www.linkedin.com/in/joel-thompson-5485b824/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              marginTop: theme.spacing(2),
              flexShrink: 0,
            }}
            startIcon={<LinkedInIcon />}
          >
            Connect on LinkedIn
          </Button>

          <Button
            variant="contained"
            color="primary"
            href="https://github.com/joel-thompson"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              marginTop: theme.spacing(2),
              flexShrink: 0,
            }}
            startIcon={<GitHubIcon />}
          >
            Find me on GitHub
          </Button>

          <Button
            variant="contained"
            color="primary"
            href="/resume"
            sx={{
              marginTop: theme.spacing(2),
              flexShrink: 0,
            }}
            startIcon={<MenuBookIcon />}
          >
            My Resume
          </Button>
          <Button
            variant="contained"
            color="primary"
            href="/bookmarks"
            sx={{
              marginTop: theme.spacing(2),
              flexShrink: 0,
            }}
            startIcon={<MenuBookIcon />}
          >
            Bookmarks
          </Button>
        </Box>
      </Paper>

      <Typography
        variant="h5"
        sx={{ marginTop: theme.spacing(4), marginBottom: theme.spacing(2) }}
      >
        Projects
      </Typography>

      <Typography variant="body1" paragraph>
        I've built these projects for myself and friends, check them out if
        you're interested in seeing what I've been working on:
      </Typography>

      <Grid container spacing={2}>
        {projects.map((project) => (
          <Grid item xs={12} sm={6} key={project.url}>
            <ProjectCard
              title={project.title}
              description={project.description}
              url={project.url}
              buttonText={project.buttonText}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
