import { AppBar, Toolbar, Typography, Button, Box, IconButton, useTheme, Drawer, List, ListItem, ListItemText, ListItemIcon, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import CodeIcon from '@mui/icons-material/Code';
import WorkIcon from '@mui/icons-material/Work';
import ArticleIcon from '@mui/icons-material/Article';
import BarChartIcon from '@mui/icons-material/BarChart';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useState } from 'react';

const NavBar = () => {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

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

  const drawer = (
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
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            }
          }}
        >
          <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
            {item.icon}
          </ListItemIcon>
          <ListItemText primary={item.label} />
        </ListItem>
      ))}
      <Divider sx={{ my: 2 }} />
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, p: 2 }}>
        {socialLinks.map((social) => (
          <IconButton
            key={social.label}
            color="inherit"
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
          >
            {social.icon}
          </IconButton>
        ))}
      </Box>
    </List>
  );

  return (
    <>
      <AppBar 
        position="sticky" 
        sx={{ 
          backgroundColor: 'transparent',
          backdropFilter: 'blur(10px)',
          boxShadow: 'none',
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display: { xs: 'block', md: 'none' } }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography 
            variant="h6" 
            onClick={() => scrollToSection('home')}
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
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {menuItems.map((item) => (
              <Button 
                key={item.id} 
                color="inherit"
                onClick={() => scrollToSection(item.id)}
                startIcon={item.icon}
                sx={{
                  mx: 1,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
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
              pl: 4
            }}
          >
            {socialLinks.map((social) => (
              <IconButton
                key={social.label}
                color="inherit"
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  }
                }}
              >
                {social.icon}
              </IconButton>
            ))}
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
            backgroundColor: theme.palette.background.default,
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default NavBar; 