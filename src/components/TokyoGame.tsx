import { useState, useEffect, useRef } from 'react';
import { Box, Typography, TextField } from '@mui/material';

interface TokyoGameProps {
  onExit: () => void;
}

const MI6_HEADER = `╔══════════════════════════════════════╗\n║             MI6 AGENT VIEW           ║\n║         TOP SECRET - LEVEL ALPHA     ║\n╚══════════════════════════════════════╝\n`;

const INITIAL_FILES = [
  'super_secret_code.txt',
  'do_not_open_me.txt',
];

export default function TokyoGame({ onExit }: TokyoGameProps) {
  const [input, setInput] = useState('');
  const [gameState, setGameState] = useState<'warning' | 'admin' | 'code' | 'files' | 'file_super_secret' | 'file_do_not_open'>('warning');
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [files, setFiles] = useState(INITIAL_FILES);
  const [showCode, setShowCode] = useState(true);
  const [countdown, setCountdown] = useState(10);
  const codeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const destroyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [codeInput, setCodeInput] = useState('');
  const [codeState, setCodeState] = useState<'idle' | 'wrong' | 'correct'>('idle');
  const [codeCountdown, setCodeCountdown] = useState(10);
  const codeCountdownRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (gameState === 'file_super_secret') {
      setShowCode(true);
      setCountdown(10);
      // Start countdown
      const interval = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
      // Remove file and return after 10s
      destroyTimeoutRef.current = setTimeout(() => {
        setFiles(f => f.filter(name => name !== 'super_secret_code.txt'));
        setGameState('files');
        setSelectedFile(null);
      }, 10000);
      return () => {
        clearInterval(interval);
        if (destroyTimeoutRef.current) clearTimeout(destroyTimeoutRef.current);
      };
    }
    if (codeState === 'wrong' || codeState === 'correct') {
      setCodeCountdown(10);
      const interval = setInterval(() => {
        setCodeCountdown(prev => prev - 1);
      }, 1000);
      if (codeState === 'correct') {
        codeCountdownRef.current = setTimeout(() => {
          onExit();
        }, 10000);
      }
      return () => {
        clearInterval(interval);
        if (codeCountdownRef.current) clearTimeout(codeCountdownRef.current);
      };
    }
  }, [gameState, codeState]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const value = input.toLowerCase();
      
      if (value === 'tokyo' && gameState === 'warning') {
        setGameState('admin');
      } else if (gameState === 'admin') {
        if (value === '1') {
          setGameState('code');
        } else if (value === '2') {
          setGameState('files');
        } else if (value === '3' || value === 'exit') {
          onExit();
        }
      } else if (gameState === 'code') {
        if (value === 'exit') {
          setGameState('admin');
          setCodeInput('');
          setCodeState('idle');
        } else if (value) {
          if (value === '1234') {
            setCodeState('correct');
          } else {
            setCodeState('wrong');
          }
          setCodeInput('');
        }
      } else if (gameState === 'files') {
        if (value.startsWith('open ')) {
          const filename = value.substring(5).trim();
          if (filename === 'super_secret_code.txt' && files.includes(filename)) {
            setSelectedFile(filename);
            setGameState('file_super_secret');
          } else if (filename === 'do_not_open_me.txt' && files.includes(filename)) {
            setSelectedFile(filename);
            setGameState('file_do_not_open');
          } else {
            setSelectedFile(filename);
          }
        } else if (value === 'exit') {
          setGameState('admin');
          setSelectedFile(null);
        }
      } else if (gameState === 'file_do_not_open') {
        if (value === 'exit') {
          setGameState('files');
          setSelectedFile(null);
        }
      }
      setInput('');
    }
  };

  const renderContent = () => {
    switch (gameState) {
      case 'warning':
        return (
          <Typography sx={{ fontFamily: 'Consolas, "Courier New", monospace', fontSize: '14px', color: '#CCCCCC' }}>
            {`> Oh, you must have accidentally typed "tokyo". As I said, do not type "tokyo" here`}
          </Typography>
        );
      case 'admin':
        return (
          <Typography sx={{ fontFamily: 'Consolas, "Courier New", monospace', fontSize: '14px', color: '#CCCCCC', whiteSpace: 'pre' }}>
            {`${MI6_HEADER}
> Hello Agent Bond, please make your selection and press Enter:

> 1. Enter super secret code

> 2. File overview

> 3. Exit`}
          </Typography>
        );
      case 'code':
        if (codeState === 'idle') {
          return (
            <Typography sx={{ fontFamily: 'Consolas, "Courier New", monospace', fontSize: '14px', color: '#CCCCCC', whiteSpace: 'pre-line' }}>
              {`${MI6_HEADER}
> Enter the super secret code (type 'exit' to return)
> WARNING: Entering the wrong code will trigger a security protocol with severe consequences.\n`}
            </Typography>
          );
        } else if (codeState === 'wrong') {
          return (
            <Typography sx={{ fontFamily: 'Consolas, "Courier New", monospace', fontSize: '14px', color: '#ff6b6b', whiteSpace: 'pre' }}>
              {`${MI6_HEADER}
> Incorrect code entered!
> Security protocol initiated. Countdown: ${codeCountdown}`}
            </Typography>
          );
        } else if (codeState === 'correct') {
          return (
            <Typography sx={{ fontFamily: 'Consolas, "Courier New", monospace', fontSize: '14px', color: '#00ff99', whiteSpace: 'pre' }}>
              {`${MI6_HEADER}
> Access granted. Welcome, Agent Bond.
> Countdown: ${codeCountdown}`}
            </Typography>
          );
        }
        break;
      case 'files':
        return (
          <Typography sx={{ fontFamily: 'Consolas, "Courier New", monospace', fontSize: '14px', color: '#CCCCCC', whiteSpace: 'pre' }}>
            {`${MI6_HEADER}
> Available files:
${files.map(f => `> - ${f}`).join('\n')}

> Type 'OPEN filename' to open a file
> Type 'EXIT' to return to previous menu${selectedFile && !files.includes(selectedFile) ? `\n\n> File not found or already destroyed.` : ''}`}
          </Typography>
        );
      case 'file_super_secret':
        return (
          <Typography sx={{ fontFamily: 'Consolas, "Courier New", monospace', fontSize: '14px', color: '#CCCCCC', whiteSpace: 'pre' }}>
            {`${MI6_HEADER}
> Opening super_secret_code.txt...
${showCode ? '> CODE: 1234\n' : ''}
> This message will self-destruct in ${countdown} seconds.`}
          </Typography>
        );
      case 'file_do_not_open':
        return (
          <Typography sx={{ fontFamily: 'Consolas, "Courier New", monospace', fontSize: '14px', color: '#CCCCCC', whiteSpace: 'pre' }}>
            {`${MI6_HEADER}
> Opening do_not_open_me.txt...
> [REDACTED CONTENT]\n> Type 'EXIT' to return to previous menu.`}
          </Typography>
        );
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      {renderContent()}
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
        <Typography sx={{ fontFamily: 'Consolas, "Courier New", monospace', fontSize: '14px', color: '#CCCCCC', mr: 1 }}>
          {gameState === 'warning' ? 'C:\Users\guest>' : 'Agent Bond  >'}
        </Typography>
        <TextField
          value={input}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          sx={{
            '& .MuiInputBase-root': {
              fontFamily: 'Consolas, "Courier New", monospace',
              fontSize: '14px',
              color: '#CCCCCC',
              backgroundColor: 'transparent',
              '&:before, &:after': { display: 'none' },
              '& .MuiInputBase-input': {
                p: 0,
                height: 'auto',
                '&::placeholder': {
                  color: '#666666',
                  opacity: 1
                }
              }
            },
            '& .MuiOutlinedInput-notchedOutline': { display: 'none' }
          }}
        />
      </Box>
    </Box>
  );
} 