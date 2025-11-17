import { createRouter, createWebHistory } from 'vue-router'

// Importa le tue view principali
import Home from '../src/views/Home.vue'
import About from '../src/views/About.vue'
import ProjectDetail from '../src/views/ProjectDetail.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
    {
        path: '/projects/:slug', //  route dinamica per i progetti
        name: 'ProjectDetail',
        component: ProjectDetail
    },
    {
        //  facoltativo: pagina 404 personalizzata (utile se vuoi gestire errori)
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('../src/views/notFound.vue')
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior() {
        // Torna sempre in alto quando cambi pagina
        return { top: 0 }
    }
})

export default router
