import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Box, Typography } from '@mui/material';
import TaskCard from './TaskCard';

// Interface voor de taak data, consistent met andere componenten
interface Task {
  id: any;
  title: string;
  description: string;
  status: string;
}

// Interface voor de component props
interface KanbanColumnProps {
  status: string;
  tasks: Task[];
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ status, tasks }) => {
  const { setNodeRef } = useDroppable({
    id: status, // De status string (bv. "TODO") is de unieke ID voor de drop-zone
  });

  return (
    <Box
      ref={setNodeRef} // Wijs de ref van de hook toe aan dit element
      sx={{
        width: 300,
        minHeight: 500,
        backgroundColor: '#f0f2f5', // Een lichte achtergrondkleur voor de kolom
        borderRadius: '8px',
        padding: '16px',
        margin: '0 8px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography 
        variant="h6" 
        sx={{ 
          marginBottom: '16px', 
          textTransform: 'capitalize', 
          fontWeight: 'bold' 
        }}
      >
        {/* Formatteer de status voor weergave (bv. "IN_PROGRESS" -> "In Progress") */}
        {status.replace('_', ' ').toLowerCase()}
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </SortableContext>
      </Box>
    </Box>
  );
};

export default KanbanColumn;
