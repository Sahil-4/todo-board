import { Router } from "express";
import {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  assignTask,
} from "../controllers/tasks.controller.js";

const router = Router();

router.get("/", getAllTasks);

router.get("/:id", getTask);

router.post("/", createTask);

router.post("/:id/assign", assignTask);

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

export default router;
