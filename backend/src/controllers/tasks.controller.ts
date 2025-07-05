import { Request, Response } from "express";
import { APIResponse } from "../utils/APIResponse.js";

export const getAllTasks = (req: Request, res: Response) => {
  try {
    res.status(200).send(new APIResponse(200, null, "Under development"));
  } catch (error) {
    res.status(500).send(new APIResponse(500, null, "Internal server error"));
  }
};

export const getTask = (req: Request, res: Response) => {
  try {
    res.status(200).send(new APIResponse(200, null, "Under development"));
  } catch (error) {
    res.status(500).send(new APIResponse(500, null, "Internal server error"));
  }
};

export const createTask = (req: Request, res: Response) => {
  try {
    res.status(200).send(new APIResponse(200, null, "Under development"));
  } catch (error) {
    res.status(500).send(new APIResponse(500, null, "Internal server error"));
  }
};

export const updateTask = (req: Request, res: Response) => {
  try {
    res.status(200).send(new APIResponse(200, null, "Under development"));
  } catch (error) {
    res.status(500).send(new APIResponse(500, null, "Internal server error"));
  }
};

export const deleteTask = (req: Request, res: Response) => {
  try {
    res.status(200).send(new APIResponse(200, null, "Under development"));
  } catch (error) {
    res.status(500).send(new APIResponse(500, null, "Internal server error"));
  }
};

export const assignTask = (req: Request, res: Response) => {
  try {
    res.status(200).send(new APIResponse(200, null, "Under development"));
  } catch (error) {
    res.status(500).send(new APIResponse(500, null, "Internal server error"));
  }
};
