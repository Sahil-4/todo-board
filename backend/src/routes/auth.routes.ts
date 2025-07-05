import { Router } from "express";
import { signup, login } from "../controllers/auth.controller.js";

const router = Router();

router.get("/signup", signup);

router.get("/login", login);

export default router;
