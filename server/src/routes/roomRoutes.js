import express from "express";
import {
  getAllRooms,
  getRoomsByFloor,
} from "../controllers/roomController.js";

const router = express.Router();

router.get("/", getAllRooms); // api/rooms
router.get("/floor/:floor", getRoomsByFloor); // api/rooms/7

export default router;