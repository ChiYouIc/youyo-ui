import { createApp } from 'vue';
import './style.css';
import { registerMicroApps, addGlobalUncaughtErrorHandler } from 'qiankun';
import App from './App.vue';
import Antd from 'ant-design-vue';

createApp(App).use(Antd).mount('#app');

// 微应用name、url应该放数据库，从接口获取，避免修改端口号后重新部署。
const microApps = [
  {
    name: 'form',
    entry: '//localhost:5174/',
    container: '#projects-container',
    activeRule: '/form',
  },
];
// 注册所有微应用
registerMicroApps(microApps);
// 可以加个全局错误捕获，如果配置正确，可以不加
addGlobalUncaughtErrorHandler(event => console.warn('qiankun global error', event));
// 不要start 不要start 不要start，否则会报错：容器不存在
// start()
