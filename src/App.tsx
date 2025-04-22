import { Box, Container, GlobalStyles, Grid } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { useEffect } from "react";
import AboutMe from "./components/AboutMe";
import Contact from "./components/Contact";
import Cv from "./components/Cv";
import Footer from "./components/Footer";
import GitStats from "./components/GitStats";
import Hero from "./components/Hero";
import NavBar from "./components/NavBar";
import Projects from "./components/Projects";
import TechStack from "./components/TechStack";
import { ThemeContextProvider } from "./context/ThemeContext";
import "./i18n/i18n";
import Lighthouse from "./components/Lighthouse";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeContextProvider>
      <CssBaseline />
      <GlobalStyles
        styles={{
          html: {
            scrollPaddingTop: "64px", // Height of the NavBar
            scrollBehavior: "smooth",
          },
        }}
      />
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <NavBar />
        <Container maxWidth="xl" sx={{ flex: 1 }}>
          <Box id="home" sx={{ mb: { xs: 4, md: 8 } }}>
            <Hero />
          </Box>
          <Box sx={{ mb: { xs: 4, md: 8 } }}>
            <AboutMe />
          </Box>

          <Box id="cv">
            <Cv />
          </Box>
          <Lighthouse />
          <Grid container spacing={4}>
            <TechStack />
            <Projects />
          </Grid>

          <Grid container spacing={4} sx={{ mt: "200px" }}>
            <Contact />
            <GitStats />
          </Grid>
        </Container>
        <Footer />
        <ScrollToTop />
      </Box>
    </ThemeContextProvider>
  );
}

export default App;
