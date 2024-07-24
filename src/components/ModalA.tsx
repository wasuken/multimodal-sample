import React, { useState } from 'react';
import { Dialog, AppBar, Toolbar, IconButton, Typography, Button, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ModalB from './ModalB';

interface ModalAProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: string) => void;
}

const ModalA: React.FC<ModalAProps> = ({ open, onClose, onSave }) => {
  const [inputA, setInputA] = useState('');
  const [modalBOpen, setModalBOpen] = useState(false);

  const handleModalBClose = (data: string) => {
    setInputA(data);
    setModalBOpen(false);
  };

  return (
    <Dialog fullScreen open={open} onClose={onClose}>
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography sx={{ flex: 1 }} variant="h6" component="div">
            Modal A
          </Typography>
        </Toolbar>
      </AppBar>
      <div style={{ padding: 16 }}>
        <TextField
          label="Input A"
          value={inputA}
          onChange={(e) => setInputA(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" onClick={() => setModalBOpen(true)}>
          Open Modal B
        </Button>
        <ModalB open={modalBOpen} onClose={() => setModalBOpen(false)} onSave={handleModalBClose} />
      </div>
      <div style={{ position: 'absolute', bottom: 16, right: 16 }}>
        <Button variant="contained" onClick={() => onSave(inputA)}>
          Save
        </Button>
      </div>
    </Dialog>
  );
};

export default ModalA;
