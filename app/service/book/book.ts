import axiosInstance from "@/app/axios-instance";

export const CreateBooking = async (form : any) => {
  const response = await axiosInstance.post("/Booking", form);
  return response.data;
};
