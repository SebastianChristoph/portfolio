import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import GitHubCalendar from 'react-github-calendar';

export default function GitStats() {
  const username = "SebastianChristoph";

  return (
    <Grid size={{ xs: 12, md: 6 }} id="gitstats">
      <Typography variant="h4" sx={{ mb: 3, textAlign: 'center' }}>
        GitHub Stats
      </Typography>
      <Grid container spacing={4}>
        {/* Top Languages Card */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
              <img
                src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=dark&hide_border=true&bg_color=0d1117&text_color=c9d1d9&title_color=39d353`}
                alt="Top Languages"
                style={{ width: '100%', height: 'auto' }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* GitHub Streak Stats */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
              <img
                src={`https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=github-dark&hide_border=true&background=0d1117&stroke=39d353&ring=39d353&fire=39d353&currStreakNum=c9d1d9&sideNums=c9d1d9&currStreakLabel=c9d1d9&sideLabels=c9d1d9&dates=c9d1d9`}
                alt="GitHub Streak Stats"
                style={{ width: '100%', height: 'auto' }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* GitHub Contribution Calendar */}
        <Grid size={{ xs: 12, md: 12 }}>
          <Card sx={{ bgcolor: '#0d1117' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: '#c9d1d9' }}>
                Contribution Activity
              </Typography>
              <Box sx={{ 
                '.react-activity-calendar': {
                  width: '100%',
                  maxWidth: '100%',
                  overflow: 'auto'
                },
                '.react-activity-calendar-legend': {
                  color: '#39d353'
                }
              }}>
                <GitHubCalendar
                  username={username}
                  colorScheme="dark"
                  blockSize={12}
                  blockMargin={4}
                  fontSize={12}
                  style={{ maxWidth: '100%' }}
                  theme={{
                    light: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']
                  }}
                  labels={{
                    legend: {
                      less: 'Less',
                      more: 'More'
                    }
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
}