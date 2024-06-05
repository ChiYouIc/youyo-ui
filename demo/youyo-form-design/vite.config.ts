import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import qiankun from 'vite-plugin-qiankun';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    qiankun('microAppName', {
      useDevMode: true, // vite写法，webpack写法请查看对应文档
    }),
  ],
});
