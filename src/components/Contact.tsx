import { Box, TextField, Button, Typography, Grid } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import TokyoGame from "./TokyoGame";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1);
  const [sent, setSent] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [sending, setSending] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showGame, setShowGame] = useState(false);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (sending && progress < 100) {
      const timer = setTimeout(() => {
        setProgress(prev => {
          const increment = Math.floor(Math.random() * 8) + 2; // Smaller increments (2-10)
          return Math.min(prev + increment, 100);
        });
      }, 400); // Slower updates
      return () => clearTimeout(timer);
    } else if (sending && progress >= 100) {
      setTimeout(() => {
        setSending(false);
        setSent(true);
      }, 1000); // Longer pause at the end
    }
  }, [sending, progress]);

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleEmailSubmit = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (email.toLowerCase() === 'tokyo') {
        setShowGame(true);
        return;
      }
      if (isValidEmail(email)) {
        setEmailError(false);
        setStep(2);
        setTimeout(() => {
          messageInputRef.current?.focus();
        }, 50);
      } else {
        setEmailError(true);
      }
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) {
      setEmailError(!isValidEmail(e.target.value));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && message && isValidEmail(email)) {
      setSending(true);
      setProgress(0);
    }
  };

  const handleGameExit = () => {
    setShowGame(false);
    setEmail('');
  };

  if (sending) {
    const getStatusMessage = (progress: number) => {
      if (progress < 15) return "Initializing secure connection...";
      if (progress < 30) return "Establishing encrypted channel...";
      if (progress < 45) return "Validating email format...";
      if (progress < 60) return "Processing message content...";
      if (progress < 75) return "Preparing data package...";
      if (progress < 90) return "Transferring data to server...";
      if (progress < 100) return "Finalizing transmission...";
      return "Complete! Redirecting...";
    };

    return (
      <Grid size={{ xs: 12, md: 5 }} id="contact">
        <Typography variant="h2" sx={{ mb:2, textAlign: 'left',  color: 'text.secondary' }}>
          Contact
        </Typography>
        <Box 
          sx={{ 
            backgroundColor: '#0C0C0C',
            color: '#CCCCCC',
            p: 1,
            borderRadius: '4px',
            width: '100%',
            height: "700px"
          }}
        >
          <Typography 
            sx={{ 
              fontFamily: 'Consolas, "Courier New", monospace',
              fontSize: '14px',
              mb: 2,
              whiteSpace: 'pre'
            }}
          >
            {`> Initiating contact form submission...

${getStatusMessage(progress)}
${progress >= 15 ? '> Secure connection established' : ''}
${progress >= 30 ? '> Encryption protocol: AES-256' : ''}
${progress >= 45 ? '> Email validation: OK' : ''}
${progress >= 60 ? '> Message content: OK' : ''}
${progress >= 75 ? '> Package size: 320 bytes' : ''}
${progress >= 90 ? '> Server response: OK' : ''}

Progress: [${Array(Math.floor(progress/5)).fill('=').join('')}${Array(20-Math.floor(progress/5)).fill(' ').join('')}] ${progress}%

Status: ${progress < 100 ? 'Processing...' : 'Complete!'}`}
          </Typography>
        </Box>
      </Grid>
    );
  }

  if (sent) {
    return (
      <Grid size={{ xs: 12, md: 5 }} id="contact">
        <Typography variant="h2" sx={{ mb:2, textAlign: 'left',  color: 'text.secondary' }}>
          Contact
        </Typography>
        <Box 
          sx={{ 
            backgroundColor: '#0C0C0C',
            color: '#CCCCCC',
            p: 1,
            borderRadius: '4px',
            width: '100%',
            height: "500px"
          }}
        >
          <Typography 
            sx={{ 
              fontFamily: 'Consolas, "Courier New", monospace',
              fontSize: '14px',
              mb: 2,
              whiteSpace: 'pre'
            }}
          >
            {`Email sent successfully!

Thank you for your message. I will get back to you soon.

    ⠀⠀⠀⠀⠀⠀⠀⢀⣠⣤⣤⣤⣤⣤⣤⣀⡀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⢀⣤⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣤⡀⠀⠀⠀⠀
    ⠀⠀⠀⣴⣿⣿⣿⣿⠟⣿⣿⣿⣿⣿⣿⠻⣿⣿⣿⣿⣦⠀⠀⠀
    ⠀⢀⣾⣿⣿⣿⣿⣿⣄⣿⣿⣿⣿⣿⣿⣀⣿⣿⣿⣿⣿⣷⡀⠀
    ⢠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡄
    ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
    ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
    ⢿⣿⣿⣿⠀⠀⠀⠀⠉⠛⠿⢿⣿⣿⠿⠛⠉⠀⠀⠀⠀⣿⣿⡿
    ⠈⢿⣿⣿⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⡿⠁
    ⠀⠀⠻⣿⣿⣦⣄⣀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣠⣴⣿⣿⠟⠀⠀
    ⠀⠀⠀⠈⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠟⠁⠀⠀⠀
    ⠀⠀⠀⠀⠀⠈⠛⠿⣿⣿⣿⣿⣿⣿⣿⠿⠛⠁⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠉⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀

Message sent! That's what she said! 😉`}
          </Typography>
        </Box>
      </Grid>
    );
  }

  return (
    <Grid size={{ xs: 12, md: 5 }} id="contact">
       <Typography variant="h2" sx={{ mb:2, textAlign: 'left',  color: 'text.secondary' }}>
          Contact
        </Typography>
     
      <Box 
        sx={{ 
          backgroundColor: '#0C0C0C',
          color: '#CCCCCC',
          p: 1,
          mt: 3, 
          borderRadius: '4px',
          width: '100%',
          height: "450px"
        }}
      >
        {showGame ? (
          <TokyoGame onExit={handleGameExit} />
        ) : (
          <>
            <Typography 
              sx={{ 
                fontFamily: 'Consolas, "Courier New", monospace',
                fontSize: '14px',
                mb: 2,
                whiteSpace: 'pre'
              }}
            >
              {`Contact Form - Ping me like a Pro\nPlease follow the steps below to send me a message:\n\n1. Enter your email and press Enter\n\n2. Type your message and press Enter\n\n3. Click 'send' to submit`}
            </Typography>

            <Typography 
              sx={{ 
                fontFamily: 'Consolas, "Courier New", monospace',
                fontSize: '14px',
                mb: 2,
                color: '#CCCCCC'
              }}
            >
              {`> NOTICE: The keyword "tokyo" is restricted to civilian access. Standard contact form users should ignore this warning and should not type "tokyo" in the email field and press enter.`}
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography 
                    sx={{ 
                      fontFamily: 'Consolas, "Courier New", monospace',
                      fontSize: '14px',
                      color: '#CCCCCC',
                      mr: 1
                    }}
                  >
                    C:\Users\guest&gt;
                  </Typography>
                  <TextField
                    value={email}
                    onChange={handleEmailChange}
                    onKeyDown={handleEmailSubmit}
                    placeholder="Enter your email"
                    disabled={step !== 1}
                    autoFocus={step === 1}
                    error={emailError}
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
                      '& .MuiOutlinedInput-notchedOutline': { display: 'none' },
                      '& .Mui-error': {
                        color: '#ff6b6b'
                      }
                    }}
                  />
                  {emailError && (
                    <Typography
                      sx={{
                        fontFamily: 'Consolas, "Courier New", monospace',
                        fontSize: '14px',
                        color: '#ff6b6b',
                        mt: 1
                      }}
                    >
                      Error: Please enter a valid email address (example@domain.com)
                    </Typography>
                  )}
                </Box>

                {step >= 2 && (
                  <>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                      <Typography 
                        sx={{ 
                          fontFamily: 'Consolas, "Courier New", monospace',
                          fontSize: '14px',
                          color: '#CCCCCC',
                          mr: 1
                        }}
                      >
                        C:\Users\guest&gt;
                      </Typography>
                      <TextField
                        multiline
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Enter your message"
                        disabled={step !== 2}
                        inputRef={messageInputRef}
                        autoFocus={step === 2}
                        sx={{
                          flex: 1,
                          '& .MuiInputBase-root': {
                            fontFamily: 'Consolas, "Courier New", monospace',
                            fontSize: '14px',
                            color: '#CCCCCC',
                            backgroundColor: 'transparent',
                            '&:before, &:after': { display: 'none' },
                            '& .MuiInputBase-input': {
                              p: 0,
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

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography 
                        sx={{ 
                          fontFamily: 'Consolas, "Courier New", monospace',
                          fontSize: '14px',
                          color: '#CCCCCC',
                          mr: 1
                        }}
                      >
                        C:\Users\guest&gt;
                      </Typography>
                      <Button
                        type="submit"
                        disabled={!email || !message}
                        sx={{ 
                          fontFamily: 'Consolas, "Courier New", monospace',
                          fontSize: '14px',
                          color: '#CCCCCC',
                          backgroundColor: 'transparent',
                          p: 0,
                          minWidth: 0,
                          '&:hover': {
                            backgroundColor: 'transparent',
                            textDecoration: 'underline'
                          },
                          '&.Mui-disabled': {
                            color: '#666666'
                          }
                        }}
                      >
                        send (click me)
                      </Button>
                    </Box>
                  </>
                )}
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Grid>
  );
}