import { Router } from "express";
import { getMe, loginUser, registerUser } from "../controllers/authController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/register",registerUser)
router.post("/login", loginUser)
router.get("/get-user", authMiddleware, getMe)

export default router