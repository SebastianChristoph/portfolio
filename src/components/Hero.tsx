import { Grid, Typography, Box} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  // backgroundColor: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
}));

const AvatarPlaceholder = styled(Box)(({ theme }) => ({
  width: '200px',
  height: '200px',
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
}));

const DataGridPlaceholder = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '300px',
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '1px',
  padding: '1px',
  '& > div': {
    backgroundColor: theme.palette.primary.main,
    opacity: 0.1,
  },
}));

export default function Hero() {
  return (
    <Grid container spacing={4}>
      <Grid size={{ xs: 12, md: 4 }}>
        <StyledBox>
          <Typography variant="h2" color="text.primary" gutterBottom>
            Sebastian
          </Typography>
          <Typography variant="h4" color="text.secondary" gutterBottom>
            Full Stack Developer
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Creating digital experiences that matter
          </Typography>
        </StyledBox>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <StyledBox>
          <AvatarPlaceholder>
            <Typography variant="h6" color="text.primary">
              Avatar
            </Typography>
          </AvatarPlaceholder>
        </StyledBox>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <StyledBox>
          <DataGridPlaceholder>
            {[...Array(9)].map((_, index) => (
              <div key={index} />
            ))}
          </DataGridPlaceholder>
        </StyledBox>
      </Grid>
    </Grid>
  );
}
