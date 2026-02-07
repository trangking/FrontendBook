import { useMutation } from "@tanstack/react-query";
import { Login, Resgister } from "./auth";
import { useRouter } from "next/navigation";
interface LoginForm {
  username: string;
  password: string;
}

export const useLoginMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (formData: LoginForm) => {
      return await Login(formData);
    },
    onSuccess: (data: any) => {
      alert(data.message || "เข้าสู่ระบบสำเร็จ!");
      router.push("/book");
      console.log("Success:", data);
    },
    onError: (error: any) => {
      const serverMessage = error.response?.data?.message;

      alert("เข้าสู่ระบบไม่สำเร็จ: " + (serverMessage || "ระบบขัดข้อง"));
      console.error("Error Detail:", error.response?.data);
    },
  });
};
