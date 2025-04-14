import { Grid, Typography, Box, Card, CardContent, CardMedia, Chip } from "@mui/material";

// Dummy data for projects
const projects = [
  {
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with shopping cart and payment integration",
    image: "/placeholder.png",
    technologies: ["React", "Node.js", "MongoDB", "Express", "Redux"]
  },
  {
    title: "Task Management App",
    description: "Mobile task manager with real-time updates and team collaboration features",
    image: "/placeholder.png",
    technologies: ["React Native", "Firebase", "TypeScript", "Redux"]
  },
  {
    title: "Portfolio Website",
    description: "Modern portfolio website built with Next.js and Material-UI",
    image: "/placeholder.png",
    technologies: ["React", "Material-UI", "TypeScript", "CSS"]
  }
];

export default function Projects() {
  return (
    <Grid size={{ xs: 12, md: 7 }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: 'center' }}>
        Projects
      </Typography>
       <Typography variant="body1" sx={{ mb: 4.5, textAlign: 'center' }}>
        Projects
      </Typography>
          <Box sx={{ 
          
        height: 550,
        overflowY: 'auto',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        p: 3,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: 3,
        '& > *': {
          flex: 1,
          minWidth: 0, // Verhindert Overflow
        },
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '4px',
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.3)',
          },
        },
      }}>
        {projects.map((project, index) => (
          <Card key={index} sx={{ 
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            '&:hover': {
              transform: 'translateY(-5px)',
              transition: 'transform 0.3s ease-in-out',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
            }
          }}>
            <CardMedia
              component="img"
              height="160"
              image={project.image}
              alt={project.title}
              sx={{ objectFit: 'cover' }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Box sx={{ minHeight: "100px" }}>
                <Typography gutterBottom variant="h5" component="div">
                  {project.title}
                        </Typography>
                        </Box>
                        <Box sx={{ minHeight: "70px" }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {project.description}
                            </Typography>
                            </Box>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                {project.technologies.map((tech, techIndex) => (
                  <Chip
                    key={techIndex}
                    label={tech}
                    sx={{
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      color: 'text.primary',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.2)'
                      }
                    }}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Grid>
  );
}