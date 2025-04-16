import { Box, Button, ButtonGroup, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { FaCss3Alt, FaJava, FaJs, FaPython, FaReact } from "react-icons/fa";
import { SiDart, SiDjango, SiFlask, SiHtml5, SiPostgresql, SiSelenium, SiSharp, SiSpring, SiSqlite } from "react-icons/si";
import { DiDocker, DiLinux, DiVisualstudio } from "react-icons/di";
import { BsDatabase } from "react-icons/bs";
import { AiOutlineCloud } from "react-icons/ai";
import { GiCrystalBall } from "react-icons/gi";
import TechStackSkill from "./TechStackSkill";
import { useTranslation } from 'react-i18next';

// Categories for skills
export const categories = {
  ALL: "techstack.categories.all",
  PROGRAMMING: "techstack.categories.programming",
  FRAMEWORKS: "techstack.categories.frameworks",
  DATA_CLOUD: "techstack.categories.data_cloud",
  TOOLS: "techstack.categories.tools",
  OTHER: "techstack.categories.other",
} as const;

// Skills data with categories
const skills = [
  // Programming Languages
  { icon: <FaPython />, skill: "Python", experience: 5, category: categories.PROGRAMMING },
  { icon: <SiHtml5 />, skill: "HTML5", experience: 4, category: categories.PROGRAMMING },
  { icon: <FaCss3Alt />, skill: "CSS/Sass/SCSS", experience: 4, category: categories.PROGRAMMING },
  { icon: <SiSharp />, skill: "C#", experience: 4, category: categories.PROGRAMMING },
  { icon: <FaJs />, skill: "JavaScript", experience: 3, category: categories.PROGRAMMING },
  { icon: <GiCrystalBall />, skill: "Gherkin", experience: 3, category: categories.PROGRAMMING },
  { icon: <FaJava />, skill: "Java", experience: 2, category: categories.PROGRAMMING },
  { icon: <SiDart />, skill: "Dart", experience: 3, category: categories.PROGRAMMING },

  // Frameworks & Web Development
  { icon: <SiSpring />, skill: "Spring Boot", experience: 4, category: categories.FRAMEWORKS },
  { icon: <SiFlask />, skill: "Flask", experience: 4, category: categories.FRAMEWORKS },
  { icon: <SiDjango />, skill: "Django", experience: 4, category: categories.FRAMEWORKS },
  { icon: <FaReact />, skill: "React", experience: 4, category: categories.FRAMEWORKS },
  { icon: <SiSelenium />, skill: "Selenium", experience: 4, category: categories.FRAMEWORKS },

  // Data & Cloud
  { icon: <BsDatabase />, skill: "PostgreSQL", experience: 4, category: categories.DATA_CLOUD },
  { icon: <SiSqlite />, skill: "SQLite", experience: 4, category: categories.DATA_CLOUD },
  { icon: <AiOutlineCloud />, skill: "Azure SQL", experience: 4, category: categories.DATA_CLOUD },
  { icon: <AiOutlineCloud />, skill: "Azure Data Factory", experience: 4, category: categories.DATA_CLOUD },
  { icon: <AiOutlineCloud />, skill: "Azure Synapse Analytics", experience: 4, category: categories.DATA_CLOUD },
  { icon: <AiOutlineCloud />, skill: "Azure Data Lake Storage", experience: 4, category: categories.DATA_CLOUD },

  // Tools & IDEs
  { icon: <DiVisualstudio />, skill: "Visual Studio", experience: 4, category: categories.TOOLS },
  { icon: <DiVisualstudio />, skill: "Visual Studio Code", experience: 4, category: categories.TOOLS },
  { icon: <DiDocker />, skill: "Docker", experience: 4, category: categories.TOOLS },
  { icon: <DiLinux />, skill: "Linux", experience: 4, category: categories.TOOLS },

  // Other Skills
  { icon: <BsDatabase />, skill: "InterSystems Caché", experience: 4, category: categories.OTHER },
  { icon: <BsDatabase />, skill: "InterSystems HealthShare", experience: 4, category: categories.OTHER },
  { icon: <AiOutlineCloud />, skill: "Azure DevOps", experience: 4, category: categories.OTHER },
  { icon: <AiOutlineCloud />, skill: "Jenkins", experience: 4, category: categories.OTHER },
  { icon: <AiOutlineCloud />, skill: "Gradle", experience: 4, category: categories.OTHER },
  { icon: <AiOutlineCloud />, skill: "Maven", experience: 4, category: categories.OTHER },
];

export default function TechStack() {
  const [selectedCategory, setSelectedCategory] = useState<string>(categories.ALL);
  const { t } = useTranslation();

  const filteredSkills = selectedCategory === categories.ALL
    ? [...skills].sort((a, b) => b.experience - a.experience)
    : [...skills]
        .filter(skill => skill.category === selectedCategory)
        .sort((a, b) => b.experience - a.experience);

    return (
        <Grid size={{ xs: 12, md: 3 }} id="techstack">
   
      <Typography variant="h2" sx={{ mb: 3, textAlign: 'left', color: 'text.secondary' }}>
        {t('techstack.title')}
      </Typography>
      
      <ButtonGroup 
        variant="outlined" 
        sx={{ 
          mb: 3, 
          display: 'flex', 
          flexWrap: 'wrap',
          justifyContent: 'start',
          gap: 1,
          '& .MuiButton-root': {
            borderColor: 'divider',
            color: 'text.primary',
            '&:hover': {
              borderColor: 'text.secondary',
            }
          }
        }}
      >
        {Object.values(categories).map((category) => (
          <Button
            key={category}
            onClick={() => setSelectedCategory(category)}
            variant={selectedCategory === category ? "contained" : "outlined"}
            sx={{
              minWidth: '120px',
              backgroundColor: selectedCategory === category ? 'primary.main' : 'transparent',
              '&:hover': {
                backgroundColor: selectedCategory === category ? 'primary.dark' : 'action.hover',
              }
            }}
          >
            {t(category)}
          </Button>
        ))}
      </ButtonGroup>

      <Box sx={{ 
           height: 550,
        overflowY: 'auto',
        border: 1,
        borderRadius: 2,
        backgroundColor: 'background.paper',
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'background.default',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'divider',
          borderRadius: '4px',
          '&:hover': {
            background: 'text.secondary',
          },
        },
      }}>
        {filteredSkills.map((skill, index) => (
          <TechStackSkill
            key={index}
            icon={skill.icon}
            skill={skill.skill}
            experience={skill.experience}
          />
        ))}
      </Box>
         
            </Grid>
  );
}