import React, { useState } from 'react';
import { Button, Container, Typography } from '@mui/material';
import EditModal from '../components/EditModal';

interface User {
  name: string;
  description: string;
  age: number;
  isActive: boolean;
  category: 'A'|'B'|'C';
}

const PageB: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [savedData, setSavedData] = useState<Record<string, User>>({});

  const fields = [
    { name: 'name', label: 'Name', type: 'string' },
    { name: 'description', label: 'Description', type: 'longString' },
    { name: 'age', label: 'Age', type: 'number' },
    { name: 'birthdate', label: 'Birth Date', type: 'date' },
    { name: 'isActive', label: 'Is Active', type: 'boolean' },
    { name: 'category', label: 'Category', type: 'enum', options: ['A', 'B', 'C'] },
  ];

  const handleModalSave = (data: Record<string, User>) => {
    setSavedData(data);
    setModalOpen(false);
  };

  return (
    <Container>
      <Typography variant="h4">Edit Data</Typography>
      <Button variant="contained" onClick={() => setModalOpen(true)}>
        Open Edit Modal
      </Button>
      <Typography variant="h6">Saved Data: {JSON.stringify(savedData, null, 2)}</Typography>
      <EditModal<User>
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleModalSave}
        fields={fields}
        initialData={savedData}
      />
    </Container>
  );
};

export default PageB;
