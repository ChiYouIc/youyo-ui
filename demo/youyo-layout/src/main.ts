import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { createPinia } from 'pinia';
import Antd from 'ant-design-vue';
// import 'ant-design-vue/dist/reset.css';
import router from './router';

const pinia = createPinia();
const app = createApp(App);
app.use(router).use(pinia).use(Antd).mount('#app');
