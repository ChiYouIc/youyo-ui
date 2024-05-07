import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/form', component: () => import('../formDesign.vue') },
    { path: '/flow', component: () => import('../flow.vue') },
    // 将匹配所有内容并将其放在 `$route.params.pathMatch` 下
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('../404.vue') },
    { path: '/', component: () => import('../Home.vue') },
  ],
});

export default router;
