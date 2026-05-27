import axiosInstance from "../api/axios"

// login user
export const loginUser = async (formData) => {
  const response = await axiosInstance.post("/auth/login", formData);

  return response.data;
};