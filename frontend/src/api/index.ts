import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem("user");
    const __access_token__ = user ? JSON.parse(user).access_token : null;
    if (__access_token__) {
      config.headers["__access_token__"] = __access_token__;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const register = async (credentials: AuthCredentials) => {
  try {
    const response = await api.post("/auth/signup", credentials);
    return response;
  } catch (error) {
    throw error;
  }
};

export const login = async (credentials: AuthCredentials) => {
  try {
    const response = await api.post("/auth/login", credentials);
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchTasks = async () => {
  try {
    const response = await api.get("/tasks");
    return response;
  } catch (error) {
    throw error;
  }
};

export const addTask = async (task: TaskNew) => {
  try {
    const response = await api.post("/tasks", task);
    return response;
  } catch (error) {
    throw error;
  }
};

export const assignTask = async (id: string, userId: string) => {
  try {
    const response = await api.post(`/tasks/${id}/assign`, { userId });
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateTask = async (id: string, task: TaskI) => {
  try {
    const response = await api.put(`/tasks/${id}`, task);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteTask = async (id: string) => {
  try {
    const response = await api.delete(`/tasks/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchLogs = async () => {
  try {
    const response = await api.get("/logs");
    return response;
  } catch (error) {
    throw error;
  }
};
