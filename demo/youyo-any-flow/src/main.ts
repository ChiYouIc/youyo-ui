import { createApp } from 'vue'
import { VueFlow } from '@vue-flow/core'
import '@vue-flow/minimap/dist/style.css'
import '@vue-flow/controls/dist/style.css'
import './style.css'
import App from './App.vue'
import { i18n } from './locales'

const app = createApp(App)
app.use(VueFlow)
app.use(i18n)
app.mount('#app')
