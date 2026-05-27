import {
  getAllRoomsService,
  getRoomsByFloorService,
} from "../services/roomService.js";

// room db (response)
export const getAllRooms = async (req, res) => {
  try {
    const rooms = await getAllRoomsService();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// floor from room db (response)
export const getRoomsByFloor = async (req, res) => {
  try {
    const { floor } = req.params;
    const rooms = await getRoomsByFloorService(floor);
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};