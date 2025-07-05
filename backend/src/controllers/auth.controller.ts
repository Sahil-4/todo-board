import { Request, Response } from "express";
import { APIResponse } from "../utils/APIResponse.js";

export const signup = async (req: Request, res: Response) => {
  try {
    res.status(200).send(new APIResponse(200, null, "Under development"));
  } catch (error) {
    res.status(500).send(new APIResponse(500, null, "Internal server error"));
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    res.status(200).send(new APIResponse(200, null, "Under development"));
  } catch (error) {
    res.status(500).send(new APIResponse(500, null, "Internal server error"));
  }
};
