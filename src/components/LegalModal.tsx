import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

interface LegalModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

const LegalModal = ({ open, onClose, title, content }: LegalModalProps) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography
            variant="body1"
            component="div"
            sx={{ whiteSpace: "pre-line" }}
          >
            {content}
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t("legal.close")}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default LegalModal;
