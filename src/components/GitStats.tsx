import { Box, Typography, Grid, Card, CardContent, CircularProgress, useTheme, useMediaQuery } from "@mui/material";
import GitHubCalendar from 'react-github-calendar';
import { useState, useEffect } from 'react';

export default function GitStats() {
  const username = "SebastianChristoph";
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Grid size={{ xs: 12, md: 6 }} id="gitstats">
      <Typography variant="h2" sx={{ mb: 3, textAlign: 'left' }}>
        GitHub Stats
      </Typography>
      <Grid container spacing={4}>
        {/* Top Languages Card */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ height: '100%', bgcolor: '#101935', position: 'relative' }}>
            <CardContent sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '200px' }}>
              {isLoading ? (
                <CircularProgress sx={{ color: '#ff6b6b' }} />
              ) : (
                <img
                  src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=dark&hide_border=true&bg_color=101935&text_color=ffffff&title_color=8f9ba8&icon_color=8f9ba8`}
                  alt="Top Languages"
                  style={{ width: '100%', height: 'auto' }}
                />
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* GitHub Streak Stats */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ height: '100%', bgcolor: '#101935', position: 'relative' }}>
            <CardContent sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '200px' }}>
              {isLoading ? (
                <CircularProgress sx={{ color: '#ff6b6b' }} />
              ) : (
                <img
                  src={`https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=dark&hide_border=true&background=101935&stroke=ff6b6b&ring=ff6b6b&fire=ff6b6b&currStreakNum=ffffff&sideNums=ffffff&currStreakLabel=4a9eff&sideLabels=4a9eff&dates=8f9ba8`}
                  alt="GitHub Streak Stats"
                  style={{ width: '100%', height: 'auto' }}
                />
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* GitHub Contribution Calendar */}
        <Grid size={{ xs: 12, md: 12 }}>
          <Card sx={{ bgcolor: '#101935', position: 'relative' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: '#ffffff' }}>
                Contribution Activity
              </Typography>
              <Box >
                {isLoading ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
                    <CircularProgress sx={{ color: '#ff6b6b' }} />
                  </Box>
                ) : (
                  <GitHubCalendar
                    username={username}
                    colorScheme="light"
                    blockSize={9}
                    blockMargin={4}
                    fontSize={12}
                    style={{ maxWidth: '100%' }}
                    theme={{
                      light: ['#101935', '#4a9eff33', '#4a9eff66', '#4a9eff99', '#4a9eff']
                    }}
                    labels={{
                      legend: {
                        less: 'Less',
                        more: 'More'
                      }
                    }}
                  />
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
}