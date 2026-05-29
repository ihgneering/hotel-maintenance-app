import axiosInstance from "../api/axios"

// upload report image  per defect
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

// upload worker submission image
export const submitWorkerImage = async (formData) => {
  const res = await axiosInstance.post(
    "/upload/task-submit-with-image",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};