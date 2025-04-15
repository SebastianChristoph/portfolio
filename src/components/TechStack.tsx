import { Box, Typography, Button, ButtonGroup, Grid } from "@mui/material";
import { useState } from "react";
import TechStackSkill from "./TechStackSkill";

// Categories for skills
export const categories = {
  ALL: "All",
  PROGRAMMING: "Programming Languages",
  FRONTEND: "Frontend",
  BACKEND: "Backend",
  DATABASE: "Database",

} as const;

// Dummy data for skills with categories
const skills = [
  { icon: "⚛️", skill: "React", experience: 4, category: categories.FRONTEND },
  { icon: "📱", skill: "React Native", experience: 3, category: categories.FRONTEND },
  { icon: "🔷", skill: "TypeScript", experience: 4, category: categories.PROGRAMMING },
  { icon: "🎨", skill: "CSS", experience: 4, category: categories.FRONTEND },
  { icon: "📊", skill: "Node.js", experience: 3, category: categories.BACKEND },
  { icon: "🗄️", skill: "MongoDB", experience: 3, category: categories.DATABASE },
  { icon: "🔌", skill: "REST APIs", experience: 4, category: categories.BACKEND },
  { icon: "🔄", skill: "Redux", experience: 3, category: categories.FRONTEND },
  { icon: "📱", skill: "Responsive Design", experience: 4, category: categories.FRONTEND },
  { icon: "🐍", skill: "Python", experience: 3, category: categories.PROGRAMMING },
  { icon: "☕", skill: "Java", experience: 2, category: categories.PROGRAMMING },
  { icon: "⚡", skill: "Express.js", experience: 3, category: categories.BACKEND },
  { icon: "📦", skill: "PostgreSQL", experience: 3, category: categories.DATABASE },
];

export default function TechStack() {
  const [selectedCategory, setSelectedCategory] = useState<string>(categories.ALL);

  const filteredSkills = selectedCategory === categories.ALL
    ? skills
    : skills.filter(skill => skill.category === selectedCategory);

    return (
        <Grid size={{ xs: 12, md: 5 }} id="techstack">
   
      <Typography variant="h4" sx={{ mb: 3, textAlign: 'center' }}>
        Tech Stack
      </Typography>
      
      <ButtonGroup 
        variant="outlined" 
        sx={{ 
          mb: 3, 
          display: 'flex', 
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 1,
          '& .MuiButton-root': {
            borderColor: 'rgba(255, 255, 255, 0.2)',
            color: 'text.primary',
            '&:hover': {
              borderColor: 'rgba(255, 255, 255, 0.4)',
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
                backgroundColor: selectedCategory === category ? 'primary.dark' : 'rgba(255, 255, 255, 0.05)',
              }
            }}
          >
            {category}
          </Button>
        ))}
      </ButtonGroup>

      <Box sx={{ 
           height: 550,
        overflowY: 'auto',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '4px',
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.3)',
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