import { useMutation } from "@tanstack/react-query";
import { Resgister } from "./auth";
import { useRouter } from "next/navigation";
interface RegisterForm {
  name: string;
  email: string;
  username: string;
  password: string;
}

export const useRegisterMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (formData: RegisterForm) => {
      return await Resgister(formData);
    },
    onSuccess: (data: any) => {
      alert(data.message || "สมัครสมาชิกสำเร็จ!");
      router.push("/login");
      console.log("Success:", data);
    },
    onError: (error: any) => {
      const serverMessage = error.response?.data?.message;

      alert("สมัครไม่สำเร็จ: " + (serverMessage || "ระบบขัดข้อง"));
      console.error("Error Detail:", error.response?.data);
    },
  });
};
