import { Fab, useTheme, useScrollTrigger, Zoom } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useThemeContext } from '../context/ThemeContext';

const ScrollToTop = () => {
  const { isDarkMode } = useThemeContext();
  const theme = useTheme();
  
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Zoom in={trigger}>
      <Fab
        color="primary"
        size="small"
        onClick={handleClick}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 1000,
          backgroundColor: isDarkMode ? theme.palette.primary.dark : theme.palette.primary.main,
          '&:hover': {
            backgroundColor: isDarkMode ? theme.palette.primary.main : theme.palette.primary.dark,
          },
        }}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Zoom>
  );
};

export default ScrollToTop; 