import { Box, Grid, Typography, Tooltip, Paper } from "@mui/material";
import { useState } from "react";
import SchoolIcon from '@mui/icons-material/School';
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";

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
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <Box sx={{ 
      width: '100%', 
      py: 4,
      position: 'relative',
      mt: "200px",
      overflow: 'hidden'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Typography variant="h2" sx={{ mb: 12, textAlign: 'left' }}>
          Meine Ausbildung & Zertifikate
        </Typography>
      </motion.div>
      
      {/* Timeline line */}
      <Box sx={{
        position: 'relative',
        height: '4px',
        backgroundColor: 'primary.main',
        width: '90%',
        mx: 'auto',
        mb: 8,
        mt: 4
      }}>
        {/* Timeline points */}
        {timelineData.map((point, index) => {
          const { ref, inView } = useInView({
            triggerOnce: true,
            threshold: 0.1,
          });

          return (
            <motion.div
              key={index}
              ref={ref}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              style={{
                position: 'absolute',
                left: `${(index / (timelineData.length - 1)) * 100}%`,
                transform: 'translateX(-50%)',
                top: '-10px',
                cursor: 'pointer'
              }}
              onMouseEnter={() => setHoveredPoint(index)}
              onMouseLeave={() => setHoveredPoint(null)}
            >
              <motion.div
                whileHover={{ scale: 1.2 }}
                animate={{ 
                  scale: [1, 1.1, 1],
                  boxShadow: [
                    `0 0 0 2px ${point.type === 'certificate' ? '#1976d2' : '#ff4081'}`,
                    `0 0 0 4px ${point.type === 'certificate' ? 'rgba(25, 118, 210, 0.5)' : 'rgba(255, 64, 129, 0.5)'}`,
                    `0 0 0 2px ${point.type === 'certificate' ? '#1976d2' : '#ff4081'}`
                  ]
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                  times: [0, 0.5, 1]
                }}
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: point.type === 'certificate' ? '#1976d2' : '#ff4081',
                  border: '4px solid #fff',
                  boxShadow: `0 0 0 2px ${point.type === 'certificate' ? '#1976d2' : '#ff4081'}`,
                  position: 'relative',
                  zIndex: 1
                }}
              />
              
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
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    position: 'relative',
                    zIndex: 10
                  }}
                >
                  <Paper 
                    elevation={3}
                    sx={{
                      position: 'absolute',
                      top: '-120px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '200px',
                      p: 2,
                      backgroundColor: 'background.paper',
                      zIndex: 10
                    }}
                  >
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      {point.title}
                    </Typography>
                    <Typography variant="body2">
                      {point.description}
                    </Typography>
                  </Paper>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </Box>
    </Box>
  );
}