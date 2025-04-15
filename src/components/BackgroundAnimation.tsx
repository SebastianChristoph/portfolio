import React, { useEffect, useRef } from 'react';
import { Box, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';

const AnimationContainer = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 0,
  opacity: 0.2,
  overflow: 'hidden',
});

// Code snippets from different languages
const CODE_SNIPPETS = [
  'def()', // Python
  '=>{};', // TypeScript/JavaScript arrow function
  'canvas.width = canvas.offsetWidth;', // JS/TS async
  '<T>{...}', // TypeScript generic
  'export const categories', // Import statement
  'useState()', // React Hook
  'class{}', // Class definition
  'pip install', // Python package manager
  'npm run', // Node.js command
  'git push', // Git command
  '[...arr]', // Spread operator
  'SELECT *', // SQL
  'docker run', // Docker command
];

const BackgroundAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const theme = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Get the color from theme
    const particleColor = theme.palette.text.secondary;

    // Animation elements
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      type: 'dot' | 'code' | 'data';
      codeSnippet?: string;
    }> = [];

    // Create initial particles
    for (let i = 0; i < 30; i++) {
      const type = ['dot', 'code', 'data'][Math.floor(Math.random() * 3)] as 'dot' | 'code' | 'data';
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1.5,
        speedX: (Math.random() - 0.5) * 0.35,
        speedY: (Math.random() - 0.5) * 0.35,
        type,
        codeSnippet: type === 'code' ? 
          CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)] : 
          undefined
      });
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = particleColor;

      // Update and draw particles
      particles.forEach((particle, i) => {
        // Move particle
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw based on type
        switch (particle.type) {
          case 'dot':
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size * 1.2, 0, Math.PI * 2);
            ctx.fill();
            break;
          case 'code':
            ctx.font = `${particle.size * 3}px monospace`;
            ctx.fillText(particle.codeSnippet || '{;}', particle.x, particle.y);
            break;
          case 'data':
            ctx.font = `${particle.size * 4}px monospace`;
            ctx.fillText('01', particle.x, particle.y);
            break;
        }

        // Connect nearby particles
        particles.forEach((particle2, j) => {
          if (i === j) return;
          const dx = particle.x - particle2.x;
          const dy = particle.y - particle2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            const alpha = 0.2 * (1 - distance / 100);
            ctx.strokeStyle = particleColor.replace('rgb', 'rgba').replace(')', `, ${alpha})`);
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particle2.x, particle2.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, [theme.palette.text.secondary]);

  return (
    <AnimationContainer>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          maxWidth: '100vw',
          overflowX: 'hidden'
        }}
      />
    </AnimationContainer>
  );
};

export default BackgroundAnimation; 