import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateBooking } from "./book";

interface BookingForm {      
  userId: number;     
  serviceId: number;  
  startTime: string;  
  endTime: string;    
  status: string;     
}

export const useBookingMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: BookingForm) => {
      return await CreateBooking(formData);
    },
    onSuccess: (data: any) => {
      alert("จองคิวสำเร็จ!");
      console.log("Success:", data);
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
    onError: (error: any) => {
      const serverMessage = error.response?.data?.message;
      alert("จองไม่สำเร็จ: " + (serverMessage || "ตรวจพบช่วงเวลาทับซ้อนกัน"));
    },
  });
};