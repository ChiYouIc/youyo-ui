import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import AntDesign from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import { createPinia } from 'pinia';
import router from './router';

const pinia = createPinia();

createApp(App).use(AntDesign).use(pinia).use(router).mount('#app');
