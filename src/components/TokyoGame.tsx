import { useState, useEffect, useRef } from 'react';
import { Box, Typography, TextField } from '@mui/material';

interface TokyoGameProps {
  onExit: () => void;
}

const MI6_HEADER = `═══════════════════════════════
    MI6 AGENT VIEW   
  TOP SECRET-LEVEL ALPHA 
═══════════════════════════════\n`;

const INITIAL_FILES = [
  'super_secret_code.txt',
  'do_not_open_me.txt',
];

const SKULL_ART = ` @@@@@                                        @@@@@
@@@@@@@                                      @@@@@@@
@@@@@@@           @@@@@@@@@@@@@@@            @@@@@@@
 @@@@@@@@       @@@@@@@@@@@@@@@@@@@        @@@@@@@@
     @@@@@     @@@@@@@@@@@@@@@@@@@@@     @@@@@
       @@@@@  @@@@@@@@@@@@@@@@@@@@@@@  @@@@@
         @@  @@@@@@@@@@@@@@@@@@@@@@@@@  @@
            @@@@@@@    @@@@@@    @@@@@@
            @@@@@@      @@@@      @@@@@
            @@@@@@      @@@@      @@@@@
             @@@@@@    @@@@@@    @@@@@
              @@@@@@@@@@@  @@@@@@@@@@
               @@@@@@@@@@  @@@@@@@@@
           @@   @@@@@@@@@@@@@@@@@   @@
           @@@@  @@@@ @ @ @ @ @@@@  @@@@
          @@@@@   @@@ @ @ @ @ @@@   @@@@@
        @@@@@      @@@@@@@@@@@@@      @@@@@
      @@@@          @@@@@@@@@@@          @@@@
   @@@@@              @@@@@@@              @@@@@
  @@@@@@@                                 @@@@@@@
   @@@@@                                   @@@@@`;

const CODE_SNIPPETS = [
  'if (system.status === "compromised") {',
  '  initiate_global_shutdown();',
  '  delete_all_records();',
  '}',
  'class Apocalypse {',
  '  constructor() {',
  '    this.countdown = 10;',
  '  }',
  '}',
  'async function destroyWorld() {',
  '  await launchMissiles();',
  '}',
  'ERROR: System breach detected',
  'WARNING: Security protocols failed',
  'kernel_panic: system halted',
  'FATAL: Unable to contain breach',
  'rm -rf /*',
  'deltree c:\\',
  'format c: /y',
  '> Initiating doomsday sequence...',
  '> Bypassing security...',
  '> Overriding safeguards...'
];

