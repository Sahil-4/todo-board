import express, { Response } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import { config } from "dotenv";
import rateLimiter, { rateLimiterOptions } from "./middlewares/rateLimiter.js";
import { APIResponse } from "./utils/APIResponse.js";
import authRouter from "./routes/auth.routes.js";
import tasksRouter from "./routes/tasks.routes.js";

config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rateLimiter(rateLimiterOptions));

app.get("/", (_, res: Response) => {
  const response = new APIResponse(200, null, "Welcome to the Todo Board API!");
  res.status(200).send(response);
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/tasks", tasksRouter);

export default app;
