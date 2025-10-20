import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import useStore, { type Store } from '../store'; // Import Store type

const CreateTaskForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const createTask = useStore((state: Store) => state.createTask); // Use Store type

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (title.trim() && description.trim()) {
      await createTask({ title, description });
      setTitle('');
      setDescription('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="Task Title"
        variant="outlined"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="Task Description"
        variant="outlined"
        fullWidth
        multiline
        rows={2}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button type="submit" variant="contained" color="primary">
        Add Task
      </Button>
    </Box>
  );
};

export default CreateTaskForm;
