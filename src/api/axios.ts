import axios from 'axios';
import Swal from 'sweetalert2';
import { routerInstance } from 'src/router';

export const api = axios.create({
  baseURL: 'http://localhost/',
  timeout: 10000,
});

const goToLogin = () => {
  // 1. 取得當前路徑
  const currentPath = routerInstance?.currentRoute.value.path;
  // 2. 判斷是否已經在登入頁 (避免重複跳轉)
  if (currentPath === '/login') {
    console.log('已經在登入頁，取消跳轉');
    return;
  }
  // const redirectPath = window.location.pathname + window.location.search;
  // window.location.href = `/login?redirect=${encodeURIComponent(redirectPath)}`;
  console.log(routerInstance);
  if (routerInstance) {
    const redirectPath = routerInstance.currentRoute.value.fullPath;
    routerInstance.push({ path: '/login', query: { redirect: redirectPath } });
    console.log('正在跳轉至登入頁:', redirectPath);
  } else {
    // 備案：如果router初始化失敗，強制跳轉
    console.warn('Router 尚未初始化，強制使用 window.location');
    window.location.href = '/login';
  }
};

api.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res && typeof res === 'object' && 'code' in res) {
      switch (res.code) {
        case '200':
          if (res.msg) {
            Swal.fire({
              icon: 'success',
              title: '成功',
              text: res.msg,
              timer: 3000,
              showConfirmButton: false,
            });
          }
          return response; //回傳整個 response
        case '400':
          Swal.fire('錯誤', res.msg || '操作失敗', 'error');
          return Promise.reject(new Error(res.msg || '操作失敗'));
        case '401':
          Swal.fire({
            icon: 'warning',
            title: '未登入',
            text: '請先登入',
            confirmButtonText: '前往登入',
            cancelButtonText: '取消',
            showCancelButton: true,
            showCloseButton: true,
            customClass: {
              // confirmButton: 'q-btn q-btn--standard text-white bg-primary',
              cancelButton: 'text-white bg-negative',
            },
          }).then((result) => {
            if (result.isConfirmed) {
              goToLogin();
            }
          });
          console.log('攔截器 401 觸發');
          console.log(res.code);
          console.log(res.msg);
          return Promise.reject(new Error('未登入'));
        default:
          Swal.fire('錯誤', res.msg || '未知錯誤', 'error');
          return Promise.reject(new Error(res.msg || '未知錯誤'));
      }
    }
    return response;
  },
  (error) => {
    if (error.code === 'ECONNABORTED') {
      Swal.fire('錯誤', '請求逾時，請稍後再試', 'error');
    } else if (error.response) {
      // 這邊新增對 HTTP 狀態碼 401 的判斷
      if (error.response.status === 401) {
        const isLoginPage = window.location.pathname === '/login';
        const isBadCredentials = error.response.errorCode === 304;
        if (isLoginPage || isBadCredentials) {
          // 這種情況「不要」執行 goToLogin() 跳轉
          // 直接顯示後端傳來的錯誤訊息即可
          Swal.fire('驗證失敗', error.response.errorDescription || '帳號或密碼錯誤', 'error');
          return Promise.reject(error);
        }
        Swal.fire({
          icon: 'warning',
          title: '未登入',
          text: '請先登入',
          confirmButtonText: '前往登入',
          cancelButtonText: '取消',
          showCancelButton: true,
          showCloseButton: true,
          customClass: {
            // confirmButton: 'q-btn q-btn--standard text-white bg-primary',
            cancelButton: 'text-white bg-negative',
          },
        }).then((result) => {
          if (result.isConfirmed) {
            goToLogin();
          }
        });
        return Promise.reject(new Error('未登入'));
      }
      const { errorCode, errorDescription, errors } = error.response.data || {};
      if (errors && Object.keys(errors).length > 0) {
        const msg = Object.entries(errors)
          .map(([field, msg]) => `<li><strong>${field}</strong>: ${msg}</li>`)
          .join('');
        Swal.fire({
          icon: 'error',
          title: '表單驗證錯誤',
          html: `<ul style="text-align: left; margin: 0; padding-left: 20px;">${msg}</ul>`,
        });
      } else if (errorCode === 306) {
        //在未知錯誤(Exception.class)的情況下回傳java原生的錯誤訊息
        Swal.fire('錯誤', error.response.data.error, 'error');
      } else if (errorDescription) {
        Swal.fire('錯誤', errorDescription, 'error');
      } else {
        Swal.fire('錯誤', `伺服器錯誤 (${error.response.status})`, 'error');
      }
    } else {
      Swal.fire('錯誤', '網路錯誤，請檢查連線', 'error');
    }
    return Promise.reject(error);
  },
);
