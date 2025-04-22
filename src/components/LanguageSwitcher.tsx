import { Box, styled, Tooltip } from "@mui/material";
import DE from "country-flag-icons/react/3x2/DE";
import GB from "country-flag-icons/react/3x2/GB";
import { useTranslation } from "react-i18next";

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

const Lever = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isLeft'
})<{ isLeft: boolean }>(({ theme, isLeft }) => ({
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

const FlagContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  width: "20px",
  height: "14px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  opacity: 0.4,
  filter: theme.palette.mode === "dark" ? "brightness(0.8)" : "none",
  "&.active": {
    opacity: 1,
    filter: "none",
  },
}));

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const isEnglish = i18n.language === "en";

  return (
    <Tooltip title={isEnglish ? "Switch to German" : "Switch to English"}>
      <LeverBase
        onClick={() => changeLanguage(isEnglish ? "de" : "en")}
        sx={{ ml: 2 }}
      >
        <FlagContainer
          sx={{ left: "6px" }}
          className={isEnglish ? "active" : ""}
        >
          <GB style={{ width: "20px", height: "14px" }} />
        </FlagContainer>
        <FlagContainer
          sx={{ right: "6px" }}
          className={!isEnglish ? "active" : ""}
        >
          <DE style={{ width: "20px", height: "14px" }} />
        </FlagContainer>
        <Lever isLeft={isEnglish} />
      </LeverBase>
    </Tooltip>
  );
};

export default LanguageSwitcher;
