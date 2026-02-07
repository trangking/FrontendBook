import axiosInstance from "@/app/axios-instance";

export const getServices = async () => {
  const response = await axiosInstance.get("/Service");
  return response.data;
};
