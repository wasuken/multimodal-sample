import React, { useEffect, useState } from 'react';
import { Dialog, AppBar, Toolbar, IconButton, Typography, Button, TextField, Select, MenuItem, FormControl, InputLabel, Checkbox, FormControlLabel } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

type DataType = 'string' | 'longString' | 'number' | 'date' | 'boolean' | 'enum';

interface Field<T> {
  name: keyof T;
  label: string;
  type: DataType;
  options?: string[];
}

interface ModalProps<T> {
  open: boolean;
  onClose: () => void;
  onSave: (data: T) => void;
  fields: Field<T>[];
  initialData?: T;
  initialMode: 'view' | 'edit' | 'create';
}

const DataModal = <T,>({ open, onClose, onSave, fields, initialData = {} as T, initialMode }: ModalProps<T>) => {
  const [formData, setFormData] = useState<T>(initialData);
  const [mode, setMode] = useState<'view' | 'edit' | 'create'>(initialMode);

  const handleChange = <K extends keyof T>(name: K, value: T[K]) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const renderField = (field: Field<T>) => {
    const commonProps = {
      label: field.label,
      value: formData[field.name] as string | number | boolean,
      onChange: (e: React.ChangeEvent<HTMLInputElement | { value: unknown }>) =>
        handleChange(field.name, e.target.value as T[keyof T]),
      fullWidth: true,
      margin: "normal" as const,
      InputLabelProps: {
        shrink: true,
      },
    };

    switch (field.type) {
      case 'string':
      case 'longString':
        return mode === 'view' ? (
          <Typography key={field.name.toString()}>{field.label}: {formData[field.name]}</Typography>
        ) : (
          <TextField
            {...commonProps}
            multiline={field.type === 'longString'}
            rows={field.type === 'longString' ? 4 : 1}
            disabled={mode === 'view'}
          />
        );
      case 'number':
        return mode === 'view' ? (
          <Typography key={field.name.toString()}>{field.label}: {formData[field.name]}</Typography>
        ) : (
          <TextField
            {...commonProps}
            type="number"
            disabled={mode === 'view'}
          />
        );
      case 'date':
        return mode === 'view' ? (
          <Typography key={field.name.toString()}>{field.label}: {formData[field.name]}</Typography>
        ) : (
          <TextField
            {...commonProps}
            type="date"
            disabled={mode === 'view'}
          />
        );
      case 'boolean':
        return mode === 'view' ? (
          <Typography key={field.name.toString()}>{field.label}: {formData[field.name] ? 'Yes' : 'No'}</Typography>
        ) : (
          <FormControlLabel
            control={
              <Checkbox
                checked={formData[field.name] as boolean}
                onChange={(e) => handleChange(field.name, e.target.checked as T[keyof T])}
                disabled={mode === 'view'}
              />
            }
            label={field.label}
          />
        );
      case 'enum':
        return mode === 'view' ? (
          <Typography key={field.name.toString()}>{field.label}: {formData[field.name]}</Typography>
        ) : (
          <FormControl fullWidth margin="normal">
            <InputLabel>{field.label}</InputLabel>
            <Select
              value={formData[field.name] as string}
              onChange={(e) => handleChange(field.name, e.target.value as T[keyof T])}
              disabled={mode === 'view'}
            >
              {field.options?.map(option => (
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
  useEffect(() => {
    setMode(initialMode);
  }, [initialMode])

  return (
    <Dialog fullScreen open={open} onClose={onClose}>
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography sx={{ flex: 1 }} variant="h6" component="div">
            {mode === 'view' ? 'View Data' : mode === 'edit' ? 'Edit Data' : 'Create Data'}
          </Typography>
          {mode === 'view' && (
            <Button color="inherit" onClick={() => setMode('edit')}>
              Edit
            </Button>
          )}
          {mode === 'edit' && (
            <Button color="inherit" onClick={() => setMode('view')}>
              View
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <div style={{ padding: 16 }}>
        {fields.map(field => (
          <div key={field.name.toString()}>
            {renderField(field)}
          </div>
        ))}
	{mode !== 'view' && (
        <div>
          <Button variant="contained" onClick={() => onSave(formData)}>
            Save
          </Button>
        </div>
      )}
      </div>

    </Dialog>
  );
};

export default DataModal;
