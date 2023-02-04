import { useState, useEffect } from "react"
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { SxProps } from "@mui/material/styles";



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
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <>
          {content}
        </>
      </Modal>
    </>
  )
}