import { Box, Typography, LinearProgress } from '@mui/material';
import { ReactElement } from 'react';

interface TechStackSkillProps {
  icon: ReactElement;
  skill: string;
  experience: number;
}

export default function TechStackSkill({ icon, skill, experience }: TechStackSkillProps) {
  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: 2, 
      p: 2,
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <Box sx={{ 
        width: 50, 
        height: 50, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        '& svg': {
          width: 32,
          height: 32
        }
      }}>
        {icon}
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography variant="h6">{skill}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LinearProgress 
            variant="determinate" 
            value={experience * 20} 
            sx={{ 
              flex: 1,
              height: 8,
              borderRadius: 4,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              '& .MuiLinearProgress-bar': {
                backgroundColor: 'secondary.main'
              }
            }} 
          />
          <Typography variant="body2" color="text.secondary">
            {experience}/5
          </Typography>
        </Box>
      </Box>
    </Box>
  );
} 