// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router' 
import './styles/style.css'
import 'lightgallery/css/lg-zoom.css'
import 'lightgallery/css/lg-thumbnail.css'

const app = createApp(App)
app.use(router)                          // <— qui!
app.mount('#app')