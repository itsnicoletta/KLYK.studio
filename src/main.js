// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'            // nota: default import
import './assets/tailwind.css'

const app = createApp(App)
app.use(router)                          // <— qui!
app.mount('#app')