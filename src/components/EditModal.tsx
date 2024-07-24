import React, { useState } from 'react';
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

type DataType =
  | 'string'
  | 'longString'
  | 'number'
  | 'date'
  | 'boolean'
  | 'enum';

interface Field<T> {
  name: keyof T;
  label: string;
  type: DataType;
  options?: string[]; // enumの場合の選択肢
}

interface ModalProps<T> {
  open: boolean;
  onClose: () => void;
  onSave: (data: T) => void;
  fields: Field<T>[];
  initialData?: T;
}

const EditModal = <T,>({
  open,
  onClose,
  onSave,
  fields,
  initialData,
}: ModalProps<T>) => {
  const [formData, setFormData] = useState<T>(initialData || ({} as T));

  const handleChange = <K extends keyof T>(name: K, value: T[K]) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const renderField = (field: Field) => {
    switch (field.type) {
      case 'string':
        return (
          <TextField
            label={field.label}
            value={formData[field.name] || ''}
            onChange={(e) => handleChange(field.name, e.target.value)}
            fullWidth
            margin="normal"
          />
        );
      case 'longString':
        return (
          <TextField
            label={field.label}
            value={formData[field.name] || ''}
            onChange={(e) => handleChange(field.name, e.target.value)}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
        );
      case 'number':
        return (
          <TextField
            label={field.label}
            value={formData[field.name] || ''}
            onChange={(e) => handleChange(field.name, Number(e.target.value))}
            fullWidth
            margin="normal"
            type="number"
          />
        );
      case 'date':
        return (
          <TextField
            label={field.label}
            value={formData[field.name] || ''}
            onChange={(e) => handleChange(field.name, e.target.value)}
            fullWidth
            margin="normal"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
        );
      case 'boolean':
        return (
          <FormControlLabel
            control={
              <Checkbox
                checked={!!formData[field.name]}
                onChange={(e) => handleChange(field.name, e.target.checked)}
              />
            }
            label={field.label}
          />
        );
      case 'enum':
        return (
          <FormControl fullWidth margin="normal">
            <InputLabel>{field.label}</InputLabel>
            <Select
              value={formData[field.name] || ''}
              onChange={(e) => handleChange(field.name, e.target.value)}
            >
              {field.options?.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog fullScreen open={open} onClose={onClose}>
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ flex: 1 }} variant="h6" component="div">
            Edit Data
          </Typography>
        </Toolbar>
      </AppBar>
      <div style={{ padding: 16 }}>
        {fields.map((field) => (
          <div key={field.name}>{renderField(field)}</div>
        ))}
	      <div style={{display: 'flex', justifyContent: 'flex-start'}}>
        <Button variant="contained" onClick={() => onSave(formData)}>
          Save
        </Button>
      </div>
      </div>

    </Dialog>
  );
};

export default EditModal;
