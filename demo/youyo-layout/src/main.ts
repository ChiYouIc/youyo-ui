import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
// Vue Flow 样式
import '@vue-flow/core/dist/style.css';
import '@vue-flow/core/dist/theme-default.css';
import '@vue-flow/controls/dist/style.css';
import '@vue-flow/minimap/dist/style.css';
// import '@vue-flow/node-resizer/dist/style.css';
import { createPinia } from 'pinia';
import Antd from 'ant-design-vue';
// import 'ant-design-vue/dist/reset.css';
import router from './router';
import { setupRequest } from 'youyo-tools/src';
import 'youyo-ui/es/style.css';
import youyo from 'youyo-ui';
import { setupForm } from 'youyo-form';
import { ComponentConstructorOptionType } from 'youyo-form/src';
import IdCard from './src/components/id-card/IdCard.ts';

setupForm({
  componentList: [
    { name: '输入框', component: 'Input', description: '输入框' },
    { name: '身份证', component: 'IdCard', description: '身份证' },
  ],
  componentFactories: [{ name: 'IdCard', creator: (c: ComponentConstructorOptionType) => new IdCard(c) }],
});

import { setupForm } from 'youyo-form/src';

setupForm({
  componentList: [{ name: '输入框', component: 'Input', description: '输入框' }],
});

setupRequest({ baseUrl: '/' });
const pinia = createPinia();
const app = createApp(App);
app.use(router).use(pinia).use(Antd).use(youyo).mount('#app');
