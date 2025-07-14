/// <reference types="vite/client" />

interface UserI {
  _id: string;
  username: string;
  password: string;
}

interface TaskI {
  _id: string;
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
  _id: string;
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

type ColumnT = {
  key: TaskI["status"];
  label: string;
  tasks: TaskI[];
};
