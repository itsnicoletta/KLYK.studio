import { createRouter, createWebHistory } from 'vue-router'
import Home from '../src/views/Home.vue'
import About from '../src/views/About.vue'


const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/about', name: 'About', component: About },
]

export default createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})