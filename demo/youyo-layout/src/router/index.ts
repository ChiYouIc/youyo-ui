import { createRouter, createWebHistory } from 'vue-router';
// import { YouyoPageLogList } from 'youyo-page-log/src';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/page01', component: () => import('../src/page-01.vue') },
    // { path: '/page02', component: YouyoPageLogList },
    { path: '/page03', component: () => import('../src/page-03.vue') },
    { path: '/page04', component: () => import('../src/page-04.vue') },
    // 将匹配所有内容并将其放在 `$route.params.pathMatch` 下
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('../src/404.vue') },
    { path: '/', component: () => import('../src/home.vue') },
  ],
});

export default router;
