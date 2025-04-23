import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { DiVisualstudio } from "react-icons/di";
import { FaFirefox, FaGitAlt, FaJava, FaJenkins, FaPython } from "react-icons/fa";
import { FiDatabase } from "react-icons/fi";
import { IoLanguage } from "react-icons/io5";
import { MdDataset } from "react-icons/md";
import {
  SiAmazons3,
  SiApache,
  SiApachemaven,
  SiBlazor,
  SiDocker,
  SiDotnet,
  SiGooglechrome,
  SiGradle,
  SiIntellijidea,
  SiJavascript,
  SiJenkins,
  SiRider,
  SiSelenium,
  SiSharp,
  SiSpring,
  SiSqlite,
  SiVmware
} from "react-icons/si";
import { VscAzureDevops } from "react-icons/vsc";
// Helper function to get icon for technology
const getTechIcon = (tech: string) => {
  switch (tech) {
    case "Git":
      return <FaGitAlt />;
    case "TFS":
      return <FaGitAlt />;
    case "Blazor Web Components (Radzen)":
      return <SiBlazor />;
    case "Entity Framework Core (with Mediator Pattern via MediatR)":
      return <SiDotnet />;
      case "Entity Framework Core (mit Mediator Pattern via MediatR)":
      return <SiDotnet />;
    case "ASP.NET Core":
      return <SiDotnet />;
    case ".NET 8":
      return <SiDotnet />;
    case ".NET Core":
      return <SiDotnet />;
    case "PostgreSQL & SQLite":
      return <FiDatabase />;
    case "Amazon S3":
      return <SiAmazons3 />;
    case "Azure DevOps":
      return <VscAzureDevops />;
    case "JetBrains Rider":
      return <SiRider />;
    case "Complete application localization":
      return <IoLanguage />;
      case "Komplette Anwendungs-Lokalisierung":
        return <IoLanguage />;
    case "Python":
      return <FaPython />;
    case "Docker":
      return <SiDocker />;
    case "C#":
      return <SiSharp />;
    case "Spring Boot":
      return <SiSpring />;
    case "Jenkins":
      return <SiJenkins />;
    case "Sqlite":
      return <SiSqlite />;

    case "JavaScript":
      return <SiJavascript />;
    case "Java":
      return <FaJava />;
    case "MS Visual Studio":
      return <DiVisualstudio />;
    case "IntelliJ IDEA":
      return <SiIntellijidea />;
    case "Maven":
      return <SiApachemaven />;
    case "Gradle":
      return <SiGradle />;
    case "VMware":
      return <SiVmware />;
    case "Jenkins (CI/CD)":
      return <FaJenkins />;
    case "Selenium (Test Automation)":
      return <SiSelenium />;
      case "Selenium (Testautomatisierung)":
        return <SiSelenium />;
    case "Mozilla Firefox":
      return <FaFirefox />;
    case "Google Chrome":
      return <SiGooglechrome />;
    case "Apache Webserver":
      return <SiApache />;
    default:
      return <MdDataset />; // Fallback icon
  }
};

interface Project {
  id: string;
  image: string;
}

interface TechnologyCategory {
  title: string;
  key: string;
  techKey: string;
}

const Lighthouse = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  const projects: Project[] = [
    {
      id: "company",
      image: "https://benobix.ch/wp-content/uploads/2024/08/image-3.webp",
    },
    {
      id: "lab",
      image:
        "https://roche.scene7.com/is/image/RocheDiaProd/181009-DASA%20Article-lab?scl=1&fit=crop,1",
    },
  ];

  const categories: TechnologyCategory[] = [
    {
      title: "Frontend & Frameworks",
      key: "frontend",
      techKey: "frontend_tech",
    },
    { title: "Backend", key: "backend", techKey: "backend_tech" },
    { title: "Databases", key: "database", techKey: "database_tech" },
    { title: "Cloud & Integration", key: "cloud", techKey: "cloud_tech" },
    { title: "Version Control", key: "version", techKey: "version_tech" },
    { title: "Development Tools", key: "dev", techKey: "dev_tech" },
    {
      title: "Programming Languages",
      key: "languages",
      techKey: "languages_tech",
    },
    { title: "Quality Control", key: "quality", techKey: "quality_tech" },
    { title: "Browser Support", key: "browser", techKey: "browser_tech" },
    { title: "Other", key: "other", techKey: "other_tech" },
  ];

  const getTechnologiesForCategory = (
    projectId: string,
    category: TechnologyCategory
  ): string[] => {
    const details = t(`lighthouse.projects.${projectId}.details`, {
      returnObjects: true,
    }) as Record<string, string>;
    const tech = details[category.techKey];
    return tech ? tech.split(", ") : [];
  };

  return (
    <Box sx={{ mt: 4, mb: 8 }}>
      <Typography
        variant="h2"
        sx={{ mb: 3, textAlign: "left", color: "text.secondary" }}
      >
        {t("lighthouse.title")}
      </Typography>
      <Grid container spacing={4}>
        {projects.map((project) => (
          <Grid size={{ xs: 12, md: 6 }} key={project.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "background.paper",
                border: 1,
                borderColor: "divider",
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: theme.shadows[4],
                },
              }}
            >
              <Box sx={{ height: "300px", position: "relative" }}>
                <CardMedia
                  component="img"
                  image={project.image}
                  alt={t(`lighthouse.projects.${project.id}.title`)}
                  sx={{
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                    backgroundColor: "background.default",
                  }}
                />
              </Box>
              <CardContent
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  pt: 3,
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    color="text.primary"
                  >
                    {t(`lighthouse.projects.${project.id}.title`)}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                    dangerouslySetInnerHTML={{
                      __html: t(
                        `lighthouse.projects.${project.id}.description`
                      ).replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
                    }}
                  />
                  {categories.map((category) => {
                    const technologies = getTechnologiesForCategory(
                      project.id,
                      category
                    );
                    if (technologies.length === 0) return null;

                    return (
                      <Box key={category.key}>
                        <Typography
                          variant="subtitle2"
                          color="text.secondary"
                          gutterBottom
                        >
                          {t(
                            `lighthouse.projects.${project.id}.details.${category.key}`
                          )}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 1,
                          }}
                        >
                          {technologies.map((tech, techIndex) => (
                            <Chip
                              key={techIndex}
                              icon={getTechIcon(tech)}
                              label={tech}
                              sx={{
                                backgroundColor: "background.default",
                                color: "text.primary",
                                "& .MuiChip-icon": {
                                  color: "inherit",
                                  marginLeft: "8px",
                                },
                                "&:hover": {
                                  backgroundColor: "action.hover",
                                },
                              }}
                            />
                          ))}
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
                <Box sx={{ flexGrow: 1 }} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Lighthouse;
