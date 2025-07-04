import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('../pages/index.vue') },
    { path: '/:id', component: () => import('../pages/edit.vue') },
  ],
});

export default router;
