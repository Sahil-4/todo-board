import { Router } from "express";
import { verifyAccessTokenHttp } from "../middlewares/authenticate.js";
import { fetchLogs } from "../controllers/logs.controller.js";

const router = Router();

router.use(verifyAccessTokenHttp);

router.get("/", fetchLogs);

export default router;
