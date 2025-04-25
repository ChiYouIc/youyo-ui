import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { createPinia } from 'pinia';
import Antd from 'ant-design-vue';
// import 'ant-design-vue/dist/reset.css';
import router from './router';
import { setupRequest } from 'youyo-tools/src';
import 'youyo-ui/es/style.css';
import youyo from 'youyo-ui';

setupRequest({ baseUrl: '/' });
const pinia = createPinia();
const app = createApp(App);
app.use(router).use(pinia).use(Antd).use(youyo).mount('#app');
