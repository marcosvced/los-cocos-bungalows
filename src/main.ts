import { createApp } from 'vue'

import App from './App.vue'

import router from './lib/router'
import './lib/assets/styles/base.css'

const app = createApp(App)

app.use(router)

app.mount('#app')
