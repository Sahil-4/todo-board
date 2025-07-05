import { Request, Response } from "express";
import { APIResponse } from "../utils/APIResponse.js";
import User from "../models/user.js";

export const signup = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res
        .status(400)
        .send(new APIResponse(400, null, "Username and password are required"));
      return;
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(400).send(new APIResponse(400, null, "User already exists"));
      return;
    }

    const newUser = await User.create({ username, password });

    const authToken = await newUser.generateAuthToken();

    const data = { ...newUser.toObject(), password: undefined, authToken };

    res.status(200).send(new APIResponse(200, data, "Signup successful"));
  } catch (error) {
    res.status(500).send(new APIResponse(500, null, "Internal server error"));
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res
        .status(400)
        .send(new APIResponse(400, null, "Username and password are required"));
      return;
    }

    const user = await User.findOne({ username });
    if (!user) {
      res.status(404).send(new APIResponse(404, null, "User not found"));
      return;
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      res.status(401).send(new APIResponse(401, null, "Invalid credentials"));
      return;
    }

    const authToken = await user.generateAuthToken();

    const data = { ...user.toObject(), password: undefined, authToken };

    res.status(200).send(new APIResponse(200, data, "Login successful"));
  } catch (error) {
    res.status(500).send(new APIResponse(500, null, "Internal server error"));
  }
};
