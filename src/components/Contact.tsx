import { Box, TextField, Button, Grid, Typography } from "@mui/material";
import { useState } from "react";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submit");
  };

  return (
    <Grid size={{ xs: 12, md: 5 }} id="contact">

<Typography variant="h4" sx={{ mb: 3, textAlign: 'center' }}>
        Contact
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Message"
          multiline
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          margin="normal"
          required
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
      </Box>
    </Grid>
  );
}