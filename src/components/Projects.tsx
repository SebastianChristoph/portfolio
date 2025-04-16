import { Grid, Typography, Box, Card, CardContent, CardMedia, Chip, Button } from "@mui/material";
import { FaExternalLinkAlt, FaReact, FaNodeJs, FaDatabase, FaCss3 } from "react-icons/fa";
import { SiTypescript, SiMongodb, SiRedux, SiFirebase, SiExpress, SiMui, SiNextdotjs } from "react-icons/si";

// Helper function to get icon for technology
const getTechIcon = (tech: string) => {
  switch (tech.toLowerCase()) {
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
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link: string;
}

// Dummy data for projects
const projects: Project[] = [
  {
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with shopping cart and payment integration",
    image: "/placeholder.png",
    technologies: ["React", "Node.js", "MongoDB", "Express", "Redux"],
    link: "https://project-url.com"
  },
  {
    title: "Task Management App",
    description: "Mobile task manager with real-time updates and team collaboration features",
    image: "/placeholder.png",
    technologies: ["React Native", "Firebase", "TypeScript", "Redux"],
    link: "https://task-manager-url.com"
  },
  {
    title: "Portfolio Website",
    description: "Modern portfolio website built with Next.js and Material-UI",
    image: "/placeholder.png",
    technologies: ["React", "Material-UI", "TypeScript", "CSS"],
    link: "https://portfolio-url.com"
  }
];

export default function Projects() {
  return (
    <Grid size={{ xs: 12, md: 9 }}  id="projects">
      <Typography variant="h2" sx={{ mb: 3, textAlign: 'left', color: 'text.secondary' }}>
        Projects
      </Typography>
      <Box sx={{minHeight: '105px'}}>
        <Typography variant="body1" sx={{ textAlign: 'left', paddingLeft: 2, color: 'text.secondary' }}>
          Here you'll find an overview of my key projects, showcasing various technologies and solutions I've worked with. Each project demonstrates different technical skills and implementation approaches.
        </Typography>
      </Box>
      <Box sx={{ 
        height: 550,
        overflowY: 'auto',
        border: 1,
        borderColor: 'divider',
        borderRadius: 2,
        backgroundColor: 'background.paper',
        p: 3,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
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
              transformStyle: 'preserve-3d',
              transition: 'transform 0.8s',
              '&:hover': {
                transform: 'rotateY(180deg)',
              },
            }}
          >
            {/* Front of card */}
            <Card sx={{ 
              position: 'relative',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              backgroundColor: 'background.paper',
              border: 1,
              borderColor: 'divider',
            }}>
              <CardMedia
                component="img"
                height="160"
                image={project.image}
                alt={project.title}
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
                    {project.title}
                  </Typography>
                </Box>
                <Box sx={{ minHeight: "70px" }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {project.description}
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

            {/* Back of card */}
            <Card sx={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              backgroundColor: 'background.paper',
              border: 1,
              borderColor: 'divider',
            }}>
              <Button
                component="a"
                variant="contained"
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<FaExternalLinkAlt />}
                sx={{
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  }
                }}
              >
                View Project
              </Button>
            </Card>
          </Box>
        ))}
      </Box>
    </Grid>
  );
}