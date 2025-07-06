import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import AntDesign from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import { createPinia } from 'pinia';
import router from './router';
import { setupRequest } from 'youyo-tools/src';

const pinia = createPinia();
setupRequest({ baseUrl: '' });

createApp(App).use(AntDesign).use(pinia).use(router).mount('#app');
