import { createApp } from 'vue'
import App from './app.vue'
const app = createApp(App)
import you from "youyo-ui"
app.use(you)
app.mount('#app') 