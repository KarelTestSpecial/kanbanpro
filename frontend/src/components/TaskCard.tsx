import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent, Typography } from '@mui/material';

// Interface voor de taak data
interface Task {
  id: any; // Moet 'any' of 'string | number' zijn voor dnd-kit
  title: string;
  description: string;
}

// Interface voor de component props
interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
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
        <CardContent>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
            {task.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {task.description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskCard;
