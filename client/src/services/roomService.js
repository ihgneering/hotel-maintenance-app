import axiosInstance from "../api/axios";

// get rooms db
export const getAllRooms = async () => {
  const res = await axiosInstance.get("/rooms");
  return res.data;
};

// get floor from rooms db
export const getRoomsByFloor = async (floor) => {
  const res = await axiosInstance.get(`/rooms/floor/${floor}`);
  return res.data;
};