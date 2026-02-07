import axiosInstance from "@/app/axios-instance";

export const Resgister = async (form: {
  name: string;
  email: string;
  username: string;
  password: string;
}) => {
  const response = await axiosInstance.post("/Auth/register", form);
  return response.data;
};

export const Login = async (form: {
  username: string;
  password: string;
}) => {
  const response = await axiosInstance.post("/Auth/login", form);
  return response.data;
};