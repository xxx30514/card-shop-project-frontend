import axios from 'axios';
import Swal from 'sweetalert2';

export const api = axios.create({
  baseURL: 'http://localhost/',
  timeout: 10000,
});

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
          });
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
        Swal.fire({
          icon: 'warning',
          title: '未登入',
          text: '請先登入',
          confirmButtonText: '前往登入',
        });
        return Promise.reject(new Error('未登入'));
      }

      const { errorCode, errorDescription, errors } = error.response.data || {};
      // if (errors && Object.keys(errors).length > 0) {
      //   const msg = Object.entries(errors)
      //     .map(([field, msg]) => `<li><strong>${field}</strong>: ${msg}</li>`)
      //     .join('');

      //   Swal.fire({
      //     icon: 'error',
      //     title: '表單驗證錯誤',
      //     html: `<ul style="text-align: left; margin: 0; padding-left: 20px;">${msg}</ul>`,
      //   });
      // }
      if (errors && Object.keys(errors).length > 0) {
        const msg = Object.entries(errors)
          .map(([field, msg]) => `${field}: ${msg}`)
          .join('<br />');
        Swal.fire({
          icon: 'error',
          title: '表單驗證錯誤', //另外格式 還未測試
          html: msg,
        });
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
