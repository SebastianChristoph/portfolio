import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Hero from './components/Hero';
import NavBar from './components/NavBar';
import { lightTheme, darkTheme } from '../theme';
import { Container, Grid, Box } from "@mui/material";
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Cv from './components/Cv';
import Contact from './components/Contact';
import GitStats from './components/GitStats';
import Footer from './components/Footer';

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <NavBar />
        <Container maxWidth="xl" sx={{ flex: 1 }}>
          <Hero /> 
          <Grid container spacing={4}>
            <TechStack />
            <Projects />
          </Grid>
          <Cv />
          <Grid container spacing={4}>
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
