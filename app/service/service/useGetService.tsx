import { useQuery } from "@tanstack/react-query";
import { getServices } from "./service";

export const useGetServices = () => {
  return useQuery({
    queryKey: ["services"], // Key สำหรับเก็บ Cache
    queryFn: getServices,   // ฟังก์ชันดึงข้อมูล
    staleTime: 1000 * 60 * 5, // เก็บข้อมูลไว้ 5 นาทีไม่ต้องดึงใหม่บ่อยๆ
  });
};