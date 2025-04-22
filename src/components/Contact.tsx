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
  const terminalPrompt = isDarkMode ? "#8f9ba8" : "#64748B";
  const placeholderColor = isDarkMode ? "#666666" : "#94A3B8";

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1);
  const [sent, setSent] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [sending, setSending] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showGame, setShowGame] = useState(false);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);

  const [botField, setBotField] = useState(""); // 🐝 Honeypot

  useEffect(() => {
    if (sending && progress < 100) {
      const timer = setTimeout(() => {
        setProgress((prev) =>
          Math.min(prev + Math.floor(Math.random() * 8) + 2, 100)
        );
      }, 400);
      return () => clearTimeout(timer);
    } else if (sending && progress >= 100) {
      setTimeout(() => {
        setSending(false);
        setSent(true);
      }, 1000);
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
        await fetch("https://sebastianchristoph.pythonanywhere.com/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            message,
            secret: process.env.REACT_APP_CONTACT_SECRET,
            bot_field: botField, // 👀 Honeypot
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
              )}\n\n3. ${t("contact.form.steps.3")}`}
            </Typography>

            <TextField
              name="bot_field"
              value={botField}
              onChange={(e) => setBotField(e.target.value)}
              style={{ display: "none" }} // 🔍 verstecktes Honeypot-Feld
              autoComplete="off"
              tabIndex={-1}
            />

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                <Typography
                  sx={{
                    fontFamily: "Consolas",
                    fontSize: "14px",
                    color: terminalPrompt,
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
                  }}
                >
                  {t("contact.form.email.invalid")}
                </Typography>
              )}

              {step >= 2 && (
                <>
                  <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                    <Typography
                      sx={{
                        fontFamily: "Consolas",
                        fontSize: "14px",
                        color: terminalPrompt,
                        mr: 1,
                      }}
                    >
                      C:\Users\guest&gt;
                    </Typography>
                    <TextField
                      multiline
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
                          "& .MuiInputBase-input::placeholder": {
                            color: placeholderColor,
                            opacity: 1,
                          },
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          display: "none",
                        },
                      }}
                    />
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      sx={{
                        fontFamily: "Consolas",
                        fontSize: "14px",
                        color: terminalPrompt,
                        mr: 1,
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
                        "&:hover": { textDecoration: "underline" },
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
