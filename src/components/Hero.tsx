import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import BackgroundAnimation from "./BackgroundAnimation";

const HeroContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  minHeight: "400px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  position: "relative",
  overflow: "hidden",
  marginBottom: "10px",
  padding: theme.spacing(2),
  [theme.breakpoints.down("md")]: {
    minHeight: "600px",
    padding: theme.spacing(4, 2),
  },
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  maxWidth: "100%",
  margin: "0 auto",
  width: "100%",
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(4),
  position: "relative",
  zIndex: 1,
  [theme.breakpoints.down("md")]: {
    flexDirection: "column-reverse",
    textAlign: "center",
    gap: theme.spacing(3),
  },
}));

const TextContent = styled(Box)(({ theme }) => ({
  flex: 1,
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

const ProfileImage = styled(Box)(({ theme }) => ({
  width: "250px",
  height: "250px",
  borderRadius: "50%",
  overflow: "hidden",
  position: "relative",
  border: `2px solid ${theme.palette.divider}`,
  boxShadow: theme.shadows[5],
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  [theme.breakpoints.down("md")]: {
    width: "180px",
    height: "180px",
  },
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "25px",
  padding: "10px 30px",
  marginTop: "20px",
  textTransform: "none",
  fontSize: "1rem",
  [theme.breakpoints.down("md")]: {
    width: "100%",
    maxWidth: "300px",
    marginBottom: theme.spacing(1),
  },
}));

const GraphicElement = styled(Box)(({ theme }) => ({
  position: "absolute",
  width: "200px",
  height: "200px",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "10px",
  backdropFilter: "blur(5px)",
  background: theme.palette.background.paper,
  [theme.breakpoints.down("md")]: {
    width: "150px",
    height: "150px",
    display: "none",
  },
}));

export default function Hero() {
  const { t } = useTranslation();

  return (
    <HeroContainer>
      <BackgroundAnimation />
      <ContentWrapper>
        <TextContent>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2.5rem", md: "3.5rem" },
              fontWeight: "bold",
              color: "text.primary",
              mb: 1,
              wordBreak: "break-word",
            }}
          >
            {t("hero.greeting")} Sebastian Christoph
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "1.5rem", md: "1.75rem" },
              color: "text.secondary",
              mb: 2,
              fontWeight: "normal",
            }}
          >
            {t("hero.role")}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              mb: 3,
              maxWidth: { xs: "100%", md: "600px" },
              margin: { xs: "0 auto", md: "initial" },
            }}
          >
            {t("hero.description")}
          </Typography>
          <ButtonContainer>
            <StyledButton
              variant="contained"
              color="primary"
              onClick={() => {
                const contactSection = document.getElementById("contact");
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
              sx={{
                "&:hover": { backgroundColor: "primary.dark" },
                mb: { xs: 0, md: 1 },
              }}
            >
              {t("hero.hire")}
            </StyledButton>
            <StyledButton
              variant="outlined"
              color="secondary"
              onClick={() => {
                const techStackSection = document.getElementById("techstack");
                if (techStackSection) {
                  techStackSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
              sx={{
                "&:hover": { borderColor: "secondary.dark" },
                mt: { xs: 1, md: "20px" },
              }}
            >
              {t("hero.portfolio")}
            </StyledButton>
          </ButtonContainer>
        </TextContent>
        <ProfileImage>
          <img src="/profile.png" alt={t("hero.profileAlt")} />
        </ProfileImage>
      </ContentWrapper>

      {/* Decorative elements */}
      <GraphicElement
        sx={{ top: "10%", right: "5%", transform: "rotate(15deg)" }}
      />
      <GraphicElement
        sx={{
          top: "20%",
          left: "75%",
          transform: "rotate(-8deg)",
          opacity: 0.4,
          zIndex: 0,
        }}
      />
    </HeroContainer>
  );
}
