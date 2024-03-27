import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'com', component: () => import('pages/CompositionAPI.vue') },
      { path: 'set', component: () => import('pages/SetupScript.vue') },
      { path: 'hook', component: () => import('pages/LifecycleHooks.vue'), meta: { title: 'Life' }, name: 'hook' },
    ],
  },

  {
    path: '/123',
    component: () => import('layouts/MainLayout2.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'com', component: () => import('pages/CompositionAPI.vue') },
      { path: 'set', component: () => import('pages/SetupScript.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];
export default routes;
