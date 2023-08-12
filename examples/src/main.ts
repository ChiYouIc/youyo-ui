import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { createPinia } from 'pinia';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

const pinia = createPinia();
const app = createApp(App);
app.use(pinia).use(Antd).mount('#app');
