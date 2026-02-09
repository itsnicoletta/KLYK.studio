import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/style.css'

import { createHead } from '@vueuse/head' // vedi step 2

const app = createApp(App)

const head = createHead()
app.use(head)

app.use(router)
app.mount('#app')
