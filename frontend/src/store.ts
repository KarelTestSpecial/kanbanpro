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
  createTask: (taskData: { title: string; description: string; }) => Promise<void>;
}

// Combineer State en Actions in een 'Store' type
export type Store = State & Actions;

// Maak een axios instance aan
export const axiosInstance = axios.create({
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
    try {
        const response = await axiosInstance.post('/auth/login', { username, password });
        const token = response.data.token;
        if (token) {
            localStorage.setItem('token', token);
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            set({ isAuthenticated: true, token: token, user: { username } });
        }
    } catch (error) {
        console.error("Login failed:", error);
        throw error; // Gooi de fout door zodat de component het kan afhandelen
    }
},

  register: async (username, password) => {
    await axiosInstance.post('/auth/register', { username, password });
  },

logout: () => {
    localStorage.removeItem('token');
    delete axiosInstance.defaults.headers.common['Authorization'];
    set({ isAuthenticated: false, token: null, user: null, tasks: [] });
},

  fetchTasks: async () => {
    try {
        const response = await axiosInstance.get('/tasks');
        set({ tasks: response.data });
    } catch (error) {
        console.error("Failed to fetch tasks, token might be invalid:", error);
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

  createTask: async (taskData: { title: string; description: string; }) => {
    try {
        await axiosInstance.post('/tasks', taskData);
        get().fetchTasks(); // Herlaad de takenlijst om de nieuwe taak te tonen
    } catch (error) {
        console.error("Failed to create task:", error);
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
