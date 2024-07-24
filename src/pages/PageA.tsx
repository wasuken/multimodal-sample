import React, { useState } from 'react';
import { Button, Container, Typography } from '@mui/material';
import ModalA from '../components/ModalA';

const PageA: React.FC = () => {
  const [modalAOpen, setModalAOpen] = useState(false);
  const [savedData, setSavedData] = useState('');

  const handleModalAClose = () => {
    setModalAOpen(false);
  };

  const handleModalASave = (data: string) => {
    setSavedData(data);
    setModalAOpen(false);
  };

  return (
    <Container>
      <Typography variant="h4">Page A</Typography>
      <Button variant="contained" onClick={() => setModalAOpen(true)}>
        Open Modal A
      </Button>
      <Typography variant="h6">Saved Data: {savedData}</Typography>
      <ModalA
        open={modalAOpen}
        onClose={handleModalAClose}
        onSave={handleModalASave}
      />
    </Container>
  );
};

export default PageA;
