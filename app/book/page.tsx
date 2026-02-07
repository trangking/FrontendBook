"use client";
import React, { useState } from "react";
import {
  Calendar,
  Clock,
  User,
  ClipboardList,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useGetServices } from "../service/service/useGetService";
import { useBookingMutation } from "../service/book/useBooking";

export default function BookPage() {

  const { data: services, isLoading: isServicesLoading } = useGetServices();

  const bookingMutation = useBookingMutation();

  const [serviceId, setServiceId] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });

  const getStatusColor = (status: string) => {
    switch (status?.toUpperCase()) {
      case "CONFIRMED":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "PENDING":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "CANCELLED":
        return "bg-rose-100 text-rose-700 border-rose-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const start = new Date(startTime);
    const end = new Date(endTime);

    if (start >= end) {
      setMessage({
        text: "เวลาสิ้นสุดต้องมากกว่าเวลาเริ่มต้นนะนาย!",
        type: "error",
      });
      return;
    }

    bookingMutation.mutate({
      userId: localStorage.getItem("userid") ? Number(localStorage.getItem("userid")) : 0,
      serviceId: Number(serviceId),
      startTime: start.toISOString(),
      endTime: end.toISOString(),
      status: "PENDING",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="md:col-span-3 space-y-6">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-emerald-100 rounded-2xl text-emerald-600">
                <Calendar size={28} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">
                  จองคิวรับบริการ
                </h2>
                <p className="text-slate-500 text-sm">
                  กรุณาเลือกบริการและเวลาที่ท่านสะดวก
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <ClipboardList size={16} /> เลือกบริการ
                </label>
                <select
                  required
                  value={serviceId}
                  onChange={(e) => setServiceId(e.target.value)}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all appearance-none cursor-pointer disabled:opacity-50"
                  disabled={isServicesLoading}
                >
                  <option value="">
                    {isServicesLoading
                      ? "กำลังโหลดบริการ..."
                      : "เลือกบริการที่ต้องการ..."}
                  </option>
                  {services?.map((s: any) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Clock size={16} /> เวลาเริ่มต้น
                  </label>
                  <input
                    required
                    type="datetime-local"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Clock size={16} /> เวลาสิ้นสุด
                  </label>
                  <input
                    required
                    type="datetime-local"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                  />
                </div>
              </div>

              {message.text && (
                <div
                  className={`p-4 rounded-2xl flex items-center gap-3 ${message.type === "success" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-red-50 text-red-700 border border-red-100"}`}
                >
                  {message.type === "success" ? (
                    <CheckCircle2 size={20} />
                  ) : (
                    <AlertCircle size={20} />
                  )}
                  <span className="text-sm font-medium">{message.text}</span>
                </div>
              )}

              <button
                disabled={bookingMutation.isPending}
                type="submit"
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-2xl shadow-xl shadow-slate-200 transition-all flex items-center justify-center gap-2 disabled:opacity-70 active:scale-[0.98]"
              >
                {bookingMutation.isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "ยืนยันการจองคิว"
                )}
              </button>
            </form>
          </div>
        </div>

        {/* ฝั่งแสดงข้อมูล (รองรับ Status) */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-emerald-600 rounded-3xl p-8 text-white shadow-lg shadow-emerald-200 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-2 text-emerald-50">
                ประกาศจากระบบ
              </h3>
              <p className="text-emerald-100 text-sm leading-relaxed">
                คิวที่อยู่ในสถานะ <b>PENDING</b> หรือ <b>CONFIRMED</b>{" "}
                จะถูกนำไปคำนวณเพื่อป้องกันการจองซ้ำ
              </p>
            </div>
            <div className="absolute -right-4 -bottom-4 text-emerald-500/20 rotate-12">
              <Calendar size={120} />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <User size={18} className="text-emerald-500" /> คิวล่าสุดของท่าน
            </h3>
            <div className="space-y-4">
              {/* ตัวอย่างการแสดงผลตาม Status ที่ได้รับจาก JSON */}
              <div className="p-4 border-l-4 border-amber-500 bg-slate-50 rounded-r-xl">
                <div className="flex justify-between items-start">
                  <p className="font-bold text-slate-700 text-sm">
                    บริการที่เลือก
                  </p>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${getStatusColor("PENDING")}`}
                  >
                    PENDING
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 mt-2">
                  รอเจ้าหน้าที่ตรวจสอบเวลาทับซ้อน
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
