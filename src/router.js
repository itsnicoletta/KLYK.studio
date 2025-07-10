import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/about', name: 'About', component: About },
    {
        path: '/projects/:slug',
        name: 'ProjectDetail',
        component: () => import('@/views/ProjectDetail.vue')
    }
]

export default createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})