import express from "express";

import {
  getWorkers,
  createRoomAssignments,
  getAllRoomAssignments,
  getWorkerTasks,
  acceptTask,
} from "../controllers/roomAssignmentController.js";

const router = express.Router();

// get all workers
router.get("/workers", getWorkers); // api/worker

// get room assignment
router.get("/", getAllRoomAssignments); // api/room-assignment

// create room assignment
router.post("/", createRoomAssignments); // api/room-assignment

// get worker assignment
router.get("/worker/:worker_id", getWorkerTasks) // api/room-assignments/worker/:id

// get worker accept tasks
router.patch("/accept", acceptTask);

export default router;