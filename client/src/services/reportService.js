import axiosInstance from "../api/axios";

// create report defect
export const createReport = async (payload) => {
  const res = await axiosInstance.post("/reports", payload);
  return res.data;
};