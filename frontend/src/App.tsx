import { useState, useEffect, type ReactElement } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'; // Add useNavigate
import { DndContext, type DragEndEvent, type DragStartEvent, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Box, Container, Typography, Button } from '@mui/material'; // Add Button

// Component-imports
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import KanbanColumn from './components/KanbanColumn';
import TaskCard from './components/TaskCard';
import CreateTaskForm from './components/CreateTaskForm'; // Add this import

// Store-import
import useStore, { type Store, axiosInstance } from './store';

// --- PrivateRoute voor geauthenticeerde toegang ---
const PrivateRoute = ({ children }: { children: ReactElement }) => {
  const isAuthenticated = useStore((state: Store) => state.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// --- KanbanBoard Component ---
const KanbanBoard = () => {
  const tasks = useStore((state: Store) => state.tasks);
  const fetchTasks = useStore((state: Store) => state.fetchTasks);
  const updateTaskStatus = useStore((state: Store) => state.updateTaskStatus);
  const logout = useStore((state: Store) => state.logout); // Add this line
  const navigate = useNavigate(); // Add this line
  const [activeId, setActiveId] = useState<string | number | null>(null);

  const handleLogout = () => { // Add this function
    logout();
    navigate('/login');
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
        const taskId = Number(active.id);
        const newStatus = over.id as string;

        updateTaskStatus(taskId, newStatus);
    }
    setActiveId(null);
};

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const statuses = ['TODO', 'IN_PROGRESS', 'DONE'];
  const taskIds = tasks.map(t => t.id);
  const activeTask = tasks.find(t => t.id === activeId);

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h4" component="h1">
              Kanban Board
            </Typography>
            <Button variant="outlined" color="secondary" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
          <CreateTaskForm /> {/* Add this component */}
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
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

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

