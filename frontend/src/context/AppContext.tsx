import { createContext, useState, type PropsWithChildren } from "react";
import * as API from "../api";

interface AppContextI {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  error: any;
  setError: (error: any) => void;
  user: UserI | null;
  setUser: (user: UserI) => void;
  fetchUser: () => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  logout: () => void;
  login: (credentials: AuthCredentials) => Promise<void>;
  register: (credentials: AuthCredentials) => Promise<void>;
  tasks: TaskI[];
  setTasks: (tasks: TaskI[]) => void;
  addTask: (task: TaskNew) => Promise<void>;
  updateTask: (id: string, task: TaskI) => Promise<void>;
  deleteTask: (id: string) => void;
  fetchTasks: () => Promise<void>;
  logs: LogI[];
  setLogs: (logs: LogI[]) => void;
  fetchLogs: () => Promise<void>;
}

const AppContext = createContext<AppContextI>({} as AppContextI);

export const AppProvider = (props: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const [user, setUser] = useState<UserI | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [tasks, setTasks] = useState<TaskI[]>([]);

  const [logs, setLogs] = useState<LogI[]>([]);

  const fetchUser = () => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
      setIsAuthenticated(true);
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
    setTasks([]);
    setLogs([]);
  };

  const login = async (credentials: AuthCredentials) => {
    try {
      setIsLoading(true);
      const response = await API.login(credentials);
      localStorage.setItem("user", JSON.stringify(response.data));
      setUser(response.data);
      setIsAuthenticated(true);
      fetchTasks();
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (credentials: AuthCredentials) => {
    try {
      setIsLoading(true);
      const response = await API.register(credentials);
      localStorage.setItem("user", JSON.stringify(response.data));
      setUser(response.data);
      setIsAuthenticated(true);
      fetchTasks();
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const addTask = async (task: TaskNew) => {
    try {
      setIsLoading(true);
      const response = await API.addTask(task);
      setTasks((prevTasks) => [...prevTasks, response.data]);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateTask = async (id: string, task: TaskI) => {
    try {
      setIsLoading(true);
      const response = await API.updateTask(id, task);
      const updatedTasks = response.data;
      setTasks((prevTasks) => prevTasks.map((t) => (t.id === id ? updatedTasks : t)));
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTask = (id: string) => {
    try {
      setIsLoading(true);
      API.deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const response = await API.fetchTasks();
      setTasks(response.data);
      setError(null);
    } catch (err) {
      setError(err);
    }
  };

  const fetchLogs = async () => {
    try {
      setIsLoading(true);
      const response = await API.fetchLogs();
      setLogs(response.data);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    isLoading,
    setIsLoading,
    error,
    setError,
    user,
    setUser,
    fetchUser,
    isAuthenticated,
    setIsAuthenticated,
    logout,
    login,
    register,
    tasks,
    setTasks,
    addTask,
    updateTask,
    deleteTask,
    fetchTasks,
    logs,
    setLogs,
    fetchLogs,
  };

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};

export default AppContext;
export type { AppContextI };
