import { Box, Button, ButtonGroup, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { FaCss3Alt, FaJava, FaJs, FaMobileAlt, FaNodeJs, FaReact } from "react-icons/fa";
import { MdDevices } from "react-icons/md";
import { SiExpress, SiMongodb, SiPostgresql, SiPython, SiRedux, SiTypescript } from "react-icons/si";
import TechStackSkill from "./TechStackSkill";
import { useTranslation } from 'react-i18next';

// Categories for skills
export const categories = {
  ALL: "techstack.categories.all",
  PROGRAMMING: "techstack.categories.programming",
  FRONTEND: "techstack.categories.frontend",
  BACKEND: "techstack.categories.backend",
  DATABASE: "techstack.categories.database",
} as const;

// Dummy data for skills with categories
const skills = [
  { icon: <FaReact />, skill: "React", experience: 4, category: categories.FRONTEND },
  { icon: <FaMobileAlt />, skill: "React Native", experience: 3, category: categories.FRONTEND },
  { icon: <SiTypescript />, skill: "TypeScript", experience: 4, category: categories.PROGRAMMING },
  { icon: <FaCss3Alt />, skill: "CSS", experience: 4, category: categories.FRONTEND },
  { icon: <FaNodeJs />, skill: "Node.js", experience: 3, category: categories.BACKEND },
  { icon: <SiMongodb />, skill: "MongoDB", experience: 3, category: categories.DATABASE },
  { icon: <FaJs />, skill: "REST APIs", experience: 4, category: categories.BACKEND },
  { icon: <SiRedux />, skill: "Redux", experience: 3, category: categories.FRONTEND },
  { icon: <MdDevices />, skill: "Responsive Design", experience: 4, category: categories.FRONTEND },
  { icon: <SiPython />, skill: "Python", experience: 3, category: categories.PROGRAMMING },
  { icon: <FaJava />, skill: "Java", experience: 2, category: categories.PROGRAMMING },
  { icon: <SiExpress />, skill: "Express.js", experience: 3, category: categories.BACKEND },
  { icon: <SiPostgresql />, skill: "PostgreSQL", experience: 3, category: categories.DATABASE },
];

export default function TechStack() {
  const [selectedCategory, setSelectedCategory] = useState<string>(categories.ALL);
  const { t } = useTranslation();

  const filteredSkills = selectedCategory === categories.ALL
    ? skills
    : skills.filter(skill => skill.category === selectedCategory);

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