const MATRIX_CHARS = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲン';
const getRandomChar = () => MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
const getRandomSnippet = () => CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)];

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
  const [codeState, setCodeState] = useState<'idle' | 'wrong' | 'correct' | 'nuke'>('idle');
  const [codeCountdown, setCodeCountdown] = useState(10);
  const codeCountdownRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [nukeText, setNukeText] = useState('');
  const nukeMessages = [
    'deleting internet in UK...',
    'launching nuclear warheads...',
    'erasing all bank accounts worldwide...',
    'initiating global blackout...'
  ];
  const [nukeStep, setNukeStep] = useState(0);
  const [undoText, setUndoText] = useState('');
  const [wifiPhase, setWifiPhase] = useState<'search' | 'notfound' | 'undo' | null>(null);
  const [fadeOut, setFadeOut] = useState(false);
  const [confirmPhase, setConfirmPhase] = useState(false);
  const [correctCodePhase, setCorrectCodePhase] = useState<'countdown' | 'error' | null>(null);
  const [spyPhase, setSpyPhase] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [matrixChars, setMatrixChars] = useState<string[]>([]);
  const [codeSnippets, setCodeSnippets] = useState<{text: string, top: number, left: number}[]>([]);

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
    if (codeState === 'wrong') {
      setCodeCountdown(10);
      const interval = setInterval(() => {
        setCodeCountdown(prev => prev - 1);
      }, 1000);
      codeCountdownRef.current = setTimeout(() => {
        setCodeState('nuke');
      }, 10000);
      return () => {
        clearInterval(interval);
        if (codeCountdownRef.current) clearTimeout(codeCountdownRef.current);
      };
    }
  }, [gameState, codeState]);

  useEffect(() => {
    if (codeState === 'nuke') {
      setNukeText('');
      setNukeStep(0);
      setUndoText('');
      setWifiPhase(null);
      setFadeOut(false);
      setConfirmPhase(false);
      let msgIdx = 0;
      let charIdx = 0;
      let typeInterval: ReturnType<typeof setInterval>;
      let msgTimeout: ReturnType<typeof setTimeout>;
      const typeNextChar = () => {
        setNukeText(nukeMessages[msgIdx].slice(0, charIdx + 1));
        charIdx++;
        if (charIdx === nukeMessages[msgIdx].length) {
          clearInterval(typeInterval);
          if (msgIdx < nukeMessages.length - 1) {
            msgTimeout = setTimeout(() => {
              msgIdx++;
              charIdx = 0;
              setNukeStep(msgIdx);
              typeInterval = setInterval(typeNextChar, 60);
            }, msgIdx === nukeMessages.length - 2 ? 2400 : 900);
          } else {
            // Add 2 second delay before WiFi search
            setTimeout(() => {
              // WiFi search phase
              setWifiPhase('search');
              setNukeText('Searching wifi signal ...');
              setTimeout(() => {
                setWifiPhase('notfound');
                setNukeText('Searching wifi signal ...\n');
                setTimeout(() => {
                  setWifiPhase('undo');
                  setUndoText('');
                  let undo = '';
                  let dots = 0;
                  const undoInterval = setInterval(() => {
                    dots = (dots + 1) % 4;
                    undo = 'reverse protocol "global fallout"' + '.'.repeat(dots);
                    setUndoText(undo);
                  }, 350);
                  setTimeout(() => {
                    clearInterval(undoInterval);
                    setUndoText('');
                    setConfirmPhase(true);
                    setTimeout(() => {
                      setFadeOut(true);
                      setTimeout(() => {
                        setCodeState('idle');
                        setGameState('warning');
                        setConfirmPhase(false);
                        onExit();
                      }, 700);
                    }, 5000);
                  }, 5000);
                }, 4500);
              }, 3000);
            }, 2000);
          }
        }
      };
      typeInterval = setInterval(typeNextChar, 60);
      return () => {
        clearInterval(typeInterval);
        clearTimeout(msgTimeout);
      };
    }
  }, [codeState]);

  useEffect(() => {
    if (codeState === 'correct') {
      setCorrectCodePhase('countdown');
      setCodeCountdown(10);
      let localCountdown = 10;
      const interval = setInterval(() => {
        localCountdown--;
        setCodeCountdown(localCountdown);
        if (localCountdown === 3) {
          setCorrectCodePhase('error');
          clearInterval(interval);
          setTimeout(() => {
            setCodeState('nuke');
            setCorrectCodePhase(null);
          }, 7000);
        }
        if (localCountdown <= 0) {
          clearInterval(interval);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [codeState]);

  useEffect(() => {
    // Autofocus when input is possible
    if (
      !spyPhase &&
      codeState !== 'nuke' &&
      !(codeState === 'correct' && (correctCodePhase === 'countdown' || correctCodePhase === 'error'))
    ) {
      inputRef.current?.focus();
    }
  }, [gameState, codeState, spyPhase, correctCodePhase]);

  useEffect(() => {
    if (codeState === 'nuke') {
      // Initialize matrix effect
      const chars = Array(100).fill('').map(() => getRandomChar());
      setMatrixChars(chars);

      // Initialize code snippets
      const snippets = Array(8).fill('').map(() => ({
        text: getRandomSnippet(),
        top: Math.random() * 100,
        left: Math.random() * 100
      }));
      setCodeSnippets(snippets);

      // Update matrix characters
      const matrixInterval = setInterval(() => {
        setMatrixChars(prev => prev.map((_, i) => Math.random() > 0.7 ? getRandomChar() : prev[i]));
      }, 100);

      // Update code snippets
      const snippetsInterval = setInterval(() => {
        setCodeSnippets(prev => prev.map(snippet => ({
          text: Math.random() > 0.8 ? getRandomSnippet() : snippet.text,
          top: (snippet.top + 1) % 100,
          left: snippet.left
        })));
      }, 50);

      return () => {
        clearInterval(matrixInterval);
        clearInterval(snippetsInterval);
      };
    }
  }, [codeState]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const value = input.toLowerCase();
      
      if (gameState === 'warning') {
        if (value === 'exit') {
          onExit();
          setInput('');
          return;
        }
      }
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
            setSpyPhase(true);
            setTimeout(() => {
              setSpyPhase(false);
              setCodeState('nuke');
              setGameState('code');
            }, 3000);
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
          <>
            <Typography sx={{ fontFamily: 'Consolas, "Courier New", monospace', fontSize: '14px', color: '#CCCCCC' }}>
              {`> Oh, you must have accidentally typed "tokyo". As I said, do not type "tokyo" here\n> Type 'exit' to return to the contact form.`}
            </Typography>
          </>
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
          if (correctCodePhase === 'countdown') {
            return (
              <Typography sx={{ fontFamily: 'Consolas, "Courier New", monospace', fontSize: '14px', color: '#00ff99', whiteSpace: 'pre' }}>
                {`${MI6_HEADER}
> Access granted. Welcome, Agent Bond.
> You will receive your instructions in  ${codeCountdown} seconds`}
              </Typography>
            );
          } else if (correctCodePhase === 'error') {
            return (
              <Typography sx={{ fontFamily: 'Consolas, "Courier New", monospace', fontSize: '1.2rem', color: '#ff6b6b', whiteSpace: 'pre-wrap', wordBreak: 'break-word', textAlign: 'center', width: '100%' }}>
                {`${MI6_HEADER}
> Transmission error detected, initiating fallout protocol...`}
              </Typography>
            );
          }
        } else if (codeState === 'nuke') {
          return (
            <Box sx={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', bgcolor: 'black', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'opacity 0.7s', opacity: fadeOut ? 0 : 1 }}>
              <Box 
                sx={{ 
                  background: '#111',
                  border: '2px solid #ff0000',
                  borderRadius: 2,
                  p: 4,
                  width: 800,
                  height: 400,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  boxSizing: 'border-box',
                  overflow: 'hidden',
                  position: 'relative',
                  animation: 'borderBlink 1s infinite',
                  '@keyframes borderBlink': {
                    '0%': { borderColor: '#ff0000' },
                    '50%': { borderColor: '#660000' },
                    '100%': { borderColor: '#ff0000' }
                  }
                }}
              >
                {/* Matrix effect background */}
                <Box sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  opacity: 0.1,
                  color: '#00ff00',
                  fontFamily: 'monospace',
                  fontSize: '10px',
                  display: 'flex',
                  flexWrap: 'wrap',
                  overflow: 'hidden',
                  pointerEvents: 'none'
                }}>
                  {matrixChars.map((char, i) => (
                    <span key={i} style={{ margin: '0 2px' }}>{char}</span>
                  ))}
                </Box>

                {/* Add scrolling code snippets */}
                <Box sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  overflow: 'hidden',
                  pointerEvents: 'none'
                }}>
                  {codeSnippets.map((snippet, i) => (
                    <Typography
                      key={i}
                      sx={{
                        position: 'absolute',
                        top: `${snippet.top}%`,
                        left: `${snippet.left}%`,
                        color: '#ff000066',
                        fontSize: '10px',
                        fontFamily: 'monospace',
                        whiteSpace: 'nowrap',
                        transform: 'translateX(-50%)',
                        transition: 'top 0.05s linear'
                      }}
                    >
                      {snippet.text}
                    </Typography>
                  ))}
                </Box>

                <Typography sx={{ 
                  fontFamily: 'Consolas, "Courier New", monospace',
                  fontSize: '1.1rem',
                  color: '#ff0000',
                  whiteSpace: 'pre',
                  mb: 2,
                  textShadow: '0 0 10px #ff0000',
                  animation: 'textBlink 0.5s infinite',
                  '@keyframes textBlink': {
                    '0%': { opacity: 1 },
                    '50%': { opacity: 0.7 },
                    '100%': { opacity: 1 }
                  }
                }}>
                  {MI6_HEADER}
                </Typography>

                {wifiPhase !== 'undo' && !confirmPhase && (
                  <>
                    {nukeStep === nukeMessages.length - 1 && (
                      <Typography sx={{
                        fontFamily: 'monospace',
                        fontSize: '10px',
                        color: '#ff0000',
                        whiteSpace: 'pre',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        opacity: 0.4,
                        textShadow: '0 0 5px #ff0000'
                      }}>
                        {SKULL_ART}
                      </Typography>
                    )}
                    <Typography sx={{
                      fontFamily: 'Consolas, "Courier New", monospace',
                      fontSize: '2rem',
                      color: '#ff0000',
                      whiteSpace: 'pre-wrap',
                      textAlign: 'center',
                      width: '100%',
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textShadow: '0 0 10px #ff0000',
                      position: 'relative',
                      zIndex: 1
                    }}>
                      {nukeText || ' '}
                    </Typography>
                  </>
                )}
                
                {wifiPhase === 'notfound' && !confirmPhase && (
                  <Typography sx={{
                    fontFamily: 'Consolas, "Courier New", monospace',
                    fontSize: '2rem',
                    color: '#ff6b6b',
                    whiteSpace: 'pre',
                    mt: 1,
                    textAlign: 'center',
                    width: '100%',
                    textShadow: '0 0 10px #ff6b6b'
                  }}>
                    not found..
                  </Typography>
                )}
                
                {wifiPhase === 'undo' && !confirmPhase && (
                  <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                    <Typography sx={{
                      fontFamily: 'Consolas, "Courier New", monospace',
                      fontSize: '1.5rem',
                      color: '#00ff99',
                      whiteSpace: 'pre',
                      mt: 2,
                      textAlign: 'center',
                      width: '100%',
                      textShadow: '0 0 10px #00ff99'
                    }}>
                      {undoText}
                    </Typography>
                  </Box>
                )}
                
                {confirmPhase && (
                  <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                    <Typography sx={{
                      fontFamily: 'Consolas, "Courier New", monospace',
                      fontSize: '1.5rem',
                      color: '#00ff99',
                      whiteSpace: 'pre',
                      mt: 2,
                      textAlign: 'center',
                      width: '100%',
                      textShadow: '0 0 10px #00ff99'
                    }}>
                      global fallout aborted, protocol terminated
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          );
        }
        break;
      case 'files':
        if (spyPhase) {
          return (
            <Typography sx={{ fontFamily: 'Consolas, "Courier New", monospace', fontSize: '1.2rem', color: '#ff6b6b', whiteSpace: 'pre-wrap', wordBreak: 'break-word', textAlign: 'center', width: '100%' }}>
              {`${MI6_HEADER}
> Spy detected! Initiating fallout protocol...`}
            </Typography>
          );
        }
        return (
          <Typography sx={{ fontFamily: 'Consolas, "Courier New", monospace', fontSize: '14px', color: '#CCCCCC', whiteSpace: 'pre' }}>
            {`${MI6_HEADER}
> Available files:
${files.map(f => `> - ${f}`).join('\n')}

> Type 'OPEN <filename>' to open a file
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
      {!(codeState === 'correct' && (correctCodePhase === 'countdown' || correctCodePhase === 'error')) && 
       codeState !== 'nuke' && 
       codeState !== 'wrong' &&
       !spyPhase && (
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <Typography sx={{ fontFamily: 'Consolas, "Courier New", monospace', fontSize: '14px', color: '#CCCCCC', mr: 1 }}>
            {gameState === 'warning' ? 'C:\\Users\\guest>' : 'Agent Bond  >'}
          </Typography>
          <TextField
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            inputRef={inputRef}
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
      )}
    </Box>
  );
} 