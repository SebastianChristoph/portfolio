import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Hero from './components/Hero';
import NavBar from './components/NavBar';
import { darkTheme } from '../theme';
import { Container, Grid, Box } from "@mui/material";
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Cv from './components/Cv';
import Contact from './components/Contact';
import GitStats from './components/GitStats';
import Footer from './components/Footer';
import { GlobalStyles } from '@mui/material';

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          'html': {
            scrollPaddingTop: '64px', // Height of the NavBar
            scrollBehavior: 'smooth',
          },
        }}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <NavBar />
        <Container maxWidth="xl" sx={{ flex: 1 }}>
          <Box id="home">
            <Hero />
          </Box>
          <Grid container spacing={4}>
           
              <TechStack />
            
           
              <Projects />
           
          </Grid>
          <Box id="cv">
            <Cv />
          </Box>
          <Grid container spacing={4} sx={{ mt: "200px" }}>
           
              <Contact />
           
           
              <GitStats />
           
          </Grid>
        </Container>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
