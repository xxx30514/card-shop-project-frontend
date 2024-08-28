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
      {
        path: 'news',
        component: () => import('pages/NewsPage.vue'),
        children: [
          {
            path: 'detail/:id?/:title?',
            component: () => import('pages/NewsDetail.vue'),
            name: 'detail',
            //第一種方式 將路由接收到的所有params參數作為props傳給組件
            //props: true,
            //第二種方式 自己設定要傳遞何種參數作為props
            props(route) {
              return route.query;
            },
          },
        ],
      },
      { path: 'provide', component: () => import('pages/provide_inject/FatherComponent.vue') },
      { path: 'pinia', component: () => import('pages/PiniaPage.vue') },
      { path: 'slot', component: () => import('pages/slot/FatherComponent.vue') },
      { path: 'scoped', component: () => import('pages/scoped_slot/FatherComponent.vue') },
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
  {
    path: '/father',
    component: () => import('components/FatherComponent.vue'),
    //children: [{ path: 'ref', component: () => import('components/$refs_$parent/FatherComponent.vue') }],
  },
  {
    path: '/attrs/father',
    component: () => import('components/attrs/FatherComponent.vue'),
    //children: [{ path: 'child', component: () => import('components/ChildComponent.vue') }],
  },
  {
    path: '/ref',
    component: () => import('components/$refs_$parent/FatherComponent.vue'),
  },
  {
    path: '/custom',
    component: () => import('components/CustomRef.vue'),
  },
  {
    path: '/teleport',
    component: () => import('pages/TeleportPage.vue'),
  },
  // 路由的重新導向
  {
    path: '/456',
    redirect: '/news',
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];
export default routes;
