import axiosInstance from "../api/axios"

// upload singel image
export const uploadReportImage = async (FormData) => {
  const response = await axiosInstance.post(
    "/upload",
    FormData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};