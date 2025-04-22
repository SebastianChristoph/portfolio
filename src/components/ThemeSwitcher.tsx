import { Box, styled, Tooltip } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useThemeContext } from "../context/ThemeContext";

const LeverBase = styled(Box)(({ theme }) => ({
  width: "60px",
  height: "24px",
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.grey[800]
      : theme.palette.grey[300],
  borderRadius: "12px",
  position: "relative",
  cursor: "pointer",
  transition: "all 0.3s ease",
}));

const Lever = styled(Box)<{ isLeft: boolean }>(({ theme, isLeft }) => ({
  width: "28px",
  height: "20px",
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[600] : "#fff",
  borderRadius: "10px",
  position: "absolute",
  top: "2px",
  left: isLeft ? "2px" : "30px",
  transition: "left 0.3s ease",
  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const IconContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  width: "20px",
  height: "20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  opacity: 0.4,
  color:
    theme.palette.mode === "dark"
      ? theme.palette.common.white
      : theme.palette.grey[800],
  "&.active": {
    opacity: 1,
    color:
      theme.palette.mode === "dark"
        ? theme.palette.primary.light
        : theme.palette.primary.main,
  },
}));

const ThemeSwitcher = () => {
  const { isDarkMode, toggleTheme } = useThemeContext();

  return (
    <Tooltip
      title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      <LeverBase onClick={toggleTheme} sx={{ ml: 2 }}>
        <IconContainer
          sx={{ left: "6px" }}
          className={!isDarkMode ? "active" : ""}
        >
          <LightModeIcon sx={{ fontSize: 18 }} />
        </IconContainer>
        <IconContainer
          sx={{ right: "6px" }}
          className={isDarkMode ? "active" : ""}
        >
          <DarkModeIcon sx={{ fontSize: 18 }} />
        </IconContainer>
        <Lever isLeft={!isDarkMode} />
      </LeverBase>
    </Tooltip>
  );
};

export default ThemeSwitcher;
