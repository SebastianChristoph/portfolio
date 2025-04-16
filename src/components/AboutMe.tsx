import { Box, Paper, Typography } from "@mui/material";

export default function AboutMe() {
  return (
    <Box sx={{ 
      width: '100%', 
      py: 4,
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4,
          width: '100%',
         mb: "100px",
          mx: 'auto'
        }}
      >
        <Typography variant="h4" gutterBottom>
          About Me
        </Typography>
        <Typography variant="body1" paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Typography>
        <Typography variant="body1" paragraph>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </Typography>
        <Typography variant="body1">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
        </Typography>
      </Paper>
    </Box>
  );
}