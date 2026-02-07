"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, LogIn, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useLoginMutation } from "../service/login/useLogin";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { mutate, isPending } = useLoginMutation();
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(
      { username, password },
      {
        onSuccess: (data) => {
          localStorage.setItem("token", data.token);
          localStorage.setItem("userid", data.id);
        },
      },
    );
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-slate-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="bg-white/80 backdrop-blur-xl w-full max-w-md rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-10 border border-white">
        <div className="text-center mb-10">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-200 rotate-3">
            <LogIn className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            เข้าสู่ระบบ
          </h1>
          <p className="text-slate-500 mt-2 font-medium">
            ยินดีต้อนรับกลับมา! กรุณาลงชื่อเข้าใช้งาน
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700 ml-1">
              ชื่อผู้ใช้งาน
            </label>
            <div className="relative group">
              <User
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors"
                size={20}
              />
              <input
                required
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-slate-700 placeholder:text-slate-300"
                placeholder="Username ของคุณ"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700 ml-1">
              รหัสผ่าน
            </label>
            <div className="relative group">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors"
                size={20}
              />
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-slate-700 placeholder:text-slate-300"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-2xl shadow-xl shadow-slate-200 transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-70"
          >
            {isPending ? (
              <Loader2 className="animate-spin" size={22} />
            ) : (
              "เข้าสู่ระบบ"
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col gap-4 text-center">
          <p className="text-sm text-slate-500 font-medium">
            ยังไม่มีบัญชี?{" "}
            <Link
              href="/register"
              className="text-blue-600 hover:text-blue-700 font-bold underline underline-offset-4"
            >
              สมัครสมาชิกที่นี่
            </Link>
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 text-xs text-slate-400 hover:text-slate-600 transition-colors font-medium"
          >
            <ArrowLeft size={14} /> กลับสู่หน้าหลัก
          </Link>
        </div>
      </div>
    </div>
  );
}
