import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { ExtendedError, Socket } from "socket.io";
import { APIResponse } from "../utils/APIResponse.js";

export const verifyAccessTokenHttp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const __access_token__ =
      req.cookies?.__access_token__ ||
      req.header("__access_token__")?.replace("Bearer ", "");

    const payload = jwt.verify(
      __access_token__,
      String(process.env.JWT_SECRET)
    ) as { id: string; username: string };

    req.user_id = payload.id;

    next();
  } catch (error: any) {
    console.error(error.message);
    res
      .status(401)
      .send(new APIResponse(401, null, "failed to authenticate access token"));
  }
};

export const verifyAccessTokenSocket = async (
  socket: Socket,
  next: (err?: ExtendedError) => void
) => {
  try {
    const __access_token__ = String(socket.handshake.auth.__access_token__);

    const payload = jwt.verify(
      __access_token__,
      String(process.env.JWT_SECRET)
    ) as {
      id: string;
      username: string;
    };

    socket.data.user_id = payload.id;

    next();
  } catch (error: any) {
    console.error(error.message);
    return next(new Error("failed to authenticate access token"));
  }
};
