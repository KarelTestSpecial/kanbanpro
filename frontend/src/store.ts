import { create } from 'zustand';
import axios from 'axios';

// Definiëer de Task interface
interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
}

// Definiëer de State interface
interface State {
  token: string | null;
  user: { username: string } | null;
  tasks: Task[];
  isAuthenticated: boolean;
}

// Definiëer de Acties interface
interface Actions {
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
  fetchTasks: () => Promise<void>;
  updateTaskStatus: (taskId: number, status: string) => Promise<void>;
}

// Combineer State en Actions in een 'Store' type
export type Store = State & Actions;

// Maak een axios instance aan
const axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
});

// Exporteer de store, aangemaakt met 'create<Store>((set, get) => ({ ... }))'
const initialState: State = {
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),
    user: null, 
    tasks: []
};

const useStore = create<Store>((set, get) => ({
  ...initialState,

  // Acties
  login: async (username, password) => {
    const response = await axiosInstance.post('/auth/login', { username, password });
    // Gebaseerd op AuthResponse.java, verwachten we een object met een 'jwt' property.
    const token = response.data.jwt;
    localStorage.setItem('token', token);
    set({ token, user: { username }, isAuthenticated: true });
  },

  register: async (username, password) => {
    await axiosInstance.post('/auth/register', { username, password });
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ token: null, user: null, isAuthenticated: false, tasks: [] });
  },

  fetchTasks: async () => {
    const token = get().token;
    if (token) {
        const response = await axiosInstance.get('/tasks', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        set({ tasks: response.data });
    }
  },

  updateTaskStatus: async (taskId, status) => {
    const originalTasks = get().tasks;
    // Optimistische update van de lokale state
    const updatedTasks = originalTasks.map(task =>
      task.id === taskId ? { ...task, status } : task
    );
    set({ tasks: updatedTasks });

    try {
      // API-aanroep om de backend bij te werken
      await axiosInstance.put(`/tasks/${taskId}/status`, { status });
    } catch (error) {
      // Bij een fout, zet de originele taken terug
      set({ tasks: originalTasks });
      console.error("Failed to update task status:", error);
    }
  },
}));

// Voeg een request interceptor toe om de JWT token automatisch mee te sturen
axiosInstance.interceptors.request.use(
  (config) => {
    const token = useStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default useStore;
