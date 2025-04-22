import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import TokyoGame from "./TokyoGame";

export default function Contact() {
  const theme = useTheme();
  const { t } = useTranslation();
  const isDarkMode = theme.palette.mode === "dark";
  const terminalBg = isDarkMode ? "#101935" : "#F8FAFC";
  const terminalText = isDarkMode ? "#CCCCCC" : "#1E293B";

  const placeholderColor = isDarkMode ? "#666666" : "#94A3B8";

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1);
  const [emailError, setEmailError] = useState(false);
  const [sending, setSending] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showGame, setShowGame] = useState(false);
  const [sent, setSent] = useState(false);
  const [currentLoadingMessage, setCurrentLoadingMessage] = useState(0);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);
  const [botField, setBotField] = useState(""); // Honeypot

  useEffect(() => {
    if (sending && progress < 100) {
      const timer = setTimeout(() => {
        setProgress((prev) => {
          const newProgress = Math.min(prev + Math.floor(Math.random() * 4) + 1, 100); // Slower progress
          // Update loading message based on progress
          const messageIndex = Math.min(Math.floor((newProgress / 100) * 8), 7);
          setCurrentLoadingMessage(messageIndex);
          return newProgress;
        });
      }, 800); // Longer delay between updates
      return () => clearTimeout(timer);
    } else if (sending && progress >= 100) {
      setTimeout(() => {
        setSending(false);
        setSent(true);
      }, 1500); // Longer delay before showing success
    }
  }, [sending, progress]);

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleEmailSubmit = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (email.toLowerCase() === "tokyo") {
        setShowGame(true);
        return;
      }
      if (isValidEmail(email)) {
        setEmailError(false);
        setStep(2);
        setTimeout(() => messageInputRef.current?.focus(), 50);
      } else {
        setEmailError(true);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && message && isValidEmail(email)) {
      setSending(true);
      setProgress(0);
      try {
        console.log(import.meta.env.VITE_CONTACT_SECRET);
        await fetch("https://sebastianchristoph.pythonanywhere.com/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            message,
            secret: import.meta.env.VITE_CONTACT_SECRET,
            bot_field: botField,
          }),
        });
      } catch (err) {
        console.error("Fehler beim E-Mail-Versand:", err);
      }
    }
  };

  const handleGameExit = () => {
    setShowGame(false);
    setEmail("");
  };

  if (sent || sending) {
    return (
      <Grid size={{ xs: 12, md: 5 }} id="contact">
        <Typography
          variant="h2"
          sx={{ mb: 2, textAlign: "left", color: "text.secondary" }}
        >
          {t("contact.title")}
        </Typography>
        <Box
          sx={{
            backgroundColor: terminalBg,
            color: terminalText,
            p: 2,
            borderRadius: "4px",
            height: "400px",
            border: `1px solid ${theme.palette.divider}`,
            fontFamily: "Consolas, 'Courier New', monospace",
            whiteSpace: "pre-wrap",
            display: "flex",
            flexDirection: "column",
            gap: 2
          }}
        >
          {sending ? (
            <>
              <Box>
                {t(`contact.success.loading.${currentLoadingMessage}`)}
              </Box>
              <Box>
                [{".".repeat(Math.floor(progress / 10))}]{" "}
                {Math.floor(progress)}%
              </Box>
            </>
          ) : (
            t("contact.success.message")
          )}
        </Box>
      </Grid>
    );
  }

  return (
    <Grid size={{ xs: 12, md: 5 }} id="contact">
      <Typography
        variant="h2"
        sx={{ mb: 2, textAlign: "left", color: "text.secondary" }}
      >
        {t("contact.title")}
      </Typography>
      <Box
        sx={{
          backgroundColor: terminalBg,
          color: terminalText,
          p: { xs: 1.5, sm: 2 },
          mt: 3,
          borderRadius: "4px",
          width: "100%",
          height: "auto",
          minHeight: { xs: "300px", sm: "450px" },
          border: `1px solid ${theme.palette.divider}`,
          overflow: "hidden",
        }}
      >
        {showGame ? (
          <TokyoGame onExit={handleGameExit} />
        ) : (
          <>
            <Typography
              sx={{
                fontFamily: 'Consolas, "Courier New", monospace',
                fontSize: { xs: "12px", sm: "14px" },
                mb: 2,
                whiteSpace: "pre-wrap",
              }}
            >
              {`${t("contact.form.header")}\n${t(
                "contact.form.instructions"
              )}\n\n1. ${t("contact.form.steps.1")}\n\n2. ${t(
                "contact.form.steps.2"
              )}\n\n3. ${t("contact.form.steps.3")}\n\n${t("contact.form.notice")}`}
            </Typography>

            <TextField
              name="bot_field"
              value={botField}
              onChange={(e) => setBotField(e.target.value)}
              style={{ display: "none" }}
              autoComplete="off"
              tabIndex={-1}
            />

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {/* Email input aligned */}
              <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
                <Typography
                  sx={{
                    fontFamily: "Consolas",
                    fontSize: "14px",
                    color: terminalText,
                    whiteSpace: "nowrap",
                    minWidth: "140px",
                  }}
                >
                  C:\Users\guest&gt;
                </Typography>
                <TextField
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={handleEmailSubmit}
                  placeholder={t("contact.form.email.placeholder")}
                  disabled={step !== 1}
                  autoFocus={step === 1}
                  error={emailError}
                  sx={{
                    flex: 1,
                    "& .MuiInputBase-root": {
                      fontFamily: "Consolas",
                      fontSize: "14px",
                      color: terminalText,
                      backgroundColor: "transparent",
                      padding: 0,
                      "& .MuiInputBase-input": {
                        padding: 0,
                      },
                      "& .MuiInputBase-input::placeholder": {
                        color: placeholderColor,
                        opacity: 1,
                      },
                    },
                    "& .MuiOutlinedInput-notchedOutline": { display: "none" },
                  }}
                />
              </Box>

              {emailError && (
                <Typography
                  sx={{
                    fontFamily: "Consolas",
                    fontSize: "14px",
                    color: theme.palette.error.main,
                    mt: -1,
                  }}
                >
                  {t("contact.form.email.invalid")}
                </Typography>
              )}

              {/* Message input aligned */}
              {step >= 2 && (
                <>
                  <Box
                    sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "Consolas",
                        fontSize: "14px",
                        color: terminalText,
                        minWidth: "140px",
                        pt: "10px",
                      }}
                    >
                      C:\Users\guest&gt;
                    </Typography>
                    <TextField
                      multiline
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={t("contact.form.message.placeholder")}
                      inputRef={messageInputRef}
                      autoFocus={step === 2}
                      sx={{
                        flex: 1,
                        "& .MuiInputBase-root": {
                          fontFamily: "Consolas",
                          fontSize: "14px",
                          color: terminalText,
                          backgroundColor: "transparent",
                          padding: 0,
                          margin: 0,
                          "& .MuiInputBase-input": {
                            padding: 0,
                            margin: 0,
                            "&.MuiInputBase-inputMultiline": {
                              padding: 0,
                              margin: 0,
                            },
                          },
                          "& .MuiInputBase-input::placeholder": {
                            color: placeholderColor,
                            opacity: 1,
                          },
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          display: "none",
                        },
                        mt: "10px",
                      }}
                    />
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
                    <Typography
                      sx={{
                        fontFamily: "Consolas",
                        fontSize: "14px",
                        color: terminalText,
                        minWidth: "140px",
                      }}
                    >
                      C:\Users\guest&gt;
                    </Typography>
                    <Button
                      onClick={handleSubmit}
                      disabled={!email || !message}
                      sx={{
                        fontFamily: "Consolas",
                        fontSize: "14px",
                        color: terminalText,
                        backgroundColor: "transparent",
                        padding: 0,
                        "&:hover": { textDecoration: "underline" },
                        "&.Mui-disabled": {
                          color: placeholderColor,
                        },
                      }}
                    >
                      {t("contact.send")}
                    </Button>
                  </Box>
                </>
              )}
            </Box>
          </>
        )}
      </Box>
    </Grid>
  );
}
