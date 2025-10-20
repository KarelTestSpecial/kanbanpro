import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent, Typography, IconButton } from '@mui/material'; // Add IconButton
import DeleteIcon from '@mui/icons-material/Delete'; // Add DeleteIcon
import useStore, { type Store } from '../store'; // Import useStore and Store type

// Interface voor de taak data
interface Task {
  id: any; // Moet 'any' of 'string | number' zijn voor dnd-kit
  title: string;
  description: string;
  status: string; // Add status
}

// Interface voor de component props
interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const deleteTask = useStore((state: Store) => state.deleteTask); // Get deleteTask action
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.id });

  // Stijlen voor de drag-and-drop animatie
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginBottom: '8px', // Ruimte tussen de kaarten
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card>
        <CardContent sx={{ position: 'relative' }}> {/* Add position: 'relative' for absolute positioning */}
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
            {task.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {task.description}
          </Typography>
          <IconButton
            aria-label="delete"
            size="small"
            onClick={() => deleteTask(task.id)}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskCard;
