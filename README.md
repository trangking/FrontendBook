# วิธีการรันโปรเจกต์

1. ติดตั้ง dependencies
   ```bash
   npm install
   # หรือ
   yarn install
   # หรือ
   pnpm install
   ```

2. สร้างไฟล์ .env.local (ถ้าต้องการเชื่อมต่อ backend จริง)
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000  # ตัวอย่าง URL backend
   ```

3. รันเซิร์ฟเวอร์ development
   ```bash
   npm run dev
   # หรือ
   yarn dev
   # หรือ
   pnpm dev
   ```

4. เปิดเบราว์เซอร์ไปที่ [http://localhost:3000](http://localhost:3000)

---
# ระบบจองคิว (Queue Booking System)

ระบบนี้เป็นตัวอย่างแอป Next.js สำหรับจองคิวออนไลน์ พร้อมระบบ Login (demo)

## โครงสร้างหลัก

- หน้า Login: `/login` (ไฟล์: `app/login/page.tsx`)
- หน้าแสดง/จองคิว: `/book` (ไฟล์: `app/book/page.tsx`)
- API Login: `app/api/login/route.ts` (ตรวจสอบ username/password)
- API Queue: `app/api/queue/route.ts` (บันทึก/ดึงข้อมูลคิว)
- ฟังก์ชันเรียก API: `app/service/book/book.ts`, `app/service/book/useBooking.tsx`

## วิธีการทำงาน

1. **เข้าสู่ระบบ**

   - ผู้ใช้กรอก username/password ที่หน้า `/login`
   - ระบบจะส่งข้อมูลไปที่ API `/api/login` เพื่อตรวจสอบ
   - ถ้าสำเร็จ จะ redirect ไปหน้า `/book`
2. **จองคิว**

   - ผู้ใช้เลือกบริการ, เวลาเริ่มต้น, เวลาสิ้นสุด ที่หน้า `/book`
   - เมื่อกดจอง ระบบจะเรียก API `/Booking` (backend) ผ่านฟังก์ชัน `CreateBooking`
   - ถ้าสำเร็จจะแสดงข้อความยืนยัน ถ้าไม่สำเร็จจะแสดง error
3. **API/Backend**

   - ถ้าเชื่อมต่อ backend จริง ให้แก้ไข baseURL ใน `app/axios-instance.ts` (ใช้ env `NEXT_PUBLIC_API_URL`)

## หมายเหตุ

- ระบบนี้เหมาะสำหรับ demo หรือ prototype เท่านั้น ยังไม่มีระบบ session/cookie ที่ปลอดภัยจริง

---
