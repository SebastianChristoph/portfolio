import { Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const HeroContainer = styled(Box)(({ }) => ({
  width: '100%',
  height: '400px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  position: 'relative',
  overflow: 'hidden',
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

const ProfileImage = styled(Box)(({ }) => ({
  width: '250px',
  height: '250px',
  borderRadius: '50%',
  overflow: 'hidden',
  position: 'relative',
  border: '2px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)',
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

const GraphicElement = styled(Box)(({ }) => ({
  position: 'absolute',
  width: '200px',
  height: '200px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '10px',
  backdropFilter: 'blur(5px)',
  background: 'rgba(255, 255, 255, 0.05)',
}));

export default function Hero() {
  return (
    <HeroContainer>
      <ContentWrapper>
        <TextContent>
          <Typography 
            variant="h1" 
            sx={{ 
              fontSize: '3.5rem', 
              fontWeight: 'bold',
              color: '#fff',
              mb: 1
            }}
          >
            Sebastian Christoph
          </Typography>
          <Typography 
            variant="h2" 
            sx={{ 
              fontSize: '1.75rem',
              color: '#8f9ba8',
              mb: 2,
              fontWeight: 'normal'
            }}
          >
            Full-Stack Software Developer
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#8f9ba8',
              mb: 3,
              maxWidth: '600px'
            }}
          >
            Passionate about creating innovative solutions and delivering exceptional user experiences through clean, efficient code and modern technologies.
          </Typography>
          <Box>
            <StyledButton 
              variant="contained" 
              color="primary"
              sx={{ 
                '&:hover': { backgroundColor: theme => theme.palette.primary.dark }
              }}
            >
              Hire Me
            </StyledButton>
            <StyledButton 
              variant="outlined" 
              color="secondary"
              sx={{ 
                '&:hover': { borderColor: theme => theme.palette.secondary.dark }
              }}
            >
              Portfolio
            </StyledButton>
          </Box>
        </TextContent>
        <ProfileImage>
          <img
            src="/profil2_header_2500px.jpg"
            alt="Profile"
          />
        </ProfileImage>
      </ContentWrapper>
      
      {/* Decorative elements */}
      <GraphicElement sx={{ top: '10%', right: '5%', transform: 'rotate(15deg)' }} />
      <GraphicElement sx={{ top: '20%', left: '75%', transform: 'rotate(-8deg)', opacity: 0.4, zIndex: 0 }} />
    </HeroContainer>
  );
}
