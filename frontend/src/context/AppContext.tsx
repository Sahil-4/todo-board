import { createContext, useEffect, useRef, useState, type PropsWithChildren } from "react";
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
  conflictedTask: { taskServer: TaskI | undefined; taskClient: TaskI | undefined };
  selectedTask: TaskI | null;
  groupedTasks: ColumnT[];
  setTasks: (tasks: TaskI[]) => void;
  addTask: (task: TaskNew) => Promise<void>;
  updateTask: (id: string, task: TaskI) => Promise<void>;
  updateTaskStatus: (taskId: string, status: TaskI["status"]) => Promise<void>;
  deleteTask: (id: string) => void;
  fetchTasks: () => Promise<void>;
  logs: LogI[];
  setLogs: (logs: LogI[]) => void;
  fetchLogs: () => Promise<void>;
  showLogsModel: boolean;
  showAddTaskModel: boolean;
  showUpdateTaskModel: boolean;
  showMergeConflictModel: boolean;
  showViewTaskModel: boolean;
  showConflictResolutionModal: boolean;
  openLogsModel: () => void;
  closeLogsModel: () => void;
  openAddTaskModel: () => void;
  closeAddTaskModel: () => void;
  openUpdateTaskModel: (task: TaskI) => void;
  closeUpdateTaskModel: () => void;
  openMergeConflictModel: () => void;
  closeMergeConflictModel: () => void;
  openViewTaskModel: (task: TaskI) => void;
  closeViewTaskModel: () => void;
  openErrorModal: (message: string, onClose: () => void) => void;
  closeErrorModal: () => void;
  closeConflictResolutionModal: () => void;
}

const AppContext = createContext<AppContextI>({} as AppContextI);

export const AppProvider = (props: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const errorOnClose = useRef<Function | null>(null);

  const [user, setUser] = useState<UserI | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);

  const [tasks, setTasks] = useState<TaskI[]>([]);
  const [selectedTask, setSelectedTask] = useState<TaskI | null>(null);
  const [conflictedTask, setConflictedTask] = useState<AppContextI["conflictedTask"]>({
    taskServer: undefined,
    taskClient: undefined,
  });
  const [groupedTasks, setGroupedTasks] = useState<ColumnT[]>([
    { key: "todo", label: "Todo", tasks: [] },
    { key: "in-progress", label: "In progress", tasks: [] },
    { key: "done", label: "Done", tasks: [] },
  ]);

  const [logs, setLogs] = useState<LogI[]>([]);

  const [showLogsModel, setShowLogsModel] = useState(false);
  const [showAddTaskModel, setShowAddTaskModel] = useState(false);
  const [showUpdateTaskModel, setShowUpdateTaskModel] = useState(false);
  const [showMergeConflictModel, setShowMergeConflictModel] = useState(false);
  const [showViewTaskModel, setShowViewTaskModel] = useState(false);
  const [showConflictResolutionModal, setShowConflictResolutionModal] = useState(false);

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

  const openUpdateTaskModel = (task: TaskI) => {
    setSelectedTask(task);
    setShowUpdateTaskModel(true);
  };

  const closeUpdateTaskModel = () => {
    setShowUpdateTaskModel(false);
  };

  const openMergeConflictModel = () => {
    setShowMergeConflictModel(true);
  };

  const closeMergeConflictModel = () => {
    setShowMergeConflictModel(false);
  };

  const openViewTaskModel = (task: TaskI) => {
    setSelectedTask(task);
    setShowViewTaskModel(true);
  };

  const closeViewTaskModel = () => {
    setShowViewTaskModel(false);
    // setSelectedTask(null);
  };

  const openErrorModal = (message: string, onClose?: () => void) => {
    setError(message);
    errorOnClose.current = onClose || null;
  };

  const closeErrorModal = () => {
    setError(null);
    if (errorOnClose.current) errorOnClose.current();
  };

  const openConflictResolutionModal = (taskServer: TaskI, taskClient: TaskI) => {
    setConflictedTask({ taskServer, taskClient });
    setShowConflictResolutionModal(true);
  };

  const closeConflictResolutionModal = () => {
    setShowConflictResolutionModal(false);
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
    } catch (err: any) {
      openErrorModal(err.response?.data.message || err.message);
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
    } catch (err: any) {
      openErrorModal(err.response?.data.message || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const addTask = async (task: TaskNew) => {
    try {
      setIsLoading(true);
      const response = await API.addTask(task);
      setTasks((prevTasks) => [...prevTasks, response.data.data]);
    } catch (err: any) {
      openErrorModal(err.response?.data.message || err.message);
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
    } catch (err: any) {
      let cb = undefined;
      if (err.response?.data.statusCode === 409) {
        const [taskServer, taskClient] = err.response.data.data;
        cb = () => openConflictResolutionModal(taskServer, taskClient);
      }
      openErrorModal(err.response?.data.message || err.message, cb);
    } finally {
      setIsLoading(false);
    }
  };

  const updateTaskStatus = async (taskId: string, status: TaskI["status"]) => {
    try {
      setIsLoading(true);
      let flag = true;
      const updatedTasks = tasks.map((task) => {
        if (task._id === taskId) {
          flag = task.status !== status;
          task.status = status;
        }
        return task;
      });
      if (flag) {
        setTasks(updatedTasks);
        const task = tasks.find((task) => task._id === taskId);
        await API.updateTask(taskId, task!);
      }
    } catch (err: any) {
      openErrorModal(err.response?.data.message || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTask = (id: string) => {
    try {
      setIsLoading(true);
      API.deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (err: any) {
      openErrorModal(err.response?.data.message || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const response = await API.fetchTasks();
      setTasks(response.data.data);
    } catch (err: any) {
      openErrorModal(err.response?.data.message || err.message);
    }
  };

  const fetchLogs = async () => {
    try {
      setIsLoading(true);
      const response = await API.fetchLogs();
      setLogs(response.data.data);
    } catch (err: any) {
      openErrorModal(err.response?.data.message || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateGroupedTasks = () => {
    const todo: ColumnT = { key: "todo", label: "Todo", tasks: [] };
    const progress: ColumnT = { key: "in-progress", label: "In progress", tasks: [] };
    const done: ColumnT = { key: "done", label: "Done", tasks: [] };
    tasks.forEach((task: TaskI) => {
      if (task.status === "todo") {
        todo.tasks.push(task);
      } else if (task.status === "in-progress") {
        progress.tasks.push(task);
      } else {
        done.tasks.push(task);
      }
    });
    setGroupedTasks([todo, progress, done]);
  };

  useEffect(() => {
    updateGroupedTasks();
  }, [tasks]);

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
    selectedTask,
    conflictedTask,
    groupedTasks,
    setTasks,
    addTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
    fetchTasks,
    logs,
    setLogs,
    fetchLogs,
    showLogsModel,
    showAddTaskModel,
    showUpdateTaskModel,
    showMergeConflictModel,
    showViewTaskModel,
    showConflictResolutionModal,
    openLogsModel,
    closeLogsModel,
    openAddTaskModel,
    closeAddTaskModel,
    openUpdateTaskModel,
    closeUpdateTaskModel,
    openMergeConflictModel,
    closeMergeConflictModel,
    openViewTaskModel,
    closeViewTaskModel,
    openErrorModal,
    closeErrorModal,
    closeConflictResolutionModal,
  };

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};

export default AppContext;
export type { AppContextI };
