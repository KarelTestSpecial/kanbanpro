import { useState, useEffect, type ReactElement } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DndContext, type DragEndEvent, type DragStartEvent, DragOverlay } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Box, Container, Typography } from '@mui/material';

// Component-imports
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import KanbanColumn from './components/KanbanColumn';
import TaskCard from './components/TaskCard';

// Store-import
import useStore, { type Store } from './store';

// --- PrivateRoute voor geauthenticeerde toegang ---
const PrivateRoute = ({ children }: { children: ReactElement }) => {
  const isAuthenticated = useStore((state: Store) => state.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// --- KanbanBoard Component ---
const KanbanBoard = () => {
  const { tasks, fetchTasks, updateTaskStatus } = useStore((state: Store) => ({
    tasks: state.tasks,
    fetchTasks: state.fetchTasks,
    updateTaskStatus: state.updateTaskStatus,
  }));
  const [activeId, setActiveId] = useState<string | number | null>(null);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;

    if (!over) return;

    const activeTask = tasks.find(t => t.id === active.id);
    if (!activeTask) return;

    // Bepaal de nieuwe status, of de drop nu op een kolom of een andere taak was
    const overId = over.id;
    const overTask = tasks.find(t => t.id === overId);
    const newStatus = overTask ? overTask.status : (overId as string);
    
    const statuses = ['TODO', 'IN_PROGRESS', 'DONE'];
    if (statuses.includes(newStatus) && activeTask.status !== newStatus) {
      updateTaskStatus(active.id as number, newStatus);
    }
  };

  const statuses = ['TODO', 'IN_PROGRESS', 'DONE'];
  const taskIds = tasks.map(t => t.id);
  const activeTask = tasks.find(t => t.id === activeId);

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Kanban Board
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            {statuses.map((status) => (
              <KanbanColumn
                key={status}
                status={status}
                tasks={tasks.filter((task) => task.status === status)}
              />
            ))}
          </Box>
        </Container>
      </SortableContext>
      <DragOverlay>
        {activeTask ? <TaskCard task={activeTask} /> : null}
      </DragOverlay>
    </DndContext>
  );
};

// --- Hoofd App Component met Routing ---
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/kanban"
          element={
            <PrivateRoute>
              <KanbanBoard />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Navigate to="/kanban" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

