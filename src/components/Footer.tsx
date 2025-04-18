import { Box, Container, Link, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LegalModal from './LegalModal';

const Footer = () => {
  const [openImprint, setOpenImprint] = useState(false);
  const [openPrivacy, setOpenPrivacy] = useState(false);
  const { t } = useTranslation();

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
            {t('footer.links.imprint')}
          </Link>
          <Link
            component="button"
            variant="body2"
            onClick={() => setOpenPrivacy(true)}
            sx={{ color: 'text.secondary', cursor: 'pointer' }}
          >
            {t('footer.links.privacy')}
          </Link>
        </Box>
        <Typography variant="body2" color="text.secondary" align="center">
          {t('footer.copyright')}
        </Typography>
      </Container>

      <LegalModal
        open={openImprint}
        onClose={() => setOpenImprint(false)}
        title={t('legal.imprint.title')}
        content={t('legal.imprint.content')}
      />
      <LegalModal
        open={openPrivacy}
        onClose={() => setOpenPrivacy(false)}
        title={t('legal.privacy.title')}
        content={t('legal.privacy.content')}
      />
    </Box>
  );
};

export default Footer;
