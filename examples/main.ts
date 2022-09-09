import {createApp} from 'vue'
import 'ant-design-vue/dist/antd.css';
import App from './app.vue'
import antd from 'ant-design-vue'
import you from "youyo-ui"

const app = createApp(App)
app.use(you)
    .use(antd)
app.mount('#app') 