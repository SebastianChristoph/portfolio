import { Box, Grid, Typography, Tooltip, Paper } from "@mui/material";
import { useState } from "react";
import SchoolIcon from '@mui/icons-material/School';

interface TimelinePoint {
  year: string;
  title: string;
  description: string;
  type: 'education' | 'certificate';
}

const timelineData: TimelinePoint[] = [
  {
    year: "2020",
    title: "Abitur",
    description: "Abschluss des Abiturs mit Schwerpunkt in Mathematik und Physik",
    type: 'education'
  },
  {
    year: "2022",
    title: "Bachelor of Arts",
    description: "Abschluss des Bachelorstudiums in Informatik an der Universität XYZ",
    type: 'education'
  },
  {
    year: "2023",
    title: "Praktikum",
    description: "6-monatiges Praktikum bei TechCompany GmbH im Bereich Softwareentwicklung",
    type: 'education'
  },
  {
    year: "2024",
    title: "AWS Cloud Practitioner",
    description: "Zertifizierung in Cloud Computing Grundlagen",
    type: 'certificate'
  },
  {
    year: "2024",
    title: "React Advanced",
    description: "Fortgeschrittene React-Kenntnisse und Best Practices",
    type: 'certificate'
  }
];

export default function Cv() {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  return (
    <Box sx={{ 
      width: '100%', 
      py: 4,
      position: 'relative'
    }}>
      <Typography variant="h4" sx={{ mb: 12, textAlign: 'center' }}>
        Meine Ausbildung & Zertifikate
      </Typography>
      
      {/* Timeline line */}
      <Box sx={{
        position: 'relative',
        height: '4px',
        backgroundColor: 'primary.main',
        width: '90%',
        mx: 'auto',
        mb: 8
      }}>
        {/* Timeline points */}
        {timelineData.map((point, index) => (
          <Box
            key={index}
            sx={{
              position: 'absolute',
              left: `${(index / (timelineData.length - 1)) * 100}%`,
              transform: 'translateX(-50%)',
              top: '0px',
              cursor: 'pointer'
            }}
            onMouseEnter={() => setHoveredPoint(index)}
            onMouseLeave={() => setHoveredPoint(null)}
          >
            <Box sx={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: point.type === 'certificate' ? 'secondary.main' : 'primary.main',
              border: '4px solid white',
              boxShadow: '0 0 0 2px primary.main',
              transform: 'translateY(-50%)'
            }} />
            
            {/* Year and title label */}
            <Box sx={{ 
              position: 'absolute',
              top: point.type === 'certificate' ? '-80px' : '30px',
              left: '50%',
              transform: 'translateX(-50%)',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <Typography 
                variant="body2" 
                sx={{ 
                  fontWeight: 'bold',
                  whiteSpace: 'nowrap'
                }}
              >
                {point.year}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                {point.type === 'certificate' && (
                  <SchoolIcon sx={{ fontSize: '1rem', color: 'secondary.main' }} />
                )}
                <Typography 
                  variant="body2" 
                  sx={{ 
                    whiteSpace: 'nowrap',
                    color: 'text.secondary'
                  }}
                >
                  {point.title}
                </Typography>
              </Box>
            </Box>

            {/* Hover tooltip */}
            {hoveredPoint === index && (
              <Paper 
                elevation={3}
                sx={{
                  position: 'absolute',
                  top: '-120px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '200px',
                  p: 2,
                  backgroundColor: 'background.paper'
                }}
              >
                <Typography variant="h6" sx={{ mb: 1 }}>
                  {point.title}
                </Typography>
                <Typography variant="body2">
                  {point.description}
                </Typography>
              </Paper>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}