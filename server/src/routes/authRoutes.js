import express from "express";
import { loginUser, registerUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser); // register
router.post("/login", loginUser); // login

export default router;
