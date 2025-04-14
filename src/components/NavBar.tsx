import { AppBar, Toolbar, Typography, Button, Box, IconButton, useTheme, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';

const NavBar = () => {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = ['Home', 'About', 'Projects', 'Contact'];

  const drawer = (
    <List>
      {menuItems.map((item) => (
        <ListItem key={item} component="button" sx={{ width: '100%', textAlign: 'left', p: 2 }}>
          <ListItemText primary={item} />
        </ListItem>
      ))}
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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Portfolio
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {menuItems.map((item) => (
              <Button key={item} color="inherit">{item}</Button>
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
          keepMounted: true, // Better open performance on mobile.
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