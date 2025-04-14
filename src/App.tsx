import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Hero from './components/Hero';
import { lightTheme, darkTheme } from '../theme';


function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Hero />
    </ThemeProvider>
  );
}

export default App;
