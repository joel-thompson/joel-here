import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import joelAvatar from "../assets/jpic.jpg";
import Button from "@mui/material/Button";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

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
      title: "My Blog",
      description:
        "Personal blog where I share thoughts on technology, software development, and other topics that interest me.",
      url: "https://www.notesfromjoel.com/",
      buttonText: "Visit Blog",
    },
    {
      title: "Bike Tools",
      description:
        "Collection of useful tools and resources for mountain biking",
      url: "https://www.somebiketools.com/",
      buttonText: "Check out Bike Tools",
    },
    {
      title: "Bass Fretboard Note Trainer",
      description:
        "Basic game to help practice mapping sheet music notes to the bass fretboard. Built with Vercel's v0 AI app builder.",
      url: "https://v0-bass-game.vercel.app/",
      buttonText: "Play Game",
    },
    {
      title: "Smith1 / Constructo",
      description:
        "AI chatbot application featuring Constructo, an AI assistant for civil engineering problems and questions.",
      url: "https://smith1.vercel.app/",
      buttonText: "Try Smith1",
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
          TypeScript, specializing in React for frontend work. I also have
          backend experience working with Node.js/Express, Go, and Ruby on
          Rails.
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
          href="https://github.com/joel-thompson"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ marginTop: theme.spacing(2), marginRight: theme.spacing(2) }}
          startIcon={<GitHubIcon />}
        >
          Find me on GitHub
        </Button>
      </Paper>

      <Typography
        variant="h5"
        sx={{ marginTop: theme.spacing(4), marginBottom: theme.spacing(2) }}
      >
        Projects
      </Typography>

      <Grid container spacing={2}>
        {projects.map((project, index) => (
          <Grid item xs={12} sm={6} key={index}>
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
