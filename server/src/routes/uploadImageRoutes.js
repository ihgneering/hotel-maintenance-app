import express from "express";
import { uploadReportImage } from "../controllers/uploadImageController.js";
import upload from "../middleware/uploadImageMiddleware.js";

const router = express.Router();

router.post("/", upload.single("image"), uploadReportImage);

export default router;