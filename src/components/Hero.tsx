import { Grid, Typography } from "@mui/material";

export default function Hero() {
  return (
    <Grid container spacing={4}>
      <Grid size={{ xs: 12, md: 4 }}>
        <Typography variant="h1" color="text.primary" gutterBottom>
          Hi, I'm Sebastian
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Typography variant="h1" color="text.primary" gutterBottom>
          Hi, I'm Sebastian
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Typography variant="h4" color="text.primary">
          Your Image Here
        </Typography>
      </Grid>
    </Grid>
  );
}
