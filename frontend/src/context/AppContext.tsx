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
  isAuthenticated: boolean | undefined;
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
  showLogsModel: boolean;
  showAddTaskModel: boolean;
  showEditTaskModel: boolean;
  showMergeConflictModel: boolean;
  openLogsModel: () => void;
  closeLogsModel: () => void;
  openAddTaskModel: () => void;
  closeAddTaskModel: () => void;
  openEditTaskModel: () => void;
  closeEditTaskModel: () => void;
  openMergeConflictModel: () => void;
  closeMergeConflictModel: () => void;
}

const AppContext = createContext<AppContextI>({} as AppContextI);

export const AppProvider = (props: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const [user, setUser] = useState<UserI | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);

  const [tasks, setTasks] = useState<TaskI[]>([]);

  const [logs, setLogs] = useState<LogI[]>([]);

  const [showLogsModel, setShowLogsModel] = useState(false);
  const [showAddTaskModel, setShowAddTaskModel] = useState(false);
  const [showEditTaskModel, setShowEditTaskModel] = useState(false);
  const [showMergeConflictModel, setShowMergeConflictModel] = useState(false);

  const openLogsModel = () => {
    setShowLogsModel(true);
  };

  const closeLogsModel = () => {
    setShowLogsModel(false);
  };

  const openAddTaskModel = () => {
    setShowAddTaskModel(true);
  };

  const closeAddTaskModel = () => {
    setShowAddTaskModel(false);
  };

  const openEditTaskModel = () => {
    setShowEditTaskModel(true);
  };

  const closeEditTaskModel = () => {
    setShowEditTaskModel(false);
  };

  const openMergeConflictModel = () => {
    setShowMergeConflictModel(true);
  };

  const closeMergeConflictModel = () => {
    setShowMergeConflictModel(false);
  };

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
      const user = response.data.data;
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
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
      const user = response.data.data;
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
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
      setTasks((prevTasks) => [...prevTasks, response.data.data]);
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
      const updatedTasks = response.data.data;
      setTasks((prevTasks) => prevTasks.map((t) => (t._id === id ? updatedTasks : t)));
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
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
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
      setTasks((prevTasks) => [...prevTasks, ...response.data.data]);
      setError(null);
    } catch (err) {
      setError(err);
    }
  };

  const fetchLogs = async () => {
    try {
      setIsLoading(true);
      const response = await API.fetchLogs();
      setLogs(response.data.data);
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
    showLogsModel,
    showAddTaskModel,
    showEditTaskModel,
    showMergeConflictModel,
    openLogsModel,
    closeLogsModel,
    openAddTaskModel,
    closeAddTaskModel,
    openEditTaskModel,
    closeEditTaskModel,
    openMergeConflictModel,
    closeMergeConflictModel,
  };

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};

export default AppContext;
export type { AppContextI };
