import { Box, Button, Card, CardContent, CardMedia, Chip, Grid, Typography, useTheme } from "@mui/material";
import { useTranslation } from 'react-i18next';
import { FaBaby, FaCloud, FaCode, FaCss3, FaDatabase, FaDocker, FaExternalLinkAlt, FaGitAlt, FaNodeJs, FaPython, FaReact } from "react-icons/fa";
import { GiMilkCarton, GiNightSleep } from "react-icons/gi";
import { SiDotnet, SiExpress, SiFirebase, SiMongodb, SiMui, SiNextdotjs, SiPostgresql, SiRedux, SiSelenium, SiSharp, SiSqlite, SiTypescript } from "react-icons/si";

// Helper function to get icon for technology
const getTechIcon = (tech: string) => {
  switch (tech.toLowerCase()) {
    case 'git':
      return <FaGitAlt />;
    case 'python':
      return <FaPython />;
    case 'docker':
      return <FaDocker />;
    case 'postgresql':
      return <SiPostgresql />;
    case 'selenium':
      return <SiSelenium />;
    case 'c#':
      return <SiSharp />;
    case 'asp.net':
      return <SiDotnet />;
    case 'azure':
      return <FaCloud />;
    case 'sqlite':
      return <SiSqlite />;
    case 'babyscript':
      return <FaBaby />;
    case 'milk.js':
      return <GiMilkCarton />;
    case 'cuddle.io':
      return <FaCode />;
    case 'sleep.api':
      return <GiNightSleep />;
    case 'react':
    case 'react native':
      return <FaReact />;
    case 'node.js':
      return <FaNodeJs />;
    case 'mongodb':
      return <SiMongodb />;
    case 'express':
      return <SiExpress />;
    case 'redux':
      return <SiRedux />;
    case 'typescript':
      return <SiTypescript />;
    case 'firebase':
      return <SiFirebase />;
    case 'material-ui':
      return <SiMui />;
    case 'css':
      return <FaCss3 />;
    case 'next.js':
      return <SiNextdotjs />;
    default:
      return <FaDatabase />; // Fallback icon
  }
};

interface Project {
  titleKey: string;
  descriptionKey: string;
  image: string;
  technologies: string[];
  link: string;
}

export default function Projects() {
  const { t } = useTranslation();
  const theme = useTheme();

  // Dummy data for projects
  const projects: Project[] = [
    {
      titleKey: "projects.fritz.title",
      descriptionKey: "projects.fritz.description",
      image: theme.palette.mode === 'dark' ? '/logo_baby_dark.png' : '/logo_baby_light.png',
      technologies: ["BabyScript", "Milk.js", "Cuddle.io", "Sleep.API"],
      link: "#"
    },
    {
      titleKey: "projects.marktzone.title",
      descriptionKey: "projects.marktzone.description",
      image: "/logo_marktzone.png",
      technologies: ["Python", "React", "TypeScript", "Docker", "PostgreSQL", "Selenium", "Git"],
      link: "https://marktzone.io"
    },
    {
      titleKey: "projects.checkdiepreise.title",
      descriptionKey: "projects.checkdiepreise.description",
      image: "/logo_checkdiepreise.png",
      technologies: ["Python", "Beautiful Soup", "Blazor", "ASP.NET", "C#", "SQLite", "Azure", "Git"],
      link: "https://check-die-preise.de"
    },
  ];

  return (
    <Grid size={{ xs: 12, md: 9 }} id="projects" sx={{ mt: { xs: 8, md: 0 } }}>
      <Typography variant="h2" sx={{ mb: 2, textAlign: 'left', color: 'text.secondary' }}>
        {t('projects.title')}
      </Typography>
      <Box sx={{ minHeight: '105px', mb: 4 }}>
        <Typography variant="body1" sx={{ textAlign: 'left', paddingLeft: 2, color: 'text.secondary' }}>
          {t('projects.description')}
        </Typography>
      </Box>
      <Box sx={{ 
        height: { xs: 'auto', sm: 550 },
        overflowY: { xs: 'visible', sm: 'auto' },
        border: 1,
        borderColor: 'divider',
        borderRadius: 2,
        backgroundColor: 'background.paper',
        p: 3,
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(auto-fit, minmax(250px, 1fr))'
        },
        gridAutoRows: '1fr',
        gap: 3,
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'background.default',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'divider',
          borderRadius: '4px',
          '&:hover': {
            background: 'text.secondary',
          },
        },
      }}>
        {projects.map((project: Project, index: number) => (
          <Box
            key={index}
            sx={{
              position: 'relative',
              height: '100%',
              '&:hover .overlay': {
                opacity: 1,
              },
            }}
          >
            {/* Project card */}
            <Card sx={{ 
              position: 'relative',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'background.paper',
              border: 1,
              borderColor: 'divider',
            }}>
              <CardMedia
                component="img"
                height="160"
                image={project.image}
                alt={t(project.titleKey)}
                sx={{ 
                  p: 3,
                  objectFit: 'contain',
                  backgroundColor: 'background.default',
                }}
              />
              <CardContent sx={{ 
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
              }}>
                <Box sx={{ minHeight: "80px" }}>
                  <Typography gutterBottom variant="h5" component="div" color="text.primary">
                    {t(project.titleKey)}
                  </Typography>
                </Box>
                <Box sx={{ minHeight: "70px" }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {t(project.descriptionKey)}
                  </Typography>
                </Box>
                <Box sx={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: 1, 
                  mt: 'auto'
                }}>
                  {project.technologies.map((tech: string, techIndex: number) => (
                    <Chip
                      key={techIndex}
                      icon={getTechIcon(tech)}
                      label={tech}
                      sx={{
                        backgroundColor: 'background.default',
                        color: 'text.primary',
                        '& .MuiChip-icon': {
                          color: 'inherit',
                          marginLeft: '8px'
                        },
                        '&:hover': {
                          backgroundColor: 'action.hover',
                        }
                      }}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>

            {/* Hover overlay */}
            <Box
              className="overlay"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: (theme) => theme.palette.mode === 'dark' 
                  ? 'rgba(0, 0, 0, 0.7)' 
                  : 'rgba(255, 255, 255, 0.7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0,
                transition: 'opacity 0.3s ease',
              }}
            >
              <Button
                component="a"
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                variant="contained"
                startIcon={<FaExternalLinkAlt />}
                sx={{
                  backgroundColor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  }
                }}
              >
                {t('projects.viewProject')}
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </Grid>
  );
}