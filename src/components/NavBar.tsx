import ArticleIcon from "@mui/icons-material/Article";
import BarChartIcon from "@mui/icons-material/BarChart";
import CodeIcon from "@mui/icons-material/Code";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import HomeIcon from "@mui/icons-material/Home";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MenuIcon from "@mui/icons-material/Menu";
import SpeedIcon from "@mui/icons-material/Speed";
import WorkIcon from "@mui/icons-material/Work";
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";

const NavBar = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false);
    }
  };

  const menuItems = [
    { label: t("nav.home"), id: "home", icon: <HomeIcon /> },
    { label: t("nav.cv"), id: "cv", icon: <ArticleIcon /> },
    { label: t("nav.lighthouse"), id: "lighthouse", icon: <SpeedIcon /> },
    { label: t("nav.techstack"), id: "techstack", icon: <CodeIcon /> },
    { label: t("nav.projects"), id: "projects", icon: <WorkIcon /> },
    { label: t("nav.gitstats"), id: "gitstats", icon: <BarChartIcon /> },
    { label: t("nav.contact"), id: "contact", icon: <EmailIcon /> },
  ];

  const socialLinks = [
    {
      icon: <GitHubIcon />,
      url: "https://github.com/SebastianChristoph",
      label: "GitHub",
    },
    {
      icon: <LinkedInIcon />,
      url: "https://www.linkedin.com/in/sebastian-christoph-9500a4118/",
      label: "LinkedIn",
    },
  ];

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: theme.palette.background.paper,
          boxShadow: "none",
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              size="large"
              edge="start"
              color="primary"
              aria-label="menu"
              sx={{ mr: 2, display: { xs: "block", md: "none" } }}
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Box
              sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
            >
              {menuItems.map((item) => (
                <Button
                  key={item.id}
                  color="primary"
                  onClick={() => scrollToSection(item.id)}
                  startIcon={item.icon}
                  sx={{
                    mx: 1,
                    color: "text.primary",
                    "&:hover": {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
              <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
              {socialLinks.map((social) => (
                <IconButton
                  key={social.label}
                  color="primary"
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  sx={{
                    mx: 1,
                    color: "text.primary",
                    "&:hover": {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Box>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 2,
            }}
          >
            <ThemeSwitcher />
            <LanguageSwitcher />
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
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
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
                width: "100%",
                textAlign: "left",
                p: 2,
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: "text.primary" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ color: "text.primary" }}
              />
            </ListItem>
          ))}
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2, p: 2 }}>
            {socialLinks.map((social) => (
              <IconButton
                key={social.label}
                color="primary"
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                sx={{
                  color: "text.primary",
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
              >
                {social.icon}
              </IconButton>
            ))}
          </Box>
          <Divider sx={{ my: 2 }} />
          <ListItem>
            <ThemeSwitcher />
          </ListItem>
          <ListItem>
            <LanguageSwitcher />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default NavBar;
