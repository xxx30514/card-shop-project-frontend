import { route } from 'quasar/wrappers';
import { createMemoryHistory, createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import { useAuthStore } from 'src/stores/auth';
import routes from './routes';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */
let routerInstance: any = null; // 用來存放實例
export default route(function ({ store }) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  }); // --- 新增導航守衛邏輯 ---
  Router.beforeEach((to, from, next) => {
    const authStore = useAuthStore(store);
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    // 取得登入狀態 (請根據你實際儲存 token 的方式修改，例如 LocalStorage 或 Pinia)
    const isAuthenticated = authStore.isLoggedIn;
    const LOGIN_PATH = '/login';
    // 記錄最後訪問的路徑 (只要不是去登入頁或錯誤頁)
    if (to.path !== LOGIN_PATH && !to.path.includes('error')) {
      sessionStorage.setItem('last_visited_path', to.fullPath);
    }
    // 1. 權限攔截：去需要登入的頁面但未登入
    if (requiresAuth && !authStore.isLoggedIn) {
      return next({ path: '/login', query: { redirect: to.fullPath } });
    }
    // 2. 如果使用者已登入，卻想進入登入頁 -> 強制彈回首頁
    if (to.path === LOGIN_PATH && isAuthenticated) {
      console.log('使用者已登入，攔截跳轉至登入頁，改導向首頁');
      // 如果是從某頁過來的就回原頁面，否則回首頁
      const redirectBack = from.fullPath === '/' ? '/' : from.fullPath;
      return next({ path: redirectBack });
    }

    // 3. 處理「手動輸入 /login」的情境
    if (to.path === LOGIN_PATH && !isAuthenticated && !to.query.redirect) {
      // 優先從 localStorage 拿取最後一次訪問的路徑
      const lastPath = sessionStorage.getItem('last_visited_path');
      if (lastPath && lastPath !== '/' && lastPath !== LOGIN_PATH) {
        console.log('偵測到手動輸入登入頁，自動補上最後訪問路徑:', lastPath);
        return next({
          path: LOGIN_PATH,
          query: { redirect: lastPath },
          replace: true,
        });
      }
    }
    // 正常放行
    next();
  });
  // ----------------------
  routerInstance = Router; // 將建立好的實例存起來
  return Router;
});
// 導出一個獲取實例的方法
export { routerInstance };
