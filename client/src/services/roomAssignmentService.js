import axiosInstance from "../api/axios";

// ROOM MATRIX/ASSIGNMENT

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

// post create assignment
export const createAssignment = async (payload) => {
  const res = await axiosInstance.post("/room-assignments", payload);
  return res.data;
};


// MY TASKS

// patch worker accept task
export const acceptTask = async (payload) => {
  const res = await axiosInstance.patch("/room-assignments/accept", payload);
  return res.data;
};

// get worker tasks
export const getMyTasks = async (workerId) => {
  const res = await axiosInstance.get(`room-assignments/worker/${workerId}`);
  return res.data
};

// get worker task detail
export const getTaskDetail = async (assignmentWorkerId ) => {
  const res = await axiosInstance.get(`/room-assignments/task/${assignmentWorkerId}`);
  return res.data;
};

// post worker submit task
export const submitTask = async (payload) => {
  const res = await axiosInstance.post("/room-assignments/task-submit", payload)
  return res.data;
};