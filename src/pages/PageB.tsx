import React, { useState } from 'react';
import { Button, Container, Typography } from '@mui/material';
import DataModal from '../components/DataModal';

interface UserData {
  name: string;
  description: string;
  age: number;
  birthdate: string;
  isActive: boolean;
  category: string;
}

const PageB: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'view' | 'edit' | 'create'>('view');
  const [savedData, setSavedData] = useState<UserData>({
    name: '',
    description: '',
    age: 0,
    birthdate: '',
    isActive: false,
    category: '',
  });

  const fields: Field<UserData>[] = [
    { name: 'name', label: 'Name', type: 'string' },
    { name: 'description', label: 'Description', type: 'longString' },
    { name: 'age', label: 'Age', type: 'number' },
    { name: 'birthdate', label: 'Birth Date', type: 'date' },
    { name: 'isActive', label: 'Is Active', type: 'boolean' },
    { name: 'category', label: 'Category', type: 'enum', options: ['A', 'B', 'C'] },
  ];

  const handleModalSave = (data: UserData) => {
    setSavedData(data);
    setModalOpen(false);
  };

  const handleOpenModal = (mode: 'view' | 'edit' | 'create') => {
    setModalMode(mode);
    setModalOpen(true);
  };

  return (
    <Container>
      <Typography variant="h4">Sample</Typography>
      <Button variant="contained" onClick={() => handleOpenModal('view')}>
        View Data
      </Button>
      <Button variant="contained" onClick={() => handleOpenModal('edit')}>
        Edit Data
      </Button>
      <Button variant="contained" onClick={() => handleOpenModal('create')}>
        Create Data
      </Button>
      <Typography variant="h6">Saved Data: {JSON.stringify(savedData, null, 2)}</Typography>
      <DataModal<UserData>
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleModalSave}
        fields={fields}
        initialData={modalMode === 'create' ? {} as UserData : savedData}
        initialMode={modalMode}
      />
    </Container>
  );
};

export default PageB;
