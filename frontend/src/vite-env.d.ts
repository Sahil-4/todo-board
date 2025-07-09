/// <reference types="vite/client" />

interface UserI {
  id: string;
  username: string;
  password: string;
}

interface TaskI {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
  priority: "Low" | "Medium" | "High";
  createdAt: string;
  updatedAt: string;
  assignedTo: UserI | null;
  createdBy: UserI;
}

type TaskNew = Pick<TaskI, "title" | "description" | "priority">;

interface LogI {
  id: string;
  action: string;
  user: UserI;
  task?: TodoI;
  createdAt: string;
  updatedAt: string;
}

type AuthCredentials = {
  username: string;
  password: string;
};

