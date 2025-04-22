import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import GitHubCalendar from "react-github-calendar";

export default function GitStats() {
  const username = "SebastianChristoph";
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  // Define streak stats theme configuration
  const streakTheme = isDarkMode
    ? {
        background: "101935",
        border: "30363d",
        stroke: "ff6b6b",
        ring: "ff6b6b",
        fire: "ff6b6b",
        sideLabels: "4a9eff",
        sideNums: "ffffff",
        currStreakLabel: "4a9eff",
        currStreakNum: "ffffff",
        dates: "8f9ba8",
      }
    : {
        background: "FFFFFF",
        border: "e4e2e2",
        stroke: "0080ff",
        ring: "0080ff",
        fire: "0080ff",
        sideLabels: "059669",
        sideNums: "1E293B",
        currStreakLabel: "059669",
        currStreakNum: "1E293B",
        dates: "64748B",
      };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Grid size={{ xs: 12, md: 6 }} id="gitstats">
      <Typography
        variant="h2"
        sx={{ mb: 3, textAlign: "left", color: "text.secondary" }}
      >
        GitHub Stats
      </Typography>
      <Grid container spacing={4}>
        {/* Top Languages Card */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            sx={{
              height: "100%",
              bgcolor: isDarkMode ? "#101935" : "#FFFFFF",
              position: "relative",
            }}
          >
            <CardContent
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "200px",
              }}
            >
              {isLoading ? (
                <CircularProgress
                  sx={{ color: isDarkMode ? "#ff6b6b" : "#0080ff" }}
                />
              ) : (
                <img
                  src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=${
                    isDarkMode ? "dark" : "light"
                  }&hide_border=true&bg_color=${
                    isDarkMode ? "101935" : "FFFFFF"
                  }&text_color=${
                    isDarkMode ? "ffffff" : "1E293B"
                  }&title_color=${
                    isDarkMode ? "8f9ba8" : "64748B"
                  }&icon_color=${isDarkMode ? "8f9ba8" : "64748B"}`}
                  alt="Top Languages"
                  style={{ width: "100%", height: "auto" }}
                />
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* GitHub Streak Stats */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            sx={{
              height: "100%",
              bgcolor: isDarkMode ? "#101935" : "#FFFFFF",
              position: "relative",
            }}
          >
            <CardContent
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "200px",
              }}
            >
              {isLoading ? (
                <CircularProgress
                  sx={{ color: isDarkMode ? "#ff6b6b" : "#0080ff" }}
                />
              ) : (
                <img
                  src={`https://streak-stats.demolab.com?user=${username}&theme=${
                    isDarkMode ? "dark" : "light"
                  }&hide_border=true&background=${
                    streakTheme.background
                  }&stroke=${streakTheme.stroke}&ring=${
                    streakTheme.ring
                  }&fire=${streakTheme.fire}&currStreakNum=${
                    streakTheme.currStreakNum
                  }&sideNums=${streakTheme.sideNums}&currStreakLabel=${
                    streakTheme.currStreakLabel
                  }&sideLabels=${streakTheme.sideLabels}&dates=${
                    streakTheme.dates
                  }`}
                  alt="GitHub Streak Stats"
                  style={{ width: "100%", height: "auto" }}
                />
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* GitHub Contribution Calendar */}
        <Grid size={{ xs: 12, md: 12 }}>
          <Card
            sx={{
              bgcolor: isDarkMode ? "#101935" : "#FFFFFF",
              position: "relative",
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ color: isDarkMode ? "#ffffff" : "#1E293B" }}
              >
                Contribution Activity
              </Typography>
              <Box>
                {isLoading ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      minHeight: "200px",
                    }}
                  >
                    <CircularProgress
                      sx={{ color: isDarkMode ? "#ff6b6b" : "#0080ff" }}
                    />
                  </Box>
                ) : (
                  <GitHubCalendar
                    username={username}
                    colorScheme={isDarkMode ? "dark" : "light"}
                    blockSize={9}
                    blockMargin={4}
                    fontSize={12}
                    style={{ maxWidth: "100%" }}
                    labels={{
                      legend: {
                        less: "Less",
                        more: "More",
                      },
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
