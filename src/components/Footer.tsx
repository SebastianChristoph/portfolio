import { Box, Typography, Container, Link } from '@mui/material';
import { useState } from 'react';
import LegalModal from './LegalModal';

const Footer = () => {
  const [openImprint, setOpenImprint] = useState(false);
  const [openPrivacy, setOpenPrivacy] = useState(false);

  const imprintContent = `Imprint

Sebastian's Portfolio
[Your Address]
[Your City, Country]

Contact:
Email: [Your Email]
Phone: [Your Phone Number]

Responsible for content:
[Your Name]

Note: Please replace the placeholders with your actual information.`;

  const privacyContent = `Privacy Policy

This website is operated by Sebastian's Portfolio.

1. Data Collection
We collect personal data only when you voluntarily provide it to us through our contact form.

2. Use of Data
The data you provide will be used solely for the purpose of responding to your inquiry.

3. Data Protection
We implement appropriate security measures to protect your personal data.

4. Your Rights
You have the right to request information about your stored data and to request its correction or deletion.

5. Contact
For questions regarding data protection, please contact us at [Your Email].

Note: This is a basic privacy policy. Please customize it according to your specific needs and legal requirements.`;

  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        py: 3,
        px: 2,
        mt: 7,
        backgroundColor: 'background.paper',
        borderTop: 1,
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 1 }}>
          <Link
            component="button"
            variant="body2"
            onClick={() => setOpenImprint(true)}
            sx={{ color: 'text.secondary', cursor: 'pointer' }}
          >
            Imprint
          </Link>
          <Link
            component="button"
            variant="body2"
            onClick={() => setOpenPrivacy(true)}
            sx={{ color: 'text.secondary', cursor: 'pointer' }}
          >
            Privacy Policy
          </Link>
        </Box>
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} Sebastian's Portfolio. All rights reserved.
        </Typography>
      </Container>

      <LegalModal
        open={openImprint}
        onClose={() => setOpenImprint(false)}
        title="Imprint"
        content={imprintContent}
      />
      <LegalModal
        open={openPrivacy}
        onClose={() => setOpenPrivacy(false)}
        title="Privacy Policy"
        content={privacyContent}
      />
    </Box>
  );
};

export default Footer;
