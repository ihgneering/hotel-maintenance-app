import express from "express";
import { submitWorkerTaskWithImage, uploadReportImage } from "../controllers/uploadImageController.js";
import upload from "../middleware/uploadImageMiddleware.js";
import multer from "multer";

const router = express.Router();

// REPORT DEFECT

// defect image
router.post("/", upload.single("image"), uploadReportImage);

// MY TASKS

// submission image
router.post( "/task-submit-with-image", upload.single("image"), submitWorkerTaskWithImage);

export default router;