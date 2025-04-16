import { Box, Paper, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';

export default function AboutMe() {
  const theme = useTheme();
  const { t } = useTranslation();
 
  const wordVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (custom: number) => ({
      opacity: 0.25,
      x: 0,
      transition: {
        delay: custom * 0.3,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <Box sx={{ 
      width: '100%', 
      py: 4,
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Paper 
        elevation={0} 
        sx={{ 
          p: { xs: 2, md: 4 },
          width: '100%',
          mb: { xs: "50px", md: "100px" },
          mx: 'auto',
          position: 'relative',
          bgcolor: theme.palette.background.paper,
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Box sx={{
          width: { xs: '100%', md: '70%' },
          zIndex: 1
        }}>
          <Typography variant="h4" gutterBottom>
            {t('about.title')}
          </Typography>
          <Typography variant="body1" paragraph>
            {t('about.paragraph1')}
          </Typography>
          <Typography variant="body1" paragraph>
            {t('about.paragraph2')}
          </Typography>
          <Typography variant="body1">
            {t('about.paragraph3')}
          </Typography>
        </Box>
        
        <Box sx={{
          position: 'absolute',
          right: '40px',
          top: '50%',
          transform: 'translateY(-50%)',
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          gap: 4,
          alignItems: 'flex-end'
        }}>
          <motion.div
            variants={wordVariants}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            <Typography 
              variant="h2" 
              sx={{ 
                color: theme.palette.primary.main,
                fontSize: '3rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
                '&::after': { display: 'none' }
              }}
            >
              {t('about.word1')}
            </Typography>
          </motion.div>

          <motion.div
            variants={wordVariants}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            <Typography 
              variant="h2" 
              sx={{ 
                color: theme.palette.secondary.main,
                fontSize: '3rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
                '&::after': { display: 'none' }
              }}
            >
              {t('about.word2')}
            </Typography>
          </motion.div>

          <motion.div
            variants={wordVariants}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            <Typography 
              variant="h2" 
              sx={{ 
                color: theme.palette.accent.main,
                fontSize: '3rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
                '&::after': { display: 'none' }
              }}
            >
              {t('about.word3')}
            </Typography>
          </motion.div>
        </Box>
      </Paper>
    </Box>
  );
}