import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import resumeData from "./resume.json";

interface Position {
  title: string;
  startDate: string;
  endDate: string;
}

interface Experience {
  company: string;
  title?: string;
  startDate?: string;
  endDate?: string;
  positions?: Position[];
  responsibilities: string[];
}

interface ExperienceItemProps {
  experience: Experience;
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({ experience }) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        {experience.company}
      </Typography>

      {experience.title && (
        <Typography
          component="div"
          color="primary.main"
          fontWeight="bold"
          sx={{ mb: 0.5 }}
        >
          {experience.title} - {experience.startDate} to {experience.endDate}
        </Typography>
      )}

      {experience.positions &&
        experience.positions.map((pos, index) => (
          <Typography
            key={index}
            component="div"
            color="primary.main"
            fontWeight="bold"
            sx={{ mb: 0.5 }}
          >
            {pos.title} - {pos.startDate} to {pos.endDate}
          </Typography>
        ))}

      {experience.responsibilities.map((responsibility, index) => (
        <Typography key={index} variant="body1" paragraph sx={{ mb: 1 }}>
          {responsibility}
        </Typography>
      ))}
    </Box>
  );
};

interface SkillSectionProps {
  title: string;
  items: string[];
}

const SkillSection: React.FC<SkillSectionProps> = ({ title, items }) => (
  <Box sx={{ mb: 2 }}>
    <Typography variant="subtitle1" fontWeight="bold">
      {title}:
    </Typography>
    <Box component="ul" sx={{ mt: 0.5, pl: 2 }}>
      {items.map((item, index) => (
        <Typography key={index} component="li" variant="body1">
          {item}
        </Typography>
      ))}
    </Box>
  </Box>
);

export const Resume = () => {
  const theme = useTheme();

  return (
    <Container>
      <Paper
        elevation={0}
        sx={{
          p: 4,
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: `${theme.shape.borderRadius}px`,
        }}
      >
        {/* Header */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            {resumeData.personalInfo.name}
          </Typography>
          <Typography variant="body1">
            {resumeData.personalInfo.phone} • {resumeData.personalInfo.email} •{" "}
            {resumeData.personalInfo.website}
          </Typography>
          <Typography variant="body1" paragraph sx={{ mt: 2, mb: 0 }}>
            {resumeData.summary}
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Experience Section */}
          <Grid item xs={12} md={8} sx={{ pr: { xs: 0, md: 3 } }}>
            <Typography variant="h5" color="primary.main" sx={{ mb: 2 }}>
              Experience
            </Typography>
            {resumeData.experience.map((exp, index) => (
              <ExperienceItem key={index} experience={exp} />
            ))}
          </Grid>

          {/* Skills & Education Section */}
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              pl: { xs: 0, md: 4 },
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                left: { xs: 0, md: 16 },
                top: 0,
                bottom: 0,
                width: '1px',
                backgroundColor: theme.palette.divider,
                display: { xs: 'none', md: 'block' }
              }
            }}
          >
            {/* Skills Section */}
            <Box
              sx={{
                position: "relative"
              }}
            >
              <Typography variant="h5" color="primary.main" sx={{ mb: 2 }}>
                Skills & Expertise
              </Typography>

              <SkillSection
                title="Languages"
                items={resumeData.skills.languages}
              />
              <SkillSection
                title="Frontend"
                items={resumeData.skills.frontend}
              />
              <SkillSection title="Backend" items={resumeData.skills.backend} />
              <SkillSection
                title="Platform & Architecture"
                items={resumeData.skills.platformArchitecture}
              />
              <SkillSection title="Tools" items={resumeData.skills.tools} />
            </Box>

            {/* Education Section */}
            <Box
              sx={{
                mt: 4,
                position: "relative"
              }}
            >
              <Typography variant="h5" color="primary.main" sx={{ mb: 2 }}>
                Education
              </Typography>
              <Typography variant="h6">
                {resumeData.education.institution}
              </Typography>
              <Typography variant="body1">
                {resumeData.education.degree}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};
