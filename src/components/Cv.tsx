import SchoolIcon from '@mui/icons-material/School';
import { Box, Typography, useTheme, useMediaQuery, Drawer } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { useTranslation } from 'react-i18next';

interface TimelinePoint {
  year: string;
  titleKey: string;  // Key for translation
  descriptionKey: string;
  type: 'education' | 'certificate';
}

const timelineData: TimelinePoint[] = [
  {
    year: "2010",
    titleKey: "cv.education.bta.title",
    descriptionKey: "cv.education.bta.description",
    type: 'education'
  },
  {
    year: "2014",
    titleKey: "cv.education.bachelor.title",
    descriptionKey: "cv.education.bachelor.description",
    type: 'education'
  },
  {
    year: "2016",
    titleKey: "cv.education.master.title",
    descriptionKey: "cv.education.master.description",
    type: 'education'
  },
  {
    year: "2018",
    titleKey: "cv.education.teamleader.title",
    descriptionKey: "cv.education.teamleader.description",
    type: 'education'
  },
  {
    year: "2021",
    titleKey: "cv.certificates.pcep.title",
    descriptionKey: "cv.certificates.pcep.description",
    type: 'certificate'
  },
  {
    year: "2021",
    titleKey: "cv.experience.instructor.title",
    descriptionKey: "cv.experience.instructor.description",
    type: 'education'
  },
  

  {
    year: "2021",
    titleKey: "cv.certificates.pcap.title",
    descriptionKey: "cv.certificates.pcap.description",
    type: 'certificate'
  },
  {
    year: "2022",
    titleKey: "cv.experience.fullstack.title",
    descriptionKey: "cv.experience.fullstack.description",
    type: 'education'
  },
  {
    year: "2024",
    titleKey: "cv.certificates.az900.title",
    descriptionKey: "cv.certificates.az900.description",
    type: 'certificate'
  },
  {
    year: "2024",
    titleKey: "cv.certificates.dp209.title",
    descriptionKey: "cv.certificates.dp209.description",
    type: 'certificate'
  }
];

export default function Cv() {
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handlePointClick = (index: number) => {
    setSelectedPoint(index);
  };

  const handleDrawerClose = () => {
    setSelectedPoint(null);
  };

  return (
    <Box sx={{ 
      width: '100%', 
      py: 4,
      position: 'relative',
      mt: { xs: "60px", sm: "100px", md: "200px" },
      overflow: 'hidden'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Typography variant="h2" sx={{ mb: 2, textAlign: 'left', color: 'text.secondary' }}>
          {t('cv.title')}
        </Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <Typography 
          variant="body1" 
          sx={{ 
            mb: 4, 
            maxWidth: '800px', 
            textAlign: 'left',
            color: 'text.secondary',
            lineHeight: 1.8
          }}
        >
          My educational journey reflects my passion for technology and continuous learning. Starting with a strong foundation in mathematics and physics, I've expanded into computer science and modern web technologies. Through formal education and professional certifications, I've built a diverse skill set that combines theoretical knowledge with practical expertise in cloud computing and web development.
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            mb: 16,
            maxWidth: '800px',
            textAlign: 'left',
            color: 'text.main',
            fontStyle: 'italic'
          }}
        >
          Click on any point in the timeline to learn more about each milestone.
        </Typography>
      </motion.div>
      
      {/* Timeline line */}
      <Box sx={{
        position: 'relative',
        height: { xs: '80vh', sm: '4px' },
        width: { xs: '4px', sm: '90%' },
        backgroundColor: 'primary.main',
        mx: { xs: '0', sm: 'auto' },
        ml: { xs: '20px', sm: 'auto' },
        mb: 8,
        mt: 4,
        zIndex: 1
      }}>
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
                ...(isMobile
                  ? {
                      top: `${(index / (timelineData.length - 1)) * 100}%`,
                      left: '-9px',
                      transform: 'translate(-50%, -50%)'
                    }
                  : {
                      left: `${(index / (timelineData.length - 1)) * 100}%`,
                      transform: 'translateX(-50%)',
                      top: '-10px'
                    }),
                cursor: 'pointer',
                zIndex: 2
              }}
              onClick={() => handlePointClick(index)}
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
                ...(isMobile
                  ? {
                      left: '32px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 1,
                      ml: 2
                    }
                  : {
                      top: point.type === 'certificate' ? '-80px' : '30px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      minWidth: 'max-content'
                    })
              }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap',
                    color: 'text.primary'
                  }}
                >
                  {point.year}
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 0.5,
                  flexDirection: { xs: 'row', sm: 'row' },
                  mt: { xs: 0, sm: 1 }
                }}>
                  {point.type === 'certificate' && (
                    <SchoolIcon sx={{ fontSize: '1rem', color: 'secondary.main' }} />
                  )}
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      whiteSpace: 'nowrap',
                      color: 'text.secondary',
                      textAlign: 'center'
                    }}
                  >
                    {t(point.titleKey)}
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          );
        })}
      </Box>

      {/* Drawer - responsive position based on screen size */}
      <Drawer
        anchor={isMobile ? "bottom" : "right"}
        open={selectedPoint !== null}
        onClose={handleDrawerClose}
        sx={{
          '& .MuiDrawer-paper': {
            ...(isMobile ? {
              borderTopLeftRadius: '16px',
              borderTopRightRadius: '16px',
              padding: 3,
              maxHeight: '70vh'
            } : {
              width: '400px',
              padding: 4,
              bgcolor: 'background.paper'
            })
          }
        }}
      >
        {selectedPoint !== null && (
          <Box>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1, 
              mb: 3,
              borderBottom: '2px solid',
              borderColor: 'primary.main',
              pb: 2
            }}>
              {timelineData[selectedPoint].type === 'certificate' && (
                <SchoolIcon color="secondary" />
              )}
              <Typography variant="h6">
                {t(timelineData[selectedPoint].titleKey)}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" sx={{ ml: 'auto' }}>
                {timelineData[selectedPoint].year}
              </Typography>
            </Box>
            <Typography variant="body1" color="text.secondary" sx={{ 
              lineHeight: 1.8,
              whiteSpace: 'pre-line' 
            }}>
              {t(timelineData[selectedPoint].descriptionKey)}
            </Typography>
          </Box>
        )}
      </Drawer>
    </Box>
  );
}