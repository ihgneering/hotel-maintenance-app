import express from "express";
import { fetchMyTasks } from "../controllers/taskController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// get my tasks
router.get("/my-tasks", verifyToken, fetchMyTasks);

export default router;