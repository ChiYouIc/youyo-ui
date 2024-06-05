import { App, createApp } from 'vue';
import './style.css';
import AppPage from './App.vue';
import Antd from 'ant-design-vue';
import { qiankunWindow, renderWithQiankun } from 'vite-plugin-qiankun/dist/helper';

// createApp(App).use(Antd).mount('#app');

let app: App<Element>;

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  createApp(AppPage).use(Antd).mount('#app');
} else {
  // 配置微应用。给 qiankun 定义生命周期
  const container = document.getElementById('app');
  if (container) {
    renderWithQiankun({
      mount(props) {
        app = createApp(AppPage);
        const mount = props.container ? props.container.querySelector('#app') : document.getElementById('app');
        app.use(Antd).mount(mount as Element);
        // 监听主应用注入的全局状态
        props.onGlobalStateChange(() => {
          // state: 变更后的状态;
          // prev 变更前的状态
        });
      },
      bootstrap() {},
      update() {},
      unmount() {
        app?.unmount();
      },
    });
  } else {
    console.log('not exist');
  }
}
