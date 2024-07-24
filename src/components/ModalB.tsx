import React, { useState } from 'react';
import { Dialog, AppBar, Toolbar, IconButton, Typography, Button, TextField } from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface ModalBProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: string) => void;
}

const ModalB: React.FC<ModalBProps> = ({ open, onClose, onSave }) => {
  const [inputB, setInputB] = useState('');

  return (
    <Dialog fullScreen open={open} onClose={onClose}>
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
            <ArrowBackIcon />
          </IconButton>
          <Typography sx={{ flex: 1 }} variant="h6" component="div">
            Modal B
          </Typography>
        </Toolbar>
      </AppBar>
      <div style={{ padding: 16 }}>
        <TextField
          label="Input B"
          value={inputB}
          onChange={(e) => setInputB(e.target.value)}
          fullWidth
          margin="normal"
        />
      </div>
      <div style={{ position: 'absolute', bottom: 16, right: 16 }}>
        <Button variant="contained" onClick={() => onSave(inputB)}>
          Save
        </Button>
      </div>
    </Dialog>
  );
};

export default ModalB;
