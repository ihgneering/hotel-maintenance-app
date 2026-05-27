import axiosInstance from "../api/axios";

// get all workers
export const getWorkers = async () => {
  const res = await axiosInstance.get("/room-assignments/workers");
  return res.data;
};

// get assignment
export const getAssignments = async () => {
  const res = await axiosInstance.get("/room-assignments");
  return res.data;
};

// create assignment
export const createAssignment = async (payload) => {
  const res = await axiosInstance.post("/room-assignments", payload);
  return res.data;
};

// get worker tasks
export const getMyTasks = async (workerId) => {
  const res = await axiosInstance.get(`/room-assignments/worker/${workerId}`);
  return res.data
};

// worker accept task
export const acceptTask = async (payload) => {
  const res = await axiosInstance.patch("room-assignments/accept", payload);
  return res.data;
}