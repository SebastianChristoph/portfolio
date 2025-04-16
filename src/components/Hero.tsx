import { Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import BackgroundAnimation from "./BackgroundAnimation";
import { useTranslation } from 'react-i18next';

const HeroContainer = styled(Box)(({ }) => ({
  width: '100%',
  height: '400px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  position: 'relative',
  overflow: 'hidden',
  marginBottom: "10px",
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  maxWidth: '100%',
  margin: '0 auto',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(4),
  position: 'relative',
  zIndex: 1,
}));

const TextContent = styled(Box)(({ }) => ({
  flex: 1,
}));

const ProfileImage = styled(Box)(({ theme }) => ({
  width: '250px',
  height: '250px',
  borderRadius: '50%',
  overflow: 'hidden',
  position: 'relative',
  border: `2px solid ${theme.palette.divider}`,
  boxShadow: theme.shadows[5],
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  }
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '25px',
  padding: '10px 30px',
  textTransform: 'none',
  fontSize: '1rem',
  marginRight: theme.spacing(2),
}));

const GraphicElement = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '200px',
  height: '200px',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '10px',
  backdropFilter: 'blur(5px)',
  background: theme.palette.background.paper,
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
              fontSize: '3.5rem', 
              fontWeight: 'bold',
              color: 'text.primary',
              mb: 1
            }}
          >
            {t('hero.greeting')} Sebastian Christoph
          </Typography>
          <Typography 
            variant="h2" 
            sx={{ 
              fontSize: '1.75rem',
              color: 'text.secondary',
              mb: 2,
              fontWeight: 'normal'
            }}
          >
            {t('hero.role')}
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'text.secondary',
              mb: 3,
              maxWidth: '600px'
            }}
          >
            {t('hero.description')}
          </Typography>
          <Box>
            <StyledButton 
              variant="contained" 
              color="primary"
              sx={{ 
                '&:hover': { backgroundColor: 'primary.dark' }
              }}
            >
              {t('hero.hire')}
            </StyledButton>
            <StyledButton 
              variant="outlined" 
              color="secondary"
              sx={{ 
                '&:hover': { borderColor: 'secondary.dark' }
              }}
            >
              {t('hero.portfolio')}
            </StyledButton>
          </Box>
        </TextContent>
        <ProfileImage>
          <img
            src="/profil2_header_2500px.jpg"
            alt={t('hero.profileAlt')}
          />
        </ProfileImage>
      </ContentWrapper>
      
      {/* Decorative elements */}
      <GraphicElement sx={{ top: '10%', right: '5%', transform: 'rotate(15deg)' }} />
      <GraphicElement sx={{ top: '20%', left: '75%', transform: 'rotate(-8deg)', opacity: 0.4, zIndex: 0 }} />
    </HeroContainer>
  );
}
