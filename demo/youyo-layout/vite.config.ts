import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {},
  },
  server: {
    proxy: {
      '/ai': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
});
