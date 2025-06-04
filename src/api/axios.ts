import axios, { AxiosInstance } from 'axios';
import { Notify } from 'quasar'; // Quasar 通知元件
import Swal from 'sweetalert2';

const instance: AxiosInstance = axios.create({
  baseURL: 'http://localhost/',
  timeout: 10000, // 設定為 10 秒
});

// 請求攔截器（可加上 token 等）
// instance.interceptors.request.use(
//   config => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   error => Promise.reject(error)
// );

//回應攔截器（錯誤提示處理）
instance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      Notify.create({
        type: 'negative',
        message: '請求逾時，請稍後再試',
        timeout: 3000,
      });
    } else if (error.response) {
      Notify.create({
        type: 'negative',
        message: `伺服器錯誤：${error.response.status}`,
        timeout: 3000,
      });
    } else {
      Notify.create({
        type: 'negative',
        message: '網路錯誤，請檢查連線',
        timeout: 3000,
      });
    }

    return Promise.reject(error);
  },
);

// 🔐 請求攔截器（加上 token，可選）
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// 🛡️ 回應攔截器（處理後端格式 + 錯誤提示）
instance.interceptors.response.use(
  (response) => {
    const res = response.data;
    // 只接受 code === "200" 的成功結果
    if (res.code === '200') {
      if (res.msg) {
        Swal.fire({
          icon: 'success',
          title: '成功',
          text: res.msg,
          timer: 2000,
          showConfirmButton: false,
        });
      }
      return res.data; // 直接回傳真正的資料
    } else {
      Swal.fire('錯誤', res.msg || '操作失敗', 'error');
      return Promise.reject(new Error(res.msg || '操作失敗'));
    }
  },
  (error) => {
    // Axios 錯誤（非後端 code）
    if (error.code === 'ECONNABORTED') {
      Swal.fire('錯誤', '請求逾時，請稍後再試', 'error');
    } else if (error.response) {
      Swal.fire('錯誤', `伺服器錯誤 (${error.response.status})`, 'error');
    } else {
      Swal.fire('錯誤', '網路錯誤，請檢查連線', 'error');
    }

    return Promise.reject(error);
  },
);
export const api = instance;
