import CssBaseline from '@mui/material/CssBaseline';
import Hero from './components/Hero';
import NavBar from './components/NavBar';
import { Container, Grid, Box } from "@mui/material";
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Cv from './components/Cv';
import Contact from './components/Contact';
import GitStats from './components/GitStats';
import Footer from './components/Footer';
import { GlobalStyles } from '@mui/material';
import { ThemeContextProvider } from './context/ThemeContext';
import AboutMe from './components/AboutMe';
import { useEffect } from 'react';
import './i18n/i18n';

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ThemeContextProvider>
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
          <AboutMe />
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
    </ThemeContextProvider>
  );
}

export default App;
