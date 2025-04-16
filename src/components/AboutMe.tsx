import { Box, Paper, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";

export default function AboutMe() {
  const theme = useTheme();

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
          p: 4,
          width: '100%',
          mb: "100px",
          mx: 'auto',
          position: 'relative',
          bgcolor: theme.palette.background.paper,
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Box sx={{width: '70%'}}>
          <Typography variant="h4" gutterBottom>
            About Me
          </Typography>
          <Typography variant="body1" paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </Typography>
          <Typography variant="body1" paragraph>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </Typography>
          <Typography variant="body1">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </Typography>
        </Box>
        
        <Box sx={{
          position: 'absolute',
          right: '40px',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
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
              DEDICATED
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
              CREATIVE
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
              INNOVATIVE
            </Typography>
          </motion.div>
        </Box>
      </Paper>
    </Box>
  );
}