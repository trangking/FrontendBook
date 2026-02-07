import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, 
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'เกิดข้อผิดพลาดจากระบบ';
    console.error('API Error:', message);
    return Promise.reject(error);
  }
);

export default axiosInstance;