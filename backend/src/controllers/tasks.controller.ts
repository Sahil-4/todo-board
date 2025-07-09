import { Request, Response } from "express";
import { APIResponse } from "../utils/APIResponse.js";
import mongoose from "mongoose";
import Task from "../models/tasks.js";
import { addLog } from "../models/logs.js";

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const { limit, page } = req.query;
    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 10;
    const skip = (pageNum - 1) * limitNum;

    const tasks = await Task.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum + 1);

    const hasMore = tasks.length > limitNum;
    const paginatedTasks = hasMore ? tasks.slice(0, limitNum) : tasks;

    const meta = {
      page: pageNum,
      limit: limitNum,
      hasMore,
    };

    addLog("getAllTasks", req.user_id);

    res
      .status(200)
      .send(new APIResponse(200, paginatedTasks, "Tasks retrieved successfully", meta));
  } catch (error) {
    res.status(500).send(new APIResponse(500, null, "Internal server error"));
  }
};

export const getTask = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.id;

    if (!taskId || !mongoose.Types.ObjectId.isValid(taskId)) {
      res.status(400).send(new APIResponse(400, null, "Invalid Task ID"));
      return;
    }

    const task = await Task.find({ _id: taskId });
    if (!task) {
      res.status(404).send(new APIResponse(404, null, "Task not found"));
      return;
    }

    addLog("getTask", req.user_id, taskId);

    res.status(200).send(new APIResponse(200, [task], "Task retrieved successfully"));
  } catch (error) {
    console.error("Error retrieving task:", error);
    res.status(500).send(new APIResponse(500, null, "Internal server error"));
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, priority } = req.body;

    const userId = req.user_id;

    if (!title || !description || !priority) {
      res
        .status(400)
        .send(new APIResponse(400, null, "Title, description, and priority are required"));
      return;
    }

    if (!["Low", "Medium", "High"].includes(priority)) {
      res.status(400).send(new APIResponse(400, null, "Invalid priority value"));
      return;
    }

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400).send(new APIResponse(400, null, "Invalid User ID"));
      return;
    }

    const task = new Task({
      title,
      description,
      priority,
      status: "todo",
      assignedTo: userId,
      createdBy: userId,
    });
    await task.save();

    addLog("createTask", userId, task._id.toString());

    res.status(201).send(new APIResponse(201, [task], "Task created successfully"));
  } catch (error) {
    res.status(500).send(new APIResponse(500, null, "Internal server error"));
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.id;
    const { title, description, priority, status } = req.body;

    if (!taskId || !mongoose.Types.ObjectId.isValid(taskId)) {
      res.status(400).send(new APIResponse(400, null, "Invalid Task ID"));
      return;
    }

    const task = await Task.findByIdAndUpdate(taskId, {
      title,
      description,
      priority,
      status,
    });

    if (!task) {
      res.status(404).send(new APIResponse(404, null, "Task not found"));
      return;
    }

    addLog("updateTask", req.user_id, taskId);

    res.status(200).send(new APIResponse(200, [task], "Task updated successfully"));
  } catch (error) {
    res.status(500).send(new APIResponse(500, null, "Internal server error"));
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.id;

    if (!taskId || !mongoose.Types.ObjectId.isValid(taskId)) {
      res.status(400).send(new APIResponse(400, null, "Invalid Task ID"));
      return;
    }

    const task = await Task.findByIdAndDelete(taskId);
    if (!task) {
      res.status(404).send(new APIResponse(404, null, "Task not found"));
      return;
    }

    addLog("deleteTask", req.user_id, taskId);

    res.status(200).send(new APIResponse(200, null, "Task deleted successfully"));
  } catch (error) {
    res.status(500).send(new APIResponse(500, null, "Internal server error"));
  }
};

export const assignTask = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.id;
    const { userId } = req.body;

    if (!taskId || !mongoose.Types.ObjectId.isValid(taskId)) {
      res.status(400).send(new APIResponse(400, null, "Invalid Task ID"));
      return;
    }

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400).send(new APIResponse(400, null, "Invalid User ID"));
      return;
    }

    const task = await Task.findByIdAndUpdate(taskId, { assignedTo: userId });
    if (!task) {
      res.status(404).send(new APIResponse(404, null, "Task not found"));
      return;
    }

    addLog("assignTask", req.user_id, taskId);

    res.status(200).send(new APIResponse(200, [task], "Task assigned successfully"));
  } catch (error) {
    res.status(500).send(new APIResponse(500, null, "Internal server error"));
  }
};
