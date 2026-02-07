"use client";
import { useState } from "react";
import { UserPlus, Mail, User, Lock, Loader2, ArrowRight } from "lucide-react";
import { useRegisterMutation } from "./service/login/useRegister";
import Link from "next/link";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });
  
  const { mutate, isPending } = useRegisterMutation();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-slate-100 via-slate-50 to-green-50 flex items-center justify-center p-4">
      <div className="bg-white/80 backdrop-blur-xl w-full max-w-md rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-10 border border-white">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="bg-gradient-to-br from-green-400 to-green-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-3 shadow-lg shadow-green-200">
            <UserPlus className="text-white" size={40} />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            สร้างบัญชีใหม่
          </h1>
          <p className="text-slate-500 mt-2 font-medium">
            ยินดีต้อนรับ! เริ่มต้นใช้งานระบบจองคิวของเรา
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          {/* Input: Name */}
          <div className="relative group">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-green-500 transition-colors" size={20} />
            <input
              required
              className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all text-slate-700 placeholder:text-slate-400"
              placeholder="ชื่อ-นามสกุล"
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          {/* Input: Email */}
          <div className="relative group">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-green-500 transition-colors" size={20} />
            <input
              required
              type="email"
              className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all text-slate-700 placeholder:text-slate-400"
              placeholder="อีเมลแอดเดรส"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          {/* Input: Username */}
          <div className="relative group">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-green-500 transition-colors" size={20} />
            <input
              required
              className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all text-slate-700 placeholder:text-slate-400"
              placeholder="ชื่อผู้ใช้งาน (Username)"
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
          </div>

          {/* Input: Password */}
          <div className="relative group">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-green-500 transition-colors" size={20} />
            <input
              required
              type="password"
              className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all text-slate-700 placeholder:text-slate-400"
              placeholder="รหัสผ่าน"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          {/* Submit Button */}
          <button
            disabled={isPending}
            className="group w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-2xl shadow-xl shadow-slate-200 transition-all flex items-center justify-center gap-3 disabled:opacity-70 active:scale-[0.98]"
          >
            {isPending ? (
              <Loader2 className="animate-spin" size={22} />
            ) : (
              <>
                ยืนยันสมัครสมาชิก
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center text-slate-500 text-sm font-medium">
          มีบัญชีอยู่แล้ว?{" "}
          <Link href="/login" className="text-green-600 hover:text-green-700 font-bold underline underline-offset-4">
            เข้าสู่ระบบที่นี่
          </Link>
        </div>
      </div>
    </div>
  );
}