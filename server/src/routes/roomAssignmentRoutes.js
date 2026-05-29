import express from "express";

import {
  getWorkers,
  createRoomAssignments,
  getAllRoomAssignments,
  getWorkerTasks,
  acceptTask,
  getTaskDetail,
  submitWorkerTask,
} from "../controllers/roomAssignmentController.js";

const router = express.Router();

// ROOM MATRIX/ASSIGNMENT

// get all workers
router.get("/workers", getWorkers); // api/worker
// get room assignment
router.get("/", getAllRoomAssignments); // api/room-assignment
// create room assignment
router.post("/", createRoomAssignments); // api/room-assignment

// MY TASKS

// patch worker accept tasks
router.patch("/accept", acceptTask); // api/room-assignments/accept
// get worker task
router.get("/worker/:worker_id", getWorkerTasks); // api/room-assignments/worker/:id
// get worker task detail 
router.get("/task/:assignment_worker_id", getTaskDetail); // api/room-assignments/task/:assignment_worker_id
// post worker submission
router.post("/task-submit", submitWorkerTask); // api/room-assignments/task-submit

export default router;