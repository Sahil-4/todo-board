import { APIResponse } from "../utils/APIResponse.js";
import { Request, Response } from "express";
import { getLogs } from "../models/logs.js";
import mongoose from "mongoose";

export const fetchLogs = async (req: Request, res: Response) => {
  try {
    const userId = req.user_id;
    const { limit = 20, page = 1 } = req.query;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400).send(new APIResponse(400, null, "Invalid User ID"));
      return;
    }

    const logs = await getLogs(userId, Number(limit), Number(page));

    res.status(200).send(
      new APIResponse(200, logs.logs, "Logs retrieved successfully", {
        totalLogs: logs.totalLogs,
        hasMore: logs.hasMore,
        page: Number(page),
        limit: Number(limit),
      })
    );
  } catch (error) {
    res.status(500).send(new APIResponse(500, null, "Internal server error"));
  }
};
