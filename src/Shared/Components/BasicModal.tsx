import { useState, useEffect } from "react"
import Modal from '@mui/material/Modal';
import { SxProps } from "@mui/material/styles";
import { Card, IconButton } from "@mui/material";
import { styleCardBoxShadow } from "../Contants";
import CloseIcon from '@mui/icons-material/Close';

const style: SxProps = {
  position: "relative",
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 280,
  bgcolor: 'background.paper',
  boxShadow: styleCardBoxShadow,
  padding: "50px 20px 20px 20px",
  borderRadius: "15px",
};

const closeButtonStyle: SxProps = {
  position: "absolute",
  top: 5,
  right: 5
}

interface IBasicModalProps {
  open: boolean;
  content: string | JSX.Element;
  callbackOnClose?: () => void;
}

export const BasicModal = (props: IBasicModalProps) => {
  const { open, content, callbackOnClose } = props;

  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open)
  }, [open]);

  const handleClose = () => {
    if (callbackOnClose) {
      callbackOnClose();
    }
    setIsOpen(false);
  };

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        onClose={handleClose}
        closeAfterTransition
      >
        <Card sx={style}>
          <IconButton
            onClick={handleClose}
            sx={closeButtonStyle}
          >
            <CloseIcon />
          </IconButton>
          {content}
        </Card>
      </Modal>
    </>
  )
}