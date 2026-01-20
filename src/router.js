import { createRouter, createWebHistory } from 'vue-router'

// Importa le tue view principali
import Home from '../src/views/Home.vue'
import About from '../src/views/About.vue'
import ProjectDetail from './views/ProjectDetail.vue'
import Projects from '../src/views/Projects.vue'
import Contacts from '../src/views/Contacts.vue'
import NotFound from '../src/views/NotFound.vue'
import ServicesDetail from '../src/views/ServicesDetail.vue'

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
        path: '/projects',
        name: 'Projects',
        component: Projects
    },
    {
        path: '/services/:slug',
        name: 'ServicesDetail',
        component: ServicesDetail
    },
    {   
        path: '/contacts',
        name: 'Contacts',
        component: Contacts
    },
    {
        //  pagina 404 personalizzata
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
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
