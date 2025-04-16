import { AppBar, Toolbar, Typography, Button, Box, IconButton, useTheme, Drawer, List, ListItem, ListItemText, ListItemIcon, Divider, Fade, Switch, FormControlLabel } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import CodeIcon from '@mui/icons-material/Code';
import WorkIcon from '@mui/icons-material/Work';
import ArticleIcon from '@mui/icons-material/Article';
import BarChartIcon from '@mui/icons-material/BarChart';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useState, useEffect } from 'react';
import { useThemeContext } from '../context/ThemeContext';

const NavBar = () => {
  const theme = useTheme();
  const { isDarkMode, toggleTheme } = useThemeContext();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setShowTitle(scrollPosition > 100); // Show title after scrolling 100px
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileOpen(false);
    }
  };

  const menuItems = [
    { label: 'Home', id: 'home', icon: <HomeIcon /> },
    { label: 'TechStack', id: 'techstack', icon: <CodeIcon /> },
    { label: 'Projects', id: 'projects', icon: <WorkIcon /> },
    { label: 'CV', id: 'cv', icon: <ArticleIcon /> },
    { label: 'GitStats', id: 'gitstats', icon: <BarChartIcon /> },
    { label: 'Contact', id: 'contact', icon: <EmailIcon /> }
  ];

  const socialLinks = [
    { icon: <GitHubIcon />, url: 'https://github.com/SebastianChristoph', label: 'GitHub' },
    { icon: <LinkedInIcon />, url: 'https://www.linkedin.com/in/sebastian-christoph-9500a4118/', label: 'LinkedIn' }
  ];

  return (
    <>
      <AppBar 
        position="sticky" 
        sx={{ 
          backgroundColor: theme.palette.background.paper,
          boxShadow: 'none',
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="primary"
            aria-label="menu"
            sx={{ mr: 2, display: { xs: 'block', md: 'none' } }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Fade in={showTitle}>
            <Typography 
              variant="h6" 
              onClick={() => scrollToSection('home')}
              color="text.primary"
              sx={{ 
                flexGrow: 1,
                cursor: 'pointer',
                '&:hover': {
                  opacity: 0.8
                }
              }}
            >
              Portfolio
            </Typography>
          </Fade>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {menuItems.map((item) => (
              <Button 
                key={item.id} 
                color="primary"
                onClick={() => scrollToSection(item.id)}
                startIcon={item.icon}
                sx={{
                  mx: 1,
                  color: 'text.primary',
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                  }
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
          <Box 
            sx={{ 
              display: { xs: 'none', md: 'flex' }, 
              ml: 4, 
              gap: 1,
              borderLeft: `1px solid ${theme.palette.divider}`,
              pl: 4,
              alignItems: 'center'
            }}
          >
            {socialLinks.map((social) => (
              <IconButton
                key={social.label}
                color="primary"
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                sx={{
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                  }
                }}
              >
                {social.icon}
              </IconButton>
            ))}
            <FormControlLabel
              control={
                <Switch
                  checked={isDarkMode}
                  onChange={toggleTheme}
                  color="primary"
                />
              }
              label="Dark Mode"
              sx={{ 
                ml: 2,
                '& .MuiFormControlLabel-label': {
                  color: theme.palette.text.primary
                }
              }}
            />
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 240,
            backgroundColor: theme.palette.background.paper,
          },
        }}
      >
        <List>
          {menuItems.map((item) => (
            <ListItem 
              key={item.id} 
              onClick={() => scrollToSection(item.id)}
              sx={{ 
                width: '100%', 
                textAlign: 'left', 
                p: 2,
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: theme.palette.primary.main }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.label} 
                primaryTypographyProps={{ color: 'text.primary' }}
              />
            </ListItem>
          ))}
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, p: 2 }}>
            {socialLinks.map((social) => (
              <IconButton
                key={social.label}
                color="primary"
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                sx={{
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                  }
                }}
              >
                {social.icon}
              </IconButton>
            ))}
          </Box>
        </List>
        <Divider sx={{ my: 2 }} />
        <ListItem 
          sx={{ 
            width: '100%', 
            textAlign: 'left', 
            p: 2,
          }}
        >
          <FormControlLabel
            control={
              <Switch
                checked={isDarkMode}
                onChange={toggleTheme}
                color="primary"
              />
            }
            label="Dark Mode"
            sx={{ 
              width: '100%',
              '& .MuiFormControlLabel-label': {
                color: theme.palette.text.primary
              }
            }}
          />
        </ListItem>
      </Drawer>
    </>
  );
};

export default NavBar; 