import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Hero from './components/Hero';
import NavBar from './components/NavBar';
import { lightTheme, darkTheme } from '../theme';
import { Container, Grid} from "@mui/material";
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Cv from './components/Cv';
import Contact from './components/Contact';
import GitStats from './components/GitStats';
function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <NavBar />
      <Container maxWidth="xl">
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
    
      
     
    </ThemeProvider>
  );
}

export default App;
