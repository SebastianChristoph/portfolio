import { Button, ButtonGroup, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import GB from 'country-flag-icons/react/3x2/GB';
import DE from 'country-flag-icons/react/3x2/DE';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <ButtonGroup variant="text" size="small" sx={{ ml: 2 }}>
      <Tooltip title="English">
        <Button
          onClick={() => changeLanguage('en')}
          sx={{ 
            p: 0.5,
            minWidth: 'auto',
            opacity: i18n.language === 'en' ? 1 : 0.5,
            '&:hover': { opacity: 1 }
          }}
        >
          <GB style={{ width: '24px', height: '16px' }} />
        </Button>
      </Tooltip>
      <Tooltip title="Deutsch">
        <Button
          onClick={() => changeLanguage('de')}
          sx={{ 
            p: 0.5,
            minWidth: 'auto',
            opacity: i18n.language === 'de' ? 1 : 0.5,
            '&:hover': { opacity: 1 }
          }}
        >
          <DE style={{ width: '24px', height: '16px' }} />
        </Button>
      </Tooltip>
    </ButtonGroup>
  );
};

export default LanguageSwitcher; 